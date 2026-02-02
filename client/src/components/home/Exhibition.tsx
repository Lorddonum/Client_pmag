import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ExhibitionEvent {
  name: string;
  location: string;
  logo: string;
  images: string[];
}

const exhibitionEvents: ExhibitionEvent[] = [
  { 
    name: "Middle East Energy", 
    location: "Dubai, UAE", 
    logo: "/exhibitions/logos/middle-east-energy.jpg",
    images: [
      "/exhibitions/dubai-2024/img-1.jpg",
      "/exhibitions/dubai-2024/img-2.jpg",
      "/exhibitions/dubai-2024/img-3.jpg",
      "/exhibitions/dubai-2024/img-4.jpg",
      "/exhibitions/dubai-2024/img-5.jpg",
      "/exhibitions/dubai-2024/img-6.jpg",
      "/exhibitions/dubai-2024/img-7.jpg",
      "/exhibitions/dubai-2024/img-8.jpg",
    ]
  },
  { 
    name: "Canton Fair", 
    location: "Guangzhou, China", 
    logo: "/exhibitions/logos/canton-fair.jpg",
    images: [
      "/exhibitions/canton-2024/img-1.jpg",
      "/exhibitions/canton-2024/img-2.jpg",
      "/exhibitions/canton-2024/img-3.jpg",
      "/exhibitions/canton-2024/img-4.jpg",
      "/exhibitions/canton-2024/img-5.jpg",
      "/exhibitions/canton-2024/img-6.jpg",
      "/exhibitions/canton-2024/img-7.jpg",
      "/exhibitions/canton-2024/img-8.jpg",
    ]
  },
  { 
    name: "GILF", 
    location: "Guzhen, China", 
    logo: "/exhibitions/logos/gilf.jpg",
    images: [
      "/exhibitions/poland-2024/img-1.jpg",
      "/exhibitions/poland-2024/img-2.jpg",
      "/exhibitions/poland-2024/img-3.jpg",
      "/exhibitions/poland-2024/img-4.jpg",
      "/exhibitions/poland-2024/img-5.jpg",
      "/exhibitions/poland-2024/img-6.jpg",
      "/exhibitions/poland-2024/img-7.jpg",
      "/exhibitions/poland-2024/img-8.jpg",
    ]
  },
  { 
    name: "LED Middle East", 
    location: "Cairo, Egypt", 
    logo: "/exhibitions/logos/led-middle-east.png",
    images: [
      "/exhibitions/egypt-2023/img-1.jpg",
      "/exhibitions/egypt-2023/img-2.jpg",
      "/exhibitions/egypt-2023/img-3.jpg",
      "/exhibitions/egypt-2023/img-4.jpg",
      "/exhibitions/egypt-2023/img-5.jpg",
      "/exhibitions/egypt-2023/img-6.jpg",
      "/exhibitions/egypt-2023/img-7.jpg",
    ]
  },
  { 
    name: "HK Lighting Fair", 
    location: "Hong Kong", 
    logo: "/exhibitions/logos/hk-lighting-fair.jpg",
    images: [
      "/exhibitions/hongkong-2023/img-1.jpg",
      "/exhibitions/hongkong-2023/img-2.jpg",
      "/exhibitions/hongkong-2023/img-3.jpg",
      "/exhibitions/hongkong-2023/img-4.jpg",
      "/exhibitions/hongkong-2023/img-5.jpg",
      "/exhibitions/hongkong-2023/img-6.jpg",
      "/exhibitions/hongkong-2023/img-7.jpg",
      "/exhibitions/hongkong-2023/img-8.jpg",
    ]
  },
  { 
    name: "Light + Building", 
    location: "Frankfurt, Germany", 
    logo: "/exhibitions/logos/light-building.jpg",
    images: [
      "/exhibitions/spain-2022/img-1.jpg",
      "/exhibitions/spain-2022/img-2.jpg",
      "/exhibitions/spain-2022/img-3.jpg",
      "/exhibitions/spain-2022/img-4.jpg",
      "/exhibitions/spain-2022/img-5.jpg",
      "/exhibitions/spain-2022/img-6.jpg",
    ]
  },
  { 
    name: "LEDTEC Asia", 
    location: "Ho Chi Minh, Vietnam", 
    logo: "/exhibitions/logos/ledtec-asia.jpg",
    images: [
      "/exhibitions/india-2022/img-1.jpg",
      "/exhibitions/india-2022/img-2.jpg",
      "/exhibitions/india-2022/img-3.jpg",
      "/exhibitions/india-2022/img-4.jpg",
      "/exhibitions/india-2022/img-5.jpg",
      "/exhibitions/india-2022/img-6.jpg",
      "/exhibitions/india-2022/img-7.jpg",
    ]
  },
  { 
    name: "Expolux", 
    location: "São Paulo, Brazil", 
    logo: "/exhibitions/logos/expolux.png",
    images: [
      "/exhibitions/brazil-2022/img-1.jpg",
      "/exhibitions/brazil-2022/img-2.jpg",
      "/exhibitions/brazil-2022/img-3.jpg",
      "/exhibitions/brazil-2022/img-4.jpg",
      "/exhibitions/brazil-2022/img-5.jpg",
      "/exhibitions/brazil-2022/img-6.jpg",
    ]
  },
];

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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
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

export default function Exhibition() {
  const [selectedEvent, setSelectedEvent] = useState<ExhibitionEvent | null>(null);

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-cyan text-[11px] font-medium uppercase tracking-[0.3em]">
            Meet Us Worldwide
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white font-medium mt-4 mb-6">
            <span className="italic font-normal">Exhibitions</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            We participate in leading lighting exhibitions worldwide, showcasing 
            our latest innovations and connecting with global partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {exhibitionEvents.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="group cursor-pointer"
              data-testid={`exhibition-logo-${index}`}
            >
              <div className="bg-white p-6 flex items-center justify-center h-24 md:h-28 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <img
                  src={event.logo}
                  alt={event.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="text-white text-sm font-medium group-hover:text-brand-cyan transition-colors">
                  {event.name}
                </h4>
                <p className="text-gray-500 text-xs mt-1">{event.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <ExhibitionLightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
