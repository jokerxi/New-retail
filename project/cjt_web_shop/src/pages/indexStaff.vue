<template>
  <div>
    <!--CEO之外职位的店铺概况页面-->
    <shopNav class="shop_nav"></shopNav>
    <formAll1 class="myPosition"></formAll1>
    <top50></top50>
  </div>
</template>

<script>
  import shopNav from '../components/shopNav'
  import formAll1 from '../components/formAll1'
  import top50 from '../components/top50'
  export default {
    name: "index-staff",
    components:{
      shopNav,
      formAll1,
      top50
    }
  }
</script>

<style scoped>

.index_body{
  display: flex;
  flex-direction: row;
}
  .index_body>div{
    /*border:1px solid red;*/
    flex-grow: 1;
  }
  .index_body>div:nth-child(2){
    /*border:1px solid blue;*/
    width:75%
  }
  .myPosition{
    margin-top: 1.22rem;
  }

</style>
