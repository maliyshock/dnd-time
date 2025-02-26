import "./world.scss";
import { MemoCloud } from "~/components/world/components/cloud";
import { Aura } from "~/components/aura";
import texturePath from "~/assets/small_world/atmo.png";
import { Ground } from "~/components/world/components/ground";
import useStore from "~/store/useStore.ts";

export default function World() {
  const clouds = useStore(store => store.clouds);

  return (
    <div className="world">
      <div className="world__block-wrapper spin">
        <Aura rotation scaleUp={1.5} texture={texturePath} transparencyStart={60} />
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
