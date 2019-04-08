<template>
    <div id="dataAnomaly">
      <div class="content" v-show="loadException">
        <div class="img_box">
          <img src="../../static/images/插图@3x.png" alt="">
          <p>数据出现异常，请<a @click="refresh()">刷新</a>重试</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
        name: "dataAnomaly",
        props:['loadException'],
        data() {
            return{
              // loadException: ''
            }
        },
      computed: {
      },

      methods:{
        refresh(){
            window.location
        }
      },
      created(){
      }
    }
</script>

<style scoped>

  .content{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10%;
    left: 0;
    background-color: #FFFFFF;
    z-index: 1;
  }
  p{
    font-size:0.14rem;
    font-weight:400;
    line-height:0.24rem;
    color:rgba(118,118,118,1);
    opacity:1;
  }
  .img_box{
    text-align: center;
    width: 2.81rem;
    height: 2.06rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin:  auto;
  }
  .img_box img{
    width: 100%;
    height: 100%;
  }
</style>
