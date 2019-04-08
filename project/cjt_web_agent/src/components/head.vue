<template>
    <div class="header">
        <div class="head">
            <div @click="ToPrev" v-if="back === 'true'" class="back"></div>
            <div class="title">{{title}}</div>
            <div class="days" v-if="Dreport">
               <div class="drop" @click="IsShow">
                   <span>日报</span>
                   <span class="dwon"></span>
               </div>
               <div class="dwonList" v-if="shows">
                   <p v-for="(item,index) in dateRage" :key="index" @click="saveDate(item.id)">{{item.title}}</p>
               </div>
            </div>
        </div>     
    </div>
</template>

<script>
export default {
 name: 'headTitle',
 props: {
    title: {
      type:String,
      default: ''
    },
    back:{
      type: String,
      default: 'true'
    },
    Dreport:{
        type: Boolean,
        default:false
    }
},
data(){
  return{
      shows:false,
      dateRage:[
          {
              id:'1',
              title:'日报'
          },
          {
              id:'2',
              title:'周报'
          },
          {
              id:'3',
              title:'月报'
          }
      ],
      id:''
  }
},
methods: {
  ToPrev(){
      this.$router.back();
  },
  IsShow(){
      this.shows = !this.shows
  },
  saveDate(id){
      this.id = id
     localStorage.setItem('id',this.id)
  }
}
}
</script>

<style scoped lang="less">
 .header{
     width: 100%;
     height: 1rem;
     background: #fff;
     border-bottom: 1px solid #ccc;
     position: fixed;
     z-index: 1000;
     .head{
      width: 100%;
      height: 100%;
      position: relative;
      text-align: center;
      .title{
        line-height: 1rem;
        font-size:0.34rem;
        font-family:'PingFangSC-Regular';
        font-weight:400;
        color:rgba(17,17,17,1);
      }
      .back{
          width: 0.3rem;
          height: 0.3rem;
          position: absolute;
          left: 0.2rem;
          top:50%;
          margin-top: -0.15rem;
          background: url('../../static/images/back.png') no-repeat;
          background-size: 100% 100%;
      }
      .days{
        position: absolute;
        right: 0.2rem;
        top:0.3rem;
        .dwon{
            width: 0.3rem;
            height: 0.3rem;
            display: inline-block;
            background: url('../../static/images/dwon.png') no-repeat;
            background-size: 100% 100%;
            vertical-align: middle;
        }
        .dwonList{
            position: absolute;
            left: 0;
            top:0.5rem;
            background: #fff;
            z-index: 10000;
            border:1px solid #ddd;
            border-radius: 0.05rem;
            width: 1.2rem;
            text-align: center;
            margin-left: -0.1rem;
            &:before{
                content: "";
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                background: #fff;
                border-right:1px solid #ddd;
                border-top:1px solid #ddd;
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
                -ms-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
                position: absolute;
                top:-0.12rem;
                left: 50%;
                margin-left: -0.1rem;
            }
            p{
                padding: 0.1rem;
            }
        }
      }
     }
     
 }
</style>
