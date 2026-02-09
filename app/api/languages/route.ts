import { NextResponse } from "next/server";
export async function GET() {
  const res = await fetch(
    "https://client.camb.ai/apis/source-languages",
    {
      headers: {
        "x-api-key": process.env.CAMB_API_KEY!
      }
    }
  );

  return Response.json(await res.json());
}
