/**
 * A2A Agent Card discovery and parsing
 */

import { SAIL_CONFIG } from "../shared/config.js";
import type { A2AAgentCard } from "./types.js";

/**
 * Fetch and parse the S.AI.L A2A Agent Card.
 *
 * @param url - Override the agent card URL (defaults to S.AI.L production)
 * @returns Parsed A2A Agent Card
 */
export async function discoverAgentCard(
  url: string = SAIL_CONFIG.agentCardUrl
): Promise<A2AAgentCard> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch agent card from ${url}: ${response.status} ${response.statusText}`
    );
  }

  const card: A2AAgentCard = await response.json();
  return card;
}

/**
 * List all skills from the agent card.
 */
export async function listSkills(
  url?: string
): Promise<A2AAgentCard["skills"]> {
  const card = await discoverAgentCard(url);
  return card.skills;
}

/**
 * Find a skill by ID or tag.
 */
export async function findSkill(
  query: string,
  url?: string
): Promise<A2AAgentCard["skills"][number] | undefined> {
  const card = await discoverAgentCard(url);
  const q = query.toLowerCase();
  return card.skills.find(
    (s) =>
      s.id.toLowerCase() === q ||
      s.name.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
  );
}
