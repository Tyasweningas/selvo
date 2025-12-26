# 🔐 Secure Authentication Implementation Guide

Implementasi secure authentication menggunakan Next.js sebagai BFF (Backend-for-Frontend) proxy dengan httpOnly cookies.

## 📋 Overview

Sistem ini menggunakan arsitektur secure authentication dimana:

1. **Token disimpan di httpOnly cookies** (tidak accessible via JavaScript - XSS protection)
2. **Next.js bertindak sebagai proxy** antara browser dan backend API
3. **Backend API tidak perlu diubah** - Next.js mengkonversi cookie → Authorization header
4. **Generic proxy pattern** - 1 file untuk handle semua API calls

```
Browser ↔ Next.js (httpOnly cookies) ↔ Backend API (Authorization header)
```

## 🏗️ Architecture

### Flow Diagram

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser   │         │   Next.js    │         │  Backend API │
│             │         │   (Proxy)    │         │              │
└──────┬──────┘         └───────┬──────┘         └──────┬───────┘
       │                        │                       │
       │  POST /api/auth/login  │                       │
       │ { email, password }    │                       │
       ├───────────────────────>│                       │
       │                        │ POST /api/auth/login  │
       │                        │ { email, password }   │
       │                        ├──────────────────────>│
       │                        │                       │
       │                        │ Response: { token }   │
       │                        │<──────────────────────┤
       │                        │                       │
       │   Set-Cookie: token    │                       │
       │   (httpOnly, secure)   │                       │
       │<───────────────────────┤                       │
       │                        │                       │
       │  GET /api/proxy/products                       │
       │  (cookie auto-attached)                        │
       ├───────────────────────>│                       │
       │                        │ GET /api/products     │
       │                        │ Authorization: Bearer │
       │                        ├──────────────────────>│
       │                        │                       │
       │                        │ Response: [...data]   │
       │                        │<──────────────────────┤
       │   Response: [...data]  │                       │
       │<───────────────────────┤                       │
       │                        │                       │
```

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       ├── proxy/
│       │   └── [...path]/
│       │       └── route.ts          # Generic proxy untuk semua API calls
│       └── auth/
│           ├── login/route.ts        # Login endpoint
│           ├── register/route.ts     # Register endpoint
│           ├── logout/route.ts       # Logout endpoint
│           └── me/route.ts           # Get current user
├── lib/
│   ├── api-client.ts                 # Client-side API client (Client Components)
│   └── server-api-client.ts          # Server-side API client (Server Components)
├── services/
│   └── auth.service.ts               # Authentication service
├── components/
│   └── seller/auth/
│       ├── login-form.tsx            # Login form component
│       └── register-form.tsx         # Register form component
└── middleware.ts                     # Route protection + security headers
```

## 🔧 Setup

### 1. Environment Variables

Buat file `.env.local`:

```bash
BACKEND_API_URL=http://localhost:3000/api
```

> **Note:** Backend API harus running di port 3000, Next.js akan di port 3001 (atau sesuaikan dengan setup Anda)

### 2. Install Dependencies

Pastikan dependencies sudah terinstall:

```bash
pnpm install axios
```

### 3. Jalankan Backend API

Jalankan backend API Anda (port 3000):

```bash
# Contoh jika backend di folder terpisah
cd ../backend
npm run dev
```

### 4. Jalankan Next.js

```bash
pnpm dev
```

## 🔐 Security Features

### 1. httpOnly Cookies

Token disimpan di httpOnly cookies yang:

- ✅ **Tidak bisa diakses JavaScript** (XSS protection)
- ✅ **Automatically attached** ke setiap request
- ✅ **Secure flag** in production (HTTPS only)
- ✅ **SameSite: strict** (CSRF protection)
- ✅ **7 days expiry** (bisa disesuaikan)

### 2. Security Headers

Middleware menambahkan security headers:

- `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
- `X-Frame-Options: DENY` - Prevent clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection (legacy browsers)
- `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer
- `Strict-Transport-Security` - HTTPS enforcement (production only)

### 3. Route Protection

Middleware melindungi routes:

- `/dashboard/*` - Require authentication
- `/dashboard-product/*` - Require authentication
- `/auth` - Redirect jika sudah login

### 4. Token Management

- Token **TIDAK pernah** exposed ke client-side JavaScript
- Token **automatically included** di semua requests (via cookies)
- Token **automatically forwarded** ke backend dengan Authorization header
- Token **automatically cleared** on 401 errors

## 📝 Usage Examples

### Client Components (Browser)

```tsx
"use client";
import { useState } from "react";
import authService from "@/services/auth.service";
import apiClient from "@/lib/api-client";

export default function MyComponent() {
  // Login
  const handleLogin = async () => {
    const response = await authService.login({
      email: "user@example.com",
      password: "password123",
    });
    // Token automatically stored in httpOnly cookie
    // No manual token management needed
  };

  // Fetch data (token automatically included)
  const fetchProducts = async () => {
    const response = await apiClient.get("/products");
    return response.data;
  };

  // Create data
  const createOrder = async (data) => {
    const response = await apiClient.post("/orders", data);
    return response.data;
  };

  // Logout
  const handleLogout = async () => {
    await authService.logout();
    // Cookie automatically cleared
  };
}
```

### Server Components (SSR)

```tsx
import { serverApiClient } from "@/lib/server-api-client";

// This runs on the server
export default async function ProductsPage() {
  // Token automatically extracted from cookies and added to Authorization header
  const response = await serverApiClient.get("/products");
  const products = response.data;

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Protected Pages

```tsx
// src/app/dashboard/page.tsx
import { serverApiClient } from "@/lib/server-api-client";

// This page is automatically protected by middleware
export default async function DashboardPage() {
  // If user not authenticated, middleware will redirect to /auth
  const response = await serverApiClient.get("/auth/me");
  const seller = response.data.seller;

  return (
    <div>
      <h1>Welcome, {seller.name}!</h1>
      <p>Balance: ${seller.balance}</p>
    </div>
  );
}
```

## 🔄 Authentication Flow

### Login Flow

1. User submit login form
2. `LoginForm` call `authService.login()`
3. `authService` call `/api/auth/login` (Next.js API route)
4. Next.js API route call backend `/api/auth/login`
5. Backend return `{ token, seller }`
6. Next.js store token in httpOnly cookie
7. Next.js return seller data (WITHOUT token) to browser
8. Browser redirect to dashboard
9. All subsequent requests automatically include token via cookie

### Authenticated Request Flow

1. Client call `apiClient.get('/products')`
2. Request goes to `/api/proxy/products` (Next.js)
3. Next.js extract token from httpOnly cookie
4. Next.js add `Authorization: Bearer ${token}` header
5. Next.js forward request to backend `/api/products`
6. Backend validate token and return data
7. Next.js forward response back to client

### Logout Flow

1. User click logout button
2. `authService.logout()` call `/api/auth/logout`
3. Next.js delete httpOnly cookie
4. Browser redirect to login page

## 🚀 Testing

### 1. Test Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

### 2. Test Authenticated Request

```bash
curl http://localhost:3001/api/proxy/products \
  -b cookies.txt
```

### 3. Test Logout

```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -b cookies.txt
```

## 🐛 Debugging

### Check if token is set

Browser DevTools → Application → Cookies → localhost

You should see:

- Name: `token`
- Value: `[your-jwt-token]`
- HttpOnly: ✅
- Secure: ✅ (in production)
- SameSite: Strict

### Check Network Requests

1. Open Network tab in DevTools
2. Login or make authenticated request
3. Check request headers - should see `Cookie: token=...`
4. Check response headers on login - should see `Set-Cookie: token=...`

### Enable Debug Logs

API client will log requests/responses in development mode automatically.

### Common Issues

**Issue:** Token not being sent to backend

- **Solution:** Check if `withCredentials: true` is set in api-client.ts

**Issue:** CORS errors

- **Solution:** Backend harus allow credentials dan set proper CORS headers

**Issue:** Cookie not being set

- **Solution:** Check cookie configuration (domain, path, sameSite)

**Issue:** 401 Unauthorized after login

- **Solution:** Check if token is being extracted correctly in proxy route

## 📚 API Endpoints

### Authentication Endpoints

#### POST /api/auth/login

Login user dan set httpOnly cookie

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "seller": {
      "sellerId": "123",
      "email": "user@example.com",
      "name": "John Doe",
      "balance": 1000
    }
  }
}
```

**Headers:**

```
Set-Cookie: token=xxx; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/
```

#### POST /api/auth/register

Register new user dan set httpOnly cookie

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:** Same as login

#### POST /api/auth/logout

Delete httpOnly cookie

**Response:**

```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

#### GET /api/auth/me

Get current authenticated user

**Response:**

```json
{
  "status": "success",
  "data": {
    "seller": {
      "sellerId": "123",
      "email": "user@example.com",
      "name": "John Doe",
      "balance": 1000
    }
  }
}
```

### Generic Proxy Endpoint

#### /api/proxy/[...path]

Proxy all requests to backend API with automatic token injection

**Example:**

- `/api/proxy/products` → `http://localhost:3000/api/products`
- `/api/proxy/orders/123` → `http://localhost:3000/api/orders/123`

All HTTP methods supported: GET, POST, PUT, PATCH, DELETE

## 🔒 Best Practices

### 1. Never Store Token in localStorage

❌ **DON'T:**

```typescript
localStorage.setItem("token", token);
```

✅ **DO:**

```typescript
// Token automatically stored in httpOnly cookie by API route
// No manual token management needed
```

### 2. Use Server Components When Possible

✅ **DO:** Use Server Components for data fetching

```tsx
// app/products/page.tsx
import { serverApiClient } from "@/lib/server-api-client";

export default async function ProductsPage() {
  const products = await serverApiClient.get("/products");
  return <ProductList products={products.data} />;
}
```

### 3. Handle Errors Gracefully

```tsx
"use client";
import { useState } from "react";
import { formatErrorForDisplay } from "@/lib/error-handler";

export default function MyForm() {
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await authService.login({ email, password });
    } catch (err) {
      setError(formatErrorForDisplay(err));
    }
  };
}
```

### 4. Protect Routes with Middleware

```typescript
// middleware.ts
const protectedRoutes = ["/dashboard", "/dashboard-product"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = new URL(request.url);

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
```

## 🚨 Security Checklist

- [x] Token stored in httpOnly cookies (not localStorage)
- [x] Token tidak exposed ke client-side JavaScript
- [x] Cookies set dengan SameSite: Strict
- [x] Secure flag enabled in production
- [x] Security headers added via middleware
- [x] Route protection via middleware
- [x] Automatic token cleanup on 401 errors
- [x] HTTPS enforced in production (HSTS header)
- [x] CORS properly configured
- [x] Error messages don't expose sensitive info

## 📖 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [OWASP Security Best Practices](https://owasp.org/www-project-web-security-testing-guide/)
- [httpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

## 🤝 Contributing

Jika ada bug atau improvement:

1. Buat issue di repository
2. Atau submit pull request dengan changes

## 📄 License

MIT License - Silakan gunakan sesuai kebutuhan Anda.
