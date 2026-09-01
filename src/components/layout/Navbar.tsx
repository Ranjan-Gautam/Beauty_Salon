"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSession, signOut as googleSignOut } from "next-auth/react";
import { HiMenu, HiX } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";
import AuthModal from "@/components/auth/AuthModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

interface AuthUser {
  name: string;
  email: string;
  image?: string | null;
}

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: googleSession } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [emailUser, setEmailUser] = useState<AuthUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setEmailUser(data.user));
  }, []);

  useEffect(() => {
    if (searchParams.get("authRequired") === "appointment") {
      setShowAuthModal(true);
    }
  }, [searchParams]);

  // Google session takes priority if present, otherwise fall back to email/password session
  const user: AuthUser | null = googleSession?.user
    ? {
        name: googleSession.user.name || "Google User",
        email: googleSession.user.email || "",
        image: googleSession.user.image,
      }
    : emailUser;

  const isGoogleUser = !!googleSession?.user;

  const handleLogout = async () => {
    if (isGoogleUser) {
      await googleSignOut({ redirect: false });
    } else {
      await fetch("/api/auth/logout", { method: "POST" });
      setEmailUser(null);
    }
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="w-full bg-[#f9f3f0] border-b border-[#e0cfc8] px-4 md:px-8 h-18 flex items-center justify-between md:justify-start gap-8 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-px no-underline">
          <Image
            src="/logo-beauty-salon-1.jpg"
            alt="Beauty Salon"
            width={250}
            height={250}
            className="w-32 md:w-[250px] h-auto md:ml-30"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-10 list-none m-0 p-0 ml-20">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xl no-underline transition-colors ${
                  pathname === link.href
                    ? "text-[#c47c5a]"
                    : "text-[#4a3728] hover:text-[#c47c5a]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <Link
            href="/appointment"
            className="border border-[#c47c5a] text-[#c47c5a] text-xm px-6 py-2 rounded hover:bg-[#c47c5a] hover:text-white transition-colors no-underline"
          >
            Appointment
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-[#4a3728] hover:text-[#c47c5a]"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircleOutline size={28} />
                )}
                <span className="text-sm">{user.name.split(" ")[0]}</span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e0cfc8] py-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-[#4a3728] hover:bg-[#f9f3f0] no-underline"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#4a3728] hover:bg-[#f9f3f0]"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-sm text-[#4a3728] hover:text-[#c47c5a] font-medium"
            >
              Sign In
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#4a3728]"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {isOpen && (
          <div className="lg:hidden fixed top-18 left-0 w-full h-[calc(100vh-4.5rem)] bg-[#f9f3f0] z-40 overflow-y-auto">
            <ul className="flex flex-col items-start gap-1 px-6 py-6 list-none m-0">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="w-full border-b border-[#e0cfc8]"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 text-lg no-underline transition-colors ${
                      pathname === link.href
                        ? "text-[#c47c5a]"
                        : "text-[#4a3728]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6 flex flex-col gap-3">
              <Link
                href="/appointment"
                onClick={() => setIsOpen(false)}
                className="block text-center border border-[#c47c5a] text-[#c47c5a] px-6 py-3 rounded hover:bg-[#c47c5a] hover:text-white transition-colors no-underline"
              >
                Appointment
              </Link>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-[#4a3728] py-2 no-underline"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-center text-[#4a3728] py-2"
                  >
                    Log out ({user.name.split(" ")[0]})
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="text-center text-[#4a3728] py-2 font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          redirectTo={
            searchParams.get("authRequired") === "appointment"
              ? "/appointment"
              : "/"
          }
          onSuccess={(u) => {
            setEmailUser(u);
            setShowAuthModal(false);
            if (searchParams.get("authRequired") === "appointment") {
              router.push("/appointment");
            }
          }}
        />
      )}
    </>
  );
}
