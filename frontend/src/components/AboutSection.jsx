import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Years of\nExperience" },
  { value: 10, suffix: "+", label: "Specialised\nTreatments" },
  { value: 5000, suffix: "+", label: "Happy\nPatients" },
  { value: 98, suffix: "%", label: "Success\nRate" },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);
  return <>{count}{suffix}</>;
}

export default function AboutSection() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="about" data-testid="about-section" className="bg-[#FAF8FF] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/5] max-h-[580px]">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwzfHxoYXBweSUyMHBhdGllbnQlMjBoZWFsdGhjYXJlJTIwY2xpbmljfGVufDB8fHx8MTc3NzU2MzYwM3ww&ixlib=rb-4.1.0&q=85"
                  alt="Dr. Sonia Sharma with patient"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 right-6 bg-white rounded-2xl shadow-xl p-5 border border-purple-100">
                <p className="font-heading font-black text-[#601E8E] text-3xl leading-none">15+</p>
                <p className="text-[#5C4B6B] text-xs font-semibold mt-1">Years of<br />Excellence</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-3">Our Story & Motivation</p>
              <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                Backed by strong motive,{" "}
                <span className="text-[#601E8E]">we lead Ophthalmology.</span>
              </h2>
              <p className="text-[#5C4B6B] text-base leading-relaxed mb-5">
                MeeraSight is led by Dr. Sonia Sharma, an experienced ophthalmologist based in Janak Puri, New Delhi. The clinic is renowned for its expertise in comprehensive eye care, offering advanced treatments for a wide range of eye conditions.
              </p>
              <p className="text-[#5C4B6B] text-base leading-relaxed mb-8">
                With state-of-the-art diagnostic technology and a compassionate, patient-first approach, MeeraSight ensures precise diagnoses and effective interventions — from routine eye exams to complex surgical procedures.
              </p>

              {/* Doctor profile */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-purple-100 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#601E8E] to-[#00A8D7] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  SS
                </div>
                <div>
                  <p className="font-heading font-bold text-[#1A0A2E] text-base">Dr. Sonia Sharma</p>
                  <p className="text-[#5C4B6B] text-sm">Senior Ophthalmologist & Eye Surgeon</p>
                  <p className="text-[#00A8D7] text-xs font-semibold mt-0.5">MeeraSight Eye Clinic, New Delhi</p>
                </div>
              </div>

              <a
                href="#services"
                data-testid="about-know-more"
                className="inline-flex items-center gap-2 bg-[#601E8E] hover:bg-[#4A1570] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Explore Our Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section ref={statsRef} data-testid="stats-section" className="bg-gradient-to-r from-[#601E8E] to-[#00A8D7] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`stat-${i}`}
            >
              <p className="font-heading font-black text-white text-4xl md:text-5xl mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} active={statsVisible} />
              </p>
              <p className="text-white/75 text-sm font-medium whitespace-pre-line">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
