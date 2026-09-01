import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dataParam = req.nextUrl.searchParams.get("data");
  let backTo = "/appointment";

  if (dataParam) {
    try {
      const decoded = JSON.parse(
        Buffer.from(dataParam, "base64").toString("utf-8")
      );
      const [, source] = (decoded.transaction_uuid || "").split("::");
      if (source === "dashboard") backTo = "/dashboard";
    } catch {
      // fall back to /appointment if we can't decode
    }
  }

  return NextResponse.redirect(
    `${process.env.SITE_URL}${backTo}?payment=cancelled`
  );
}