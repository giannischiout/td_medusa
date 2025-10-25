import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { ReactNode } from "react"
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form"

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface RHFSelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  options: SelectOption[]
  selectProps?: React.ComponentProps<typeof Select>
  children?: ReactNode
}

export function RHFSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  placeholder,
  required = false,
  disabled = false,
  className,
  options,
  selectProps = {},
  children,
}: RHFSelectProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={`gap-1 ${className || ""}`}
        >
          {label && (
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
          <FieldContent>
            <Select
              {...selectProps}
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                id={field.name}
                aria-invalid={fieldState.invalid}
                aria-required={required}
                className={fieldState.invalid ? "border-destructive" : ""}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            {children}
          </FieldContent>
        </Field>
      )}
    />
  )
}
