"use client";

import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-20">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E4FF2C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E4FF2C]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-[#E4FF2C] rounded-full flex items-center justify-center">
            <Clock className="w-12 h-12 md:w-16 md:h-16 text-black" />
          </div>
        </div>

        {/* Sparkles decoration */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Sparkles className="w-6 h-6 text-[#E4FF2C]" />
          <span className="text-[#E4FF2C] text-lg font-medium tracking-wider">COMING SOON</span>
          <Sparkles className="w-6 h-6 text-[#E4FF2C]" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
          SOMETHING<br />
          <span className="text-[#E4FF2C]">AMAZING</span> IS<br />
          COMING
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
          We&apos;re working hard to bring you something incredible. 
          Stay tuned for updates!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
          <div className="text-center p-6 border border-white/10 rounded-2xl bg-white/5">
            <div className="text-3xl md:text-4xl font-bold text-[#E4FF2C]">Q1</div>
            <div className="text-white/60 text-sm mt-2">2025</div>
          </div>
          <div className="text-center p-6 border border-white/10 rounded-2xl bg-white/5">
            <div className="text-3xl md:text-4xl font-bold text-[#E4FF2C]">100%</div>
            <div className="text-white/60 text-sm mt-2">Secure</div>
          </div>
          <div className="text-center p-6 border border-white/10 rounded-2xl bg-white/5">
            <div className="text-3xl md:text-4xl font-bold text-[#E4FF2C]">24/7</div>
            <div className="text-white/60 text-sm mt-2">Support</div>
          </div>
        </div>

        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-[#E4FF2C] text-black py-4 px-8 rounded-full font-bold text-lg hover:bg-[#d4ef1c] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#E4FF2C]/10 to-transparent" />
    </div>
  );
}
