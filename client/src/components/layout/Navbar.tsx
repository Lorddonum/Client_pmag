import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];
const logoWhite = "/logo-white-navbar.webp";
const logoBlack = "/logo-black.webp";

export default function Navbar({ darkText = false }: { darkText?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isLightSection, setIsLightSection] = useState(false);
  const [isFooterSection, setIsFooterSection] = useState(false);
  const [hasNavBg, setHasNavBg] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location !== '/' && location !== '/about') {
      setIsLightSection(false);
      setIsFooterSection(false);
      setHasNavBg(false);
      return;
    }

    const checkSectionIndex = (index: number) => {
      if (location === '/') {
        setIsLightSection(index === 1 || index === 2 || index === 3);
        setIsFooterSection(index === 4 || index === 5);
        setHasNavBg(false);
      } else if (location === '/about') {
        setIsLightSection((index >= 1 && index <= 5) || index === 6 || index === 8);
        setIsFooterSection(index === 10);
        setHasNavBg(index === 5);
      }
    };

    const scrollContainer = document.querySelector('.snap-y');
    if (!scrollContainer) return;

    const checkSection = () => {
      const sections = scrollContainer.querySelectorAll('section.snap-start, div.snap-start');

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // The original bulletproof logic: when a section snaps, its rect.top is 0. 
        // This threshold catches it perfectly as it slides into the top area.
        if (rect.top <= 100 && rect.bottom > 100) {
          checkSectionIndex(index);
        }
      });
    };

    scrollContainer.addEventListener('scroll', checkSection, { passive: true });
    checkSection(); // Initial check

    return () => scrollContainer.removeEventListener('scroll', checkSection);
  }, [location]);

  const isSnapPage = location === '/' || location === '/about';
  const isProductsPage = location === '/products' || location.startsWith('/products/');
  const useDarkText = (darkText || isLightSection || (!isSnapPage && scrolled) || isProductsPage) && !isFooterSection;

  const navLinks = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.products'), href: "/products" },
    { name: t('nav.downloads'), href: "/downloads" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all",
        location === '/about' ? "duration-500 ease-in-out" : "duration-150",
        isFooterSection
          ? "bg-[#0A1628]"
          : hasNavBg
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : isProductsPage
              ? "bg-white shadow-sm"
              : (darkText && !isSnapPage)
                ? "bg-white/95 backdrop-blur-md shadow-sm"
                : (!isSnapPage && scrolled)
                  ? "bg-white/95 backdrop-blur-md shadow-sm"
                  : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-300 relative"
          >
            <div className="relative h-10 lg:h-12 w-[200px] lg:w-[260px]">
              <img
                src={logoWhite}
                alt="Paralight & Maglinear Lighting"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-200",
                  useDarkText ? "opacity-0" : "opacity-100"
                )}
              />
              <img
                src={logoBlack}
                alt="Paralight & Maglinear Lighting"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-200",
                  useDarkText ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-300",
                  location === link.href
                    ? useDarkText ? "text-brand-cyan" : "text-white"
                    : useDarkText
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-white/90 hover:text-white",
                )}
              >
                {link.name}
                {location === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-current" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions: Language + CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 outline-none",
                useDarkText ? "text-gray-900" : "text-white"
              )}>
                <Globe className="w-4 h-4" />
                <span className="text-lg leading-none">{LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white/95 backdrop-blur-md border-gray-100">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer flex items-center gap-3 py-2"
                    onClick={() => i18n.changeLanguage(lang.code)}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact">
              <button className={cn(
                "px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-300",
                useDarkText
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              )}>
                {t('nav.getInTouch')}
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden p-2 transition-colors duration-300",
              useDarkText ? "text-gray-900" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="container mx-auto px-8 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block py-3 text-base font-medium transition-colors border-b border-gray-50 last:border-0",
                location === link.href
                  ? "text-brand-cyan"
                  : "text-gray-600 hover:text-gray-900",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="py-2 border-b border-gray-50 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{t('nav.language')}</span>
            <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setIsOpen(false); }}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[3rem]",
                    currentLang === lang.code ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  <span className="text-xl mb-1">{lang.flag}</span>
                  <span className="text-[10px] text-gray-600 font-medium">{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <button className="w-full mt-4 px-6 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide">
              {t('nav.getInTouch')}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
