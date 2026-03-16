---
title: "使用 scoop 管理 Windows 软件"
---

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```
查看 scoop 版本：
```
scoop -v
```

```
scoop install git
scoop bucket add extras
scoop install windows-terminal
```