// app/api/translate/route.ts (Next.js 13+ App Router)
import { NextRequest, NextResponse } from "next/server";

const CAMB_API_KEY = process.env.CAMB_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json();
    console.log(text,targetLang,"is it fine")
    if (!text || !targetLang) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Create translation task
    const createRes = await fetch("https://client.camb.ai/apis/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CAMB_API_KEY!,
      },
      body: JSON.stringify({
        target_language: Number(targetLang), // ensure numeric
        texts: [text],
      }),
    });

    const createData = await createRes.json();
    const taskId = createData.task_id;

    if (!taskId) {
      return NextResponse.json(
        { error: "Translation task not created", raw: createData },
        { status: 500 }
      );
    }

    // 2️⃣ Poll status
    let runId: string | null = null;
    while (!runId) {
      const statusRes = await fetch(
        `https://client.camb.ai/apis/translate/${taskId}`,
        { headers: { "x-api-key": CAMB_API_KEY! } }
      );
      const status = await statusRes.json();

      if (status.status === "SUCCESS") runId = status.run_id;
      else if (status.status === "ERROR") {
        return NextResponse.json(
          { error: "Translation failed", raw: status },
          { status: 500 }
        );
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    // 3️⃣ Get result
    const resultRes = await fetch(
      `https://client.camb.ai/apis/translation-result/${runId}`,
      { headers: { "x-api-key": CAMB_API_KEY! } }
    );
    const result = await resultRes.json();

    return NextResponse.json({
      translatedText: result.texts?.[0] || "",
      raw: result,
    });
  } catch (err) {
    console.error("Translate route error:", err);
    return NextResponse.json(
      { error: "Internal server error", raw: err },
      { status: 500 }
    );
  }
}
