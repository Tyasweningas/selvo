import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear httpOnly cookies
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("user");

    // Set toast message for logout
    cookieStore.set("toast-message", "Logout berhasil!", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5,
      path: "/",
    });

    cookieStore.set("toast-type", "success", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5,
      path: "/",
    });

    return NextResponse.json({
      error: false,
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error", data: null },
      { status: 500 },
    );
  }
}
