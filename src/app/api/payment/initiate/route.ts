import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateEsewaSignature } from "@/lib/esewa";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, amount, redirectTo } = await req.json();

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Encode where the customer should land after payment (default: /appointment)
    const source = redirectTo === "dashboard" ? "dashboard" : "appointment";
    const transaction_uuid = `${appointmentId}::${source}::${Date.now()}`;
    const total_amount = amount.toString();
    const product_code = process.env.ESEWA_PRODUCT_CODE!;

    const signature = generateEsewaSignature({
      total_amount,
      transaction_uuid,
      product_code,
    });

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { transactionId: transaction_uuid },
    });

    return NextResponse.json({
      paymentUrl: process.env.ESEWA_PAYMENT_URL,
      formData: {
        amount: total_amount,
        tax_amount: "0",
        total_amount,
        transaction_uuid,
        product_code,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${process.env.SITE_URL}/api/payment/success`,
        failure_url: `${process.env.SITE_URL}/api/payment/failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      },
    });
  } catch (error) {
    console.error("Payment initiation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}