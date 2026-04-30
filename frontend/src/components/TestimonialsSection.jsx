import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Gupta",
    role: "Software Engineer",
    review: "The care during my LASIK surgery was exceptional. The staff was professional and made me feel completely comfortable throughout the procedure. My vision is now 20/20!",
    rating: 5,
    initials: "RG",
    color: "#246B24",
  },
  {
    name: "Priya Sharma",
    role: "Teacher",
    review: "The advanced technology at ClearVision ensured my cataract treatment was effective and efficient. Truly a modern healthcare leader. I can now see colours vividly!",
    rating: 5,
    initials: "PS",
    color: "#1B4D1B",
  },
  {
    name: "Arjun Patel",
    role: "Businessman",
    review: "Affordable healthcare without compromising quality is rare, but ClearVision delivered. The cost was reasonable, and the care was truly outstanding.",
    rating: 5,
    initials: "AP",
    color: "#246B24",
  },
  {
    name: "Sunita Menon",
    role: "Homemaker",
    review: "From the moment I walked in, I felt I was in good hands. The staff's kindness and the hospital's cleanliness were very impressive. Highly recommend!",
    rating: 5,
    initials: "SM",
    color: "#FFB800",
  },
  {
    name: "Vikram Singh",
    role: "Doctor",
    review: "As a healthcare professional, I am very particular about choosing where I get treated. ClearVision's advanced technology and precision were remarkable.",
    rating: 5,
    initials: "VS",
    color: "#246B24",
  },
  {
    name: "Anita Desai",
    role: "Web Developer",
    review: "I was worried about surgery costs, but ClearVision made it affordable without sacrificing quality. Compassionate and skilled care made my recovery stress-free.",
    rating: 5,
    initials: "AD",
    color: "#1B4D1B",
  },
];

function TestimonialCard({ t }) {
  return (
    <div
      data-testid={`testimonial-card-${t.name.replace(/\s+/g, "-").toLowerCase()}`}
      className="testimonial-card bg-white rounded-2xl p-7 min-w-[320px] max-w-[360px] border border-[#E0EBE0] mx-3 flex-shrink-0"
    >
      <Quote size={28} className="text-[#246B24] mb-4 opacity-60" />
      <p className="text-[#0A1F0A] text-sm leading-relaxed mb-6 font-medium">"{t.review}"</p>
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-[#FFB800] fill-[#FFB800]" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-heading font-bold text-[#0A1F0A] text-sm">{t.name}</p>
          <p className="text-[#4B6B4B] text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" data-testid="testimonials-section" className="bg-[#F8FAF8] py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[#246B24] text-sm font-bold uppercase tracking-widest mb-3">Happy & Content</p>
          <h2 className="font-heading font-bold text-[#0A1F0A] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            Client <span className="text-[#246B24]">Testimonials</span>
          </h2>
          <p className="text-[#4B6B4B] text-base md:text-lg max-w-2xl mx-auto">
            At ClearVision Eye Hospitals, our patients' experiences speak volumes about our dedication to exceptional care.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
