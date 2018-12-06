## 用于高亮显示搜索关键字的插件

### 使用说明

Step1：从chrome商店安装AddJS： https://chrome.google.com/webstore/detail/addjs/aoahkpekljaimojhfefaiibfdcnmlhdi?hl=zh-CN

Step2: 点击"+" 配置AddJS,举例
```
url：https://github.com/wenbaofu*
regexp:选中
Script:https://cdn.jsdelivr.net/gh/wenbaofu/blog/search/search.js
```
如下图
![image](https://cloud.githubusercontent.com/assets/20511885/22293341/2897fc00-e34a-11e6-8e52-4ec21e592ee9.png)

> 上述含义代表当匹配到如上路径时（启用正则），调用脚本文件

Step3：在待搜索的路径（需要匹配url）中输入`https://github.com/wenbaofu/issues/?query=123`
注意在匹配的路径结尾增加`?query=123`则代表搜索在当面页面搜索`123`这个关键字

最终效果为
![search](https://cloud.githubusercontent.com/assets/20511885/21750308/4cf90952-d5eb-11e6-8431-8e0b15b6844f.gif)

### 实现细节
具体实现细节参考https://github.com/wenbaofu/blog/issues/16
