// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (id) {
      // Get posts by user (authorId)
      const postsById = await prisma.post.findFirst({
        where: {
          id,
        },
      });

      return NextResponse.json({
        data: postsById,
        message: "Posts by user fetched successfully",
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
