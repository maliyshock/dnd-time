import "./world.scss";
import { Cloud } from "~/components/world/components/cloud.tsx";

const cloudsAmount = 5;
const clouds = new Array(cloudsAmount).fill(0);

export default function World() {
  return (
    <div className="world">
      <div className="world__block-wrapper">
        <div className="world__block atmo" />
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
