<template>
  <div id="ClassProduct">
    <p class="classProduct-title">品类销售情况分析</p>
    <div class="bg radius border">
      <div class="classProduct-top">
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
      <!--表格-->
      <synthesize-table :tablePages="theTable.pages" :tableData="theTable.data"></synthesize-table>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
export default {
  name: 'classProduct',
  data() {
    return {
      changebgc: 0,
      swiperOption: { //swiper3
        speed: 1000,
        slidesPerView: 8,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      data_btns: [
        { name: '整体情况', data: 9038 },
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
      radio: '消费额',
      radio2: '日',
      dateTime: '',
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
            { text: '序号' },
            { text: '商品名' },
            { text: '条码' },
            { text: '供应商' },
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
              text: '系统毛利',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '近30天日均销量',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            }
          ],
          tBody: [{
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
            {
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123'
            },
          ]
        }
      }
    };
  },
  methods: {
    btn_prev(index, event) {
      var el = event.currentTarget;
      this.changebgc = index;
    }
  }
};

</script>
<style lang="scss">
#ClassProduct {
  margin-top: .25rem;

  p {
    margin: 0;
  }

  .classProduct-title {
    font-size: .16rem;
    font-weight: bold;
    border-left: 2px solid #4471FE;
    padding: 0 .06rem;
    margin-bottom: .14rem;
  }

  .bg {
    background-color: #ffffff;
    min-width: 1100px;
    padding: .12rem .21rem 0 .21rem;
    position: relative;

    .swiper-button-next,
    .swiper-button-prev {
      top: .95rem;
      outline: none;
      height: .4rem;
      width: .16rem;
      background-size: 50%;
      border-radius: 4px;
      border: 1px #E7EEEF solid;
    }

    .swiper-button-prev {
      left: 25px;
    }

    .swiper-button-next {
      right: 31px;
    }

    @media screen and (max-width: 1400px) {

      .swiper-button-next,
      .swiper-button-prev {
        top: 85px;
      }

      .swiper-button-prev {
        left: 15px;
      }

      .swiper-button-next {
        right: 15px;
      }
    }

    // 滑块
    .swiper-container {
      width: 15rem;

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

    // 头部样式
    .classProduct-top {
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
          background: url(../../../static/images/icons/downicon@2x.png) no-repeat;
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
        border: 1px #E7EEEF solid;
      }
    }
  }
}

/*表格组件包框*/
.table_box {
  padding: 0 0.2rem;
}

</style>
