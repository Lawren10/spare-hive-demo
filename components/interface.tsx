"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { User, Menu, X } from "lucide-react";
import ProfileForm from "./profile-form";

export default function AdminInterface() {
  // Always show profile by default
  const [showProfile, setShowProfile] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        sidebarOpen &&
        window.innerWidth < 768 &&
        !target.closest("[data-sidebar]")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col md:flex-row">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden flex items-center justify-between bg-[#1A1A1A] border-b border-[#2A2A2A] p-4">
        <div className="flex items-center">
          <Image src="/logo.png" alt="SpareHive Logo" width={100} height={32} />
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar - Slides in from left on mobile */}
      <div
        data-sidebar
        className={`
          fixed md:static
          top-0 md:top-0
          left-0
          h-screen
          z-30
          w-[80%] sm:w-[300px] md:w-64
          bg-[#1A1A1A] 
          border-r border-[#2A2A2A] 
          p-4
          transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-8">
          {/* Centered logo */}
          <div className="flex justify-center items-center mb-8">
            <Image
              src="/logo.png"
              alt="SpareHive Logo"
              width={120}
              height={40}
            />
          </div>
          <div className="flex items-center text-yellow-500 mb-2">
            <span className="mr-2">Configuration Hub</span>
            <span className="text-xs">›</span>
          </div>
          <div
            className="flex items-center px-4 py-2 rounded cursor-pointer bg-yellow-500 text-black"
            onClick={() => {
              setShowProfile(true);
              if (window.innerWidth < 768) {
                setSidebarOpen(false);
              }
            }}
          >
            <User className="h-4 w-4 mr-2" />
            <span>My Profile</span>
          </div>
        </div>
      </div>

      {/* Main Content - Always show profile */}
      <div className="flex-1">
        <ProfileForm onClose={() => {}} />
      </div>
    </div>
  );
}
