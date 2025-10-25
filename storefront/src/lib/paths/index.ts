// Centralized path configuration for the application
export const paths = {
  // Main application routes
  home: "/",

  // Provider routes
  provider: {
    dashboard: "/provider",
    experiences: {
      index: "/provider/experiences",
      create: {
        root: "/provider/experiences/create",
        details: "/provider/experiences/create/details",
        timeSlots: "/provider/experiences/create/details",
        rules: "/provider/experiences/create/rules",
      },
      edit: (id: string) => `/provider/experiences/${id}/edit`,
      view: (id: string) => `/provider/experiences/${id}`,
    },
    bookings: {
      index: "/provider/bookings",
      create: "/provider/bookings/create",
      edit: (id: string) => `/provider/bookings/${id}/edit`,
      view: (id: string) => `/provider/bookings/${id}`,
    },
    customers: {
      index: "/provider/customers",
      view: (id: string) => `/provider/customers/${id}`,
    },
    analytics: "/provider/analytics",
    categories: {
      index: "/provider/categories",
      create: "/provider/categories/create",
      edit: (id: string) => `/provider/categories/${id}/edit`,
    },
    collections: {
      index: "/provider/collections",
      create: "/provider/collections/create",
      edit: (id: string) => `/provider/collections/${id}/edit`,
    },
    discounts: {
      index: "/provider/discounts",
      create: "/provider/discounts/create",
      edit: (id: string) => `/provider/discounts/${id}/edit`,
    },
    shipping: "/provider/shipping",
    regions: "/provider/regions",
    "time-slots": {
      index: "/provider/time-slots",
      create: "/provider/time-slots/create",
      edit: (id: string) => `/provider/time-slots/${id}/edit`,
    },
    reports: "/provider/reports",
    settings: "/provider/settings",
    profile: "/provider/profile",
    billing: "/provider/billing",
    notifications: "/provider/notifications",
    help: "/provider/help",
  },

  // Store routes
  store: {
    home: "/",
    products: "/products",
    categories: "/categories",
    collections: "/collections",
    cart: "/cart",
    checkout: "/checkout",
    account: "/account",
    orders: "/orders",
  },

  // Admin routes (if needed)
  admin: {
    dashboard: "/admin",
    products: "/admin/products",
    orders: "/admin/orders",
    customers: "/admin/customers",
    analytics: "/admin/analytics",
  },
} as const

// Type for autocomplete and type safety
export type Paths = typeof paths
export type ProviderPaths = typeof paths.provider
export type StorePaths = typeof paths.store
export type AdminPaths = typeof paths.admin

// Helper function to get provider paths
export const getProviderPaths = () => paths.provider

// Helper function to get store paths
export const getStorePaths = () => paths.store

// Helper function to get admin paths
export const getAdminPaths = () => paths.admin
