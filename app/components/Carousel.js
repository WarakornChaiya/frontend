"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Adrenaline Unleashed",
      subtitle: "Dominating The Streets",
      description:
        "Experience raw power and precision engineering that pushes the boundaries of speed. This is not just a ride; it's a statement.",
      // ภาพถนนกลางคืน มุมมองคนขับ (Dark/Speed)
      image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=2570&q=80",
      buttonText: "Start Engine",
    },
    {
      id: 2,
      title: "Mechanical Masterpiece",
      subtitle: "Pure Metal & Soul",
      description:
        "Forged from the toughest materials, every curve and bolt is designed for maximum performance and aggressive aesthetics.",
      // ภาพเครื่องยนต์ Close-up (Detail/Mechanical)
      image: "https://chickenbootsusa.com/wp-content/uploads/2022/01/1295.jpg",
      buttonText: "View Specs",
    },
    {
      id: 3,
      title: "Future of Racing",
      subtitle: "Electric Revolution",
      description:
        "Silent but deadly. Embrace the next generation of superbike technology with instant torque and zero emissions.",
      // ภาพอุโมงค์ไฟ/กลางคืน (Futuristic/Neon)
      image: "https://www.dailynews.co.th/wp-content/uploads/2024/12/4839_0-800x450.jpg",
      buttonText: "Test Ride",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-900">
      
      {/* Background Tech Elements - Grid & Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-800/10 skew-x-[-12deg] z-0 pointer-events-none border-l border-white/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>

      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full group">
            {/* Background Image with Aggressive Grading */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[10000ms] ease-linear"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(110%)' : 'scale(100%)'
              }}
            >
              {/* Heavy Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>

            {/* Content Area - Left Aligned & Skewed */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-16 lg:px-24">
              <div className="max-w-4xl">
                
                {/* Subtitle - Racing Tag Style */}
                <div className="overflow-hidden mb-4">
                    <div
                    className={`inline-block bg-red-600 text-white text-xs sm:text-sm font-black uppercase tracking-[0.2em] px-4 py-1 transform -skew-x-12 transition-all duration-700 ${
                        index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-full"
                    }`}
                    >
                    <span className="block transform skew-x-12">{slide.subtitle}</span>
                    </div>
                </div>

                {/* Title - Massive & Italic */}
                <h1
                  className={`text-white text-5xl sm:text-7xl lg:text-9xl font-black italic tracking-tighter mb-6 uppercase drop-shadow-2xl transition-all duration-700 delay-200 ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0 blur-0"
                      : "opacity-0 translate-x-20 blur-sm"
                  }`}
                >
                  {slide.title.split(' ')[0]} <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">
                    {slide.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                {/* Description - Industrial Type */}
                <div className={`border-l-4 border-red-600 pl-6 mb-10 transition-all duration-700 delay-400 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}>
                    <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed font-light tracking-wide">
                    {slide.description}
                    </p>
                </div>

                {/* CTA Button - Geometric/Sharp */}
                <div
                  className={`transition-all duration-700 delay-500 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <button className="group relative px-10 py-5 bg-transparent overflow-hidden">
                    {/* Skewed Background */}
                    <span className="absolute inset-0 w-full h-full bg-white transform -skew-x-12 transition-all duration-300 group-hover:bg-red-600 group-hover:scale-105 origin-left"></span>
                    
                    {/* Text */}
                    <span className="relative text-black font-black uppercase tracking-wider text-lg transform group-hover:text-white transition-colors duration-300 flex items-center gap-3 skew-x-[-12deg]">
                      <span className="transform skew-x-[12deg]">{slide.buttonText}</span>
                      <svg className="w-5 h-5 transform skew-x-[12deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation - Bottom Right Dashboard Style */}
      <div className="absolute bottom-10 right-8 z-20 flex items-center space-x-6">
        
        {/* Arrows */}
        <div className="flex space-x-2">
            <button
            onClick={prevSlide}
            className="p-4 bg-black/50 border border-gray-600 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform -skew-x-12 hover:scale-110 group backdrop-blur-sm"
            >
                <svg className="w-6 h-6 transform skew-x-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
            onClick={nextSlide}
            className="p-4 bg-black/50 border border-gray-600 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform -skew-x-12 hover:scale-110 group backdrop-blur-sm"
            >
                <svg className="w-6 h-6 transform skew-x-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
      </div>

      {/* Slide Indicators - RPM Counter Style */}
      <div className="absolute bottom-10 left-8 sm:left-16 z-20 flex items-end space-x-2">
        <span className="text-5xl font-black italic text-white leading-none tracking-tighter">
            0{currentSlide + 1}
        </span>
        <span className="text-2xl font-bold text-gray-500 mb-1 italic">
            / 0{slides.length}
        </span>
        
        {/* Progress Bars instead of dots */}
        <div className="flex space-x-2 ml-8 mb-3">
            {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 transform -skew-x-12 transition-all duration-500 ${
                index === currentSlide
                    ? "w-16 bg-red-600 shadow-[0_0_10px_#dc2626]"
                    : "w-4 bg-gray-700 hover:bg-gray-500"
                }`}
            />
            ))}
        </div>
      </div>

      {/* Top Tech Line (Progress Bar) */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-900 z-30">
        <div
          className="h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)] transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Status Indicator (Auto/Manual) */}
      <div className="absolute top-24 right-0 z-20 hidden md:flex items-center bg-black/90 px-6 py-2 transform -skew-x-12 border-l-4 border-red-600 translate-x-2 hover:translate-x-0 transition-transform duration-300">
        <div
          className={`w-2 h-2 transform skew-x-12 mr-3 rounded-full ${
            isAutoPlay ? "bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" : "bg-red-500"
          }`}
        />
        <span className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em] transform skew-x-12">
          {isAutoPlay ? "System : Auto" : "System : Manual"}
        </span>
      </div>

      {/* Warakorn Signature */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-10 pointer-events-none w-full text-center">
          <span className="text-[10vw] sm:text-[120px] font-black text-transparent stroke-text uppercase tracking-widest whitespace-nowrap">WARAKORN</span>
      </div>
      <style jsx>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}