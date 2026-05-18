import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Work from "@/components/Work";
import Expertise from "@/components/Expertise";
import Recommendations from "@/components/Recommendations";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-white/20 selection:text-white">
      {/* Scrollytelling Hero Section */}
      <ScrollyCanvas />
      
      {/* About Section */}
      <About />

      {/* Work Section */}
      <Work />

      {/* Expertise Section */}
      <Expertise />
      
      {/* Recommendations Section */}
      <Recommendations />

      {/* Insights Section */}
      <Insights />

      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
