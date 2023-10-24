import { JSX, createSignal } from "solid-js"
import { parseJson } from "../utils/jsonparser"

export function Parser04() {
  const [data, setData] = createSignal<any>()
  const [progress, setProgress] = createSignal(0)

  const newLocal = async (e: InputEvent & { target: HTMLInputElement }) => {
    const t0 = performance.now()

    const file = e.target.files?.item(0)
    if (!file) throw new Error("No file")

    const rs = e.target.files?.[0].stream()
    if (!rs) throw new Error("No stream")

    const fileSize = file.size
    // const reader = rs.pipeThrough(new TextDecoderStream()).getReader()
    const reader = rs.getReader()
    const decoder = new TextDecoder()
    let buffer = ""
    let processedBytes = 0

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      processedBytes += value.byteLength
      setProgress(Math.min((processedBytes / fileSize) * 100, 99.9))
      console.log("progress", progress())

      const decodedStr = decoder.decode(value, { stream: true })
      buffer += decodedStr
    }

    setProgress(Math.max(progress(), 99))
    // setData(JSON.parse(buffer))
    setData(parseJson(buffer))
    setProgress(100)

    // console.log(data())
    const t1 = performance.now()
    console.warn("done with:", file.name, `${file.size / 1000000} MB`, `${(t1 - t0) / 1000}s`)
  }

  return (
    <>
      <input type="file" name="name" title="title" accept=".json" onInput={newLocal} />

      <pre>Progress: {progress().toFixed(2)}</pre>

      <pre>{JSON.stringify(data(), null, 2)}</pre>
    </>
  )
}
