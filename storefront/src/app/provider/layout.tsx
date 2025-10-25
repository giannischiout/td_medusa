import { ProviderNavBar } from "components/provider/provider-nav-bar"
import { ReactNode } from "react"

interface ProviderLayoutProps {
  children: ReactNode
}

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProviderNavBar />
      <main className="">{children}</main>
    </div>
  )
}
