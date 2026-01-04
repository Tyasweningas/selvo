import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("🔐 Login Request - Backend URL:", BACKEND_URL);
    console.log("🔐 Login Request - Body:", body);

    // Forward request ke backend
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📡 Backend Response Status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const token = data.data.token;

    // Fetch user data dari /api/auth/me
    const meResponse = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let userData = null;
    if (meResponse.ok) {
      const meData = await meResponse.json();
      userData = meData.data;
    }

    // Set httpOnly cookies
    const cookieStore = await cookies();

    // Token cookie (HTTP-only)
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // User data cookie (HTTP-only)
    if (userData) {
      cookieStore.set("user", JSON.stringify(userData.seller), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    // Toast message cookies (readable by client)
    cookieStore.set("toast-message", "Login berhasil!", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5, // 5 seconds
      path: "/",
    });

    cookieStore.set("toast-type", "success", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5, // 5 seconds
      path: "/",
    });

    // JANGAN return token ke client
    return NextResponse.json({
      error: false,
      message: data.message,
      data: {
        seller: data.data.seller,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error", data: null },
      { status: 500 },
    );
  }
}
