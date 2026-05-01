import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "Advanced Eye Care",
    title: "See Life,",
    titleAccent: "Clearly",
    subtitle: "Expert ophthalmology care by Dr. Sonia Sharma at MeeraSight, Janak Puri, New Delhi.",
    cta: "Book Free Consultation",
    ctaHref: "#appointment",
    secondaryCta: "Our Services",
    secondaryHref: "#services",
    image: "https://images.unsplash.com/photo-1766310549795-dd0fc75d499f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxleWUlMjBkb2N0b3IlMjBvcGh0aGFsbW9sb2dpc3QlMjBleGFtaW5hdGlvbiUyMHBhdGllbnR8ZW58MHx8fHwxNzc3NTYzNTY2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: 2,
    tag: "Refractive Surgery",
    title: "Life Without",
    titleAccent: "Glasses",
    subtitle: "Precision LASIK surgery for permanent vision correction. Trusted by thousands of patients.",
    cta: "Go Specs-Free",
    ctaHref: "/services/refractive",
    secondaryCta: "Learn More",
    secondaryHref: "#about",
    image: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHw0fHxoYXBweSUyMHBhdGllbnQlMjBoZWFsdGhjYXJlJTIwY2xpbmljfGVufDB8fHx8MTc3NzU2MzYwM3ww&ixlib=rb-4.1.0&q=85",
  },
  {
    id: 3,
    tag: "Expert Eye Surgeon",
    title: "Trusted Care by",
    titleAccent: "Dr. Sonia Sharma",
    subtitle: "Comprehensive eye care — from cataract surgery to retina treatment and pediatric ophthalmology.",
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
    setTimeout(() => { setActive(idx); setAnimating(false); }, 300);
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
      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: animating ? 0 : 1 }}>
        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(96,30,142,0.85) 0%, rgba(96,30,142,0.55) 45%, rgba(0,0,0,0.15) 100%)"
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center" style={{ opacity: animating ? 0 : 1, transition: "opacity 0.4s ease" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#00A8D7]/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              {slide.tag}
            </span>
            <h1 className="font-heading font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              {slide.title}{" "}
              <span className="text-[#00A8D7]">{slide.titleAccent}</span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">{slide.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={slide.ctaHref}
                data-testid={`hero-cta-primary-${slide.id}`}
                className="bg-[#601E8E] hover:bg-[#4A1570] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl"
              >
                {slide.cta}
              </a>
              <a
                href={slide.secondaryHref}
                data-testid={`hero-cta-secondary-${slide.id}`}
                className="border-2 border-white text-white hover:bg-white hover:text-[#601E8E] font-bold px-8 py-4 rounded-full transition-all duration-200"
              >
                {slide.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button data-testid="hero-prev" onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/30" aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button data-testid="hero-next" onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/30" aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} data-testid={`hero-dot-${i}`} onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#00A8D7]" : "w-2 bg-white/60 hover:bg-white"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
