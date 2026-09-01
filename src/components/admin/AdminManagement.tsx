"use client";

import { useState, useEffect } from "react";

interface AdminUser {
  id: string;
  email: string;
  role: "ADMIN" | "SUPERADMIN";
  createdAt: string;
  branch?: { id: string; name: string } | null;
}

interface BranchOption {
  id: string;
  name: string;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [branches, setBranches] = useState<BranchOption[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");
  const [branchId, setBranchId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAdmins = async () => {
    const res = await fetch("/api/admin/list");
    if (res.ok) {
      const data = await res.json();
      setAdmins(data.admins);
    }
  };

  const loadBranches = async () => {
    const res = await fetch("/api/branches");
    if (res.ok) {
      const data = await res.json();
      setBranches(data.branches ?? data);
    }
  };

  useEffect(() => {
    loadAdmins();
    loadBranches();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "ADMIN" && !branchId) {
      setMessage("Select a branch for this admin.");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        role,
        branchId: role === "ADMIN" ? branchId : undefined,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(`Added ${data.admin.email} as ${data.admin.role}.`);
      setEmail("");
      setPassword("");
      setRole("ADMIN");
      setBranchId("");
      loadAdmins();
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  const handleRemove = async (id: string, adminEmail: string) => {
    if (!confirm(`Remove admin access for ${adminEmail}?`)) return;

    const res = await fetch(`/api/admin/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadAdmins();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to remove.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E2E5EA] p-6 mt-8">
      <h2 className="text-base font-semibold text-[#1A202C] mb-1">
        Admin access
      </h2>
      <p className="text-sm text-[#718096] mb-5">
        Grant branch managers access to their location&apos;s appointments.
      </p>

      <form
        onSubmit={handleInvite}
        className="flex flex-wrap gap-2.5 mb-6 items-start"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-[#E2E5EA] rounded-md px-3 py-2 text-sm text-[#1A202C] placeholder:text-[#A0AEC0] flex-1 min-w-[190px] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0]"
        />
        <input
          type="password"
          placeholder="Temporary password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="border border-[#E2E5EA] rounded-md px-3 py-2 text-sm text-[#1A202C] placeholder:text-[#A0AEC0] flex-1 min-w-[170px] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0]"
        />
        <select
          value={role}
          onChange={(e) => {
            const newRole = e.target.value as "ADMIN" | "SUPERADMIN";
            setRole(newRole);
            if (newRole === "SUPERADMIN") setBranchId("");
          }}
          className="border border-[#E2E5EA] rounded-md px-3 py-2 text-sm text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0]"
        >
          <option value="ADMIN">Branch admin</option>
          <option value="SUPERADMIN">Super admin</option>
        </select>
        {role === "ADMIN" && (
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
            className="border border-[#E2E5EA] rounded-md px-3 py-2 text-sm text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0]"
          >
            <option value="">Select branch</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#14181F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1F2532] transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Grant access"}
        </button>
      </form>

      {message && (
        <p className="text-sm text-[#718096] mb-4">{message}</p>
      )}

      <div className="divide-y divide-[#EDF0F3] border-t border-[#EDF0F3]">
        {admins.map((a) => (
          <div key={a.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-[#1A202C]">{a.email}</p>
              <p className="text-xs text-[#718096]">
                {a.role === "SUPERADMIN" ? "Super admin" : "Branch admin"}
                {a.branch ? ` · ${a.branch.name}` : ""}
              </p>
            </div>
            <button
              onClick={() => handleRemove(a.id, a.email)}
              className="text-xs text-[#C53030] hover:text-[#A82A2A] font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
