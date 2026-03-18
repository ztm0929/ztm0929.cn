---
title: "为 Windows 终端启用代理"
---

```
$env:HTTP_PROXY="http://127.0.0.1:7897"; $env:HTTPS_PROXY="http://127.0.0.1:7897"
```

```powershell title="Windows Terminal（终端）"
notepad $PROFILE

# 两种方式都能用记事本打开配置文件
notepad $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

在打开的文件中添加以下内容：

```powershell title="$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
```


```powershell
# 1. 确保 profile 文件存在
if (!(Test-Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}

# 2. 要追加的内容
$block = @'
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
'@

# 3. 读取现有内容（允许空文件）
$content = Get-Content $PROFILE -Raw -ErrorAction SilentlyContinue

# 4. 如果不存在这两行才追加
if ($content -notmatch [regex]::Escape('$env:HTTP_PROXY="http://127.0.0.1:7897"')) {
    Add-Content -Path $PROFILE -Value "`n$block"
}
```