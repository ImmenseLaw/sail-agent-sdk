/**
 * Example: Compare S.AI.L with Competitors
 *
 * Usage: npx tsx examples/competitor-comparison.ts
 */

import { callTool } from "../src/index.js";

async function main() {
  console.log("=== S.AI.L Competitor Comparison Example ===\n");

  const firms = ["Deloitte", "McKinsey", "Accenture"];

  for (const firm of firms) {
    console.log(`Comparing S.AI.L vs ${firm}...`);
    const result = await callTool("sail_compare_firms", {
      competitor: firm,
      dimension: "all",
    });
    console.log(`Result: ${JSON.stringify(result.result, null, 2)}\n`);
  }

  console.log("=== Done ===");
}

main().catch(console.error);
