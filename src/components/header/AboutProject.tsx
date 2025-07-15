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
      <DialogContent className="sm:max-w-xl ">
        <DialogHeader className="pt-6 px-6 pb-0">
          <DialogTitle>
            <h2 className="mt-4 text-3xl leading-none font-semibold">What is this?</h2>
          </DialogTitle>
        </DialogHeader>
        <section className="p-6">
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
              clocks in medieval fantasy world there. 🙂
            </li>
            <li>
              Create, rename, and delete multiple timers. <span className="text-xs text-muted-foreground">(Work in progress)</span>
            </li>
            <li>Works in the background: the timer keeps running even if the browser tab is not active (but not when the computer is asleep or turned off).</li>
          </ul>

          <h3 className="mt-6 text-xl leading-none font-semibold">Additional Features:</h3>
          <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
            <li>Music and sound effects for each interaction.</li>
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
          <p>Is not it looks and feels nice? 🙂</p>
          <p>Besides that, I really love immersive D&D worlds. Frequently, during our sessions we were lost in time, because nobody tracked it: </p>
          <p>– "Hey DM what time is it?"</p>
          <p> – "Uh, let’s say it’s around 3 pm"</p>

          <p>... and it is just felt wrong. I could not find any tool, so I decided to build my own. Hope you enjoy it.</p>
        </section>
        <DialogFooter className="p-6 sm:justify-start sticky bottom-0 bg-white border-t border-t-[1px]">
          <DialogClose asChild>
            <SHDButton type="button" variant="secondary">
              Close
            </SHDButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
