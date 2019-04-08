<template>
    <div id="pageLoss">
      <div class="content">
        <div class="content_box">
          <div class="img_box"><img src="../../static/images/插图@2x.png" alt=""></div>
          <div class="title_box">
            <p>您访问的页面丢失了</p>
            <div class="tips_box">
              <span>您可以：</span>
              <ul>
                <li><span>检查网络连接</span></li>
                <li><span>检查访问地址是否正确</span></li>
                <li><span>返回网站首页</span></li>
              </ul>
              <el-button class="return_btn shadow" type="primary" @click="backHome()" >返回首页</el-button>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>

        </div>
    </div>
</template>

<script>
    export default{
        name: "pageLoss",
        data() {
            return{

            }
        },
      methods: {
          backHome(){
              this.$router.go(-1)
          }
        }
    }
</script>

<style scoped>

.content{
  width: 100%;
  height: 100%;
  /*position:relative;*/
}
.content_box{
  /*display: flex;*/
  /*border: 1px solid blue;*/
  width: 10rem;
  height: 4rem;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.img_box{
  /*border: 1px solid red;*/
  width: 6.02rem;
  height: 3.72rem;
  float: left;
}
.img_box img{
  width: 100%;
  height: 100%;
}
  .title_box{
    /*border: 1px solid red;*/
    float: left;
    padding-left: .85rem;
    padding-top: .5rem;
    box-sizing: border-box;
  }
.title_box p{
  font-size:0.2rem;
  line-height:0.34rem;
  font-weight:500;
}
  .tips_box{
    margin-top: .27rem;
    font-size: .16rem;
  }
  ul li{
    color: #4471FE;
  }
  ul li span{
    color: #000000;
  }
  .return_btn{
      width: 120px;
      height: 40px;
      background-color: #4471FE;
      color: #ffffff;
      margin-top: .42rem;
  }
</style>
