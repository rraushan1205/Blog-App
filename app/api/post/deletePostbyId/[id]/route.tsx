import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const Post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ id: id, post: Post });
  } catch (error) {
    console.log("No post Found here with this id");
  }
  return NextResponse.json({ id: id, message: "No Post found" });
}
