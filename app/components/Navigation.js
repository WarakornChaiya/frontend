"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // ตรวจสอบ token ใน localStorage
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    
    // เรียกใช้เมื่อ component mount
    checkAuthStatus();

    // เพิ่ม event listener สำหรับการ scroll
    window.addEventListener("scroll", handleScroll);

    // เพิ่ม event listener สำหรับการเปลี่ยนแปลง localStorage
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    closeMobileMenu();
    router.push("/");
  };

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-900 border-b-4 border-red-600 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2"
          : "bg-transparent py-4 bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Aggressive Style */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative overflow-hidden">
              <div className="text-3xl font-black italic tracking-tighter text-white transform -skew-x-12 border-l-8 border-red-600 pl-3 transition-all duration-300 group-hover:pl-5 group-hover:border-white">
                WARA<span className="text-red-600 group-hover:text-white transition-colors">KORN</span>
              </div>
              {/* Decorative line underneath */}
              <div className="h-1 w-full bg-gray-800 mt-1 transform -skew-x-12">
                 <div className="h-full w-1/3 bg-red-600 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            </div>
          </div>

          {/* Desktop Menu - Slanted & Industrial */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-6 py-2 group overflow-hidden"
              >
                {/* Background hover effect */}
                <span className="absolute inset-0 w-full h-full bg-white/10 transform skew-x-12 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                <span className="relative font-bold text-sm tracking-widest text-gray-300 group-hover:text-white transition-colors uppercase italic">
                  {item.name}
                </span>
                {/* Active indicator */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons and functionality */}
          <div className="flex items-center space-x-4">


            {/* Shopping Bag - Mechanical Look */}
            <button className="relative p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 group">
              <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z" />
              </svg>
              {/* Badge (Square, Sharp) */}
              <span className="absolute -top-0 -right-0 w-4 h-4 bg-white text-black text-[10px] font-bold flex items-center justify-center transform skew-x-[-10deg] border border-black">
                2
              </span>
            </button>

            <div className="h-8 w-px bg-gray-700 mx-2 hidden md:block transform rotate-12"></div>

            {/* Desktop Auth Buttons - Racing Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 clip-path-polygon transition-all duration-300 hover:skew-x-[-10deg]"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2 text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-red-600 hover:text-white transition-all duration-300 transform skew-x-[-12deg]"
                  >
                    <span className="block transform skew-x-[12deg]">Register</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button - Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white border border-gray-700 hover:border-red-600 transition-colors"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Industrial/Dark */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full bg-neutral-900/95 backdrop-blur-lg border-t-2 border-red-600 transition-all duration-500 ease-in-out origin-top ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-xl font-black italic uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent hover:border-red-600 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}

          <div className="h-px w-full bg-gray-800 my-4"></div>

          {/* Mobile Auth */}
          <div className="space-y-3 px-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 text-lg font-bold uppercase text-white bg-red-600 hover:bg-red-700 clip-path-polygon text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block w-full py-3 text-center text-lg font-bold uppercase text-white border border-gray-600 hover:border-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="block w-full py-3 text-center text-lg font-bold uppercase text-black bg-white hover:bg-gray-200 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}