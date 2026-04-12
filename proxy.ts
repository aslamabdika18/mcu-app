import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith("/admin")) {
    // sementara skip auth check
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}