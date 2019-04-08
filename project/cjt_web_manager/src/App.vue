<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App'
    };

</script>
<style>
    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .ivu-table-wrapper {
        border-color: transparent;
    }

    .ivu-table:after {
        width: 0;
    }

    .ivu-table th {
        background: #fff;
    }

    /*form*/
    .ivu-form-item {
        margin-bottom: .44rem;
    }

    .ivu-form .ivu-form-item-label {
        font-size: .14rem;
        font-weight: bold;
        padding: 0 0 .11rem 0;

    }

    .ivu-form-inline .ivu-form-item {
        margin-right: .2rem;
    }

    /*select*/
    .ivu-select-single .ivu-select-selection {
        height: .4rem;
        min-height: 29px;
    }

    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        display: block;
        width: 1.34rem;
        line-height: .4rem;
        font-size: .14rem;
    }

    .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
        color: #151515;
    }

    .ivu-form-item-content {
        position: relative;
        line-height: .4rem;
        font-size: .14rem;
    }

    .ivu-form-inline .ivu-form-item {
        vertical-align: bottom;
    }

    .ivu-table-cell {
        padding-left: 0;
        padding-right: 0;
        overflow: inherit;
    }

    .ivu-table {
        overflow: inherit;
    }

    .ivu-btn-primary {
        background: #4471FE;
    }

    .ivu-btn-primary:hover {
        background: #4471FE;
    }

    .ivu-select-small.ivu-select-single .ivu-select-selection {
        border-radius: 4px;
    }
    .ivu-select-visible .ivu-select-selection {
        /* border:none; */
        outline: 0;
        box-shadow: 0 0 0 0px rgba(45,140,240,.2);
    }
   .ivu-select-selection-focused, .ivu-select-selection:hover {
        border-color: #E7EEEF;
    }
    /*select*/

    /*form*/


    /*去除选按钮中效果*/
    button,
    input {
        outline: none;
    }
    .ivu-btn:focus {
        box-shadow: 0 0 0 0px rgba(45,140,240,.2); 
        
    }
    .ivu-input:hover {
        border-color: #E7EEEF;
        
    }
    .ivu-input:focus {
        border-color: #E7EEEF;
        outline: 0;
        box-shadow: 0 0 0 0px rgba(68,113,254,.2);
    }

    .ivu-btn-primary.active, .ivu-btn-primary:active {
        color: #f2f2f2;
        background-color: #4471FE;
        border: none;
    }
    .ivu-btn-primary {
        border-color: #4471FE;
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
    html::-webkit-scrollbar { /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
    }

    html::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }

    html::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }

    html {
        min-width: 1349px;
        overflow-y: scroll;
    }
</style>
