"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Cards() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const cardsData = [
    {
      id: 1,
      category: "Performance",
      title: "1000cc Engine",
      description: "Unleash the beast with our newly developed V4 engine architecture.",
      // ภาพเครื่องยนต์/ห้องเครื่อง
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocN4j1yt6wIm3N-jErZlbDE50TgOZJbjjjQ&s",
      badge: "V4 POWER",
      link: "#"
    },
    {
      id: 2,
      category: "Aerodynamics",
      title: "Carbon Fiber Frame",
      description: "Ultra-lightweight chassis designed to cut through the wind like a blade.",
      // ภาพแฟริ่ง/Carbon fiber
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80",
      badge: "LIGHTWEIGHT",
      link: "#"
    },
    {
      id: 3,
      category: "Safety",
      title: "ABS Braking System",
      description: "Advanced braking technology ensuring maximum control in all conditions.",
      // ภาพเบรค/ล้อ
      image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1000&q=80",
      badge: "SAFETY",
      link: "#"
    },
    {
      id: 4,
      category: "Suspension",
      title: "Ohlins Suspension",
      description: "Fully adjustable suspension for the perfect track day setup.",
      // ภาพโช้คอัพ
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAdhVIIJc5ukBihXR3EyCUBxU_xnPYLUcIg&s",
      badge: "TRACK READY",
      link: "#"
    },
    {
      id: 5,
      category: "Technology",
      title: "TFT Dashboard",
      description: "Stay connected with a customizable full-color display interface.",
      // ภาพหน้าจอเรือนไมล์
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQc1bM3vxK75PwN1i1OZ6_p1J0njgkcqso1w&s",
      badge: "SMART",
      link: "#"
    },
    {
      id: 6,
      category: "Gear",
      title: "Racing Apparel",
      description: "Professional grade racing suits offering superior protection and comfort.",
      // ภาพชุดแข่ง/หมวกกันน็อค
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlE6jVfJhxi2yWCUrYbbN7V6DLEn08FJlGzw&s",
      badge: "PROTECTION",
      link: "#"
    }
  ];

  const getBadgeColor = (badge) => {
    // ธีม Racing ใช้สีโทนร้อน/เด่นชัด
    return "bg-red-600 border border-red-500"; 
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-neutral-900 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-800/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block transform skew-x-[-12deg] mb-6">
            <div className="px-6 py-2 bg-neutral-800 border-l-4 border-red-600">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 transform skew-x-[12deg] block">
                Engineering Specs
                </span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black italic text-white mb-8 tracking-tighter uppercase">
            Built For <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Speed</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light border-r-4 border-gray-700 pr-6">
            Explore the cutting-edge components that make our machines the undisputed kings of the asphalt.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              data-card-id={card.id}
              className={`group relative bg-neutral-800 overflow-hidden shadow-2xl hover:shadow-red-900/20 transition-all duration-500 transform ${
                visibleCards.includes(card.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)' // มุมตัดล่างขวา
              }}
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden border-b-4 border-red-600">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                
                {/* Badge (Top Right) */}
                <div className={`absolute top-0 right-0 px-4 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-wider transform translate-x-4 -translate-y-2 skew-x-[-12deg] shadow-lg`}>
                  <span className="block transform skew-x-[12deg] translate-y-1">{card.badge}</span>
                </div>

                {/* Category (Bottom Left) */}
                <div className="absolute bottom-0 left-0 px-4 py-2 bg-black/80 backdrop-blur-md text-gray-300 text-xs font-bold uppercase tracking-widest border-tr-lg">
                  {card.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-neutral-800 to-neutral-900">
                <h3 className="text-2xl font-black italic text-white mb-3 group-hover:text-red-500 transition-colors duration-300 uppercase">
                  {card.title}
                </h3>
                <div className="h-0.5 w-12 bg-gray-600 mb-4 group-hover:w-full group-hover:bg-red-600 transition-all duration-500"></div>
                <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                  {card.description}
                </p>

                {/* CTA Link - Industrial Button */}
                <a 
                  href={card.link}
                  className="inline-flex items-center text-white text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors duration-300 group/link"
                >
                  View Details
                  <span className="ml-2 bg-gray-700 p-1 group-hover/link:bg-red-600 transition-colors duration-300">
                     <svg 
                        className="w-4 h-4 transform -rotate-45 group-hover/link:rotate-0 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-4 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-all duration-300 transform skew-x-[-12deg] hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <span className="block transform skew-x-[12deg]">All Specifications</span>
            </button>
            <button className="px-10 py-4 border border-gray-500 text-gray-300 font-black uppercase tracking-widest hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 transform skew-x-[-12deg]">
              <span className="block transform skew-x-[12deg]">Download Brochure</span>
            </button>
          </div>
        </div>

        {/* Stats Section - Dashboard Style */}
        <div className="mt-24 pt-16 border-t border-gray-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-800">
            {[
              { number: "200+", label: "Horsepower" },
              { number: "300", label: "Km/h Top Speed" },
              { number: "2.8s", label: "0-100 Km/h" },
              { number: "168kg", label: "Dry Weight" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center px-4"
              >
                <div className="text-4xl sm:text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-red-600 font-bold uppercase tracking-widest text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}