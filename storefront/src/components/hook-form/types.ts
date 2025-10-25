import { ComponentProps, JSX } from "react"
import { FieldPath, FieldValues } from "react-hook-form"

// Base field props that all field components should extend
export interface BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues
> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

// RHFInput specific props
export interface RHFInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  inputProps?: ComponentProps<"input">
}

// RHFTextarea specific props
export interface RHFTextareaProps<
  TFieldValues extends FieldValues = FieldValues
> extends BaseFieldProps<TFieldValues> {
  textareaProps?: ComponentProps<"textarea">
}

// RHFSelect specific props
export interface RHFSelectProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  options: Array<{ value: string; label: string }>
  selectProps?: ComponentProps<"select">
}

// Form props
export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  methods: import("react-hook-form").UseFormReturn<TFieldValues>
  onSubmit: (data: TFieldValues) => void
  children: React.ReactNode
  className?: string
}

// Field component type mapping
export interface FieldComponents<
  TFieldValues extends FieldValues = FieldValues
> {
  input: (props: RHFInputProps<TFieldValues>) => JSX.Element
  textarea: (props: RHFTextareaProps<TFieldValues>) => JSX.Element
  select: (props: RHFSelectProps<TFieldValues>) => JSX.Element
}

// Generic field component type
export type FieldComponent<TFieldValues extends FieldValues = FieldValues> =
  FieldComponents<TFieldValues>[keyof FieldComponents<TFieldValues>]
