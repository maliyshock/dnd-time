import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/shadcn/select.tsx";
import { Label } from "~/components/ui/shadcn/label.tsx";
import { useId } from "react";
import { cn } from "~/utils/cn.ts";

type SelectTimeProps = {
  value: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  id?: string;
  className?: string;
  options: string[];
  onChange?: (value: string) => void;
};

export function SelectTime({ value, id, label, options, onChange, className, name, ...props }: SelectTimeProps) {
  const selectId = useId();

  return (
    <div className={cn("grid gap-1", className)}>
      {label && <Label htmlFor={id || selectId}>{label}</Label>}
      <Select {...props} name={name} value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full" id={id || selectId}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
