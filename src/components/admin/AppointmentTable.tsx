"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  IoSearchOutline,
  IoLogOutOutline,
  IoAddOutline,
} from "react-icons/io5";

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
  date: Date;
  time: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  depositAmount: number;
  branch: { name: string };
  service: { name: string };
  extraServices?: ExtraService[];
}

interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

const statusStyles: Record<string, string> = {
  pending: "bg-[#FEF3D8] text-[#B7791F]",
  confirmed: "bg-[#E3F5EA] text-[#2F855A]",
  cancelled: "bg-[#FCE9E9] text-[#C53030]",
};

const paymentStyles: Record<string, string> = {
  unpaid: "bg-[#EDF0F3] text-[#718096]",
  deposit_paid: "bg-[#E3EDF8] text-[#2B6CB0]",
  paid: "bg-[#E3F5EA] text-[#2F855A]",
};

const paymentLabels: Record<string, string> = {
  unpaid: "Unpaid",
  deposit_paid: "Deposit paid",
  paid: "Fully paid",
};

const tabs = ["All", "Pending", "Confirmed", "Cancelled"];

export default function AdminAppointmentsTable({
  appointments,
  services,
}: {
  appointments: Appointment[];
  services: ServiceOption[];
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
  const [addingServiceFor, setAddingServiceFor] = useState<string | null>(null);
  const [pickedServiceId, setPickedServiceId] = useState("");

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

  async function addExtraService(appointmentId: string) {
    if (!pickedServiceId) return;
    setUpdatingId(appointmentId);
    try {
      const res = await fetch(
        `/api/admin/appointments/${appointmentId}/extra-services`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceId: pickedServiceId }),
        },
      );

      if (res.ok) {
        showToast("Service added.", "success");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error || "Failed to add service.", "error");
      }
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setUpdatingId(null);
      setAddingServiceFor(null);
      setPickedServiceId("");
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex gap-1.5 flex-wrap bg-white border border-[#E2E5EA] rounded-md p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#14181F] text-white"
                  : "text-[#4A5568] hover:bg-[#F4F5F7]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <IoSearchOutline
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email"
              className="bg-white border border-[#E2E5EA] rounded-md pl-9 pr-3 py-2 text-sm text-[#1A202C] placeholder:text-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0] w-full sm:w-56"
            />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 text-sm text-[#718096] hover:text-[#1A202C] transition-colors px-3 py-2 shrink-0"
          >
            <IoLogOutOutline size={16} />
            Log out
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-x-auto border border-[#E2E5EA]">
        <table className="w-full text-sm min-w-[1200px]">
          <thead>
            <tr className="bg-[#F4F5F7] text-left text-[#4A5568] border-b border-[#E2E5EA]">
              <th className="px-5 py-3 font-medium text-xs">Name</th>
              <th className="px-5 py-3 font-medium text-xs">Contact</th>
              <th className="px-5 py-3 font-medium text-xs">Service</th>
              <th className="px-5 py-3 font-medium text-xs">Branch</th>
              <th className="px-5 py-3 font-medium text-xs">Date</th>
              <th className="px-5 py-3 font-medium text-xs">Time</th>
              <th className="px-5 py-3 font-medium text-xs">Status</th>
              <th className="px-5 py-3 font-medium text-xs">Payment</th>
              <th className="px-5 py-3 font-medium text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const balance = a.totalAmount - a.depositAmount;
              const extras = a.extraServices ?? [];
              return (
                <tr
                  key={a.id}
                  className="border-b border-[#EDF0F3] last:border-0 hover:bg-[#F9FAFB] transition-colors align-top"
                >
                  <td className="px-5 py-3.5 text-[#1A202C] font-medium">
                    {a.name}
                  </td>
                  <td className="px-5 py-3.5 text-[#4A5568]">
                    <p>{a.email}</p>
                    <p className="text-xs text-[#A0AEC0]">{a.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[#4A5568]">
                    <p>{a.service.name}</p>
                    {extras.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {extras.map((ex) => (
                          <li key={ex.id} className="text-xs text-[#2B6CB0]">
                            + {ex.service.name} (Rs. {ex.price.toLocaleString()}
                            )
                          </li>
                        ))}
                      </ul>
                    )}
                    {a.status !== "cancelled" &&
                      (addingServiceFor === a.id ? (
                        <div className="mt-2 flex items-center gap-1.5">
                          <select
                            value={pickedServiceId}
                            onChange={(e) => setPickedServiceId(e.target.value)}
                            className="border border-[#E2E5EA] rounded px-2 py-1 text-xs text-[#1A202C] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0]"
                          >
                            <option value="">Select service</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name} — Rs. {s.price.toLocaleString()}
                              </option>
                            ))}
                          </select>
                          <button
                            disabled={updatingId === a.id || !pickedServiceId}
                            onClick={() => addExtraService(a.id)}
                            className="text-xs px-2 py-1 rounded bg-[#2B6CB0] text-white hover:bg-[#25599A] disabled:opacity-50"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setAddingServiceFor(null);
                              setPickedServiceId("");
                            }}
                            className="text-xs text-[#718096] hover:text-[#1A202C]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAddingServiceFor(a.id)}
                          className="mt-1.5 flex items-center gap-1 text-xs text-[#2B6CB0] hover:text-[#25599A] font-medium"
                        >
                          <IoAddOutline size={13} />
                          Add service
                        </button>
                      ))}
                  </td>
                  <td className="px-5 py-3.5 text-[#4A5568]">
                    {a.branch.name}
                  </td>
                  <td className="px-5 py-3.5 text-[#4A5568]">
                    {new Date(a.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 text-[#4A5568]">{a.time}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-medium capitalize ${
                        statusStyles[a.status] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-medium mb-1 ${
                        paymentStyles[a.paymentStatus] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {paymentLabels[a.paymentStatus] ?? a.paymentStatus}
                    </span>
                    {a.totalAmount > 0 && (
                      <p className="text-xs text-[#718096]">
                        Rs. {a.depositAmount.toLocaleString()} / Rs.{" "}
                        {a.totalAmount.toLocaleString()}
                        {balance > 0 && (
                          <span className="block text-[#B7791F]">
                            Balance: Rs. {balance.toLocaleString()}
                          </span>
                        )}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2 flex-wrap">
                      {a.status === "pending" && (
                        <button
                          disabled={updatingId === a.id}
                          onClick={() => updateStatus(a.id, "confirmed")}
                          className="text-xs px-2.5 py-1.5 rounded bg-[#E3F5EA] text-[#2F855A] hover:bg-[#D2EEDD] transition-colors disabled:opacity-50 font-medium"
                        >
                          Confirm
                        </button>
                      )}
                      {a.status !== "cancelled" && (
                        <button
                          disabled={updatingId === a.id}
                          onClick={() => setConfirmCancelId(a.id)}
                          className="text-xs px-2.5 py-1.5 rounded bg-[#FCE9E9] text-[#C53030] hover:bg-[#F9D8D8] transition-colors disabled:opacity-50 font-medium"
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
                  className="px-5 py-10 text-center text-[#A0AEC0]"
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
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-[#E2E5EA]">
            <h3 className="text-base font-semibold text-[#1A202C] mb-2">
              Cancel this appointment?
            </h3>
            <p className="text-sm text-[#718096] mb-6">
              This marks the appointment as cancelled. You can reverse this
              later if needed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="flex-1 py-2 rounded-md border border-[#E2E5EA] text-[#4A5568] hover:bg-[#F4F5F7] transition-colors text-sm font-medium"
              >
                Keep it
              </button>
              <button
                onClick={() => updateStatus(confirmCancelId, "cancelled")}
                className="flex-1 py-2 rounded-md bg-[#C53030] text-white hover:bg-[#A82A2A] transition-colors text-sm font-medium"
              >
                Cancel appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 px-4 py-3 rounded-md text-sm font-medium z-50 text-center sm:text-left ${
            toast.type === "success"
              ? "bg-[#2F855A] text-white"
              : "bg-[#C53030] text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
