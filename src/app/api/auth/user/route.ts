import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("user")?.value;

    if (!userData) {
      return NextResponse.json(
        { error: true, message: "User data not found", data: null },
        { status: 404 },
      );
    }

    return NextResponse.json({
      error: false,
      message: "User retrieved successfully",
      data: JSON.parse(userData),
    });
  } catch (error) {
    console.error("Get user from cookie error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error", data: null },
      { status: 500 },
    );
  }
}
