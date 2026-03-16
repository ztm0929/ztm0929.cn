---
title: "PowerShell"
---

PowerShell 和 Windows PowerShell 是两个不同的东西，我们主要专注于前者。

`$PROFILE` 是一个环境变量，实际是一份用户配置文件，其中用于存放个性化设置。

```powershell title="Windows Terminal（终端）"
notepad $PROFILE

# 两种方式都能用记事本打开配置文件
notepad $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

以下是我的配置文件内容：

```powershell title="$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"

Set-PSReadLineKeyHandler -Chord "Ctrl+RightArrow" -Function AcceptNextSuggestionWord

oh-my-posh init pwsh --config 'C:/Users/ztm0929/ztm0929.omp.json' | Invoke-Expression

Invoke-Expression (&starship init powershell)
```

### 参考资料

- [微软提供的 PowerShell 官方文档](https://learn.microsoft.com/zh-cn/powershell/)