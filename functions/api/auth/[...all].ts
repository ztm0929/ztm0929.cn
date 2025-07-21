import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import type { EventContext } from "../../types";

// EdgeOne Functions 处理器
export async function onRequest(context: EventContext): Promise<Response> {
  const { request } = context;
  
  try {
    // 获取 better-auth 的处理器
    const { POST, GET } = toNextJsHandler(auth);
    
    // 根据请求方法调用对应的处理器
    if (request.method === 'POST') {
      return await POST(request);
    } else if (request.method === 'GET') {
      return await GET(request);
    } else {
      return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(
      JSON.stringify({ error: 'Authentication failed' }), 
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

// 可以分别导出不同的 HTTP 方法处理器（可选）
export async function onRequestGet(context: EventContext): Promise<Response> {
  const { GET } = toNextJsHandler(auth);
  return await GET(context.request);
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { POST } = toNextJsHandler(auth);
  return await POST(context.request);
}
