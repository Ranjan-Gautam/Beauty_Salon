"use client";

import { useState, useEffect } from "react";

interface AdminUser {
  id: string;
  email: string;
  role: "ADMIN" | "SUPERADMIN";
  createdAt: string;
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAdmins = async () => {
    const res = await fetch("/api/admin/list");
    if (res.ok) {
      const data = await res.json();
      setAdmins(data.admins);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(`Added ${data.admin.email} as ${data.admin.role}`);
      setEmail("");
      setPassword("");
      setRole("ADMIN");
      loadAdmins();
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  const handleRemove = async (id: string, adminEmail: string) => {
    if (!confirm(`Remove admin access for ${adminEmail}?`)) return;

    const res = await fetch(`/api/admin/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadAdmins();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to remove");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
      <h2 className="text-xl font-serif text-[#2c1810] mb-4">Manage Admin Access</h2>

      <form onSubmit={handleInvite} className="flex flex-wrap gap-3 mb-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-[#e0cfc8] rounded px-3 py-2 text-sm flex-1 min-w-[200px]"
        />
        <input
          type="password"
          placeholder="Temporary password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="border border-[#e0cfc8] rounded px-3 py-2 text-sm flex-1 min-w-[180px]"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "ADMIN" | "SUPERADMIN")}
          className="border border-[#e0cfc8] rounded px-3 py-2 text-sm"
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#c47c5a] text-white px-5 py-2 rounded text-sm hover:bg-[#b06a48] transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Grant Access"}
        </button>
      </form>

      {message && <p className="text-sm text-[#2c1810]/70 mb-4">{message}</p>}

      <div className="divide-y divide-[#e0cfc8]">
        {admins.map((a) => (
          <div key={a.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-[#2c1810]">{a.email}</p>
              <p className="text-xs text-[#2c1810]/50">{a.role}</p>
            </div>
            <button
              onClick={() => handleRemove(a.id, a.email)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
