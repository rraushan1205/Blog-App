import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vvvjsndkb";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  //   console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/createPost", "/"], // Add routes you want to protect
};
