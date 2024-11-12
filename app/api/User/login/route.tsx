import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "vvvjsndkb";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const User = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (User) {
    if (bcrypt.compareSync(password, User.password)) {
      const token = jwt.sign({ id: User.id, email: User.email }, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      console.log(JWT_SECRET);

      // Create the cookie with the JWT token
      const cookie = serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // use secure flag in production
        sameSite: "strict",
        path: "/",
        maxAge: 24 * 60 * 60, // 1 day
      });
      console.log("logged in");
      // Redirect to the homepage after successful login
      return NextResponse.redirect("http://localhost:3000/", {
        headers: { "Set-Cookie": cookie },
      });
    }
    return NextResponse.redirect("http://localhost:3000/login"); // Redirect to login if password is incorrect
  }

  return NextResponse.redirect("http://localhost:3000/login"); // Redirect to login if user does not exist
}
