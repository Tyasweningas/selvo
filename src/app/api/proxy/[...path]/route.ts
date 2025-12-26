import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:3000";

/**
 * Generic proxy untuk forward semua requests ke backend
 * Supports JSON dan FormData (multipart/form-data)
 * Token automatically diambil dari httpOnly cookie dan ditambahkan ke Authorization header
 */
async function handleRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("API URL :", BACKEND_URL);

    // ✅ Await params (Next.js 15 requirement)
    const { path: pathArray } = await context.params;

    // Build URL dari path parameter
    const path = pathArray.join("/");
    const url = `${BACKEND_URL}/api/${path}`;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // Prepare headers (conditionally set Content-Type)
    const headers: HeadersInit = {};

    // Add token dari cookie ke Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Handle body - support both JSON and FormData
    let body = null;
    let isFormData = false;

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      const contentType = request.headers.get("content-type");

      // Check if it's FormData
      if (contentType?.includes("multipart/form-data")) {
        // Get FormData from request
        body = await request.formData();
        isFormData = true;
        // Don't set Content-Type - fetch will set it automatically with boundary
      } else {
        // For JSON or other types
        const text = await request.text();
        body = text || null;

        // Set Content-Type for JSON
        if (
          text &&
          (!contentType || contentType.includes("application/json"))
        ) {
          headers["Content-Type"] = "application/json";
        }
      }
    }

    // Log di development
    if (process.env.NODE_ENV === "development") {
      console.log("🔄 Proxy:", request.method, fullUrl);
      console.log("📦 Type:", isFormData ? "FormData" : "JSON");
      if (isFormData) {
        console.log("📁 Files:", Array.from((body as FormData).keys()));
      }
    }

    // Forward request ke backend
    const response = await fetch(fullUrl, {
      method: request.method,
      headers,
      body,
    });

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, { status: response.status });
    }
  } catch (error) {
    console.error("❌ Proxy error:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

// Export untuk semua HTTP methods
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
