"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return null;

  return <Navbar />;
}
