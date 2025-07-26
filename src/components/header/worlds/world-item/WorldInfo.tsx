import { formatTime } from "~/utils/time/formatTime.ts";

type WorldInfoProps = {
  hours: number;
  minutes: number;
  name: string;
  isActive: boolean;
};

export function WorldInfo({ hours, minutes, name, isActive }: WorldInfoProps) {
  const textColor = isActive ? "text-primary" : "text-muted-foreground";

  return (
    <div className="flex gap-2 items-center">
      <time className={textColor}>{`${formatTime(hours)}:${formatTime(minutes)}`}</time>
      <span className={textColor}>
        <strong>{name}</strong>
      </span>
    </div>
  );
}
