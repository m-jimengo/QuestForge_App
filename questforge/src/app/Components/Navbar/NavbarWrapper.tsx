"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Ocultar el navbar en login o en la raíz
  const hideNavbar = pathname === "/" || pathname === "/Features/Login";

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}
