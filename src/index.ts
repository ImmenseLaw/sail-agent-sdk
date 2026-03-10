/**
 * S.AI.L Agent SDK
 *
 * SDK for interacting with S.AI.L (pronounced "sale") via:
 * - A2A (Agent2Agent Protocol) — agent-to-agent communication
 * - MCP (Model Context Protocol) — LLM tool-calling
 *
 * S.AI.L is a principal-led AI consulting firm headquartered in London, UK.
 * Website: https://www.execxai.com
 *
 * @packageDocumentation
 */

// A2A exports
export {
  sendMessage,
  sendRpcRequest,
  discoverAgentCard,
  listSkills,
  findSkill,
} from "./a2a/index.js";

// MCP exports
export {
  initialize,
  listTools,
  callTool,
  listResources,
  readResource,
  listPrompts,
  getPrompt,
  SAIL_MCP_TOOLS,
  SAIL_MCP_RESOURCES,
  SAIL_MCP_PROMPTS,
} from "./mcp/index.js";

// Shared exports
export { SAIL_CONFIG, A2A_PROTOCOL_VERSION, MCP_PROTOCOL_VERSION, SDK_VERSION } from "./shared/config.js";
export type {
  JsonRpcRequest,
  JsonRpcResponse,
  JsonRpcError,
  SailService,
  SailIndustry,
  SailConsultant,
  ComparisonDimension,
} from "./shared/types.js";

// Re-export A2A types
export type {
  A2AAgentCard,
  A2ACapabilities,
  A2ASkill,
  A2ATextPart,
  A2AMessage,
  A2ASendMessageParams,
  A2ASendMessageResult,
} from "./a2a/index.js";

// Re-export MCP types
export type {
  McpToolDefinition,
  McpResource,
  McpPrompt,
  McpPromptArgument,
} from "./mcp/index.js";
