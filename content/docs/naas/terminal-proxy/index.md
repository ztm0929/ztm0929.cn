---
title: "终端代理"
---

我们使用小猫咪开启系统代理之后，默认情况下它只会为浏览器和一些常见的应用程序启用代理，而不会自动为终端启用代理。

可以直观地通过数据感受：

```powershell tab="启用代理前"
# 启用代理前
$result = Measure-Command {
    git clone https://github.com/ztm0929/ztm0929.cn.git ztm0929-noproxy
}

$result | Select-Object TotalHours, TotalMinutes, TotalSeconds

TotalHours TotalMinutes TotalSeconds
---------- ------------ ------------
      0.03         1.61        96.71
```

```powershell tab="启用代理后"
# 启用代理后
$result = Measure-Command {
    git clone https://github.com/ztm0929/ztm0929.cn.git ztm0929-proxy
}

$result | Select-Object TotalHours, TotalMinutes, TotalSeconds

TotalHours TotalMinutes TotalSeconds
---------- ------------ ------------
      0.00         0.06         3.56
```

因此我们需要手动为终端启用代理，方法如下：