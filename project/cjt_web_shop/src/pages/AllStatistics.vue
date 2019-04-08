<template>
  <div v-if="hackReset" id="AllStatistics">
    <deepAnalysisPie />
    <deepAnalysisPie2 />
    <runningWater />
    <allPaymentChannels />
    <client />
    <allPayment />
    <spendingTime />
    <cargo />
    <classProduct />
    <div>
    </div>
    <div id="go-top">
      <a href="#">
        <img src="../../static/images/icons/go-top.png" alt="">
    </a>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
import deepAnalysis_pie from '../components/AllStatistics/deepAnalysis_pie.vue';
import deepAnalysis_pie2 from '../components/AllStatistics/deepAnalysis_pie2.vue';
import runningWater from '../components/AllStatistics/runningWater.vue';

export default {
  name: 'AllStatistics',
  data() {
    return {
      hackReset: true
    }
  },
  components: {
    'deepAnalysisPie': deepAnalysis_pie,
    'deepAnalysisPie2': deepAnalysis_pie2,
    'runningWater': runningWater,
    //懒加载
    allPaymentChannels: resolve => { require(['../components/AllStatistics/allPaymentChannels.vue'], resolve); },
    spendingTime: resolve => { require(['../components/AllStatistics/spendingTime.vue'], resolve); },
    client: resolve => { require(['../components/AllStatistics/client.vue'], resolve); },
    allPayment: resolve => { require(['../components/AllStatistics/allPayment.vue'], resolve); },
    cargo: resolve => { require(['../components/AllStatistics/cargo.vue'], resolve); },
    classProduct: resolve => { require(['../components/AllStatistics/classProduct.vue'], resolve); },
  },
  mounted() {
    const _this = this
    $(function() {
      $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
          $("#go-top").fadeIn(600);
        } else {
          $("#go-top").stop(true, true).fadeOut(600);
        }
      });
      //返回到顶部功能
      $("#go-top").on("click", function() {
        $("html, body").animate({
          scrollTop: 0
        }, 500);
      });
    });
  }
};

</script>
<style lang="scss" scoped>
#AllStatistics {
  padding: .2rem;
  min-width: 1100px;

  #go-top {
    display: none;
    position: fixed;
    right: 10px;
    bottom: 10%;
    opacity: .4;
    z-index: 10;
  }

  #go-top:hover {
    opacity: 1;
  }

  #go-top a {
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    text-decoration: none;
  }
}

</style>
