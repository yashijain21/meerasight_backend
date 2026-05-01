import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, Zap, Activity, Shield, Circle, Heart, Droplets, Glasses, Stethoscope, Camera } from "lucide-react";

const services = [
  { icon: Eye, title: "Retina Services", desc: "Expert diagnosis and treatment for retinal disorders including diabetic retinopathy, macular degeneration, and detachment.", slug: "retina" },
  { icon: Zap, title: "Refractive Services (LASIK)", desc: "Blade-free LASIK surgery for permanent spectacle removal. Modern precision technology for clear, spec-free vision.", slug: "refractive", featured: true },
  { icon: Heart, title: "Paediatric Ophthalmology", desc: "Specialized eye care for children — squint correction, lazy eye (amblyopia), and vision therapy.", slug: "pediatric" },
  { icon: Droplets, title: "Ocular Surface Diseases", desc: "Comprehensive management of dry eye syndrome, conjunctivitis, and other ocular surface conditions.", slug: "ocular-surface" },
  { icon: Circle, title: "Keratoconus", desc: "Advanced diagnosis and corneal cross-linking treatment for keratoconus and ectatic corneal diseases.", slug: "keratoconus" },
  { icon: Shield, title: "Glaucoma", desc: "Early detection and long-term management of glaucoma — the silent thief of sight — through medication and surgery.", slug: "glaucoma" },
  { icon: Activity, title: "Cornea Services", desc: "Corneal transplants, keratoplasty, and treatment of infectious and inflammatory corneal diseases.", slug: "cornea" },
  { icon: Camera, title: "Contact Lens Clinic", desc: "Expert fitting and prescription of therapeutic and cosmetic contact lenses including specialty lenses.", slug: "contact-lens" },
  { icon: Stethoscope, title: "Comprehensive Eye Exam", desc: "Complete evaluation of eye health including refraction, IOP, fundus examination, and field testing.", slug: "comprehensive-exam" },
  { icon: Glasses, title: "Cataract Surgery", desc: "Phacoemulsification with premium IOL implantation for crystal-clear vision restoration with minimal recovery.", slug: "cataract" },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section id="services" data-testid="services-section" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-3">Expert Services</p>
          <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            MeeraSight <span className="text-[#601E8E]">Expertise</span>
          </h2>
          <p className="text-[#5C4B6B] text-base md:text-lg max-w-2xl mx-auto">
            Almost everything under eye care — from routine check-ups to complex surgical procedures by Dr. Sonia Sharma.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                data-testid={`service-card-${svc.slug}`}
                onClick={() => navigate(`/services/${svc.slug}`)}
                className="service-card group rounded-2xl p-6 cursor-pointer border transition-all duration-300"
                style={{
                  backgroundColor: svc.featured ? "#601E8E" : "#F9F5FF",
                  borderColor: svc.featured ? "#601E8E" : "#EDE6F5",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: svc.featured ? "rgba(255,255,255,0.2)" : "#601E8E" }}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className={`font-heading font-bold text-base mb-2 ${svc.featured ? "text-white" : "text-[#1A0A2E]"}`}>
                  {svc.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${svc.featured ? "text-white/80" : "text-[#5C4B6B]"}`}>
                  {svc.desc}
                </p>
                <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide ${svc.featured ? "text-[#00A8D7]" : "text-[#601E8E]"}`}>
                  Learn More
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#appointment"
            data-testid="services-book-appointment"
            className="inline-flex items-center gap-2 bg-[#601E8E] hover:bg-[#4A1570] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 text-sm hover:shadow-lg hover:shadow-purple-200"
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
