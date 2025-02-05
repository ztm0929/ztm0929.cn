---
sidebar_position: 3
---

# 新建博客文章

Docusaurus 可以**为每一篇博文创建一个页面**，同时支持**博客目录页面、标签系统、RSS 源**等功能。

## 创建你的第一篇博文

在 `blog` 文件夹里创建一个文件并命名为 `2021-02-28-greetings.md`：

```md title="blog/2021-02-28-greetings.md"
---
slug: greetings
title: Greetings!
authors:
  - name: Joel Marcey
    title: Co-creator of Docusaurus 1
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
  - name: Sébastien Lorber
    title: Docusaurus maintainer
    url: https://sebastienlorber.com
    image_url: https://github.com/slorber.png
tags: [greetings]
---

恭喜，你已经成功创建了第一篇博文！

随时可以按自己的需要修改编辑这篇博文。
```

现在这篇新博文可以通过 [http://localhost:3000/blog/greetings](http://localhost:3000/blog/greetings) 访问。

注：仔细留意访问路径，可以发现**日期部分可以被省略**。
