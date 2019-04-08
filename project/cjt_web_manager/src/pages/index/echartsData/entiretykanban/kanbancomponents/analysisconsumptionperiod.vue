<template>
  <div id="analysisconsumptionperiod">
    <h3>消费时段分析</h3>
    <div class="allanalysisconsumptionperiod">
      <div id="analysisconsumptionperiod-top">
        <RadioGroup class="big-btn" v-model="radio" type="button">
          <Radio class="big-radio-btn" label="消费额"></Radio>
          <Radio class="big-radio-btn" label="消费频次"></Radio>
          <Radio class="big-radio-btn" label="笔单价"></Radio>
        </RadioGroup>
        <RadioGroup v-show="ison" class="big-btn2" v-model="radio2" type="button">
          <Radio class="big-radio-btn2" label="日"></Radio>
          <Radio class="big-radio-btn2" label="周"></Radio>
          <Radio class="big-radio-btn2" label="月"></Radio>
        </RadioGroup>
        <RadioGroup v-show="!ison" class="big-btn2" v-model="radio3" type="button">
          <Radio class="big-radio-btn2" label="日"></Radio>
          <Radio class="big-radio-btn2" label="周"></Radio>
          <Radio class="big-radio-btn2" label="月"></Radio>
        </RadioGroup>
        <RadioGroup v-show="!ison" class="big-btn2" v-model="radio4" type="button">
          <Radio class="big-radio-btn2" label="日"></Radio>
          <Radio class="big-radio-btn2" label="周"></Radio>
          <Radio class="big-radio-btn2" label="月"></Radio>
        </RadioGroup>
        <div class="block">
          <p>日期</p>
          <DatePicker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 200px"></DatePicker>
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
export default {
  name: "analysisconsumptionperiod",
  data() {
    return {
      radio: '消费额',
      radio2: '日',
      radio3: '周',
      radio4: '月',
      dateTime: '',
      ison: true,
    }
  },
  // 挂载之后执行
  mounted() {
    this.paymentChannels();
  },
  // 函数
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
#analysisconsumptionperiod {
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

  .allanalysisconsumptionperiod {
    border-radius: 4px;
    background-color: #FFFFFF;

    #analysisconsumptionperiod-top {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-top: .14rem;
      padding: .24rem .15rem;

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 98%;
        border-top: 1px #E7EEEF dashed;
      }

      .big-radio-btn2:before,
      .big-radio-btn2:after,
      .big-radio-btn:before,
      .big-radio-btn:after {
        display: none;
      }

      .block {
        display: flex;

        p {
          padding-right: .1rem;
          line-height: 2.5;
          font-size: 12px;
          margin-left: .3rem;
        }
      }

      .ivu-radio-group-item {
        margin-right: .1rem;
        padding: 0 .2rem;
        border-radius: 14px;
        text-align: center;
      }

      .ivu-radio-group-button .ivu-radio-wrapper {
        position: inherit;
        border: 1px solid #dcdee2;
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

  // ivu 默认修改
  .ivu-input-icon {
    left: 0;
  }

  .ivu-input {
    text-indent: 20px;
  }

  .ivu-radio-wrapper-checked {
    color: #FFFFFF;
    background-color: #4471FE;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked {
    box-shadow: none;
  }

  .ivu-radio-group-button .ivu-radio-wrapper:after,
  .ivu-radio-group-button .ivu-radio-wrapper:before {
    background: inherit;
  }
}

</style>
