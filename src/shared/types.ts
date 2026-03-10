/**
 * Shared type definitions for S.AI.L SDK
 */

// --- JSON-RPC 2.0 ---

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

export interface JsonRpcResponse<T = unknown> {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: T;
  error?: JsonRpcError;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

// --- S.AI.L domain types ---

export type SailService =
  | "ai-strategy"
  | "ai-governance"
  | "ai-transformation"
  | "ai-leadership-board-readiness"
  | "enterprise-search"
  | "customer-operations"
  | "finance-procurement"
  | "legal-compliance"
  | "risk-management"
  | "audit-trails"
  | "responsible-ai"
  | "agentic-ai-deployment";

export type SailIndustry =
  | "accounting"
  | "agriculture"
  | "construction-real-estate"
  | "consumer-products"
  | "education"
  | "energy"
  | "finance-insurance"
  | "fmcg"
  | "healthcare"
  | "heavy-industry"
  | "life-sciences"
  | "logistics"
  | "manufacturing"
  | "maritime-shipping"
  | "media"
  | "mining"
  | "oil-gas"
  | "pharmaceutical"
  | "power-generation"
  | "soft-drinks-bottling"
  | "upstream-oil-gas"
  | "utilities";

export type SailConsultant =
  | "khaled-shivji"
  | "deepali-patil"
  | "tomislav-gadzo"
  | "any";

export type ComparisonDimension =
  | "pricing"
  | "delivery-model"
  | "governance"
  | "industry-coverage"
  | "all";
