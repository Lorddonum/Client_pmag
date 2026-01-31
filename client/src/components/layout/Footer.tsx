import { Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, MapPin, Phone, Mail } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";
import { Link } from "wouter";

export default function Footer() {
  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook", color: "#1877F2" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram", color: "#E4405F" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn", color: "#0A66C2" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube", color: "#FF0000" },
    { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter", color: "#1DA1F2" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok", color: "#00F2EA" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest", color: "#E60023" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00A8E8]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ECAA00]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      {/* Top accent gradient line */}
      <div className="relative h-1 bg-gradient-to-r from-[#00A8E8] via-[#ECAA00] to-[#00A8E8]" />
      
      <div className="relative container mx-auto px-8 lg:px-12">
        {/* Main footer content */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center -space-x-6 mb-6">
              <div className="h-12 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-32 max-w-[260px] object-cover object-center brightness-110" />
              </div>
              <div className="h-12 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear" className="h-20 max-w-[180px] object-cover object-center brightness-110" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Premium LED aluminum profiles and magnetic track lighting systems, 
              crafted for architects and designers who demand excellence.
            </p>
            <div className="flex flex-wrap gap-1">
              {socials.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  style={{ 
                    ['--hover-bg' as string]: social.color 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color + '20';
                    e.currentTarget.style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
                <span className="bg-gradient-to-r from-[#00A8E8] to-cyan-400 bg-clip-text text-transparent">
                  Products
                </span>
              </h4>
              <ul className="space-y-4">
                {["Aluminum Profiles", "Magnetic Track Systems", "Panel Lights", "Downlights", "Linear Pendants"].map((item) => (
                  <li key={item}>
                    <Link 
                      href="/products" 
                      className="text-sm text-gray-400 hover:text-[#00A8E8] transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
                <span className="bg-gradient-to-r from-[#ECAA00] to-amber-400 bg-clip-text text-transparent">
                  Company
                </span>
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Factory", href: "/about" },
                  { name: "Certifications", href: "/about" },
                  { name: "Downloads", href: "/downloads" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-gray-400 hover:text-[#ECAA00] transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Contact
                </span>
              </h4>
              <ul className="space-y-5 text-sm text-gray-400">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#00A8E8] shrink-0" />
                  <span className="leading-relaxed group-hover:text-gray-300 transition-colors">
                    No. 11, Longsha Industrial Zone,<br />
                    Jianghai District, Jiangmen City, China
                  </span>
                </li>
                <li>
                  <a href="tel:+8618128259727" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <Phone className="w-4 h-4 text-[#ECAA00] shrink-0 group-hover:scale-110 transition-transform" />
                    +86 181 2825 9727
                  </a>
                </li>
                <li>
                  <a href="mailto:inquiry@paralight.cc" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <Mail className="w-4 h-4 text-[#00A8E8] shrink-0 group-hover:scale-110 transition-transform" />
                    inquiry@paralight.cc
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative py-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2026 <span className="text-[#00A8E8]">Paralight</span> Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-[#00A8E8] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-[#ECAA00] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
