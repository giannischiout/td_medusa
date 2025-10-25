import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "components/ui/field"
import { UploadComponent } from "components/ui/upload"
import { ReactNode } from "react"
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form"

interface RHFUploadProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  required?: boolean
  disabled?: boolean
  className?: string
  placeholder?: string
  dragActiveText?: string
  children?: ReactNode
}

export function RHFUpload<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  accept = "*/*",
  multiple = false,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  required = false,
  disabled = false,
  className,
  placeholder = "Click to upload or drag and drop",
  dragActiveText = "Drop files here",
  children,
}: RHFUploadProps<TFieldValues>) {
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
            <UploadComponent
              value={field.value || []}
              onChange={field.onChange}
              accept={accept}
              multiple={multiple}
              maxFiles={maxFiles}
              maxSize={maxSize}
              disabled={disabled}
              placeholder={placeholder}
              dragActiveText={dragActiveText}
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
