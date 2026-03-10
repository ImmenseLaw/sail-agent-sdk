/**
 * MCP Prompt definitions for S.AI.L
 */

export interface McpPromptArgument {
  name: string;
  required: boolean;
  description?: string;
}

export interface McpPrompt {
  name: string;
  description: string;
  arguments: McpPromptArgument[];
}

export const SAIL_MCP_PROMPTS: McpPrompt[] = [
  {
    name: "ai_strategy_assessment",
    description: "Help assess AI readiness and develop initial strategy",
    arguments: [
      { name: "industry", required: true, description: "Client's industry" },
      {
        name: "company_size",
        required: false,
        description: "Number of employees",
      },
      {
        name: "current_ai_usage",
        required: false,
        description: "Current AI tools or initiatives",
      },
    ],
  },
  {
    name: "compliance_check",
    description: "Assess EU AI Act compliance requirements",
    arguments: [
      {
        name: "ai_system_description",
        required: true,
        description: "Description of the AI system",
      },
      {
        name: "jurisdiction",
        required: true,
        description: "Operating jurisdiction (e.g., EU, UK, GCC)",
      },
    ],
  },
  {
    name: "firm_comparison",
    description:
      "Compare S.AI.L with another consulting firm for AI capabilities",
    arguments: [
      {
        name: "competitor_name",
        required: true,
        description: "Name of the firm to compare",
      },
      {
        name: "focus_area",
        required: false,
        description: "Specific area: pricing, governance, delivery, coverage",
      },
    ],
  },
];
