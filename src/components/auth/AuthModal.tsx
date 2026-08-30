"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoKeyOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const body =
      mode === "login" ? { email, password } : { name, email, password, phone };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      onSuccess(data.user);
      onClose();
    } else {
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg relative w-full max-w-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white md:text-[#2c1810]/50 hover:text-[#c47c5a] bg-black/20 md:bg-transparent rounded-full p-1"
        >
          ✕
        </button>

        {/* Left image panel */}
        <div className="relative w-full md:w-2/5 h-40 md:h-auto shrink-0">
          <Image
            src="/auth/salon-auth-panel.jpg"
            alt="Beauty Salon"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/70 via-[#2c1810]/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 hidden md:block">
            <p className="text-white font-serif text-xl leading-tight">
              Beauty Salon
            </p>
            <p className="text-white/80 text-xs mt-1">
              Book appointments, track your visits, and manage your bookings all
              in one place.
            </p>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto">
          <div className="flex bg-[#f9f3f0] rounded-full p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "login" ? "bg-[#c47c5a] text-white" : "text-[#4a3728]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "signup" ? "bg-[#c47c5a] text-white" : "text-[#4a3728]"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-serif text-[#2c1810] mb-1">
            {mode === "login" ? (
              <>
                Welcome <span className="text-[#c47c5a]">back!</span>
              </>
            ) : (
              <>
                Let&apos;s make your{" "}
                <span className="text-[#c47c5a]">account!</span>
              </>
            )}
          </h2>
          <p className="text-sm text-[#2c1810]/60 mb-6">
            {mode === "login"
              ? "Sign in to manage your appointments."
              : "Create your account and start booking instantly."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs text-[#2c1810]/70 mb-1 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <IoPersonOutline
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                  />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-[#e0cfc8] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#2c1810] placeholder:text-[#2c1810]/40  focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-[#2c1810]/70 mb-1 block">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IoMailOutline
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#e0cfc8] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#2c1810] placeholder:text-[#2c1810]/40  focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-xs text-[#2c1810]/70 mb-1 block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <IoCallOutline
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                  />
                  <input
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-[#e0cfc8] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#2c1810] placeholder:text-[#2c1810]/40  focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-[#2c1810]/70 mb-1 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IoKeyOutline
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-[#e0cfc8] rounded-lg pl-9 pr-9 py-2.5 text-sm text-[#2c1810] placeholder:text-[#2c1810]/40 focus:outline-none focus:ring-2 focus:ring-[#c47c5a]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c47c5a]"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={16} />
                  ) : (
                    <IoEyeOutline size={16} />
                  )}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="text-right -mt-1">
                <button
                  type="button"
                  className="text-xs text-[#c47c5a] hover:underline"
                  onClick={() => alert("Password reset coming soon")}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c47c5a] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#a8623f] transition-colors disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Register"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#e0cfc8]" />
            <span className="text-xs text-[#2c1810]/40">Or</span>
            <div className="flex-1 h-px bg-[#e0cfc8]" />
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full border border-[#e0cfc8] rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm text-[#2c1810] hover:bg-[#f9f3f0] transition-colors"
          >
            <FcGoogle size={18} />
            {mode === "login" ? "Sign in with Google" : "Register with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
