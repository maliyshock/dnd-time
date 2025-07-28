import "./world.scss";
import { MemoCloud } from "~/components/world/components/cloud";
import { Aura } from "~/components/aura";
import useStore from "~/store/useStore.ts";
import groundPath from "~/assets/small_world/ground.png";
import { Stop } from "~/components/ui/icons/Stop.tsx";
import { Play } from "~/components/ui/icons/Play.tsx";
import { Button } from "~/components/ui/button";

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
        <img alt="ground" draggable="false" className="world__ground spin absolute" src={groundPath} />

        <span className={`opacity-30 md:opacity-20 ${cmdIsPressed ? "fade-in" : ""} `}>{play ? <Stop /> : <Play />}</span>
      </Button>
      {clouds.map(cloud => (
        <MemoCloud key={cloud.id} cloud={cloud} />
      ))}
    </div>
  );
}
