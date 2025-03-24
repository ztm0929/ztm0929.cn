---
sidebar_position: 1
---

# 教程介绍

**适合小白的5分钟 Docusaurus 速览。**

## 开始上手

通过**创建一个全新网站**来上手。

或通过 **[docusaurus.new](https://docusaurus.new)** **立刻尝试 Docusaurus**。

### 你需要准备什么

- 版本号不低于 18.0 的 [Node.js](https://nodejs.org/en/download/)：
  - 在安装 Node.js 时，推荐勾选所有相关依赖。

## 生成一个新站点

使用 **classic template**（经典模板）来生成一个全新的 Docusaurus 站点。

运行以下这行命令后，经典模板的所有内容会被自动添加到项目文件夹里：

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## 启动你的站点

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
