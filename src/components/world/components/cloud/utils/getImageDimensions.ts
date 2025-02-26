export type Dimensions = {
  width: number;
  height: number;
};

export function getImageDimensions(url: string): Promise<Dimensions> {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = () => {
      // Используйте naturalWidth/naturalHeight для получения оригинальных размеров
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      // die
    };

    img.src = url;
  });
}
