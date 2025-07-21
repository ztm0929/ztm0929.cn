// EdgeOne Pages Functions 类型定义

export interface EventContext {
  request: Request;
  params: Record<string, string>;
  env: Record<string, string>;
}

export type EdgeFunction = (context: EventContext) => Promise<Response> | Response;
