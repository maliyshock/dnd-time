import "./layout.scss";
import World from "~/components/world";
import Sun from "~/components/sun";
import Clocks from "~/components/clocks";
import { useKeyListener } from "~/hooks/useKeyListener.ts";
import { Background } from "~/components/background";
import { Overlay } from "~/components/overlay";

// space to pause time
// s - sound
// ctrl + click + next step
// cmd or shift - show things

export default function App() {
  useKeyListener();

  return (
    <>
      <Overlay />
      <Background />
      <div className="layout">
        <aside className="layout__aside">
          <Clocks />
        </aside>
        <div className="layout__main">
          <World />
          <Sun />
        </div>
      </div>
    </>
  );
}
