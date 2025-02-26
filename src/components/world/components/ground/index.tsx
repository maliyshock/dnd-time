import "./ground.scss";
import groundPath from "~/assets/small_world/ground.png";

export function Ground() {
  return (
    <button className="ground">
      <img alt="ground" draggable="false" src={groundPath} />
    </button>
  );
}
