import { motion } from "framer-motion";
import { Eye, Zap, Activity, Shield, Circle, Heart, Droplets, Sparkles } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Cataract Treatment",
    desc: "Advanced phacoemulsification with premium IOLs for crystal-clear vision restoration.",
    color: "#246B24",
    bg: "#E0EBE0",
  },
  {
    icon: Zap,
    title: "LASIK Surgery",
    desc: "Blade-free LASIK and SILK procedures for permanent spectacle removal.",
    color: "#246B24",
    bg: "#F8FAF8",
    featured: true,
  },
  {
    icon: Activity,
    title: "Retina Treatment",
    desc: "Expert management of diabetic retinopathy, macular degeneration, and retinal detachment.",
    color: "#246B24",
    bg: "#E0EBE0",
  },
  {
    icon: Shield,
    title: "Glaucoma Solutions",
    desc: "Comprehensive glaucoma care — from early detection to surgical intervention.",
    color: "#246B24",
    bg: "#F8FAF8",
  },
  {
    icon: Circle,
    title: "Cornea Treatment",
    desc: "Cornea transplants, keratoconus management, and corneal cross-linking therapy.",
    color: "#246B24",
    bg: "#E0EBE0",
  },
  {
    icon: Heart,
    title: "Pediatric Ophthalmology",
    desc: "Specialized eye care for children — lazy eye, squint, and vision correction.",
    color: "#246B24",
    bg: "#F8FAF8",
  },
  {
    icon: Droplets,
    title: "Dry Eye Treatment",
    desc: "Clinically proven therapies for chronic dry eye syndrome and ocular surface disorders.",
    color: "#246B24",
    bg: "#E0EBE0",
  },
  {
    icon: Sparkles,
    title: "Oculoplasty",
    desc: "Cosmetic and reconstructive surgeries for eyelids, orbit, and lacrimal system.",
    color: "#246B24",
    bg: "#F8FAF8",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" data-testid="services-section" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#246B24] text-sm font-bold uppercase tracking-widest mb-3">Expert Services</p>
          <h2 className="font-heading font-bold text-[#0A1F0A] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            ClearVision <span className="text-[#246B24]">Expertise</span>
          </h2>
          <p className="text-[#4B6B4B] text-base md:text-lg max-w-2xl mx-auto">
            Almost everything under eye care listed under our expertise — from routine check-ups to complex surgical procedures.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                data-testid={`service-card-${i}`}
                className={`service-card group rounded-2xl p-7 cursor-pointer border ${
                  svc.featured
                    ? "bg-[#246B24] border-[#246B24]"
                    : `bg-[${svc.bg}] border-[#E2E8F0]`
                }`}
                style={{ backgroundColor: svc.featured ? "#246B24" : svc.bg }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    svc.featured ? "bg-white/20" : "bg-[#246B24]"
                  }`}
                >
                  <Icon size={22} className={svc.featured ? "text-white" : "text-white"} />
                </div>
                <h3 className={`font-heading font-bold text-lg mb-3 ${svc.featured ? "text-white" : "text-[#0A1F0A]"}`}>
                  {svc.title}
                </h3>
                <p className={`text-sm leading-relaxed ${svc.featured ? "text-white/80" : "text-[#4B6B4B]"}`}>
                  {svc.desc}
                </p>
                <div
                  className={`mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
                    svc.featured ? "text-white/90" : "text-[#246B24]"
                  }`}
                >
                  Learn More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#appointment"
            data-testid="services-book-appointment"
            className="inline-flex items-center gap-2 bg-[#246B24] hover:bg-[#1B4D1B] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 text-sm hover:shadow-lg hover:shadow-green-200"
          >
            Book An Appointment Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
