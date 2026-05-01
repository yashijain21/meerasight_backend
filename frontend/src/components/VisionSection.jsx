import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <section data-testid="vision-section" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-4">
              Our Vision, Mission & Quality Policy
            </p>
            <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Enhancing the quality of life<br />
              by{" "}
              <span className="text-[#601E8E]">reviving</span>{" "}
              the joys of vision.
            </h2>
            <p className="text-[#5C4B6B] text-base md:text-lg leading-relaxed max-w-xl">
              At MeeraSight, Dr. Sonia Sharma is committed to delivering world-class eye care using advanced technology and compassionate expertise — because every patient deserves to see the world clearly.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a href="#about" data-testid="vision-learn-more" className="bg-[#601E8E] hover:bg-[#4A1570] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-sm">
                Learn About Us
              </a>
              <a href="#appointment" data-testid="vision-book-appt" className="border-2 border-[#601E8E] text-[#601E8E] hover:bg-purple-50 font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-sm">
                Book Appointment
              </a>
            </div>
          </motion.div>

          {/* Right — feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Quality Care", desc: "Internationally accredited treatment standards.", bg: "#F9F5FF", iconBg: "#601E8E" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Latest Technology", desc: "State-of-the-art diagnostic & surgical equipment.", bg: "#601E8E", iconBg: "rgba(255,255,255,0.2)", textWhite: true, mt: true },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Expert Surgeon", desc: "Dr. Sonia Sharma — specialist in all eye conditions.", bg: "#E0F5FB", iconBg: "#00A8D7", negMt: true },
                { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "Patient First", desc: "Compassionate care centred on your unique needs.", bg: "#F9F5FF", iconBg: "#1A0A2E" },
              ].map((card, i) => (
                <div key={i} className="rounded-2xl p-6 border border-transparent" style={{ backgroundColor: card.bg, marginTop: card.mt ? "24px" : card.negMt ? "-8px" : "0" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: card.iconBg }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                    </svg>
                  </div>
                  <h4 className={`font-heading font-bold text-lg mb-2 ${card.textWhite ? "text-white" : "text-[#1A0A2E]"}`}>{card.title}</h4>
                  <p className={`text-sm leading-relaxed ${card.textWhite ? "text-white/80" : "text-[#5C4B6B]"}`}>{card.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
