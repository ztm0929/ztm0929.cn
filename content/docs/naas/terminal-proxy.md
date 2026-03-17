---
title: "如何为终端启用代理"
---

我们使用小猫咪开启系统代理之后，默认情况下它只会为浏览器和一些常见的应用程序启用代理，而不会自动为终端启用代理。

可以直观地通过数据感受：

```powershell
# 启用代理前
Measure-Command {
    git clone https://github.com/ztm0929/ztm0929.cn.git ztm0929-test
}

Cloning into 'ztm0929-test'...
remote: Enumerating objects: 2181, done.
remote: Counting objects: 100% (654/654), done.
remote: Compressing objects: 100% (83/83), done.
remote: Total 2181 (delta 574), reused 627 (delta 566), pack-reused 1527 (from 2)
Receiving objects: 100% (2181/2181), 9.91 MiB | 147.00 KiB/s, done.
Resolving deltas: 100% (1149/1149), done.

Days              : 0
Hours             : 0
Minutes           : 1
Seconds           : 10
Milliseconds      : 412
Ticks             : 704123987
TotalDays         : 0.000814958318287037
TotalHours        : 0.0195589996388889
TotalMinutes      : 1.17353997833333
TotalSeconds      : 70.4123987
TotalMilliseconds : 70412.3987
```

```powershell
# 启用代理后
Measure-Command {
∙     git clone https://github.com/ztm0929/ztm0929.cn.git ztm0929-proxy
∙ }
Cloning into 'ztm0929-proxy'...
remote: Enumerating objects: 2181, done.
remote: Counting objects: 100% (654/654), done.
remote: Compressing objects: 100% (83/83), done.
remote: Total 2181 (delta 574), reused 627 (delta 566), pack-reused 1527 (from 2)
Receiving objects: 100% (2181/2181), 9.91 MiB | 6.31 MiB/s, done.
Resolving deltas: 100% (1149/1149), done.

Days              : 0
Hours             : 0
Minutes           : 0
Seconds           : 3
Milliseconds      : 426
Ticks             : 34267599
TotalDays         : 3.96615729166667E-05
TotalHours        : 0.00095187775
TotalMinutes      : 0.057112665
TotalSeconds      : 3.4267599
TotalMilliseconds : 3426.7599
```

因此我们需要手动为终端启用代理，方法如下：