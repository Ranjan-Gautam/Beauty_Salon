import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, branch, date, time, message } = body;

    if (!name || !email || !phone || !service || !branch || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const branchRecord = await prisma.branch.findFirst({
      where: { name: branch },
    });
    const serviceRecord = await prisma.service.findFirst({
      where: { name: service },
    });

    if (!branchRecord || !serviceRecord) {
      return NextResponse.json(
        { error: "Invalid branch or service" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        date: new Date(date),
        time,
        message: message || null,
        branchId: branchRecord.id,
        serviceId: serviceRecord.id,
      },
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Appointment creation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}