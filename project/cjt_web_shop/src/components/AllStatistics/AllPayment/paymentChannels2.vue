<template>
  <div id="paymentChannels2">
    <div class="paymentChannels2-top">
      <el-radio-group @change="tabData()" class="big-btn" v-model="radio" size="mini" fill="#4471FE">
        <el-radio-button class="big-radio-btn" label="累计"></el-radio-button>
        <el-radio-button class="big-radio-btn" label="新增"></el-radio-button>
      </el-radio-group>
      <el-radio-group v-show="ison" class="big-btn2" v-model="radio2" size="mini" fill="#4471FE">
        <el-radio-button class="big-radio-btn2" label="今天"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="昨天"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="10月8日"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="10月9日"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="本月"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="上月"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="整体"></el-radio-button>
      </el-radio-group>
      <el-radio-group v-show="!ison" class="big-btn2" v-model="radio3" size="mini" fill="#4471FE">
        <el-radio-button class="big-radio-btn2" label="今天"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="昨天" />
        <el-radio-button class="big-radio-btn2" label="10月8日"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="10月9日"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="本月"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="上月"></el-radio-button>
        <el-radio-button class="big-radio-btn2" label="整体"></el-radio-button>
      </el-radio-group>
      <div class="block">
        <p class="dateTime">日期</p>
        <el-date-picker value-format="timestamp" :picker-options="getToDay" size="mini" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clear-icon="" @change="getToDate()">
        </el-date-picker>
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
    <div class="paymentChannels2-Echarts">
      <div id="paymentChannels2-Echarts"></div>
    </div>
    <!-- loading -->
    <loading :loading="loading" />
  </div>
</template>
<script>
// jshint esversion: 6
import loading from '../../loading.vue';
export default {
  name: 'paymentChannels2',
  components: {
    loading
  },
  data() {
    return {
      // 控制日期选择器到今天
      getToDay: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      changebgc: 0,
      radio: '累计',
      radio2: '今天',
      radio3: '昨天',
      ison: true,
      loading: true,
      dateTime: '',
      swiperOption: {
        observer: true,
        observeParents: true,
        speed: 1000,
        slidesPerView: 8,
        spaceBetween: 20,
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
    };
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
  mounted() {
    this.paymentChannels2();
  },
  methods: {
    // 获取时间
    getToDate() {
      var date1 = this.dataTime[0];
      console.log(123);
    },
    // 获取数据
    getData() {
      var st1
      this.$axios.get("../../../static/dataJson/paymentChannels2.json")
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
        this.$axios.get("../../../static/dataJson/newpaymentChannels2.json")
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
    paymentChannels2() {
      // 初始化
      let paymentChannels2 = this.$echarts.init(document.getElementById('paymentChannels2-Echarts'));
      // 绘图
      paymentChannels2.setOption({
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
        paymentChannels2.resize();
      });
    }
  }
};

</script>
<style lang="scss">
#paymentChannels2 {
  position: relative;

  .swiper-button-next,
  .swiper-button-prev {
    top: .85rem;
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
      top: 1.1rem;
    }
  }

  // 滑块
  .swiper-container {
    width: 14.8rem;

    // border: 1px red solid;
    .swiper-slide {
      display: flex;
      align-items: center;
      padding: 10px 0;

      .data_btns {
        width: 1.4rem;
        height: .46rem;
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

  .paymentChannels2-top:before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    border-bottom: 1px #E7EEEF dashed;
    width: 18rem;
  }

  // 头部样式
  .paymentChannels2-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: .11rem;

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

      .dateTime {
        line-height: 2.1;
        margin-right: .1rem;
      }

      .el-range__icon {
        color: #4471FE;
      }

      .el-range__close-icon:before {
        content: '';
        position: absolute;
        top: 11px;
        background: url(../../../../static/images/icons/downicon@2x.png)no-repeat;
        background-size: 100%;
        width: .1rem;
        height: .1rem;
      }

      .el-range-editor--mini.el-input__inner {
        width: 2.9rem;
        margin-right: .2rem;
      }
    }

    .el-radio-button__inner {
      font-size: .12rem;
      border-radius: .24rem;
      margin-right: .1rem;
      border:1px #E7EEEF solid;
    }
  }

  // Echarts修改样式
  #paymentChannels2-Echarts {
    min-height: 5rem;
  }
    #paymentChannels2-Echarts>div:nth-of-type(1) {
    width: 15.5rem!important;
    margin: 0 auto!important;
  }
}

</style>
