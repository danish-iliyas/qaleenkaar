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
      {/* ================= COLLECTION DROP-UP MENU ================= */}
    {/* ================= COLLECTION DROP-UP (ALIGNED & COMPACT) ================= */}
{showCollectionMenu && (
  <div
    ref={menuRef}
    className="
      absolute bottom-[72px] left-1/2 -translate-x-1/4
      w-[210px]
      bg-white/95 backdrop-blur-md
      border border-gray-100
      shadow-[0_-8px_24px_rgba(0,0,0,0.12)]
      rounded-xl
      z-[60]
      animate-in fade-in slide-in-from-bottom-2 duration-200
    "
  >
    {/* Title */}
    <div className="px-3 pt-2 pb-1 text-center">
      <p className="text-[11px] font-medium text-gray-800">
        Our Collection
      </p>
    </div>

    <div className="h-px bg-gray-100 mx-3" />

    {/* Items */}
    <div className="p-1">
      {/* Carpet */}
      <Link
        to="/collection/carpets"
        className="
          flex items-center gap-2
          px-2 py-2
          rounded-lg
          hover:bg-[#794299]/5
          active:scale-[0.98]
          transition
        "
      >
        <div className="w-7 h-7 rounded-md bg-[#794299]/10 flex items-center justify-center text-xs">
          🧶
        </div>
        <div className="leading-tight">
          <p className="text-[12px] font-medium text-gray-900">
            Carpet Collection
          </p>
          <p className="text-[9px] text-gray-500">
            Handcrafted luxury
          </p>
        </div>
      </Link>

      {/* Shawl */}
      <Link
        to="/collection/shawls"
        className="
          flex items-center gap-2
          px-2 py-2
          rounded-lg
          hover:bg-[#794299]/5
          active:scale-[0.98]
          transition
        "
      >
        <div className="w-7 h-7 rounded-md bg-[#794299]/10 flex items-center justify-center text-xs">
          🪡
        </div>
        <div className="leading-tight">
          <p className="text-[12px] font-medium text-gray-900">
            Shawl Collection
          </p>
          <p className="text-[9px] text-gray-500">
            Elegant warmth
          </p>
        </div>
      </Link>
    </div>

    {/* Pointer */}
    <div
      className="
        absolute -bottom-1 left-1/2 -translate-x-1/2
        w-3 h-3 bg-white rotate-45
        border-r border-b border-gray-100
      "
    />
  </div>
)}



      {/* ================= MAIN BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 shadow-[0_-10px_25px_rgba(0,0,0,0.04)] z-50">
        <div className="flex justify-around items-center h-full px-2">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const active =
              link.path === "/collection"
                ? location.pathname.includes("/collection")
                : isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative",
                  active ? "text-[#794299]" : "text-gray-400"
                )}
              >
                {/* Chevron Indicator */}
                {link.path === "/collection" && (
                  <div
                    className={cn(
                      "absolute -top-1 transition-all duration-500",
                      showCollectionMenu
                        ? "opacity-100 -translate-y-1"
                        : "opacity-0 translate-y-0"
                    )}
                  >
                    <ChevronUp className="w-3 h-3 animate-bounce" />
                  </div>
                )}

                <Icon
                  className={cn(
                    "w-6 h-6 mb-0.5 transition-all duration-500",
                    active && "scale-110"
                  )}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
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
          "fixed inset-0 z-[55] bg-black/10 backdrop-blur-[1px] transition-opacity duration-500",
          showCollectionMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowCollectionMenu(false)}
      />
    </div>
  );
};

export default MobileBottomNav;
