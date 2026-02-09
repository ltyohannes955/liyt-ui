"use client";

import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-32 px-8 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E4FF2C]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#E4FF2C] text-lg font-medium mb-4 block">CONTACT US</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8">
            LET&apos;S <span className="text-[#E4FF2C]">CONNECT</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you. 
            Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-[#E4FF2C]/50 transition-colors">
            <div className="w-16 h-16 bg-[#E4FF2C] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Email</h3>
            <p className="text-[#E4FF2C]">Liyt@support.com</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-[#E4FF2C]/50 transition-colors">
            <div className="w-16 h-16 bg-[#E4FF2C] rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Phone</h3>
            <p className="text-[#E4FF2C]">+251 911202297</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-[#E4FF2C]/50 transition-colors">
            <div className="w-16 h-16 bg-[#E4FF2C] rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Location</h3>
            <p className="text-white/70">Addis Ababa, ET</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
              SEND US A <span className="text-[#E4FF2C]">MESSAGE</span>
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#E4FF2C] transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#E4FF2C] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#E4FF2C] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#E4FF2C] transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#E4FF2C] text-black py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#d4ef1c] transition-colors flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-20 px-8 bg-[#E4FF2C]">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="w-16 h-16 text-black mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            24/7 SUPPORT AVAILABLE
          </h2>
          <p className="text-black/70 text-lg">
            Our dedicated team is always here to help you, any time of day or night.
          </p>
        </div>
      </section>
    </div>
  );
}
