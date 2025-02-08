import "./world.css";

export default function World() {
  return (
    <div className="world">
      <div className="world__block-wrapper">
        <div className="world__block atmo" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block ground" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block cloud-0" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block cloud-1" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block cloud-2" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block cloud-3" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block cloud-4" />
      </div>
      <div className="world__block-wrapper">
        <div className="world__block cloud-5" />
      </div>
    </div>
  );
}
