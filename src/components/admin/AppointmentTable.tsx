"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  status: string;
  branch: { name: string };
  service: { name: string };
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminAppointmentsTable({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-x-auto shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f9f3f0] text-left text-[#2c1810]">
            <th className="px-5 py-4 font-medium">Name</th>
            <th className="px-5 py-4 font-medium">Contact</th>
            <th className="px-5 py-4 font-medium">Service</th>
            <th className="px-5 py-4 font-medium">Branch</th>
            <th className="px-5 py-4 font-medium">Date</th>
            <th className="px-5 py-4 font-medium">Time</th>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, index) => (
            <tr
              key={a.id}
              className={`border-t border-[#f0e2da] ${
                index % 2 === 1 ? "bg-[#f9f3f0]/30" : ""
              } hover:bg-[#f9f3f0]/60 transition-colors`}
            >
              <td className="px-5 py-4 text-[#2c1810] font-medium">{a.name}</td>
              <td className="px-5 py-4 text-[#2c1810]/70">
                <p>{a.email}</p>
                <p className="text-xs text-[#2c1810]/50">{a.phone}</p>
              </td>
              <td className="px-5 py-4 text-[#2c1810]/70">{a.service.name}</td>
              <td className="px-5 py-4 text-[#2c1810]/70">{a.branch.name}</td>
              <td className="px-5 py-4 text-[#2c1810]/70">
                {new Date(a.date).toLocaleDateString()}
              </td>
              <td className="px-5 py-4 text-[#2c1810]/70">{a.time}</td>
              <td className="px-5 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    statusStyles[a.status] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {a.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  {a.status !== "confirmed" && (
                    <button
                      disabled={updatingId === a.id}
                      onClick={() => updateStatus(a.id, "confirmed")}
                      className="text-xs px-3 py-1.5 rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                    >
                      Confirm
                    </button>
                  )}
                  {a.status !== "cancelled" && (
                    <button
                      disabled={updatingId === a.id}
                      onClick={() => updateStatus(a.id, "cancelled")}
                      className="text-xs px-3 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-10 text-center text-[#2c1810]/50"
              >
                No appointments yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
