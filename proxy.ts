import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!)

const roleRoutes: Record<string, string> = {
  DISPATCHER: "/dashboard/ops",
  PACKER: "/dashboard/ops",
  CUSTOMER: "/dashboard/customer",
  OPERATOR: "/dashboard/ops",
  ADMIN: "/dashboard/ops",
}

const roleDashboardMap: Record<string, string[]> = {
  DISPATCHER: ["/dashboard/ops"],
  PACKER: ["/dashboard/ops"],
  CUSTOMER: ["/dashboard/customer"],
  OPERATOR: ["/dashboard/ops"],
  ADMIN: ["/dashboard/ops"],
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const sessionCookie = request.cookies.get("session")?.value

  let session: Record<string, unknown> | null = null
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, secret)
      session = payload as unknown as Record<string, unknown>
    } catch {
      // invalid token
    }
  }

  const isDashboardRoute = pathname.startsWith("/dashboard")
  const isAuthRoute = pathname === "/login" || pathname === "/register"

  if (isDashboardRoute && !session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && session) {
    const role = session.role as string
    const dashboard = roleRoutes[role] || "/dashboard/customer"
    return NextResponse.redirect(new URL(dashboard, request.url))
  }

  if (session && isDashboardRoute) {
    const role = session.role as string
    const allowedPaths = roleDashboardMap[role] || []
    const hasAccess = allowedPaths.some((p) => pathname.startsWith(p))
    if (!hasAccess) {
      return NextResponse.redirect(new URL(roleRoutes[role] || "/dashboard/customer", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    { source: "/dashboard/:path*" },
    { source: "/login" },
    { source: "/register" },
  ],
}
