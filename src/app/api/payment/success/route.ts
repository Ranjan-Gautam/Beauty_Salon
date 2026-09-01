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

    // transaction_uuid was encoded as `${appointmentId}::${source}::${timestamp}`
    const [, source] = transaction_uuid.split("::");
    const backTo = source === "dashboard" ? "/dashboard" : "/appointment";

    if (status !== "COMPLETE") {
      return NextResponse.redirect(
        `${process.env.SITE_URL}${backTo}?payment=failed`
      );
    }

    const appointment = await prisma.appointment.findFirst({
      where: { transactionId: transaction_uuid },
    });

    if (!appointment) {
      return NextResponse.redirect(
        `${process.env.SITE_URL}${backTo}?payment=notfound`
      );
    }

    const paidAmount = parseInt(total_amount, 10);
    const newDepositAmount = appointment.depositAmount + paidAmount;
    const newPaymentStatus =
      newDepositAmount >= appointment.totalAmount ? "paid" : "deposit_paid";

    await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        paymentStatus: newPaymentStatus,
        depositAmount: newDepositAmount,
      },
    });

    return NextResponse.redirect(
      `${process.env.SITE_URL}${backTo}?payment=success`
    );
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.redirect(
      `${process.env.SITE_URL}/appointment?payment=error`
    );
  }
}