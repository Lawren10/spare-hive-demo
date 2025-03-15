"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
import ProfileForm from "./profile-form";

export default function AdminInterface() {
  // Always show profile by default
  const [showProfile, setShowProfile] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#1A1A1A]">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#1A1A1A] border-r border-[#2A2A2A] p-4">
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
          {/* <div className="flex items-center text-yellow-500 mb-2">
            <span className="mr-2">Configuration Hub</span>
            <span className="text-xs">›</span>
          </div> */}
          <div className="flex items-center px-4 py-2 rounded cursor-pointer bg-yellow-500 text-black">
            <User className="h-4 w-4 mr-2" />
            <span>My Profile</span>
          </div>
        </div>
      </div>

      {/* Main Content - Always show profile */}
      <ProfileForm onClose={() => {}} />
    </div>
  );
}
