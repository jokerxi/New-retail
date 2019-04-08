<template>
  <div id='allpaymentChannels'>
    <el-tabs v-model="activeName">
      <el-tab-pane label="支付通道流水分析" name="first" :lazy="lazy">
        <paymentChannels />
      </el-tab-pane>
      <el-tab-pane label="利润分析" name="second" :lazy="lazy">
        <paymentChannels2 />
      </el-tab-pane>
      <el-tab-pane label="顾客价值分析" name="third" :lazy="lazy">
        <paymentChannels3 />
      </el-tab-pane>
      <el-tab-pane label="顾客留存状态流水分析" name="fourth" :lazy="lazy">
        <paymentChannels4 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// jshint esversion: 6
import paymentChannels from './AllPayment/paymentChannels.vue';
import paymentChannels2 from './AllPayment/paymentChannels2.vue';
import paymentChannels3 from './AllPayment/paymentChannels3.vue';
import paymentChannels4 from './AllPayment/paymentChannels4.vue';
export default {
  name: 'allpaymentChannels',
  components: {
    'paymentChannels': paymentChannels,
    'paymentChannels2': paymentChannels2,
    'paymentChannels3': paymentChannels3,
    'paymentChannels4': paymentChannels4
  },
  data() {
    return {
      activeName: 'first',
      lazy: true,
    };
  }
};

</script>
<style lang="scss">
.el-tabs__header {
  z-index: 0;
}

#AllStatistics {
  .is-active {
    color: #000000;
    font-weight: 1000;
  }
  .el-tabs__item {
    text-align: center;
    width: 150px;
  }
  .el-tabs__item:hover {
    color: inherit;
    cursor: pointer;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}

#allpaymentChannels {
  margin-top: .25rem;
  padding: .17rem .21rem 0 .21rem;
  background-color: #ffffff;
  border: 1px #E7EEEF solid;
  border-radius: 4px;
  min-width: 1100px;
}

</style>
