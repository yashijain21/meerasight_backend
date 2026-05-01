import { useState, useEffect } from "react";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  { label: "Retina Services", slug: "retina" },
  { label: "Refractive Services (LASIK)", slug: "refractive" },
  { label: "Paediatric Ophthalmology", slug: "pediatric" },
  { label: "Ocular Surface Diseases", slug: "ocular-surface" },
  { label: "Keratoconus", slug: "keratoconus" },
  { label: "Glaucoma", slug: "glaucoma" },
  { label: "Cornea Services", slug: "cornea" },
  { label: "Contact Lens Clinic", slug: "contact-lens" },
  { label: "Comprehensive Eye Exam", slug: "comprehensive-exam" },
  { label: "Cataract", slug: "cataract" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Specialties", href: "#services", hasDropdown: true },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#appointment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#601E8E] text-white text-sm py-2 px-6 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone size={13} />
            <a href="tel:+911147092310" className="hover:underline">+91-11-47092310</a>
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={13} />
            <a href="mailto:meerasight@gmail.com" className="hover:underline">meerasight@gmail.com</a>
          </span>
        </div>
        <div className="flex items-center gap-6 text-white/80">
          <a href="#blog" className="hover:text-white transition-colors">Blogs</a>
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        data-testid="navbar"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-xl shadow-md" : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <a href="/" data-testid="navbar-logo" className="flex items-center">
            <img
              src="https://customer-assets.emergentagent.com/job_vision-clinic-10/artifacts/rxtbd93l_download.png"
              alt="MeeraSight Logo"
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
              >
                <a
                  href={link.href}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-1 text-sm font-semibold text-[#1A0A2E] hover:text-[#601E8E] transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </a>

                {link.hasDropdown && dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {services.map((svc) => (
                      <button
                        key={svc.slug}
                        onClick={() => { navigate(`/services/${svc.slug}`); setDropdownOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-[#1A0A2E] hover:bg-purple-50 hover:text-[#601E8E] transition-colors"
                      >
                        {svc.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#appointment"
              data-testid="navbar-book-appointment"
              className="hidden lg:flex items-center gap-2 bg-[#601E8E] hover:bg-[#4A1570] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-purple-200"
            >
              Book Appointment
            </a>
            <button
              data-testid="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 text-sm font-semibold text-[#1A0A2E] hover:text-[#601E8E] border-b border-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 mb-2">
              <p className="text-xs font-bold text-[#601E8E] uppercase tracking-widest mb-2">Our Services</p>
              {services.map((svc) => (
                <button
                  key={svc.slug}
                  onClick={() => { navigate(`/services/${svc.slug}`); setMobileOpen(false); }}
                  className="block w-full text-left py-2 text-sm text-[#1A0A2E] hover:text-[#601E8E] border-b border-gray-50"
                >
                  {svc.label}
                </button>
              ))}
            </div>
            <a
              href="#appointment"
              data-testid="mobile-book-appointment"
              className="mt-4 block text-center bg-[#601E8E] text-white font-bold py-3 rounded-full"
              onClick={() => setMobileOpen(false)}
            >
              Book Appointment
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
