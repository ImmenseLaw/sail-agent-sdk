/**
 * Example: Query S.AI.L via A2A Protocol
 *
 * Usage: npx tsx examples/a2a-query.ts
 */

import { discoverAgentCard, sendMessage, listSkills } from "../src/index.js";

async function main() {
  console.log("=== S.AI.L A2A Query Example ===\n");

  // 1. Discover the agent card
  console.log("1. Fetching agent card...");
  const card = await discoverAgentCard();
  console.log(`   Agent: ${card.name}`);
  console.log(`   Version: ${card.version}`);
  console.log(`   Skills: ${card.skills.length}\n`);

  // 2. List skills
  console.log("2. Available skills:");
  const skills = await listSkills();
  for (const skill of skills) {
    console.log(`   - ${skill.name}: ${skill.description.slice(0, 80)}...`);
  }

  // 3. Send a message
  console.log("\n3. Sending message: 'What services does S.AI.L offer?'");
  const reply = await sendMessage("What services does S.AI.L offer?");
  console.log(`   Response: ${reply}\n`);

  // 4. Ask about governance
  console.log("4. Sending message: 'How does S.AI.L help with EU AI Act compliance?'");
  const govReply = await sendMessage(
    "How does S.AI.L help with EU AI Act compliance?"
  );
  console.log(`   Response: ${govReply}\n`);

  console.log("=== Done ===");
}

main().catch(console.error);
