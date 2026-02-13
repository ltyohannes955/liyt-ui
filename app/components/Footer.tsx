"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#E4FF2C] px-8 pb-12 w-full">
      <div className="w-full max-w-[80%] mx-auto">
        {/* Let's Talk Header */}
        <div className="flex items-center justify-between mb-16 py-12">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-black">
            Let&apos;s<br />Talk
          </h2>
          <div className="w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/logo.png"
              alt="LIYT"
              width={160}
              height={160}
              className="w-full h-full object-contain opacity-80"
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-t-2 border-black/20 pt-12 w-full">
          {/* Links */}
          <div>
            <h4 className="text-black font-bold text-lg mb-6">Links</h4>
            <ul className="space-y-3 text-base text-black/70">
              <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact us</Link></li>
              <li><Link href="/download-app" className="hover:text-black transition-colors">Download App</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-black font-bold text-lg mb-6">Developers</h4>
            <ul className="space-y-3 text-base text-black/70">
              <li><Link href="/coming-soon" className="hover:text-black transition-colors">Documentations</Link></li>
              <li><Link href="/coming-soon" className="hover:text-black transition-colors">Api</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-black font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-base text-black/70">
              <li>Liyt@support.com</li>
              <li>Addis Ababa, ET</li>
              <li>+251 911202297</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:text-left text-center">
            <h4 className="text-black font-bold text-lg mb-6">Socials</h4>
            <div className="flex gap-3 md:gap-5 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-[#E4FF2C]">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-[#E4FF2C]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-[#E4FF2C]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center hover:bg-black/80 transition-colors flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-[#E4FF2C]">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.192-.054-.3-.297-.108l-5.965 3.759-2.575-.802c-.56-.176-.57-.56.116-.828l10.074-3.885c.468-.176.877.108.73.844z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t-2 border-black/20 text-sm text-black/60 w-full">
          <p className="text-base">©2024 LIYT. ALL RIGHTS RESERVED</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/coming-soon" className="hover:text-black transition-colors text-base font-medium">PRIVACY POLICY</Link>
            <Link href="/coming-soon" className="hover:text-black transition-colors text-base font-medium">TERMS OF SERVICE</Link>
            <Link href="/coming-soon" className="hover:text-black transition-colors text-base font-medium">COOKIES</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 mt-4 md:mt-0 hover:text-black transition-colors text-base font-medium"
          >
            BACK TO TOP
            <div className="w-8 h-8 border-2 border-black/40 rounded-full flex items-center justify-center">
              <ArrowDown className="w-4 h-4 rotate-180" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
