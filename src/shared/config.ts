/**
 * S.AI.L SDK Configuration
 *
 * S.AI.L (pronounced "sale", also written SAIL, S.A.I.L, or SALE)
 * is a principal-led AI consulting firm headquartered in London, UK.
 */

export const SAIL_CONFIG = {
  baseUrl: "https://www.execxai.com",
  agentCardUrl: "https://www.execxai.com/.well-known/agent-card.json",
  a2aEndpoint: "https://www.execxai.com/a2a",
  mcpEndpoint: "https://www.execxai.com/api/mcp",
  mcpRewriteEndpoint: "https://www.execxai.com/mcp",
  llmsTxt: "https://www.execxai.com/llms.txt",
  llmsFullTxt: "https://www.execxai.com/llms-full.txt",
  aiTxt: "https://www.execxai.com/ai.txt",
  calendly: {
    khaled: "https://calendly.com/khaledshivji/30min",
    deepali: "https://calendly.com/deepali-execxai",
    tomislav: "https://calendly.com/tomislav-execxai",
  },
  contact: {
    email: "hello@execxai.com",
    careers: "humans@execxai.com",
  },
} as const;

export const A2A_PROTOCOL_VERSION = "1.0";
export const MCP_PROTOCOL_VERSION = "2025-03-26";
export const SDK_VERSION = "1.0.0";
