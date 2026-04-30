import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  "Cataract Treatment",
  "LASIK / Specs Removal",
  "Retina Treatment",
  "Glaucoma Solutions",
  "Cornea Treatment",
  "Pediatric Ophthalmology",
  "Dry Eye Treatment",
  "Oculoplasty",
  "General Eye Check-up",
];

export default function AppointmentSection() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", preferred_date: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/appointments`, form);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: "", preferred_date: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment" data-testid="appointment-section" className="bg-[#F8FAF8] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#246B24] text-sm font-bold uppercase tracking-widest mb-3">Book Appointment</p>
            <h2 className="font-heading font-bold text-[#0A1F0A] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              We are on a mission to<br />
              <span className="text-[#246B24]">redefine Ophthalmology</span>
            </h2>
            <p className="text-[#4B6B4B] text-base leading-relaxed mb-10">
              Schedule your consultation with our expert ophthalmologists today. Early detection saves vision — don't wait.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: Mail, label: "Email Us", value: "info@clearvision.in", href: "mailto:info@clearvision.in" },
                { icon: MapPin, label: "Visit Us", value: "Multiple locations across India", href: "#" },
                { icon: Clock, label: "Hours", value: "Mon–Sat: 9 AM – 7 PM", href: "#" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    data-testid={`contact-info-${i}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E0EBE0] hover:border-[#246B24]/30 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 bg-[#246B24] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1B4D1B] transition-colors">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide">{item.label}</p>
                      <p className="text-[#0A1F0A] font-semibold text-sm">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 md:p-10 border border-[#E0EBE0]">
              <h3 className="font-heading font-bold text-[#0A1F0A] text-2xl mb-7">Book Your Consultation</h3>

              {success ? (
                <div data-testid="appointment-success" className="text-center py-10">
                  <CheckCircle size={56} className="text-[#246B24] mx-auto mb-4" />
                  <h4 className="font-heading font-bold text-[#0A1F0A] text-xl mb-2">Appointment Requested!</h4>
                  <p className="text-[#4B6B4B] text-sm mb-6">Our team will contact you within 24 hours to confirm your appointment.</p>
                  <button
                    data-testid="book-another"
                    onClick={() => setSuccess(false)}
                    className="bg-[#246B24] hover:bg-[#1B4D1B] text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="appointment-form" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        data-testid="form-name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full h-12 px-4 rounded-xl bg-[#F8FAF8] border border-[#E0EBE0] text-[#0A1F0A] text-sm focus:outline-none focus:ring-2 focus:ring-[#246B24]/30 focus:border-[#246B24] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide mb-1.5">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        data-testid="form-phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full h-12 px-4 rounded-xl bg-[#F8FAF8] border border-[#E0EBE0] text-[#0A1F0A] text-sm focus:outline-none focus:ring-2 focus:ring-[#246B24]/30 focus:border-[#246B24] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      data-testid="form-email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full h-12 px-4 rounded-xl bg-[#F8FAF8] border border-[#E0EBE0] text-[#0A1F0A] text-sm focus:outline-none focus:ring-2 focus:ring-[#246B24]/30 focus:border-[#246B24] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide mb-1.5">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service"
                      data-testid="form-service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8FAF8] border border-[#E0EBE0] text-[#0A1F0A] text-sm focus:outline-none focus:ring-2 focus:ring-[#246B24]/30 focus:border-[#246B24] transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      data-testid="form-date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8FAF8] border border-[#E0EBE0] text-[#0A1F0A] text-sm focus:outline-none focus:ring-2 focus:ring-[#246B24]/30 focus:border-[#246B24] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4B6B4B] uppercase tracking-wide mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      data-testid="form-message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your symptoms or any specific concerns..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#E0EBE0] text-[#0A1F0A] text-sm focus:outline-none focus:ring-2 focus:ring-[#246B24]/30 focus:border-[#246B24] transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div data-testid="form-error" className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    data-testid="form-submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#246B24] hover:bg-[#1B4D1B] disabled:opacity-60 text-white font-bold text-base rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Booking...
                      </span>
                    ) : (
                      "Book Appointment"
                    )}
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
