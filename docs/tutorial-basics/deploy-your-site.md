---
sidebar_position: 5
---

# 部署网站

Docusaurus 是一个**静态站点生成器**（也被称作 **[JAMstack](https://jamstack.org/)**）。

它通过一些简单的**静态 HTML、JavaScript 和 CSS 文件**来搭建你的站点。

## 构建你的站点

构建一个适用于**生产环境**（也就是可以正式访问使用）的站点：

```bash
npm run build
```

所有需要的静态文件现在已经被生成并存放在了 `build` 文件夹里。

## 部署你的站点

首先在本地测试你的生产环境构建：

```bash
npm run serve
```

现在整个 `build` 文件夹可以通过 [http://localhost:3000/](http://localhost:3000/) 来访问。

现在你可以将 `build` 文件夹轻松地放到**几乎任何的云服务厂商**，它们有的**免费**，有的需要一些小额收费（查阅这篇[**部署指南**](https://docusaurus.io/docs/deployment)来了解更多细节）。
