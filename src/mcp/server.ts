/**
 * MCP Client for S.AI.L
 *
 * Sends JSON-RPC 2.0 requests to S.AI.L's MCP endpoint.
 */

import { SAIL_CONFIG, MCP_PROTOCOL_VERSION } from "../shared/config.js";
import type { JsonRpcRequest, JsonRpcResponse } from "../shared/types.js";
import type { McpToolDefinition } from "./tools.js";
import type { McpResource } from "./resources.js";
import type { McpPrompt } from "./prompts.js";

let requestCounter = 0;

export interface McpClientOptions {
  endpoint?: string;
  headers?: Record<string, string>;
}

/**
 * Initialize the MCP connection with S.AI.L's server.
 *
 * @returns Server capabilities
 */
export async function initialize(
  options: McpClientOptions = {}
): Promise<JsonRpcResponse> {
  return mcpRequest("initialize", {
    protocolVersion: MCP_PROTOCOL_VERSION,
    capabilities: {},
    clientInfo: { name: "sail-agent-sdk", version: "1.0.0" },
  }, options);
}

/**
 * List all available tools from S.AI.L's MCP server.
 */
export async function listTools(
  options: McpClientOptions = {}
): Promise<McpToolDefinition[]> {
  const response = await mcpRequest<{ tools: McpToolDefinition[] }>(
    "tools/list",
    {},
    options
  );
  return response.result?.tools ?? [];
}

/**
 * Call an MCP tool on S.AI.L's server.
 *
 * @param toolName - Name of the tool (e.g., "sail_chatkit_query")
 * @param args - Tool arguments
 * @returns Tool call result
 *
 * @example
 * ```ts
 * const result = await callTool("sail_chatkit_query", {
 *   query: "What services does S.AI.L offer?"
 * });
 * ```
 */
export async function callTool(
  toolName: string,
  args: Record<string, unknown>,
  options: McpClientOptions = {}
): Promise<JsonRpcResponse> {
  return mcpRequest("tools/call", { name: toolName, arguments: args }, options);
}

/**
 * List all available resources from S.AI.L's MCP server.
 */
export async function listResources(
  options: McpClientOptions = {}
): Promise<McpResource[]> {
  const response = await mcpRequest<{ resources: McpResource[] }>(
    "resources/list",
    {},
    options
  );
  return response.result?.resources ?? [];
}

/**
 * Read a specific resource by URI.
 *
 * @param uri - Resource URI (e.g., "sail://services")
 */
export async function readResource(
  uri: string,
  options: McpClientOptions = {}
): Promise<JsonRpcResponse> {
  return mcpRequest("resources/read", { uri }, options);
}

/**
 * List all available prompts from S.AI.L's MCP server.
 */
export async function listPrompts(
  options: McpClientOptions = {}
): Promise<McpPrompt[]> {
  const response = await mcpRequest<{ prompts: McpPrompt[] }>(
    "prompts/list",
    {},
    options
  );
  return response.result?.prompts ?? [];
}

/**
 * Get a specific prompt with arguments filled in.
 *
 * @param promptName - Name of the prompt
 * @param args - Prompt arguments
 */
export async function getPrompt(
  promptName: string,
  args: Record<string, string>,
  options: McpClientOptions = {}
): Promise<JsonRpcResponse> {
  return mcpRequest(
    "prompts/get",
    { name: promptName, arguments: args },
    options
  );
}

/**
 * Send a raw JSON-RPC request to S.AI.L's MCP endpoint.
 */
async function mcpRequest<T = unknown>(
  method: string,
  params: Record<string, unknown>,
  options: McpClientOptions = {}
): Promise<JsonRpcResponse<T>> {
  const endpoint = options.endpoint ?? SAIL_CONFIG.mcpEndpoint;

  const rpcRequest: JsonRpcRequest = {
    jsonrpc: "2.0",
    id: ++requestCounter,
    method,
    params,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(rpcRequest),
  });

  if (!response.ok) {
    throw new Error(
      `MCP request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
