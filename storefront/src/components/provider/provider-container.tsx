import { ReactNode } from "react"

export function ProviderContainer({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 space-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
