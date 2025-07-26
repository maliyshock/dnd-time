import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select.tsx";

type SelectTimeProps = {
  value: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  options: string[];
  onChange?: (value: string) => void;
};

export function SelectTime({ value, options, onChange, name, ...props }: SelectTimeProps) {
  return (
    <Select {...props} name={name} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-18">
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
  );
}
