import { NextRequest, NextResponse } from "next/server"

/**
 * Simplified middleware without region routing
 */
export async function middleware(request: NextRequest) {
  // Check if the url is a static asset
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  // For admin routes, let them pass through
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // For all other routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
