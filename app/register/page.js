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
          title: "REGISTRATION COMPLETE"
        };
      case "error":
        return {
          icon: (
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          ),
          borderColor: "border-red-600",
          textColor: "text-red-600",
          title: "REGISTRATION FAILED"
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

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "", // คำนำหน้า (Title)
    fullname: "",  // ชื่อจริง (First Name)
    lastname: "",  // นามสกุล (Last Name)
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    sex: "",
    birthday: "",
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
    // ถ้าสมัครสำเร็จ ให้เด้งไปหน้า Login หลังจากปิด Modal
    if (modal.type === "success") {
        router.push("/login");
    }
  };

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

    if (!formData.firstname.trim()) newErrors.firstname = "TITLE REQUIRED";
    if (!formData.fullname.trim()) newErrors.fullname = "FIRST NAME REQUIRED";
    if (!formData.lastname.trim()) newErrors.lastname = "LAST NAME REQUIRED";
    if (!formData.username.trim()) newErrors.username = "USERNAME REQUIRED";
    if (!formData.password) newErrors.password = "PASSWORD REQUIRED";
    if (formData.password.length < 6)
      newErrors.password = "MIN LENGTH: 6 CHARS";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "CONFIRMATION REQUIRED";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "PASSWORD MISMATCH";
    if (!formData.address.trim()) newErrors.address = "ADDRESS REQUIRED";
    if (!formData.sex) newErrors.sex = "GENDER SELECT REQUIRED";
    if (!formData.birthday) newErrors.birthday = "DOB REQUIRED";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/users");
    }
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://food-backend-three-topaz.vercel.app/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstname,
            fullname: formData.fullname,
            lastname: formData.lastname,
            username: formData.username,
            password: formData.password,
            address: formData.address,
            sex: formData.sex,
            birthday: formData.birthday,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("User created:", result);

        showModal(
          "success",
          "NEW RIDER ADDED",
          "Profile initialized successfully. You may now access the system."
        );

        setFormData({
          firstname: "",
          fullname: "",
          lastname: "",
          username: "",
          password: "",
          confirmPassword: "",
          address: "",
          sex: "",
          birthday: "",
        });
      } else {
        const error = await response.json();
        showModal(
          "error",
          "SYSTEM ERROR",
          error.message || "Registration sequence failed. Please check inputs."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showModal(
        "error",
        "CONNECTION LOST",
        "Unable to reach server. Check network uplink."
      );
    } finally {
      setIsSubmitting(false);
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

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-red-600 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
               <div className="w-10 h-10 bg-red-600 transform skew-x-[-12deg] flex items-center justify-center border border-white group-hover:bg-white transition-colors">
                <span className="text-white font-black text-lg transform skew-x-[12deg] group-hover:text-red-600">W</span>
              </div>
              <span className="text-xl font-black italic text-white tracking-tighter">WARA<span className="text-red-600">KORN</span></span>
            </div>
            <Link
              href="/login"
              className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest border border-gray-700 px-4 py-2 hover:border-red-600 transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 border border-red-600 bg-red-600/10 transform skew-x-[-12deg] mb-6">
              <span className="text-red-500 font-bold uppercase text-xs tracking-[0.2em] transform skew-x-[12deg] block">
                Join The Crew
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black italic text-white mb-4 tracking-tighter uppercase">
              Rider <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Registration</span>
            </h1>
            <p className="text-gray-500 text-sm font-mono">
              // INITIALIZE NEW USER PROFILE
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-black p-8 sm:p-10 border border-gray-800 relative">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-600"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-600"></div>

            <div className="space-y-8">
              
              {/* --- SECTION 1: IDENTITY --- */}
              <div>
                <h3 className="text-white font-black italic uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center">
                    <span className="text-red-600 mr-2">01.</span> Identity Protocol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Prefix */}
                    <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                        Title
                    </label>
                    <select
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-neutral-900 border text-white font-bold transition-all duration-300 focus:outline-none appearance-none ${
                        errors.firstname
                            ? "border-red-600 focus:border-red-600"
                            : "border-gray-700 focus:border-white"
                        }`}
                    >
                        <option value="">SELECT...</option>
                        <option value="นาย">MR.</option>
                        <option value="นาง">MRS.</option>
                        <option value="นางสาว">MISS</option>
                    </select>
                    {errors.firstname && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.firstname}</p>}
                    </div>

                    {/* First Name */}
                    <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        placeholder="NAME"
                        className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase transition-all duration-300 focus:outline-none ${
                        errors.fullname
                            ? "border-red-600 focus:border-red-600"
                            : "border-gray-700 focus:border-white"
                        }`}
                    />
                    {errors.fullname && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.fullname}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder="SURNAME"
                        className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase transition-all duration-300 focus:outline-none ${
                        errors.lastname
                            ? "border-red-600 focus:border-red-600"
                            : "border-gray-700 focus:border-white"
                        }`}
                    />
                    {errors.lastname && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.lastname}</p>}
                    </div>
                </div>
              </div>

              {/* --- SECTION 2: CREDENTIALS --- */}
              <div>
                <h3 className="text-white font-black italic uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center">
                    <span className="text-red-600 mr-2">02.</span> Access Credentials
                </h3>
                <div className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                            Username / Rider ID
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="CREATE USERNAME"
                            className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase transition-all duration-300 focus:outline-none ${
                            errors.username
                                ? "border-red-600 focus:border-red-600"
                                : "border-gray-700 focus:border-white"
                            }`}
                        />
                        {errors.username && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.username}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="******"
                                className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase transition-all duration-300 focus:outline-none ${
                                errors.password
                                    ? "border-red-600 focus:border-red-600"
                                    : "border-gray-700 focus:border-white"
                                }`}
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="******"
                                className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase transition-all duration-300 focus:outline-none ${
                                errors.confirmPassword
                                    ? "border-red-600 focus:border-red-600"
                                    : "border-gray-700 focus:border-white"
                                }`}
                            />
                            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.confirmPassword}</p>}
                        </div>
                    </div>
                </div>
              </div>

              {/* --- SECTION 3: BIO DATA --- */}
              <div>
                <h3 className="text-white font-black italic uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center">
                    <span className="text-red-600 mr-2">03.</span> Bio Data
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Sex */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                            Gender
                        </label>
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-neutral-900 border text-white font-bold transition-all duration-300 focus:outline-none appearance-none ${
                            errors.sex
                                ? "border-red-600 focus:border-red-600"
                                : "border-gray-700 focus:border-white"
                            }`}
                        >
                            <option value="">SELECT...</option>
                            <option value="ชาย">MALE</option>
                            <option value="หญิง">FEMALE</option>
                        </select>
                        {errors.sex && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.sex}</p>}
                    </div>

                    {/* Birthday */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-neutral-900 border text-white font-bold uppercase transition-all duration-300 focus:outline-none ${
                            errors.birthday
                                ? "border-red-600 focus:border-red-600"
                                : "border-gray-700 focus:border-white"
                            }`}
                        />
                        {errors.birthday && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.birthday}</p>}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
                        Postal Sector / Address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="ENTER FULL ADDRESS..."
                        rows="3"
                        className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-600 font-bold uppercase transition-all duration-300 focus:outline-none resize-none ${
                        errors.address
                            ? "border-red-600 focus:border-red-600"
                            : "border-gray-700 focus:border-white"
                        }`}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500 font-mono">&gt; {errors.address}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-lg hover:bg-white hover:text-black transition-all duration-300 transform skew-x-[-6deg] shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
              >
                <span className="block transform skew-x-[6deg] group-hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            PROCESSING...
                        </>
                    ) : (
                        "INITIATE REGISTRATION"
                    )}
                </span>
              </button>

              {/* Alternative Actions */}
              <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-500 text-xs mb-4 font-mono">ALREADY HAVE A RIDER ID?</p>
                <Link
                  href="/login"
                  className="inline-block w-full px-8 py-3 border border-gray-600 text-gray-300 font-bold uppercase tracking-widest hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  Access Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center pb-10">
            <p className="text-xs text-gray-600 font-mono">
              BY REGISTERING, YOU AGREE TO OUR <a href="#" className="text-gray-400 hover:text-red-500">TERMS OF RACE</a> AND <a href="#" className="text-gray-400 hover:text-red-500">DATA PROTOCOLS</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}