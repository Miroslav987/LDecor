import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const revalidate = 0; 

let cache: any[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 часа

async function loadFromSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "Лист1!A:E",
  });

  const rows = response.data.values || [];
  if (!rows.length) return [];

  const header = rows[0];
  const data = rows.slice(1);

  return data.map((row) => {
    const item: any = {};

    header.forEach((col, i) => {
      item[col] = row[i] ?? "";
    });

    item.id = String(item.id);
    item.category = String(item.category || "Без категории");
    item.title = String(item.title || "");

    item.imgs = item.imgs
      ? item.imgs.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    item.price = Number(item.price) || 0;

    return item;
  });
}

export async function GET(req: NextRequest) {
  const now = Date.now();


  if (cache && now - cacheTime < CACHE_TTL) {
    return NextResponse.json(cache);
  }


  try {
    const products = await loadFromSheets();
    cache = products;
    cacheTime = now;

    return NextResponse.json(products);
  } catch (err: any) {
    console.error("Ошибка:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
