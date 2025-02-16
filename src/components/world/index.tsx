import "./world.scss";
import { Cloud } from "~/components/world/components/cloud.tsx";
import { Aura } from "~/components/aura";
import texturePath from "~/assets/small_world/atmo.png";

const cloudsAmount = 5;
const clouds = new Array(cloudsAmount).fill(0);

export default function World() {
  return (
    <div className="world">
      <div className="world__block-wrapper spin">
        <Aura rotation scaleUp={1.5} texture={texturePath} transparencyStart={60} />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block ground" />
      </div>
      {clouds.map((_, key) => (
        <Cloud key={key} />
      ))}
    </div>
  );
}
