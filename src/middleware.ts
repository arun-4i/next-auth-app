// app/middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authjs.session-token");

  console.log("Request Path:", req.nextUrl.pathname); // Debug log
  console.log("Token:", token); // Debug log

  // Define protected routes
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/protected");

  // Check if the request is for a protected route
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect if no token
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"], // Only apply to protected routes
};
