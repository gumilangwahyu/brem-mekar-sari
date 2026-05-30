import { NextResponse } from "next/server";
import { readSiteData, writeSiteData } from "@/lib/db";
import { fetchProducts, fetchContents } from "@/lib/sheets";

export async function GET() {
  const data = readSiteData();
  
  // If override is disabled, pre-populate with Google Sheets data
  if (!data.overrideProducts) {
    const sheetsProducts = await fetchProducts();
    data.products = sheetsProducts;
  }
  
  // If override is disabled, pre-populate with Google Sheets data
  if (!data.overrideContents) {
    const sheetsContents = await fetchContents();
    data.contents = sheetsContents;
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  writeSiteData(body);
  return NextResponse.json({ success: true });
}
