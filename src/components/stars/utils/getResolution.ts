export function getResolution() {
  return Math.min(window.devicePixelRatio || 1, 3);
}
