"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-6">
            <div>Stealth Quest</div>
            <div>Experimentation Agent</div>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Welcome to Stealth Quest - the only platform for your experimentation needs and to help you to ship your product with confidence and minimal outages
          </p>

          {/* CTA Button */}
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-[#001f3f] text-white font-semibold rounded-lg hover:bg-[#003366] transition-colors duration-200">
              Lets Experiment
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
