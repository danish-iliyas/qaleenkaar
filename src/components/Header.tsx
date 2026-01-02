import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import {
  Menu,
  X,
  User,
  Plus,
  ChevronDown,
  LogOut, // Added for logout icon
  Phone, // Added Phone icon
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { cn } from "@/lib/utils";
import LoginDialog from "./LoginDialog";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting after logout
  const { login, logout, isAuthenticated, user } = useAuth(); // Added logout from context
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Only apply hide/show AFTER logo animation is complete (200px+)
      if (currentScrollY > 200) {
        // Scrolling DOWN → show header
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
          setIsHeaderHidden(false);
        }
        // Scrolling UP → hide header
        if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
          setIsHeaderHidden(true);
        }
      } else {
        // Always show header when near top (during logo animation)
        setIsHeaderHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsCollectionsOpen(false);
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  // --- GUCCI EFFECT CALCULATIONS ---
  // We want the transition to be fully complete by 200px scroll
  const TRANSITION_HEIGHT = 200;

  // Progress 0 (at top) -> 1 (at TRANSITION_HEIGHT)
  const progress = Math.min(Math.max(scrollY / TRANSITION_HEIGHT, 0), 1);

  // STYLES
  // 1. Background: Transparent -> White
  // At progress 0: rgba(255,255,255,0)
  // At progress 1: rgba(255,255,255,1)
  // We'll keep it transparent/white based on home page logic
  const headerBgOpacity = isHome ? progress : 1;
  const isScrolledPast = progress > 0.8;

  // 2. Text Color:
  // On Home: White at top, Black after scroll.
  // Not Home: Always Black? Or same logic? Usually standard pages have white bg, so text is always black.
  // Let's assume on Home page specifically we do this effect.
  const textColorClass =
    isHome && progress < 0.8 ? "text-white" : "text-gray-900";
  const iconColorClass =
    isHome && progress < 0.8 ? "text-white" : "text-gray-900";
  const borderColorClass =
    isHome && progress < 0.8 ? "border-transparent" : "border-gray-100";

  // 3. Logo Animation
  // Desktop: Starts huge (scale 3) and shifted down (+150px)
  // Ends normal (scale 1) and shift 0
  const desktopScale = isHome ? 3 - 2 * progress : 1; // 3 -> 1
  const desktopTranslateY = isHome ? 150 - 150 * progress : 0; // 150px -> 0px

  // Mobile: Scale 1.5 -> 1 AND Shift down -> 0
  const mobileScale = isHome ? 1.5 - 0.8 * progress : 1;
  const mobileTranslateY = isHome ? 100 - 100 * progress : 0; // Start 100px down

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    {
      label: "Collection",
      isSubmenu: true,
      subLinks: [
        { path: "/collection/carpets", label: "Carpet Collection" },
        { path: "/collection/shawls", label: "Shawl Collection" },
      ],
    },
    { path: "/about", label: "About Us" },
    { path: "/blog", label: "Blog" },
    { path: "/faqs", label: "FAQs" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={cn(
          // On Home: Fixed (overlays hero). On others: Sticky (pushes content down)
          isHome ? "fixed" : "sticky",
          "top-0 z-40 w-full transition-colors duration-200 border-b",
          borderColorClass
        )}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${headerBgOpacity})`,
          // Add a subtle shadow only when white background is solid
          boxShadow:
            isHome && progress < 0.9 ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
          // Hide/show based on scroll direction (only after logo animation completes)
          transform: isHeaderHidden ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.3s ease-in-out, background-color 0.2s, box-shadow 0.2s",
        }}
      >
        <div className="mx-auto px-4 md:px-10">
          <div className="grid grid-cols-3 items-center h-[55px] lg:h-[70px]">
            {/* LEFT COLUMN */}
            <div className="flex items-center">
              {/* MOBILE: Phone Icon (WhatsApp) */}
              <a
                href="https://wa.me/917982698231"
                target="_blank"
                rel="noopener noreferrer"
                className={`lg:hidden p-2 -ml-2 focus:outline-none transition-colors duration-300 ${iconColorClass}`}
              >
                <Phone className="w-5 h-5 stroke-[1.2px]" />
              </a>

              {/* DESKTOP: Plus + Contact Text (WhatsApp) */}
              <div className="hidden lg:flex items-center space-x-2">
                <Plus
                  className={`w-3.5 h-3.5 transition-colors duration-300 ${iconColorClass}`}
                />
                <a
                  href="https://wa.me/917982698231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-serif text-[13px] font-medium uppercase tracking-tight transition-colors duration-300 ${textColorClass}`}
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* CENTER COLUMN - LOGO */}
            <div className="flex justify-center items-center relative">
              <Link to="/" className="mx-auto px-2 block relative z-50">
                <h1
                  className={`font-medium tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap uppercase transition-colors duration-300 ${textColorClass} hidden md:block`}
                  style={{
                    transform: `translateY(${desktopTranslateY}px) scale(${desktopScale})`,
                    transformOrigin: "center top",
                    willChange: "transform, color",
                    fontSize: "38px", // Base size, scaled up by transform
                  }}
                >
                  QALEENKAAR
                </h1>
                {/* Mobile Version */}
                <h1
                  className={`font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300 ${textColorClass} md:hidden text-[15px]`}
                  style={{
                    transform: `translateY(${mobileTranslateY}px) scale(${mobileScale})`,
                    transformOrigin: "center center",
                    willChange: "transform, color",
                    fontSize: "24px",
                  }}
                >
                  QALEENKAAR
                </h1>
              </Link>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex items-center justify-end">
              {/* MOBILE: Hamburger Menu */}
              <button
                onClick={() => setIsOpen(true)}
                className={`lg:hidden p-2 -mr-2 focus:outline-none transition-colors duration-300 ${iconColorClass}`}
              >
                <Menu className="w-6 h-6 stroke-[1.2px]" />
              </button>

              <div className="hidden lg:flex items-center space-x-8">
                {/* Desktop User Icon Logic */}
                <button
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/admin")
                      : setIsLoginDialogOpen(true)
                  }
                  className={`transition-colors duration-300 ${iconColorClass}`}
                >
                  <User className="w-5 h-5 stroke-[1.2px]" />
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center space-x-2 group focus:outline-none"
                >
                  <Menu
                    className={`w-6 h-6 stroke-[1.2px] transition-colors duration-300 ${iconColorClass}`}
                  />
                  <span
                    className={`font-serif text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${textColorClass}`}
                  >
                    Menu
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SIDE SLIDER MENU */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 transition-opacity duration-500 z-[60]",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 bg-black text-white rounded-full hover:scale-110 transition-transform z-[80] shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="flex flex-col h-full pt-20 px-12 pb-10 overflow-y-auto">
          {/* ✅ UPDATED MOBILE LOGIN/LOGOUT SECTION */}
          <div className="lg:hidden mb-10 pb-6 border-b border-gray-100">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#794299]" />
                  </div>
                  <div className="text-left">
                    <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Account
                    </p>
                    <p className="font-serif text-lg font-bold text-gray-900">
                      Hello, {user?.name || "Admin"}
                    </p>
                  </div>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginDialogOpen(true);
                }}
                className="flex items-center space-x-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#794299] transition-colors">
                  <User className="w-5 h-5 text-gray-600 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    Account
                  </p>
                  <p className="font-serif text-lg text-gray-900">
                    Login / Register
                  </p>
                </div>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {navLinks.map((link, idx) => (
              <div key={idx}>
                {link.isSubmenu ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                      className="flex items-center justify-between w-full font-serif text-[18px] md:text-[22px] text-gray-900 text-left transition-all duration-300"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform duration-300",
                          isCollectionsOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out space-y-4 pl-4 border-l border-gray-100",
                        isCollectionsOpen
                          ? "max-h-[200px] opacity-100 py-2"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setIsOpen(false)}
                          className="block font-serif text-[16px] md:text-[18px] text-gray-500 hover:text-black transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block font-serif text-[18px] md:text-[22px] text-gray-900 hover:pl-2 transition-all duration-300",
                      location.pathname === link.path && "italic font-bold"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-gray-100">
            <Link
              to="/services"
              className="block font-serif text-[14px] uppercase tracking-widest text-gray-500 mb-4 hover:text-black"
            >
              Qaleenkaar Services
            </Link>
            <Link
              to="/contact"
              className="block font-serif text-[14px] uppercase tracking-widest text-gray-500 hover:text-black"
            >
              Book a Consultation
            </Link>
          </div>
        </nav>
      </div>

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        onLoginSuccess={login}
      />
    </>
  );
};

export default Header;
