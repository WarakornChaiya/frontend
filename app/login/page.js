"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Modal Component - System Alert Style
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
          title: "ACCESS GRANTED"
        };
      case "error":
        return {
          icon: (
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          ),
          borderColor: "border-red-600",
          textColor: "text-red-600",
          title: "ACCESS DENIED"
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

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/users");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "RIDER ID REQUIRED";
    }

    if (!formData.password) {
      newErrors.password = "SECURITY KEY REQUIRED";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://food-backend-three-topaz.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        // Show success modal
        showModal(
          "success",
          "AUTHENTICATED",
          "Credentials verified. Initiating dashboard sequence..."
        );

        // Reset form
        setFormData({
          username: "",
          password: "",
        });

        // Redirect
        setTimeout(() => {
          window.location.href = "/admin/users";
        }, 2000);
      } else {
        const error = await response.json();
        showModal(
          "error",
          "AUTHENTICATION FAILED",
          error.message || "Invalid Rider ID or Security Key. Please verify credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showModal(
        "error",
        "CONNECTION LOST",
        "Unable to reach the mainframe. Check your network uplink."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)] mt-15">
        <div className="max-w-md w-full">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 border border-red-600 bg-red-600/10 transform skew-x-[-12deg] mb-6">
              <span className="text-red-500 font-bold uppercase text-xs tracking-[0.2em] transform skew-x-[12deg] block">
                Secure Access
              </span>
            </div>
            <h1 className="text-5xl font-black italic text-white mb-4 tracking-tighter uppercase">
              Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Engine</span>
            </h1>
            <p className="text-gray-500 text-sm font-mono">
              // ENTER CREDENTIALS TO ACCESS DASHBOARD
            </p>
          </div>

          {/* Login Form Container */}
          <div className="relative group">
            {/* Decorative Borders */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-gray-600 opacity-50 skew-x-[-2deg] group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative bg-black p-8 sm:p-10 border border-gray-800 skew-x-[-2deg]">
              <div className="transform skew-x-[2deg] space-y-6">
                
                {/* Username */}
                <div>
                  <label className="block text-xs font-black text-white mb-2 uppercase tracking-widest">
                    Rider ID <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="USERNAME"
                      className={`w-full px-4 py-4 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:outline-none transition-all duration-300 ${
                        errors.username
                          ? "border-red-600 focus:border-red-600"
                          : "border-gray-700 focus:border-white"
                      }`}
                    />
                    <div className="absolute right-3 top-4 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-xs text-red-500 font-mono tracking-wide">&gt;&gt; {errors.username}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-black text-white mb-2 uppercase tracking-widest">
                    Security Key <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="PASSWORD"
                      className={`w-full px-4 py-4 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase tracking-wider focus:outline-none transition-all duration-300 ${
                        errors.password
                          ? "border-red-600 focus:border-red-600"
                          : "border-gray-700 focus:border-white"
                      }`}
                    />
                    <div className="absolute right-3 top-4 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs text-red-500 font-mono tracking-wide">&gt;&gt; {errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors uppercase font-bold tracking-wider"
                  >
                    Lost Key?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-lg hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group mt-4"
                >
                  <span className="block transform skew-x-[12deg] group-hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            CONNECTING...
                        </>
                    ) : (
                        "IGNITE SYSTEM"
                    )}
                  </span>
                </button>

                {/* Alternative Actions */}
                <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                  <p className="text-gray-500 text-xs mb-4 font-mono">NO ACCESS CREDENTIALS?</p>
                  <Link
                    href="/register"
                    className="inline-block w-full px-8 py-3 border border-gray-600 text-gray-300 font-bold uppercase tracking-widest hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    Register New ID
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600 font-mono">
              SYSTEM SECURED BY{" "}
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                WARAKORN PROTOCOLS
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}