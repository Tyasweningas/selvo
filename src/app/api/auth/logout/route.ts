import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  // List of cookies set by NextAuth to clear
  const cookiesToDelete = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.callback-url",
    "__Secure-next-auth.callback-url",
    "next-auth.csrf-token",
    "__Secure-next-auth.csrf-token",
  ];

  for (const cookieName of cookiesToDelete) {
    cookieStore.delete(cookieName);
  }

  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect") || "/auth";

  // Redirect to target path, ensuring it is a relative redirect or relative to request origin
  const redirectUrl = new URL(redirectTo, request.url);

  return NextResponse.redirect(redirectUrl);
}
