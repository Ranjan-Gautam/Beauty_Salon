import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const dataParam = req.nextUrl.searchParams.get("data");

    if (!dataParam) {
      return NextResponse.redirect(
        `${process.env.SITE_URL}/appointment?payment=failed`
      );
    }

    const decoded = JSON.parse(
      Buffer.from(dataParam, "base64").toString("utf-8")
    );

    const { transaction_uuid, status, total_amount } = decoded;

    if (status !== "COMPLETE") {
      return NextResponse.redirect(
        `${process.env.SITE_URL}/appointment?payment=failed`
      );
    }

    const appointment = await prisma.appointment.findFirst({
      where: { transactionId: transaction_uuid },
    });

    if (!appointment) {
      return NextResponse.redirect(
        `${process.env.SITE_URL}/appointment?payment=notfound`
      );
    }

    await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        paymentStatus: "deposit_paid",
        depositAmount: parseInt(total_amount, 10),
      },
    });

    return NextResponse.redirect(
      `${process.env.SITE_URL}/appointment?payment=success`
    );
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.redirect(
      `${process.env.SITE_URL}/appointment?payment=error`
    );
  }
}
