import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

export async function POST(
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
    const { serviceId } = await req.json();

    if (!serviceId) {
      return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
    }

    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    if (session.role === "ADMIN" && appointment.branchId !== session.branchId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const [extraService, updatedAppointment] = await prisma.$transaction([
      prisma.appointmentExtraService.create({
        data: {
          appointmentId: id,
          serviceId: service.id,
          price: service.price,
        },
      }),
      prisma.appointment.update({
        where: { id },
        data: { totalAmount: { increment: service.price } },
        include: {
          branch: true,
          service: true,
          extraServices: { include: { service: true } },
        },
      }),
    ]);

    return NextResponse.json({ success: true, appointment: updatedAppointment });
  } catch (error) {
    console.error("Failed to add extra service:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
