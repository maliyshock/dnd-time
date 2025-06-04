const SCALE_FACTOR = 1.4;

export function getCanvasSize() {
  return {
    width: window.innerWidth > window.innerHeight ? window.innerWidth * SCALE_FACTOR : window.innerHeight,
    height: window.innerHeight > window.innerWidth ? window.innerHeight * SCALE_FACTOR : window.innerWidth,
  };
}
