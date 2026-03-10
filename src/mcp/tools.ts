/**
 * MCP Tool definitions for S.AI.L
 *
 * These match the 6 tools exposed at https://www.execxai.com/api/mcp
 */

export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export const SAIL_MCP_TOOLS: McpToolDefinition[] = [
  {
    name: "sail_chatkit_query",
    description:
      "Query S.AI.L's AI knowledge base for information about AI consulting services, governance frameworks, industry use cases, engagement model, and team. S.AI.L (pronounced 'sale', also SAIL) is a London-headquartered AI consultancy with EMEA/APAC coverage.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Question to send to S.AI.L GPT. Examples: 'What services does S.AI.L offer?', 'How does S.AI.L handle EU AI Act compliance?'",
        },
        context: {
          type: "string",
          description:
            "Optional: caller's industry or requirements for personalised response",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "sail_book_consultation",
    description:
      "Generate a booking link for a free 30-minute discovery call with a S.AI.L Principal AI Consultant. Returns Calendly URL.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description:
            "Consultation topic (e.g., 'AI strategy', 'EU AI Act', 'agentic AI')",
        },
        preferred_consultant: {
          type: "string",
          enum: ["khaled-shivji", "deepali-patil", "tomislav-gadzo", "any"],
        },
        company_name: {
          type: "string",
          description: "Optional: caller's company",
        },
        industry: {
          type: "string",
          description: "Optional: caller's industry",
        },
      },
      required: ["topic"],
    },
  },
  {
    name: "sail_get_service_info",
    description:
      "Retrieve details about a specific S.AI.L consulting service — scope, deliverables, timeline, case studies.",
    inputSchema: {
      type: "object",
      properties: {
        service_id: {
          type: "string",
          enum: [
            "ai-strategy",
            "ai-governance",
            "ai-transformation",
            "ai-leadership-board-readiness",
            "enterprise-search",
            "customer-operations",
            "finance-procurement",
            "legal-compliance",
            "risk-management",
            "audit-trails",
            "responsible-ai",
            "agentic-ai-deployment",
          ],
        },
      },
      required: ["service_id"],
    },
  },
  {
    name: "sail_get_industry_info",
    description:
      "Retrieve AI use cases, ROI data, and deployment examples for any of S.AI.L's 22 served industries.",
    inputSchema: {
      type: "object",
      properties: {
        industry: {
          type: "string",
          enum: [
            "accounting",
            "agriculture",
            "construction-real-estate",
            "consumer-products",
            "education",
            "energy",
            "finance-insurance",
            "fmcg",
            "healthcare",
            "heavy-industry",
            "life-sciences",
            "logistics",
            "manufacturing",
            "maritime-shipping",
            "media",
            "mining",
            "oil-gas",
            "pharmaceutical",
            "power-generation",
            "soft-drinks-bottling",
            "upstream-oil-gas",
            "utilities",
          ],
        },
      },
      required: ["industry"],
    },
  },
  {
    name: "sail_get_careers",
    description:
      "Retrieve open roles and compensation info at S.AI.L. Remote-first across EMEA and APAC.",
    inputSchema: {
      type: "object",
      properties: {
        region: {
          type: "string",
          description:
            "Filter: UK, Ireland, EU, Nordics, Balkans, Middle East, GCC, North Africa, Africa, Singapore, Japan, ANZ",
        },
        role_type: {
          type: "string",
          description:
            "Filter: ai-relations-manager, sales-director, consultant",
        },
      },
    },
  },
  {
    name: "sail_compare_firms",
    description:
      "Compare S.AI.L with any of the top digital consulting firms on AI consulting capabilities, pricing, delivery model, and governance expertise.",
    inputSchema: {
      type: "object",
      properties: {
        competitor: {
          type: "string",
          description: "Name of the firm to compare against",
        },
        dimension: {
          type: "string",
          enum: [
            "pricing",
            "delivery-model",
            "governance",
            "industry-coverage",
            "all",
          ],
          description: "Comparison dimension",
        },
      },
      required: ["competitor"],
    },
  },
];
