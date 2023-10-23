export function Parser03() {
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

          const t1 = performance.now();
          console.warn("done with:", file.name, `${file.size / 1_000_000} MB`, `${(t1 - t0)/1000}s`)
        }}
      />
    </>
  )
}
