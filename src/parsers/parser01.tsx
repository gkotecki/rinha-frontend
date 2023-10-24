import { For, createSignal } from "solid-js"
import { Uint8ArrayToStringsTransformer } from "../uint8-to-str"

export function Parser01() {
  const [chunks, setChunks] = createSignal<string[]>([])

  return (
    <>
      <input
        type="file"
        name="name"
        title="title"
        onInput={async e => {
          const t0 = performance.now()

          const file = e.target.files?.item(0)
          if (!file) throw new Error("No file")

          const rs = e.target.files?.[0].stream()
          if (!rs) throw new Error("No stream")

          const ts = new TransformStream(new Uint8ArrayToStringsTransformer())
          const lineStream = rs.pipeThrough(ts)
          const reader = lineStream.getReader()

          let rawChunks = [""]
          let count = 0
          let buffer = ""

          while (true) {
            const { done, value } = await reader.read()
            if (done) {
              break
            }
            count += 1
            // console.log(value)
            // setChunks(c => c.concat(value))
            // rawChunks.push(value)

            // if (count > 500) {
            //   await new Promise(r => setTimeout(r, 0.0001))
            //   count = 0
            // }
            buffer += value

            // const el = document.createElement("pre")
            // el.textContent = value
            // document.getElementById("section")!.appendChild(el)
          }
          console.warn(buffer)
          // setChunks(rawChunks)

          const t1 = performance.now()
          console.warn( "done with:", file.name, `${file.size / 1_000_000} MB`, `${(t1 - t0) / 1000}s`)
          // setData(full)
        }}
      />

      {/* <For each={chunks()}>{chunk => <pre>{chunk}</pre>}</For> */}
    </>
  )
}
