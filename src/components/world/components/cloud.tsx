import { getRandomNum } from "~/utils/getRandomNum.ts";

export function Cloud() {
  const number = getRandomNum(5);
  // cloud appearence
  // cloud die
  // cloud speed
  // cloud life time
  // cloud start angle
  // when cloud dies we should regenerate a new one

  return (
    <div className="world__block-wrapper">
      <div className={`world__block cloud-${number}`} />
    </div>
  );
}
