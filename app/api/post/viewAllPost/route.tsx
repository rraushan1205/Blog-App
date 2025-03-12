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
          name: true,
          email: true,
        },
      },
      likedBy: {
        select: {
          id: true,
        },
      },
      comments: {
        select: {
          content: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(allPosts);
}
