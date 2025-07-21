import { NextComment } from "@fuma-comment/server/next";
import { createBetterAuthAdapter } from "@fuma-comment/server/adapters/better-auth";
import { createDrizzleAdapter } from "@fuma-comment/server/adapters/drizzle";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { comments, rates, roles, user } from "@/lib/schema";
import type { EventContext } from "../../types";

// 创建 NextComment 处理器
const commentHandlers = NextComment({
  mention: { enabled: true },
  auth: createBetterAuthAdapter(auth),
  storage: createDrizzleAdapter({
    auth: "better-auth",
    db,
    schemas: {
      comments,
      rates,
      roles,
      user,
    },
  }),
});

// EdgeOne Functions 通用处理器
export async function onRequest(context: EventContext): Promise<Response> {
  const { request } = context;
  
  try {
    // 根据请求方法调用对应的处理器
    switch (request.method) {
      case 'GET':
        return await commentHandlers.GET(request);
      case 'POST':
        return await commentHandlers.POST(request);
      case 'PATCH':
        return await commentHandlers.PATCH(request);
      case 'DELETE':
        return await commentHandlers.DELETE(request);
      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Comment error:', error);
    return new Response(
      JSON.stringify({ error: 'Comment operation failed' }), 
      { 
        status: 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}

// 分别导出不同的 HTTP 方法处理器
export async function onRequestGet(context: EventContext): Promise<Response> {
  return await commentHandlers.GET(context.request);
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  return await commentHandlers.POST(context.request);
}

export async function onRequestPatch(context: EventContext): Promise<Response> {
  return await commentHandlers.PATCH(context.request);
}

export async function onRequestDelete(context: EventContext): Promise<Response> {
  return await commentHandlers.DELETE(context.request);
}
