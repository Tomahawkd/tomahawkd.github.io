---
permalink: /blogs/20250629-brokenarrow
title: 浅析某箭的反作弊机制
---

{% include title_patch.html %}

{% include gen_index.html %}

# 背景

6.20 等了大半年的某箭发售了，但是众所周知其反作弊机制依托，刚上线就封了一大批汉化。

免责声明：本 blog 仅记录搞事的过程，不提供学习手段，请不要作弊

# 随便逛逛

在开始之前，先随便看看游戏目录，发现游戏目录下的 `RuntimeInitializeOnLoads.json` 里
有明显的 "AntiCheat" 字样：

```json
{
  "assemblyName":"ACTk.Runtime",
  "nameSpace":"CodeStage.AntiCheat.Common",
  "className":"ACTk",
  "methodName":"GetUnityInfo",
  "loadTypes":0,
  "isUnityClass":false
}
```

那就根据这些信息先搜搜这是个啥东西：

不难搜到，就是本游戏用的反作弊系统了，叫 Anti-Cheat Toolkit (ACTK)。

看介绍，主要有以下特性：

- 保护内存数据：看起来是封装了基本数据并做加密混淆
- 保护文件完整性
- 检测调速挂和透视挂
- 检测程序注入

看了下 youtube 视频，在混淆的基础上，还有疑似蜜罐的机制，如果挂哥同时修改了真实数据和蜜罐数据，
也会被检测到。

差不多反作弊的特性知道了，开始逆向程序。

# 信息收集

看到游戏目录，首先这是一个 unity 程序，那没碰过游戏逆向的我当然是使用万能的谷歌了。

随便找了一篇文章，发现目前 unity 主要有两种方式打包：

- Mono: 主要特征为 `Assembly-CSharp.dll`
- il2cpp: 主要特征为 `GameAssembly.dll`

根据某箭的游戏目录可知，其使用的是后者。那我们也根据 il2cpp 的教程继续往下走。

il2cpp 的逆向主要依靠 [`Il2CppDumper` 工具](https://github.com/Perfare/Il2CppDumper)，
但是要注意可能有混淆，那么先试一下。

不愧是小作坊，一点混淆没有，strip 也没有，可以直接 dump 出来所有的信息。

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/dump.png"  alt=""/>
</div>

最难绷的是，你是隔着模板抄啊。。。。为什么还要个变量 `cheatsDetected`，你不都信息上传
封禁一条龙了吗，毫无意义啊。

继续，，这个 `dump.cs` 只给我们提供了接口信息，具体的函数体还需要通过 ida 逆向 `GameAssembly.dll` 看。

这个 `il2cpp dumper` 的工具也给我们提供了 ida 辅助脚本，直接跑就可以。

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/ida.png"  alt=""/>
</div>

大致浏览了下内容，主要有两部分反作弊：调速和注入。

# 调速

很简单，就是如果 5 次检测到网络时间比游戏时间时间快过 5 秒就发送封号请求（真的不考虑网络卡顿吗）。

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/speedhack.png"  alt=""/>
</div>

# 注入检测

注入检测就比较简单了，直接调用反作弊模块的注入检查：

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/inject.png"  alt=""/>
</div>

点进去继续看，全是给某个数组添加 string，而这些 string 都是已知的调试或作弊工具

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/arrayadd.png"  alt=""/>
</div>

传奇调试工具 `ollydbg`

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/od.png"  alt=""/>
</div>

实现也非常简单。。。。就是个遍历搜索。。。。

<div style="text-align:center">
<img src="/static/blogs/20250629-brokenarrow/search.png"  alt=""/>
</div>

# 评价

灾难性的反作弊，稍微有点基础的都可以绕过。。。。 也只能防防最基础的修改器了。