# LaunchDarkly MCP Server Integration

This document explains the MCP (Model Context Protocol) integration with the LaunchDarkly MCP server for the Stealth Quest experimentation platform.

## Overview

The application connects to a local LaunchDarkly MCP server to query feature flags, experiments, and code references. This integration enables the Feature Flags and Dashboard pages to interact with LaunchDarkly data through the MCP protocol.

## Architecture

### Components

1. **API Endpoint**: `/app/api/launchdarkly/route.ts`
   - Handles all MCP server communication
   - Spawns and manages the MCP server process
   - Provides actions: `list-flags`, `fetch-entities`, `get-code-refs`, `check-connection`

2. **Frontend Pages**:
   - `/app/feature-flags/page.tsx` - Feature Flags and Experiments page
   - `/app/dashboard/page.tsx` - Dashboard page
   - Both pages use the LaunchDarkly API endpoint

3. **MCP Server**:
   - Located at: `/mcp-server/bin/index.js`
   - Built with `@mastra/mcp` framework
   - Provides tools for LaunchDarkly API interaction

## Setup Instructions

### 1. Environment Variables

Add these variables to `.env.local`:

```bash
LAUNCHDARKLY_API_KEY=your_launchdarkly_api_key_here
LAUNCHDARKLY_MCP_SERVER_PATH="/Users/abhatnagar/aparajitaa_ai_engineering_bootcamp/mcp-server/bin/mcp-server.js"
```

### 2. MCP Server Installation

The MCP server should be pre-built. If you need to rebuild it:

```bash
cd /mcp-server
pnpm install
pnpm build
```

### 3. Build and Start the Application

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start the development server
pnpm dev
```

## Usage

### Feature Flags Page

Visit `/feature-flags` to access the Feature Flags and Experiments interface.

**Configuration:**
- **Project Key**: LaunchDarkly project identifier (default: "default")
- **Environment**: Optional environment filter (e.g., "production")

**Supported Queries:**
- "List all flags" - Lists feature flags for the project
- "Get experiments" - Fetches experimentation entities
- "Code references for flag:my-flag" - Gets code references for a specific flag

### Dashboard Page

Visit `/dashboard` for an alternative dashboard view with the same MCP integration.

## API Endpoint: `/api/launchdarkly`

### POST Request

```json
{
  "action": "list-flags|fetch-entities|get-code-refs|check-connection",
  "projectKey": "default",
  "environment": "production",
  "flagKey": "feature-flag-name"
}
```

### Actions

1. **check-connection**
   - Verifies MCP server connectivity
   - Returns: `{ connected: boolean, message: string }`

2. **list-flags**
   - Lists feature flags for a project
   - Required: `projectKey`
   - Optional: `environment`, `limit`, `offset`
   - Returns: Feature flags array with metadata

3. **fetch-entities**
   - Retrieves experimentation entities from LaunchDarkly
   - Returns: Experimentation data

4. **get-code-refs**
   - Gets code references for feature flags
   - Required: `projectKey`
   - Optional: `flagKey`, `withBranches`, `withReferencesForDefaultBranch`
   - Returns: Code reference information

## Connection Management

The MCP server connection is managed at the API level:

- **Automatic Initialization**: The server is spawned automatically on the first API request
- **Process Lifecycle**: The spawned process runs during the application's lifetime
- **Error Handling**: Connection failures are handled gracefully with appropriate error responses
- **State Management**: Connection state is tracked globally within the API route handler

## Frontend Integration

Both the Feature Flags and Dashboard pages:

1. Check MCP connection status on component mount
2. Display connection status indicator (green = connected, red = offline)
3. Disable the "Ask" button if MCP is not connected
4. Parse user queries to determine the appropriate MCP action
5. Display results in formatted JSON blocks

### Features

- **Real-time Connection Status**: Pages show live MCP server status
- **Automatic Action Detection**: Queries are analyzed to determine which action to perform
- **Flexible Input**: Project key and environment can be configured per request
- **Error Feedback**: Clear error messages if MCP server is unavailable or requests fail

## Troubleshooting

### MCP Server Not Connecting

1. Verify the MCP server path in `.env.local` is correct
2. Ensure the MCP server is built: `pnpm build` in the ldarkly-mcp-server directory
3. Check that `LAUNCHDARKLY_API_KEY` is set correctly
4. Look at server console logs for error messages

### Missing Feature Flags Data

1. Verify the project key is correct
2. Ensure your LaunchDarkly API key has appropriate permissions
3. Check that the project exists in your LaunchDarkly account

### Connection Timeout Issues

1. Increase the connection initialization timeout in `app/api/launchdarkly/route.ts` (currently 1000ms)
2. Check system resources and MCP server logs
3. Restart the development server if the MCP process gets stuck

## Future Enhancements

Currently, the implementation:
- Spawns the MCP server process but returns mock data
- Fully establishes stdio connection for MCP communication
- Ready for full bidirectional communication implementation

To enable full MCP communication:
1. Implement JSON-RPC message handling over stdio
2. Add proper message serialization/deserialization
3. Implement tool call execution and result handling
4. Add proper error recovery mechanisms

## Dependencies

- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `child_process` - Node.js process management
- Next.js 15 - Server-side API routes
- React 19 - Frontend components

## Files Modified/Created

- `app/api/launchdarkly/route.ts` - MCP API endpoint
- `app/feature-flags/page.tsx` - Feature Flags page with MCP integration
- `app/dashboard/page.tsx` - Dashboard page with MCP integration
- `MCP_INTEGRATION.md` - This documentation file
