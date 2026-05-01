import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Mr. Pradeep Mathur", role: "Patient", review: "I got my Eye-Irritation treatment done by Dr Sonia Sharma. The diagnosis done was perfect & treatment has worked wonders. I would like to recommend my friends and relatives to refer her for any eye treatment.", rating: 5, initials: "PM" },
  { name: "Mr. Trinabh Singh", role: "Patient", review: "Underwent treatment of Ocular hypertension. Dr Sonia Sharma's clinic is very well equipped, very clean and she cleared all my queries patiently.", rating: 5, initials: "TS" },
  { name: "Ms. Vanshika Yadav", role: "Student", review: "I was facing problems in vision in the classroom. Dr. Sonia Sharma treated me successfully. She is very soft spoken and treated me politely with great care.", rating: 5, initials: "VY" },
  { name: "Ms. Vaibhavi Sathi", role: "Patient", review: "I got my treatment of Acute dryness & itching in my eyes by Dr Sonia Sharma. I found her to be extremely patient & humble which helped me massively in the treatment process.", rating: 5, initials: "VS" },
  { name: "Mr. Jitendra Malik", role: "Patient", review: "I had a commendable experience. It was nice meeting Dr Sonia Sharma. I am highly satisfied with the treatment offered. Highly recommend the clinic.", rating: 5, initials: "JM" },
  { name: "Mr. Sunil Bhalla", role: "Patient", review: "I got my both eyes operated for Cataract and my daughter's cosmetic surgery from Dr. Sonia Sharma. She answered all my queries and eased my anxiety during surgery. Very satisfied!", rating: 5, initials: "SB" },
  { name: "Mr. Raj Kumar", role: "Patient", review: "I got my treatment done by Dr Sonia Sharma. She gave me proper treatment & guidance to resolve my problems. She is highly soft-spoken & gives very good guidance.", rating: 5, initials: "RK" },
  { name: "Mrs. Nirmal", role: "Patient", review: "I got my Glaucoma treatment done by Dr Sonia Sharma and am highly satisfied from her treatment methodologies. The clinic is clean, modern and well-equipped.", rating: 5, initials: "NR" },
];

function TestimonialCard({ t }) {
  return (
    <div
      data-testid={`testimonial-card-${t.name.replace(/\s+/g, "-").toLowerCase()}`}
      className="testimonial-card bg-white rounded-2xl p-7 min-w-[320px] max-w-[360px] border border-purple-100 mx-3 flex-shrink-0"
    >
      <Quote size={28} className="text-[#601E8E] mb-4 opacity-50" />
      <p className="text-[#1A0A2E] text-sm leading-relaxed mb-6 font-medium">"{t.review}"</p>
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-[#FFB800] fill-[#FFB800]" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br from-[#601E8E] to-[#00A8D7]">
          {t.initials}
        </div>
        <div>
          <p className="font-heading font-bold text-[#1A0A2E] text-sm">{t.name}</p>
          <p className="text-[#5C4B6B] text-xs">{t.role} — MeeraSight</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" data-testid="testimonials-section" className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-3">Happy & Content</p>
          <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            What Our <span className="text-[#601E8E]">Patients Say</span>
          </h2>
          <p className="text-[#5C4B6B] text-base md:text-lg max-w-2xl mx-auto">
            Real stories from real patients of Dr. Sonia Sharma at MeeraSight Eye Clinic, New Delhi.
          </p>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
