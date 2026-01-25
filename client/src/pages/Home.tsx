import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BrandSplit from "@/components/home/BrandSplit";
import GlobalNetwork from "@/components/home/GlobalNetwork";
import Exhibition from "@/components/home/Exhibition";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a2332] text-white selection:bg-[#00A8E8] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <BrandSplit />
        <GlobalNetwork />
        <Exhibition />
      </main>
      <Footer />
    </div>
  );
}
