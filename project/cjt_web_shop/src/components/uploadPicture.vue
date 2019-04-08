<template>
  <div>
    <h1>上传图片</h1>
    <div>
      <input type="file" @change="uploadPicture">
      <!--<img class="myImg" :src="imgUrl" alt="">-->
      <div class="myImg" :style="{backgroundImage:'url('+imgUrl+')',backgroundSize:'cover'}"></div>
      <button>上传图片</button>
    </div>
    <i class="iconfont icon-shangshengicon" style="font-size: 40px;color: red"></i>
  </div>
</template>

<script>
  export default {
    name: "upload-picture",
    data() {
          return {
            imgUrl:"../../static/images/img1.jpg"
          }
    },
    methods:{
      uploadPicture(e){
        console.log('事件本身：',e.target.files[0].name)
        // this.imgUrl="../../static/images/"+e.target.files[0].name
      }
    }

  }
</script>

<style scoped>
.myImg{
  border:1px solid red;
  width:200px;
  height: 200px;

}
</style>
