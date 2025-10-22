// LaunchDarkly MCP Server client wrapper
// This provides a typed interface for interacting with LaunchDarkly via MCP

export type FlagType = "boolean" | "string" | "map" | "list"

export interface FlagTargeting {
  city?: string
  zip?: string
}

export interface FeatureFlag {
  id: string
  key: string
  name: string
  type: FlagType
  enabled: boolean
  description?: string
  createdAt: Date
  expiresAt?: Date
  maintainer: {
    name: string
    email: string
  }
  targeting?: FlagTargeting
  tags?: string[]
  environments?: string[]
}

export interface Experiment {
  id: string
  key: string
  name: string
  description?: string
  status: "draft" | "running" | "completed" | "archived"
  createdAt: Date
  expiresAt?: Date
  maintainer: {
    name: string
    email: string
  }
  targeting?: FlagTargeting
  variants: Array<{
    key: string
    name: string
    weight: number
  }>
  metrics?: string[]
}

export interface ReportConfig {
  type: "expiring-soon" | "long-standing" | "all-flags" | "all-experiments"
  daysThreshold?: number
  recipients: Array<{
    email: string
    notifyViaTeams?: boolean
  }>
}

// Mock data generator for development
// In production, this would connect to LaunchDarkly MCP Server
export class LaunchDarklyMCPClient {
  async getFeatureFlags(): Promise<FeatureFlag[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "1",
        key: "new-checkout-flow",
        name: "New Checkout Flow",
        type: "boolean",
        enabled: true,
        description: "Enable the redesigned checkout experience",
        createdAt: new Date("2024-01-15"),
        expiresAt: new Date("2025-11-01"),
        maintainer: {
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
        },
        targeting: { city: "San Francisco" },
        tags: ["checkout", "ui"],
        environments: ["production", "staging"],
      },
      {
        id: "2",
        key: "legacy-api-support",
        name: "Legacy API Support",
        type: "boolean",
        enabled: true,
        description: "Maintain backward compatibility with v1 API",
        createdAt: new Date("2023-03-20"),
        maintainer: {
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
        },
        tags: ["api", "legacy"],
        environments: ["production"],
      },
      {
        id: "3",
        key: "payment-providers",
        name: "Payment Providers",
        type: "list",
        enabled: true,
        description: "List of enabled payment providers",
        createdAt: new Date("2024-08-10"),
        expiresAt: new Date("2025-10-28"),
        maintainer: {
          name: "Alex Rivera",
          email: "alex.rivera@company.com",
        },
        targeting: { zip: "94102" },
        tags: ["payments"],
        environments: ["production", "staging", "development"],
      },
      {
        id: "4",
        key: "feature-config",
        name: "Feature Configuration",
        type: "map",
        enabled: true,
        description: "Configuration map for feature settings",
        createdAt: new Date("2024-09-01"),
        maintainer: {
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
        },
        tags: ["config"],
        environments: ["production"],
      },
      {
        id: "5",
        key: "beta-features",
        name: "Beta Features Access",
        type: "string",
        enabled: false,
        description: "Controls access to beta features",
        createdAt: new Date("2024-10-01"),
        expiresAt: new Date("2025-10-25"),
        maintainer: {
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
        },
        tags: ["beta"],
        environments: ["staging"],
      },
    ]
  }

  async getExperiments(): Promise<Experiment[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "exp-1",
        key: "homepage-hero-test",
        name: "Homepage Hero A/B Test",
        description: "Testing different hero section designs",
        status: "running",
        createdAt: new Date("2024-09-15"),
        expiresAt: new Date("2025-10-30"),
        maintainer: {
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
        },
        targeting: { city: "New York" },
        variants: [
          { key: "control", name: "Control", weight: 50 },
          { key: "variant-a", name: "Variant A", weight: 50 },
        ],
        metrics: ["conversion_rate", "bounce_rate"],
      },
      {
        id: "exp-2",
        key: "pricing-page-experiment",
        name: "Pricing Page Layout Test",
        description: "Testing different pricing page layouts",
        status: "running",
        createdAt: new Date("2024-08-01"),
        maintainer: {
          name: "Alex Rivera",
          email: "alex.rivera@company.com",
        },
        variants: [
          { key: "control", name: "Control", weight: 33 },
          { key: "variant-b", name: "Variant B", weight: 33 },
          { key: "variant-c", name: "Variant C", weight: 34 },
        ],
        metrics: ["signup_rate"],
      },
      {
        id: "exp-3",
        key: "onboarding-flow-test",
        name: "Onboarding Flow Optimization",
        description: "Long-running onboarding experiment",
        status: "running",
        createdAt: new Date("2023-06-10"),
        maintainer: {
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
        },
        targeting: { zip: "10001" },
        variants: [
          { key: "control", name: "Control", weight: 50 },
          { key: "streamlined", name: "Streamlined", weight: 50 },
        ],
        metrics: ["completion_rate", "time_to_complete"],
      },
      {
        id: "exp-4",
        key: "search-algorithm-test",
        name: "Search Algorithm Test",
        description: "Testing new search ranking algorithm",
        status: "completed",
        createdAt: new Date("2024-07-01"),
        expiresAt: new Date("2025-10-26"),
        maintainer: {
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
        },
        variants: [
          { key: "control", name: "Control", weight: 50 },
          { key: "ml-powered", name: "ML Powered", weight: 50 },
        ],
        metrics: ["click_through_rate", "search_success_rate"],
      },
    ]
  }

  async generateReport(config: ReportConfig): Promise<{ success: boolean; reportId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      reportId: `report-${Date.now()}`,
    }
  }

  async sendNotification(recipients: string[], reportId: string, channel: "email" | "teams"): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    console.log(`Sending ${channel} notification to:`, recipients, `for report:`, reportId)
    return true
  }
}

export const ldClient = new LaunchDarklyMCPClient()