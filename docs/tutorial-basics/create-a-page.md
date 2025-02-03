---
sidebar_position: 1
---

# 创建一个页面

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## 创建你的第一个 React 页面

在 `src/pages/` 目录下创建一个文件并命名为 `my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

现在成功生成了一个页面，它的访问路径是 [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## 创建你的第一个 Markdown 页面

在 `src/pages/` 目录下创建一个文件并命名为 `my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

现在又成功生成了一个新页面，它的访问路径是 [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page).
