import { NextResponse } from "next/server";
import { readSiteData, writeSiteData } from "@/lib/db";

export async function GET() {
  const data = readSiteData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  writeSiteData(body);
  return NextResponse.json({ success: true });
}
