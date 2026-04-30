import { useState, useEffect } from "react";
import { Eye, Phone, Mail, ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  {
    label: "Specialties",
    href: "#services",
    children: ["Cataract", "LASIK", "Retina", "Glaucoma", "Cornea", "Pediatric"],
  },
  { label: "Our Doctors", href: "#doctors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#appointment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#246B24] text-white text-sm py-2 px-6 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone size={13} />
            <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={13} />
            <a href="mailto:info@clearvision.in" className="hover:underline">info@clearvision.in</a>
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
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-md"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" data-testid="navbar-logo" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#246B24] rounded-xl flex items-center justify-center group-hover:bg-[#1B4D1B] transition-colors">
              <Eye className="text-white" size={22} />
            </div>
            <div>
              <p className="font-heading font-black text-[#0A1F0A] text-lg leading-none">ClearVision</p>
              <p className="text-[10px] text-[#4B6B4B] font-medium tracking-widest uppercase">Eye Hospitals</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-1 text-sm font-semibold text-[#0A1F0A] hover:text-[#246B24] transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </a>
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {link.children.map((child) => (
                      <a
                        key={child}
                        href="#services"
                        className="block px-4 py-2.5 text-sm text-[#0A1F0A] hover:bg-[#E0EBE0] hover:text-[#246B24] transition-colors"
                      >
                        {child}
                      </a>
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
              className="hidden lg:flex items-center gap-2 bg-[#246B24] hover:bg-[#1B4D1B] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-200"
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
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 text-sm font-semibold text-[#0A1F0A] hover:text-[#246B24] border-b border-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#appointment"
              data-testid="mobile-book-appointment"
              className="mt-4 block text-center bg-[#246B24] text-white font-bold py-3 rounded-full"
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
