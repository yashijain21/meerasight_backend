import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, AlertCircle, Clock, User, Mail, Phone, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Stethoscope, Loader2 } from "lucide-react";
import axios from "axios";
import { format, isBefore, startOfDay, isSameDay } from "date-fns";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SERVICES = [
  { label: "Cataract Surgery", icon: "👁️", slug: "cataract" },
  { label: "LASIK / Refractive Surgery", icon: "⚡", slug: "refractive" },
  { label: "Retina Treatment", icon: "🔬", slug: "retina" },
  { label: "Glaucoma Management", icon: "🛡️", slug: "glaucoma" },
  { label: "Cornea Services", icon: "💧", slug: "cornea" },
  { label: "Paediatric Ophthalmology", icon: "❤️", slug: "pediatric" },
  { label: "Ocular Surface Diseases", icon: "🌊", slug: "ocular-surface" },
  { label: "Keratoconus Treatment", icon: "⭕", slug: "keratoconus" },
  { label: "Contact Lens Clinic", icon: "📷", slug: "contact-lens" },
  { label: "Comprehensive Eye Exam", icon: "🩺", slug: "comprehensive-exam" },
];

const STEPS = ["Service", "Date & Time", "Your Details", "Confirmed"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i < current ? "bg-[#601E8E] text-white" :
              i === current ? "bg-[#601E8E] text-white ring-4 ring-purple-100" :
              "bg-gray-100 text-gray-400"
            }`}>
              {i < current ? (
                <CheckCircle size={18} className="text-white" />
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${i === current ? "text-[#601E8E]" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mb-5 mx-1 transition-all duration-300 ${i < current ? "bg-[#601E8E]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1 – Service selection
function Step1({ selected, onSelect, onNext }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h3 className="font-heading font-bold text-[#1A0A2E] text-xl md:text-2xl mb-2">Select a Service</h3>
      <p className="text-[#5C4B6B] text-sm mb-6">Choose the treatment you need for your appointment with Dr. Sonia Sharma.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-80 overflow-y-auto pr-1">
        {SERVICES.map((svc) => (
          <button
            key={svc.slug}
            data-testid={`service-option-${svc.slug}`}
            onClick={() => onSelect(svc.label)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              selected === svc.label
                ? "border-[#601E8E] bg-purple-50 shadow-md"
                : "border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/50"
            }`}
          >
            <span className="text-2xl flex-shrink-0">{svc.icon}</span>
            <span className={`font-semibold text-sm ${selected === svc.label ? "text-[#601E8E]" : "text-[#1A0A2E]"}`}>
              {svc.label}
            </span>
            {selected === svc.label && <CheckCircle size={16} className="text-[#601E8E] ml-auto flex-shrink-0" />}
          </button>
        ))}
      </div>
      <button
        data-testid="step1-next"
        onClick={onNext}
        disabled={!selected}
        className="w-full h-13 bg-[#601E8E] hover:bg-[#4A1570] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-full text-sm transition-all flex items-center justify-center gap-2"
      >
        Continue <ChevronRight size={16} />
      </button>
    </motion.div>
  );
}

// Step 2 – Date & Time slot
function Step2({ date, timeSlot, onDateChange, onSlotChange, onNext, onBack }) {
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [closed, setClosed] = useState(false);

  const fetchSlots = useCallback(async (d) => {
    setLoadingSlots(true);
    setSlots([]);
    setClosed(false);
    try {
      const dateStr = format(d, "yyyy-MM-dd");
      const { data } = await axios.get(`${API}/slots?date=${dateStr}`);
      setClosed(data.closed);
      setSlots(data.slots || []);
    } catch (e) {
      console.error("Failed to fetch slots", e);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (date) fetchSlots(date);
  }, [date, fetchSlots]);

  const today = startOfDay(new Date());
  const isDisabled = (d) => {
    if (isBefore(d, today)) return true;
    // Thursday = 4 in date-fns (0=Sun, so Thu=4)
    if (d.getDay() === 4) return true;
    return false;
  };

  const morningSlots = slots.filter(s => {
    const h = parseInt(s.time.split(":")[0]);
    return h < 14;
  });
  const eveningSlots = slots.filter(s => {
    const h = parseInt(s.time.split(":")[0]);
    return h >= 14;
  });

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h3 className="font-heading font-bold text-[#1A0A2E] text-xl md:text-2xl mb-2">Choose Date & Time</h3>
      <p className="text-[#5C4B6B] text-sm mb-6">Select your preferred date (Thursday & past dates unavailable). Then pick a time slot.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-purple-100 p-4 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { if (d) { onDateChange(d); onSlotChange(""); } }}
            disabled={isDisabled}
            fromDate={today}
            classNames={{
              day_selected: "bg-[#601E8E] text-white hover:bg-[#601E8E] hover:text-white focus:bg-[#601E8E] focus:text-white rounded-full",
              day_today: "bg-purple-50 text-[#601E8E] font-bold rounded-full",
              day: "h-9 w-9 p-0 font-normal hover:bg-purple-50 hover:text-[#601E8E] rounded-full transition-colors",
              head_cell: "text-[#5C4B6B] w-9 font-semibold text-xs",
              caption_label: "text-[#1A0A2E] font-bold",
              nav_button: "h-7 w-7 bg-transparent hover:bg-purple-50 rounded-lg p-0 opacity-70 hover:opacity-100 border border-purple-100",
              day_disabled: "text-gray-300 cursor-not-allowed hover:bg-transparent hover:text-gray-300",
            }}
            data-testid="booking-calendar"
          />
        </div>

        {/* Time slots */}
        <div>
          {!date ? (
            <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-purple-100 p-6 text-center">
              <div>
                <CalendarIcon size={32} className="text-purple-200 mx-auto mb-3" />
                <p className="text-[#5C4B6B] text-sm">Please select a date to see available time slots.</p>
              </div>
            </div>
          ) : loadingSlots ? (
            <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-purple-100 p-6">
              <Loader2 className="animate-spin text-[#601E8E]" size={28} />
            </div>
          ) : closed ? (
            <div className="h-full flex items-center justify-center bg-red-50 rounded-2xl border border-red-100 p-6 text-center">
              <div>
                <span className="text-3xl mb-3 block">🔒</span>
                <p className="font-heading font-bold text-red-700 text-base mb-1">Clinic Closed</p>
                <p className="text-red-500 text-sm">MeeraSight is closed on Thursdays. Please choose another day.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-purple-100 p-4 h-full overflow-y-auto max-h-72">
              <p className="text-xs font-bold text-[#5C4B6B] uppercase tracking-widest mb-3">
                {format(date, "EEEE, d MMMM")}
              </p>

              {morningSlots.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-[#601E8E] mb-2 flex items-center gap-1">
                    <Clock size={11} /> Morning Session
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot.time}
                        data-testid={`time-slot-${slot.time}`}
                        onClick={() => slot.available && onSlotChange(slot.time)}
                        disabled={!slot.available}
                        className={`py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                          timeSlot === slot.time
                            ? "bg-[#601E8E] text-white shadow-md"
                            : slot.available
                              ? "bg-purple-50 text-[#601E8E] hover:bg-[#601E8E] hover:text-white border border-purple-100"
                              : "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                        }`}
                      >
                        {slot.display}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {eveningSlots.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-[#00A8D7] mb-2 flex items-center gap-1">
                    <Clock size={11} /> Evening Session
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {eveningSlots.map((slot) => (
                      <button
                        key={slot.time}
                        data-testid={`time-slot-${slot.time}`}
                        onClick={() => slot.available && onSlotChange(slot.time)}
                        disabled={!slot.available}
                        className={`py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                          timeSlot === slot.time
                            ? "bg-[#00A8D7] text-white shadow-md"
                            : slot.available
                              ? "bg-teal-50 text-[#00A8D7] hover:bg-[#00A8D7] hover:text-white border border-teal-100"
                              : "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                        }`}
                      >
                        {slot.display}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {slots.length > 0 && slots.every(s => !s.available) && (
                <p className="text-center text-[#5C4B6B] text-sm py-4">All slots booked for this date. Please try another day.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 text-[#5C4B6B] hover:text-[#601E8E] font-semibold text-sm px-4 py-3.5 rounded-full border border-purple-100 hover:border-[#601E8E]/30 transition-all">
          <ChevronLeft size={16} /> Back
        </button>
        <button
          data-testid="step2-next"
          onClick={onNext}
          disabled={!date || !timeSlot}
          className="flex-1 bg-[#601E8E] hover:bg-[#4A1570] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-full text-sm transition-all flex items-center justify-center gap-2"
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 3 – Personal details
function Step3({ form, onChange, onSubmit, onBack, loading, error }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h3 className="font-heading font-bold text-[#1A0A2E] text-xl md:text-2xl mb-2">Your Details</h3>
      <p className="text-[#5C4B6B] text-sm mb-6">Almost done! Fill in your contact details and we'll confirm your appointment.</p>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <User size={11} /> Full Name <span className="text-red-500">*</span>
            </label>
            <input type="text" name="name" data-testid="form-name" value={form.name} onChange={onChange} placeholder="Your full name"
              className="w-full h-12 px-4 rounded-xl bg-[#FAF8FF] border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <Phone size={11} /> Phone <span className="text-red-500">*</span>
            </label>
            <input type="tel" name="phone" data-testid="form-phone" value={form.phone} onChange={onChange} placeholder="+91 XXXXX XXXXX"
              className="w-full h-12 px-4 rounded-xl bg-[#FAF8FF] border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" required />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5 flex items-center gap-1">
            <Mail size={11} /> Email Address <span className="text-red-500">*</span>
          </label>
          <input type="email" name="email" data-testid="form-email" value={form.email} onChange={onChange} placeholder="your@email.com"
            className="w-full h-12 px-4 rounded-xl bg-[#FAF8FF] border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea name="message" data-testid="form-message" value={form.message} onChange={onChange}
            placeholder="Describe your symptoms or any specific concerns for Dr. Sonia Sharma..." rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8FF] border border-purple-100 text-[#1A0A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#601E8E]/30 focus:border-[#601E8E] transition-all resize-none" />
        </div>
      </div>

      {error && (
        <div data-testid="form-error" className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl mb-4 border border-red-100">
          <AlertCircle size={16} className="flex-shrink-0" />{error}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 text-[#5C4B6B] hover:text-[#601E8E] font-semibold text-sm px-4 py-3.5 rounded-full border border-purple-100 hover:border-[#601E8E]/30 transition-all">
          <ChevronLeft size={16} /> Back
        </button>
        <button data-testid="form-submit" onClick={onSubmit} disabled={loading}
          className="flex-1 bg-[#601E8E] hover:bg-[#4A1570] disabled:opacity-60 text-white font-bold py-3.5 rounded-full text-sm transition-all flex items-center justify-center gap-2">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Booking...</> : <>Confirm Booking <ChevronRight size={16} /></>}
        </button>
      </div>
    </motion.div>
  );
}

// Step 4 – Success
function Step4({ booking, onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
      <div className="w-20 h-20 bg-gradient-to-br from-[#601E8E] to-[#00A8D7] rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle size={40} className="text-white" />
      </div>
      <h3 className="font-heading font-bold text-[#1A0A2E] text-2xl mb-2">Appointment Booked!</h3>
      <p className="text-[#5C4B6B] text-sm mb-7 max-w-sm mx-auto">
        Your appointment with Dr. Sonia Sharma has been requested. Our team will confirm within 24 hours.
      </p>

      {/* Booking summary card */}
      <div data-testid="appointment-success" className="bg-[#FAF8FF] rounded-2xl border border-purple-100 p-6 text-left mb-7 max-w-md mx-auto">
        <h4 className="font-heading font-semibold text-[#601E8E] text-sm uppercase tracking-widest mb-4">Appointment Summary</h4>
        <div className="space-y-3">
          {[
            { icon: User, label: "Patient", value: booking.name },
            { icon: Stethoscope, label: "Service", value: booking.service },
            { icon: CalendarIcon, label: "Date", value: booking.preferred_date ? format(new Date(booking.preferred_date + "T00:00:00"), "EEEE, d MMMM yyyy") : "-" },
            { icon: Clock, label: "Time", value: booking.time_slot ? (() => { const [h,m] = booking.time_slot.split(":").map(Number); const p = h < 12 ? "AM" : "PM"; const h12 = h > 12 ? h - 12 : (h === 0 ? 12 : h); return `${h12}:${String(m).padStart(2,"0")} ${p}`; })() : "To be confirmed" },
            { icon: Phone, label: "Phone", value: booking.phone },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={13} className="text-[#601E8E]" />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-[#5C4B6B] font-semibold w-14 flex-shrink-0">{label}:</span>
                <span className="text-sm text-[#1A0A2E] font-medium truncate">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <a href={`https://wa.me/917428728458?text=${encodeURIComponent(`Hi! I just booked an appointment for ${booking.service} on ${booking.preferred_date} at ${booking.time_slot || "a time to be confirmed"}. Please confirm. Name: ${booking.name}, Phone: ${booking.phone}`)}`}
          target="_blank" rel="noopener noreferrer" data-testid="success-whatsapp"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-5 py-3 rounded-full text-sm transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Confirm on WhatsApp
        </a>
        <button onClick={onReset} data-testid="book-another"
          className="border-2 border-[#601E8E] text-[#601E8E] hover:bg-purple-50 font-bold px-5 py-3 rounded-full text-sm transition-all">
          Book Another
        </button>
      </div>
    </motion.div>
  );
}

export default function BookingCalendar() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  const handleFormChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError(""); };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) { setError("Please fill in all required fields."); return; }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service,
        preferred_date: format(date, "yyyy-MM-dd"),
        time_slot: timeSlot,
        message: form.message,
      };
      await axios.post(`${API}/appointments`, payload);
      setBooking(payload);
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.detail || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0); setService(""); setDate(null); setTimeSlot("");
    setForm({ name: "", email: "", phone: "", message: "" });
    setError(""); setBooking(null);
  };

  return (
    <div data-testid="booking-calendar-widget" className="w-full">
      {step < 3 && <StepIndicator current={step} />}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <Step1 key="s1" selected={service} onSelect={setService} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <Step2 key="s2" date={date} timeSlot={timeSlot} onDateChange={setDate} onSlotChange={setTimeSlot}
            onNext={() => setStep(2)} onBack={() => setStep(0)} />
        )}
        {step === 2 && (
          <Step3 key="s3" form={form} onChange={handleFormChange} onSubmit={handleSubmit}
            onBack={() => setStep(1)} loading={loading} error={error} />
        )}
        {step === 3 && booking && (
          <Step4 key="s4" booking={booking} onReset={reset} />
        )}
      </AnimatePresence>
    </div>
  );
}
