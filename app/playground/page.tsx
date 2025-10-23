"use client";

import Footer from "@/components/layout/footer";
import Link from "next/link";
import { useState } from "react";

export default function Playground() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedType, setSelectedType] = useState<"flag" | "experiment" | null>(null);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Dashboard Header */}
      <div className="border-b p-4 bg-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SQ</span>
            </div>
            <h1 className="text-2xl font-bold text-[#001f3f]">Stealth Quest - Experimentation Agent</h1>
          </Link>

          {/* Right Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home Page
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
              About Page
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
          <Link href="/feature-flags" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Feature Flags and Experiments Dashboard
          </Link>
          <Link href="/faqs" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            FAQs
          </Link>
          <Link href="#" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Support
          </Link>
          <Link href="#" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Docs
          </Link>
        </div>
      </div>

      {/* Playground Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Playground</h2>
          <p className="text-gray-600 mb-8">Try out feature flags and experiments without writing any code</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature Flag Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Try a Feature Flag</h3>
              <p className="text-gray-600 mb-6">
                Create a simple feature flag and see how it controls feature visibility in your application.
              </p>
              <button
                onClick={() => setSelectedType("flag")}
                className="px-6 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366] transition-colors"
              >
                Start Flag
              </button>
            </div>

            {/* Experiment Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Try an Experiment</h3>
              <p className="text-gray-600 mb-6">
                Run a simple A/B test to see how experimentation works and track metrics in real-time.
              </p>
              <button
                onClick={() => setSelectedType("experiment")}
                className="px-6 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366] transition-colors"
              >
                Start Experiment
              </button>
            </div>
          </div>

          {selectedType && (
            <div className="mt-8 border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedType === "flag" ? "Feature Flag" : "Experiment"} Demo
                </h3>
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              {selectedType === "flag" ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Feature Flag: New Dashboard</h4>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Enabled for current user</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-2">
                      Toggle this flag to see how the new dashboard appears and disappears.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm">
                      When enabled, you would see the new dashboard interface. Try toggling the checkbox above!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Experiment: Button Color Test</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      This experiment tests whether a green button (Variant A) performs better than a blue button (Variant B).
                    </p>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Variant A (Green)
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Variant B (Blue)
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold mb-2">Results</h4>
                    <p className="text-sm text-gray-600">
                      Variant A: 45% conversion rate (450 users)<br />
                      Variant B: 42% conversion rate (440 users)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
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
