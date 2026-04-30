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
            <p className="text-[#246B24] text-sm font-bold uppercase tracking-widest mb-4">
              Our Vision, Mission & Quality Policy
            </p>
            <h2 className="font-heading font-bold text-[#0A1F0A] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              Enhancing the quality of life<br />
              by{" "}
              <span className="text-[#246B24]">reviving</span>{" "}
              the joys of vision.
            </h2>
            <p className="text-[#4B6B4B] text-base md:text-lg leading-relaxed max-w-xl">
              At ClearVision Eye Hospitals, we are committed to delivering world-class eye care using advanced technology and compassionate expertise — because every patient deserves to see the world clearly.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#about"
                data-testid="vision-learn-more"
                className="bg-[#246B24] hover:bg-[#1B4D1B] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Learn About Us
              </a>
              <a
                href="#appointment"
                data-testid="vision-book-appt"
                className="border-2 border-[#246B24] text-[#246B24] hover:bg-[#E0EBE0] font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#E0EBE0]">
                <div className="w-12 h-12 bg-[#246B24] rounded-xl flex items-center justify-center mb-4">
                  <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-[#0A1F0A] text-lg mb-2">Quality Care</h4>
                <p className="text-[#4B6B4B] text-sm leading-relaxed">Internationally accredited treatment standards for every patient.</p>
              </div>
              <div className="bg-[#246B24] rounded-2xl p-6 mt-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-white text-lg mb-2">Latest Technology</h4>
                <p className="text-white/80 text-sm leading-relaxed">State-of-the-art equipment for precise diagnosis and treatment.</p>
              </div>
              <div className="bg-[#FFB800]/10 rounded-2xl p-6 -mt-2">
                <div className="w-12 h-12 bg-[#FFB800] rounded-xl flex items-center justify-center mb-4">
                  <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-[#0A1F0A] text-lg mb-2">Expert Doctors</h4>
                <p className="text-[#4B6B4B] text-sm leading-relaxed">50+ highly qualified ophthalmologists across all specialties.</p>
              </div>
              <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#E0EBE0]">
                <div className="w-12 h-12 bg-[#0A1F0A] rounded-xl flex items-center justify-center mb-4">
                  <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-[#0A1F0A] text-lg mb-2">Patient First</h4>
                <p className="text-[#4B6B4B] text-sm leading-relaxed">Compassionate care centered around each patient's unique needs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
