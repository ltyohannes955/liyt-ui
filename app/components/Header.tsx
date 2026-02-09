"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/coming-soon", label: "Features" },
    { href: "/coming-soon", label: "How it works" },
    { href: "/coming-soon", label: "Download" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between w-full bg-transparent">
        <Link href="/" className="flex items-center z-50">
          <Image
            src="/logo.png"
            alt="LIYT"
            width={100}
            height={40}
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-white/80 hover:text-white text-base font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Login Button */}
        <Link
          href="/coming-soon"
          className="hidden md:inline-flex px-8 py-3 border border-white/30 rounded-full text-white text-base font-medium hover:bg-white/10 transition-colors"
        >
          Log in
        </Link>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-white hover:text-[#E4FF2C] transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-[#E4FF2C] text-2xl font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/coming-soon"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-12 py-4 border-2 border-[#E4FF2C] rounded-full text-[#E4FF2C] text-xl font-bold hover:bg-[#E4FF2C] hover:text-black transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
