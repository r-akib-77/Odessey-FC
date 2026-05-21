# Auth API Endpoints Design

**Goal:** Implement login and logout API endpoints for admin authentication in a Next.js application.

**Architecture:**
- Use Next.js Route Handlers (App Router).
- Endpoints located at `src/app/api/auth/login/route.ts` and `src/app/api/auth/logout/route.ts`.
- Authentication state managed via a JWT stored in an `httpOnly` cookie named `admin_token`.

**Security:**
- `httpOnly`: Prevents client-side scripts from accessing the cookie.
- `secure`: Ensures the cookie is only sent over HTTPS (enabled in production).
- `sameSite: "strict"`: Protects against CSRF attacks.
- `maxAge`: Token expires in 2 hours.

**Data Flow:**
1. **Login:**
   - Client sends POST request with `username` and `password`.
   - Server validates credentials against environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
   - If valid, server generates JWT and sets the `admin_token` cookie.
2. **Logout:**
   - Client sends POST request.
   - Server clears the `admin_token` cookie by setting `maxAge` to 0.

**Testing Strategy:**
- Verify that valid credentials result in a successful response and a cookie being set.
- Verify that invalid credentials result in a 401 response.
- Verify that logout clears the cookie.
