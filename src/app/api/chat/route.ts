// TODO: 接入外部 API 后，替换此文件为实际的 AI 对话路由实现。
// 目前仅作占位，返回"暂时不可用"提示。
// 注意：该站点为静态导出，生产环境中此路由不会运行，需配合外部 API 服务使用。

export async function POST(_req: Request) {
  const encoder = new TextEncoder();
  const text = 'AI 对话功能暂时不可用，敬请期待。';

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`f:{"messageId":"msg-unavailable"}\n`));
      controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
      controller.enqueue(
        encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`),
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-vercel-ai-ui-message-stream': 'v1',
    },
  });
}
