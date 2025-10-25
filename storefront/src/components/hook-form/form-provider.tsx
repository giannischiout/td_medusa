// storefront/src/components/hook-form/form.tsx
import { ReactNode } from "react"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  methods: UseFormReturn<TFieldValues>
  onSubmit: (data: TFieldValues) => void
  children: ReactNode
  className?: string
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  methods,
  onSubmit,
  children,
  className,
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}
