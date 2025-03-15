"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X } from "lucide-react";

interface MerchantData {
  merchantId: number;
  businessName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  county: string;
  city: string;
  state: string;
  zipCode: string;
  countryCode: string;
  country: string;
  pendingMerchantId?: number;
  registrationNumber: string;
  userProfileId: number;
  [key: string]: any; // For any additional fields
}

interface ProfileFormProps {
  onClose?: () => void;
}

export default function ProfileForm({ onClose }: ProfileFormProps) {
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://spareshive-api-1523959fece7.herokuapp.com/merchant/6"
        );

        if (response.status === 401) {
          console.log("Authentication required. Using mock data instead.");
          // Provide mock data as fallback based on the provided sample
          setMerchant({
            merchantId: 6,
            businessName: "test",
            email: "lovepih494@excederm.com",
            phoneNumber: "7894561230",
            addressLine1: "ahmedabad",
            addressLine2: "test",
            addressLine3: "ahmedabad",
            county: "in",
            city: "ahmedabad",
            state: "gujrat",
            zipCode: "78941",
            countryCode: "091",
            country: "india",
            pendingMerchantId: 7,
            registrationNumber: "789456584",
            userProfileId: 48,
          });
          return;
        }

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        setMerchant(data);
      } catch (err) {
        console.error("Error fetching merchant data:", err);

        // Provide mock data as fallback for any error
        setMerchant({
          merchantId: 6,
          businessName: "test",
          email: "lovepih494@excederm.com",
          phoneNumber: "7894561230",
          addressLine1: "ahmedabad",
          addressLine2: "test",
          addressLine3: "ahmedabad",
          county: "in",
          city: "ahmedabad",
          state: "gujrat",
          zipCode: "78941",
          countryCode: "091",
          country: "india",
          pendingMerchantId: 7,
          registrationNumber: "789456584",
          userProfileId: 48,
        });

        setError(
          "Using demo data. " +
            (err instanceof Error ? err.message : "An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantData();
  }, []);

  const handleSave = () => {
    // Here you would typically save the data to the API
    // For now, we'll just exit edit mode
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex-1 p-8 bg-[#1A1A1A]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white">
          {`${isEditing ? "Edit" : ""} My Profile`}
        </h1>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {error ? (
        <div className="bg-yellow-900/20 border border-yellow-800 text-yellow-300 p-4 rounded-lg mb-6">
          <p>Note: {error}</p>
          <p className="mt-2 text-sm">
            This form is currently displaying mock data. To connect to the real
            API, you'll need to provide authentication credentials.
          </p>
        </div>
      ) : null}

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-400">Loading profile data...</p>
        </div>
      ) : merchant ? (
        <div className="bg-[#1A1A1A] rounded-lg max-w-4xl mx-auto">
          {isEditing ? (
            // Edit Mode - Form with input fields
            <form className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2">
                  Business Details
                </h2>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Business Name
                </label>
                <Input
                  defaultValue={merchant.businessName}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Registration Number
                </label>
                <Input
                  defaultValue={merchant.registrationNumber}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 mt-4 border-b border-[#2A2A2A] pb-2">
                  Contact Information
                </h2>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email Address
                </label>
                <Input
                  defaultValue={merchant.email}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Phone Number
                </label>
                <Input
                  defaultValue={merchant.phoneNumber}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2 mt-4">
                  Address Information
                </h2>
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">
                  Address Line 1
                </label>
                <Input
                  defaultValue={merchant.addressLine1}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">
                  Address Line 2
                </label>
                <Input
                  defaultValue={merchant.addressLine2}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">
                  Address Line 3
                </label>
                <Input
                  defaultValue={merchant.addressLine3}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <Input
                  defaultValue={merchant.city}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  County
                </label>
                <Input
                  defaultValue={merchant.county}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  State/Province
                </label>
                <Input
                  defaultValue={merchant.state}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Postal/Zip Code
                </label>
                <Input
                  defaultValue={merchant.zipCode}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Country
                </label>
                <Input
                  defaultValue={merchant.country}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Country Code
                </label>
                <Input
                  defaultValue={merchant.countryCode}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-4 mt-6">
                <Button
                  onClick={handleCancel}
                  className="text-black bg-red-700 hover:bg-[#fc3a3a]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            // Display Mode - Read-only view with borders
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2">
                  Business Details
                </h2>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  Business Name
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.businessName}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  Registration Number
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.registrationNumber}</p>
                </div>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 mt-4 border-b border-[#2A2A2A] pb-2">
                  Contact Information
                </h2>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  Email Address
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.email}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  Phone Number
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.phoneNumber}</p>
                </div>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2 mt-4">
                  Address Information
                </h2>
              </div>

              <div className="col-span-2">
                <h3 className="block text-sm text-gray-400 mb-1">
                  Address Line 1
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.addressLine1}</p>
                </div>
              </div>

              {merchant.addressLine2 && (
                <div className="col-span-2">
                  <h3 className="block text-sm text-gray-400 mb-1">
                    Address Line 2
                  </h3>
                  <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                    <p className="text-gray-300">{merchant.addressLine2}</p>
                  </div>
                </div>
              )}

              {merchant.addressLine3 && (
                <div className="col-span-2">
                  <h3 className="block text-sm text-gray-400 mb-1">
                    Address Line 3
                  </h3>
                  <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                    <p className="text-gray-300">{merchant.addressLine3}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">City</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.city}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">County</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.county}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  State/Province
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.state}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  Postal/Zip Code
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.zipCode}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Country</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.country}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">
                  Country Code
                </h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.countryCode}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          No merchant data found
        </div>
      )}
    </div>
  );
}
