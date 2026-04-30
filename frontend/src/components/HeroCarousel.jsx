import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "Advanced Eye Care",
    title: "See Life,",
    titleAccent: "Clearly",
    subtitle: "Expert ophthalmology care with state-of-the-art technology. Your vision is our mission.",
    cta: "Book Free Consultation",
    ctaHref: "#appointment",
    secondaryCta: "Our Services",
    secondaryHref: "#services",
    image: "https://images.unsplash.com/photo-1766310549795-dd0fc75d499f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxleWUlMjBkb2N0b3IlMjBvcGh0aGFsbW9sb2dpc3QlMjBleGFtaW5hdGlvbiUyMHBhdGllbnR8ZW58MHx8fHwxNzc3NTYzNTY2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: 2,
    tag: "LASIK Surgery",
    title: "Life Without",
    titleAccent: "Glasses",
    subtitle: "Precision LASIK surgery for permanent vision correction. Trusted by over 5 lakh patients.",
    cta: "Go Specs-Free",
    ctaHref: "#services",
    secondaryCta: "Learn More",
    secondaryHref: "#about",
    image: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHw0fHxoYXBweSUyMHBhdGllbnQlMjBoZWFsdGhjYXJlJTIwY2xpbmljfGVufDB8fHx8MTc3NzU2MzYwM3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    id: 3,
    tag: "22+ Years of Excellence",
    title: "Trusted By",
    titleAccent: "Millions",
    subtitle: "India's leading eye hospital network with cutting-edge treatments for every eye condition.",
    cta: "Our Story",
    ctaHref: "#about",
    secondaryCta: "Book Appointment",
    secondaryHref: "#appointment",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwzfHxoYXBweSUyMHBhdGllbnQlMjBoZWFsdGhjYXJlJTIwY2xpbmljfGVufDB8fHx8MTc3NzU2MzYwM3ww&ixlib=rb-4.1.0&q=85",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[active];

  return (
    <section data-testid="hero-carousel" className="relative w-full overflow-hidden" style={{ height: "90vh", minHeight: 580 }}>
      {/* Background image */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.15) 100%)"
        }} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.4s ease" }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div className="max-w-2xl">
            {/* Tag */}
            <span className="inline-block bg-[#246B24]/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              {slide.tag}
            </span>
            {/* Title */}
            <h1 className="font-heading font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              {slide.title}{" "}
              <span className="text-[#5DC85D]">{slide.titleAccent}</span>
            </h1>
            {/* Subtitle */}
            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              {slide.subtitle}
            </p>
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href={slide.ctaHref}
                data-testid={`hero-cta-primary-${slide.id}`}
                className="bg-[#246B24] hover:bg-[#1B4D1B] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-green-900/30"
              >
                {slide.cta}
              </a>
              <a
                href={slide.secondaryHref}
                data-testid={`hero-cta-secondary-${slide.id}`}
                className="border-2 border-white text-white hover:bg-white hover:text-[#0A1F0A] font-bold px-8 py-4 rounded-full transition-all duration-200"
              >
                {slide.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        data-testid="hero-prev"
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        data-testid="hero-next"
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            data-testid={`hero-dot-${i}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-[#246B24]" : "w-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
