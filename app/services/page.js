"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Services() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Helper function for Icons (แทนที่ Emoji เดิม)
  const getIcon = (category) => {
    switch (category) {
      case "Design":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
        );
      case "Development":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        );
      case "Mobile":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        );
      case "Strategy":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
        );
      case "Maintenance":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        );
      case "Analytics":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        );
      default:
        return null;
    }
  };

  const servicesData = [
    {
      id: 1,
      category: "Design",
      title: "UI/UX Architecture",
      description:
        "Engineered interfaces for maximum user engagement. Precision wireframing to high-fidelity visual prototypes.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
      ],
      price: "Start ฿25,000",
      duration: "2-4 Weeks",
    },
    {
      id: 2,
      category: "Development",
      title: "Web Mechanics",
      description:
        "Full-stack web engines built with high-performance frameworks and scalable architecture.",
      features: [
        "React/Next.js",
        "Backend APIs",
        "Database Design",
        "Deployment",
      ],
      price: "Start ฿50,000",
      duration: "4-8 Weeks",
    },
    {
      id: 3,
      category: "Mobile",
      title: "App Engineering",
      description:
        "Native and cross-platform mobile units designed for speed and reliability on iOS and Android.",
      features: [
        "iOS Development",
        "Android Systems",
        "React Native",
        "Store Launch",
      ],
      price: "Start ฿80,000",
      duration: "6-12 Weeks",
    },
    {
      id: 4,
      category: "Strategy",
      title: "Digital Tuning",
      description:
        "Strategic mapping to optimize your business performance in the competitive digital circuit.",
      features: [
        "Digital Strategy",
        "Tech Audit",
        "Growth Planning",
        "Team Training",
      ],
      price: "Start ฿15,000",
      duration: "1-2 Weeks",
    },
    {
      id: 5,
      category: "Maintenance",
      title: "Pit Crew Support",
      description:
        "24/7 technical support and maintenance to keep your digital assets running at peak performance.",
      features: [
        "Bug Fixes",
        "Security Updates",
        "Optimization",
        "24/7 Support",
      ],
      price: "Start ฿8,000/mo",
      duration: "Ongoing",
    },
    {
      id: 6,
      category: "Analytics",
      title: "Telemetry Data",
      description:
        "Advanced data analytics to track performance metrics and drive decision making.",
      features: [
        "Data Viz",
        "Dashboards",
        "Reporting",
        "AI Integration",
      ],
      price: "Start ฿35,000",
      duration: "3-6 Weeks",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description:
        "Analyzing track conditions and requirements.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "Mapping the perfect racing line and plan.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Assembly and tuning with precision parts.",
    },
    {
      step: "04",
      title: "Launch",
      description:
        "Green light. Deploy and monitor performance.",
    },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(entry.target.dataset.sectionId);
            setVisibleSections((prev) => [...new Set([...prev, sectionId])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 relative overflow-hidden">
      
      {/* Background Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block transform skew-x-[-12deg] mb-8">
             <div className="px-6 py-2 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                <span className="text-white text-sm font-black uppercase tracking-[0.2em] transform skew-x-[12deg] block">
                  Service Garage
                </span>
             </div>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black italic text-white mb-8 tracking-tighter uppercase leading-tight">
            Engineered For <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-500">Maximum Performance</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light border-r-4 border-red-600 pr-6">
            We deliver high-octane digital experiences through aggressive design, 
            cutting-edge technology, and mechanical precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-white text-black font-black uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all duration-300 transform skew-x-[-12deg] hover:scale-105 shadow-lg group">
              <span className="block transform skew-x-[12deg]">Start Project</span>
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-gray-600 text-white font-black uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all duration-300 transform skew-x-[-12deg]">
              <span className="block transform skew-x-[12deg]">Our Portfolio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-neutral-800/50 border-y border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              Modification <span className="text-red-600">Specs</span>
            </h2>
            <div className="h-1 w-24 bg-red-600 mx-auto transform skew-x-[-12deg]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={service.id}
                className={`group relative bg-neutral-900 p-8 hover:bg-neutral-800 transition-all duration-500 border-l-4 border-transparent hover:border-red-600 overflow-hidden ${
                  visibleSections.includes(service.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ 
                    transitionDelay: `${index * 100}ms`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
                }}
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-red-600/5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

                <div className="relative z-10 flex justify-between items-start mb-6">
                    <div className="text-red-600 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                        {getIcon(service.category)}
                    </div>
                    <div className="px-3 py-1 bg-gray-800 text-xs font-bold uppercase tracking-wider text-gray-400 transform skew-x-[-12deg] border border-gray-700">
                        <span className="block transform skew-x-[12deg]">{service.category}</span>
                    </div>
                </div>

                <h3 className="relative z-10 text-2xl font-black italic text-white mb-4 uppercase group-hover:translate-x-2 transition-transform duration-300">
                  {service.title}
                </h3>

                <p className="relative z-10 text-gray-400 leading-relaxed mb-6 font-light text-sm">
                  {service.description}
                </p>

                <div className="relative z-10 space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-red-600 transform rotate-45 mr-3 group-hover:bg-white transition-colors"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="relative z-10 border-t border-gray-800 pt-6 mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold">Base Price</span>
                        <span className="text-lg font-black text-white italic tracking-wide">
                        {service.price}
                        </span>
                    </div>
                    <span className="text-xs text-red-500 font-bold uppercase border border-red-900 bg-red-900/20 px-2 py-1">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (Circuit Track Style) */}
      <section className="py-20 bg-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 border border-red-600 rounded-none transform skew-x-[-12deg] mb-6">
                <span className="text-red-600 text-sm font-bold uppercase tracking-widest transform skew-x-[12deg] block">Race Strategy</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Circuit</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gray-800 z-0">
                 <div className="h-full bg-red-600 w-full origin-left transform scale-x-0 animate-pulse"></div>
            </div>

            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group relative z-10"
                ref={(el) =>
                  (sectionRefs.current[servicesData.length + index] = el)
                }
                data-section-id={100 + index}
              >
                <div
                  className={`relative mx-auto w-24 h-24 mb-6 transform transition-all duration-700 ${
                    visibleSections.includes(100 + index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                    {/* Hexagon/Polygon Shape */}
                    <div className="absolute inset-0 bg-neutral-800 transform skew-x-[-12deg] border-2 border-gray-700 group-hover:border-red-600 group-hover:bg-red-600 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black italic text-white transform skew-x-[-12deg]">{step.step}</span>
                    </div>
                </div>

                <h3 className="text-xl font-black italic text-white mb-2 uppercase tracking-wide">
                  {step.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section (Dashboard Style) */}
      <section className="py-20 bg-neutral-800 border-t border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-gray-700/50">
            {[
              { number: "200+", label: "Projects Finished" },
              { number: "50+", label: "Happy Crews" },
              { number: "5+", label: "Years on Track" },
              { number: "99%", label: "Win Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center pl-4">
                <div className="text-5xl sm:text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2 font-mono">
                  {stat.number}
                </div>
                <div className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs transform -skew-x-12">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Pit Stop) */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
            Ready To <span className="text-red-600">Race?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light">
            Bring your project to our garage. We'll tune it for speed and performance.
          </p>

          <div className="bg-neutral-800 p-1 border border-gray-700 transform skew-x-[-2deg]">
            <div className="bg-neutral-900 p-8 sm:p-10 border border-gray-800 transform skew-x-[2deg]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="RIDER NAME"
                  className="px-4 py-4 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all duration-300 font-bold uppercase tracking-wider text-sm skew-x-[-6deg]"
                />
                <input
                  type="email"
                  placeholder="CONTACT EMAIL"
                  className="px-4 py-4 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all duration-300 font-bold uppercase tracking-wider text-sm skew-x-[-6deg]"
                />
              </div>

              <textarea
                placeholder="PROJECT DETAILS / SPECS..."
                rows="4"
                className="w-full px-4 py-4 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all duration-300 mb-8 resize-none font-bold uppercase tracking-wider text-sm skew-x-[-6deg]"
              ></textarea>

              <button className="w-full px-8 py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-lg hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                <span className="block transform skew-x-[12deg]">Ignite Project</span>
              </button>
            </div>
          </div>

          <div className="mt-12 text-center border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
              Direct Line To The Garage
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
                 <a
                href="mailto:beam72292@gmail.com"
                className="text-white hover:text-red-500 font-black italic text-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                beam72292@gmail.com
              </a>
              <span className="hidden sm:block text-gray-700">|</span>
              <a
                href="tel:0990069414"
                className="text-white hover:text-red-500 font-black italic text-lg transition-colors flex items-center gap-2"
              >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                0990069414
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}