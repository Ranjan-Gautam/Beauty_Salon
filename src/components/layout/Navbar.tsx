"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";

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

  return (
    <nav className="w-full bg-[#f9f3f0] border-b border-[#e0cfc8] px-8 h-18 flex items-center  gap-8 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-px no-underline">
        <Image
          src="/logo-beauty-salon-1.png"
          alt="Beauty Salon"
          width={200}
          height={200}
          className="ml-30"
        />
      </Link>

      <ul className="flex items-center gap-10 list-none m-0 p-0 ml-20">
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
      <div>
        <Link
          href="/appointment"
          className="border border-[#c47c5a] text-[#c47c5a] text-xm px-6 py-2 rounded hover:bg-[#c47c5a] hover:text-white transition-colors no-underline"
        >
          Appointment
        </Link>
      </div>
    </nav>
  );
}
