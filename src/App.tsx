import { createSignal } from "solid-js"

export function App() {
  const [data, setData] = createSignal<Record<string, unknown> | any[]>()

  return (
    <>
      <h1>JSON Tree Viewer</h1>
      <p>Simple JSON Viewer that run completely on-client. No data exchange</p>

      <input
        type="file"
        name="name"
        title="title"
        onInput={e =>
          e.target.files?.[0].text().then(t => {
            console.log(t)
            setData(JSON.parse(t))
          })
        }
      />

      {data() ? (
        <pre>{JSON.stringify(data(), null, 2)}</pre>
      ) : (
        <small>Invalid file. Please load a valid JSON file.</small>
      )}
    </>
  )
}
