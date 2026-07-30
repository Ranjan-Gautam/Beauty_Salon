"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

export default function AdminLoginPage() {
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
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f3f0] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-lg border-t-4 border-[#c47c5a]"
      >
        <div className="w-14 h-14 rounded-full bg-[#f9f3f0] flex items-center justify-center mx-auto mb-5">
          <IoLockClosedOutline size={24} className="text-[#c47c5a]" />
        </div>

        <h1 className="text-2xl font-serif text-[#2c1810] mb-1 text-center">
          Admin Access
        </h1>
        <p className="text-sm text-[#2c1810]/60 text-center mb-8">
          Enter your password to continue
        </p>

        <div className="relative mb-2">
          <IoLockClosedOutline
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#f9f3f0]/50 border border-[#e0cfc8] rounded pl-10 pr-10 py-3 text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30 focus:border-[#c47c5a]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
          >
            {showPassword ? (
              <IoEyeOffOutline size={18} />
            ) : (
              <IoEyeOutline size={18} />
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#c47c5a] text-white py-3 rounded hover:bg-[#a8623f] transition-colors font-medium mt-6 disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
}
