<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
}

</script>
<style>
/*头部*/
@import "assets/font-awesome-4.7.0/css/font-awesome.css";
/*主导航栏触发模态框样式*/
/*修改模态框样式的时候记住一点，一个模态框其实由两层构成；
    注意类名的区别.el-dialog和.el-table均有头部header和身体body*/

#app {
  background-color: #f5f5f5;
  ;
}

.my_dialog {
  /*border:1px solid red;*/
  background-color: rgba(197, 197, 197, 0.3);
}

.my_dialog .el-dialog {
  /*border:1px solid red;*/
  border-radius: 4px;
  width: 5rem;
  min-width: 400px;
  margin: 0 auto;
  box-shadow: 0 0.167rem 0.333rem rgba(0, 0, 0, .1);
}

.my_dialog .el-dialog__header {
  border-bottom: 1px solid rgba(235, 235, 235, 1);
  /*border:1px solid red;*/
  color: #333333;
  font-weight: bold;
  padding-left: 40px;
}

.my_dialog .el-dialog__body {
  /*border:1px solid red;*/
  color: #333333;
  font-weight: bold;
  border-collapse: revert;
  padding: 0 15px 20px 40px;
}

.my_dialog .el-table__header {
  /*border:1px solid red;*/
  border-collapse: collapse;
}

.my_dialog .el-table__body {
  /*border:1px solid red;*/
  border-collapse: collapse;
}

.my_dialog .cell {
  /*border:1px solid blue;*/
  /*text-align: left;*/
  padding: 0.08rem 0.16rem 0.08rem 0;

}

.my_dialog th {
  /*border:1px solid red;*/
  color: #999999;
}

.my_dialog td {
  /*border:1px solid red;*/
  color: #333333;
  font-weight: bold;
}

/*模态框滚动条样式调整*/
.my_dialog .el-table--scrollable-y .el-table__body-wrapper {
  /*控制滚动条的父亲的背景色*/
  background-color: white;
}

.my_dialog .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {

  /*控制滚动条的宽度*/
  width: 6px;
}

.my_dialog .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
  /*控制滚动条槽的边框色及背景色*/
  border: 1px solid rgba(231, 238, 238, 1);
  background-color: rgba(231, 238, 238, 1);
}

.my_dialog .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*控制滚动槽内部的滑块的样式*/
  border-radius: 4px;
  background-color: rgba(68, 113, 254, 1);
}

/*以下为top50内的table样式调整*/
.my_top50left .el-table__header {
  /*border:1px solid red;*/
  border-collapse: collapse;
}

.my_top50right .el-table__header {
  /*border:1px solid red;*/
  border-collapse: collapse;
}

.my_top50left .el-table tr {
  /*border:1px solid red!important;*/
  /*width:90%*/

}

.my_top50left .el-table {
  /*border:1px solid blue;*/
  width: 95% !important;
  margin: 0 auto;
}

.my_top50right .el-table {
  /*border:1px solid blue;*/
  width: 95% !important;
  margin: 0 auto;
}

/*公共通用*/
#app {
  height: 100%;
}

html {
  min-width: 1349px;
  height: 100%;
}

body {
  background: #fff;
  font-size: 0.14rem;
  width: 100%;
  height: 100%;
  font-family: "Microsoft YaHei", "Segoe UI", "Lucida Grande", Helvetica, Arial, sans-serif;
}


body,
p,
div,
span {
  padding: 0;
  margin: 0;
}

img {
  width: 100%;
}

/*shop_nav主要是解决CEO页面和其他页面中tab的那个左边间距的不同*/
.shop_nav>.outbox {
  /*border:1px solid red;*/
  padding-left: 0 !important;
}

/*字体大小*/
.font10 {
  font-size: 0.1rem;
}

.font12 {
  font-size: 0.12rem;
}

.font14 {
  font-size: 0.14rem;
}

.font16 {
  font-size: 0.16rem;
}

.font17 {
  font-size: 0.17rem;
}

.font18 {
  font-size: 0.18rem;
}

.font20 {
  font-size: 0.2rem;
}

.font22 {
  font-size: 0.22rem;
}

.font24 {
  font-size: 0.24rem;
}

.font26 {
  font-size: 0.26rem;
}

.bold {
  font-weight: bold;
}

.center {
  text-align: center;
}

/*字体颜色*/
.font_white {
  color: white;
}

.font_black {
  color: #151515;
}

.font_gray {
  color: #767676;
}

.font_grey {
  color: #828282;
}

.font_grayish {
  color: #5A626F;
}

a {
  text-decoration: none;
  color: initial;
}

/*块级样式*/
.module_width {
  width: 16.30rem;
  /*height: 7.09rem;*/
  margin: 0 auto;
}

.module_bg {
  background: #fff;
}

.body_bg {
  background: #f7f8f8;
}

/*圆角*/
.radius {
  border-radius: 4px;
}

/*边框*/
.border {
  border: 1px #E7EEEF solid;
}

/*阴影*/
.shadow {
  box-shadow: 0 0.167rem 0.333rem rgba(0, 0, 0, .1);
}


/* ele-ui样式 */
.icon-tuichuxialasanjiao2 {
  font-size: .2rem;
  position: absolute;
  /*top: 0.2em;*/
  right: 0;
  color: #4471FE;
  line-height: 2;

}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #ffffff;
  background-color: #4471FE;
}

.el-select-dropdown__item {
  font-size: .14rem;
  margin: 0 2px;
  border-radius: 4px;
}

.el-popper[x-placement^=bottom] .popper__arrow {
  display: none;
}

.el-popper[x-placement^=bottom] {
  margin-top: 4px;
}

.el-input--suffix .el-input__inner {
  border: none;
}

/* ele-ui 放大镜样式 */
.icon-sousuoicon {
  position: absolute;
  top: .09rem;
  left: .05rem;
}

.el-input--prefix {
  border: none;
}

.el-message-box {
  width: 3.3rem;
  height: 1.7rem;
}

.el-button--small,
.el-button--small.is-round {
  padding: 0;
  width: .9rem;
  height: .4rem;
  font-size: .2rem;
}

.el-message-box__content {
  color: #767676;
  margin-bottom: .2rem;
}

.el-message-box--center {
  padding-bottom: .2rem;
  box-sizing: border-box;
}

/*去除选按钮中效果*/
button,
input {
  outline: none;
}

/*更改输入框默认样式*/
input[type="number"] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

/*滚动条样式*/
body::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
body::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
body::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}

</style>
