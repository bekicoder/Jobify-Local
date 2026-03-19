import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [enRes, amRes, hdRes] = await Promise.all([
      pool.query("SELECT content FROM translations WHERE lang_code = 'en'"),
      pool.query("SELECT content FROM translations WHERE lang_code = 'am'"),
      pool.query("SELECT content FROM translations WHERE lang_code = 'hd'")
    ]);

    return Response.json({
      en: enRes.rows[0]?.content,
      am: amRes.rows[0]?.content,
      hd: hdRes.rows[0]?.content
    });

  } catch (err) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}