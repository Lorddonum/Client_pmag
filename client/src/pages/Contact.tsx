import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, Music2, Pin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: "No. 11, Longsha Industrial Zone, Jianghai District, Jiangmen City, China",
      link: "#",
    },
    {
      icon: Phone,
      title: "Phone / Whatsapp",
      details: "+86 181 2825 9727",
      link: "tel:+8618128259727",
    },
    {
      icon: Mail,
      title: "Email Address",
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero section */}
      <section className="pt-32 pb-20 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-gray-900 font-medium mb-6">
              Let's <span className="italic font-normal">Connect</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Whether you're a wholesaler, distributor, or working on a lighting project — 
              our team is here to support you with custom solutions and partnership opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-24">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-16"
            >
              <div className="space-y-10">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-400 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-900 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-gray-100">
                <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
                  Follow Our Journey
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gray-50 p-10 lg:p-14"
            >
              <h2 className="font-display text-3xl text-gray-900 font-medium mb-8">
                Send us a message
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 px-4 py-3.5 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white border border-gray-200 px-4 py-3.5 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Whatsapp
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 px-4 py-3.5 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 px-4 py-3.5 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-200 px-4 py-3.5 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-white border border-gray-200 px-4 py-3.5 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gray-900 text-white font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300"
                >
                  Submit Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Map section */}
      <section className="h-[450px] w-full border-t border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3320625624775!2d113.123456!3d22.56789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzA0LjQiTiAxMTPCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2s!4v1612345678901!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%)' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
}
