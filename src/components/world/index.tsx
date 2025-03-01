import "./world.scss";
import { MemoCloud } from "~/components/world/components/cloud";
import { Aura } from "~/components/aura";
import { Ground } from "~/components/world/components/ground";
import useStore from "~/store/useStore.ts";

export default function World() {
  const clouds = useStore(store => store.clouds);
  const auraTexturePath = new URL("/src/assets/small_world/atmo.png", import.meta.url);

  return (
    <div className="world">
      <div className="world__block-wrapper spin">
        <Aura rotation scaleUp={1.5} texture={auraTexturePath} transparencyStart={60} />
      </div>
      <div className="world__block-wrapper fast-spin">
        <Ground />
      </div>
      {clouds.map(cloud => (
        <MemoCloud key={cloud.id} cloud={cloud} />
      ))}
    </div>
  );
}
