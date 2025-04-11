import "./ground.scss";
import groundPath from "~/assets/small_world/ground.png";

export function Ground({ onClick }: { onClick: () => void }) {
  return (
    <button onMouseDown={onClick} className="ground">
      <img alt="ground" draggable="false" src={groundPath} />
    </button>
  );
}
