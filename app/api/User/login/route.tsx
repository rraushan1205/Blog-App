import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET = "$secret";

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
      const token = jwt.sign(
        { id: User.id, name: User.name, email: User.email },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const cookie = serialize("auth_token", token, {
        httpOnly: false, // Allows JavaScript to access the cookie
        secure: false, // Disables the secure flag for development
        maxAge: 60 * 60, // 1 hour in seconds
        path: "/", // Makes the cookie available on all routes
      });
      return NextResponse.redirect("https://blog-app-oidj.vercel.app/", {
        headers: { "Set-Cookie": cookie },
      });
    }
  }

  return NextResponse.redirect("https://blog-app-oidj.vercel.app/"); // Redirect to login if user does not exist
}
