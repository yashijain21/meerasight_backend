import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const serviceLinks = [
  { label: "Retina Services", slug: "retina" },
  { label: "Refractive / LASIK", slug: "refractive" },
  { label: "Paediatric Ophthalmology", slug: "pediatric" },
  { label: "Ocular Surface Diseases", slug: "ocular-surface" },
  { label: "Keratoconus", slug: "keratoconus" },
  { label: "Glaucoma", slug: "glaucoma" },
  { label: "Cornea Services", slug: "cornea" },
  { label: "Contact Lens Clinic", slug: "contact-lens" },
  { label: "Comprehensive Eye Exam", slug: "comprehensive-exam" },
  { label: "Cataract Surgery", slug: "cataract" },
];

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Doctor", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Book Appointment", href: "#appointment" },
  { label: "Contact Us", href: "#appointment" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer" className="bg-[#1A0A2E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" data-testid="navbar-logo" className="flex items-center">
                        <img
                          src="https://customer-assets.emergentagent.com/job_vision-clinic-10/artifacts/rxtbd93l_download.png"
                          alt="MeeraSight Logo"
                          className="h-14 w-auto object-contain"
                        />
                      </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Expert Eye Care Solutions by Dr. Sonia Sharma. Serving patients in Janak Puri, New Delhi with compassionate and advanced ophthalmology care.
            </p>
            <div className="space-y-2.5 mb-7">
              <a href="tel:+911147092310" data-testid="footer-phone" className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                <Phone size={15} className="text-[#601E8E] group-hover:text-[#00A8D7] transition-colors" />+91-11-47092310
              </a>
              <a href="tel:+917428728458" data-testid="footer-whatsapp" className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366] flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +91-7428728458 (WhatsApp)
              </a>
              <a href="mailto:meerasight@gmail.com" data-testid="footer-email" className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                <Mail size={15} className="text-[#601E8E] group-hover:text-[#00A8D7] transition-colors" />meerasight@gmail.com
              </a>
              <span className="flex items-start gap-2.5 text-white/70 text-sm">
                <MapPin size={15} className="text-[#601E8E] flex-shrink-0 mt-0.5" />C5C-14A, Janak Puri, New Delhi
              </span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} data-testid={`footer-social-${label.toLowerCase()}`} aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#601E8E] rounded-lg flex items-center justify-center transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(`/services/${item.slug}`)}
                    className="text-white/60 hover:text-white text-sm transition-colors text-left hover:translate-x-1 inline-block transition-transform duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Opening hours */}
            <div className="mt-8">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">Opening Hours</h4>
              <div className="space-y-1.5 text-sm text-white/60">
                <p><span className="text-white/80 font-semibold">Weekdays:</span> 9am–1:30pm, 6–8pm</p>
                <p><span className="text-white/80 font-semibold">Sunday:</span> 9am–12noon</p>
                <p><span className="text-red-400 font-semibold">Thursday:</span> Closed</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Find Us</h4>
            <a
              href="https://www.google.com/maps/dir//C5C-14A,+Janakpuri,+Delhi,+110058"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-map-link"
              className="block rounded-xl overflow-hidden border border-white/10 hover:border-[#601E8E]/50 transition-all mb-4"
            >
              <iframe
                title="MeeraSight Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.3978!2d77.0972771!3d28.6141652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d055aa8ed8889%3A0x466a3246cc8bf154!2sC5C-14A%2C+Janakpuri%2C+Delhi%2C+110058!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="160"
                style={{ border: 0, filter: "grayscale(50%) brightness(0.7)" }}
                allowFullScreen=""
                loading="lazy"
              />
            </a>
            <a
              href="https://www.google.com/maps/dir//C5C-14A,+Janakpuri,+Delhi,+110058"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00A8D7] hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <MapPin size={12} /> Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} MeeraSight Eye Clinic. All rights reserved. | Dr. Sonia Sharma
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((link) => (
              <a key={link} href="#" className="text-white/50 hover:text-white text-xs transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
