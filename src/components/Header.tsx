// src/components/Header.tsx (Updated)

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Search,
  ShoppingCart,
  ChevronDown,
  LogOut,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LoginDialog from "./LoginDialog";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { isAuthenticated, user, login, logout } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Your 7 navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/collection/carpets", label: "Collection" }, // Point base link to one, e.g., carpets
    { path: "/about", label: "About Us" },
    { path: "/blog", label: "Blog" },
    { path: "/faqs", label: "FAQs" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-24 relative">
          
          {/* Left: Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Empty div on the left for desktop to balance the layout */}
          <div className="hidden lg:flex" />

          {/* Center: Logo & Nav (Desktop) */}
          <div className="hidden lg:flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center space-x-2 group">
             <h1 className="font-serif text-3xl md:text-4xl font-medium text-gray-800 tracking-wider">
              THE QALEENKAAR</h1>

            </Link>
            <NavigationMenu className="mt-3">
              <NavigationMenuList className="space-x-1">
                {navLinks.map((link) =>
                  link.label === "Services" ? (
                    <NavigationMenuItem key={link.path}>
                      <NavigationMenuTrigger
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "font-serif text-sm uppercase tracking-widest bg-transparent  hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                          isActive(link.path) || location.pathname.startsWith('/services') // Highlight if on any services page
                            ? "text-gray-900 font-medium"
                            : "text-gray-600 hover:text-[#794299]"
                        )}
                      >
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/services#carpet"
                                className={cn(
                                  "block rounded-lg px-4 py-3 font-serif text-sm text-gray-700 hover:bg-[#f4e7ff] hover:text-[#631b8d] transition-all"
                                )}
                              >
                                Carpet Services
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/services#shawl"
                                className={cn(
                                  "block rounded-lg px-4 py-3 font-serif text-sm text-gray-700 hover:bg-[#f4e7ff] hover:text-[#631b8d] transition-all"
                                )}
                              >
                                Shawl Services
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    link.label === "Collection" ? (
                      <NavigationMenuItem key={link.path}>
  <NavigationMenuTrigger
    className={cn(
      navigationMenuTriggerStyle(),
      "font-serif text-sm uppercase tracking-widest bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
      "transition-all duration-200 px-4 py-2 rounded-md",
      isActive(link.path) || location.pathname.startsWith('/collection')
        ? "text-gray-900 font-semibold"
        : "text-gray-700 hover:text-[#794299]"
    )}
  >
    Collection
  </NavigationMenuTrigger>

  <NavigationMenuContent
    className="rounded-xl shadow-xl bg-white border border-gray-200 mt-2"
  >
    <ul className="grid w-[240px] gap-1.5 p-3">

      <li>
        <NavigationMenuLink asChild>
          <Link
            to="/collection/carpets"
            className="block rounded-lg px-4 py-3 font-serif text-sm text-gray-700 hover:bg-[#f4e7ff] hover:text-[#631b8d] transition-all"
          >
            Carpet Collection
          </Link>
        </NavigationMenuLink>
      </li>

      <li>
        <NavigationMenuLink asChild>
          <Link
            to="/collection/shawls"
            className="block rounded-lg px-4 py-3 font-serif text-sm text-gray-700 hover:bg-[#f4e7ff] hover:text-[#631b8d] transition-all"
          >
            Shawl Collection
          </Link>
        </NavigationMenuLink>
      </li>

    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>

                    ) : (
                      <NavigationMenuItem key={link.path}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.path}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "font-serif text-sm uppercase tracking-widest bg-transparent hover:bg-transparent focus:bg-transparent",
                            isActive(link.path)
                              ? "text-gray-900 font-medium"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    )
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center: Logo (Mobile) */}
          <div className="lg:hidden flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <Link to="/">
               <h1 className="font-serif  text-[15px] font-medium text-gray-800 tracking-wider">
                 THE QALEENKAAR
               </h1>
             </Link>
          </div>

          {/* --- Right Icons (Desktop) --- */}
          <div className="hidden lg:flex items-center space-x-5">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <User className="w-5 h-5 mr-1" />
                    <span className="font-serif text-sm capitalize">{user}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/dashboard"
                      className="cursor-pointer font-serif text-sm"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer font-serif text-sm text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Login"
                onClick={() => setIsLoginDialogOpen(true)}
              >
                <User className="w-5 h-5" />
              </Button>
            )}

            <button className="text-gray-700 hover:text-gray-900" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="relative text-gray-700 hover:text-gray-900" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                0
              </span>
            </Link>
            <button className="flex items-center text-gray-700 hover:text-gray-900">
              <span className="font-serif text-sm mr-1">INR</span>
              <span className="font-serif text-lg">₹</span>
            </button>
          </div>

            {/* --- Right Icons (Mobile) --- */}
            <div className="lg:hidden">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-gray-900 p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                      aria-label="My Account"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin/dashboard"
                        className="cursor-pointer font-serif text-sm"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer font-serif text-sm text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Login"
                  onClick={() => setIsLoginDialogOpen(true)}
                >
                  <User className="w-5 h-5" />
                </Button>
              )}
          </div>
        </div>
      </div>

      {/* Login Dialog Component */}
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        onLoginSuccess={login}
      />

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="lg:hidden py-4 bg-white border-t border-gray-200 shadow-lg animate-fade-in-down">
          <div className="flex flex-col space-y-2 px-4">
            {/* --- 3. UPDATE MOBILE NAV LINKS --- */}
            <Link
              to="/collection/carpets"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-md font-serif uppercase tracking-widest text-gray-700 hover:bg-gray-100"
            >
              Carpet Collection
            </Link>
            <Link
              to="/collection/shawls"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-md font-serif uppercase tracking-widest text-gray-700 hover:bg-gray-100"
            >
              Shawl Collection
            </Link>

            {/* Other links */}
            {navLinks
              .filter(link => link.label !== "Collection" && link.label !== "Services") // Filter out the ones we manually added
              .map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-md font-serif uppercase tracking-widest ${
                  isActive(link.path)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile menu icons */}
            <div className="flex justify-around pt-4 border-t border-gray-200 mt-2">
              
              {/* Cart Icon (moved from top right) */}
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="relative flex flex-col items-center text-gray-700 hover:text-gray-900"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs mt-1">Cart</span>
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  0
                </span>
              </Link>

              <button className="flex flex-col items-center text-gray-700 hover:text-gray-900">
                <Search className="w-5 h-5" />
                <span className="text-xs mt-1">Search</span>
              </button>
              <button className="flex flex-col items-center text-gray-700 hover:text-gray-900">
                <span className="font-serif text-lg">₹</span>
                <span className="text-xs mt-1">INR</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;