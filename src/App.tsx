import { Parser01 } from "./parsers/parser01"
import { Parser02 } from "./parsers/parser02"
import { Parser03 } from './parsers/parser03'
import { Parser04 } from './parsers/parser04'

// TODO: if filesize small enough, skip the streaming and just read the whole file
// TODO: add time taken
// TODO: add progress indicator

export function App() {
  return (
    <>
      <h1>JSON Tree Viewer</h1>
      <p>Simple JSON Viewer that run completely on-client. No data exchange</p>

      <hr class="my-2 border-black" />
      <Parser01 />
      <hr class="my-2 border-black" />
      <Parser02 />
      <hr class="my-2 border-black" />
      <Parser03 />
      <hr class="my-2 border-black" />
      <Parser04 />
      <hr class="my-2 border-black" />

      <div id="section"></div>
    </>
  )
}
