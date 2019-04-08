<template>
  <div id="payment">
    <div id="payment-top">
      <RadioGroup @on-change="tabData" class="big-btn" v-model="radio" type="button">
        <Radio class="big-radio-btn" label="累计"></Radio>
        <Radio class="big-radio-btn" label="新增"></Radio>
      </RadioGroup>
      <RadioGroup v-show="ison" class="big-btn2" v-model="radio2" type="button">
        <Radio class="big-radio-btn2" label="今天"></Radio>
        <Radio class="big-radio-btn2" label="昨天"></Radio>
        <Radio class="big-radio-btn2" label="本周"></Radio>
        <Radio class="big-radio-btn2" label="上周"></Radio>
        <Radio class="big-radio-btn2" label="本月"></Radio>
        <Radio class="big-radio-btn2" label="上月"></Radio>
      </RadioGroup>
      <RadioGroup v-show="!ison" class="big-btn2" v-model="radio3" type="button">
        <Radio class="big-radio-btn2" label="今天"></Radio>
        <Radio class="big-radio-btn2" label="昨天" />
        <Radio class="big-radio-btn2" label="本周"></Radio>
        <Radio class="big-radio-btn2" label="上周"></Radio>
        <Radio class="big-radio-btn2" label="本月"></Radio>
        <Radio class="big-radio-btn2" label="上月"></Radio>
      </RadioGroup>
      <div class="block">
        <p>日期</p>
        <DatePicker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 200px" :options="options" @on-change="getToDate"></DatePicker>
      </div>
    </div>
    <!-- 滑动 -->
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(data_btn, index) in data_btns" :key="data_btn.id">
        <div class="data_btns" :class="{data_btns_active : changebgc == index }" @click="btn_prev(index,$event)">
          <p>{{data_btn.name}}</p>
          <p>{{data_btn.data}}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <!-- Echarts -->
    <div class="paymentChannels-Echarts">
      <div id="paymentChannels-Echarts"></div>
    </div>
  </div>
</template>
<script>
import $axios from 'axios';
export default {
  name: "payment",
  data() {
    return {
      changebgc: 0,
      radio: '累计',
      radio2: '今天',
      radio3: '昨天',
      dateTime: '',
      ison: true,
      dateTime: '',
      loading: true,
      // swiper
      swiperOption: {
        observer: true,
        observeParents: true,
        speed: 1000,
        slidesPerView: 8,
        // spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      data_btns: [
        { name: '整体情况1', data: 9038 },
        { name: '整体情况', data: 15151 },
        { name: '整体情况', data: 25861 },
        { name: '整体情况', data: 53924 },
        { name: '整体情况', data: 33754 },
        { name: '整体情况', data: 15595 },
        { name: '整体情况', data: 31916 },
        { name: '整体情况', data: 41223 },
        { name: '整体情况', data: 12697 },
        { name: '整体情况', data: 8417 }
      ],
      // 控制日期选择器到今天
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
    }
  },
  // 监听echarts数据
  watch: {
    data1: {
      handler(newValue, oldValue) {
        this.RunWaterEcharts();
        this.loading = true;
      },
      deep: true
    }
  },
  // 挂载之后执行
  mounted() {
    this.paymentChannels();
  },
  // 函数
  methods: {
    // 获取时间
    getToDate() {
      var date1 = this.dataTime[0];
      console.log(123);
    },
    // 获取数据
    getData() {
      var st1
      $axios.get("../../../../../../../static/dataJson/paymentChannels.json")
        .then(res => {
          res.data.forEach(item => {
            this.data_btns = item.data_btns;
            st1 = setTimeout(() => { this.loading = false }, 2e3);
          });
        });
    },
    // 切换
    tabData() {
      var st2;
      window.clearTimeout(st2);
      if (this.radio == '新增') {
        $axios.get("../../../static/dataJson/newpaymentChannels.json")
          .then(res => {
            res.data.forEach(item => {
              this.data_btns = item.data_btns2;
              st2 = setTimeout(() => { this.loading = false }, 3e3);
            });
          });
      } else {
        this.getData();
      }
      this.radio == '累计' ? this.ison = true : this.ison = false;
    },
    // 按钮颜色切换
    btn_prev(index, event) {
      var el = event.currentTarget;
      this.changebgc = index;
    },
    // echarts
    paymentChannels() {
      // 初始化
      let paymentChannels = this.$echarts.init(document.getElementById('paymentChannels-Echarts'));
      // 绘图
      paymentChannels.setOption({
        // 调色板
        color: ['#B5C7FF', '#8EA9FF', '#7496FF', '#4471FE', '#1F55FD', '#003BF2'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.98)', //通过设置rgba调节背景颜色与透明度
          extraCssText: 'box-shadow:0px 3px 5px rgba(0,0,0,0.1)',
          textStyle: {
            color: 'black',
          },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '0',
          left: '1%',
          right: '2.5%',
          bottom: '9%',
          width: '100%',
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
          type: 'value',
          show: false,
        }],
        series: [{
            name: '线下支付',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: 0.5,
            symbol: "none",
          },
          {
            name: '未关注支付',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: 0.5,
            symbol: "none",
          },
          {
            name: '已关注支付',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410],
            smooth: 0.5,
            symbol: "none",
          },
          {
            name: '支付宝支付',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
            smooth: 0.5,
            symbol: "none",
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            smooth: 0.5,
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            smooth: 0.5,
            symbol: "none",
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: '邮件营销1',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: 0.5,
            symbol: "none",
          },
        ]
      });
      // 自适应
      window.addEventListener("resize", function() {
        paymentChannels.resize();
      });
    }
  }
}

</script>
<style lang="scss">
#payment {
  #payment-top {
    position: relative;
    border-radius: 4px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    padding: 0 .15rem .14rem;

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

  // 滑块
  .swiper-button-next,
  .swiper-button-prev {
    top: .95rem;
    outline: none;
    height: .4rem;
    width: .16rem;
    background-size: 50%;
    border-radius: 4px;
    border: 1px #E7EEEF solid;
    z-index: 1;
  }

  @media screen and (max-width: 1400px) {
    .swiper-container {
      width: 15rem;
    }

    .swiper-button-next,
    .swiper-button-prev {
      top: 1.3rem;
    }
  }

  // 滑块
  .swiper-container {
    width: 92%;

    // border: 1px red solid;
    .swiper-slide {
      display: flex;
      align-items: center;
      padding: 10px 0;

      .data_btns {
        width: 1.4rem;
        height: 55px;
        padding: .1rem;
        cursor: pointer;
        border-radius: 4px;
        background-color: #FAFAFA;
        border: 1px solid rgba(231, 238, 239, 1);
      }

      .data_btns_active {
        color: #ffffff;
        background-color: #4471FE;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
      }
    }
  }

  // Echarts修改样式
  #paymentChannels-Echarts {
    min-height: 5rem;
  }

  #paymentChannels-Echarts>div:nth-of-type(1) {
    width: 15.5rem !important;
    margin: 0 auto !important;
  }
}

</style>
