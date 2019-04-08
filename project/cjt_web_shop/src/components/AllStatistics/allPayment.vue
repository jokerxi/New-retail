<template>
  <div id='allpayment'>
    <el-tabs v-model="activeName">
      <el-tab-pane label="支付通道流水分析" name="first" :lazy="lazy">
        <payment />
      </el-tab-pane>
      <el-tab-pane label="顾客价值分析" name="second" :lazy="lazy">
        <payment2 />
      </el-tab-pane>
      <el-tab-pane label="顾客留存状态流水分析" name="third" :lazy="lazy">
        <payment3 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// jshint esversion: 6
import payment from './AllPayment2/payment.vue';
import payment2 from './AllPayment2/payment2.vue';
import payment3 from './AllPayment2/payment3.vue';
export default {
  name: 'allpayment',
  components: {
    'payment': payment,
    'payment2': payment2,
    'payment3': payment3
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

#allpayment {
  margin-top: .25rem;
  padding: .17rem .21rem 0 .21rem;
  background-color: #ffffff;
  border: 1px #E7EEEF solid;
  border-radius: 4px;
  min-width: 1100px;
}

</style>
