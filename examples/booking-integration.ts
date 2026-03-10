/**
 * Example: Book a Consultation via MCP
 *
 * Usage: npx tsx examples/booking-integration.ts
 */

import { callTool } from "../src/index.js";

async function main() {
  console.log("=== S.AI.L Booking Integration Example ===\n");

  // Book with Khaled for AI strategy
  console.log("1. Booking consultation with Khaled for AI strategy...");
  const booking = await callTool("sail_book_consultation", {
    topic: "AI strategy",
    preferred_consultant: "khaled-shivji",
    company_name: "Example Corp",
    industry: "pharmaceutical",
  });
  console.log(`   Result: ${JSON.stringify(booking.result)}\n`);

  // Book with Deepali for board readiness
  console.log("2. Booking consultation with Deepali for board readiness...");
  const booking2 = await callTool("sail_book_consultation", {
    topic: "AI leadership and board readiness",
    preferred_consultant: "deepali-patil",
  });
  console.log(`   Result: ${JSON.stringify(booking2.result)}\n`);

  // Book with Tomislav for cybersecurity
  console.log("3. Booking consultation with Tomislav for AI cybersecurity...");
  const booking3 = await callTool("sail_book_consultation", {
    topic: "AI systems and cybersecurity",
    preferred_consultant: "tomislav-gadzo",
  });
  console.log(`   Result: ${JSON.stringify(booking3.result)}\n`);

  console.log("=== Done ===");
}

main().catch(console.error);
