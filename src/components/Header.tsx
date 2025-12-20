import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import {
  Menu,
  X,
  User,
  Plus,
  ChevronDown,
  LogOut, // Added for logout icon
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsCollectionsOpen(false);
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout(); // Call the logout function from your AuthContext
    setIsOpen(false); // Close the sidebar
    navigate("/"); // Optional: redirect to home
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { 
      label: "Collection", 
      isSubmenu: true, 
      subLinks: [
        { path: "/collection/carpets", label: "Carpet Collection" },
        { path: "/collection/shawls", label: "Shawl Collection" },
      ]
    },
    { path: "/about", label: "About Us" },
    { path: "/blog", label: "Blog" },
    { path: "/faqs", label: "FAQs" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
        <div className="mx-auto px-4 md:px-10">
          <div className="grid grid-cols-3 items-center h-[75px] lg:h-[70px]">
            {/* LEFT COLUMN */}
            <div className="flex items-center">
              <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-900 focus:outline-none">
                <Menu className="w-6 h-6 stroke-[1.2px]" />
              </button>
              <div className="hidden lg:flex items-center space-x-2">
                <Plus className="w-3.5 h-3.5 text-gray-800" />
                <Link to="/contact" className="font-serif text-[13px] font-medium text-gray-900 uppercase tracking-tight">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* CENTER COLUMN */}
            <div className="flex justify-center items-center">
              <Link to="/" className="mx-auto px-2">
                <h1 className="font-serif text-[13px] xs:text-[15px] sm:text-lg md:text-2xl font-medium text-gray-900 tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap uppercase">
                  THE QALEENKAAR
                </h1>
              </Link>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex items-center justify-end">
              <Link to="/contact" className="lg:hidden border border-gray-900 px-3 py-1 text-[10px] uppercase font-bold tracking-tighter">
                Contact
              </Link>
              <div className="hidden lg:flex items-center space-x-8">
                {/* Desktop User Icon Logic */}
                <button 
                  onClick={() => isAuthenticated ? navigate('/admin') : setIsLoginDialogOpen(true)} 
                  className="text-gray-900"
                >
                  <User className="w-5 h-5 stroke-[1.2px]" />
                </button>
                <button onClick={() => setIsOpen(true)} className="flex items-center space-x-2 group focus:outline-none">
                  <Menu className="w-6 h-6 stroke-[1.2px]" />
                  <span className="font-serif text-[11px] uppercase tracking-widest font-bold">Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SIDE SLIDER MENU */}
      <div 
        className={cn("fixed inset-0 bg-black/40 transition-opacity duration-500 z-[60]", isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        onClick={() => setIsOpen(false)}
      />

      <div className={cn("fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform", isOpen ? "translate-x-0" : "translate-x-full")}>
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 bg-black text-white rounded-full hover:scale-110 transition-transform z-[80] shadow-lg">
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
                    <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-gray-400">Account</p>
                    <p className="font-serif text-lg font-bold text-gray-900">
                      Hello, {user?.name || 'Admin'}
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
                  <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-gray-400">Account</p>
                  <p className="font-serif text-lg text-gray-900">Login / Register</p>
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
                      <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isCollectionsOpen && "rotate-180")} />
                    </button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-500 ease-in-out space-y-4 pl-4 border-l border-gray-100",
                      isCollectionsOpen ? "max-h-[200px] opacity-100 py-2" : "max-h-0 opacity-0"
                    )}>
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
            <Link to="/services" className="block font-serif text-[14px] uppercase tracking-widest text-gray-500 mb-4 hover:text-black">
              Qaleenkaar Services
            </Link>
            <Link to="/contact" className="block font-serif text-[14px] uppercase tracking-widest text-gray-500 hover:text-black">
              Book a Consultation
            </Link>
          </div>
        </nav>
      </div>

      <LoginDialog isOpen={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} onLoginSuccess={login} />
    </>
  );
};

export default Header;