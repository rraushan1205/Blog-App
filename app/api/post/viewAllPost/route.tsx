// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { client } from "@/lib/dib";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const getRedisData = await client.get("block");
  if (getRedisData) {
    return NextResponse.json(JSON.parse(getRedisData));
  }

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
  await client.setEx("block", 50, JSON.stringify(allPosts));
  return NextResponse.json(allPosts);
}
