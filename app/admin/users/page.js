"use client";

import React, { useState, useEffect } from "react";
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
          title: "OPERATION SUCCESS"
        };
      case "error":
        return {
          icon: (
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          ),
          borderColor: "border-red-600",
          textColor: "text-red-600",
          title: "SYSTEM ERROR"
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

// Confirm Modal - Critical Warning Style
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-red-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-red-600 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(220,38,38,0.5)] transform skew-x-[-2deg]">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6 border-b border-red-900/50 pb-4">
            <div className="text-red-600 animate-pulse">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
                <h3 className="text-2xl font-black italic text-red-600 uppercase tracking-widest">CRITICAL ALERT</h3>
                <p className="text-white font-bold uppercase text-xs tracking-wider">{title}</p>
            </div>
          </div>

          <div className="text-gray-300 text-sm leading-relaxed mb-8 font-mono border-l-2 border-red-600 pl-4">
            {message} <br/>
            <span className="text-red-500 font-bold block mt-2">&gt;&gt; THIS ACTION CANNOT BE UNDONE.</span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 font-bold uppercase tracking-wider hover:border-white hover:text-white transition-all duration-300 transform skew-x-[-6deg]"
            >
              <span className="block transform skew-x-[6deg]">ABORT</span>
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white font-black uppercase tracking-wider hover:bg-red-700 transition-all duration-300 transform skew-x-[-6deg] shadow-[0_0_15px_rgba(220,38,38,0.6)]"
            >
              <span className="block transform skew-x-[6deg]">CONFIRM DELETE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Modal - Diagnostics Panel Style
const EditModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    fullname: "",
    lastname: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    birthday: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      let formattedBirthday = "";
      if (user.birthday) {
        try {
          formattedBirthday = new Date(user.birthday)
            .toISOString()
            .split("T")[0];
        } catch (e) {
          console.error("Invalid date format", e);
          formattedBirthday = "";
        }
      }

      setFormData({
        id: user.id,
        firstname: user.firstname,
        fullname: user.fullname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        address: user.address,
        sex: user.sex,
        birthday: formattedBirthday,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border-t-4 border-white max-w-2xl w-full mx-4 shadow-2xl transform skew-x-[-1deg] max-h-[90vh] overflow-y-auto">
        <div className="p-1 bg-gradient-to-b from-gray-800 to-black">
            <div className="bg-black p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                    <div className="flex items-center space-x-4">
                    <div className="text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </div>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-widest">
                        MODIFY <span className="text-red-600">RIDER DATA</span>
                    </h3>
                    </div>
                    <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Title</label>
                        <select
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold transition-all duration-300 focus:border-white focus:outline-none appearance-none"
                        >
                        <option value="">SELECT...</option>
                        <option value="นาย">MR.</option>
                        <option value="นาง">MRS.</option>
                        <option value="นางสาว">MISS</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">First Name</label>
                        <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold uppercase transition-all duration-300 focus:border-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Last Name</label>
                        <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold uppercase transition-all duration-300 focus:border-white focus:outline-none"
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Rider ID (Username)</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold uppercase transition-all duration-300 focus:border-white focus:outline-none"
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Gender</label>
                        <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold transition-all duration-300 focus:border-white focus:outline-none appearance-none"
                        >
                        <option value="">SELECT...</option>
                        <option value="ชาย">MALE</option>
                        <option value="หญิง">FEMALE</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Date of Birth</label>
                        <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold transition-all duration-300 focus:border-white focus:outline-none"
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Base Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white font-bold uppercase transition-all duration-300 focus:border-white focus:outline-none resize-none"
                    />
                    </div>

                    <div className="flex space-x-4 pt-6 border-t border-gray-800">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 font-bold uppercase tracking-wider hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 transform skew-x-[-6deg]"
                    >
                        <span className="block transform skew-x-[6deg]">CANCEL</span>
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 px-4 py-3 bg-white text-black font-black uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 transform skew-x-[-6deg]"
                    >
                        <span className="block transform skew-x-[6deg]">
                            {isSaving ? "SAVING..." : "SAVE CHANGES"}
                        </span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
    username: "",
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://food-backend-three-topaz.vercel.app/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        showModal("error", "DATA FETCH FAILED", "Unable to retrieve crew manifest.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showModal(
        "error",
        "CONNECTION LOST",
        "Server uplink failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://food-backend-three-topaz.vercel.app/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        showModal("success", "DISQUALIFIED", "Rider data purged from system.");
        fetchUsers(); 
      } else {
        const error = await response.json();
        showModal(
          "error",
          "PURGE FAILED",
          error.message || "Cannot delete rider data.",
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showModal(
        "error",
        "SYSTEM ERROR",
        "Critical failure during deletion.",
      );
    }
  };

  const handleEdit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://food-backend-three-topaz.vercel.app/api/users/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        showModal("success", "TUNING COMPLETE", "Rider profile updated.");
        setEditModal({ isOpen: false, user: null });
        fetchUsers(); 
      } else {
        const error = await response.json();
        showModal(
          "error",
          "UPDATE FAILED",
          error.message || "Cannot save changes.",
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showModal(
        "error",
        "SYSTEM ERROR",
        "Critical failure during update.",
      );
    }
  };

  const openDeleteConfirm = (userId, username) => {
    setConfirmModal({
      isOpen: true,
      userId,
      username,
    });
  };

  const closeDeleteConfirm = () => {
    setConfirmModal({
      isOpen: false,
      userId: null,
      username: "",
    });
  };

  const confirmDelete = () => {
    handleDelete(confirmModal.userId);
    closeDeleteConfirm();
  };

  const openEditModal = (user) => {
    setEditModal({
      isOpen: true,
      user,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      user: null,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

      {/* Modals */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
        title="CONFIRM DISQUALIFICATION"
        message={`Are you sure you want to delete rider "${confirmModal.username}"?`}
      />

      <EditModal
        isOpen={editModal.isOpen}
        onClose={closeEditModal}
        onSave={handleEdit}
        user={editModal.user}
      />

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800 relative z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 transform skew-x-[-12deg] flex items-center justify-center border border-white">
                <span className="text-white font-black text-lg transform skew-x-[12deg]">DB</span>
              </div>
              <span className="text-2xl font-black italic text-white uppercase tracking-tighter">
                Crew <span className="text-red-600">Management</span>
              </span>
            </div>
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-6 py-2 border border-gray-600 text-gray-300 font-bold uppercase tracking-wider hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 transform skew-x-[-12deg] disabled:opacity-50"
            >
              <span className="block transform skew-x-[12deg]">
                {loading ? "SCANNING..." : "REFRESH DATA"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-r-4 border-gray-800 mb-4"></div>
            <span className="text-white font-bold uppercase tracking-widest animate-pulse">Establishing Uplink...</span>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="mb-10 flex items-center bg-black border border-gray-800 p-6 transform skew-x-[-1deg]">
                <div className="flex items-center transform skew-x-[1deg]">
                    <div className="w-12 h-12 bg-neutral-900 border border-gray-700 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Riders</p>
                        <p className="text-3xl font-black text-white italic">{users.length} <span className="text-sm font-normal text-gray-600 not-italic">/ ACTIVE UNITS</span></p>
                    </div>
                </div>
            </div>

            {/* Users Grid */}
            {users.length === 0 ? (
              <div className="text-center py-20 bg-black/50 border border-dashed border-gray-800">
                <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                  <span className="text-gray-600 text-3xl">Ø</span>
                </div>
                <p className="text-gray-400 font-mono uppercase tracking-widest">No Crew Data Found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="group bg-neutral-900 border border-gray-800 hover:border-red-600 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Effect */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 transform rotate-45 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6 border-b border-gray-800 pb-4">
                        <div className="flex items-center">
                          <div className="w-14 h-14 bg-black border border-gray-700 flex items-center justify-center text-white font-black text-xl italic group-hover:text-red-600 transition-colors">
                            {user.fullname?.charAt(0) || user.username?.charAt(0) || "?"}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors">
                              {user.firstname} {user.fullname} {user.lastname}
                            </h3>
                            <p className="text-xs font-mono text-gray-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-gray-600 bg-gray-900 px-2 py-1 uppercase tracking-widest border border-gray-800">
                          ID: {user.id}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 font-bold uppercase">Class</span>
                          <span className="text-gray-300 font-mono uppercase">
                            {user.sex || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 font-bold uppercase">Spawn Date</span>
                          <span className="text-gray-300 font-mono">
                            {user.birthday
                              ? new Date(user.birthday).toLocaleDateString(
                                  "th-TH",
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500 font-bold uppercase block mb-1">Base Location</span>
                          <p className="text-gray-400 font-light truncate">
                            {user.address || "Unknown Sector"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="flex-1 px-3 py-2 border border-gray-600 text-gray-400 text-xs font-bold uppercase tracking-wider hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 group/btn"
                        >
                          <span className="flex items-center justify-center gap-2">
                             <span>TUNE</span>
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            openDeleteConfirm(user.id, user.username)
                          }
                          className="flex-1 px-3 py-2 bg-red-900/20 border border-red-900 text-red-500 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                        >
                          DISQUALIFY
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}