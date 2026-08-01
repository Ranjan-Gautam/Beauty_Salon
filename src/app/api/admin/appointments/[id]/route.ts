import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendCancellationEmail } from "@/lib/sendEmail";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, reason } = await req.json();

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: { branch: true, service: true },
    });

    const emailData = {
      to: updated.email,
      name: updated.name,
      service: updated.service.name,
      branch: updated.branch.name,
      date: updated.date.toLocaleDateString(),
      time: updated.time,
    };

    if (status === "confirmed") {
      try {
        await sendConfirmationEmail(emailData);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    }

    if (status === "cancelled") {
      try {
        await sendCancellationEmail({ ...emailData, reason });
      } catch (emailError) {
        console.error("Failed to send cancellation email:", emailError);
      }
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error("Failed to update status:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
