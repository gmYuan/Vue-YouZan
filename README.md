# Vue-YouZan



## 项目预览


## 项目介绍

该项目实现了饿了么移动端的部分页面，包括: 首页、城市选择页


## 技术栈

Vue + Vue-Router + Vuex + SCSS + Swiper


## 问题记录

1 Q: 如何实现移动端1px效果

A: 项目中采用的方法是: svg + border-image,  具体是使用了 `postcss-write-svg`插件

步骤如下:

S1 安装插件: `npm install jonathantneal/postcss-write-svg --save-dev`

S2 在.postcssrc.js文件中，引入插件:



## 其他