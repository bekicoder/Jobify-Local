import { NextRequest, NextResponse } from "next/server";
import {franc} from "franc";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const text  = searchParams.get("text")
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Detect language (returns ISO 639-3 code, e.g. 'eng', 'amh', 'fra')
    const langCode = franc(text);
    return NextResponse.json({ language: langCode });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
