/**
 * Google Agent2Agent (A2A) Protocol type definitions
 * Spec: https://a2a-protocol.org
 */

export interface A2AAgentCard {
  name: string;
  description: string;
  version: string;
  supportedInterfaces?: {
    url: string;
    protocolBinding: string;
    protocolVersion: string;
  }[];
  capabilities: A2ACapabilities;
  skills: A2ASkill[];
  defaultInputModes: string[];
  defaultOutputModes: string[];
  provider?: {
    organization: string;
    url: string;
    contactEmail?: string;
    consultationUrl?: string;
  };
  iconUrl?: string;
  documentationUrl?: string;
}

export interface A2ACapabilities {
  streaming: boolean;
  pushNotifications: boolean;
  stateTransitionHistory?: boolean;
  extendedAgentCard?: boolean;
}

export interface A2ASkill {
  id: string;
  name: string;
  description: string;
  tags: string[];
  examples: string[];
}

export interface A2ATextPart {
  kind: "text";
  text: string;
}

export interface A2AMessage {
  kind: "message";
  messageId: string;
  role: "user" | "agent";
  contextId: string;
  parts: A2ATextPart[];
}

export interface A2ASendMessageParams {
  message: {
    contextId?: string;
    parts: A2ATextPart[];
  };
}

export interface A2ASendMessageResult {
  message: A2AMessage;
}
