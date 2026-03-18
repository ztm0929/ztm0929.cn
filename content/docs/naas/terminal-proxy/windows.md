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
$profileDir = Split-Path -Parent $PROFILE
if (!(Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}
if (!(Test-Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}

# 2. 要追加的内容
$httpLine = '$env:HTTP_PROXY="http://127.0.0.1:7897"'
$httpsLine = '$env:HTTPS_PROXY="http://127.0.0.1:7897"'

# 3. 读取现有内容（允许空文件）
$content = Get-Content $PROFILE -Raw -ErrorAction SilentlyContinue

# 4. 分别检查并追加，避免漏写其中一行
if ($content -notmatch [regex]::Escape($httpLine)) {
    Add-Content -Path $PROFILE -Value "`n$httpLine"
}
if ($content -notmatch [regex]::Escape($httpsLine)) {
    Add-Content -Path $PROFILE -Value "`n$httpsLine"
}

# 5. 当前终端立即生效
. $PROFILE

# 6. 验证
echo $env:HTTP_PROXY
echo $env:HTTPS_PROXY
```

> 注意：上面是为 PowerShell 启动时自动设置代理（仅对 PowerShell 会话生效）。
> 如果你希望“系统级/所有程序”长期生效，请使用系统环境变量（例如 setx），并重新打开终端或重启相关程序。