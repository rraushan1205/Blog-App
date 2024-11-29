import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  const { postId, userId } = await request.json();
  const existingLike = await prisma.postLike.findUnique({
    where: {
      userId_postId: { userId, postId }, // Composite unique constraint
    },
  });
  if (existingLike) {
    return NextResponse.json({
      message: "Already There",
    });
  }

  await prisma.postLike.create({
    data: {
      userId,
      postId,
    },
  });
  const getpost = await prisma.post.update({
    where: { id: postId },
    data: {
      likedBy: {
        connect: { id: userId }, // Connect the user
      },
      likecount: {
        increment: 1,
      },
    },
  });
  return NextResponse.json(getpost);
}
