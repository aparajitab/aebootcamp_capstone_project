"use client";

import Footer from "@/components/layout/footer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("");
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    // Check localStorage for user name and first visit status
    const storedUserName = localStorage.getItem("userName");
    const storedFirstVisit = localStorage.getItem("firstVisit");

    if (!storedUserName) {
      // First visit - show welcome message
      const name = "User"; // Default name, can be replaced with actual user input
      setUserName(name);
      setIsFirstVisit(true);
      localStorage.setItem("userName", name);
      localStorage.setItem("firstVisit", "false");
    } else {
      // Returning visitor
      setUserName(storedUserName);
      setIsFirstVisit(false);
    }
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Dashboard Header */}
      <div className="border-b p-4 bg-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SQ</span>
            </div>
            <h1 className="text-2xl font-bold text-[#001f3f]">Stealth Quest - Experimentation Agent</h1>
          </div>

          {/* Right Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
              About
            </Link>
            <button
              onClick={() => setShowContactModal(true)}
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Contact Us
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-b"></div>

      {/* Submenu */}
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          <Link href="/dashboard" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Feature Flags
          </Link>
          <Link href="/experiments" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Experiments
          </Link>
          <Link href="/faqs" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            FAQs
          </Link>
          <Link href="/support" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Support
          </Link>
          <div className="flex-1"></div>
          <Link
            href="/playground"
            className="text-xs font-medium text-white bg-[#001f3f] px-4 py-1.5 rounded hover:bg-[#003366] transition-colors"
          >
            Try Me
          </Link>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search for Flags"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <select className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">All Flags</option>
              <option value="long-standing">Long Standing</option>
              <option value="expiring">Expiring Soon</option>
              <option value="boolean">Boolean</option>
              <option value="list">List</option>
              <option value="map">Map</option>
              <option value="string">String</option>
              <option value="configuration">Configuration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col overflow-y-auto px-4 py-8">
          {/* Feature Flags Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Feature Flags</h2>
            <p className="text-gray-600 mb-6">Manage and monitor your feature flags powered by LaunchDarkly</p>

            {/* Feature Flags Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Flag Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Maintainer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">New Dashboard UI</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Boolean</td>
                    <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Enabled</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">John Smith</td>
                    <td className="px-6 py-4 text-sm text-gray-600">2 days ago</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Dark Mode Support</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Boolean</td>
                    <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Targeting</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">Jane Doe</td>
                    <td className="px-6 py-4 text-sm text-gray-600">5 days ago</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Premium Features</td>
                    <td className="px-6 py-4 text-sm text-gray-600">List</td>
                    <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Expiring Soon</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">Mike Johnson</td>
                    <td className="px-6 py-4 text-sm text-gray-600">1 week ago</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Payment Integration v2</td>
                    <td className="px-6 py-4 text-sm text-gray-600">String</td>
                    <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Disabled</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">Sarah Wilson</td>
                    <td className="px-6 py-4 text-sm text-gray-600">3 weeks ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Stealth Quest - Experimentation Agent</h3>
                <p className="text-sm text-gray-600">
                  For inquiries about Stealth Quest, please reach out to us:
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm mb-2">
                  <span className="font-semibold">Email:</span> support@stealthquest.io
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Website:</span> www.stealthquest.io
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  Follow us on social media for updates and announcements.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowContactModal(false)}
              className="mt-6 w-full bg-[#001f3f] text-white px-4 py-2 rounded hover:bg-[#003366] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
