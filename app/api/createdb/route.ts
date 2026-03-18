import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db"; // your pool import
import bcrypt from "bcrypt";

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

   const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `);
    await pool.query("COMMIT");

    return NextResponse.json({ message: "All tables created successfully!",data:res });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error creating tables:", error);
    return NextResponse.json(
      { error: "Failed to create tables", details: error },
      { status: 500 },
    );
  }
}
