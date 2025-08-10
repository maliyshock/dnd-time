import "./world.scss";
import { MemoCloud } from "~/components/world/components/cloud";
import { Aura } from "~/components/aura";
import useStore from "~/store/useStore.ts";
import { Stop } from "~/components/ui/icons/Stop.tsx";
import { Play } from "~/components/ui/icons/Play.tsx";
import { Button } from "~/components/ui/button";
import { Image } from "~/components/world/components/image.tsx";

export default function World() {
  const clouds = useStore(store => store.clouds);
  const auraTexturePath = new URL("/src/assets/small_world/atmo.png", import.meta.url);
  const play = useStore(store => store.play);
  const setTogglePlay = useStore(store => store.setTogglePlay);
  const cmdIsPressed = useStore(store => store.cmdIsPressed);

  return (
    <div className="world">
      <div className="world__block spin">{<Aura rotation scaleUp={1.5} texture={auraTexturePath} transparencyStart={60} />}</div>
      <Button
        className="world__block world__button pointer-events-auto flex justify-center items-center text-white"
        onMouseDown={() => {
          setTogglePlay();
        }}
      >
        <Image alt="Small World" draggable="false" className="world__ground spin absolute" name="ground" />

        <span className={`opacity-30 md:opacity-20 ${cmdIsPressed ? "fade-in" : ""} `}>{play ? <Stop /> : <Play />}</span>
      </Button>
      {clouds.map(cloud => (
        <MemoCloud key={cloud.id} cloud={cloud} />
      ))}
    </div>
  );
}
