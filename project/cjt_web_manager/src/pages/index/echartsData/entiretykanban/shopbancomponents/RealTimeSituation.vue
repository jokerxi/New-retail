<template>
  <div id="RealTimeSituation">
    <h3>实时概况</h3>
    <div class="allRTS">
      <div id="RTS-eachats">
        <div class="ircular-image">
          <p>今日营业额：<span>￥12342/1234笔</span></p>
          <p>今日顾客数：<span>12342</span></p>
          <!-- eachats -->
          <div class="allmyChart">
            <div class="toDay-myCart">
              <div id="myChart"></div>
              <div id="myChart2"></div>
            </div>
            <div class="toDay-myCart">
              <div id="myChart3"></div>
              <div id="myChart4"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="RTS-right">
        <h4>今日返利</h4>
        <p class="allMoney">￥12345.12</p>
        <div class="RTS-text">
          <p>
            已抵扣
            <span>￥12345.12</span>
          </p>
          <p>
            发放中
            <span>￥12345.12</span>
          </p>
          <p>
            奖金池
            <span>￥12345.12</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $axios from 'axios';
export default {
  name: "RealTimeSituation",
  data() {
    return {
      pie1: [],
      pie2: [],
      pie3: [],
      pie4: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取接口信息
    getData() {
      // 模拟的json数据
      $axios.get('../../../../../../static/dataJson/pie1.json')
        .then(res => {
          res.data.forEach(item => {
            this.slideinit = item.slideinit;
            this.pie1 = item.pie1;
            this.pie2 = item.pie2;
            this.pie3 = item.pie3;
            this.pie4 = item.pie4;
            this.drawLine();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // echarts图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
      let myChart4 = this.$echarts.init(document.getElementById('myChart4'));
      // 绘制图表
      myChart.setOption({
        color: ['#00D1E2', '#00E28B', '#FFB50D', '#0061E2'],
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
        },
        grid: {
          containLabel: true
        },
        series: [{
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{b|{b}{d}}%\n\n{c|{c}}',
              color: "#000",
              padding: [10, -86],
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
      myChart2.setOption({
        color: ['#00D1E2', '#00E28B', '#FFB50D', '#0061E2'],
        series: [{
          name: '来访',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{b|{b}{d}}%\n\n{c|{c}}',
              color: "#000",
              padding: [10, -86],
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
      myChart3.setOption({
        color: ['#00D1E2', '#F8FF46', '#00E28B', '#FFEBBC', '#FFB50D', '#0061E2'],
        series: [{
          name: '来访',
          type: 'pie',
          radius: '55%',
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
      myChart4.setOption({
        color: ['#00D1E2', '#F8FF46', '#00E28B', '#FFEBBC', '#FFB50D', '#0061E2'],
        series: [{
          name: '来访',
          type: 'pie',
          radius: '55%',
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
          data: this.pie4
        }]
      });
      // 自适应
      window.addEventListener("resize", function() {
        myChart.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
      });
    }
  }
}

</script>
<style lang="scss">
#RealTimeSituation {

  h3 {
    position: relative;
    font-size: .16rem;
    font-weight: bold;
    text-indent: .1rem;

    &:before {
      content: "";
      position: absolute;
      top: .06rem;
      left: 0;
      border-left: .04rem #4471FE solid;
      height: .14rem;
    }
  }

  .allRTS {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1400px) {
      #RTS-eachats {
        width: 79% !important;
      }
    }

    #RTS-eachats {
      background-color: #FFFFFF;
      padding: .28rem .24rem 0;
      margin-top: .14rem;
      border-radius: 4px;
      width: 84%;
      display: inline-block;
      -webkit-transition: all .5s ease;
      -o-transition: all .5s ease;
      -moz-transition: all .5s ease;
      transition: all .5s ease;

      p {
        width: 27%;
        font-size: .2rem;
        color: #151515;
        font-weight: bold;
        display: inline-block;
      }

      @media screen and (max-width: 1400px) {
        p:first-child {
          width: 58%
        }
      }

      .allmyChart {
        display: flex;

        // eacharts
        .toDay-myCart {
          display: flex;
          min-width: 50%;

          #myChart,
          #myChart2,
          #myChart3,
          #myChart4 {
            margin-top: .14rem;
            min-height: 2.1rem;
            width: 100%;
          }

          #myChart2 {
            position: relative;

            &:before {
              content: '';
              position: absolute;
              border-left: 1px #e7eeef solid;
              top: -30px;
              height: 2.2rem;
            }
          }
        }

        @media screen and (max-width: 1400px) {
          #myChart2:before {
            display: none;
          }

          .toDay-myCart {
            display: inline-block !important;
          }
        }
      }
    }

    @media screen and (max-width: 1400px) {
      #RTS-right {
        width: 20% !important;
      }
    }

    #RTS-right {
      background-color: #FFFFFF;
      width: 15%;
      margin-top: .14rem;
      border-radius: 4px;
      padding: .28rem .24rem 0;
      -webkit-transition: all .5s ease;
      -o-transition: all .5s ease;
      -moz-transition: all .5s ease;
      transition: all .5s ease;

      h4 {
        color: #151515;
        font-size: .16rem;
        font-weight: bold;
      }

      .allMoney {
        font-size: .3rem;
        font-weight: bold;
        color: #000000;
      }

      .RTS-text {
        margin-top: .46rem;

        p:nth-child(3) {
          margin-top: .26rem;
        }

        p {
          color: #151515;
          font-size: 12px;
          width: 40%;
          display: inline-block;

          span {
            color: #151515;
            font-size: 10px;
          }
        }
      }

    }

    // hover 效果
    #RTS-right:hover,
    #RTS-eachats:hover {
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
      margin-bottom: 14px;
    }
  }
}

</style>
