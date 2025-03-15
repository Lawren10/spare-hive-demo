"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Save, X } from "lucide-react"

interface MerchantData {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  status: string
  [key: string]: any // For any additional fields
}

interface ProfileFormProps {
  onClose?: () => void
}

export default function ProfileForm({ onClose }: ProfileFormProps) {
  const [merchant, setMerchant] = useState<MerchantData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://spareshive-api-1523959fece7.herokuapp.com/merchant/6", {
          // Add headers for authentication if you have them
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // Uncomment and add your token when available
          },
        })

        if (response.status === 401) {
          console.log("Authentication required. Using mock data instead.")
          // Provide mock data as fallback
          setMerchant({
            id: 6,
            name: "SpareHive Demo Merchant",
            email: "demo@spareshive.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main Street",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "USA",
            status: "active",
          })
          return
        }

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        setMerchant(data)
      } catch (err) {
        console.error("Error fetching merchant data:", err)

        // Provide mock data as fallback for any error
        setMerchant({
          id: 6,
          name: "SpareHive Demo Merchant",
          email: "demo@spareshive.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main Street",
          city: "San Francisco",
          state: "CA",
          zip: "94105",
          country: "USA",
          status: "active",
        })

        setError("Using demo data. " + (err instanceof Error ? err.message : "An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchMerchantData()
  }, [])

  const handleSave = () => {
    // Here you would typically save the data to the API
    // For now, we'll just exit edit mode
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex-1 p-8 bg-[#1A1A1A]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white">My Profile</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-black hover:bg-yellow-600">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {error ? (
        <div className="bg-yellow-900/20 border border-yellow-800 text-yellow-300 p-4 rounded-lg mb-6">
          <p>Note: {error}</p>
          <p className="mt-2 text-sm">
            This form is currently displaying mock data. To connect to the real API, you'll need to provide
            authentication credentials.
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
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2">Merchant Information</h2>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Merchant Name</label>
                <Input defaultValue={merchant.name} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <Input defaultValue={merchant.email} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                <Input defaultValue={merchant.phone} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <Select defaultValue={merchant.status}>
                  <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2 mt-4">Address Information</h2>
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Street Address</label>
                <Input defaultValue={merchant.address} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <Input defaultValue={merchant.city} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">State/Province</label>
                <Input defaultValue={merchant.state} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Postal/Zip Code</label>
                <Input defaultValue={merchant.zip} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Country</label>
                <Input defaultValue={merchant.country} className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-300" />
              </div>

              <div className="col-span-2 flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-yellow-500 text-black hover:bg-yellow-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            // Display Mode - Read-only view with borders
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2">Merchant Information</h2>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Merchant Name</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.name}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Email Address</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.email}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Phone Number</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Status</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        merchant.status === "active"
                          ? "bg-green-500"
                          : merchant.status === "inactive"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    ></span>
                    <p className="text-gray-300 capitalize">{merchant.status}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg text-white mb-4 border-b border-[#2A2A2A] pb-2 mt-4">Address Information</h2>
              </div>

              <div className="col-span-2">
                <h3 className="block text-sm text-gray-400 mb-1">Street Address</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.address}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">City</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.city}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">State/Province</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.state}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Postal/Zip Code</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.zip}</p>
                </div>
              </div>

              <div>
                <h3 className="block text-sm text-gray-400 mb-1">Country</h3>
                <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-md px-3 py-2">
                  <p className="text-gray-300">{merchant.country}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">No merchant data found</div>
      )}
    </div>
  )
}

