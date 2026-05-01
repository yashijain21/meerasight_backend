import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  "Retina Services",
  "Refractive Services (LASIK)",
  "Paediatric Ophthalmology",
  "Ocular Surface Diseases",
  "Keratoconus",
  "Glaucoma",
  "Cornea Services",
  "Contact Lens Clinic",
  "Comprehensive Eye Examination",
  "Cataract Surgery",
];

export default function AppointmentSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", preferred_date: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) { setError("Please fill in all required fields."); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/appointments`, form);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: "", preferred_date: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment" data-testid="appointment-section" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-3">Book Appointment</p>
            <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              We are on a mission to<br />
              <span className="text-[#601E8E]">redefine Ophthalmology</span>
            </h2>
            <p className="text-[#5C4B6B] text-base leading-relaxed mb-10">
              Schedule your consultation with Dr. Sonia Sharma at MeeraSight, Janak Puri, New Delhi. Early detection saves vision.
            </p>

            {/* Opening hours card */}
            <div className="bg-gradient-to-br from-[#601E8E] to-[#00A8D7] rounded-2xl p-6 mb-6 text-white">
              <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Clock size={18} /> Opening Hours
              </h4>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex justify-between"><span className="font-semibold">Weekdays (Mon/Tue/Wed/Fri/Sat)</span><span>9:00am–1:30pm, 6:00–8:00pm</span></div>
                <div className="flex justify-between"><span className="font-semibold">Sunday</span><span>9:00am–12:00noon</span></div>
                <div className="flex justify-between"><span className="font-semibold text-red-200">Thursday</span><span className="text-red-200">CLOSED</span></div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {[
                { icon: Phone, label: "Call Us", value: "+91-11-47092310", href: "tel:+911147092310" },
                { icon: Mail, label: "Email Us", value: "meerasight@gmail.com", href: "mailto:meerasight@gmail.com" },
                { icon: MapPin, label: "Visit Us", value: "C5C-14A, Janak Puri, New Delhi", href: "https://www.google.com/maps/dir//C5C-14A,+Janakpuri,+Delhi,+110058" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    data-testid={`contact-info-${i}`}
                    className="flex items-center gap-4 p-4 bg-[#FAF8FF] rounded-2xl border border-purple-100 hover:border-[#601E8E]/30 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 bg-[#601E8E] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A1570] transition-colors">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide">{item.label}</p>
                      <p className="text-[#1A0A2E] font-semibold text-sm">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-[#FAF8FF] rounded-3xl shadow-[0_8px_32px_rgba(96,30,142,0.08)] p-8 md:p-10 border border-purple-100">
              <h3 className="font-heading font-bold text-[#1A0A2E] text-2xl mb-7">Book Your Consultation</h3>

              {success ? (
                <div data-testid="appointment-success" className="text-center py-10">
                  <CheckCircle size={56} className="text-[#601E8E] mx-auto mb-4" />
                  <h4 className="font-heading font-bold text-[#1A0A2E] text-xl mb-2">Appointment Requested!</h4>
                  <p className="text-[#5C4B6B] text-sm mb-6">Our team will contact you within 24 hours to confirm your appointment.</p>
                  <button data-testid="book-another" onClick={() => setSuccess(false)}
                    className="bg-[#601E8E] hover:bg-[#4A1570] text-white font-bold px-6 py-3 rounded-full text-sm transition-all">
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="appointment-form" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" data-testid="form-name" value={form.name} onChange={handleChange} placeholder="Your name"
                        className="w-full h-12 px-4 rounded-xl bg-white border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">Phone <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" data-testid="form-phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX"
                        className="w-full h-12 px-4 rounded-xl bg-white border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" data-testid="form-email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">Service Required <span className="text-red-500">*</span></label>
                    <select name="service" data-testid="form-service" value={form.service} onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all appearance-none cursor-pointer" required>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">Preferred Date</label>
                    <input type="date" name="preferred_date" data-testid="form-date" value={form.preferred_date} onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-white border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">Message (Optional)</label>
                    <textarea name="message" data-testid="form-message" value={form.message} onChange={handleChange}
                      placeholder="Describe your symptoms or concerns..." rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all resize-none" />
                  </div>
                  {error && (
                    <div data-testid="form-error" className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                      <AlertCircle size={16} />{error}
                    </div>
                  )}
                  <button type="submit" data-testid="form-submit" disabled={loading}
                    className="w-full h-14 bg-[#601E8E] hover:bg-[#4A1570] disabled:opacity-60 text-white font-bold text-base rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-purple-200 flex items-center justify-center gap-2">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>Booking...
                      </span>
                    ) : "Book Appointment"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
