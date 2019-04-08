<template>
  <div id="client">
    <p class="client-title">顾客整体趋势</p>
    <div class="bg">
      <div class="client-top">
        <el-radio-group @change="tabData()" class="big-btn" v-model="radio" size="mini" fill="#4471FE">
          <el-radio-button class="big-radio-btn" label="累计"></el-radio-button>
          <el-radio-button class="big-radio-btn" label="新增"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-show="ison" class="big-btn2" v-model="radio2" size="mini" fill="#4471FE">
          <el-radio-button class="big-radio-btn2" label="今天"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="昨天"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月8日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月9日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月10日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月11日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月12日"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-show="!ison" class="big-btn2" v-model="radio3" size="mini" fill="#4471FE">
          <el-radio-button class="big-radio-btn2" label="今天"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="昨天" />
          <el-radio-button class="big-radio-btn2" label="10月8日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月9日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月10日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月11日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="10月12日"></el-radio-button>
        </el-radio-group>
        <div class="block">
          <p class="dateTime">日期</p>
          <el-date-picker value-format="timestamp" :picker-options="getToDay" size="mini" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clear-icon="" @change="getToDate()">
          </el-date-picker>
        </div>
      </div>
      <!-- Echarts -->
      <div class="client-Echarts">
        <div id="client-Echarts"></div>
      </div>
      <!-- loading -->
      <div id="Loading" v-show="loading">
        <div class="container">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>
        <p>数据加载中...请稍后...</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
export default {
  name: 'client',
  data() {
    return {
      // 控制日期选择器到今天
      getToDay: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // 初始化数据
      radio: '累计',
      radio2: '今天',
      radio3: '昨天',
      ison: true,
      dateTime: '',
      loading: true,
      // echarts数据
      data1: [],
      minDate: '',

      arrDate: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'],
    };
  },
  // 监听echarts数据
  watch: {
    _data: {
      handler(newValue, oldValue) {
        this.RunWaterEcharts();
        // this.loading = true;
      },
      deep: true
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取时间
    getToDate() {
      var initNum = ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'];
      var arrDate = [];
      var arrDateH = [];
      var date1 = this.dateTime[0];
      var date2 = this.dateTime[1];
      var num = new Date(date2).getDate();
      var min = Math.min(date1, date2);
      var dateInterval = (date2 - date1) / num;
      var date = new Date(date1);
      var D = date.getMonth() + 1 + '月';

      for (var i = 0; i < Things.length; i++) {
        arrDate.push(parseInt(min) + ((i + 1) * dateInterval));
      }
      return this.arrDate = arrDate;
      // if (date1 == date2) {
      //   return this.arrDate = initNum;
      // } else {
      //   for (var i = 0; i < num; i++) {
      //     arrDate.push(new Date(parseInt(min) + ((i + 1) * dateInterval)).getMonth() + 1 + '月' + new Date(parseInt(min) + ((i + 1) * dateInterval)).getDate() + '日');
      //   }
      //   console.log(num);
      //   return this.arrDate = arrDate;
      // }

    },
    // 获取数据
    getData() {
      var st1;
      this.$axios.get("../../../static/dataJson/run.json")
        .then(res => {
          res.data.forEach(item => {
            this.data1 = item.data1;
            st1 = setTimeout(() => { this.loading = false }, 2e3);
          });
        });
    },
    // 切换
    tabData() {
      var st2;
      window.clearTimeout(st2);
      if (this.radio == '新增') {
        this.$axios.get("../../../static/dataJson/newrun.json")
          .then(res => {
            res.data.forEach(item => {
              this.data1 = item.data2;
              st2 = setTimeout(() => { this.loading = false }, 3e3);
            });
          });
      } else {
        this.getData();
      }
      this.radio == '累计' ? this.ison = true : this.ison = false;
    },
    RunWaterEcharts() {
      // Echarts
      let RunWaterEcharts = this.$echarts.init(document.getElementById('client-Echarts'));
      let RunWaterContainer = document.getElementById('client-Echarts');
      let RunWaterContainerWin = window.innerWidth;
      let RunWaterContainerH = (RunWaterContainerWin * 0.082) * 0.4125;
      let RunWaterContainerW = RunWaterContainerWin * 0.082;
      var data1 = this.data1;
      var RWD = [{
          name: '整体情况',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
        {
          name: '线下支付流水',
          data: [270, 912, 291, 934, 1270, 133, 1232],
          type: 'line',
          smooth: true
        }, {
          name: '未关注顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 332, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '已关注顾客流水',
          data: [250, 332, 921, 934, 1930, 1200, 250, 332, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '支付宝流水',
          data: [250, 332, 921, 934, 1908, 1930, 250, 332, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '正常活跃顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '低风险沉默顾客流水',
          data: [250, 332, 921, 934, 1930, 1200, 250, 332, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '高风险沉默顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 250, 332, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '风险沉默顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '流失顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '回流顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '低潜力新顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }, {
          name: '高潜力新顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        },
        {
          name: '普通顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        },
        {
          name: '优质顾客流水',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        },
        {
          name: '成本趋势',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        },
        {
          name: '利润趋势',
          data: [250, 332, 921, 934, 1908, 1930, 1200, 250, 921, 934, 1908, 1930, 1200],
          type: 'line',
          smooth: true
        }
      ];
      // 绘图
      RunWaterEcharts.setOption({
        // 调色板
        color: ['#4471FE', '#FFB50D', '#FF7474', '#10CB7C', '#8444FE', '#FE44DA', '#BA8D8D', '#736391', '#384F96', '#B27C00', '#007242', '#EBEB14', '#00B2B2', '#1A837F', '#575757', '#E3A633', '#3C95AA'],
        series: RWD,
        legend: {
          orien: 'horizontal',
          itemWidth: RunWaterContainerW,
          itemHeight: RunWaterContainerH,
          left: 'left',
          icon: 'rect',
          width: '100%',
          top: '1%',
          center: ['50%', '50%'],
          padding: [5, 0, 0, 15],
          textStyle: {
            borderRadius: 4,
            align: 'center',
            padding: [-20, 0, 0, -RunWaterContainerW],
            rich: {
              a: {
                fontSize: 12,
                padding: [-25, 0, 0, 1],
                color: '#ffffff',
              },
              b: {
                fontSize: 14,
                padding: [-40, 0, 0, 0],
                lineHeight: 25,
                fontWeight: 800,
                color: '#ffffff'
              }
            }
          },
          formatter: function(name) {
            var res = "";
            for (var i = 0; i < data1.length; i++) {
              if (data1[i].name == name) {
                res = data1[i].value;
              }
            }
            var arr = [
              '{a|' + name + '}',
              '{b|' + res + '}',
            ];
            return arr.join('\n');
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.98)', //通过设置rgba调节背景颜色与透明度
          color: 'black',
          borderColor: 'gray',
          extraCssText: 'box-shadow:0px 3px 5px rgba(0,0,0,0.1)',
          textStyle: {
            color: 'black',
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        grid: {
          top: '28%',
          left: '2%',
          right: '2%',
          bottom: '1%',
          width: '95%',
          containLabel: true
        }
      });
      // 自适应
      window.addEventListener("resize", function() {
        RunWaterEcharts.resize();
      });
    }
  }
};

</script>
<style lang='scss'>
#client {
  position: relative;
  margin-top: .25rem;

  // 加载动画CSS
  #Loading {
    position: absolute;
    top: 11%;
    left: 0;
    height: 89%;
    width: 99.9%;
    border: 1px solid #E7EEEF;
    border-top: 0;
    border-radius: 0 0 4px 4px;
    background: #ffffff;
    opacity: .95;

    p {
      position: absolute;
      top: 63%;
      left: 0;
      right: 0;
      text-align: center;
    }

    .container {
      width: 200px;
      height: 200px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      filter: url('#goo');
      animation: rotate-move 2s ease-in-out infinite;
    }

    .dot {
      width: 55px;
      height: 55px;
      border-radius: 80%;
      background-color: #000;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    .dot-3 {
      background-color: #4471FE;
      animation: dot-3-move 2s ease infinite;
    }

    .dot-2 {
      background-color: #FFE603;
      animation: dot-2-move 2s ease infinite;
    }

    .dot-1 {
      background-color: #2CB8C4;
      animation: dot-1-move 2s ease infinite;
    }

    @keyframes dot-3-move {
      20% {
        transform: scale(1)
      }

      45% {
        transform: translateY(-18px) scale(.45)
      }

      60% {
        transform: translateY(-40px) scale(.45)
      }

      80% {
        transform: translateY(-40px) scale(.45)
      }

      100% {
        transform: translateY(0px) scale(1)
      }
    }

    @keyframes dot-2-move {
      20% {
        transform: scale(1)
      }

      45% {
        transform: translate(-16px, 12px) scale(.45)
      }

      60% {
        transform: translate(-40px, 40px) scale(.45)
      }

      80% {
        transform: translate(-40px, 40px) scale(.45)
      }

      100% {
        transform: translateY(0px) scale(1)
      }
    }

    @keyframes dot-1-move {
      20% {
        transform: scale(1)
      }

      45% {
        transform: translate(16px, 12px) scale(.45)
      }

      60% {
        transform: translate(40px, 40px) scale(.45)
      }

      80% {
        transform: translate(40px, 40px) scale(.45)
      }

      100% {
        transform: translateY(0px) scale(1)
      }
    }

    @keyframes rotate-move {
      55% {
        transform: rotate(0deg)
      }

      80% {
        transform: rotate(360deg)
      }

      100% {
        transform: rotate(360deg)
      }
    }
  }


  p {
    margin: 0;
  }

  .client-title {
    display: inline-block;
    font-size: .16rem;
    font-weight: bold;
    border-left: 4px solid #4471FE;
    height: 14px;
    line-height: 0.9;
    padding: 0 .06rem;
    margin-bottom: .14rem;
  }

  .bg {
    border: 1px solid #E7EEEF;
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);

    .client-top:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 98%;
      border-top: 1px #E7EEEF dashed;
    }

    // 头部样式
    .client-top {
      position: relative;
      padding-bottom: 10px;

      .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        box-shadow: none;
      }

      display: flex;
      justify-content: space-between;

      .big-btn {
        margin-top: .12rem;
        margin-left: .21rem;
        display: flex;

        .el-radio-button__inner {
          border-radius: .24rem;
          margin-right: .1rem;
          border: 1px #E7EEEF solid;
        }
      }

      .block {
        display: flex;
        margin-top: .1rem;

        .dateTime {
          line-height: 2.2;
          margin-right: .1rem;
        }

        .el-range__icon {
          color: #4471FE;
        }

        .el-range__close-icon:before {
          content: '';
          position: absolute;
          top: 11px;
          background: url(../../../static/images/icons/downicon@2x.png)no-repeat;
          background-size: 100%;
          width: .1rem;
          height: .1rem;
        }

        .el-range-editor--mini.el-input__inner {
          width: 2.9rem;
          margin-right: .2rem;
        }
      }

      .big-btn2 {
        margin-top: .12rem;

        .el-radio-button__inner {
          font-size: .12rem;
          border-radius: .24rem;
          margin-right: .1rem;
          border: 1px #E7EEEF solid;
        }
      }
    }
  }

  // Echarts修改样式
  .client-Echarts {
    width: 100%;
    height: 100%;
  }

  #client-Echarts {
    margin-top: .1rem;
    min-height: 620px;
    width: 100%;
    height: 100%;

  }
  #client-Echarts>div:nth-of-type(1) {
    margin: 0 auto!important;
  }
}

</style>
