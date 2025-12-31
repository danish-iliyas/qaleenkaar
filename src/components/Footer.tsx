import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import MobileBottomNav from "@/components/MobileBottomNav";

const Footer = () => {
  const whatsappNumber = "+911234567890";
  const email = "info@loomtales.com";
  // 6d44a6

  return (
    <footer className="bg-[#43305d] text-[#FFFFFF] border-t border-brown-light/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-accent">
              Loom Tales
            </h3>
            <p className="font-body text-sm leading-relaxed">
              Where art meets care. Expert carpet and shawl care services
              preserving heritage and craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2 font-body text-sm text-white">
              <Link
                to="/services"
                className="relative inline-block elegant-underline group"
              >
                <span className="group-hover:text-[#F5C518] transition-colors duration-300">
                  Our Services
                </span>
              </Link>
              <Link
                to="/collection"
                className="relative inline-block elegant-underline group"
              >
                <span className="group-hover:text-[#F5C518] transition-colors duration-300">
                  Collection
                </span>
              </Link>
              <Link
                to="/about"
                className="relative inline-block elegant-underline group"
              >
                <span className="group-hover:text-[#F5C518] transition-colors duration-300">
                  About Us
                </span>
              </Link>
              <Link
                to="/faqs"
                className="relative inline-block elegant-underline group"
              >
                <span className="group-hover:text-[#F5C518] transition-colors duration-300">
                  FAQs
                </span>
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Services</h4>
            <ul className="flex flex-col space-y-2 font-body text-sm">
              <li>Professional Washing</li>
              <li>Expert Repairing</li>
              <li>Carpet Restoration</li>
              <li>Sell & Exchange</li>
              <li>Special Cleaning</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contact Us</h4>
            <div className="flex flex-col space-y-3 font-body text-sm">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="flex items-center gap-2 hover:text-accent-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4" />
                +91 123 456 7890
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-accent-dark transition-colors"
              >
                <Mail className="w-4 h-4" />
                {email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  123 Heritage Lane, Crafts District, Jaipur, Rajasthan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-brown-light/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm">
              © {new Date().getFullYear()} Loom Tales. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-dark transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-dark transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-dark transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </footer>
  );
};

export default Footer;
