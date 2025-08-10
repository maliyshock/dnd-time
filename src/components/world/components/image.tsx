type ImageProps = {
  name: string;
  alt: string;
  draggable: string;
} & React.ComponentPropsWithoutRef<"picture">;

export function Image({ name, draggable, alt, ...props }: ImageProps) {
  const webpName = new URL(`/src/assets/small_world/${name}.webp`, import.meta.url).href;
  const pngName = new URL(`/src/assets/small_world/${name}.png`, import.meta.url).href;

  return (
    <picture {...props}>
      <source srcSet={webpName} type="image/webp" />
      <img draggable={draggable} src={pngName} alt={alt} />
    </picture>
  );
}
