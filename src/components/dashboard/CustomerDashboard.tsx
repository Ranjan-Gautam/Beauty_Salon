"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoCardOutline,
  IoQrCodeOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoSparklesOutline,
  IoChevronForwardOutline,
  IoCutOutline,
} from "react-icons/io5";
import Link from "next/link";

interface ExtraService {
  id: string;
  price: number;
  service: { id: string; name: string };
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string | Date;
  time: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  depositAmount: number;
  branch: { name: string };
  service: { name: string };
  extraServices?: ExtraService[];
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function CustomerDashboard({
  customerName,
  appointments,
}: {
  customerName: string;
  appointments: Appointment[];
}) {
  const [selectedForPayment, setSelectedForPayment] =
    useState<Appointment | null>(
      appointments.find((a) => a.totalAmount - a.depositAmount > 0) || null,
    );
  const [paymentMethod, setPaymentMethod] = useState<"esewa" | "qr">("esewa");
  const [initiatingPayment, setInitiatingPayment] = useState(false);

  async function payWithEsewa(appointment: Appointment) {
    setInitiatingPayment(true);
    try {
      const balance = appointment.totalAmount - appointment.depositAmount;
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appointment.id,
          amount: balance,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentUrl || !data.formData) {
        alert(data.error || "Could not start payment. Please try again.");
        setInitiatingPayment(false);
        return;
      }

      // eSewa requires the signed fields to be POSTed as an HTML form,
      // not just navigated to as a URL.
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;

      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch {
      alert("Something went wrong starting the payment.");
      setInitiatingPayment(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#C28E64] text-sm font-semibold tracking-wide uppercase mb-1">
              <IoSparklesOutline size={16} />
              <span>Customer Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A3B32]">
              Welcome back, {customerName.split(" ")[0]}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your bookings, view treatment history, and complete
              payments.
            </p>
          </div>

          <Link
            href="/appointment"
            className="bg-[#C28E64] hover:bg-[#B07D53] text-white px-6 py-3 rounded-2xl font-medium text-sm transition-all shadow-md shadow-[#C28E64]/20 flex items-center gap-2 no-underline"
          >
            <IoCutOutline size={16} />
            <span>Book New Service</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A3B32]">
              My Appointments
            </h2>

            {appointments.length === 0 && (
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFD5] text-center text-sm text-gray-500">
                You don&apos;t have any appointments yet.
              </div>
            )}

            {appointments.map((apt) => {
              const balance = apt.totalAmount - apt.depositAmount;
              const extras = apt.extraServices ?? [];
              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-sm hover:border-[#C28E64]/50 transition-all space-y-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-xs px-3 py-0.5 rounded-full font-semibold border capitalize ${
                            statusStyles[apt.status] ??
                            "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {apt.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {apt.branch.name}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#4A3B32]">
                        {apt.service.name}
                      </h3>
                      {extras.length > 0 && (
                        <ul className="mt-1 space-y-0.5">
                          {extras.map((ex) => (
                            <li key={ex.id} className="text-xs text-[#C28E64]">
                              + {ex.service.name} (Rs.{" "}
                              {ex.price.toLocaleString()})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-bold text-[#C28E64]">
                        Rs. {apt.totalAmount.toLocaleString()}
                      </span>
                      <p className="text-xs font-medium text-gray-400 mt-1 capitalize">
                        {apt.paymentStatus.replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#FAF7F2] text-sm text-[#6E5A4D] flex-wrap gap-3">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <IoCalendarOutline
                          size={16}
                          className="text-[#C28E64]"
                        />
                        <span>{new Date(apt.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IoTimeOutline size={16} className="text-[#C28E64]" />
                        <span>{apt.time}</span>
                      </div>
                    </div>

                    {balance > 0 && apt.status !== "cancelled" && (
                      <button
                        onClick={() => setSelectedForPayment(apt)}
                        className="text-xs font-semibold text-[#C28E64] hover:underline flex items-center"
                      >
                        Pay Rs. {balance.toLocaleString()} balance{" "}
                        <IoChevronForwardOutline size={12} className="ml-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A3B32]">
              Payment Portal
            </h2>

            {!selectedForPayment ? (
              <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-sm text-sm text-gray-500 text-center">
                No outstanding balance right now.
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-sm space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Outstanding Balance
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-semibold text-gray-700 text-sm">
                      {selectedForPayment.service.name}
                    </span>
                    <span className="font-bold text-[#4A3B32] text-base">
                      Rs.{" "}
                      {(
                        selectedForPayment.totalAmount -
                        selectedForPayment.depositAmount
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Select Payment Method
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod("esewa")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all ${
                        paymentMethod === "esewa"
                          ? "border-green-600 bg-green-50/50 text-green-900 ring-2 ring-green-600/20"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <IoCardOutline
                        size={20}
                        className="text-green-600 mb-1"
                      />
                      <span className="text-xs font-semibold">
                        eSewa Online
                      </span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("qr")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all ${
                        paymentMethod === "qr"
                          ? "border-[#C28E64] bg-[#FDFBF7] text-[#4A3B32] ring-2 ring-[#C28E64]/20"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <IoQrCodeOutline
                        size={20}
                        className="text-[#C28E64] mb-1"
                      />
                      <span className="text-xs font-semibold">
                        Pay at Salon
                      </span>
                    </button>
                  </div>
                </div>

                {paymentMethod === "esewa" ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-xs">
                      <IoAlertCircleOutline
                        size={16}
                        className="text-amber-600 shrink-0 mt-0.5"
                      />
                      <span>
                        eSewa sandbox is active. You&apos;ll be redirected to
                        the test payment gateway.
                      </span>
                    </div>

                    <button
                      disabled={initiatingPayment}
                      onClick={() => payWithEsewa(selectedForPayment)}
                      className="w-full bg-[#60BB46] hover:bg-[#52a33c] text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-green-600/20 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                    >
                      <IoCheckmarkCircleOutline size={16} />
                      <span>
                        {initiatingPayment
                          ? "Redirecting..."
                          : "Pay via eSewa Sandbox"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 text-center">
                    <p className="text-xs text-gray-500">
                      Scan this QR using your banking app when you visit the
                      salon.
                    </p>

                    <div className="relative w-40 h-40 mx-auto rounded-2xl border border-dashed border-[#C28E64]/40 overflow-hidden">
                      <Image
                        src="/payment-qr.jpg"
                        alt="Payment QR code"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <IoCheckmarkCircleOutline size={16} />
                      <span>Show this to staff to confirm your visit</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
