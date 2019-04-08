<template>
  <div id="app">
    <head-title v-show="!headHide" :title='title' :back="backs" :Dreport="Dreport"></head-title>
    <div :class="{'Page': !headHide}">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadTitle from './components/head'
export default {
  name: 'App',
  components:{
    HeadTitle
  },
  computed:{
    title(){
      return this.$route.meta.title
    },
    backs(){
     return this.$route.meta.back ? this.$route.meta.back : 'true'
    },
    headHide(){
      return this.$route.meta.hide ? this.$route.meta.hide : false
    },
    Dreport(){
      return this.$route.meta.Dreport
    }
  }
}
</script>

<style>
html, body, #app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
}
.Page{
  padding-top: 1rem;
  width: 100%;
  height: 100%;
  box-sizing:border-box;
}
.unPayRecord .ivu-progress-bg{
 background: #F94F3E;
}
.ivu-modal{
  width: 5rem!important;
  margin: 0 auto;
  top:30%;
}
.ivu-modal-wrap *{
  text-align: center;
}
.ivu-modal-footer{
      border-top: 1px solid transparent;
    padding: 0 0.18rem 0.5rem 0.18rem;
}
</style>
