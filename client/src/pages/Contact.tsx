import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, Send, LightbulbOff } from "lucide-react";

export default function Contact() {
  const [isLit, setIsLit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    country: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, China",
      link: "#map",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+86 181 2825 9727",
      link: "tel:+8618128259727",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "inquiry@paralight.cc",
      link: "mailto:inquiry@paralight.cc",
    },
  ];

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/paralightmaglinear/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/paralight.group/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/paralight-group/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@ParalightMaglinearLighting", label: "YouTube" },
    { icon: Twitter, href: "https://x.com/Paralight_Group", label: "Twitter" },
    { icon: Music2, href: "https://www.tiktok.com/@paralightmaglinear", label: "TikTok" },
    { icon: Pin, href: "https://www.pinterest.com/ParalightMaglinear/", label: "Pinterest" },
  ];

  const handleLightUp = () => {
    setIsLit(true);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-1000 ${isLit ? 'bg-transparent text-gray-900' : 'bg-gray-950 text-white'} ${!isLit ? 'overflow-hidden h-screen' : ''}`}>
      {/* Stylized hotel background - always visible, tint changes on state */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1500 ease-in-out opacity-100">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out"
          style={{
            backgroundImage: 'url(/gallery/five-star-hotel.webp)',
            transform: isLit ? 'scale(1)' : 'scale(1.05)',
            filter: isLit ? 'brightness(1)' : 'brightness(0.6)'
          }}
        />
        {/* Dynamic Overlay: Dark/moody when unlit, bright/warm when lit */}
        <div
          className={`absolute inset-0 transition-all duration-1500 backdrop-blur-[6px] ${isLit
              ? 'bg-gradient-to-br from-[#EDE4D3]/90 via-[#FAF7F2]/85 to-[#E8DCB8]/90'
              : 'bg-gray-950/80'
            }`}
        />
        {/* Subtle vignette */}
        <div className={`absolute inset-0 transition-opacity duration-1500 ${isLit ? 'opacity-100' : 'opacity-50'} bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]`} />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section - Animates away when lit */}
        <AnimatePresence>
          {!isLit && (
            <motion.section
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center min-h-screen"
            >
              {/* Animated gradient orbs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blur-[120px]"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-gold/15 rounded-full blur-[150px]"
              />

              {/* Content */}
              <div className="container mx-auto px-8 lg:px-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white/5 border border-white/10"
                  >
                    <LightbulbOff className="w-4 h-4 text-gray-500" />
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-300">Let's Connect</span>
                  </motion.div>

                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium mb-6 leading-[0.95] text-white">
                    Light Up The
                    <br />
                    <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-gold">
                      Future Together
                    </span>
                  </h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-400"
                  >
                    Whether you're a wholesaler, distributor, or working on a lighting project —
                    our team is here to support you.
                  </motion.p>

                  <motion.button
                    onClick={handleLightUp}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-gray-900 font-medium rounded-full hover:bg-brand-gold/90 transition-all duration-300 group"
                  >
                    <span>Send an Inquiry</span>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <LightbulbOff className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Content that appears after lighting up */}
        <AnimatePresence>
          {isLit && (
            <>
              {/* Contact Info Cards */}
              <motion.section
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-20 pt-32 pb-16"
              >
                <div className="container mx-auto px-8 lg:px-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contactInfo.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.link}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                        className="group relative bg-[#FAF7F2]/40 backdrop-blur-md border border-[#EDE4D3]/60 p-8 hover:border-[#D5A021]/30 hover:bg-[#FAF7F2]/60 transition-all duration-500 shadow-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <div className="w-12 h-12 bg-white/70 backdrop-blur-sm border border-[#EDE4D3]/80 flex items-center justify-center mb-6 group-hover:bg-[#D5A021]/10 group-hover:border-[#D5A021]/30 transition-all duration-300">
                            <item.icon className="w-5 h-5 text-gray-500 group-hover:text-[#D5A021] transition-colors" />
                          </div>
                          <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-900 text-lg leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Main Content - Form and Socials */}
              <motion.section
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative py-16"
              >
                <div className="container mx-auto px-8 lg:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
                    {/* Form */}
                    <div className="lg:col-span-3">
                      <div className="mb-10">
                        <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 block mb-4">
                          Get in Touch
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-medium">
                          Send us a <span className="italic font-normal">message</span>
                        </h2>
                      </div>

                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-white/40 backdrop-blur-sm border-0 border-b-2 border-gray-300/50 px-4 py-4 text-gray-900 focus:outline-none focus:border-[#D5A021] focus:bg-white/60 transition-all text-lg placeholder-gray-500"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-white/40 backdrop-blur-sm border-0 border-b-2 border-gray-300/50 px-4 py-4 text-gray-900 focus:outline-none focus:border-[#D5A021] focus:bg-white/60 transition-all text-lg placeholder-gray-500"
                              placeholder="john@company.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                              Whatsapp / Phone
                            </label>
                            <input
                              type="text"
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                              className="w-full bg-white/40 backdrop-blur-sm border-0 border-b-2 border-gray-300/50 px-4 py-4 text-gray-900 focus:outline-none focus:border-[#D5A021] focus:bg-white/60 transition-all text-lg placeholder-gray-500"
                              placeholder="+1 234 567 890"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600">
                              Company Name
                            </label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full bg-white/40 backdrop-blur-sm border-0 border-b-2 border-gray-300/50 px-4 py-4 text-gray-900 focus:outline-none focus:border-[#D5A021] focus:bg-white/60 transition-all text-lg placeholder-gray-500"
                              placeholder="Acme Inc."
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600">
                            Country / Region
                          </label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full bg-white/40 backdrop-blur-sm border-0 border-b-2 border-gray-300/50 px-4 py-4 text-gray-900 focus:outline-none focus:border-[#D5A021] focus:bg-white/60 transition-all text-lg placeholder-gray-500"
                            placeholder="United States"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600">
                            Your Message
                          </label>
                          <textarea
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white/40 backdrop-blur-sm border-0 border-b-2 border-gray-300/50 px-4 py-4 text-gray-900 focus:outline-none focus:border-[#D5A021] focus:bg-white/60 transition-all resize-none text-lg placeholder-gray-500"
                            placeholder="Tell us about your project..."
                          ></textarea>
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-3 px-10 py-5 bg-[#D5A021] text-gray-900 font-medium text-sm tracking-wide hover:bg-[#C1901C] transition-colors duration-300 mt-4 shadow-lg shadow-[#D5A021]/20 rounded-sm"
                        >
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry</span>
                        </motion.button>
                      </form>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-2 space-y-12">
                      <div className="bg-[#1C1A18] p-8 text-white shadow-xl relative overflow-hidden">
                        {/* Decorative accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D5A021]/10 rounded-full blur-[30px]" />
                        <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-6 relative z-10">
                          Prefer a Quick Call?
                        </h3>
                        <a href="tel:+8618128259727" className="block text-3xl font-display font-medium mb-2 hover:text-[#D5A021] transition-colors relative z-10">
                          +86 181 2825 9727
                        </a>
                        <p className="text-gray-400 text-sm relative z-10">Available Monday - Saturday, 9am - 6pm CST</p>
                      </div>

                      <div>
                        <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
                          Follow Our Journey
                        </h3>
                        <div className="grid grid-cols-4 gap-3">
                          {socials.map((social) => (
                            <motion.a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={social.label}
                              whileHover={{ y: -4 }}
                              className="aspect-square bg-white/60 backdrop-blur-sm border border-[#EDE4D3]/60 flex items-center justify-center text-gray-600 hover:bg-[#1C1A18] hover:text-[#D5A021] hover:border-[#1C1A18] transition-all duration-300 shadow-sm"
                            >
                              <social.icon className="w-5 h-5" />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Map section */}
              <motion.section
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                id="map"
                className="h-[400px] w-full relative"
              >
                <div className="absolute inset-0 bg-gray-950/20 z-10 pointer-events-none" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3320625624775!2d113.123456!3d22.56789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzA0LjQiTiAxMTPCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2s!4v1612345678901!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute bottom-8 left-8 md:left-12 z-20 bg-white p-6 shadow-2xl max-w-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-cyan/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-gray-900 font-medium mb-1">Paralight Group HQ</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, China
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Background Wrapper end */}
              <Footer />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
