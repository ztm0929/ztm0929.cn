---
title: "笔记链接"
---

尝试用快捷方式链接到笔记文件夹

```
New-Item `
  -ItemType Junction `
  -Path "$HOME/Desktop/notes" `
  -Target "C:\Users\ztm0929\Documents\misc\ztm0929.cn\content\notes"
```


```
cmd /c mklink /J C:\Users\ztm0929\Desktop\notes "C:\Users\ztm0929\Documents\misc\ztm0929.cn\content\notes"
```