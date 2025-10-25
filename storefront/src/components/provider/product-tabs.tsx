"use client"
import { paths } from "@lib/paths"
import { cn } from "@lib/util/shadcn-utils"
import { HalfCircle } from "components/ui/icons/half-circle"
import { ChevronLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { CircleDashed } from "../ui/icons/circle-dashed"

const tabs = [
  {
    label: "Details",
    value: "details",
    href: paths.provider.experiences.create.details,
  },
  {
    label: "Time slots",
    value: "time-slots",
    href: paths.provider.experiences.create.timeSlots,
  },
  {
    label: "Rules",
    value: "rules",
    href: paths.provider.experiences.create.rules,
  },
]

export const ProviderProductTabs = () => {
  const pathname = usePathname()
  const segment = pathname.split("/").filter(Boolean).pop()
  const activeLink = pathname.split("/").filter(Boolean).pop()

  return (
    <div className="flex items-center h-full ">
      <div className="pr-5  flex items-center justify-center h-full flex-col border-r border-border">
        <button>
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="flex items-center h-full ">
        {tabs.map((tab) => {
          const isActive = tab.value === activeLink
          return (
            <button
              className={cn(
                "h-full min-w-[100px] px-4 border-r border-border bg-gray-50",
                isActive && "bg-white"
              )}
              key={tab.value}
            >
              <span className="text-sm font-medium  items-center flex  gap-2">
                {isActive && <HalfCircle />}
                {!isActive && <CircleDashed size={16} />}
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
