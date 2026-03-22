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

### 确认当前的 Shell 版本

这行命令在做三件事，查看当前 Shell 的名称、类型和版本：

```powershell title="Windows Terminal（终端）"
[PSCustomObject]@{
    进程名        = (Get-Process -Id $PID).ProcessName
    PowerShell版本 = $PSVersionTable.PSVersion
    运行版本类型   = $PSVersionTable.PSEdition
}
```

Windows PowerShell 和 PowerShell 本质上是两款不同的程序，前者是 Windows 自带的，后者是微软开源的跨平台版本。两者的环境变量注入方式相同，但 PowerShell 7 及以上版本提供了更丰富的功能和更好的性能。

我们通过返回的内容来确定当前我们正在使用的 Shell 版本：

<Tabs items={['Windows PowerShell', 'PowerShell']}>
<Tab value="Windows PowerShell">
```powershell title="Windows Terminal（终端）"
进程名     PowerShell版本 运行版本类型
------     -------------- ------------
powershell 5.1.19041.6456 Desktop

```

### 注入环境变量

```
$env:HTTP_PROXY="http://127.0.0.1:7897"; $env:HTTPS_PROXY="http://127.0.0.1:7897"
```

```powershell title="Windows Terminal（终端）"
notepad $PROFILE

# 两种方式都能用记事本打开配置文件
notepad $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

</Tab>
<Tab value="PowerShell">
```powershell
进程名 PowerShell版本 运行版本类型
------ -------------- ------------
pwsh   7.5.4          Core
```

### 注入环境变量

```
$env:HTTP_PROXY="http://127.0.0.1:7897"; $env:HTTPS_PROXY="http://127.0.0.1:7897"
```

```powershell title="Windows Terminal（终端）"
notepad $PROFILE

# 两种方式都能用记事本打开配置文件
notepad $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```
</Tab>
</Tabs>





### 注入环境变量

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

### 参考资料

- [微软提供的 PowerShell 官方文档](https://learn.microsoft.com/zh-cn/powershell/)