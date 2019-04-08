<template>
  <div>
    <!--ceo之外职位的店铺概况顶部切换组件-->
    <div class="outbox">
      <div>
        店铺概况
      </div>
      <div class="tabs">
        <div v-for="(item,index) in tabTitle" :key="index" :class="'tab'+(index+1)" @click="chooseTab((index+1))">
          <span>{{item.msg}}</span>
        </div>

      </div>

    </div>

  </div>

</template>


<script>
  export default {
    name: "shop-nav",
    data(){
      return {
        tabTitle: [
          {msg:'今天'},{msg:'昨天'},{msg:'10月9日'},{msg:'10月8日'},{msg:'本月'},{msg:'上月'},{msg:'整体'}
        ]
      }
    },
    components: {

    },
    methods: {
      chooseTab (index) {
        var chooseTab
        for(let i=0;i<this.tabTitle.length;i++){
          chooseTab=document.querySelectorAll('.tab'+(i+1))[0]
          chooseTab.style.backgroundColor = "rgba(255,255,255,1)"
          chooseTab.style.color = "#333333"
        }
        chooseTab=document.querySelectorAll('.tab'+index)[0]
        chooseTab.style.backgroundColor = "rgba(68,113,254,1)"
        chooseTab.style.color = "white"

      }
    }
  }
</script>

<style scoped>
  .outbox{
    border-bottom:1px solid rgba(235,235,235,1);
    border-left:1px solid rgba(235,235,235,1);
    /*border:1px solid rgba(255,0,0,1);*/
    /*width:16.15rem;*/
    width:100%;
    padding-left: 1.24rem;
    padding-top: 0.28rem;
    padding-bottom: 0.18rem;
    background-color: white;
    position: fixed;
    z-index: 11;
    top:0.82rem;
  }
  .outbox>div:first-child{
    /*border:1px solid red;*/
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
  .tabs>div{
    border:1px solid rgba(235,235,235,1);
    /*border:1px solid red;*/
    padding: 0.1rem 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: white;
    color: #333333;
    font-size: 0.12rem;
    margin-left: 0.1rem;

  }

  .tabs>div:first-child{
    border:1px solid rgba(235,235,235,1);
    /*width:0.74rem;*/
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: rgba(68,113,254,1);
    color: white;
    margin-left: 0.2rem;

  }
</style>
