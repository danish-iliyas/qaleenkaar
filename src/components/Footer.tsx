import { useState } from "react";
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
import SellExchangeModal from "@/components/SellExchangeModal";

const Footer = () => {
  const [isSellExchangeOpen, setIsSellExchangeOpen] = useState(false);
  const whatsappNumber = "+917982698231";
  const email = "Qaleenkaar@gmail.com";
  // 6d44a6

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold uppercase tracking-widest">
              Qaleenkaar
            </h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed uppercase tracking-wider max-w-xs">
              Where art meets care. Expert carpet and shawl care services
              preserving heritage and craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest">
              Explore
            </h4>
            <nav className="flex flex-col space-y-3 font-sans text-xs text-gray-300">
              <Link
                to="/services"
                className="hover:text-white hover:underline underline-offset-4 transition-all w-fit uppercase tracking-wide"
              >
                Our Services
              </Link>
              <Link
                to="/collection"
                className="hover:text-white hover:underline underline-offset-4 transition-all w-fit uppercase tracking-wide"
              >
                Collection
              </Link>
              <Link
                to="/about"
                className="hover:text-white hover:underline underline-offset-4 transition-all w-fit uppercase tracking-wide"
              >
                About Us
              </Link>
              <Link
                to="/faqs"
                className="hover:text-white hover:underline underline-offset-4 transition-all w-fit uppercase tracking-wide"
              >
                FAQs
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest">
              Services
            </h4>
            <ul className="flex flex-col space-y-3 font-sans text-xs text-gray-300 uppercase tracking-wide">
              <li>Professional Washing</li>
              <li>Expert Repairing</li>
              <li>Carpet Restoration</li>
              <li
                onClick={() => setIsSellExchangeOpen(true)}
                className="cursor-pointer hover:text-white hover:underline underline-offset-4 transition-all w-fit"
              >
                Sell & Exchange
              </li>
              <li>Special Cleaning</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest">
              Contact
            </h4>
            <div className="flex flex-col space-y-4 font-sans text-xs text-gray-300 uppercase tracking-wide">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4" />
                <span>+91 987 193 0986</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-sans text-[10px] text-gray-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Qaleenkaar. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />

      {/* Sell & Exchange Modal */}
      <SellExchangeModal
        open={isSellExchangeOpen}
        onOpenChange={setIsSellExchangeOpen}
      />
    </footer>
  );
};

export default Footer;
