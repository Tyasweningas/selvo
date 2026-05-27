import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Routes yang memerlukan authentication seller
const sellerProtectedRoutes = ["/dashboard", "/dashboard-product"];

// Routes yang memerlukan authentication admin
const adminProtectedRoutes = ["/admin"];

// Routes yang hanya bisa diakses jika belum login sebagai seller
const sellerAuthRoutes = ["/auth"];

// Routes yang hanya bisa diakses jika belum login sebagai admin
const adminAuthRoutes = ["/auth/admin"];

export async function middleware(request: NextRequest) {
  const sessionToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = Boolean(sessionToken?.accessToken);
  const role = sessionToken?.role;
  const { pathname } = request.url ? new URL(request.url) : { pathname: "" };

  const isAdminAuthRoute = adminAuthRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminProtectedRoute = adminProtectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isSellerAuthRoute =
    !isAdminAuthRoute &&
    sellerAuthRoutes.some((route) => pathname.startsWith(route));
  const isSellerProtectedRoute = sellerProtectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Admin protected route
  if (isAdminProtectedRoute) {
    if (!isAuthenticated || role !== "ADMIN") {
      const redirectUrl = new URL("/auth/admin", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Seller protected route
  if (isSellerProtectedRoute) {
    if (!isAuthenticated) {
      const redirectUrl = new URL("/auth", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    if (role && role !== "SELLER") {
      // Logged in but not as seller, force seller login
      const redirectUrl = new URL("/auth", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Admin auth route, already logged in as admin
  if (isAdminAuthRoute && isAuthenticated && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Seller auth route, already logged in as seller
  if (isSellerAuthRoute && isAuthenticated && role === "SELLER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
