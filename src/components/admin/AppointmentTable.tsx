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
  paymentStatus: string;
  totalAmount: number;
  depositAmount: number;
  branch: { name: string };
  service: { name: string };
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const paymentStyles: Record<string, string> = {
  unpaid: "bg-gray-100 text-gray-600",
  deposit_paid: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
};

const paymentLabels: Record<string, string> = {
  unpaid: "Unpaid",
  deposit_paid: "Deposit Paid",
  paid: "Fully Paid",
};

const tabs = ["All", "Pending", "Confirmed", "Cancelled"];

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

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
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
    }
  }

  async function simulatePayment(id: string) {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/simulate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id }),
      });

      if (res.ok) {
        showToast("Deposit marked as paid.", "success");
        router.refresh();
      } else {
        showToast("Failed to update payment.", "error");
      }
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setUpdatingId(null);
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
      {/* Toolbar: tabs, search, logout */}
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

      {/* Table */}
      <div className="bg-white rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-sm min-w-[1100px]">
          <thead>
            <tr className="bg-[#f9f3f0] text-left text-[#2c1810]">
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Contact</th>
              <th className="px-5 py-4 font-medium">Service</th>
              <th className="px-5 py-4 font-medium">Branch</th>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Time</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Payment</th>
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, index) => {
              const balance = a.totalAmount - a.depositAmount;
              return (
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
                  <td className="px-5 py-4 text-[#2c1810]/70">
                    {a.branch.name}
                  </td>
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
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-1 ${
                        paymentStyles[a.paymentStatus] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {paymentLabels[a.paymentStatus] ?? a.paymentStatus}
                    </span>
                    {a.totalAmount > 0 && (
                      <p className="text-xs text-[#2c1810]/60">
                        Rs. {a.depositAmount.toLocaleString()} / Rs.{" "}
                        {a.totalAmount.toLocaleString()}
                        {balance > 0 && (
                          <span className="block text-[#c47c5a]">
                            Balance: Rs. {balance.toLocaleString()}
                          </span>
                        )}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {a.paymentStatus === "unpaid" && a.totalAmount > 0 && (
                        <button
                          disabled={updatingId === a.id}
                          onClick={() => simulatePayment(a.id)}
                          className="text-xs px-3 py-1.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors disabled:opacity-50"
                        >
                          Mark Deposit Paid
                        </button>
                      )}
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
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-10 text-center text-[#2c1810]/50"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm cancel modal */}
      {confirmCancelId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-serif text-[#2c1810] mb-2">
              Cancel this appointment?
            </h3>
            <p className="text-sm text-[#2c1810]/70 mb-6">
              This will mark the appointment as cancelled. This action can be
              reversed later if needed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="flex-1 py-2 rounded border border-[#e0cfc8] text-[#2c1810] hover:bg-[#f9f3f0] transition-colors text-sm"
              >
                Keep It
              </button>
              <button
                onClick={() => updateStatus(confirmCancelId, "cancelled")}
                className="flex-1 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
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
