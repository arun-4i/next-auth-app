import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authjs.session-token");

  // Redirect to protected if already authenticated and trying to access login or signup
  if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect to "/login" if not authenticated and trying to access a protected route
  if (
    !token &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
