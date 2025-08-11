import "./app.scss";
import World from "~/components/world";
import Sun from "~/components/sun";
import Clocks from "~/components/clocks";
import { useKeyListener } from "~/hooks/useKeyListener.ts";
import { Background } from "~/components/background";
import { Overlay } from "~/components/overlay";
import { Header } from "~/components/header";
import { useAnimationControl } from "~/hooks/useAnimationControl.ts";
import { Stars } from "~/components/stars";
import { Toaster } from "sonner";
import { useSoundControl } from "~/hooks/useSoundControl.ts";

// space to pause time
// s - sound
// ctrl + click + next step
// cmd or shift - show things

export default function App() {
  useKeyListener();
  useAnimationControl();
  useSoundControl();

  return (
    <>
      <Overlay />
      <Background />
      <Stars />
      <Toaster />
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
