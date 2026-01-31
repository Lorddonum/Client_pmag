import { Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";
import { Link } from "wouter";

export default function Footer() {
  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube" },
    { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest" },
  ];

  return (
    <footer className="bg-gray-900">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      <div className="container mx-auto px-8 lg:px-12">
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
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white mb-6">
                Products
              </h4>
              <ul className="space-y-4">
                {["Aluminum Profiles", "Magnetic Track Systems", "Panel Lights", "Downlights", "Linear Pendants"].map((item) => (
                  <li key={item}>
                    <Link 
                      href="/products" 
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white mb-6">
                Company
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
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white mb-6">
                Contact
              </h4>
              <ul className="space-y-5 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                  <span className="leading-relaxed">
                    No. 11, Longsha Industrial Zone,<br />
                    Jianghai District, Jiangmen City, China
                  </span>
                </li>
                <li>
                  <a href="tel:+8618128259727" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                    +86 181 2825 9727
                  </a>
                </li>
                <li>
                  <a href="mailto:inquiry@paralight.cc" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                    inquiry@paralight.cc
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2026 Paralight Group. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
