import { Eye, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  Specialties: [
    "Cataract Treatment",
    "LASIK Surgery",
    "Retina Treatment",
    "Glaucoma Solutions",
    "Cornea Treatment",
    "Pediatric Ophthalmology",
  ],
  "Quick Links": [
    { label: "About Us", href: "#about" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "#blog" },
    { label: "Book Appointment", href: "#appointment" },
    { label: "Contact Us", href: "#appointment" },
  ],
  Locations: [
    "New Delhi", "Mumbai", "Bangalore", "Hyderabad",
    "Chennai", "Kolkata", "Pune", "Ahmedabad",
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#0A1F0A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-[#246B24] rounded-xl flex items-center justify-center">
                <Eye className="text-white" size={22} />
              </div>
              <div>
                <p className="font-heading font-black text-white text-lg leading-none">ClearVision</p>
                <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">Eye Hospitals</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              India's leading eye hospital network with 22+ years of transforming lives through advanced ophthalmology care.
            </p>
            {/* Contact info */}
            <div className="space-y-2.5 mb-7">
              <a href="tel:+919876543210" data-testid="footer-phone" className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                <Phone size={15} className="text-[#246B24] group-hover:text-[#5DC85D] transition-colors" />
                +91 98765 43210
              </a>
              <a href="mailto:info@clearvision.in" data-testid="footer-email" className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                <Mail size={15} className="text-[#246B24] group-hover:text-[#5DC85D] transition-colors" />
                info@clearvision.in
              </a>
              <span className="flex items-center gap-2.5 text-white/70 text-sm">
                <MapPin size={15} className="text-[#246B24]" />
                Pan India — 15+ Locations
              </span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#246B24] rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Specialties</h4>
            <ul className="space-y-2.5">
              {footerLinks.Specialties.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transition-transform duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks["Quick Links"].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">Locations</h4>
            <ul className="space-y-2.5">
              {footerLinks.Locations.map((city) => (
                <li key={city}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-[#246B24] rounded-full flex-shrink-0" />
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} ClearVision Eye Hospitals. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/50 hover:text-white text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
