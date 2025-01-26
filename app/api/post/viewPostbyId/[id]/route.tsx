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
      const postsByUser = await prisma.post.findMany({
        where: {
          authorId: id, // Filtering posts by authorId
        },
        include: {
          likedBy: {
            select: {
              id: true,
            },
          },
        },
      });

      return NextResponse.json({
        data: postsByUser,
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
