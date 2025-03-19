import "./app.scss";
import World from "~/components/world";
import Sun from "~/components/sun";
import Clocks from "~/components/clocks";
import { useKeyListener } from "~/hooks/useKeyListener.ts";
import { Background } from "~/components/background";
import { Overlay } from "~/components/overlay";
import { Header } from "~/components/header.tsx";
import { useAnimationControl } from "~/hooks/useAnimationControl.ts";

// space to pause time
// s - sound
// ctrl + click + next step
// cmd or shift - show things

export default function App() {
  useKeyListener();
  useAnimationControl();

  return (
    <>
      <Overlay />
      <Background />
      <main className="layout">
        <Header className="layout__header" />
        <main className="layout__body">
          <section className="layout__clocks-container">
            <Clocks />
          </section>
          <section className="layout__world-container">
            <div className="world-wrapper">
              <World />
              <Sun />
            </div>
          </section>
        </main>
      </main>
    </>
  );
}
