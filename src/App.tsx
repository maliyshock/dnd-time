import "./app.scss";
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
        <section className="layout__clocks-container">
          <Clocks />
        </section>
        <section className="layout__world-container">
          <div className="world-wrapper">
            <World />
            <Sun />
          </div>
        </section>
      </div>
    </>
  );
}
