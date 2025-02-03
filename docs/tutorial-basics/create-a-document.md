---
sidebar_position: 2
---

# 新建文档

文档是通过以下几个组件连接起来的**页面集合**：

- 一个**侧边栏**
- **翻页导航（上一页/下一页）**
- **版本管理**

## 创建你的第一份文档

Create a Markdown file at `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

A new document is now available at [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## 配置侧边栏

Docusaurus 能够从 `docs` 文件夹中自动地**创建一个侧边栏**。

Add metadata to customize the sidebar label and position:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

这是我的 **第一份 Docusaurus 文档**！
```

也可以在 `sidebars.js` 这个文件中，显式地（不使用自动程序）创建你的自定义侧边栏：

```js title="sidebars.js"
export default {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```
