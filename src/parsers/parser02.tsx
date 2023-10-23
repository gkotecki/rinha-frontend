export function Parser02() {
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

          // console.log(await file.text())
          console.log(JSON.parse(await file.text()))

          // const rs = e.target.files?.[0].stream()
          // if (!rs) throw new Error("No stream")

          // const reader = rs.getReader()
          // const decoder = new TextDecoder()
          // let buffer = ""

          // while (true) {
          //   const { done, value } = await reader.read()
          //   if (done) {
          //     // Process the remaining data in the buffer
          //     // if (buffer) {
          //     //   processChunk(buffer)
          //     // }
          //     break
          //   }

          //   const decoded = decoder.decode(value, { stream: true })
          //   buffer += decoded
          //   // const chunks = buffer.split("\n")
          //   // buffer = chunks.pop() || ""

          //   // for (const chunk of chunks) {
          //   //   processChunk(chunk)
          //   // }
          //   // console.log(decoded)

          //   // const el = document.createElement("pre")
          //   // el.textContent = decoded
          //   // document.getElementById("section")!.appendChild(el)
          // }

          // console.log(buffer)
          // console.log(JSON.parse(buffer))

          const t1 = performance.now();
          console.warn("done with:", file.name, `${file.size / 1_000_000} MB`, `${(t1 - t0)/1000}s`)
        }}
      />
    </>
  )
}
