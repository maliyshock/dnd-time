import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog.tsx";
import { Button } from "~/components/ui/button";
import { SHDButton } from "~/components/ui/shd-button.tsx";
import { Question } from "~/components/ui/icons/Question.tsx";

export function AboutProject() {
  const handleSound = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="What is this?" aria-label="What is this?" color="white" isTransparent={true} variation="hollow" size="medium" onMouseDown={handleSound}>
          <Question />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader className="pt-6 px-6 pb-0 sticky top-0 bg-white">
          <DialogTitle>
            <h2 className="mt-4 text-3xl leading-none font-semibold">What is this?</h2>
          </DialogTitle>
        </DialogHeader>
        <section className="dialog__content p-6">
          <p>This is an interactive clocks. They can be used for to track / change / save time inside of your Dungeons and Dragons world.</p>

          <h3 className="mt-6 text-xl leading-none font-semibold">Core Features:</h3>
          <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
            <li>
              By default, if there is no saved session, the timer starts from your current local time. When you reopen the tab, time resumes from where you left
              off.
            </li>
            <li>Time is saved every second automatically in your browser storage. Clearing cache will erase saved data.</li>
            <li>You can change hours, minutes and seconds. Pause and resume clocks at any time.</li>
            <li>
              The sky color and sun position reflect in-game time and can be used as an inspiration for the time description. Because... you know, there is no
              watches or phones in medieval fantasy world there. 🙂
            </li>
            <li>Create, rename, and delete worlds.</li>
            <li>Works in the background: the timer keeps running even if the browser tab is not active (but not when the computer is asleep or turned off).</li>
          </ul>

          <h3 className="mt-6 text-xl leading-none font-semibold">Additional Features:</h3>
          <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
            <li>Music and sound effects.</li>
            <li>Visual effects: smooth gradient transition, stars animation, interactions and easter eggs even. 🙂</li>
            <li>Dynamic clouds: clouds appear and move randomly.</li>
            <li>
              Rain <span className="text-xs text-muted-foreground">(Work in progress).</span>
            </li>
            <li>
              Bug fixes and optimisation <span className="text-xs text-muted-foreground">(Work in progress).</span>
            </li>
          </ul>

          <h3 className="mt-6 mb-2 text-xl leading-none font-semibold">Yeah... but why?</h3>
          <p>Well... Is not it looks and feels nice? 🙂</p>
          <p>Besides that, I really love immersive D&D worlds. Frequently, during our sessions we were lost in time, because nobody tracked it: </p>
          <p>– "Hey DM what time is it?"</p>
          <p> – "Uh-oh... let’s say... it’s around 3 pm"</p>

          <p>... and it is just felt wrong. I could not find any tool, so I decided to build my own. Hope you enjoy it.</p>

          <h3 className="mt-6 text-xl leading-none font-semibold">Creators</h3>
          <p className="mt-2">
            You can find me on linkedin as&nbsp;
            <a href="https://www.linkedin.com/in/maliyshock/" target="_blank" className="link">
              <strong>Denis Malyshok</strong>
            </a>
            &nbsp; or write me a message via email&nbsp;
            <a href="mailto:maliyshator@gmail.com" className="link">
              <strong>maliyshator@gmail.com</strong>
            </a>
          </p>
          <p className="mt-2">
            The music theme has been written by talented Alexey Kozlov. Checkout his&nbsp;
            <a href="https://lyoshi.space/" className="link">
              <strong>website</strong>
            </a>
            , &nbsp;
            <a href="https://www.youtube.com/@InnerVoicing" className="link">
              <strong>youtube</strong>
            </a>
            &nbsp; and &nbsp;
            <a href="https://soundcloud.com/lyo-shi" className="link">
              <strong>sound cloud</strong>
            </a>
            .
          </p>
          <p className="mt-2">
            This is an open source project. You can find it on&nbsp;
            <a href="https://github.com/maliyshock/dnd-time" className="link">
              <strong>github</strong>
            </a>
          </p>
        </section>
        <DialogFooter className="p-6 sm:justify-end sticky bottom-0 bg-white border-t">
          <DialogClose asChild>
            <SHDButton type="button" variant="default" size="lg">
              Got it!
            </SHDButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
