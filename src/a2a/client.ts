/**
 * A2A Client for S.AI.L
 *
 * Sends JSON-RPC 2.0 messages to S.AI.L's A2A endpoint
 * and receives structured responses.
 */

import { SAIL_CONFIG } from "../shared/config.js";
import type { JsonRpcRequest, JsonRpcResponse } from "../shared/types.js";
import type { A2ASendMessageResult, A2ATextPart } from "./types.js";

let requestCounter = 0;

export interface A2AClientOptions {
  endpoint?: string;
  headers?: Record<string, string>;
}

/**
 * Send a text message to S.AI.L's A2A agent and receive a response.
 *
 * @param text - The message to send
 * @param options - Optional endpoint and header overrides
 * @returns The agent's text response
 *
 * @example
 * ```ts
 * const reply = await sendMessage("What services does S.AI.L offer?");
 * console.log(reply);
 * ```
 */
export async function sendMessage(
  text: string,
  options: A2AClientOptions = {}
): Promise<string> {
  const endpoint = options.endpoint ?? SAIL_CONFIG.a2aEndpoint;

  const parts: A2ATextPart[] = [{ kind: "text", text }];

  const rpcRequest: JsonRpcRequest = {
    jsonrpc: "2.0",
    id: ++requestCounter,
    method: "message/send",
    params: {
      message: {
        parts,
      },
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(rpcRequest),
  });

  if (!response.ok) {
    throw new Error(
      `A2A request failed: ${response.status} ${response.statusText}`
    );
  }

  const rpcResponse: JsonRpcResponse<A2ASendMessageResult> =
    await response.json();

  if (rpcResponse.error) {
    throw new Error(
      `A2A error ${rpcResponse.error.code}: ${rpcResponse.error.message}`
    );
  }

  const result = rpcResponse.result;
  if (!result?.message?.parts?.length) {
    throw new Error("A2A response contained no message parts");
  }

  return result.message.parts
    .filter((p): p is A2ATextPart => p.kind === "text")
    .map((p) => p.text)
    .join("\n");
}

/**
 * Send a raw JSON-RPC request to S.AI.L's A2A endpoint.
 *
 * @param method - JSON-RPC method name
 * @param params - Method parameters
 * @param options - Optional endpoint and header overrides
 * @returns Raw JSON-RPC response
 */
export async function sendRpcRequest<T = unknown>(
  method: string,
  params?: Record<string, unknown>,
  options: A2AClientOptions = {}
): Promise<JsonRpcResponse<T>> {
  const endpoint = options.endpoint ?? SAIL_CONFIG.a2aEndpoint;

  const rpcRequest: JsonRpcRequest = {
    jsonrpc: "2.0",
    id: ++requestCounter,
    method,
    params,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(rpcRequest),
  });

  if (!response.ok) {
    throw new Error(
      `A2A request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
