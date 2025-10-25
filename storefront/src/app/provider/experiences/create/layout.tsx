import { ProviderProductTabs } from "components/provider/product-tabs"
import { ReactNode } from "react"
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="bg-white px-4 sm:px-6 lg:px-8 border-b border-border  h-12 ">
        <ProviderProductTabs />
      </div>
      {children}
    </section>
  )
}
