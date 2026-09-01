"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoMailOutline,
} from "react-icons/io5";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-9 w-full max-w-sm border border-[#E2E5EA]"
      >
        <div className="w-11 h-11 rounded-md bg-[#14181F] flex items-center justify-center mb-6">
          <IoLockClosedOutline size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-semibold text-[#1A202C] mb-1">
          Admin console
        </h1>
        <p className="text-sm text-[#718096] mb-7">
          Sign in with your admin credentials
        </p>

        <label className="block text-xs font-medium text-[#4A5568] mb-1.5">
          Email
        </label>
        <div className="relative mb-4">
          <IoMailOutline
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@beautysalon.com"
            required
            className="w-full bg-white border border-[#E2E5EA] rounded-md pl-9 pr-3 py-2.5 text-sm text-[#1A202C] placeholder:text-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0]"
          />
        </div>

        <label className="block text-xs font-medium text-[#4A5568] mb-1.5">
          Password
        </label>
        <div className="relative mb-1">
          <IoLockClosedOutline
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-white border border-[#E2E5EA] rounded-md pl-9 pr-10 py-2.5 text-sm text-[#1A202C] placeholder:text-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/25 focus:border-[#2B6CB0]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#4A5568]"
          >
            {showPassword ? (
              <IoEyeOffOutline size={16} />
            ) : (
              <IoEyeOutline size={16} />
            )}
          </button>
        </div>

        {error && (
          <p className="text-[#C53030] text-sm mt-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#14181F] text-white py-2.5 rounded-md hover:bg-[#1F2532] transition-colors text-sm font-medium mt-6 disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
