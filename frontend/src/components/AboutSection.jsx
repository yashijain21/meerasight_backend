import { motion } from "framer-motion";
import { Calendar, Award, ShieldCheck } from "lucide-react";

const doctors = [
  {
    name: "Dr. Sonia Sharma",
    title: "Senior Cornea and Cataract Specialist",
    image: "/dr_sonia.avif",
    credentials: ["MBBS, MS (Ophthalmology)", "FSCEH (MICS)", "FSCEH (Cornea & Refractive Surgery)"],
    bio: "Dr. Sonia Sharma brings over a decade of comprehensive ophthalmology experience with advanced training in cataract, cornea, and refractive procedures. Her patient-first approach combines precision diagnostics with compassionate care for long-term visual outcomes.",
    expertise: [
      "Minimally invasive cataract surgery (MICS) with premium IOLs",
      "Refractive surgery (LASIK, PRK, ICL)",
      "Advanced corneal transplantation (PK, DALK, DSAEK, DMEK)",
      "Ocular surface reconstruction and limbal stem cell procedures",
    ],
  },
  {
    name: "Dr. Anshuman Gahlot",
    title: "Vitreoretinal and Retina Specialist",
    image: "/anshu.avif",
    credentials: ["MBBS, MS (Ophthalmology)", "FVRS"],
    bio: "Dr. Anshuman Gahlot is a vitreoretinal specialist with focused training in medical and surgical retina. He is experienced in modern micro-incision vitrectomy techniques and evidence-based retinal care for diabetic and complex posterior segment disorders.",
    expertise: [
      "Medical retina and diabetic retinopathy management",
      "Micro incision vitrectomy surgery (MIVS)",
      "Macular hole and epiretinal membrane surgery",
      "Retinal detachment and endophthalmitis management",
    ],
  },
];

function DoctorCard({ doctor, reverse = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="group rounded-[2rem] border border-white/70 bg-white/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(54,14,87,0.16)] overflow-hidden hover:shadow-[0_28px_75px_rgba(54,14,87,0.22)] transition-all duration-500"
    >
      <div className={`grid lg:grid-cols-5 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="lg:col-span-2 p-6 md:p-8 bg-gradient-to-br from-[#F8F2FF] via-white to-[#E8FAFF]">
          <div className="relative rounded-[48%_48%_40%_40%/26%_26%_54%_54%] overflow-hidden border border-[#8E44C1] bg-[#8E44C1] p-2.5 md:p-3">
            <div className="overflow-hidden rounded-[48%_48%_40%_40%/26%_26%_54%_54%]">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-[360px] md:h-[440px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1A0A2E]/70 to-transparent">
              <p className="text-white text-xs font-semibold tracking-wider uppercase">MeeraSight Consultant</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 p-7 md:p-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#00A8D7] mb-3">Consultant Specialist</p>
          <h3 className="font-heading text-3xl md:text-4xl font-black text-[#1A0A2E] mb-2">{doctor.name}</h3>
          <p className="text-[#601E8E] font-semibold text-lg mb-5">{doctor.title}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {doctor.credentials.map((item) => (
              <span key={item} className="inline-flex items-center rounded-full bg-[#F3EAFB] text-[#5F2D82] px-3.5 py-1.5 text-xs font-semibold">
                {item}
              </span>
            ))}
          </div>

          <p className="text-[#4E3C60] leading-relaxed mb-6">{doctor.bio}</p>

          <div>
            <p className="font-heading text-[#1A0A2E] font-bold mb-3">Core Expertise</p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {doctor.expertise.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#4E3C60]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00A8D7] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/#appointment"
              className="inline-flex items-center gap-2 rounded-full bg-[#601E8E] hover:bg-[#4C1774] text-white text-sm font-bold px-5 py-2.5 transition-colors"
            >
              <Calendar size={14} />
              Book Appointment
            </a>
            <a
              href="tel:+911147092310"
              className="inline-flex items-center gap-2 rounded-full border border-[#D8C1EA] text-[#5F2D82] hover:bg-[#F5EDFB] text-sm font-bold px-5 py-2.5 transition-colors"
            >
              Contact Clinic
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative overflow-hidden py-16 md:py-24 px-6"
      style={{ background: "radial-gradient(circle at 8% 12%, #EFE5FA 0%, #FAF8FF 36%, #F3FBFF 100%)" }}
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#EADCF7] rounded-full blur-3xl opacity-55 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#D8F3FB] rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto">
        

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-[0.28em] mb-3">Our Doctors</p>
          <h2 className="font-heading font-black text-[#1A0A2E] text-4xl md:text-5xl leading-tight mb-4">
            Meet The Specialists Behind MeeraSight
          </h2>
          <p className="max-w-3xl mx-auto text-[#5C4B6B] text-base md:text-lg leading-relaxed">
            Experienced ophthalmologists dedicated to ethical treatment, clear communication, and precision eye care
            across cornea, cataract, and retina services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="grid sm:grid-cols-3 gap-4 mb-8 md:mb-10"
        >
          {[
            { icon: Award, label: "Advanced Fellowship Trained" },
            { icon: ShieldCheck, label: "Evidence-Based Clinical Care" },
            { icon: Calendar, label: "Daily Consultations Available" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-2xl border border-white/80 bg-white/80 backdrop-blur px-4 py-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#F3EAFB] text-[#601E8E] flex items-center justify-center flex-shrink-0">
                <Icon size={17} />
              </span>
              <p className="text-[#4E3C60] text-sm font-semibold">{label}</p>
            </div>
          ))}
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor.name} doctor={doctor} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
