'use client';

import React from 'react';
import Link from 'next/link';
import { Train, ArrowRight, ShieldCheck, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';
import { soundFx } from '@/lib/audio';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer id="contact" className="relative bg-[#070A0E] border-t border-[#C9A96E]/20 text-slate-400 overflow-hidden">
      {/* Background Subtle Track Geometry */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-[#0B0F14]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#D8B978]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Official Rail Partner</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct API ticket issuance & guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#D8B978]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">24/7 VIP Concierge</h4>
              <p className="text-xs text-slate-400 mt-0.5">Round-the-clock multilingual assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#D8B978]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Five-Star Rail Standards</h4>
              <p className="text-xs text-slate-400 mt-0.5">Luxury cabins & bespoke dining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8B978] to-[#8C6E38] p-0.5 shadow-[0_0_15px_rgba(201,169,110,0.3)]">
                <div className="w-full h-full bg-[#0B0F14] rounded-[10px] flex items-center justify-center">
                  <Train className="w-5 h-5 text-[#D8B978]" />
                </div>
              </div>
              <span className="text-2xl font-serif font-black tracking-widest text-white">
                RAILWAY
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Join the Private Express Club
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-[#111827] border border-slate-700/60 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E] transition-colors"
                />
                <button
                  onClick={() => soundFx.playChime(580, 0.4)}
                  className="px-4 py-2 bg-[#C9A96E] hover:bg-[#D8B978] text-[#0B0F14] font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Travel Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              {t.footer.travel}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#destinations" className="hover:text-[#D8B978] transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#routes" className="hover:text-[#D8B978] transition-colors">
                  Popular Routes
                </a>
              </li>
              <li>
                <a href="#train-types" className="hover:text-[#D8B978] transition-colors">
                  Train Services & Fleet
                </a>
              </li>
              <li>
                <a href="#railway-map" className="hover:text-[#D8B978] transition-colors">
                  Vietnam Railway Map
                </a>
              </li>
              <li>
                <a href="#train-types" className="hover:text-[#D8B978] transition-colors">
                  Grand Sleeper Suites
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              {t.footer.company}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#why-us" className="hover:text-[#D8B978] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[#D8B978] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#D8B978] transition-colors">
                  Passenger Stories
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D8B978] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D8B978] transition-colors">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              {t.footer.support}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-[#D8B978]" />
                <span>+84 (0) 24 3942 5900</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-[#D8B978]" />
                <span>concierge@railway.vn</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#D8B978]" />
                <span>120 Le Duan, Hanoi, Vietnam</span>
              </li>
              <li className="pt-2">
                <a href="#" className="hover:text-[#D8B978] transition-colors block text-xs">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8B978] transition-colors block text-xs">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#D8B978] transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-[#D8B978] transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-[#D8B978] transition-colors">
              YouTube
            </a>
            <a href="#" className="hover:text-[#D8B978] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
