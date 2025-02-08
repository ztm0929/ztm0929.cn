---
slug: install-docusaurus
title: 部署文档站点时会用到的一些命令
authors:
  name: 天明
  title: 编程小白
  url: https://github.com/ztm0929.cn
  email: ztm0929@icloud.com
tags: [Docusaurus]
---

[**Docusaurus**](https://docusaurus.io/zh-CN/)（暂时没有中文名，我习惯叫作『小恐龙』😜）是 Facebook 团队开源的建站工具，这里记录一些我们在部署自己的文档站点时会用到的一些命令与解释。

<!-- truncate -->

## 安装 Node

1. 直接进入[官网](https://nodejs.org/zh-cn/)下载，在安装时保持默认选项即可。

2. 安装完成后，在 PowerShell 中分别输入 `node -v` 和 `npm -v` 来检查是否成功安装。

```powershell
node -v
# 返回版本号即表示安装成功
# v22.13.1

npm -v
# 返回版本号即表示安装成功
# 11.0.0
```

## 安装小恐龙

接着在命令行中输入这一行命令：

```powershell
npm init docusaurus@latest ztm0929 classic --registry=https://registry.npmmirror.com -y
```

各部分详细解释：

- `npm init docusaurus@latest`：使用 `npm` 去查找当前电脑里有没有小恐龙的最新版，如果没有小恐龙或不是最新的，就安装最新版然后进行项目初始化。
- `ztm0929`： 项目初始化的时候会创建一个根目录，当前目录的名字就是 `ztm0929`，可以任意替换成自己容易辨识的名字。
- `classic`：这里是固定参数，告诉小恐龙我们需要使用经典模板主题，[**目前只有这一个模板**](https://docusaurus.io/zh-CN/docs/api/themes)；（当然在安装完模板后依然可以进行自定义美化~）
- `--registry=https://registry.npmmirror.com`：表示 `npm` 在安装小恐龙时应该去哪个源仓库里查找，这里选择的是[淘宝开发团队](https://developer.aliyun.com/mirror/NPM)维护的仓库；
- `-y`：表示接受所有默认配置并跳过所有提示。

## 运行小恐龙

在完成安装后，输入 `npm run start`，就可以看到站点的页面啦！
