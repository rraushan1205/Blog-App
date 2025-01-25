// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  const getsPosts = await prisma.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  
  return NextResponse.json({ data: getsPosts });
}
