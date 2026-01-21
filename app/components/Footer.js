"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: "The Garage",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Crew", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Race Blog", href: "/blog" },
      ],
    },
    services: {
      title: "Performance",
      links: [
        { name: "Tuning & Mods", href: "/services/tuning" },
        { name: "Custom Paint", href: "/services/paint" },
        { name: "Maintenance", href: "/services/maintenance" },
        { name: "Dyno Test", href: "/services/dyno" },
      ],
    },
    resources: {
      title: "Manuals",
      links: [
        { name: "Service Guide", href: "/docs" },
        { name: "Community", href: "/community" },
        { name: "Parts Catalog", href: "/parts" },
        { name: "Help Center", href: "/help" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.62 0 11.987-5.367 11.987-11.988C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.467 4.467-4.467c2.458 0 4.467 2.009 4.467 4.467S10.907 16.988 8.449 16.988zM17.54 11.535h-2.906c.101-.461.157-.938.157-1.429c0-3.27-2.648-5.918-5.918-5.918s-5.918 2.648-5.918 5.918c0 .491.056.968.157 1.429H.206v8.852C.206 22.098 1.108 23 2.819 23h18.362c1.711 0 2.613-.902 2.613-2.613v-8.852z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  const contactInfo = {
    address: "Chiang Mai Technical College",
    phone: "0990069414",
    email: "beam72292@gmail.com",
  };

  return (
    <footer className="bg-neutral-900 border-t-4 border-red-600 relative overflow-hidden">
      
      {/* Background Texture - Carbon fiber feel */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Logo - Skewed & Aggressive */}
              <div className="inline-block transform -skew-x-12 mb-6 border-l-8 border-red-600 pl-4">
                <div className="text-3xl font-black italic tracking-tighter text-white">
                  WARA<span className="text-red-600">KORN</span>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6 font-light border-l-2 border-gray-700 pl-4">
                We don't just build systems; we engineer performance. 
                Experience digital acceleration with cutting-edge design and speed.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-gray-400 hover:text-white hover:bg-red-600 rounded-none transform skew-x-[-12deg] transition-all duration-300 group border border-gray-800 hover:border-red-600"
                    aria-label={social.name}
                  >
                    <div className="transform skew-x-[12deg]">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h3 className="text-sm font-black text-white tracking-[0.15em] uppercase mb-6 border-b border-red-600 pb-2 inline-block transform skew-x-[-12deg]">
                <span className="transform skew-x-[12deg] inline-block">{section.title}</span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-red-500 font-medium transition-all duration-300 group flex items-center"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-red-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information - Dashboard Style */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Address */}
            <div className="flex items-start space-x-4 group p-4 border border-transparent hover:border-gray-800 hover:bg-neutral-800/50 transition-all duration-300 skew-x-[-6deg]">
              <div className="p-3 bg-neutral-800 text-red-600 rounded-none skew-x-[6deg] shadow-lg group-hover:text-white group-hover:bg-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="skew-x-[6deg]">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">HQ Location</p>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 group p-4 border border-transparent hover:border-gray-800 hover:bg-neutral-800/50 transition-all duration-300 skew-x-[-6deg]">
              <div className="p-3 bg-neutral-800 text-red-600 rounded-none skew-x-[6deg] shadow-lg group-hover:text-white group-hover:bg-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="skew-x-[6deg]">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Direct Line</p>
                <a href={`tel:${contactInfo.phone}`} className="text-lg font-black italic text-white hover:text-red-500 transition-colors duration-300 tracking-wider">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 group p-4 border border-transparent hover:border-gray-800 hover:bg-neutral-800/50 transition-all duration-300 skew-x-[-6deg]">
              <div className="p-3 bg-neutral-800 text-red-600 rounded-none skew-x-[6deg] shadow-lg group-hover:text-white group-hover:bg-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="skew-x-[6deg]">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Support</p>
                <a href={`mailto:${contactInfo.email}`} className="text-sm text-gray-300 hover:text-red-500 transition-colors duration-300 break-all font-medium">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-black text-white italic uppercase mb-2">
              Join The Club
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest gear drops and racing news directly to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-sm bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors duration-300 skew-x-[-12deg]"
              />
              <button className="px-6 py-3 bg-red-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-12deg] shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-white/20">
                <span className="block transform skew-x-[12deg]">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
              © {currentYear} WARAKORN. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-600 uppercase tracking-wider font-bold">
              <Link href="/privacy" className="hover:text-red-600 transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-red-600 transition-colors duration-300">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-red-600 transition-colors duration-300">
                Cookies
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-600 font-medium">
              <span>Made by</span>
              <span className="text-red-600 font-black">WARAKORN</span>
              <span>in Thailand</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}