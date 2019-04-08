<template>
  <div id="shopdata">
    <div class="shopdata-alltop">
      <div class="shopdata-top">
        <div class="shopdata-top-img"><img src="../../../../../static/image/zfb@2x.png" alt=""></div>
          <div class="shopdata-top-right">
            <p>喜洋洋超市</p>
            <Button type="primary" shape="circle" size="small">连锁超市</Button>
          </div>
          <div class="shopdata-top-text">
            <p>店长</p>
            <p>吴可军</p>
            <p>13214562314</p>
          </div>
          <div class="shopdata-top-text">
            <p>代理商</p>
            <p>吴可军</p>
            <p>13112345645</p>
          </div>
          <div class="shopdata-top-text">
            <p>返利比例0.3%</p>
            <p>固定返利1%</p>
            <p>资金池2%</p>
          </div>
          <div class="shopdata-top-text">
            <p>服务费0.8%</p>
            <p>代理商服务费0%</p>
            <p>平台服务费0.8%</p>
          </div>
          <Button class="shopmsg" type="primary">商家信息详情</Button>
        </div>
        <div class="shopdata-top-bottom">
          <Button type="warning" ghost>提现店铺</Button>
          <div class="withdrawshopdetails">
            <p>账户余额 <span>￥60.15</span></p>
            <p>预付金 <span>￥20000/10000</span></p>
            <p>服务费 <span>￥20000</span></p>
            <p>客单价 <span>￥60.15</span></p>
          </div>
        </div>
      </div>
      <!-- echarts -->
      <!-- <RealTimeSituation /> -->
    </div>
</template>
<script>
import RealTimeSituation from './shopbancomponents/RealTimeSituation.vue'
export default {
  name: "shopdata",
  components: {
    "RealTimeSituation": RealTimeSituation
  },
  data() {
    return {

    }
  },
  // 挂载之后执行
  mounted() {

  },
  // 函数
  methods: {

  }
}

</script>
<style lang="scss">
#shopdata {

  .shopdata-alltop {
    background-color: #FFFFFF;
    border-radius: 4px;

    .shopdata-top {
      display: flex;
      padding: .34rem;
      border-bottom: 1px #E7EEEF solid;

      .shopdata-top-img {
        width: 1rem;
        height: 1rem;
        border-radius: 4px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .shopdata-top-right {
        position: relative;
        margin-right: .54rem;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: -.54rem;
          border-right: 1px #E7EEEF solid;
          height: .78rem;
          margin: auto;
        }

        p {
          color: #000000;
          font-size: .2rem;
          font-weight: bold;
          text-indent: .14rem;
          line-height: .49rem;
        }

        button:nth-child(2) {
          font-size: .12rem;
          background-color: #FFBA1C;
          margin-top: .1rem;
          margin-left: .14rem;
          border: none;
          line-height: 1.6;
          padding: 0.02rem .1rem;

          &:focus {
            box-shadow: none;
          }
        }
      }

      .shopdata-top-text {
        padding: .14rem .52rem 0;
        margin-right: .3rem;

        p:nth-child(1) {
          color: #767676;
          font-weight: 400;
        }

        p {
          color: #000000;
          font-weight: 500;
          font-size: .2rem;
          line-height: 1.3;
        }
      }

      .shopmsg {
        height: 40px;
        line-height: 1;
        margin: auto;
        font-size: .2rem;
      }
    }

    .shopdata-top-bottom {
      padding: .3rem .34rem;
      position: relative;
      display: flex;

      &:before {
        content: '';
        position: absolute;
        left: 1.75rem;
        top: 0;
        bottom: 0;
        margin: auto;
        border-right: 1px #E7EEEF solid;
        height: .66rem;
      }

      button {
        font-size: .16rem;
        height: .4rem;
        margin: auto 0;
        line-height: 1;
      }

      .withdrawshopdetails {
        display: flex;
        margin-left: .9rem;

        p {
          border: 1px #E7EEEF solid;
          background-color: #FAFAFA;
          color: #151515;
          font-size: .14rem;
          text-align: center;
          border-radius: 4px;
          padding: .1rem;
          width: 1.6rem;
          margin-right: .2rem;
          font-weight: 400;

          span {
            display: block;
            font-size: .16rem;
            text-align: center;
            font-weight: bold;
          }
        }

      }

      .ivu-btn-warning:focus {
        box-shadow: none;
      }

      .ivu-btn-ghost.ivu-btn-warning:hover {
        background-color: initial;
      }
    }
  }

  #RealTimeSituation {
    margin-top: 20px;
  }
}

</style>
