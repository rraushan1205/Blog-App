import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { content, userId, postId } = await request.json();
  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
  const getUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (getPost && getUser) {
    const newComment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
    return NextResponse.json({ message: newComment });
  }
  return NextResponse.json({ messgae: "Something Went wrong" });
}
