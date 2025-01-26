import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Await the promise to get the actual params
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
