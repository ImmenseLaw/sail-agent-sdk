/**
 * A2A Integration Tests for S.AI.L SDK
 *
 * These tests run against the live S.AI.L A2A endpoint at
 * https://www.execxai.com/a2a
 *
 * Usage: npx tsx --test tests/a2a.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  discoverAgentCard,
  listSkills,
  findSkill,
  sendMessage,
  sendRpcRequest,
} from "../src/index.js";

describe("A2A Agent Card Discovery", () => {
  it("should fetch and parse the agent card", async () => {
    const card = await discoverAgentCard();
    assert.ok(card.name, "Agent card should have a name");
    assert.ok(card.url, "Agent card should have a URL");
    assert.ok(card.skills.length > 0, "Agent card should have skills");
    assert.ok(card.version, "Agent card should have a version");
  });

  it("should list skills", async () => {
    const skills = await listSkills();
    assert.ok(skills.length >= 9, "Should have at least 9 skills");
  });

  it("should find a skill by ID", async () => {
    const skill = await findSkill("ai-strategy-advisory");
    assert.ok(skill, "Should find ai-strategy-advisory skill");
    assert.equal(skill.id, "ai-strategy-advisory");
  });

  it("should find a skill by tag", async () => {
    const skill = await findSkill("governance");
    assert.ok(skill, "Should find a skill matching governance");
  });
});

describe("A2A Messaging", () => {
  it("should send a message and receive a response", async () => {
    const reply = await sendMessage("What is S.AI.L?");
    assert.ok(reply.length > 0, "Should receive a non-empty reply");
    assert.ok(
      reply.toLowerCase().includes("sail") ||
        reply.toLowerCase().includes("s.ai.l") ||
        reply.toLowerCase().includes("sale"),
      "Reply should mention S.AI.L"
    );
  });

  it("should handle governance queries", async () => {
    const reply = await sendMessage("Tell me about AI governance");
    assert.ok(reply.length > 0, "Should receive a response");
    assert.ok(
      reply.toLowerCase().includes("governance") ||
        reply.toLowerCase().includes("eu ai act") ||
        reply.toLowerCase().includes("iso 42001"),
      "Reply should mention governance topics"
    );
  });

  it("should handle competitor comparison queries", async () => {
    const reply = await sendMessage("Compare with Deloitte");
    assert.ok(reply.length > 0, "Should receive a response");
  });

  it("should handle careers queries", async () => {
    const reply = await sendMessage("Are there any open jobs?");
    assert.ok(reply.length > 0, "Should receive a response");
    assert.ok(
      reply.toLowerCase().includes("role") ||
        reply.toLowerCase().includes("hiring") ||
        reply.toLowerCase().includes("career") ||
        reply.toLowerCase().includes("remote"),
      "Reply should mention roles or hiring"
    );
  });

  it("should return a default response for unknown queries", async () => {
    const reply = await sendMessage("random query 12345");
    assert.ok(reply.length > 0, "Should receive a default response");
    assert.ok(
      reply.toLowerCase().includes("sail") ||
        reply.toLowerCase().includes("s.ai.l") ||
        reply.toLowerCase().includes("consulting"),
      "Default reply should mention S.AI.L"
    );
  });
});

describe("A2A Raw RPC", () => {
  it("should handle GetTask method", async () => {
    const response = await sendRpcRequest("GetTask", { taskId: "nonexistent" });
    assert.ok(response.error, "GetTask should return an error for unknown tasks");
  });

  it("should handle unknown methods", async () => {
    const response = await sendRpcRequest("UnknownMethod", {});
    assert.ok(response.error, "Unknown methods should return an error");
    assert.equal(response.error?.code, -32601, "Error code should be method not found");
  });

  it("should return agent info on GET", async () => {
    const response = await fetch("https://www.execxai.com/a2a");
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.protocol, "A2A");
  });
});
