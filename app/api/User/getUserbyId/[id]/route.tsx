// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const User = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (User) {
    console.log(User);
    return NextResponse.json(User);
  }
  return NextResponse.json({ message: "No User Found" });
}
