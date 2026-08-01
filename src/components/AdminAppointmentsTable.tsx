"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IoSearchOutline, IoLogOutOutline } from "react-icons/io5";

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

const tabs = ["All", "Pending", "Confirmed", "Cancelled"];

const cancelReasons = [
  { label: "General cancellation", value: "" },
  {
    label: "Closed for public holiday",
    value: "We are closed on this date for a public holiday.",
  },
  {
    label: "Specialist unavailable",
    value:
      "Our specialist for this service is unavailable on the requested date.",
  },
  {
    label: "Fully booked / overbooked",
    value: "We are fully booked at this time slot due to high demand.",
  },
  {
    label: "Branch under maintenance",
    value: "This branch is temporarily closed for maintenance.",
  },
  {
    label: "Could not reach customer",
    value: "We were unable to reach you to confirm the details.",
  },
];

export default function AdminAppointmentsTable({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function updateStatus(id: string, status: string, reason?: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason }),
      });

      if (res.ok) {
        showToast(`Appointment marked as ${status}.`, "success");
        router.refresh();
      } else {
        showToast("Failed to update status.", "error");
      }
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setUpdatingId(null);
      setConfirmCancelId(null);
      setCancelReason("");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesTab =
        activeTab === "All" || a.status === activeTab.toLowerCase();
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [appointments, activeTab, search]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#c47c5a] text-white"
                  : "bg-white text-[#2c1810]/70 hover:bg-[#f0e2da]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <IoSearchOutline
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="bg-white border border-[#e0cfc8] rounded-full pl-9 pr-4 py-2 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a] w-full sm:w-56"
            />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 text-sm text-[#2c1810]/70 hover:text-[#c47c5a] transition-colors px-3 py-2 shrink-0"
          >
            <IoLogOutOutline size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-sm min-w-[900px]">
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
            {filtered.map((a, index) => (
              <tr
                key={a.id}
                className={`border-t border-[#f0e2da] ${
                  index % 2 === 1 ? "bg-[#f9f3f0]/30" : ""
                } hover:bg-[#f9f3f0]/60 transition-colors`}
              >
                <td className="px-5 py-4 text-[#2c1810] font-medium">
                  {a.name}
                </td>
                <td className="px-5 py-4 text-[#2c1810]/70">
                  <p>{a.email}</p>
                  <p className="text-xs text-[#2c1810]/50">{a.phone}</p>
                </td>
                <td className="px-5 py-4 text-[#2c1810]/70">
                  {a.service.name}
                </td>
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
                        onClick={() => setConfirmCancelId(a.id)}
                        className="text-xs px-3 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-[#2c1810]/50"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmCancelId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-serif text-[#2c1810] mb-2">
              Cancel this appointment?
            </h3>
            <p className="text-sm text-[#2c1810]/70 mb-4">
              The customer will be notified by email. Let them know why
              (optional).
            </p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border border-[#e0cfc8] rounded px-3 py-2 text-sm text-[#2c1810] mb-6 focus:outline-none focus:border-[#c47c5a]"
            >
              {cancelReasons.map((r) => (
                <option key={r.label} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setConfirmCancelId(null);
                  setCancelReason("");
                }}
                className="flex-1 py-2 rounded border border-[#e0cfc8] text-[#2c1810] hover:bg-[#f9f3f0] transition-colors text-sm"
              >
                Keep It
              </button>
              <button
                onClick={() =>
                  updateStatus(confirmCancelId, "cancelled", cancelReason)
                }
                className="flex-1 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50 text-center sm:text-left ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
