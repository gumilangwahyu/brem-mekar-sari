import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database cloud belum dikonfigurasi di Vercel." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada berkas yang dikirimkan." }, { status: 400 });
    }

    // Convert file to Buffer for Supabase upload
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique name to prevent collisions
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    // Upload to 'brem-assets' bucket
    const { data, error } = await supabase.storage
      .from("brem-assets")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage error:", error);
      
      // If bucket does not exist, let's explain clearly to create it
      if (error.message.includes("Bucket not found") || error.message.includes("does not exist")) {
        return NextResponse.json({ 
          error: "Bucket 'brem-assets' belum dibuat di Supabase Storage. Silakan buat bucket dengan nama tersebut dan atur ke 'Public'." 
        }, { status: 404 });
      }
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate public URL
    const { data: urlData } = supabase.storage
      .from("brem-assets")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (e: any) {
    console.error("Upload handler exception:", e);
    return NextResponse.json({ error: e.message || "Proses unggah gambar gagal." }, { status: 500 });
  }
}
