import "./overlay.scss";
import useStore from "~/store/useStore.ts";

export function Overlay() {
  const play = useStore(store => store.play);

  return <div className="sepia-overlay" style={{ backdropFilter: `sepia(${play ? 0 : 0.6})` }} />;
}
