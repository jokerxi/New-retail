<template>
  <!--滞销天数分析页面-->
  <div style="padding: .24rem .2rem">
    <div class="unsalableBack radius">
      <div class="font18 unsalable_set_title">
        <span>喜羊羊超市</span>
      </div>
      <div class="unsalable_set_btn" @click="goSetDay()">
        <!--<span class="font20"><i class="fa fa-cog icon_color font18" aria-hidden="true"></i>设置滞销天数</span>-->
        <span class="font20"><i class="iconfont icon-shezhiicon icon_color"></i>设置滞销天数</span>
      </div>
    </div>
    <div class="table_box radius module_bg border">
      <div class="tabs">
        <div class="tab font14" v-for="(item,index) in tabs" :key="index" @click="myChoose(index+1)">
          {{item.tabTitle}}
        </div>
      </div>
      <div class="info_titles font14">
        <div class="info_title1">
          <div class="font18 bold">滞销商品列表</div>
          <div>滞销商品数 <span>247</span> 件</div>
        </div>
        <div class="info_title2 bold">
          <div><span>滞销商品数:</span>&nbsp;&nbsp;<span>247</span>件</div>
          <div><span>总销售额:</span>&nbsp;&nbsp;<span>￥</span><span>10000</span></div>
          <div><span>总成本:</span>&nbsp;&nbsp;<span>￥</span><span>5000</span></div>
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tableData="theTable.data"
                        v-on:rankAxios="myRank"></synthesize-table>
    </div>
    <!--表格-->
    <!--<div class="table_box radius module_bg border">-->
    <!--<div>-->
    <!--<p class="font18 bold font_black">奖金池记录<span class="staff_text font12 font_gray">共<span-->
    <!--class="font_black">{{staffNum}}</span>条</span></p>-->
    <!--</div>-->
    <!---->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "unsalable-set",
    data() {
      return {
        tabs: [
          {tabTitle: '全部'},
          {tabTitle: '品类1'},
          {tabTitle: '品类2'},
          {tabTitle: '品类3'},
        ],
        staffNum: '',
        theTable: {
          pages: {
            counts: 10,
            total: 1001,
            totalPage: '',
            // 当前在第几页
            pageState: 1,
            goPage: '',
            initPage: '',
          },
          //表格数据
          data: {
            theNo: 'true',
            tHead: [
              {text: '序号'},
              {text: '商品名'},
              {text: '条码'},
              {
                text: '库存数',
                myIcon: {
                  code: 0,
                  src: '../../static/images/icons/default.png'
                }
              },
              {
                text: '进价',
                myIcon: {
                  code: 0,
                  src: '../../static/images/icons/default.png'
                }
              },
              {
                text: '售价',
                myIcon: {
                  code: 0,
                  src: '../../static/images/icons/default.png'
                }
              },
              {
                text: '滞销天数',
                myIcon: {
                  code: 0,
                  src: '../../static/images/icons/default.png'
                }
              }
            ],
            tBody: [
              {
                id: 1,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 2,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 3,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 4,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 5,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 6,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 7,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 8,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 9,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
              {
                id: 10,
                col01: '小美美嘻嘻糖',
                col02: '5646adasd46513asd535',
                col03: '123',
                col04: '2346.56',
                col05: '2556.56',
                col06: '56',
              },
            ]
          }
        }
      }
    },
    created() {
      this.staffNum = this.theTable.data.tBody.length
    },
    methods: {
      goSetDay() {
        this.$router.push('/unsalableDays')
      },
      myChoose(index) {
        let tab
        for (let i = 0; i < this.tabs.length; i++) {
          tab = document.getElementsByClassName('tab')[i]
          tab.style.border = '1px solid rgba(235,235,235,1)'
          tab.style.color = '#333333'
          tab.style.backgroundColor = 'rgba(255,255,255, 1)'
        }
        tab = document.getElementsByClassName('tab')[index - 1]
        tab.style.border = '1px solid rgba(235,235,235,1)'
        tab.style.color = 'white'
        tab.style.backgroundColor = 'rgba(68,113,254, 1)'
      },
      //  表格请求事件
      myRank(index) {
        console.log(index)
      }
    }
  }
</script>

<style scoped>
  .unsalableBack {
    /*border: 1px solid red;*/
    /*width:16.15rem;*/
    width: 100%;
    height: 2rem;
    background-image: url("../../static/images/bg@2x-4.png");
    background-size: cover;
    color: white;
  }

  .unsalable_set_title {
    /*border:1px solid blue;*/
    padding-left: 0.6rem;
    padding-top: 0.61rem;

  }

  .unsalable_set_btn {
    padding-left: 0.6rem;
    margin-top: 0.3rem;
    cursor: pointer;
  }

  .unsalable_set_btn span {
    border: 1px solid rgba(68, 113, 254, 1);
    background-color: rgba(68, 113, 254, 1);
    padding: 0.1rem 0.2rem;
    border-radius: 0.04rem;
  }

  .icon_color {
    padding-right: 0.1rem;

  }

  /*表外框*/

  .tabs {
    border-bottom: 1px dashed rgba(235, 235, 235, 1);
    display: flex;
    flex-flow: row;
    justify-items: left;
    padding: 0.12rem 0 0.12rem 0.22rem;
  }

  .tabs > .tab:first-child {
    border: 1px solid rgba(68, 113, 254, 1);
    padding: 0.05rem 0.23rem;
    border-radius: 0.2rem;
    background-color: rgba(68, 113, 254, 1);
    color: white;
    margin-right: 0.1rem;
  }

  .tab {
    border: 1px solid rgba(235, 235, 235, 1);
    padding: 0.05rem 0.23rem;
    border-radius: 0.2rem;
    background-color: rgba(255, 255, 255, 1);
    color: #333333;
    margin-right: 0.1rem;
  }

  .tab:hover {
    cursor: pointer;
  }

  .info_titles {
    /*border:1px solid blue;*/
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }

  .info_title1 {
    display: flex;
    flex-direction: row;
    align-items: baseline;

  }

  .info_title1 > div:first-child {
    /*border:1px solid red;*/
    padding: 0.25rem 0 0.15rem 0.22rem;
  }

  .info_title1 > div:nth-child(2) {
    padding-left: 0.1rem;
  }

  .info_title2 {
    /*border:1px solid blue;*/
    display: flex;
    flex-direction: row;

  }

  .info_title2 > div:last-child {
    /*border:1px solid yellow;*/
    padding-right: 0.2rem;
  }

  .info_title2 > div:nth-child(2), .info_title2 > div:first-child {
    padding-right: 1rem;
  }

  /*表格组件包框*/
  .table_box {
    margin-top: 0.1rem;
    padding: 0 0.2rem;
  }

</style>
