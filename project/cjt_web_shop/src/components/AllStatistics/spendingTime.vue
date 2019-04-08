<template>
  <div id="spendingTime">
    <p class="spendingTime-title">消费时段分析</p>
    <div class="bg">
      <div class="spendingTime-top">
        <el-radio-group class="big-btn" v-model="radio" size="mini" fill="#4471FE">
          <el-radio-button class="big-radio-btn" label="消费额"></el-radio-button>
          <el-radio-button class="big-radio-btn" label="消费频次"></el-radio-button>
          <el-radio-button class="big-radio-btn" label="笔单价"></el-radio-button>
        </el-radio-group>
        <el-radio-group class="big-btn2" v-model="radio2" size="mini" fill="#4471FE">
          <el-radio-button class="big-radio-btn2" label="日"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="周"></el-radio-button>
          <el-radio-button class="big-radio-btn2" label="月"></el-radio-button>
        </el-radio-group>
        <div class="block">
          <p class="dateTime">日期</p>
          <el-date-picker size="mini" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clear-icon="">
          </el-date-picker>
        </div>
      </div>
      <!-- Echarts -->
      <div class="spendingTime-Echarts">
        <div id="spendingTime-Echarts"></div>
      </div>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
export default {
  name: 'spendingTime',
  data() {
    return {
      radio: '消费额',
      radio2: '日',
      dateTime: '',
    }
  },
  mounted() {
    this.paymentChannels();
  },
  methods: {
    paymentChannels() {
      let spendingTime = this.$echarts.init(document.getElementById('spendingTime-Echarts'));
      let spendingTimeWin = window.innerWidth;
      spendingTime.setOption({
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
        grid: {
          top: '10%',
          left: '2%',
          right: '1%',
          bottom: '7%',
          width: '100%',
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
        }],
        yAxis: [{
          type: 'value',
          show: false,
        }],
        lineStyle: {
          color: '#4471FE'
        },
        series: [{
          symbol: 'none',
          name: '消费额',
          type: 'line',
          stack: '总量',
          color: '#4471FE',
          areaStyle: {
            normal: {
              color: '#D9E2FE'
            }
          },
          smooth: 0.5,
          data: [9180, 1860, 7351, 4302, 8080, 563, 3316, 2011, 5385, 2599, 7911, 9584, 5440, 9193, 8072, 8349, 7359, 6542, 2538, 8220, 9174, 672, 9286, 870]
        }]
      })
      // 自适应
      window.addEventListener("resize", function() {
        spendingTime.resize();
      });
    }
  }
}

</script>
<style lang="scss">
#spendingTime {
  margin-top: .25rem;
  min-width: 1100px;

  p {
    margin: 0;
  }

  .spendingTime-title {
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
    background-color: #ffffff;
    border: 1px solid #E7EEEF;
    border-radius: 4px;
    min-width: 11.6rem;
    padding: .12rem .21rem 0 .21rem;
    position: relative;

    // 头部样式
    .spendingTime-top {
      display: flex;
      justify-content: space-between;
      padding-bottom: .11rem;
      border-bottom: 1px #E7EEEF solid;

      .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        box-shadow: none;
      }

      .big-btn {
        display: flex;

        .el-radio-button__inner {
          border-radius: .24rem;
          margin-right: .1rem;
        }
      }

      .block {
        display: flex;
        align-items: baseline;

        .dateTime {
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
        }
      }

      .el-radio-button__inner {
        font-size: .12rem;
        border-radius: .24rem;
        margin-right: .1rem;
        border:1px #E7EEEF solid;
      }
    }
  }

  // Echarts
  #spendingTime-Echarts {
    min-height: 5rem;
  }

  #spendingTime-Echarts>div:nth-of-type(1) {
    margin: 0 auto !important;
  }
}

</style>
