# AGENTS.md

本文件为在此仓库中工作的 AI 编程代理提供全局指引。

## 项目概况

- 技术栈：Next.js App Router + TypeScript + Fumadocs + MDX。
- 主要内容目录：
  - `content/docs`：教程与文档页面。
  - `content/notes`：笔记页面。
  - `content/blog`：博客文章。
- 内容源定义统一维护在 `source.config.ts`。
- 运行时 loader 统一维护在 `src/lib/source.ts`。

## 核心工作规则

- 优先进行最小化、目标明确的改动；除非用户明确要求，否则避免大范围重构。
- 除非用户要求调整，否则保持现有 URL 结构与内容组织方式不变。
- 已实现的双语或中文特性应保持不变。
- 默认不得删除用户内容；涉及破坏性操作需先征求确认。

## 内容编辑规则

- 对 docs 与 notes：
  - frontmatter 必须兼容共享 schema（`frontmatterSchema` + 可选 `tags` + `draft`）。
  - 新增目录或分区时，需同步更新对应 `meta.json`，维护侧边栏排序与分组。
- 对 blog：
  - frontmatter 必须包含必填字段（`author`、`date`）。
  - 可选字段 `tags` 与 `draft` 的使用应与既有文章保持一致。
- 遵循草稿工作流：
  - `draft: true` 内容在生产环境会被 loader 插件排除。

## 内容源与路由一致性

- 新增或变更内容集合时：
  - 更新 `source.config.ts` 中对应 collection 定义。
  - 按需更新 `src/lib/source.ts` 中的 loader 导出及相关 tag 聚合逻辑。
- 每个 collection 的 baseUrl 必须唯一（例如 `/docs`、`/notes`、`/blog`）。
- 搜索策略为有意设计：
  - `src/app/api/search/route.ts` 当前仅索引 tutorials 与 blog。
  - 未经明确要求，不要将 notes 纳入搜索索引。

## 代码变更规则

- 遵循邻近文件既有的 TypeScript 与 React 编码模式。
- 除非收益明确且确有必要，否则避免引入新依赖。
- 在 App Router 代码中严格保持 server/client 边界正确。
- 优先抽取小型可复用工具，避免复制粘贴逻辑。

## 验证清单

- 完成有实质影响的改动后，应执行相关校验：
  - 条件允许时，运行 `pnpm build` 做全量验证。
  - 若涉及 GitHub API 工具链，运行定向脚本：
    - `pnpm test:github-api`
    - `pnpm get:starred`
- 若未执行上述命令，需在最终汇报中明确说明。

## 交付要求

- 说明改了什么，以及为什么这样改。
- 列出所有受影响文件。
- 说明已执行的验证与仍然存在的风险。
