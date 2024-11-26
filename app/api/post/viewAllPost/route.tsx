// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const allPosts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true, // Include name of the user
          email: true, // Include email of the user
        },
      },
      likedBy: {
        select: {
          id: true,
        },
      },
    },
  });

  return NextResponse.json(allPosts);
}
