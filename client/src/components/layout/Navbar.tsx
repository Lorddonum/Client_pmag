import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import paralightLogo from "@/assets/paralight-logo.png";
import maglinearLogo from "@/assets/maglinear-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Downloads", href: "/downloads" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "shadow-lg"
          : "",
      )}
    >
      <div className={cn(
        "flex items-stretch transition-all duration-500",
        scrolled ? "opacity-100" : "opacity-100"
      )}>
        {/* Logo section with white background extending to left edge */}
        <div className={cn(
          "flex-shrink-0 transition-all duration-500",
          scrolled ? "bg-white" : "bg-transparent"
        )}>
          <div className={cn(
            "pl-6 pr-8 flex items-center transition-all duration-300",
            scrolled ? "py-2" : "py-3"
          )}>
            <Link
              href="/"
              className="flex items-center -space-x-8 hover:opacity-80 transition-opacity"
            >
              <div className="h-16 overflow-hidden flex items-center">
                <img src={paralightLogo} alt="Paralight" className="h-40 max-w-[360px] object-cover object-center" />
              </div>
              <div className="h-16 overflow-hidden flex items-center">
                <img src={maglinearLogo} alt="Maglinear Lighting" className="h-28 max-w-[280px] object-cover object-center" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Nav section with dark background and gradient transition from white */}
        <div className={cn(
          "flex-grow flex items-center justify-end px-6 transition-all duration-500",
          scrolled 
            ? "bg-gradient-to-r from-white via-gray-400 via-5% to-gray-900 to-15% py-2" 
            : "bg-transparent py-3"
        )}>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-500 tracking-wide",
                location === link.href
                  ? "text-[#00A8E8] underline underline-offset-8"
                  : scrolled 
                    ? "text-gray-300 hover:text-white" 
                    : "text-white hover:text-[#00A8E8] drop-shadow-md",
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className={cn(
            "px-5 py-2 text-xs font-bold tracking-widest uppercase border transition-all duration-500 rounded-none cursor-pointer",
            scrolled
              ? "border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
              : "border-white text-white hover:bg-white hover:text-gray-900 drop-shadow-md"
          )}>
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden transition-all duration-500",
            scrolled ? "text-white" : "text-white drop-shadow-md"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 py-8 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-display transition-colors",
                location === link.href
                  ? "text-[#00A8E8]"
                  : "text-gray-300 hover:text-white",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
