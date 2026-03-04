import { motion, AnimatePresence, useAnimation, useInView as useFramerInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import chairmanImg from "@/assets/chairman-situ.webp";
import ceoImg from "@/assets/ceo-michelle.webp";
import coreTeamImg from "@/assets/core-team.webp";
import milestone2016_1 from "@/assets/milestone-2016-1.webp";
import milestone2016_2 from "@/assets/milestone-2016-2.webp";
import milestone2016_3 from "@/assets/milestone-2016-3.webp";
import milestone2019_1 from "@/assets/milestone-2019-1.webp";
import milestone2019_2 from "@/assets/milestone-2019-2.webp";
import milestone2019_3 from "@/assets/milestone-2019-3.webp";
import milestone2021jan_1 from "@/assets/milestone-2021jan-1.webp";
import milestone2021jan_2 from "@/assets/milestone-2021jan-2.webp";
import milestone2021jan_3 from "@/assets/milestone-2021jan-3.webp";
import milestone2021sep_1 from "@/assets/milestone-2021sep-1.webp";
import milestone2021sep_2 from "@/assets/milestone-2021sep-2.webp";
import milestone2022dec_1 from "@/assets/milestone-2022dec-1.webp";
import milestone2022dec_2 from "@/assets/milestone-2022dec-2.webp";
import milestone2022dec_3 from "@/assets/milestone-2022dec-3.webp";

import milestone2023jan_1 from "@/assets/milestone-2023jan-1.webp";
import milestone2023jan_2 from "@/assets/milestone-2023jan-2.webp";
import milestone2023jan_3 from "@/assets/milestone-2023jan-3.webp";

import milestone2024jul_1 from "@/assets/milestone-2024jul-1.webp";
import milestone2024jul_2 from "@/assets/milestone-2024jul-2.webp";

import milestone2025mar_1 from "@/assets/milestone-2025mar-1.webp";
import milestone2025mar_2 from "@/assets/milestone-2025mar-2.webp";
import milestone2025mar_3 from "@/assets/milestone-2025mar-3.webp";
import milestone2025mar_4 from "@/assets/milestone-2025mar-4.webp";
import milestone2025mar_5 from "@/assets/milestone-2025mar-5.webp";
import honor1 from "@/assets/honor-1.webp";
import honor2 from "@/assets/honor-2.webp";
import honor3 from "@/assets/honor-3.webp";
import honor4 from "@/assets/honor-4.webp";
import honor5 from "@/assets/honor-5.webp";
import honor6 from "@/assets/honor-6.webp";
import honor7 from "@/assets/honor-7.webp";
import honor8 from "@/assets/honor-8.webp";
import honor9 from "@/assets/honor-9.webp";
import honor10 from "@/assets/honor-10.webp";
import {
  Truck,
  Users,
  Lightbulb,
  Package,
  Quote,
  Award,
  CheckCircle,
  Globe,
  Heart,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  Sparkles,
  Target,
  Zap,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import TikTokIcon from "@/components/icons/TikTokIcon";
import PinterestIcon from "@/components/icons/PinterestIcon";
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface ExhibitionEvent {
  name: string;
  location: string;
  images: string[];
}

const exhibitionEvents: ExhibitionEvent[] = [
  {
    name: "Middle East Energy",
    location: "Dubai, UAE",
    images: [
      "/exhibitions/dubai-2024/img-1.webp",
      "/exhibitions/dubai-2024/img-2.webp",
      "/exhibitions/dubai-2024/img-3.webp",
      "/exhibitions/dubai-2024/img-4.webp",
      "/exhibitions/dubai-2024/img-5.webp",
      "/exhibitions/dubai-2024/img-6.webp",
      "/exhibitions/dubai-2024/img-7.webp",
      "/exhibitions/dubai-2024/img-8.webp",
    ]
  },
  {
    name: "Canton Fair",
    location: "Guangzhou, China",
    images: [
      "/exhibitions/canton-2024/img-1.webp",
      "/exhibitions/canton-2024/img-2.webp",
      "/exhibitions/canton-2024/img-3.webp",
      "/exhibitions/canton-2024/img-4.webp",
      "/exhibitions/canton-2024/img-5.webp",
      "/exhibitions/canton-2024/img-6.webp",
      "/exhibitions/canton-2024/img-7.webp",
      "/exhibitions/canton-2024/img-8.webp",
    ]
  },
  {
    name: "GILF",
    location: "Guzhen, China",
    images: [
      "/exhibitions/poland-2024/img-1.webp",
      "/exhibitions/poland-2024/img-2.webp",
      "/exhibitions/poland-2024/img-3.webp",
      "/exhibitions/poland-2024/img-4.webp",
      "/exhibitions/poland-2024/img-5.webp",
      "/exhibitions/poland-2024/img-6.webp",
      "/exhibitions/poland-2024/img-7.webp",
      "/exhibitions/poland-2024/img-8.webp",
    ]
  },
  {
    name: "LED Middle East",
    location: "Cairo, Egypt",
    images: [
      "/exhibitions/egypt-2023/img-1.webp",
      "/exhibitions/egypt-2023/img-2.webp",
      "/exhibitions/egypt-2023/img-3.webp",
      "/exhibitions/egypt-2023/img-4.webp",
      "/exhibitions/egypt-2023/img-5.webp",
      "/exhibitions/egypt-2023/img-6.webp",
      "/exhibitions/egypt-2023/img-7.webp",
    ]
  },
  {
    name: "HK Lighting Fair",
    location: "Hong Kong",
    images: [
      "/exhibitions/hongkong-2023/img-1.webp",
      "/exhibitions/hongkong-2023/img-2.webp",
      "/exhibitions/hongkong-2023/img-3.webp",
      "/exhibitions/hongkong-2023/img-4.webp",
      "/exhibitions/hongkong-2023/img-5.webp",
      "/exhibitions/hongkong-2023/img-6.webp",
      "/exhibitions/hongkong-2023/img-7.webp",
      "/exhibitions/hongkong-2023/img-8.webp",
    ]
  },
  {
    name: "Light + Building",
    location: "Frankfurt, Germany",
    images: [
      "/exhibitions/spain-2022/img-1.webp",
      "/exhibitions/spain-2022/img-2.webp",
      "/exhibitions/spain-2022/img-3.webp",
      "/exhibitions/spain-2022/img-4.webp",
      "/exhibitions/spain-2022/img-5.webp",
      "/exhibitions/spain-2022/img-6.webp",
    ]
  },
  {
    name: "LEDTEC Asia",
    location: "Ho Chi Minh, Vietnam",
    images: [
      "/exhibitions/india-2022/img-1.webp",
      "/exhibitions/india-2022/img-2.webp",
      "/exhibitions/india-2022/img-3.webp",
      "/exhibitions/india-2022/img-4.webp",
      "/exhibitions/india-2022/img-5.webp",
      "/exhibitions/india-2022/img-6.webp",
      "/exhibitions/india-2022/img-7.webp",
    ]
  },
  {
    name: "Expolux",
    location: "São Paulo, Brazil",
    images: [
      "/exhibitions/brazil-2022/img-1.webp",
      "/exhibitions/brazil-2022/img-2.webp",
      "/exhibitions/brazil-2022/img-3.webp",
      "/exhibitions/brazil-2022/img-4.webp",
      "/exhibitions/brazil-2022/img-5.webp",
      "/exhibitions/brazil-2022/img-6.webp",
    ]
  },
];

function ExhibitionCard({ event, onClick, index }: { event: ExhibitionEvent; onClick: () => void; index: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (event.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % event.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [event.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative bg-white border border-gray-200 overflow-hidden hover:border-[#00A8E8]/50 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={event.images[currentIndex]}
            alt={`${event.name} - Image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {event.images.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex % 5 ? "bg-[#00A8E8] w-4" : "bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-gray-900 font-medium mb-2 group-hover:text-[#00A8E8] transition-colors duration-300">
          {event.name}
        </h3>
        <p className="text-gray-500 text-sm">{event.location}</p>
      </div>
    </motion.div>
  );
}

function ExhibitionLightbox({
  event,
  onClose
}: {
  event: ExhibitionEvent;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % event.images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [event.images.length, onClose]);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % event.images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + event.images.length) % event.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="absolute top-6 left-6 text-white z-10">
        <h3 className="font-display text-2xl font-medium">{event.name}</h3>
        <p className="text-white/60 text-sm">{event.location}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white transition-colors z-10"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white transition-colors z-10"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      <div
        className="relative w-full max-w-5xl mx-4 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={event.images[currentIndex]}
            alt={`${event.name} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {event.images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 text-white/60 text-sm">
        {currentIndex + 1} / {event.images.length}
      </div>
    </motion.div>
  );
}

function HonorsSlideshow() {
  const honors = [
    { image: honor1, title: "High-Tech Enterprise Certificate", year: "2023" },
    { image: honor2, title: "Work Registration Certificate", year: "2021" },
    { image: honor3, title: "Trademark Registration - Paralight", year: "2022" },
    { image: honor4, title: "Trademark Registration - Class 35", year: "2024" },
    { image: honor5, title: "Trademark Registration - PXG", year: "2024" },
    { image: honor6, title: "JMELIA Association Council Member", year: "2023" },
    { image: honor7, title: "High-Tech Enterprise Plaque", year: "2023" },
    { image: honor8, title: "Middle East Lighting Expo Award", year: "2023" },
    { image: honor9, title: "High-Tech Enterprise Recognition", year: "2023" },
    { image: honor10, title: "Corporate Legal Advisor Unit", year: "2023" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % honors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [honors.length]);

  useEffect(() => {
    if (lightboxOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev + 1) % honors.length);
        if (e.key === "ArrowLeft") setCurrentSlide((prev) => (prev - 1 + honors.length) % honors.length);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxOpen, honors.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % honors.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + honors.length) % honors.length);

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex-1" />
        <div className="flex gap-1.5">
          {honors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-300 rounded-full ${index === currentSlide ? "w-6 bg-[#ECAA00]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      </div>

      <div
        className="relative bg-white rounded-xl overflow-hidden shadow-2xl cursor-pointer group aspect-[4/3]"
        onClick={() => setLightboxOpen(true)}
        data-testid="button-honor-lightbox"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={honors[currentSlide].image}
            alt={honors[currentSlide].title}
            loading="eager"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-contain p-4"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-[#ECAA00] text-xs font-medium">{honors[currentSlide].year}</span>
          <h4 className="text-white font-medium text-sm mt-1">{honors[currentSlide].title}</h4>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              data-testid="button-close-honor-lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              data-testid="button-prev-honor-lightbox"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              data-testid="button-next-honor-lightbox"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              className="max-w-4xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={honors[currentSlide].image}
                  alt={honors[currentSlide].title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-[80vh] object-contain bg-white rounded-lg shadow-2xl"
                />
              </AnimatePresence>
              <div className="text-center mt-4">
                <h4 className="text-white font-display text-lg">{honors[currentSlide].title}</h4>
                <span className="text-[#ECAA00] text-sm">{honors[currentSlide].year}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ShippingSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 4000;
  const images = [
    "/about/shipping/1.webp",
    "/about/shipping/2.webp",
    "/about/shipping/3.webp",
    "/about/shipping/4.webp",
    "/about/shipping/5.webp",
  ];

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const step = 50;
    const increment = (step / INTERVAL) * 100;
    const progressTimer = setInterval(() => {
      setProgress(p => Math.min(p + increment, 100));
    }, step);
    const slideTimer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, INTERVAL);
    return () => { clearInterval(progressTimer); clearTimeout(slideTimer); };
  }, [currentSlide, paused]);

  const goTo = (idx: number) => { setCurrentSlide(idx); setProgress(0); };
  const prev = () => goTo((currentSlide - 1 + images.length) % images.length);
  const next = () => goTo((currentSlide + 1) % images.length);

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={images[currentSlide]}
          alt={`Shipping Operation ${currentSlide + 1}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

      {/* Slide counter badge */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
        {currentSlide + 1} / {images.length}
      </div>

      {/* Pause indicator */}
      {paused && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5"
        >
          <span className="w-1.5 h-3 bg-white rounded-sm inline-block" />
          <span className="w-1.5 h-3 bg-white rounded-sm inline-block" />
          Paused
        </motion.div>
      )}

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
        <motion.div
          className="h-full bg-[#00A8E8]"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all duration-300 rounded-full h-1.5 ${idx === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

function TeamStrip({
  teamMembers,
  onSelect,
}: {
  teamMembers: { name: string; role: string; image: string }[];
  onSelect: (m: { name: string; role: string; image: string }) => void;
}) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const perPage = 3;
  const totalPages = Math.ceil(teamMembers.length / perPage);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => clearInterval(t);
  }, [totalPages]);

  const go = (d: 1 | -1) => {
    setDir(d);
    setPage((p) => (p + d + totalPages) % totalPages);
  };

  const visible = Array.from({ length: perPage }, (_, i) =>
    teamMembers[(page * perPage + i) % teamMembers.length]
  );

  // Strip height in px — used to make avatar square match full height
  const STRIP_H = 160;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 flex items-stretch"
      style={{ backgroundColor: '#0a1628', height: STRIP_H }}
    >
      {/* Prev arrow */}
      <button
        onClick={() => go(-1)}
        className="flex-shrink-0 w-10 flex items-center justify-center text-white/30 hover:text-white transition-colors border-r border-white/10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Slides */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            initial={{ x: dir * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 flex"
          >
            {visible.map((member, i) => (
              <div
                key={i}
                className="flex-1 flex items-stretch cursor-pointer group"
                style={{ borderRight: i < perPage - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
                onClick={() => onSelect(member)}
              >
                {/* Avatar — fills full height, square, with per-member cadre */}
                {(() => {
                  const isMaglinear = ['Mr. Ou', 'Stephy', 'Taha'].includes(member.name);
                  const cadreColor = isMaglinear ? '#ECAA00' : '#0080B3';
                  return (
                    <div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: STRIP_H, height: STRIP_H }}
                    >
                      <div
                        style={{
                          width: STRIP_H,
                          height: STRIP_H,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: `3px solid ${cadreColor}`,
                          boxShadow: `0 0 18px ${cadreColor}55`,
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Text block — vertically centred beside avatar */}
                <div className="flex flex-col justify-center px-8 min-w-0">
                  <p className="text-white font-bold text-lg lg:text-xl leading-tight truncate">
                    {member.name}
                  </p>
                  <div className="border-t border-white/20 my-2" />
                  <p className="text-white/50 text-xs tracking-widest uppercase truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next arrow */}
      <button
        onClick={() => go(1)}
        className="flex-shrink-0 w-10 flex items-center justify-center text-white/30 hover:text-white transition-colors border-l border-white/10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(sectionRef, { amount: 0.5 });
  const [phase, setPhase] = useState<"idle" | "circle" | "reversing" | "splitting" | "revealed" | "reveal-reversing" | "office-transition" | "office" | "office-reversing">("idle");
  const phaseRef = useRef(phase);
  const animatingRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  phaseRef.current = phase;

  const containerRef = useRef<HTMLElement | null>(null);
  const blockWheelRef = useRef<((e: WheelEvent) => void) | null>(null);

  const unlockScroll = () => {
    if (containerRef.current && blockWheelRef.current) {
      containerRef.current.removeEventListener('wheel', blockWheelRef.current, { capture: true } as EventListenerOptions);
      blockWheelRef.current = null;
    }
  };

  useEffect(() => {
    if (!isInView || phase !== "idle" || hasTriggeredRef.current) return;

    const scrollContainer = sectionRef.current?.closest('.snap-y') as HTMLElement | null;
    if (!scrollContainer) return;
    containerRef.current = scrollContainer;

    const blockWheel = (e: WheelEvent) => {
      const currentPhase = phaseRef.current;
      if (currentPhase === "idle") return;
      if (currentPhase === "office" && e.deltaY > 0) return;

      e.preventDefault();
      e.stopPropagation();

      if (animatingRef.current) return;

      if (e.deltaY > 0 && currentPhase === "circle") {
        animatingRef.current = true;
        setPhase("splitting");
        setTimeout(() => {
          setPhase("revealed");
          setTimeout(() => {
            animatingRef.current = false;
          }, 800);
        }, 1200);
      } else if (e.deltaY < 0 && currentPhase === "circle") {
        animatingRef.current = true;
        setPhase("reversing");
        setTimeout(() => {
          setPhase("idle");
          hasTriggeredRef.current = false;
          unlockScroll();
          animatingRef.current = false;
          const section = sectionRef.current;
          if (section && section.previousElementSibling) {
            (section.previousElementSibling as HTMLElement).scrollIntoView({ behavior: 'smooth' });
          }
        }, 800);
      } else if (e.deltaY > 0 && currentPhase === "revealed") {
        animatingRef.current = true;
        setPhase("office-transition");
        setTimeout(() => {
          setPhase("office");
          setTimeout(() => {
            animatingRef.current = false;
          }, 1000);
        }, 800);
      } else if (e.deltaY < 0 && currentPhase === "office") {
        animatingRef.current = true;
        setPhase("office-reversing");
        setTimeout(() => {
          setPhase("revealed");
          setTimeout(() => {
            animatingRef.current = false;
          }, 900);
        }, 800);
      } else if (e.deltaY < 0 && currentPhase === "revealed") {
        animatingRef.current = true;
        setPhase("reveal-reversing");
        setTimeout(() => {
          setPhase("circle");
          setTimeout(() => {
            animatingRef.current = false;
          }, 1200);
        }, 800);
      }
    };
    blockWheelRef.current = blockWheel;
    scrollContainer.addEventListener('wheel', blockWheel, { passive: false, capture: true });

    animatingRef.current = true;
    hasTriggeredRef.current = true;
    setPhase("circle");
    setTimeout(() => { animatingRef.current = false; }, 1200);

    return () => unlockScroll();
  }, [isInView]);

  const circleImages = [
    "/images/showcase-1.webp",
    "/images/showcase-2.webp",
    "/images/showcase-3.webp",
    "/images/showcase-4.webp",
  ];

  const officeImages = [
    { src: "/images/office-1.webp", alt: "Office work" },
    { src: "/images/office-2.webp", alt: "Design team" },
    { src: "/images/office-3.webp", alt: "Office collaboration" },
    { src: "/images/office-4.webp", alt: "Team workspace" },
    { src: "/images/office-5.webp", alt: "3D product design" },
  ];

  const showCircle = phase !== "revealed" && phase !== "idle" && phase !== "office-transition" && phase !== "office" && phase !== "office-reversing";
  const circleIn = phase === "circle" || phase === "reveal-reversing";
  const showShowcase = phase === "revealed" || phase === "office-transition" || phase === "reveal-reversing" || phase === "office-reversing";
  const showcaseIn = phase === "revealed" || phase === "office-reversing";
  const showOffice = phase === "office-transition" || phase === "office" || phase === "office-reversing";
  const officeIn = phase === "office";
  const gpuLayer = { willChange: 'transform, opacity' as const, backfaceVisibility: 'hidden' as const };

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen overflow-hidden relative flex flex-col justify-center"
      style={{ backgroundColor: '#c4b49a', contain: 'layout style paint' }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(160,140,110,0.15) 2px, rgba(160,140,110,0.15) 4px),
          repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(180,160,130,0.1) 2px, rgba(180,160,130,0.1) 4px),
          radial-gradient(ellipse at 20% 50%, rgba(200,185,160,0.4) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 50%, rgba(185,170,140,0.3) 0%, transparent 70%),
          linear-gradient(180deg, rgba(210,195,170,0.3) 0%, transparent 30%, transparent 70%, rgba(170,155,130,0.3) 100%)
        `
      }} />

      <div className="relative w-full h-full max-w-7xl mx-auto px-8 lg:px-12 z-10">
        <div className="relative h-full">

          {/* === CIRCLE SPLIT INTRO ANIMATION === */}
          {showCircle && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <motion.div
                className="absolute"
                style={{ ...gpuLayer, width: 'min(500px, 70vw)', height: 'min(500px, 70vw)', borderRadius: '50%', overflow: 'hidden', clipPath: 'inset(0 50% 0 0)' }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={
                  circleIn
                    ? { opacity: 1, scale: 1, y: 0 }
                    : phase === "reversing"
                      ? { opacity: 0, scale: 0.3, y: 0 }
                      : { y: 300, opacity: 0 }
                }
                transition={
                  phase === "circle"
                    ? { duration: 1.2, ease: "easeOut" }
                    : phase === "reveal-reversing"
                      ? { duration: 0.9, ease: "easeOut" }
                      : phase === "reversing"
                        ? { duration: 0.7, ease: "easeIn" }
                        : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                }
              >
                <div className="w-full h-full relative">
                  <img src={circleImages[0]} alt="" className="absolute top-0 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[2]} alt="" className="absolute top-0 left-1/2 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[1]} alt="" className="absolute top-1/2 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[3]} alt="" className="absolute top-1/2 left-1/2 w-1/2 h-1/2 object-cover" />
                  <div className="absolute inset-0 bg-[#c4b49a]/30" />
                </div>
              </motion.div>
              <motion.div
                className="absolute"
                style={{ ...gpuLayer, width: 'min(500px, 70vw)', height: 'min(500px, 70vw)', borderRadius: '50%', overflow: 'hidden', clipPath: 'inset(0 0 0 50%)' }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={
                  circleIn
                    ? { opacity: 1, scale: 1, y: 0 }
                    : phase === "reversing"
                      ? { opacity: 0, scale: 0.3, y: 0 }
                      : { y: -300, opacity: 0 }
                }
                transition={
                  phase === "circle"
                    ? { duration: 1.2, ease: "easeOut" }
                    : phase === "reveal-reversing"
                      ? { duration: 0.9, ease: "easeOut" }
                      : phase === "reversing"
                        ? { duration: 0.7, ease: "easeIn" }
                        : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                }
              >
                <div className="w-full h-full relative">
                  <img src={circleImages[0]} alt="" className="absolute top-0 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[2]} alt="" className="absolute top-0 left-1/2 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[1]} alt="" className="absolute top-1/2 left-0 w-1/2 h-1/2 object-cover" />
                  <img src={circleImages[3]} alt="" className="absolute top-1/2 left-1/2 w-1/2 h-1/2 object-cover" />
                  <div className="absolute inset-0 bg-[#c4b49a]/30" />
                </div>
              </motion.div>
              <motion.div
                className="absolute z-10 text-center pointer-events-none"
                style={gpuLayer}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={circleIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={phase === "circle" ? { duration: 0.8, delay: 0.6 } : phase === "reveal-reversing" ? { duration: 0.6, delay: 0.3 } : { duration: 0.5 }}
              >
                <h2 className="font-display text-4xl lg:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <span className="italic">In-House Design.</span>
                  <br />
                  <span className="text-3xl lg:text-5xl">World-Class Quality</span>
                </h2>
              </motion.div>
            </div>
          )}

          {/* === SHOWCASE IMAGES === */}
          {showShowcase && (
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-[-3%] left-[5%] w-[45%] lg:w-[40%] z-30"
                style={gpuLayer}
                initial={{ opacity: 0, x: -100 }}
                animate={showcaseIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <img src="/images/showcase-3.webp" alt="Design sketching"
                  className="w-full h-auto rounded-lg shadow-2xl grayscale" loading="eager" />
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 w-[35%] lg:w-[30%] z-20"
                style={gpuLayer}
                initial={{ opacity: 0, x: -100 }}
                animate={showcaseIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.7, delay: showcaseIn ? 0.15 : 0.05, ease: "easeOut" }}
              >
                <img src="/images/showcase-2.webp" alt="Modern living room lighting"
                  className="w-full h-auto rounded-lg shadow-2xl grayscale" loading="eager" />
              </motion.div>

              <motion.div
                className="absolute top-[2%] right-[-3%] w-[45%] lg:w-[40%] z-10"
                style={gpuLayer}
                initial={{ opacity: 0, x: 100 }}
                animate={showcaseIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.7, delay: showcaseIn ? 0.1 : 0.05, ease: "easeOut" }}
              >
                <img src="/images/showcase-1.webp" alt="Modern showroom"
                  className="w-full h-auto rounded-lg shadow-2xl grayscale" loading="eager" />
              </motion.div>

              <motion.div
                className="absolute bottom-[-5%] right-[15%] w-[50%] lg:w-[45%] z-20"
                style={gpuLayer}
                initial={{ opacity: 0, x: 100 }}
                animate={showcaseIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.7, delay: showcaseIn ? 0.25 : 0.1, ease: "easeOut" }}
              >
                <img src="/images/showcase-4.webp" alt="Precision measurement"
                  className="w-full h-auto rounded-lg shadow-2xl grayscale" loading="eager" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] lg:w-[32%] bg-[#f5efe6]/85 p-6 lg:p-10 z-40 shadow-2xl border border-[#d4c9b8]"
                style={gpuLayer}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={showcaseIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: showcaseIn ? 0.15 : 0 }}
              >
                <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#3d3428] mb-3 leading-tight">
                  <span className="italic">In-House Design.</span>
                  <br />
                  World-Class Quality
                </h2>
                <p className="text-[#6b5d4d] text-sm lg:text-base leading-relaxed">
                  At Paralight Group, we bridge the gap between technical
                  innovation and manufacturing excellence. By designing and
                  producing our own products in-house, we deliver high-performance
                  lighting solutions built with meticulous precision.
                </p>
              </motion.div>

              <motion.div
                className="absolute bottom-6 right-6 text-[#8b7a60]/50"
                animate={showcaseIn ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </motion.div>
            </div>
          )}

          {/* === OFFICE CONTENT === */}
          {showOffice && (
            <>
              <motion.div
                className="absolute top-[4%] left-[12%] w-[55%] z-10"
                style={gpuLayer}
                initial={{ opacity: 0, y: -120 }}
                animate={officeIn ? { opacity: 1, y: 0 } : { opacity: 0, y: -120 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: officeIn ? 0.1 : 0 }}
              >
                <img src={officeImages[0].src} alt={officeImages[0].alt}
                  className="w-full h-auto max-h-[35vh] object-cover rounded-lg shadow-xl" />
              </motion.div>

              <motion.div
                className="absolute top-[30%] left-[2%] w-[30%] z-20"
                style={gpuLayer}
                initial={{ opacity: 0, x: -120 }}
                animate={officeIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: officeIn ? 0.15 : 0.05 }}
              >
                <img src={officeImages[1].src} alt={officeImages[1].alt}
                  className="w-full h-auto max-h-[30vh] object-cover rounded-lg shadow-xl" />
              </motion.div>

              <motion.div
                className="absolute top-[22%] right-[2%] w-[32%] z-20"
                style={gpuLayer}
                initial={{ opacity: 0, x: 120 }}
                animate={officeIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: officeIn ? 0.2 : 0.05 }}
              >
                <img src={officeImages[2].src} alt={officeImages[2].alt}
                  className="w-full h-auto max-h-[35vh] object-cover rounded-lg shadow-xl" />
              </motion.div>

              <motion.div
                className="absolute bottom-[4%] left-[8%] w-[35%] z-10"
                style={gpuLayer}
                initial={{ opacity: 0, x: -80, y: 120 }}
                animate={officeIn ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -80, y: 120 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: officeIn ? 0.25 : 0.1 }}
              >
                <img src={officeImages[3].src} alt={officeImages[3].alt}
                  className="w-full h-auto max-h-[30vh] object-cover rounded-lg shadow-xl" />
              </motion.div>

              <motion.div
                className="absolute bottom-[4%] right-[5%] w-[40%] z-10"
                style={gpuLayer}
                initial={{ opacity: 0, y: 120 }}
                animate={officeIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: officeIn ? 0.3 : 0.1 }}
              >
                <img src={officeImages[4].src} alt={officeImages[4].alt}
                  className="w-full h-auto max-h-[30vh] object-cover rounded-lg shadow-xl" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] lg:w-[30%] bg-[#f5efe6]/85 p-6 lg:p-10 z-30 shadow-2xl border border-[#d4c9b8]"
                style={gpuLayer}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={officeIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: officeIn ? 0.15 : 0 }}
              >
                <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#3d3428] mb-3 leading-tight">
                  <span className="italic">Our Workspace.</span>
                  <br />
                  Where Ideas Take Shape
                </h2>
                <p className="text-[#6b5d4d] text-sm lg:text-base leading-relaxed">
                  From product design and 3D modeling to engineering and quality control, our offices are the creative engine behind every Paralight product. A dedicated team of professionals works together to bring lighting innovation to life.
                </p>
              </motion.div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}

export default function About() {
  const stats = [
    { label: "Production Facility", value: "+50,000㎡", icon: Package },
    { label: "Skilled Professionals", value: "200+", icon: Users },
    { label: "Annual Revenue", value: "$47.8M", icon: Globe },
    { label: "Years Experience", value: "10+", icon: Award },
  ];

  const executives = [
    {
      name: "Situ Yonghong",
      role: "Chairman",
      tagline: "Anchoring quality with craftsmanship while embracing industry responsibility.",
      subtitle: "Identifying quality at his fingertips, an industry leader building soul through precision.",
      bio: 'As a product structural engineer and a recognized hands-on leader in the lighting industry, Chairman Situ Yonghong also serves as the Vice President of the Zhongshan Kaiping Chamber of Commerce; while deeply cultivating corporate growth, he actively integrates industry resources and upholds the belief that "Quality is the lifeblood of Paralight Group," leading the company into a new era of international expansion and future supply chain leadership.',
      image: chairmanImg,
      color: "#00A8E8",
      bgGradient: "from-sky-50 via-white to-cyan-50",
    },
    {
      name: "Michelle",
      role: "CEO",
      tagline: "One-stop lighting solutions with the client at the center.",
      subtitle: "A globalized perspective managing systematic operations.",
      bio: "Holding an MBA from Hong Kong, CEO Michelle leads Paralight Group's strategic expansion into international markets, championing client-centric product development, integrated supply chain operations, and long-term vision for global partnerships. Under her leadership, Paralight Group has launched multiple product lines, systematized production workflows, and positioned itself as a comprehensive lighting solutions provider.",
      image: "/michelle.webp",
      color: "#ECAA00",
      bgGradient: "from-amber-50 via-white to-yellow-50",
    },
  ];

  const milestones = [
    {
      year: "2016",
      month: "Oct",
      title: "Establishment of the Paralight Aluminum Accessories Sales Department",
      description: "Focusing on the core business of LED linear lighting aluminum profiles and kits — This marked our formal entry into the linear lighting sector. Through precise positioning, we built our initial client base and industry expertise, laying a solid foundation for deep manufacturing integration and future supply chain expansion.",
      images: [milestone2016_1, milestone2016_2, milestone2016_3],
    },
    {
      year: "2019",
      month: "Dec",
      title: "Establishment of Zhongshan Paralight Lighting Technology Co.,Ltd.",
      description: 'Transitioning from "component sales" to a dual-track "manufacturing + sales" model, we deepened our R&D and production capabilities for core products, further solidifying our manufacturing edge in the linear lighting sector.',
      images: [milestone2019_1, milestone2019_2, milestone2019_3],
    },
    {
      year: "2021",
      month: "Jan",
      title: "Establishment of Jiangmen Dingsu Plastic Co., Ltd. in Jiangmen.",
      description: "Achieving in-house production and sales of PC covers for linear lighting, we have completely integrated the entire chain: from raw materials to aluminum profiles and PC covers, through to finished products.",
      images: [milestone2021jan_1, milestone2021jan_2, milestone2021jan_3],
    },
    {
      year: "2021",
      month: "Sep",
      title: "Establishment of Guangdong Changqi Lighting Technology Co., Ltd. in Zhongshan.",
      description: "We focused on the R&D and scaled production of linear luminaires and LED linear aluminum profiles. By expanding production capacity and driving technological iteration, we significantly enhanced the manufacturing strength of our core products, meeting the demands of global market expansion.",
      images: [milestone2021sep_1, milestone2021sep_2],
    },
    {
      year: "2022",
      month: "Dec",
      title: "Establishment of Jiangmen Tianmai Trading Co., Ltd.",
      description: "Professional integration of the Polycarbonate (PC) resin raw material supply chain — Establishing an industrial centralized procurement system to ensure stable supply and quality control of premium PC resin. This secures product consistency from the very start of the raw material stage and solidifies our core advantage: a fully controllable supply chain.",
      images: [milestone2022dec_1, milestone2022dec_2, milestone2022dec_3],
    },
    {
      year: "2023",
      month: "Jan",
      title: "Establishment of Jiangmen Paralight Lighting Technology Co., Ltd.",
      description: "Relocation of the office team from Zhongshan to Jiangmen — Establishing the group's core operational hub to deeply integrate Jiangmen's industrial resources. This move drives the integrated development of production, R&D, and management, providing the organizational backbone for large-scale and global operations.",
      images: [milestone2023jan_1, milestone2023jan_2, milestone2023jan_3],
    },
    {
      year: "2024",
      month: "Jul",
      title: "Establishment of overseas company C & B in Brazil",
      description: "Positioned as a distribution center in South America, we have built a regional warehousing and distribution network, significantly shortening delivery cycles in the South American market and enhancing the responsiveness and localized service capabilities of our global supply chain.",
      images: [milestone2024jul_1, milestone2024jul_2],
    },
    {
      year: "2025",
      month: "Mar",
      title: "Establishment of Maglinear Lighting Technology Co., Ltd.",
      description: 'By incorporating commercial lighting and magnetic track series into the product portfolio, we have expanded from a singular focus on linear lighting to a fullscenario linear lighting range encompassing "linear + commercial + magnetic" solutions, officially advancing toward becoming a "full-scenario linear lighting solution provider."',
      images: [milestone2025mar_1, milestone2025mar_2, milestone2025mar_3, milestone2025mar_4, milestone2025mar_5],
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedEvent, setSelectedEvent] = useState<ExhibitionEvent | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<{ name: string; role: string; image: string } | null>(null);
  const [teamIndex, setTeamIndex] = useState(0);

  const teamMembers = [
    { name: "Mr. Ou", role: "Production Manager", image: "/team-mr-ou.webp" },
    { name: "Stephy", role: "Sales Manager", image: "/team-stephy.webp" },
    { name: "Taha", role: "Marketing Specialist", image: "/team-taha.webp" },
    { name: "Name", role: "Role", image: "/team-member-1.webp" },
    { name: "Name", role: "Role", image: "/team-member-2.webp" },
    { name: "Name", role: "Role", image: "/team-member-3.webp" },
    { name: "Name", role: "Role", image: "/team-member-4.webp" },
    { name: "Name", role: "Role", image: "/team-member-5.webp" },
    { name: "Name", role: "Role", image: "/team-member-6.webp" },
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="snap-start h-screen relative flex flex-col justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img src="/about-banner.webp" alt="Paralight Factory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-500 mb-6">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white font-medium mb-6">
              Paralight <span className="italic font-normal">Group</span>
            </h1>
            <p className="text-xl text-gray-400 font-light">A Global Ecosystem of Light</p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              With nearly a decade of experience, Paralight Group has become a trusted name in the global lighting industry, specializing in LED aluminum profiles, magnetic track lighting, and commercial lighting solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#F5F0E8]/20 border border-[#F5F0E8]/25 p-6 text-center rounded-lg">
                <stat.icon className="w-5 h-5 mx-auto mb-3 text-[#F5F0E8]/60" />
                <div className="font-display text-2xl md:text-3xl text-[#F5F0E8] font-medium">{stat.value}</div>
                <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#F5F0E8]/70 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-3 mt-8"
          >
            {[
              { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook", color: "#1877F2" },
              { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram", color: "#E4405F" },
              { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn", color: "#0A66C2" },
              { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube", color: "#FF0000" },
              { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter", color: "#1DA1F2" },
              { icon: TikTokIcon, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok", color: "#00F2EA" },
              { icon: PinterestIcon, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest", color: "#E60023" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 bg-transparent hover:scale-110"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color;
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                data-testid={`about-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4.5 h-4.5 text-white" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="snap-start h-screen flex flex-col bg-white overflow-hidden relative">
        {/* Background textures */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-10 w-[450px] h-[450px] bg-[#00A8E8]/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-10 w-[500px] h-[500px] bg-[#ECAA00]/15 rounded-full blur-[90px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
            }}
          />
          <div className="absolute top-10 right-10 w-56 h-56 border-2 border-[#00A8E8]/25 rounded-full" />
          <div className="absolute top-20 right-20 w-36 h-36 border-2 border-[#00A8E8]/30 rounded-full" />
          <div className="absolute bottom-12 left-12 w-48 h-48 border-2 border-[#ECAA00]/25 rounded-full" />
          <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-[#ECAA00]/30 rounded-full" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,168,232,0.14) 1px, transparent 1px), linear-gradient(to right, rgba(0,168,232,0.14) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.9) 0%, transparent 65%)',
              WebkitMaskImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.9) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(236,170,0,0.12) 1px, transparent 1px), linear-gradient(to right, rgba(236,170,0,0.12) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'linear-gradient(to top left, rgba(0,0,0,0.9) 0%, transparent 65%)',
              WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,0.9) 0%, transparent 65%)',
            }}
          />
        </div>
        <div className="pt-24 pb-8 flex-1 flex flex-col container mx-auto px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-3 block">
              Manufacturing Excellence
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-gray-900 font-medium mb-3">
              Inside Our <span className="italic font-normal">Factory</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              A deep dive into precision lighting manufacturing where craftsmanship meets innovation.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook", color: "#1877F2" },
                { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram", color: "#E4405F" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn", color: "#0A66C2" },
                { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube", color: "#FF0000" },
                { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter", color: "#1DA1F2" },
                { icon: TikTokIcon, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok", color: "#00F2EA" },
                { icon: PinterestIcon, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest", color: "#E60023" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-200 bg-transparent hover:scale-110"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.querySelector('svg')!.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgb(229,231,235)';
                    e.currentTarget.querySelector('svg')!.style.color = 'rgb(156,163,175)';
                  }}
                  data-testid={`video-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 text-gray-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 min-h-0 relative overflow-hidden rounded-2xl shadow-2xl group"
          >
            <iframe
              src="https://www.youtube.com/embed/Jt2rWta5RRw?autoplay=1&mute=1&loop=1&playlist=Jt2rWta5RRw"
              title="About Paralight"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="snap-start h-screen flex flex-col justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Color glows */}
          <div className="absolute -top-10 -left-10 w-[400px] h-[400px] bg-[#00A8E8]/20 rounded-full blur-[90px]" />
          <div className="absolute -bottom-10 -right-10 w-[450px] h-[450px] bg-[#ECAA00]/15 rounded-full blur-[90px]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(rgba(0,0,0,0.10) 1.5px, transparent 1.5px)`,
              backgroundSize: '22px 22px',
            }}
          />
          {/* Grid lines - cyan from top-left */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,168,232,0.15) 1px, transparent 1px), linear-gradient(to right, rgba(0,168,232,0.15) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              maskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1) 0%, transparent 65%)',
              WebkitMaskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1) 0%, transparent 65%)',
            }}
          />
          {/* Grid lines - gold from bottom-right */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(236,170,0,0.15) 1px, transparent 1px), linear-gradient(to right, rgba(236,170,0,0.15) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 0%, transparent 65%)',
              WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 0%, transparent 65%)',
            }}
          />
          {/* Decorative hexagon shapes - top right (large, overflowing) */}
          <svg className="absolute -top-32 -right-64 w-[600px] h-[600px] text-[#00A8E8]/20" viewBox="0 0 200 200" fill="none">
            <polygon points="100,10 170,45 170,115 100,150 30,115 30,45" stroke="currentColor" strokeWidth="1" />
            <polygon points="100,25 155,52 155,108 100,135 45,108 45,52" stroke="currentColor" strokeWidth="0.8" />
            <polygon points="100,40 140,60 140,100 100,120 60,100 60,60" stroke="currentColor" strokeWidth="0.7" />
            <polygon points="100,55 125,67 125,93 100,105 75,93 75,67" stroke="currentColor" strokeWidth="0.6" />
            <polygon points="100,68 112,74 112,86 100,92 88,86 88,74" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="10" x2="100" y2="150" stroke="currentColor" strokeWidth="0.4" />
            <line x1="30" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="0.4" />
            <line x1="30" y1="45" x2="170" y2="115" stroke="currentColor" strokeWidth="0.4" />
            <line x1="170" y1="45" x2="30" y2="115" stroke="currentColor" strokeWidth="0.4" />
          </svg>
          {/* Decorative diamond + cross - bottom left */}
          <svg className="absolute bottom-8 left-8 w-56 h-56 text-[#ECAA00]/20" viewBox="0 0 200 200" fill="none">
            <rect x="60" y="60" width="80" height="80" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="1.5" />
            <rect x="75" y="75" width="50" height="50" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.8" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          {/* Decorative triangles - top left */}
          <svg className="absolute top-16 left-16 w-40 h-40 text-[#00A8E8]/15" viewBox="0 0 150 150" fill="none">
            <polygon points="75,10 140,130 10,130" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="75,35 120,115 30,115" stroke="currentColor" strokeWidth="1" />
            <polygon points="75,55 100,100 50,100" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          {/* Decorative arc pattern - right center */}
          <svg className="absolute top-1/2 -translate-y-1/2 right-4 w-48 h-96 text-[#ECAA00]/15" viewBox="0 0 100 200" fill="none">
            <path d="M 100 20 A 80 80 0 0 0 100 180" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 100 40 A 60 60 0 0 0 100 160" stroke="currentColor" strokeWidth="1" />
            <path d="M 100 60 A 40 40 0 0 0 100 140" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 100 80 A 20 20 0 0 0 100 120" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          {/* Small scattered circles */}
          <div className="absolute top-[15%] right-[30%] w-3 h-3 rounded-full border-2 border-[#00A8E8]/25" />
          <div className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-[#00A8E8]/20" />
          <div className="absolute bottom-[20%] left-[25%] w-4 h-4 rounded-full border-2 border-[#ECAA00]/25" />
          <div className="absolute bottom-[30%] left-[40%] w-2 h-2 rounded-full bg-[#ECAA00]/8" />
        </div>
      </section>

      {/* REDESIGNED: Development Journey - Dynamic Alternating Layout */}
      <section className="bg-gray-50 py-24 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 shadow-sm rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] animate-pulse" />
              <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Our History</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 font-medium">
              Development <span className="italic font-normal text-[#00A8E8]">Journey</span>
            </h2>
          </motion.div>

          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-48 bottom-0 w-px bg-gray-200 hidden lg:block" />

          <div className="flex flex-col gap-24 lg:gap-32">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
                  {/* Timeline Dot (Desktop only) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#00A8E8] z-20 hidden lg:block transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(0,168,232,0.4)]" />

                  {/* Date Badge (Mobile Strategy: absolute top left, Desktop Strategy: floating attached to content) */}
                  <div className={`lg:hidden flex items-baseline gap-2 mb-4`}>
                    <span className="text-4xl font-display font-bold text-gray-900">{milestone.year}</span>
                    <span className="text-[#00A8E8] font-bold tracking-widest uppercase text-sm">{milestone.month}</span>
                  </div>

                  {/* Content Block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`flex-1 w-full lg:w-1/2 flex flex-col ${isEven ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'} ${!isEven && 'lg:order-2'}`}
                  >
                    <div className="hidden lg:flex items-baseline gap-2 mb-4">
                      {isEven ? (
                        <>
                          <span className="text-[#00A8E8] font-bold tracking-widest uppercase text-sm">{milestone.month}</span>
                          <span className="text-5xl font-display font-bold text-gray-900">{milestone.year}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-5xl font-display font-bold text-gray-900">{milestone.year}</span>
                          <span className="text-[#00A8E8] font-bold tracking-widest uppercase text-sm">{milestone.month}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 max-w-lg">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base max-w-lg">
                      {milestone.description}
                    </p>
                  </motion.div>

                  {/* Image Grid Block */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className={`flex-1 w-full lg:w-1/2 ${isEven ? 'lg:order-2' : ''}`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                      {milestone.images && milestone.images.length > 0 ? (
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2 bg-white">
                          <div className={`overflow-hidden rounded-xl ${milestone.images.length === 1 ? 'col-span-2 row-span-2' : milestone.images.length === 2 ? 'col-span-1 row-span-2' : 'col-span-2 row-span-1'}`}>
                            <img src={milestone.images[0]} alt={`${milestone.year} milestone view 1`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                          </div>
                          {milestone.images.length > 1 && (
                            <div className={`overflow-hidden rounded-xl ${milestone.images.length === 2 ? 'col-span-1 row-span-2' : 'col-span-1 row-span-1'}`}>
                              <img src={milestone.images[1]} alt={`${milestone.year} milestone view 2`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                            </div>
                          )}
                          {milestone.images.length > 2 && (
                            <div className="overflow-hidden rounded-xl col-span-1 row-span-1">
                              <img src={milestone.images[2]} alt={`${milestone.year} milestone view 3`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-gray-300" />
                        </div>
                      )}

                      {/* Subtle overlay overlay for polish */}
                      <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chairman Section */}
      <section className={`snap-start h-screen relative overflow-hidden bg-gradient-to-br ${executives[0].bgGradient}`} style={{ contain: 'layout style paint' }}>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-full flex items-center justify-center p-8 lg:p-12">
            <img src={executives[0].image} alt={executives[0].name} loading="eager" className="w-full h-[85%] object-cover object-top rounded-2xl shadow-2xl" />
          </div>

          <div className="relative flex flex-col justify-center px-10 lg:px-16 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,168,232,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(0,168,232,0.35) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.4) 70%, transparent 100%)',
              }}
            />
            <div className="relative z-10">
              <span className="inline-block px-6 py-2 rounded-full text-lg lg:text-xl font-bold bg-[#00A8E8]/10 text-[#00A8E8] mb-4 uppercase tracking-widest">{executives[0].role}</span>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-gray-900 mb-3">{executives[0].name}</h2>
              <p className="text-base lg:text-lg text-gray-500 font-light italic mb-6">"{executives[0].tagline}"</p>
              <p className="text-sm text-[#00A8E8] font-medium mb-4">{executives[0].subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{executives[0].bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className={`snap-start h-screen relative overflow-hidden bg-gradient-to-br ${executives[1].bgGradient}`} style={{ contain: 'layout style paint' }}>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex flex-col justify-center px-10 lg:px-16 order-2 lg:order-1 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(236,170,0,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(236,170,0,0.35) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(to bottom left, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom left, transparent 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.4) 70%, transparent 100%)',
              }}
            />
            <div className="relative z-10">
              <span className="inline-block px-6 py-2 rounded-full text-lg lg:text-xl font-bold bg-[#ECAA00]/10 text-[#ECAA00] mb-4 uppercase tracking-widest">{executives[1].role}</span>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-gray-900 mb-3">{executives[1].name}</h2>
              <p className="text-base lg:text-lg text-gray-500 font-light italic mb-6">"{executives[1].tagline}"</p>
              <p className="text-sm text-[#ECAA00] font-medium mb-4">{executives[1].subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{executives[1].bio}</p>
            </div>
          </div>

          <div className="relative h-full flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
            <img src={executives[1].image} alt={executives[1].name} loading="eager" className="w-full h-[85%] object-cover object-top rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* REDESIGNED: Core Team + Design Philosophy - Asymmetric Split Layout */}
      <section className="snap-start h-screen relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left: Core Team Image */}
          <div className="relative bg-[#0a1628]">
            {/* Background image — rendered independently so objectPosition always applies */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/core-team.webp"
                alt="Paralight Core Team"
                className="absolute inset-0 w-full h-full opacity-80"
                style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 via-[#0a1628]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 pb-48 lg:pb-52">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
                  <Heart className="w-4 h-4 text-[#00A8E8]" />
                  <span className="font-medium text-sm text-white">Core Team</span>
                </div>
                <h3 className="font-display text-3xl lg:text-4xl text-white font-bold mb-2">
                  The Heart of Paralight
                </h3>
                <p className="text-white/60 text-sm lg:text-base max-w-md">
                  Bringing vision to life through dedication and expertise
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right: Philosophy Content */}
          <div className="bg-gradient-to-br from-[#06101e] via-[#0a1628] to-[#0d1f38] p-8 lg:p-14 flex flex-col justify-center relative overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,168,232,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(0,168,232,0.06) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00A8E8]/10 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECAA00]/10 border border-[#ECAA00]/30 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ECAA00] animate-pulse" />
                <span className="text-[#ECAA00] text-xs font-semibold uppercase tracking-widest">Our Philosophy</span>
              </div>

              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
                Client-Centric <span className="italic font-normal text-[#00A8E8]">Excellence</span>
              </h2>
              <p className="text-white/50 leading-relaxed text-sm mb-8 max-w-sm">
                Our culture is defined by seamless integration of manufacturing and trade, always placing the client at the center.
              </p>

              {/* Big icon feature rows */}
              <div className="space-y-4">
                {[
                  {
                    icon: Target,
                    label: "Precision",
                    desc: "Every component, every tolerance, every detail matters — built to exact specification.",
                    color: "#00A8E8",
                    bg: "rgba(0,168,232,0.12)",
                    border: "rgba(0,168,232,0.25)",
                  },
                  {
                    icon: Sparkles,
                    label: "Innovation",
                    desc: "Constant evolution in product design, materials, and production techniques.",
                    color: "#ECAA00",
                    bg: "rgba(236,170,0,0.12)",
                    border: "rgba(236,170,0,0.25)",
                  },
                  {
                    icon: Zap,
                    label: "Speed",
                    desc: "Rapid response to demand changes with a fully integrated supply chain.",
                    color: "#00A8E8",
                    bg: "rgba(0,168,232,0.12)",
                    border: "rgba(0,168,232,0.25)",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-5 p-4 rounded-2xl border transition-all duration-300 cursor-default group"
                    style={{ backgroundColor: item.bg, borderColor: item.border }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '9999px',
                        backgroundColor: item.color,
                        boxShadow: `0 0 20px ${item.color}40`,
                        flexShrink: 0,
                      }}
                    >
                      <item.icon style={{ width: '26px', height: '26px', color: '#fff' }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base mb-0.5" style={{ color: item.color }}>{item.label}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote strip */}
              <div className="mt-6 border-l-2 border-[#ECAA00]/50 pl-4">
                <p className="text-white/40 text-xs italic leading-relaxed">
                  "From responsive demand to collaborative support and full-chain satisfaction — the core competitive advantage of Paralight Group."
                </p>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Team Strip — 3 members visible, auto-slides every 4s */}
        <TeamStrip teamMembers={teamMembers} onSelect={setSelectedTeamMember} />

        <AnimatePresence>
          {selectedTeamMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setSelectedTeamMember(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTeamMember(null)}
                  className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedTeamMember.image}
                    alt={selectedTeamMember.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="bg-[#0a1628] px-6 py-4 text-center">
                    <h3 className="text-white font-display font-bold text-lg">{selectedTeamMember.name}</h3>
                    <p className="text-white/60 text-sm">{selectedTeamMember.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Showcase Animation Section with Circle Split Intro */}
      <ShowcaseSection />

      {/* REDESIGNED: Certifications + Honors - Side by Side */}
      <section className="snap-start h-screen flex flex-col justify-center bg-[#0a1628] overflow-hidden relative">

        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pt-8 lg:pt-0"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#00A8E8]/15 border border-[#00A8E8]/30 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#00A8E8]" />
                </div>
                <div>
                  <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Quality Assurance</span>
                  <h3 className="font-display text-2xl lg:text-3xl text-white font-bold">Certifications</h3>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "High-tech Enterprise", desc: "Recognized innovation leader" },
                  { name: "CB / BIS / RoHS / CE", desc: "International compliance standards" },
                  { name: "Lighting Association", desc: "Industry partnership & membership" },
                  { name: "Gold Supplier Awards", desc: "Excellence in trade service" },
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(0,168,232,0.08)', borderColor: 'rgba(0,168,232,0.3)' }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 group transition-all duration-300 cursor-default flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#00A8E8]/15 border border-[#00A8E8]/25 flex items-center justify-center shrink-0 group-hover:bg-[#00A8E8]/25 transition-colors">
                      <CheckCircle className="w-5 h-5 text-[#00A8E8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm group-hover:text-[#00A8E8] transition-colors">{cert.name}</h4>
                      <p className="text-xs text-white/40 mt-0.5">{cert.desc}</p>
                    </div>
                    <span className="text-[#00A8E8]/60 text-xs font-medium shrink-0 border border-[#00A8E8]/20 px-2 py-0.5 rounded-full group-hover:border-[#00A8E8]/50 group-hover:text-[#00A8E8] transition-all">Granted</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Honors Slideshow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#ECAA00]/15 border border-[#ECAA00]/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#ECAA00]" />
                </div>
                <div>
                  <span className="text-[#ECAA00] text-xs font-semibold uppercase tracking-widest">Recognition</span>
                  <h3 className="font-display text-2xl lg:text-3xl text-white font-bold">Official Certificates</h3>
                </div>
              </div>

              <div className="max-w-md mx-auto lg:mx-0">
                <HonorsSlideshow />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* REDESIGNED: Exhibitions - Carousel */}
      <section className="snap-start h-screen flex flex-col justify-center bg-gray-50 overflow-hidden relative">

        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 shadow-sm rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] animate-pulse" />
                <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Global Reach</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 font-medium">
                Worldwide <span className="italic font-normal text-[#00A8E8]">Exhibitions</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={scrollPrev}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#00A8E8]/50 transition-all text-gray-400 hover:text-gray-900 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={scrollNext}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#00A8E8]/50 transition-all text-gray-400 hover:text-gray-900 group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats strip */}
          <div className="flex gap-8 mb-8">
            {[
              { value: "20+", label: "Expos / Year" },
              { value: "15+", label: "Countries" },
              { value: "10k+", label: "Visitors Met" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl font-display font-bold text-[#00A8E8]">{s.value}</span>
                <span className="text-gray-400 text-xs uppercase tracking-widest">{s.label}</span>
                {i < 2 && <span className="text-gray-200 ml-3">|</span>}
              </motion.div>
            ))}
          </div>

          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-6">
              {exhibitionEvents.map((event, index) => (
                <div key={event.name} className="flex-[0_0_280px] md:flex-[0_0_320px] min-w-0">
                  <ExhibitionCard event={event} onClick={() => setSelectedEvent(event)} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedEvent && <ExhibitionLightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </AnimatePresence>
      </section>

      {/* REDESIGNED: Global Delivery - Full width with stats */}
      <section className="snap-start h-screen flex flex-col justify-center bg-white relative overflow-hidden">

        <div className="container mx-auto px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Text content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 shadow-sm rounded-full mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#00A8E8] animate-pulse" />
                  <span className="text-[#00A8E8] text-xs font-semibold uppercase tracking-widest">Worldwide Shipping</span>
                </div>
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Fast &amp; <span className="italic font-normal text-[#00A8E8]">Efficient</span> Delivery
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  We load an average of 2 containers per day, and 50–60 containers a month. Our reinforced 5-layer
                  packaging system ensures product safety across moisture, pressure, and impact during international transit.
                </p>

                {/* Animated stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { value: "2", unit: "/day", label: "Containers", color: "#00A8E8" },
                    { value: "5", unit: "-layer", label: "Packaging", color: "#ECAA00" },
                    { value: "100+", unit: "", label: "Countries", color: "#00A8E8" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.12 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 text-center cursor-default hover:border-gray-300 transition-all duration-300"
                    >
                      <div className="text-4xl font-display font-bold" style={{ color: stat.color }}>
                        {stat.value}<span className="text-lg">{stat.unit}</span>
                      </div>
                      <div className="text-xs uppercase tracking-widest text-gray-400 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-3">
                  {[
                    "Sea Freight", "Air Express", "Door-to-Door", "Real-time Tracking", "Insurance Covered"
                  ].map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      whileHover={{ backgroundColor: '#fff', borderColor: 'rgba(0,168,232,0.3)', color: '#00A8E8' }}
                      className="text-xs text-gray-500 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-full transition-all cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Slideshow */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-[#00A8E8]/25 to-[#ECAA00]/20 rounded-3xl blur-2xl" />
                <ShippingSlideshow />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}
