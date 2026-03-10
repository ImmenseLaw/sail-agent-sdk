/**
 * Example: Call S.AI.L MCP Tools
 *
 * Usage: npx tsx examples/mcp-tool-call.ts
 */

import { initialize, listTools, callTool } from "../src/index.js";

async function main() {
  console.log("=== S.AI.L MCP Tool Call Example ===\n");

  // 1. Initialize connection
  console.log("1. Initializing MCP connection...");
  const init = await initialize();
  console.log(`   Server: ${JSON.stringify(init.result)}\n`);

  // 2. List available tools
  console.log("2. Available tools:");
  const tools = await listTools();
  for (const tool of tools) {
    console.log(`   - ${tool.name}: ${tool.description.slice(0, 70)}...`);
  }

  // 3. Query the chatkit
  console.log("\n3. Calling sail_chatkit_query...");
  const queryResult = await callTool("sail_chatkit_query", {
    query: "What industries does S.AI.L serve?",
  });
  console.log(`   Result: ${JSON.stringify(queryResult.result)}\n`);

  // 4. Get service info
  console.log("4. Calling sail_get_service_info...");
  const serviceResult = await callTool("sail_get_service_info", {
    service_id: "ai-governance",
  });
  console.log(`   Result: ${JSON.stringify(serviceResult.result)}\n`);

  console.log("=== Done ===");
}

main().catch(console.error);
