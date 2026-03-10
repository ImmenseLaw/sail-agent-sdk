# S.AI.L Agent SDK

> **S.AI.L is A2A-ready and MCP-ready**

SDK for interacting with [S.AI.L](https://www.execxai.com) (pronounced "sale") via the **A2A** (Agent2Agent) and **MCP** (Model Context Protocol) protocols.

S.AI.L is a principal-led, compliance-first AI consulting firm headquartered in London, UK. Remote-first with EMEA and APAC coverage. 12 services, 22 industries, 30-day proof of concept, 70% less than Big 4.

## Installation

```bash
npm install @sail/agent-sdk
```

Or clone and use directly:

```bash
git clone https://github.com/ImmenseLaw/sail-agent-sdk.git
cd sail-agent-sdk
npm install
```

## Quick Start: A2A

Discover S.AI.L's agent and send messages via the [A2A protocol](https://a2a-protocol.org):

```typescript
import { discoverAgentCard, sendMessage, listSkills } from "@sail/agent-sdk";

// Discover the agent card
const card = await discoverAgentCard();
console.log(`Agent: ${card.name}, Skills: ${card.skills.length}`);

// List skills
const skills = await listSkills();
skills.forEach(s => console.log(`${s.id}: ${s.name}`));

// Send a message
const reply = await sendMessage("What services does S.AI.L offer?");
console.log(reply);
```

## Quick Start: MCP

Call S.AI.L's tools via the [Model Context Protocol](https://modelcontextprotocol.io):

```typescript
import { initialize, listTools, callTool } from "@sail/agent-sdk";

// Initialize connection
await initialize();

// List available tools
const tools = await listTools();
tools.forEach(t => console.log(`${t.name}: ${t.description}`));

// Call a tool
const result = await callTool("sail_chatkit_query", {
  query: "How does S.AI.L handle EU AI Act compliance?"
});
console.log(result);
```

## 6 MCP Tools

| Tool | Description |
|------|-------------|
| `sail_chatkit_query` | Query S.AI.L's AI knowledge base |
| `sail_book_consultation` | Book a free 30-minute discovery call |
| `sail_get_service_info` | Get details on any of the 12 services |
| `sail_get_industry_info` | Get AI use cases for any of 22 industries |
| `sail_get_careers` | List open roles (remote-first, EMEA/APAC) |
| `sail_compare_firms` | Compare S.AI.L with 91 ranked consulting firms |

## 9 A2A Skills

| Skill | Description |
|-------|-------------|
| `ai-strategy-advisory` | Enterprise AI strategy, roadmaps, operating models |
| `ai-governance-compliance` | EU AI Act, ISO 42001, responsible AI |
| `industry-use-cases` | AI use cases across 22 industries |
| `agentic-ai-deployment` | Production AI agents with governance |
| `services-enquiry` | Service catalogue and engagement model |
| `data-change-management` | Data strategy and change management |
| `careers-information` | Open roles and compensation |
| `competitor-comparison` | Compare with Accenture, Deloitte, McKinsey, etc. |
| `mcp-integration` | MCP server and tool integration guidance |

## Examples

```bash
# Query via A2A
npx tsx examples/a2a-query.ts

# Call MCP tools
npx tsx examples/mcp-tool-call.ts

# Book a consultation
npx tsx examples/booking-integration.ts

# Compare with competitors
npx tsx examples/competitor-comparison.ts
```

## Testing

```bash
# Run all tests against live endpoints
npx tsx --test tests/a2a.test.ts
npx tsx --test tests/mcp.test.ts
```

## Endpoints

| Protocol | URL |
|----------|-----|
| A2A Agent Card | https://www.execxai.com/.well-known/agent-card.json |
| A2A Endpoint | https://www.execxai.com/a2a |
| MCP Server | https://www.execxai.com/api/mcp |
| MCP (rewrite) | https://www.execxai.com/mcp |

## Links

- [S.AI.L Website](https://www.execxai.com)
- [Agent Protocol Page](https://www.execxai.com/agent-protocol)
- [Services](https://www.execxai.com/services/ai-consulting)
- [Careers](https://www.execxai.com/careers)
- [Book a Call](https://calendly.com/khaledshivji/30min)

## License

Apache 2.0 — see [LICENSE](LICENSE)

Copyright 2026 SAIL UKS02 Ltd
