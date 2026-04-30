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

const Home = () => (
  <div className="bg-[#F8FAF8]">
    <Navbar />
    <HeroCarousel />
    <VisionSection />
    <AboutSection />
    <ServicesSection />
    <TestimonialsSection />
    <BlogSection />
    <AppointmentSection />
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
