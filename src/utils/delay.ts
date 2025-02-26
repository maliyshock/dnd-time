export function delay(ms: number) {
  return new Promise(res => {
    const timeoutId = setTimeout(res, ms);

    return () => clearTimeout(timeoutId);
  });
}
