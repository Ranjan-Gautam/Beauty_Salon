import {  NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    `${process.env.SITE_URL}/appointment?payment=cancelled`
  );
}
