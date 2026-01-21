"use client";

import React, { useState, useEffect, useRef } from "react";

export default function About() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Education data
  const education = [
    {
      id: 1,
      degree: "Information Technology",
      institution: "Chiang Mai Technical College",
      year: "2024",
      description: "Focused on Network Systems, IoT, and Basic Web Development.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
      ),
    },
  ];

  // Skills data (Adjusted Levels)
  const skills = [
    { name: "React & Next.js", level: 65, color: "bg-red-600" },
    { name: "Node.js", level: 60, color: "bg-red-500" },
    { name: "UI/UX Design", level: 70, color: "bg-white" },
    { name: "Database", level: 55, color: "bg-gray-500" },
    { name: "HTML/CSS", level: 80, color: "bg-red-700" },
    { name: "Network Config", level: 60, color: "bg-gray-400" },
  ];

  // Stats data
  const stats = [
    { number: "5+", label: "Projects Built", icon: "🛠️" },
    { number: "1+", label: "Year Experience", icon: "⏱️" },
    { number: "100%", label: "Dedication", icon: "🔥" },
    { number: "4", label: "Core Skills", icon: "⚡" },
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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 overflow-hidden relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-1 border-l-4 border-red-600 bg-neutral-800 transform skew-x-[-12deg] mb-8">
                <span className="text-white text-sm font-black uppercase tracking-[0.2em] transform skew-x-[12deg] block">
                  Driver Profile
                </span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black italic text-white mb-8 tracking-tighter uppercase leading-none">
                Hello, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                  I'm Warakorn
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8 font-light border-l-2 border-gray-700 pl-4">
                (บีม) Junior Web Developer & Tech Enthusiast. <br/>
                Passionate about building functional digital engines and learning new technologies. 
                Focusing on frontend performance and clean code architecture.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-12deg] shadow-lg group"
                >
                  <span className="block transform skew-x-[12deg]">Contact Me</span>
                </a>
                <a
                  href="#education"
                  className="px-8 py-4 border-2 border-gray-600 text-white font-black uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all duration-300 transform skew-x-[-12deg]"
                >
                  <span className="block transform skew-x-[12deg]">My Journey</span>
                </a>
              </div>
            </div>

            {/* Right side - Photo */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative group">
                {/* Photo Frame - Geometric/Tech */}
                <div className="w-80 h-80 relative z-10 bg-neutral-800 transform rotate-3 border-4 border-gray-800 transition-transform duration-500 group-hover:rotate-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-700">
                        {/* Placeholder for Image */}
                         <img
                          src="./bexm.jpg" // ใช้รูป placeholder ไปก่อน หรือเปลี่ยนเป็นรูปจริง
                          alt="Warakorn Chaiya"
                          width={320}
                          height={320}
                          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-80 h-80 border-2 border-red-600 z-0 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="absolute -bottom-6 -left-6 bg-neutral-900 px-4 py-2 border border-gray-700 z-20">
                    <span className="text-red-600 font-mono text-xs font-bold">ID: 65319010005</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-800 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={index + 1}
                className={`text-center transform transition-all duration-700 ${
                  visibleSections.includes(index + 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 grayscale hover:grayscale-0 transition-all">{stat.icon}</div>
                <div className="text-5xl font-black italic text-white mb-2 font-mono">
                  {stat.number}
                </div>
                <div className="text-red-600 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              Academic <span className="text-gray-600">Track</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Building the foundation for future innovations.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                ref={(el) => (sectionRefs.current[index + 10] = el)}
                data-section-id={edu.id + 10}
                className={`bg-neutral-800 p-8 border-l-4 border-red-600 transform transition-all duration-700 hover:bg-neutral-800/80 ${
                  visibleSections.includes(edu.id + 10)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="text-red-600 p-4 bg-black border border-gray-800">
                    {edu.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-2xl font-black italic text-white uppercase tracking-wide">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-bold text-black bg-white px-3 py-1 transform skew-x-[-12deg] mt-2 md:mt-0">
                        <span className="block transform skew-x-[12deg]">{edu.year}</span>
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-red-600 mb-4 uppercase tracking-wider">
                      {edu.institution}
                    </h4>

                    <p className="text-gray-400 leading-relaxed font-light">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - RPM Gauges Style */}
      <section className="py-20 bg-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              Technical <span className="text-red-600">Specs</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Current proficiency levels and toolset capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index + 20] = el)}
                data-section-id={index + 20}
                className={`transform transition-all duration-700 ${
                  visibleSections.includes(index + 20)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider italic">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-mono text-red-500 font-bold">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-black h-4 skew-x-[-12deg] border border-gray-700 p-0.5">
                  <div
                    className={`h-full ${skill.color} transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]`}
                    style={{
                      width: visibleSections.includes(index + 20)
                        ? `${skill.level}%`
                        : "0%",
                      transitionDelay: `${index * 100 + 300}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-12 tracking-tighter uppercase">
            Core <span className="text-gray-600">Values</span>
          </h2>

          <div className="bg-neutral-800 p-1 transform skew-x-[-1deg]">
            <div className="bg-black p-10 sm:p-16 border border-gray-800 transform skew-x-[1deg] relative">
               {/* Quote Icon */}
               <div className="absolute top-6 left-6 text-6xl text-gray-800 font-serif leading-none">“</div>
               
              <blockquote className="text-2xl font-bold text-white italic mb-8 relative z-10 leading-relaxed">
                "Functionality drives design. Code is the engine, but User Experience is the fuel."
              </blockquote>

              <p className="text-gray-400 leading-relaxed mb-12 font-light">
                I believe in building systems that are not just robust, but also intuitive. 
                Every line of code should serve a purpose, and every interface should tell a story.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-gray-800 pt-8">
                {[
                  {
                    title: "LEARN FAST",
                    description: "Adapt to new tech rapidly.",
                    icon: "🚀",
                  },
                  {
                    title: "CODE CLEAN",
                    description: "Maintainable & Scalable.",
                    icon: "💻",
                  },
                  {
                    title: "STAY HUMBLE",
                    description: "Always room to grow.",
                    icon: "🌱",
                  },
                ].map((principle, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{principle.icon}</div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 group-hover:text-red-600 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-red-600 relative overflow-hidden">
        {/* Decorative Speed Lines */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black italic text-white mb-6 tracking-tighter uppercase">
            Start The <span className="text-black">Engine</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 font-bold max-w-2xl mx-auto">
            Ready to collaborate on a new project or just want to talk tech? I'm always open to new opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#contact"
              className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-12deg] shadow-xl"
            >
              <span className="block transform skew-x-[12deg]">Get In Touch</span>
            </a>
            <a
              href="mailto:beam72292@gmail.com"
              className="px-10 py-5 border-4 border-black text-black font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 transform skew-x-[-12deg]"
            >
              <span className="block transform skew-x-[12deg]">Send Email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}