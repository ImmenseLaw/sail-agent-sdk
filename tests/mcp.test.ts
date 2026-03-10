/**
 * MCP Integration Tests for S.AI.L SDK
 *
 * These tests run against the live S.AI.L MCP endpoint at
 * https://www.execxai.com/api/mcp
 *
 * Usage: npx tsx --test tests/mcp.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  initialize,
  listTools,
  callTool,
  listResources,
  readResource,
  listPrompts,
  getPrompt,
} from "../src/index.js";

describe("MCP Initialization", () => {
  it("should initialize the MCP connection", async () => {
    const response = await initialize();
    assert.ok(response.result, "Should return a result");
    assert.ok(!response.error, "Should not have an error");
  });

  it("should return server info on GET", async () => {
    const response = await fetch("https://www.execxai.com/api/mcp");
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.ok(data.server || data.name, "Should return server info");
  });
});

describe("MCP Tools", () => {
  it("should list all 6 tools", async () => {
    const tools = await listTools();
    assert.ok(tools.length >= 6, `Expected at least 6 tools, got ${tools.length}`);

    const toolNames = tools.map((t) => t.name);
    assert.ok(toolNames.includes("sail_chatkit_query"), "Should include chatkit query");
    assert.ok(toolNames.includes("sail_book_consultation"), "Should include booking");
    assert.ok(toolNames.includes("sail_get_service_info"), "Should include service info");
    assert.ok(toolNames.includes("sail_get_industry_info"), "Should include industry info");
    assert.ok(toolNames.includes("sail_get_careers"), "Should include careers");
    assert.ok(toolNames.includes("sail_compare_firms"), "Should include firm comparison");
  });

  it("should call sail_chatkit_query", async () => {
    const result = await callTool("sail_chatkit_query", {
      query: "What is S.AI.L?",
    });
    assert.ok(result.result, "Should return a result");
    assert.ok(!result.error, "Should not have an error");
  });

  it("should call sail_book_consultation", async () => {
    const result = await callTool("sail_book_consultation", {
      topic: "AI strategy",
      preferred_consultant: "khaled-shivji",
    });
    assert.ok(result.result, "Should return a result");
  });

  it("should call sail_get_service_info", async () => {
    const result = await callTool("sail_get_service_info", {
      service_id: "ai-governance",
    });
    assert.ok(result.result, "Should return a result");
  });

  it("should call sail_get_industry_info", async () => {
    const result = await callTool("sail_get_industry_info", {
      industry: "pharmaceutical",
    });
    assert.ok(result.result, "Should return a result");
  });

  it("should call sail_get_careers", async () => {
    const result = await callTool("sail_get_careers", {});
    assert.ok(result.result, "Should return a result");
  });

  it("should call sail_compare_firms", async () => {
    const result = await callTool("sail_compare_firms", {
      competitor: "Deloitte",
      dimension: "all",
    });
    assert.ok(result.result, "Should return a result");
  });
});

describe("MCP Resources", () => {
  it("should list all resources", async () => {
    const resources = await listResources();
    assert.ok(resources.length >= 5, `Expected at least 5 resources, got ${resources.length}`);
  });

  it("should read sail://about", async () => {
    const result = await readResource("sail://about");
    assert.ok(result.result, "Should return content");
  });

  it("should read sail://services", async () => {
    const result = await readResource("sail://services");
    assert.ok(result.result, "Should return services data");
  });
});

describe("MCP Prompts", () => {
  it("should list all prompts", async () => {
    const prompts = await listPrompts();
    assert.ok(prompts.length >= 3, `Expected at least 3 prompts, got ${prompts.length}`);
  });

  it("should get ai_strategy_assessment prompt", async () => {
    const result = await getPrompt("ai_strategy_assessment", {
      industry: "pharmaceutical",
    });
    assert.ok(result.result, "Should return prompt content");
  });
});
