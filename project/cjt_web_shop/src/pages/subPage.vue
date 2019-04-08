<template>
  <div>
    <div class="content_router">
      <!--侧边栏-->
      <div class="aside_box" :class="{'minWidth': Number(code) === 1 }">
        <aside-menu v-on:changeAside="changeAside"></aside-menu>
      </div>
      <!--三级路由-->
      <div class="BoxContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sub-page',
    data() {
      return {
        asideCode: '',
        code: ''
      }
    },
    methods: {
      changeAside(code) {
        this.code = code
        this.$store.commit('saveCode', code)
      }
    }
  }
</script>

<style scoped>
  .nav_box {
    position: relative;
    height: 0.82rem;
  }

  .nav_box > div {
    position: fixed;
    z-index: 11;
    background: white;
    width: 100%;
  }

  .aside_box {
    position: relative;
    min-width: 2.5rem;
    z-index: 10;
  }
  .minWidth{
     position: relative;
    min-width: 38px;
    z-index: 10;
  }
  .aside_box > div {
    position: fixed;
    background: #fff;
    z-index: 1;
  }

  .content_router {
    display: flex;
  }

  .content_router > div:nth-of-type(2) {
    flex-grow: 1;
    background: #f5f5f5;
  }
</style>
