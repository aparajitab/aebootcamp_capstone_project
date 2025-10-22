"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-8">
        <h1 className="text-4xl font-bold mb-6">About Stealth Quest</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">What is Stealth Quest?</h2>
            <p>
              Stealth Quest is a comprehensive experimentation platform designed to help teams ship products with confidence. We provide powerful tools for feature flagging, A/B testing, and experimentation management that reduce outages and accelerate innovation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              Our mission is to empower engineering teams to experiment safely, validate hypotheses quickly, and deliver value to users with minimal risk. We believe that continuous experimentation is the key to building better products and reducing production issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Feature flag management for controlled rollouts</li>
              <li>Advanced A/B testing and experimentation capabilities</li>
              <li>Real-time analytics and insights</li>
              <li>AI-powered recommendations for experimentation strategies</li>
              <li>Seamless integration with your existing infrastructure</li>
              <li>Enterprise-grade security and compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Why Choose Stealth Quest?</h2>
            <p>
              Unlike traditional experimentation platforms, Stealth Quest combines the power of feature flags with intelligent experimentation guidance. Our platform is built from the ground up to help you reduce outages, accelerate shipping, and make data-driven decisions with confidence.
            </p>
          </section>
        </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
