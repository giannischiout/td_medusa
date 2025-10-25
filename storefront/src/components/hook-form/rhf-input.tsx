import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "components/ui/field"
import { Input } from "components/ui/input"
import { ReactNode } from "react"
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form"

interface RHFInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  required?: boolean
  disabled?: boolean
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
  children?: ReactNode
}

export function RHFInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  className,
  inputProps = {},
  children,
}: RHFInputProps<TFieldValues>) {
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
            <Input
              {...field}
              {...inputProps}
              id={field.name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              aria-required={required}
              autoComplete="off"
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            {children}
          </FieldContent>
        </Field>
      )}
    />
  )
}
