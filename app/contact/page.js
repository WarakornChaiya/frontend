"use client";

import React, { useState, useEffect, useRef } from "react";

// Modal Component - Dashboard Alert Style
const Modal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getModalStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          ),
          borderColor: "border-green-500",
          textColor: "text-green-500",
          title: "SYSTEM ONLINE"
        };
      case "error":
        return {
          icon: (
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          ),
          borderColor: "border-red-600",
          textColor: "text-red-600",
          title: "SYSTEM FAILURE"
        };
      default:
        return {
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ),
          borderColor: "border-blue-500",
          textColor: "text-blue-500",
          title: "SYSTEM INFO"
        };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-neutral-900 border-l-4 ${styles.borderColor} max-w-md w-full mx-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] transform skew-x-[-2deg]`}>
        <div className="p-1 bg-gradient-to-r from-gray-800 to-transparent">
             <div className="bg-black p-6 border border-gray-800">
                <div className="flex items-center space-x-4 mb-4">
                    <div className={`${styles.textColor}`}>
                    {styles.icon}
                    </div>
                    <div>
                        <h3 className={`text-xl font-black italic uppercase tracking-widest ${styles.textColor}`}>
                        {styles.title}
                        </h3>
                        <p className="text-white font-bold uppercase text-sm tracking-wider">{title}</p>
                    </div>
                </div>

                <div className="mb-8 border-t border-gray-800 pt-4">
                    <p className="text-gray-400 text-sm leading-relaxed font-mono">
                    &gt;&gt; {message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className={`w-full px-4 py-3 bg-white text-black font-black uppercase tracking-widest hover:bg-${styles.textColor.split('-')[1]}-500 hover:text-white transition-all duration-300 transform skew-x-[-6deg]`}
                >
                    <span className="block transform skew-x-[6deg]">ACKNOWLEDGE</span>
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRefs = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const showModal = (type, title, message) => {
    setModal({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: "info",
      title: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      id: 1,
      title: "Email Base",
      description: "Direct Uplink",
      value: "beam72292@gmail.com",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      ),
      link: "mailto:beam72292@gmail.com",
    },
    {
      id: 2,
      title: "Hotline",
      description: "Emergency Response",
      value: "099-006-9414",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      ),
      link: "tel:0990069414",
    },
    {
      id: 3,
      title: "The Garage",
      description: "HQ Location",
      value: "Chiang Mai Tech.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      ),
      link: "#",
    },
    {
      id: 4,
      title: "Live Comms",
      description: "Real-time Support",
      value: "System Online",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      ),
      link: "#",
    },
  ];

  const serviceOptions = [
    "UI/UX Architecture",
    "Web Mechanics",
    "App Engineering",
    "Digital Tuning",
    "Pit Crew Support",
    "Telemetry Analytics",
    "Custom Modification",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "RIDER IDENTIFICATION REQUIRED";
    }

    if (!formData.email.trim()) {
      newErrors.email = "CONTACT FREQUENCY REQUIRED";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "INVALID FREQUENCY FORMAT";
    }

    if (!formData.message.trim()) {
      newErrors.message = "MISSION DETAILS REQUIRED";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showModal(
        "success",
        "TRANSMISSION COMPLETE",
        "Message received by HQ. Stand by for response within 24 hours."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      showModal(
        "error",
        "TRANSMISSION FAILED",
        "Signal lost. Please re-establish connection or use direct line."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-20 relative overflow-hidden">
      
      {/* Background Tech Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-6 py-2 border-l-4 border-red-600 bg-neutral-800 transform skew-x-[-12deg] mb-8 shadow-lg">
            <span className="text-sm font-black text-white uppercase tracking-[0.2em] transform skew-x-[12deg] block">
              Signal Channel Open
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black italic text-white mb-8 tracking-tighter uppercase">
            Initiate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
              Contact
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light border-r-4 border-gray-700 pr-6">
            Ready to tune your digital performance? Our pit crew is standing by.
            Connect with us to start your engine.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-neutral-800/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              Communication <span className="text-red-600">Links</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm tracking-wider">
              // SELECT YOUR CHANNEL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={method.id}
                href={method.link}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={method.id}
                className={`block bg-neutral-900 p-8 border border-gray-800 hover:border-red-600 transition-all duration-500 transform group relative overflow-hidden ${
                  visibleSections.includes(method.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ 
                    transitionDelay: `${index * 100}ms`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
                }}
              >
                {/* Red Glow on Hover */}
                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="text-red-600 mb-6 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110 origin-left">
                  {method.icon}
                </div>

                <h3 className="text-xl font-black italic text-white mb-2 uppercase tracking-wide">
                  {method.title}
                </h3>

                <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-wider">
                  {method.description}
                </p>

                <p className="text-white font-mono text-sm group-hover:text-red-500 transition-colors">
                  {method.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              Transmit <span className="text-red-600">Data</span>
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Send your project specifications directly to our engineering team.
            </p>
          </div>

          <div className="bg-neutral-800 p-1 transform skew-x-[-1deg]">
            <div className="bg-black p-8 sm:p-12 border border-gray-800 transform skew-x-[1deg]">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-xs font-black text-red-600 mb-2 uppercase tracking-[0.1em]">
                    Rider ID *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ENTER FULL NAME"
                    className={`w-full px-4 py-4 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:outline-none transition-all duration-300 ${
                      errors.name
                        ? "border-red-600 focus:border-red-600"
                        : "border-gray-700 focus:border-white"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500 font-mono tracking-wide">&gt;&gt; {errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-red-600 mb-2 uppercase tracking-[0.1em]">
                    Comms Frequency *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ENTER EMAIL ADDRESS"
                    className={`w-full px-4 py-4 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-red-600 focus:border-red-600"
                        : "border-gray-700 focus:border-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500 font-mono tracking-wide">&gt;&gt; {errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-[0.1em]">
                    Direct Line
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-4 py-4 bg-neutral-900 border border-gray-700 text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:border-white focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-[0.1em]">
                    Team / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="ENTER COMPANY NAME"
                    className="w-full px-4 py-4 bg-neutral-900 border border-gray-700 text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:border-white focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="mb-8">
                <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-[0.1em]">
                  Requested Mod
                </label>
                <div className="relative">
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-neutral-900 border border-gray-700 text-white font-bold uppercase tracking-wider focus:border-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                        <option value="">SELECT SERVICE MODULE</option>
                        {serviceOptions.map((service, index) => (
                        <option key={index} value={service}>
                            {service}
                        </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-red-600">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-10">
                <label className="block text-xs font-black text-red-600 mb-2 uppercase tracking-[0.1em]">
                  Specs & Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="DESCRIBE YOUR PROJECT REQUIREMENTS..."
                  rows="6"
                  className={`w-full px-4 py-4 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:outline-none transition-all duration-300 resize-none ${
                    errors.message
                      ? "border-red-600 focus:border-red-600"
                      : "border-gray-700 focus:border-white"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-xs text-red-500 font-mono tracking-wide">&gt;&gt; {errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-lg hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-6deg] shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="block transform skew-x-[6deg] group-hover:scale-105 transition-transform">
                  {isSubmitting ? "TRANSMITTING..." : "IGNITE MESSAGE"}
                </span>
              </button>

              {/* Privacy Notice */}
              <div className="mt-8 text-center border-t border-gray-800 pt-6">
                <p className="text-xs text-gray-500 font-mono">
                  By transmitting, you agree to our{" "}
                  <a
                    href="#"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    DATA PROTOCOLS
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              Technical <span className="text-gray-500">FAQ</span>
            </h2>
          </div>

          <div className="grid gap-6">
            {[
              {
                question: "How long does a modification take?",
                answer:
                  "Project lap times vary. Standard tunes take 2-4 weeks, while full engine rebuilds (complex apps) can take 3-6 months. We provide a detailed race schedule upon assessment.",
              },
              {
                question: "Do you provide Pit Crew support?",
                answer:
                  "Affirmative. We offer ongoing maintenance packages to keep your system running at peak RPM. Bug fixes, security patches, and performance tuning included.",
              },
              {
                question: "Can you integrate with our current team?",
                answer:
                  "We deploy seamlessly alongside existing crews. Whether you need a lead mechanic or specialized support, we adapt to your workflow.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-neutral-800 p-6 border-l-4 border-gray-700 hover:border-red-600 transition-colors duration-300"
              >
                <h3 className="text-lg font-black italic text-white mb-2 uppercase tracking-wide">
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time - Lap Times */}
      <section className="py-20 bg-black relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border border-gray-800 p-8 sm:p-12 bg-neutral-900/50 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative background line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

            <h2 className="text-3xl sm:text-4xl font-black italic text-white mb-6 uppercase tracking-tight">
              Rapid Response <span className="text-red-600">Guaranteed</span>
            </h2>
            <p className="text-gray-400 mb-12 leading-relaxed font-light">
              We value speed. Expect a response signal within 24 hours (business days).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { time: "< 2 HRS", label: "Initial Ack.", icon: "⚡" },
                { time: "< 24 HRS", label: "Full Diagnostics", icon: "📋" },
                { time: "< 48 HRS", label: "Project Launch", icon: "🚀" },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <div className="text-3xl font-black italic text-white mb-2 font-mono group-hover:text-red-500 transition-colors">
                    {item.time}
                  </div>
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}