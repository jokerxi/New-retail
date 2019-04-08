<template>
  <div>
    <!--顶部导航-->
    <div class="nav_box">
      <index-nav></index-nav>
    </div>
    <div>
      <!--二级路由-->
      <div class="BoxContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "mainPage"
    }
</script>

<style scoped>

</style>
