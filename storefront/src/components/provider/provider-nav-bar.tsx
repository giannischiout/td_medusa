"use client"

import { Button } from "components/ui/button"
import { paths } from "lib/paths"
import { cn } from "lib/util/shadcn-utils"
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Truck,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Mock vendor data
const mockVendor = {
  name: "John Smith",
  email: "john.smith@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  company: "Crete Adventures",
  role: "Experience Provider",
}

const navigation = [
  { name: "Dashboard", href: paths.provider.dashboard, icon: LayoutDashboard },
  {
    name: "Experiences",
    href: paths.provider.experiences.index,
    icon: Package,
  },
  { name: "Bookings", href: paths.provider.bookings.index, icon: ShoppingCart },
  { name: "Customers", href: paths.provider.customers.index, icon: Users },
  { name: "Analytics", href: paths.provider.analytics, icon: BarChart3 },
  { name: "Categories", href: paths.provider.categories.index, icon: Tag },
  {
    name: "Collections",
    href: paths.provider.collections.index,
    icon: Building2,
  },
  { name: "Discounts", href: paths.provider.discounts.index, icon: CreditCard },
  { name: "Shipping", href: paths.provider.shipping, icon: Truck },
  { name: "Regions", href: paths.provider.regions, icon: Globe },
  {
    name: "Time Slots",
    href: paths.provider["time-slots"].index,
    icon: Calendar,
  },
  { name: "Reports", href: paths.provider.reports, icon: FileText },
  { name: "Settings", href: paths.provider.settings, icon: Settings },
]

export function ProviderNavBar() {
  const pathname = usePathname()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={paths.provider.dashboard} className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-sm font-semibold text-white">M</span>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">
                ExploreCrete
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.slice(0, 6).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right side - Notifications, Help, Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* Help */}
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 px-3 py-2"
              >
                <img
                  src={mockVendor.avatar}
                  alt={mockVendor.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {mockVendor.name}
                  </div>
                  <div className="text-xs text-gray-500">{mockVendor.role}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={mockVendor.avatar}
                        alt={mockVendor.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {mockVendor.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {mockVendor.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {mockVendor.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href={paths.provider.profile}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={paths.provider.settings}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      href={paths.provider.billing}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Billing
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-200 py-2">
          <nav className="flex space-x-1 overflow-x-auto">
            {navigation.slice(0, 4).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
