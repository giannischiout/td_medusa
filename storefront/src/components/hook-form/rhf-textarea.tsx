import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "components/ui/field"
import { Textarea } from "components/ui/textarea"
import { ReactNode } from "react"
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form"

interface RHFTextareaProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  textareaProps?: React.ComponentProps<typeof Textarea>
  children?: ReactNode
}

export function RHFTextarea<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  placeholder,
  required = false,
  disabled = false,
  className,
  textareaProps = {},
  children,
}: RHFTextareaProps<TFieldValues>) {
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
            <Textarea
              {...field}
              {...textareaProps}
              id={field.name}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              aria-required={required}
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
