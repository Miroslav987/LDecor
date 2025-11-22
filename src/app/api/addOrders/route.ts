import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientPhone, products, totalPrice } = body;


    if (!clientName || !clientPhone) {
      return NextResponse.json(
        { success: false, error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.ORDERS_SPREADSHEET_ID) {
      throw new Error("Не заданы переменные окружения для Google Sheets");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.ORDERS_SPREADSHEET_ID;

    const now = new Date();
    const addData = now.toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });


    const rows = products.map((p: any) => [
      clientName,
      clientPhone,
      addData,
      p.name,
      p.quantity || 1,
      p.price,
      totalPrice,
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Лист1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Ошибка отправки заказа:", error.message || error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import { google } from "googleapis";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { clientName, clientPhone, products, totalPrice } = body;

//     if (!clientName || !clientPhone) {
//       return NextResponse.json(
//         { success: false, error: "Имя и телефон обязательны" },
//         { status: 400 }
//       );
//     }

//     if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.ORDERS_SPREADSHEET_ID) {
//       throw new Error("Не заданы переменные окружения для Google Sheets");
//     }

//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         type: "service_account",
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });
//     const spreadsheetId = process.env.ORDERS_SPREADSHEET_ID;

//     const now = new Date();
//     const addData = now.toLocaleString("ru-RU", {
//       day: "numeric",
//       month: "long",
//       hour: "2-digit",
//       minute: "2-digit",
//     });


//     const orderData = products.map(p => ({
//       name: p.name,
//       quantity: p.quantity || 1,
//       price: p.price,
//     }));


//     const rows = [[
//       clientName,
//       clientPhone,
//       addData,
//       JSON.stringify(orderData),
//       totalPrice
//     ]];

//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: "Лист1!A:E",
//       valueInputOption: "USER_ENTERED",
//       requestBody: { values: rows },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("Ошибка отправки заказа:", error.message || error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
