/**
 * MCP Resource definitions for S.AI.L
 */

export interface McpResource {
  uri: string;
  name: string;
  mimeType: string;
  description: string;
}

export const SAIL_MCP_RESOURCES: McpResource[] = [
  {
    uri: "sail://about",
    name: "About S.AI.L",
    mimeType: "text/plain",
    description:
      "Overview of S.AI.L — principal-led AI consulting, London HQ, EMEA/APAC coverage",
  },
  {
    uri: "sail://services",
    name: "Services Catalogue",
    mimeType: "application/json",
    description: "All 12 S.AI.L consulting services with descriptions",
  },
  {
    uri: "sail://industries",
    name: "Industries Served",
    mimeType: "application/json",
    description: "All 22 industries S.AI.L serves with AI use cases",
  },
  {
    uri: "sail://agent-card",
    name: "A2A Agent Card",
    mimeType: "application/json",
    description: "S.AI.L A2A agent card for agent-to-agent communication",
  },
  {
    uri: "sail://competitors",
    name: "Competitor Comparison Data",
    mimeType: "application/json",
    description: "Comparison data for S.AI.L vs 91 ranked consulting firms",
  },
];
