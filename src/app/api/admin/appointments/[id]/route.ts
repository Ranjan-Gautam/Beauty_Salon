import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendCancellationEmail } from "@/lib/sendEmail";
import { verifySession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get("admin_session")?.value;
    const session = token ? await verifySession(token) : null;

    if (!session || (session.role !== "ADMIN" && session.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status, reason, paymentStatus } = await req.json();

    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    if (session.role === "ADMIN" && existing.branchId !== session.branchId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (paymentStatus) {
      if (!["unpaid", "deposit_paid", "paid"].includes(paymentStatus)) {
        return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
      }
      const updated = await prisma.appointment.update({
        where: { id },
        data: { paymentStatus },
        include: {
          branch: true,
          service: true,
          extraServices: { include: { service: true } },
        },
      });
      return NextResponse.json({ success: true, appointment: updated });
    }

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        branch: true,
        service: true,
        extraServices: { include: { service: true } },
      },
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
    console.error("Failed to update appointment:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
