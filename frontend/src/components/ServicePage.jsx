import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const serviceData = {
  retina: {
    title: "Retina Services",
    tagline: "Advanced diagnosis and treatment for all retinal disorders",
    heroImage: "https://ophthalmicconsultants.com/wp-content/uploads/2023/05/retina-3-scaled.jpg",
    overview: "The retina is a thin layer of tissue at the back of the eye responsible for converting light into visual signals. Retinal diseases can affect your vision significantly and require prompt specialist care. At MeeraSight, Dr. Sonia Sharma provides comprehensive retina services using state-of-the-art diagnostic and treatment equipment.",
    conditions: [
      "Diabetic Retinopathy — damage to retinal blood vessels caused by diabetes",
      "Age-related Macular Degeneration (AMD) — central vision loss in older adults",
      "Retinal Detachment — separation of the retina from the underlying tissue",
      "Macular Hole — a small break in the macula",
      "Vitreous Haemorrhage — bleeding inside the eye",
      "Retinal Vein Occlusion — blockage in the retinal vein",
    ],
    treatments: [
      { name: "Laser Photocoagulation", desc: "Laser treatment to seal leaking blood vessels and prevent further vision loss." },
      { name: "Anti-VEGF Injections", desc: "Intravitreal injections to reduce abnormal blood vessel growth in the retina." },
      { name: "Vitreoretinal Surgery", desc: "Surgical procedures to treat retinal detachment, macular holes, and more." },
      { name: "Fundus Fluorescein Angiography", desc: "Detailed imaging to diagnose retinal vascular conditions." },
    ],
    faqs: [
      { q: "How do I know if I have a retinal problem?", a: "Symptoms include floaters, flashes of light, blurry vision, or sudden vision loss. If you notice any of these, seek immediate attention." },
      { q: "Is retinal surgery painful?", a: "Most retinal procedures are performed under local anaesthesia and are generally well-tolerated with minimal discomfort." },
      { q: "Can retinal damage be reversed?", a: "Some conditions can be treated to prevent further deterioration. Early diagnosis and treatment offer the best outcomes." },
    ],
  },
  refractive: {
    title: "Refractive Services (LASIK)",
    tagline: "Permanent vision correction — say goodbye to glasses forever",
    heroImage: "https://www.laxmieye.org/blog/wp-content/uploads/2023/10/Lasik-Surgery.jpg",
    overview: "Refractive errors including myopia (short-sightedness), hyperopia (long-sightedness), and astigmatism are among the most common eye conditions. Modern refractive surgery offers permanent correction, freeing you from the dependence on glasses or contact lenses. MeeraSight offers the latest blade-free LASIK and other refractive procedures.",
    conditions: [
      "Myopia (Short-sightedness) — difficulty seeing distant objects",
      "Hyperopia (Long-sightedness) — difficulty seeing close objects",
      "Astigmatism — blurred vision due to irregular corneal shape",
      "Presbyopia — age-related loss of near vision",
    ],
    treatments: [
      { name: "LASIK (Laser-Assisted In Situ Keratomileusis)", desc: "Bladeless laser reshaping of the cornea for permanent vision correction. Most popular procedure globally." },
      { name: "PRK (Photorefractive Keratectomy)", desc: "Surface-based laser treatment, ideal for thin corneas." },
      { name: "SMILE (Small Incision Lenticule Extraction)", desc: "Minimally invasive, flapless laser vision correction." },
      { name: "ICL (Implantable Collamer Lens)", desc: "Lens implant for patients not suitable for laser surgery." },
    ],
    faqs: [
      { q: "Am I eligible for LASIK?", a: "Candidates must be 18+ years, have stable prescription for at least 1 year, adequate corneal thickness, and no active eye disease. A detailed pre-LASIK evaluation at MeeraSight will determine your eligibility." },
      { q: "Is LASIK permanent?", a: "LASIK provides permanent correction of your current refractive error. Natural age-related changes may occur over time." },
      { q: "How long does LASIK take?", a: "The procedure takes about 15 minutes for both eyes combined. Most patients see clearly within 24 hours." },
    ],
  },
  pediatric: {
    title: "Paediatric Ophthalmology",
    tagline: "Specialized eye care for children — protecting their future vision",
    heroImage: "https://www.eyecliniclondon.com/blog/wp-content/uploads/2025/11/Children-Consultation-1.webp",
    overview: "Children's eyes are still developing and require specialized care. Early detection and treatment of eye problems in childhood is critical to ensure proper visual development. Dr. Sonia Sharma at MeeraSight is experienced in managing all paediatric eye conditions with a gentle, child-friendly approach.",
    conditions: [
      "Amblyopia (Lazy Eye) — reduced vision in one eye due to abnormal development",
      "Strabismus (Squint) — misalignment of the eyes",
      "Refractive Errors — myopia, hyperopia, astigmatism in children",
      "Congenital Cataract — clouding of the lens present at birth",
      "Blocked Tear Duct — excessive tearing in infants",
      "Ptosis (Drooping Eyelid) — can affect visual development",
    ],
    treatments: [
      { name: "Orthoptic Therapy", desc: "Exercises and patching to strengthen the weaker eye in amblyopia." },
      { name: "Glasses / Contact Lenses", desc: "Prescription lenses to correct refractive errors in children." },
      { name: "Strabismus Surgery", desc: "Surgical correction of eye misalignment." },
      { name: "Vision Therapy", desc: "Customized exercises to improve binocular vision and eye coordination." },
    ],
    faqs: [
      { q: "When should I first take my child for an eye exam?", a: "A comprehensive eye exam is recommended at 6 months, 3 years, and before starting school. Early detection is key." },
      { q: "How do I know if my child has a vision problem?", a: "Watch for squinting, sitting too close to the TV, rubbing eyes frequently, or complaints of headaches." },
      { q: "Can lazy eye be treated in older children?", a: "Treatment is most effective in younger children but can be beneficial in older children and teenagers too." },
    ],
  },
  "ocular-surface": {
    title: "Ocular Surface Diseases",
    tagline: "Comprehensive management of dry eye and surface disorders",
    heroImage: "https://cdn-bpeep.nitrocdn.com/vKDgvNsnOrwkqofIfANgdsTsirhKXQgp/assets/images/optimized/rev-aeaf0cb/dryeyecenterofmd.com/wp-content/uploads/2023/05/OCULAR-SURFACE-DISEASE-OSD-untreated.jpg",
    overview: "The ocular surface includes the cornea, conjunctiva, and tear film. Disorders affecting these structures can cause significant discomfort and impact vision quality. MeeraSight provides expert diagnosis and management of all ocular surface conditions.",
    conditions: [
      "Dry Eye Syndrome (DES) — insufficient or poor-quality tears",
      "Conjunctivitis — bacterial, viral, or allergic inflammation",
      "Blepharitis — inflammation of the eyelid margins",
      "Pterygium — growth of tissue on the white of the eye",
      "Pinguecula — yellowish deposit on the conjunctiva",
      "Stevens-Johnson Syndrome — severe inflammatory reaction",
    ],
    treatments: [
      { name: "Tear Substitutes & Lubricants", desc: "Prescription eye drops to supplement natural tear production." },
      { name: "Punctal Plugs", desc: "Tiny devices to block tear drainage and retain moisture." },
      { name: "IPL Therapy (Intense Pulsed Light)", desc: "Treatment for meibomian gland dysfunction causing evaporative dry eye." },
      { name: "Surgical Intervention", desc: "Pterygium excision and reconstruction of the ocular surface when needed." },
    ],
    faqs: [
      { q: "What causes dry eye?", a: "Digital screen use, environmental factors, aging, certain medications, and systemic diseases can all cause dry eye syndrome." },
      { q: "Can dry eye be cured?", a: "While dry eye is often a chronic condition, it can be effectively managed to provide significant relief and protect your vision." },
    ],
  },
  keratoconus: {
    title: "Keratoconus Treatment",
    tagline: "Advanced diagnosis and management for corneal ectasia",
    heroImage: "https://vijayanethralaya.com/wp-content/uploads/2024/05/maxresdefault-1.jpg",
    overview: "Keratoconus is a progressive eye condition where the cornea thins and gradually bulges outward into a cone-like shape. This distortion of the cornea causes blurred vision, light sensitivity, and glare. MeeraSight offers advanced topography-based diagnosis and the latest treatment options including corneal cross-linking.",
    conditions: [
      "Progressive Keratoconus — gradual corneal thinning and bulging",
      "Pellucid Marginal Degeneration — related ectatic condition",
      "Post-LASIK Ectasia — corneal weakening after laser surgery",
    ],
    treatments: [
      { name: "Corneal Cross-Linking (CXL)", desc: "UV light + riboflavin treatment to halt the progression of keratoconus by strengthening corneal fibres." },
      { name: "Scleral Contact Lenses", desc: "Large-diameter lenses that vault over the irregular cornea for clear, comfortable vision." },
      { name: "Corneal Rings (ICRS)", desc: "Intrastromal ring segments to flatten the corneal cone." },
      { name: "Deep Anterior Lamellar Keratoplasty (DALK)", desc: "Corneal transplant for advanced keratoconus." },
    ],
    faqs: [
      { q: "Is keratoconus progressive?", a: "Yes, keratoconus typically progresses, especially in younger patients. Early treatment with cross-linking can halt progression." },
      { q: "Can I have LASIK if I have keratoconus?", a: "No. LASIK is contraindicated in keratoconus as it thins the cornea further. Contact lenses or other procedures are recommended." },
    ],
  },
  glaucoma: {
    title: "Glaucoma Services",
    tagline: "Early detection and management of the silent thief of sight",
    heroImage: "https://www.thindeyehospital.org/wp-content/uploads/2024/01/gloucoma.jpg",
    overview: "Glaucoma is a group of eye conditions that damage the optic nerve, usually associated with elevated eye pressure (IOP). It's often asymptomatic in early stages, leading to irreversible vision loss if untreated. At MeeraSight, we emphasize early detection through regular screenings and offer comprehensive management.",
    conditions: [
      "Primary Open-Angle Glaucoma — most common, slow progressive damage",
      "Angle-Closure Glaucoma — sudden or gradual closure of drainage angle",
      "Normal-Tension Glaucoma — optic nerve damage despite normal IOP",
      "Secondary Glaucoma — caused by another eye condition",
      "Congenital Glaucoma — present from birth",
    ],
    treatments: [
      { name: "Eye Drops", desc: "Medications to lower intraocular pressure — first line of treatment." },
      { name: "Laser Trabeculoplasty (SLT/ALT)", desc: "Laser treatment to improve drainage and lower eye pressure." },
      { name: "Trabeculectomy", desc: "Surgical creation of a new drainage channel to reduce eye pressure." },
      { name: "Glaucoma Drainage Devices", desc: "Implants to help drain fluid and reduce pressure in advanced cases." },
    ],
    faqs: [
      { q: "Can glaucoma be cured?", a: "Vision lost to glaucoma cannot be recovered, but treatment can halt or slow further damage significantly." },
      { q: "How often should I be screened for glaucoma?", a: "Adults over 40, especially with a family history, should have annual eye pressure and optic nerve checks." },
    ],
  },
  cornea: {
    title: "Cornea Services",
    tagline: "Specialized care for corneal diseases and transplantation",
    heroImage: "https://morriseyegroup.com/wp-content/uploads/2024/06/image-43.png",
    overview: "The cornea is the clear, dome-shaped surface at the front of the eye. Corneal diseases can significantly impair vision and quality of life. MeeraSight offers expert diagnosis and treatment of all corneal conditions, including corneal transplantation procedures.",
    conditions: [
      "Corneal Ulcer — infection causing corneal tissue breakdown",
      "Bullous Keratopathy — corneal swelling causing blistering",
      "Fuchs' Endothelial Dystrophy — hereditary corneal degeneration",
      "Corneal Scarring — from infection, trauma, or previous surgery",
    ],
    treatments: [
      { name: "Penetrating Keratoplasty (PKP)", desc: "Full-thickness corneal transplant for severe corneal disease." },
      { name: "DSEK / DMEK", desc: "Selective replacement of only the diseased back layers of the cornea." },
      { name: "Amniotic Membrane Transplantation", desc: "For severe ocular surface disease and non-healing corneal ulcers." },
      { name: "Therapeutic Contact Lenses", desc: "Bandage lenses to protect and heal the corneal surface." },
    ],
    faqs: [
      { q: "How long does corneal transplant recovery take?", a: "Initial healing takes weeks, but full visual recovery after corneal transplant can take 1 year or more." },
      { q: "Can a corneal transplant be rejected?", a: "Rejection is possible and is managed with steroid eye drops. Regular follow-up is essential." },
    ],
  },
  "contact-lens": {
    title: "Contact Lens Clinic",
    tagline: "Expert fitting and prescription of therapeutic & cosmetic lenses",
    heroImage: "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/10737-contacts",
    overview: "The Contact Lens Clinic at MeeraSight provides expert evaluation, fitting, and prescription of contact lenses for a wide range of vision needs. From standard soft lenses to complex rigid gas-permeable and scleral lenses, our specialists ensure optimal fit and vision.",
    conditions: [
      "Myopia — soft contact lenses for distance correction",
      "Keratoconus — rigid, hybrid, or scleral lenses",
      "Post-surgical corneal irregularities",
      "Dry Eye with contact lens intolerance",
      "Cosmetic contact lens queries",
    ],
    treatments: [
      { name: "Soft Contact Lenses", desc: "Daily, bi-weekly, or monthly disposable lenses for simple refractive errors." },
      { name: "Rigid Gas-Permeable (RGP) Lenses", desc: "Durable, oxygen-permeable lenses for irregular corneas." },
      { name: "Scleral Lenses", desc: "Large-diameter lenses for keratoconus, dry eye, and post-surgical cases." },
      { name: "Orthokeratology (Ortho-K)", desc: "Overnight lenses to reshape the cornea and provide clear daytime vision without lenses." },
    ],
    faqs: [
      { q: "Are contact lenses safe for daily use?", a: "When properly fitted, cleaned, and worn as prescribed, contact lenses are very safe. Follow your eye doctor's instructions carefully." },
      { q: "Can I wear contact lenses if I have dry eye?", a: "Certain lens types and materials are specifically designed for dry eye patients. A specialist evaluation will determine the best option for you." },
    ],
  },
  "comprehensive-exam": {
    title: "Comprehensive Eye Examination",
    tagline: "Complete evaluation of your eye health from top to bottom",
    heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8i0p0FVAQwIYNpldE_Z0Zyb9z-od8XvAbjA&s",
    overview: "A comprehensive eye examination goes beyond simply checking your glasses prescription. It includes a thorough assessment of the health of your entire visual system — detecting conditions that may not yet cause symptoms. Dr. Sonia Sharma recommends regular comprehensive eye exams for all age groups.",
    conditions: [
      "Vision problems — myopia, hyperopia, astigmatism, presbyopia",
      "Eye diseases — glaucoma, cataract, macular degeneration",
      "Systemic diseases affecting the eye — diabetes, hypertension",
      "Children's vision screening",
    ],
    treatments: [
      { name: "Refraction & Visual Acuity Testing", desc: "Determines your accurate glasses or contact lens prescription." },
      { name: "Slit Lamp Examination", desc: "Detailed microscopic evaluation of the eye's anterior segment." },
      { name: "Fundus Examination", desc: "Examination of the retina, optic nerve, and blood vessels." },
      { name: "Intraocular Pressure (IOP) Measurement", desc: "Screening for glaucoma using tonometry." },
      { name: "Visual Field Testing", desc: "Mapping of peripheral vision for glaucoma and neurological conditions." },
    ],
    faqs: [
      { q: "How often should I have a comprehensive eye exam?", a: "Adults under 40 should have exams every 2 years. Those over 40, or with risk factors, should be examined annually." },
      { q: "How long does a comprehensive eye exam take?", a: "A thorough examination typically takes 45–60 minutes." },
    ],
  },
  cataract: {
    title: "Cataract Surgery",
    tagline: "Clear vision restored with advanced phacoemulsification surgery",
    heroImage: "https://www.ojaseyehospital.com/blog/wp-content/uploads/2025/10/8-Is-Cataract-Surgery-Painful.jpg",
    overview: "A cataract is a clouding of the natural lens inside the eye that leads to decreased vision. Cataract surgery is one of the most commonly performed and safest surgical procedures in the world. At MeeraSight, Dr. Sonia Sharma performs small-incision phacoemulsification surgery with premium intraocular lens (IOL) implants for optimal outcomes.",
    conditions: [
      "Age-related Cataract — most common, develops gradually with age",
      "Congenital Cataract — present at birth or develops early in childhood",
      "Traumatic Cataract — following an eye injury",
      "Secondary Cataract — resulting from another eye condition or medications",
    ],
    treatments: [
      { name: "Phacoemulsification (Phaco)", desc: "Ultrasound technology to break up and remove the clouded lens through a micro-incision, then an IOL is implanted." },
      { name: "Monofocal IOL", desc: "Standard lens implant correcting vision at one distance." },
      { name: "Multifocal / Trifocal IOL", desc: "Premium lens implants providing clear vision at multiple distances, reducing spectacle dependence." },
      { name: "Toric IOL", desc: "Specialized lens to correct astigmatism along with cataract removal." },
    ],
    faqs: [
      { q: "When is the right time for cataract surgery?", a: "When cataracts significantly impact your daily activities — reading, driving, or recognizing faces — it's time to consider surgery." },
      { q: "How long does cataract surgery take?", a: "The procedure typically takes 15–20 minutes per eye and is performed under local anaesthesia as a day procedure." },
      { q: "What is the recovery time?", a: "Most patients notice improved vision within 24–48 hours. Full recovery takes a few weeks with simple precautions." },
    ],
  },
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-purple-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-purple-50 transition-colors"
        data-testid={`faq-${faq.q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="font-heading font-semibold text-[#1A0A2E] text-sm pr-4">{faq.q}</span>
        {open ? <ChevronUp size={18} className="text-[#601E8E] flex-shrink-0" /> : <ChevronDown size={18} className="text-[#601E8E] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-[#5C4B6B] text-sm leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = serviceData[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24 px-6">
          <h1 className="font-heading font-bold text-3xl text-[#1A0A2E] mb-4">Service Not Found</h1>
          <button onClick={() => navigate("/")} className="bg-[#601E8E] text-white px-6 py-3 rounded-full font-bold">
            Back to Home
          </button>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8FF]">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: 400 }}>
        <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(96,30,142,0.88) 0%, rgba(0,168,215,0.55) 100%)" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
            <button
              onClick={() => navigate("/")}
              data-testid="service-back-btn"
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-semibold"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <span className="inline-block bg-[#00A8D7]/80 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              MeeraSight Services
            </span>
            <h1 className="font-heading font-black text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-3">
              {data.title}
            </h1>
            <p className="text-white/85 text-lg max-w-xl">{data.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-heading font-bold text-[#1A0A2E] text-2xl md:text-3xl mb-4">Overview</h2>
              <p className="text-[#5C4B6B] text-base leading-relaxed">{data.overview}</p>
            </motion.div>

            {/* Conditions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="font-heading font-bold text-[#1A0A2E] text-2xl md:text-3xl mb-5">
                Conditions We Treat
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.conditions.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-purple-100">
                    <CheckCircle size={18} className="text-[#601E8E] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A0A2E] text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Treatments */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="font-heading font-bold text-[#1A0A2E] text-2xl md:text-3xl mb-5">
                Treatment Options
              </h2>
              <div className="space-y-4">
                {data.treatments.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-purple-100 hover:border-[#601E8E]/30 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#601E8E] to-[#00A8D7] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-[#1A0A2E] text-base mb-1">{t.name}</h4>
                        <p className="text-[#5C4B6B] text-sm leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h2 className="font-heading font-bold text-[#1A0A2E] text-2xl md:text-3xl mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {data.faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#601E8E] to-[#00A8D7] rounded-3xl p-7 text-white sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-3">Book a Consultation</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                Consult with Dr. Sonia Sharma at MeeraSight, Janak Puri, New Delhi for expert diagnosis and personalised treatment.
              </p>
              <a
                href="/#appointment"
                data-testid="sidebar-book-appointment"
                className="block w-full text-center bg-white text-[#601E8E] font-bold py-3.5 rounded-full hover:bg-white/90 transition-colors text-sm mb-3"
              >
                Book Appointment
              </a>
              <a
                href={`https://wa.me/917428728458?text=${encodeURIComponent(`Hello! I'd like to book an appointment for ${data.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="sidebar-whatsapp"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 rounded-full transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>

              {/* Contact */}
              <div className="mt-5 pt-5 border-t border-white/20 space-y-2">
                <a href="tel:+911147092310" className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
                  <Phone size={14} /> +91-11-47092310
                </a>
                <p className="text-white/60 text-xs">C5C-14A, Janak Puri, New Delhi</p>
              </div>
            </div>

            {/* Other Services */}
            <div className="bg-white rounded-2xl p-6 border border-purple-100">
              <h4 className="font-heading font-bold text-[#1A0A2E] text-base mb-4">Other Services</h4>
              <div className="space-y-2">
                {Object.entries(serviceData)
                  .filter(([key]) => key !== slug)
                  .slice(0, 6)
                  .map(([key, svc]) => (
                    <button
                      key={key}
                      onClick={() => { navigate(`/services/${key}`); window.scrollTo(0, 0); }}
                      className="block w-full text-left text-sm text-[#5C4B6B] hover:text-[#601E8E] py-2 border-b border-purple-50 last:border-0 transition-colors"
                    >
                      {svc.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}



