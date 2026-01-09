import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ConciergeBell,
  LayoutGrid,
  Phone,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const location = useLocation();
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ---------------- CLOSE MENU ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCollectionMenu(false);
      }
    };
    if (showCollectionMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCollectionMenu]);

  /* ---------------- CLOSE MENU ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setShowCollectionMenu(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    if (path === "/collection") {
      e.preventDefault();
      setShowCollectionMenu((prev) => !prev);
      return;
    }
    if (isActive(path)) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    setShowCollectionMenu(false);
  };

  const bottomNavLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/services", label: "Services", icon: ConciergeBell },
    { path: "/collection", label: "Collection", icon: LayoutGrid },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="lg:hidden">
      {/* ================= COLLECTION DROP-UP (CENTERED OVER ICON) ================= */}
      {showCollectionMenu && (
        <div
          ref={menuRef}
          style={{ left: '62.5%' }} /* Standard 5-item nav middle is 50%, 4-item 'Collection' is roughly 62.5% */
          className="
            fixed bottom-[74px] -translate-x-1/2
            w-[210px]
            bg-white/95 backdrop-blur-md
            border border-gray-100
            shadow-[0_-8px_24px_rgba(0,0,0,0.12)]
            rounded-xl
            z-[60]
            animate-in fade-in slide-in-from-bottom-2 duration-200
          "
        >
          {/* Title from Screenshot */}
          <div className="px-3 pt-3 pb-1.5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Our Collection
            </p>
          </div>

          <div className="h-px bg-gray-100 mx-3" />

          {/* Items mapped with your icons */}
          <div className="p-1.5 space-y-1">
            <Link
              to="/collection/carpets"
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg active:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#794299]/10 flex items-center justify-center text-sm">
                🧶
              </div>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-gray-900">Carpet Collection</p>
                <p className="text-[10px] text-gray-500">Handcrafted luxury</p>
              </div>
            </Link>

            <Link
              to="/collection/shawls"
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg active:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#794299]/10 flex items-center justify-center text-sm">
                🪡
              </div>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-gray-900">Shawl Collection</p>
                <p className="text-[10px] text-gray-500">Elegant warmth</p>
              </div>
            </Link>
          </div>

          {/* Pointer Triangle from image_ef2f7f.png */}
          <div
            className="
              absolute -bottom-1.5 left-1/2 -translate-x-1/2
              w-3 h-3 bg-white rotate-45
              border-r border-b border-gray-100
            "
          />
        </div>
      )}

      {/* ================= MAIN BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-100 shadow-[0_-10px_25px_rgba(0,0,0,0.04)] z-50">
        <div className="flex justify-around items-center h-full px-1">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const active = link.path === "/collection"
              ? location.pathname.includes("/collection")
              : isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative",
                  active ? "text-black" : "text-gray-400"
                )}
              >
                {link.path === "/collection" && (
                  <div className={cn(
                    "absolute -top-1 transition-all duration-500",
                    showCollectionMenu ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0"
                  )}>
                    <ChevronUp className="w-3 h-3 animate-bounce" />
                  </div>
                )}

                <Icon className={cn("w-5 h-5 mb-0.5 transition-all duration-500", active && "scale-110")} />
                <span className="text-[9px] font-bold uppercase tracking-[0.1em]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ================= BACKDROP ================= */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/5 backdrop-blur-[1px] transition-opacity duration-500",
          showCollectionMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowCollectionMenu(false)}
      />
    </div>
  );
};

export default MobileBottomNav;