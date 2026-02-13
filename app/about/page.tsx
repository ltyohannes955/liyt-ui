"use client";

import { Building2, Users, Globe, Shield, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "Cities Covered" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8", label: "App Rating" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Your data and transactions are protected with enterprise-grade encryption."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast deliveries and instant payments."
    },
    {
      icon: Heart,
      title: "Customer Centric",
      description: "We put our customers first in everything we do."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Expanding across Africa and beyond to serve you better."
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-32 px-8 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E4FF2C]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="text-[#E4FF2C] text-lg font-medium mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8">
            Revolutionizing<br />
            <span className="text-[#E4FF2C]">Delivery</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Liyt is more than just a delivery platform. We&apos;re building the future
            of logistics in Africa, connecting people and businesses seamlessly.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 bg-[#E4FF2C]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-black">{stat.number}</div>
              <div className="text-black/70 text-lg mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#E4FF2C] text-lg font-medium mb-4 block">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Empowering<br />
              <span className="text-[#E4FF2C]">Communities</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              We believe in creating opportunities for everyone. Our platform connects
              drivers with customers, creating a thriving ecosystem that benefits
              the entire community. Whether you&apos;re looking to earn extra income
              or need reliable delivery services, LIYT has you covered.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <Building2 className="w-12 h-12 text-[#E4FF2C] mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Founded</h3>
              <p className="text-white/60">2024</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <Users className="w-12 h-12 text-[#E4FF2C] mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Team</h3>
              <p className="text-white/60">Growing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E4FF2C] text-lg font-medium mb-4 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              What Drives <span className="text-[#E4FF2C]">Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#E4FF2C]/50 transition-colors">
                <value.icon className="w-12 h-12 text-[#E4FF2C] mb-6" />
                <h3 className="text-white font-bold text-xl mb-4">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
