"use client";

import Footer from "@/components/layout/footer";
import Link from "next/link";
import { useState } from "react";

export default function Support() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      // Call the API route that will handle RAG integration with LaunchDarkly
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.response || "Unable to fetch response. Please try again.");
    } catch (error) {
      setResponse("Error connecting to support. Please try again or contact support@stealthquest.io");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
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
          <Link href="/support" className="text-xs font-medium text-blue-600 font-bold">
            Support
          </Link>
          <Link href="#" className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Docs
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

      {/* Support Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Support</h2>
          <p className="text-gray-600 mb-8">Get help with feature flags, experiments, and LaunchDarkly integration powered by RAG</p>

          {/* Support Form */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ask a Question</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ask anything about LaunchDarkly support, feature flags, experiments, or integration. Our RAG-powered support system will provide answers based on LaunchDarkly documentation.
            </p>

            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about feature flags, experiments, LaunchDarkly integration, or anything else..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="px-6 py-2 bg-[#001f3f] text-white rounded-lg hover:bg-[#003366] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? "Getting Answer..." : "Get Answer"}
              </button>
            </form>
          </div>

          {/* Response */}
          {response && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Answer</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
              <button
                onClick={() => {
                  setResponse("");
                  setQuestion("");
                }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Ask another question
              </button>
            </div>
          )}

          {/* Common Support Topics */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Support Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold text-gray-900 mb-2">Getting Started</h4>
                <p className="text-sm text-gray-600">Learn how to set up and configure LaunchDarkly</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold text-gray-900 mb-2">Feature Flags</h4>
                <p className="text-sm text-gray-600">Create, manage, and monitor feature flags</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold text-gray-900 mb-2">Experiments</h4>
                <p className="text-sm text-gray-600">Run A/B tests and analyze results</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold text-gray-900 mb-2">API Integration</h4>
                <p className="text-sm text-gray-600">Integrate LaunchDarkly with your applications</p>
              </div>
            </div>
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
