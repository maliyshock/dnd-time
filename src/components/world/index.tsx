import "./world.scss";
import { MemoCloud } from "~/components/world/components/cloud";
import { Aura } from "~/components/aura";
import { Ground } from "~/components/world/components/ground";
import useStore from "~/store/useStore.ts";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

export default function World() {
  const clouds = useStore(store => store.clouds);
  const auraTexturePath = new URL("/src/assets/small_world/atmo.png", import.meta.url);
  const playSample = useGetPlaySample({ name: "tap", shift: true });

  return (
    <div className="world">
      <div className="world__block spin">
        <Aura rotation scaleUp={1.5} texture={auraTexturePath} transparencyStart={60} />
      </div>
      <div className="world__block fast-spin">
        <Ground onClick={playSample} />
      </div>
      {clouds.map(cloud => (
        <MemoCloud key={cloud.id} cloud={cloud} />
      ))}
    </div>
  );
}
