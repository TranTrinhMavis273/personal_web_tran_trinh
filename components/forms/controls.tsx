"use client";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
export function TextField({
  id,
  label,
  error,
  multiline = false,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  disabled?: boolean;
  rows?: number;
  name?: string;
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {multiline ? (
        <Textarea
          {...props}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <Input
          {...props}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  );
}
export function SelectControl({
  id,
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Chọn một mục",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (s: string) => void;
  options: readonly string[];
  error?: string;
  placeholder?: string;
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  );
}
