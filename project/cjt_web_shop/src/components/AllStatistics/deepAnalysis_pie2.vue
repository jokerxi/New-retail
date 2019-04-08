<template>
  <div id="deepAnalysis2">
    <span class="deepAnalysis2-title">整体情况</span>
    <div class="deepAnalysis2-AllToDay">
      <div class="deepAnalysis2-toDay">
        <p class="toDayNum">{{slideinit.toDayClient}} <span>今日顾客量</span> <span class="toDayTextState">{{slideinit.state}}</span><span class="toDayText" :class="{active: slideinit.isUp}">{{slideinit.toDayUp}}%</span><span class="toDayText" :class="{ active: slideinit.isUp }">{{slideinit.toDayState}}</span></p>
        <div class="toDay-myCart">
          <div id="myChart4"></div>
          <div id="myChart5"></div>
          <div id="myChart6"></div>
        </div>
      </div>
      <!-- right-->
      <div class="deepAnalysis2-toDayProfit">
        <p class="toDay-fl">今日总返利</p>
        <p class="toDayProfit-money">￥{{AllMoney}}</p>
        <div v-for="AllMoney in AllMoneys" class="toDayProfit-allMoney">
          <p>{{AllMoney.name}}<span class="Money">￥{{AllMoney.money}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
let pieData
export default {
  name: "deepAnalysis2",
  data() {
    return {
      "slideinit": '',
      "AllMoney": 123456.12,
      "AllMoneys": [{
          "name": "已抵扣",
          "money": 123123
        },
        {
          "name": "发放中",
          "money": 123123
        },
        {
          "name": "奖金池",
          "money": 123123
        }
      ],
      //
      pie1: [],
      pie2: [],
      pie3: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get('../../../static/dataJson/pie1.json')
        .then(res => {
          res.data.forEach(item => {
            this.slideinit = item.slideinit;
            this.pie1 = item.pie1;
            this.pie2 = item.pie2;
            this.pie3 = item.pie3;
            this.drawLine();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart4 = this.$echarts.init(document.getElementById('myChart4'));
      let myChart5 = this.$echarts.init(document.getElementById('myChart5'));
      let myChart6 = this.$echarts.init(document.getElementById('myChart6'));
      // 绘制图表
      myChart4.setOption({
        color: ['#00D1E2', '#00E28B', '#FFB50D', '#0061E2'],
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
        },
        grid: {
          top: '28%',
          left: '2%',
          right: '2%',
          bottom: '1%',
          width: '95%',
          containLabel: true
        },
        series: [{
          name: '',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{b|{b}{d}}%\n\n{c|{c}}',
              color: "#000",
              padding: [10, -70],
              rich: {
                b: {
                  color: '#000',
                  fontSize: 12,
                  align: 'center',
                  padding: [0, 0]
                },
                c: {
                  color: '#000',
                  fontSize: 12,
                  align: 'center',
                }
              }
            }
          },
          labelLine: {
            normal: {
              length: 15,
              length2: 70
            }
          },
          data: this.pie1
        }]
      });
      myChart5.setOption({
        color: ['#00D1E2', '#00E28B', '#FFB50D', '#0061E2'],
        series: [{
          name: '来访',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{b|{b}{d}}%\n\n{c|{c}}',
              color: "#000",
              padding: [10, -70],
              rich: {
                b: {
                  color: '#000',
                  fontSize: 12,
                  align: 'right',
                  padding: [0, 0]
                },
                c: {
                  color: '#000',
                  fontSize: 12,
                  align: 'center',
                  padding: [-3, 30]
                }
              }
            }
          },
          labelLine: {
            normal: {
              length: 15,
              length2: 70
            }
          },
          data: this.pie2
        }]
      });
      myChart6.setOption({
        color: ['#00D1E2', '#F8FF46', '#00E28B', '#FFEBBC', '#FFB50D', '#0061E2'],
        series: [{
          name: '来访',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{b|{b}{d}}%\n\n{c|{c}}',
              color: "#000",
              padding: [10, -70],
              rich: {
                b: {
                  color: '#000',
                  fontSize: 12,
                  align: 'right',
                  padding: [0, 0]
                },
                c: {
                  color: '#000',
                  fontSize: 12,
                  align: 'center',
                  padding: [-3, 30]
                }
              }
            }
          },
          labelLine: {
            normal: {
              length: 15,
              length2: 60
            }
          },
          data: this.pie3
        }]
      });
      // 自适应
      window.addEventListener("resize", function() {
        myChart4.resize();
        myChart5.resize();
        myChart6.resize();
      });
    }
  }
}

</script>
<style lang="scss" scoped>
#deepAnalysis2 {
  margin-bottom: .25rem;
  min-width:1100px;
  p {
    margin: 0
  }

  .deepAnalysis2-title {
    display: inline-block;
    font-size: .16rem;
    font-weight: bold;
    border-left: 4px solid #4471FE;
    height: 14px;
    line-height: 0.9;
    padding: 0 .06rem;
    margin-bottom: .14rem;
  }

  .deepAnalysis2-AllToDay {
    display: flex;
    height: 2.8rem;

    // hover 效果
    .deepAnalysis2-toDayProfit:hover,
    .deepAnalysis2-toDay:hover {
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    }

    // 左边样式
    .deepAnalysis2-toDay {
      min-width: 11.9rem;
      height: 2.8rem;
      background-color: #ffffff;
      border: 1px solid #E7EEEF;
      transition: all .1s linear;
      border-radius: 4px;
      width: 100%;

      span {
        font-size: .14rem;
      }

      .toDayText {
        color: red;
        font-size: .16rem;
      }

      .active {
        color: #7ED321;
      }

      .toDay-myCart {
        display: flex;
        min-width:854px;
        #myChart4,
        #myChart5,
        #myChart6 {
          margin-top: .14rem;
          min-height: 2.1rem;
          width: 100%;
        }

        #myChart5:before,
        #myChart6:before {
          content: '';
          position: absolute;
          border-left: 1px rgba(231, 238, 239, 1) solid;
          padding: .88rem;
        }
      }

      .toDayNum {
        margin: .1rem 0 0 .38rem;
        font-size: .3rem;
      }
    }

    // 右边样式
    .deepAnalysis2-toDayProfit {
      margin-left: .2rem;
      min-width: 3.8rem;
      min-height: 2.8rem;
      border: 1px solid #E7EEEF;
      border-radius: 4px;
      background: rgba(255, 255, 255, 1);

      .toDayProfit-allMoney {
        display: inline-block;
        width: 33%;
        margin-top: .48rem;

      }

      .toDay-fl {
        margin-top: .7rem;

      }

      p:nth-child(1) {
        font-size: .16rem;
        font-weight: 800;
        margin-left: .3rem;

        span {
          display: inline-block;
          font-size: .14rem;
          font-weight: 400;

        }
      }

      p:nth-child(2) {
        font-size: .3rem;
        font-weight: 800;
        margin-left: .25rem;
      }
    }
  }

}

</style>
