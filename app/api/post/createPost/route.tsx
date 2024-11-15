import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
interface CustomJwtPayload extends JwtPayload {
  id: number; // or string, depending on the type of your user ID
}
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  const cookieStore = await cookies();
  console.log(formData, title, content);
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    return NextResponse.json({ error: "No auth token found" }, { status: 401 });
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(authToken);
    console.log("Decoded Token:", decodedToken);
    const userId = decodedToken.id;

    const User = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (User) {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published: true,
          author: { connect: { id: User.id } },
        },
      });
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
}
