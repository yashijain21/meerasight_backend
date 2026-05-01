import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import BookingCalendar from "./BookingCalendar";

export default function AppointmentSection() {
  return (
    <section id="appointment" data-testid="appointment-section" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-3">Book Appointment</p>
          <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            Schedule Your <span className="text-[#601E8E]">Consultation</span>
          </h2>
          <p className="text-[#5C4B6B] text-base md:text-lg max-w-2xl mx-auto">
            Book your appointment with Dr. Sonia Sharma at MeeraSight in 3 simple steps — choose a service, pick a date & time, confirm.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Booking Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#FAF8FF] rounded-3xl border border-purple-100 shadow-[0_8px_32px_rgba(96,30,142,0.07)] p-7 md:p-10">
              <BookingCalendar />
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-[#601E8E] to-[#00A8D7] rounded-2xl p-6 text-white">
              <h4 className="font-heading font-bold text-base mb-4 flex items-center gap-2">
                <Clock size={17} /> Opening Hours
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-0.5">Mon – Wed, Fri – Sat</p>
                  <p className="text-white font-semibold">9:00 AM – 1:30 PM</p>
                  <p className="text-white font-semibold">6:00 PM – 8:00 PM</p>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-0.5">Sunday</p>
                  <p className="text-white font-semibold">9:00 AM – 12:00 Noon</p>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <p className="text-red-200 text-xs font-semibold uppercase tracking-wide">Thursday — CLOSED</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            {[
              { icon: Phone, label: "Call Us", value: "+91-11-47092310", href: "tel:+911147092310" },
              { icon: () => (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              ), label: "WhatsApp", value: "+91-7428728458", href: "https://wa.me/917428728458", green: true },
              { icon: Mail, label: "Email", value: "meerasight@gmail.com", href: "mailto:meerasight@gmail.com" },
              { icon: MapPin, label: "Address", value: "C5C-14A, Janak Puri, New Delhi", href: "https://www.google.com/maps/dir//C5C-14A,+Janakpuri,+Delhi,+110058" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  data-testid={`contact-info-${i}`}
                  className="flex items-start gap-4 p-4 bg-[#FAF8FF] rounded-2xl border border-purple-100 hover:border-[#601E8E]/30 hover:shadow-md transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${item.green ? "bg-[#25D366] group-hover:bg-[#1ebe5d]" : "bg-[#601E8E] group-hover:bg-[#4A1570]"}`}>
                    <span className="text-white"><Icon size={18} /></span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5C4B6B] uppercase tracking-wide">{item.label}</p>
                    <p className="text-[#1A0A2E] font-semibold text-sm">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
