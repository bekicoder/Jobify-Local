import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db"; // your pool import
import bcrypt from "bcrypt";
import enData from "@/lib/languages/en.json";
import amData from "@/lib/languages/am.json";
import hdData from "@/lib/languages/hd.json";

export async function GET() {
  try {
    // Wrap all queries in a transaction
    await pool.query("BEGIN");
    //     // 1. Users Table
    //     await pool.query(`
    //   CREATE TABLE IF NOT EXISTS users (
    //     id SERIAL PRIMARY KEY,
    //     name TEXT NOT NULL,
    //     email TEXT NOT NULL UNIQUE,
    //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    //     password VARCHAR(255),
    //     profile VARCHAR(100),
    //     enlocation VARCHAR(255),
    //     amlocation VARCHAR(255)
    //   );
    // `);

    //     // 2. Organizations Table
    //     await pool.query(`
    //   CREATE TABLE IF NOT EXISTS organizations (
    //     id SERIAL PRIMARY KEY,
    //     orgname VARCHAR(255) NOT NULL,
    //     email VARCHAR(255) NOT NULL,
    //     profile VARCHAR(100),
    //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    //     password VARCHAR(255) NOT NULL,
    //     amlocation VARCHAR(255),
    //     enlocation VARCHAR(255)
    //   );
    // `);

    //     // 3. Job Translations Table
    //     await pool.query(`
    //   CREATE TABLE IF NOT EXISTS jobtranslations (
    //     id SERIAL PRIMARY KEY,
    //     location VARCHAR(255) NOT NULL,
    //     jobtype VARCHAR(255) NOT NULL,
    //     catagory VARCHAR(255) NOT NULL,
    //     detail TEXT NOT NULL,
    //     title TEXT NOT NULL
    //   );
    // `);

    //     // 4. Jobs Table
    //     await pool.query(`
    //   CREATE TABLE IF NOT EXISTS jobs (
    //     id SERIAL PRIMARY KEY,
    //     created_at VARCHAR(255) DEFAULT NOW(),
    //     enjobid INTEGER NOT NULL REFERENCES jobtranslations(id) ON DELETE CASCADE,
    //     amjobid INTEGER NOT NULL REFERENCES jobtranslations(id) ON DELETE CASCADE,
    //     posted_by VARCHAR(255) NOT NULL,
    //     salary_range VARCHAR(255) NOT NULL,
    //     updated_at VARCHAR(255)
    //   );
    // `);

    //     // 5. Proposals Table
    //     await pool.query(`
    //   CREATE TABLE IF NOT EXISTS proposals (
    //     id SERIAL PRIMARY KEY,
    //     sender VARCHAR(255) NOT NULL,
    //     career_id TEXT,
    //     created_at VARCHAR(255) DEFAULT NOW(),
    //     career_owner VARCHAR(255),
    //     name VARCHAR(255),
    //     seenstatus BOOLEAN DEFAULT FALSE,
    //     approval VARCHAR(100) DEFAULT 'pending',
    //     amproposal TEXT,
    //     enproposal TEXT,
    //     senderlocen VARCHAR(255),
    //     senderlocam VARCHAR(255)
    //   );
    // `);

    //     // 6. Saved Jobs Table
    //     await pool.query(`
    //   CREATE TABLE IF NOT EXISTS savedjobs (
    //     id SERIAL PRIMARY KEY,
    //     career_id TEXT NOT NULL,
    //     saved_at VARCHAR DEFAULT NOW(),
    //     user_id VARCHAR(255) NOT NULL
    //   );
    // `);

    //  const res = await pool.query(`
    //     SELECT table_name
    //     FROM information_schema.tables
    //     WHERE table_schema = 'public'
    //     AND table_type = 'BASE TABLE';
    //   `);

    //   const res = await pool.query(`
    //   CREATE TABLE IF NOT EXISTS translations (
    //     lang_code VARCHAR(10) PRIMARY KEY, -- 'en', 'am', 'hd'
    //     content JSONB NOT NULL,
    //     updated_at TIMESTAMP DEFAULT NOW()
    // );
    // `);

    // const languages = [
    //     { code: 'en', data: enData },
    //     { code: 'hd', data: hdData },
    //     { code: 'am', data: amData }
    //   ];

    //     for (const lang of languages) {
    //       await pool.query(
    //         `INSERT INTO translations (lang_code, content)
    //          VALUES ($1, $2)
    //          ON CONFLICT (lang_code)
    //          DO UPDATE SET content = $2, updated_at = NOW()`,
    //         [lang.code, lang.data]
    //       );
    //       console.log(`Successfully stored: ${lang.code}`);
    //     }

    const result = await pool.query(
      "SELECT content FROM translations WHERE lang_code = $1",
      ["hd"],
    );
    const fullData = result.rows[0].content;

    console.log(fullData.cities); // This will show the cities array
    await pool.query("COMMIT");

    return NextResponse.json({
      message: "All tables created successfully!",
      data: fullData,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error creating tables:", error);
    return NextResponse.json(
      { error: "Failed to create tables", details: error },
      { status: 500 },
    );
  }
}
