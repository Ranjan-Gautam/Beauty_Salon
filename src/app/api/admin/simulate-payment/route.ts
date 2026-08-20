import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId } = await req.json();

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    const depositAmount = Math.floor(appointment.totalAmount / 2);

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        paymentStatus: "deposit_paid",
        depositAmount,
        transactionId:
          appointment.transactionId || `${appointmentId}-SIMULATED`,
      },
    });

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error("Simulate payment failed:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
