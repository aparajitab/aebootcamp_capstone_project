"use client";

import Footer from "@/components/layout/footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FeatureFlagsAndExperiments() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [agentQuery, setAgentQuery] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mcpConnected, setMcpConnected] = useState<boolean | null>(null);
  const [projectKey, setProjectKey] = useState("default");
  const [environment, setEnvironment] = useState<string>("");

  // Check MCP connection on component mount
  useEffect(() => {
    checkMCPConnection();
  }, []);

  const checkMCPConnection = async () => {
    try {
      const response = await fetch("/api/launchdarkly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check-connection" }),
      });

      if (response.ok) {
        const data = await response.json();
        setMcpConnected(data.connected);
      } else {
        setMcpConnected(false);
      }
    } catch (error) {
      console.error("Failed to check MCP connection:", error);
      setMcpConnected(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
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
          <Link href="/feature-flags" className="text-xs font-medium text-blue-600 font-bold">
            Feature Flags and Experiments Dashboard
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

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Feature Flags and Experiments</h2>
            <p className="text-gray-600 mb-8">Manage and monitor your feature flags and experiments powered by LaunchDarkly</p>

            {/* MCP Connection Status */}
            {mcpConnected !== null && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  mcpConnected
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    mcpConnected
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {mcpConnected
                    ? "✓ Connected to LaunchDarkly MCP Server"
                    : "✗ Unable to connect to LaunchDarkly MCP Server"}
                </p>
              </div>
            )}

            {/* Chat Agent Box */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex flex-col gap-4">
                {/* Configuration Section */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Project Key
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., default"
                      value={projectKey}
                      onChange={(e) => setProjectKey(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Environment (Optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., production"
                      value={environment}
                      onChange={(e) => setEnvironment(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Ask me anything about Feature Flags and Experiments
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Try: "List all flags", "Get experiments", "Code references for flag:my-flag"
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Type your question here..."
                      value={agentQuery}
                      onChange={(e) => setAgentQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={async () => {
                        if (agentQuery.trim()) {
                          setIsLoading(true);
                          setAgentResponse("");

                          try {
                            // Determine the action based on the query
                            let action = "list-flags";
                            const query = agentQuery.toLowerCase();

                            if (
                              query.includes("experiment") ||
                              query.includes("entit")
                            ) {
                              action = "fetch-entities";
                            } else if (
                              query.includes("code") ||
                              query.includes("reference")
                            ) {
                              action = "get-code-refs";
                            }

                            const requestBody: any = { action, projectKey };

                            if (
                              action === "list-flags" &&
                              environment
                            ) {
                              requestBody.environment = environment;
                            }

                            if (
                              action === "get-code-refs" &&
                              query.includes("flag:")
                            ) {
                              const flagMatch = query.match(
                                /flag:(\w+)/
                              );
                              if (flagMatch) {
                                requestBody.flagKey = flagMatch[1];
                              }
                            }

                            const response = await fetch(
                              "/api/launchdarkly",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(requestBody),
                              }
                            );

                            if (response.ok) {
                              const data = await response.json();
                              const dataStr =
                                typeof data.data === "string"
                                  ? data.data
                                  : JSON.stringify(data.data, null, 2);
                              setAgentResponse(dataStr);
                            } else {
                              const error = await response.json();
                              setAgentResponse(
                                `Error: ${error.error || "Failed to fetch data"}`
                              );
                            }
                          } catch (error) {
                            setAgentResponse(
                              `Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}`
                            );
                          } finally {
                            setIsLoading(false);
                          }
                        }
                      }}
                      disabled={isLoading || !mcpConnected}
                      className="bg-[#001f3f] hover:bg-[#003366] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Loading..." : mcpConnected === false ? "MCP Offline" : "Ask"}
                    </Button>
                  </div>
                </div>
                {agentResponse && (
                  <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">
                      Response from LaunchDarkly MCP Server:
                    </p>
                    <pre className="text-xs text-blue-800 overflow-auto max-h-64 bg-white p-2 rounded border border-blue-100">
                      {agentResponse}
                    </pre>
                  </div>
                )}
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
