import { Combobox, type ComboboxOption } from "components/ui/combobox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "components/ui/field"
import { ReactNode } from "react"
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form"

interface RHFComboboxProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  required?: boolean
  disabled?: boolean
  className?: string
  options: ComboboxOption[]
  children?: ReactNode
}

export function RHFCombobox<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  placeholder,
  searchPlaceholder,
  emptyText,
  required = false,
  disabled = false,
  className,
  options,
  children,
}: RHFComboboxProps<TFieldValues>) {
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
            <Combobox
              options={options}
              value={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyText={emptyText}
              disabled={disabled}
              className={fieldState.invalid ? "border-destructive" : ""}
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
