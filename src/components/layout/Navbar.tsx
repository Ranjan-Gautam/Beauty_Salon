"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

import Image from "next/image";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#f9f3f0] border-b border-[#e0cfc8] px-4 md:px-8 h-18 flex items-center justify-between md:justify-start gap-8 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-px no-underline">
        <Image
          src="/logo-beauty-salon-1.png"
          alt="Beauty Salon"
          width={200}
          height={200}
          className="w-32 md:w-[200px] h-auto md:ml-30"
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
      <div className="hidden lg:block">
        <Link
          href="/appointment"
          className="border border-[#c47c5a] text-[#c47c5a] text-xm px-6 py-2 rounded hover:bg-[#c47c5a] hover:text-white transition-colors no-underline"
        >
          Appointment
        </Link>
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
              <li key={link.href} className="w-full border-b border-[#e0cfc8]">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-4 text-lg no-underline transition-colors ${
                    pathname === link.href ? "text-[#c47c5a]" : "text-[#4a3728]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6">
            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="block text-center border border-[#c47c5a] text-[#c47c5a] px-6 py-3 rounded hover:bg-[#c47c5a] hover:text-white transition-colors no-underline"
            >
              Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
