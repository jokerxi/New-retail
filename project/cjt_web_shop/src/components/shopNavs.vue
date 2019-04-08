<template>
  <div>
    <!--ceo店铺概况顶部切换组件-->
    <div class="outbox">
      <div>
        店铺概况
      </div>
      <div class="tabs">
        <div v-for="(item,index) in tabTitle" :key="index" class="tab" :class="{'tabActive' : current === index}" @click="chooseTab(index)">
          <span>{{item.msg}}</span>
        </div>

      </div>

    </div>

  </div>

</template>


<script>
  export default {
    name: "shop-navs",
    data(){
      return {
        tabTitle: [
          {msg:'今天'},{msg:'昨天'},{msg:'10月9日'},{msg:'10月8日'},{msg:'本月'},{msg:'上月'},{msg:'整体'}
        ],
        current: 0
      }
    },
    components: {

    },
    methods: {
      chooseTab (index) {
        this.current = index;
      }
    }
  }
</script>

<style scoped>
  .outbox{
    /*border-bottom:1px solid rgba(235,235,235,1);*/
    width:100%;
    padding-top: 0.28rem;
    padding-bottom: 0.18rem;
    background-color: white;
    box-sizing: border-box;
  }
  .outbox>div:first-child{
    text-align: left;
    padding-left: 0.2rem;
    font-size: 0.18rem;
    font-weight: bold;
  } 
  .tabs{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 0.14rem;
  } 
  .tab{
    border:1px solid rgba(235,235,235,1);
    padding: 0.05rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: #fff;
    color: #333333;
    font-size: 0.12rem;
    margin-left: 0.1rem;
    cursor: pointer;
  }

  .tabActive{
    background-color: rgba(68,113,254,1);
    color: #fff;
    border-color: transparent;
    /* margin-left: 0.2rem; */

  }
</style>
