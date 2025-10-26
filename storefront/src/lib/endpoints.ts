// API Endpoints configuration
export const endpoints = {
  // Authentication endpoints
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },

  // User/Profile endpoints
  user: {
    profile: "/user/profile",
    updateProfile: "/user/profile",
    changePassword: "/user/change-password",
    deleteAccount: "/user/account",
  },

  // Products endpoints
  products: {
    list: "/products",
    detail: (id: string) => `/products/${id}`,
    create: "/products",
    update: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
    search: "/products/search",
    categories: "/products/categories",
  },
  productsWithExtension: {
    list: "/admin/products-with-extension",
    create: "/admin/products-with-extension",
  },

  // Orders endpoints
  orders: {
    list: "/orders",
    detail: (id: string) => `/orders/${id}`,
    create: "/orders",
    update: (id: string) => `/orders/${id}`,
    cancel: (id: string) => `/orders/${id}/cancel`,
  },

  // Cart endpoints
  cart: {
    get: "/cart",
    addItem: "/cart/items",
    updateItem: (id: string) => `/cart/items/${id}`,
    removeItem: (id: string) => `/cart/items/${id}`,
    clear: "/cart",
  },

  // Categories endpoints
  categories: {
    list: "/store/product-categories",
    detail: (id: string) => `/store/product-categories/${id}`,
    create: "/admin/product-categories",
    update: (id: string) => `/admin/product-categories/${id}`,
    delete: (id: string) => `/admin/product-categories/${id}`,
  },

  // Collections endpoints
  collections: {
    list: "/collections",
    detail: (id: string) => `/collections/${id}`,
    create: "/collections",
    update: (id: string) => `/collections/${id}`,
    delete: (id: string) => `/collections/${id}`,
  },

  // Regions endpoints
  regions: {
    list: "/regions",
    detail: (id: string) => `/regions/${id}`,
  },

  // Shipping endpoints
  shipping: {
    options: "/shipping-options",
    calculate: "/shipping-options/calculate",
  },

  // Payment endpoints
  payment: {
    methods: "/payment-methods",
    process: "/payments",
    confirm: (id: string) => `/payments/${id}/confirm`,
  },

  // Provider specific endpoints
  provider: {
    experiences: {
      list: "/provider/experiences",
      detail: (id: string) => `/provider/experiences/${id}`,
      create: "/provider/experiences",
      update: (id: string) => `/provider/experiences/${id}`,
      delete: (id: string) => `/provider/experiences/${id}`,
    },
    bookings: {
      list: "/provider/bookings",
      detail: (id: string) => `/provider/bookings/${id}`,
      update: (id: string) => `/provider/bookings/${id}`,
    },
    timeSlots: {
      list: "/provider/time-slots",
      detail: (id: string) => `/provider/time-slots/${id}`,
      create: "/provider/time-slots",
      update: (id: string) => `/provider/time-slots/${id}`,
      delete: (id: string) => `/provider/time-slots/${id}`,
    },
    productRules: {
      list: "/provider/product-rules",
      detail: (id: string) => `/provider/product-rules/${id}`,
      create: "/provider/product-rules",
      update: (id: string) => `/provider/product-rules/${id}`,
      delete: (id: string) => `/provider/product-rules/${id}`,
    },
  },

  // Admin endpoints
  admin: {
    users: {
      list: "/admin/users",
      detail: (id: string) => `/admin/users/${id}`,
      create: "/admin/users",
      update: (id: string) => `/admin/users/${id}`,
      delete: (id: string) => `/admin/users/${id}`,
    },
    products: {
      list: "/admin/products",
      detail: (id: string) => `/admin/products/${id}`,
      create: "/admin/products",
      update: (id: string) => `/admin/products/${id}`,
      delete: (id: string) => `/admin/products/${id}`,
    },
    orders: {
      list: "/admin/orders",
      detail: (id: string) => `/admin/orders/${id}`,
      update: (id: string) => `/admin/orders/${id}`,
    },
    analytics: {
      dashboard: "/admin/analytics/dashboard",
      sales: "/admin/analytics/sales",
      users: "/admin/analytics/users",
    },
  },

  // Health check
  health: "/health",
} as const

export type EndpointKey = keyof typeof endpoints
export type EndpointPath = (typeof endpoints)[EndpointKey]
