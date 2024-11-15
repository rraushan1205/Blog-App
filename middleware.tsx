import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Import jwtVerify from the jose library
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  // If the token is present, verify it
  if (authToken) {
    try {
      // Replace jwt.verify with jose's jwtVerify
      const secretKey = new TextEncoder().encode("$secret"); // Encode your secret key
      const { payload } = await jwtVerify(authToken.value, secretKey);
      // If verification is successful, redirect to viewPost
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      // If the token is invalid, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If no token, allow the request to continue (or redirect to login)
  return NextResponse.redirect(new URL("/login", request.url));
}

// Configure the matcher to apply the middleware to /login path
export const config = {
  matcher: ["/createPost", "/viewPost"],
};
