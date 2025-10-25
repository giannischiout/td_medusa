import { getBaseURL } from "@lib/util/env"
import Footer from "@modules/layout/templates/footer"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
