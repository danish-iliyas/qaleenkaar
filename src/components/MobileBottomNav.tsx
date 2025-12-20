import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, // For Home
  ConciergeBell, // For Services
  LayoutGrid, // For Collection
  Info, // For About Us
  Phone, // For Contact
} from "lucide-react";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const location = useLocation();

  // Helper to check if the path is active or if it's a sub-path
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    // Check if the current URL starts with the link's path
    return location.pathname.startsWith(path);
  };

  // ✅ 1. NEW FUNCTION
  // This function handles the click logic
  const handleLinkClick = (path: string) => {
    // Check if the link we're clicking is already the active page
    if (isActive(path)) {
      // If yes, scroll to the top of the page
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // Use 'auto' for an instant scroll
      });
    }
    // If it's not the active page, the <Link> component will
    // handle the navigation, and our ScrollToTop.tsx will
    // handle the scroll.
  };

  // Your 5 requested navigation links
  const bottomNavLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/services", label: "Services", icon: ConciergeBell },
    { path: "/collection/carpets", label: "Collection", icon: LayoutGrid },
    // { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    // This component is fixed to the bottom and only appears on mobile (lg:hidden)
    <nav className="fixed bottom-0 left-0 right-0 w-full h-16 bg-white border-t border-gray-200 shadow-t-lg z-50 lg:hidden">
      <div className="flex justify-around items-center h-full">
        {bottomNavLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path); // Get active state

          return (
            <Link
              key={link.path}
              to={link.path}
              // ✅ 2. NEW onClick HANDLER ADDED
              onClick={() => handleLinkClick(link.path)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                active
                  ? "text-[#794299]" // Active (purple) color
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              <Icon className="w-6 h-6 mb-0.5" />
              <span className="text-xs font-medium uppercase tracking-wider">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
