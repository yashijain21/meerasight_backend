import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import VisionSection from "./components/VisionSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BlogSection from "./components/BlogSection";
import AppointmentSection from "./components/AppointmentSection";
import Footer from "./components/Footer";
import ServicePage from "./components/ServicePage";
import WhatsAppButton from "./components/WhatsAppButton";

const Home = () => (
  <div className="bg-[#FAF8FF]">
    <Navbar />
    <HeroCarousel />
    <VisionSection />
    <ServicesSection />
    <TestimonialsSection />
    <BlogSection />
    <AppointmentSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

const AboutPage = () => (
  <div className="bg-[#FAF8FF]">
    <Navbar />
    <AboutSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

const SpecialtiesPage = () => (
  <div className="bg-[#FAF8FF]">
    <Navbar />
    <ServicesSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

const TestimonialsPage = () => (
  <div className="bg-[#FAF8FF]">
    <Navbar />
    <TestimonialsSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

const BlogPage = () => (
  <div className="bg-[#FAF8FF]">
    <Navbar />
    <BlogSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

const ContactPage = () => (
  <div className="bg-[#FAF8FF]">
    <Navbar />
    <AppointmentSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
