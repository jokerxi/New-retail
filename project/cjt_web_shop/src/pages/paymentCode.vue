<template>
  <div id="paymentCode"><!-- 下载二维码 -->
    <div class="content_box">
    <div class="header radius">
        <img src="../../static/images/顶部bg@2x-2.png" >
    </div>
      <el-row :gutter="20" class="dis_box">
        <el-col :span="3" class="dow_box" v-for="item in payList"  :key="item.id">
          <div class="grid-content bg-purple flex-box-item">
            <div class="pay_bgcolor" @mouseover="dataShow (item.id)" @mouseout="dataHidden (item.active)">
              <img :src="item.src"/>
              <p class="flex-box-title">{{item.abc}}</p>
              <el-button @click="downloadImg()" class="my_btn my_shadow" size="small" v-show="item.active" type="primary" round icon="el-icon-download">下载付款二维码</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      </div>
    </div>
  </template>
  <script>

    import '../assets/css/time.css';

    export default {
      name: 'paymentCode',
      data() {
        return {
          payList: [
            {
              active: false,
              id: 1,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x (1).png',
              code: 1
            },
            {
              active: false,
              id: 2,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x.png',
              code: 1
            },
            {
              active: false,
              id: 3,
              abc: "FDFSF1425412587965",
              src: '../../static/images/bg@2x (2).png',
              code: 2
            },
            {
              active: false,
              id: 4,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x.png',
              code: 1
            },
            {
              active: false,
              id: 5,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x.png',
              code: 1
            },
            {
              active: false,
              id: 6,
              abc: "FDFSF1425412587965",
              src: '../../static/images/bg@2x (2).png',
              code: 2
            },
            {
              active: false,
              id: 7,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x.png',
              code: 1
            },
            {
              active: false,
              id: 8,
              abc: "FDFSF1425412587965",
              src: '../../static/images/bg@2x (2).png',
              code: 2
            },
            {
              active: false,
              id: 9,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x.png',
              code: 1
            },
            {
              active: false,
              id: 10,
              abc: "FDFSF1425412587965",
              src: '../../static/images/付款码@2x.png',
              code: 1
            }]
          }
        },

      methods: {

        dataShow(id) {
          for (var i = 0; i < this.payList.length; i++) {
            if (id == this.payList[i].id) {

              if (this.payList[i].code == 1) {
                this.payList[i].active = true
              }
              else {
                this.payList[i].active = false
                // console.log(this.payList[i].code)
              }
            }
          }
        },
        dataHidden() {
          for (var i = 0; i < this.payList.length; i++) {
            this.payList[i].active = false
          }
        },
  //      下载图片
      downloadImg() {
            console.log(123);
            var alink = document.createElement("a");
            alink.href = this.imgs;
            alink.download = "pic"; //图片名//必须同源才能下载
            alink.click();
          }
        }
   }
  </script>
  <style scoped>
    #paymentCode{
      height: 100%;
    }
    .content_box{
      height: 100%;
      padding: .24rem .2rem;
      box-sizing: border-box;
      /*min-height: 8.75rem;*/
    }
    .header {
      width: 100%;
    }

    .header img {
      width: 100%;
      height: 100%;
    }
    .dow_box{
      margin-top: 24px;
      min-width: 128.069px;
      min-height: 177.86px;
    }

    .pay_bgcolor {
      background-color: #E2E2E2;
      height: 2.5rem;
      width: 1.8rem;
      position: relative;
      min-width: 128.069px;
      min-height: 177.86px;
    }
    .flex-box-title {
      font-size: .1rem;
      font-weight:bold;
      height: .48rem;
      width: 100%;
      min-height: 34.15px;
      min-width: 128.06px;
      line-height: .48rem;
      text-align: center;
      background-color: #ffffff;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      overflow: hidden;
    }
    .pay_bgcolor >img{
      width: 100%;
      height: 100%;
      margin: auto;
      border-radius: 4px;
    }

  .my_btn{
    width: 1.6rem;
    min-width: 113.83px;
  }

  .el-button{
    padding: .05rem .13rem;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 0.4rem;
    margin: auto;
    font-size: .14rem;
    background-color: #4471FE;
    border-color: #4471FE;
  }
    /*按钮阴影*/
    .my_shadow {
      -webkit-box-shadow: 0 0.167rem 0.333rem rgba(0, 0, 0, .4);
      box-shadow: 0 0.167rem 0.333rem rgba(0, 0, 0, .4);
    }

  </style>
