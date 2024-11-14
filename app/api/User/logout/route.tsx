"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Router } from "next/router";

export async function GET() {
  (await cookies()).delete("auth_token");
  // return NextResponse.redirect("http://localhost:3000/login");
  return NextResponse.json({ message: "Logged out" });
}
