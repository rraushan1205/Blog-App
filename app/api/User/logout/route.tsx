import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const cookie = serialize("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: -1, // Expire the cookie immediately
  });

  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      headers: { "Set-Cookie": cookie },
    }
  );
}
