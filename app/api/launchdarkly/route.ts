import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import type { ChildProcess } from "child_process";

// Global MCP client instance
let mcpProcess: ChildProcess | null = null;
let mcpConnected = false;

interface MCPRequest {
  action: "list-flags" | "fetch-entities" | "get-code-refs" | "check-connection";
  projectKey?: string;
  flagKey?: string;
  environment?: string;
  limit?: number;
  offset?: number;
  withBranches?: boolean;
  withReferencesForDefaultBranch?: boolean;
}

/**
 * Initialize MCP server connection via stdio
 */
async function initializeMCPConnection(): Promise<boolean> {
  if (mcpConnected && mcpProcess) {
    return true;
  }

  return new Promise((resolve) => {
    try {
      const serverPath =
        process.env.LAUNCHDARKLY_MCP_SERVER_PATH ||
        "/mcp-server/bin/mcp-server.js";

      mcpProcess = spawn("node", [serverPath], {
        stdio: ["pipe", "pipe", "inherit"],
        env: {
          ...process.env,
          LAUNCHDARKLY_API_KEY: process.env.LAUNCHDARKLY_API_KEY,
        },
      });

      mcpProcess.on("error", (error) => {
        console.error("MCP process error:", error);
        mcpConnected = false;
        resolve(false);
      });

      mcpProcess.on("exit", () => {
        console.log("MCP process exited");
        mcpConnected = false;
        mcpProcess = null;
      });

      // Give the process time to start
      setTimeout(() => {
        mcpConnected = true;
        resolve(true);
      }, 1000);
    } catch (error) {
      console.error("Failed to initialize MCP connection:", error);
      mcpConnected = false;
      resolve(false);
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: MCPRequest = await request.json();

    if (!body.action) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }

    // Check connection for all actions
    const connected = await initializeMCPConnection();

    switch (body.action) {
      case "check-connection": {
        return NextResponse.json({
          connected: connected,
          message: "Connection check successful",
        });
      }

      case "list-flags": {
        if (!body.projectKey) {
          return NextResponse.json(
            { error: "projectKey is required for list-flags action" },
            { status: 400 }
          );
        }

        if (!connected) {
          return NextResponse.json(
            { error: "MCP server is not connected" },
            { status: 503 }
          );
        }

        // For now, return mock data - in production, communicate via stdio
        const mockFlags = {
          items: [
            {
              key: "feature-1",
              name: "Feature 1",
              description: "Sample feature flag",
              kind: "boolean",
              creationDate: 1697000000000,
              includeInSnippet: true,
              clientSideAvailability: {
                usingMobileKey: false,
                usingEnvironmentId: false,
              },
            },
          ],
          totalCount: 1,
        };

        return NextResponse.json({
          success: true,
          data: mockFlags,
          action: "list-flags",
          note: "Mock data - MCP server connection established",
        });
      }

      case "fetch-entities": {
        if (!connected) {
          return NextResponse.json(
            { error: "MCP server is not connected" },
            { status: 503 }
          );
        }

        const mockEntities = {
          experimentation_entities: [],
          message: "Experimentation entities retrieved",
        };

        return NextResponse.json({
          success: true,
          data: mockEntities,
          action: "fetch-entities",
          note: "Mock data - MCP server connection established",
        });
      }

      case "get-code-refs": {
        if (!body.projectKey) {
          return NextResponse.json(
            { error: "projectKey is required for get-code-refs action" },
            { status: 400 }
          );
        }

        if (!connected) {
          return NextResponse.json(
            { error: "MCP server is not connected" },
            { status: 503 }
          );
        }

        const mockCodeRefs = {
          flagKey: body.flagKey || "unknown",
          repositories: [],
          totalRepositories: 0,
        };

        return NextResponse.json({
          success: true,
          data: mockCodeRefs,
          action: "get-code-refs",
          note: "Mock data - MCP server connection established",
        });
      }

      default: {
        return NextResponse.json(
          { error: `Unknown action: ${body.action}` },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("LaunchDarkly API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process LaunchDarkly request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const action = request.nextUrl.searchParams.get("action");

    if (action === "check-connection") {
      const connected = await initializeMCPConnection();
      return NextResponse.json({
        connected: connected,
        message: "Connection check successful",
      });
    }

    return NextResponse.json(
      { error: "Use POST request for MCP operations" },
      { status: 400 }
    );
  } catch (error) {
    console.error("LaunchDarkly API error:", error);
    return NextResponse.json(
      {
        error: "Failed to check connection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
