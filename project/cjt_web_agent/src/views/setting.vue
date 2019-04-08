<template>
    <div id="setting">
      <div class="set_content">
        <div class="set_form">
          <div>
            <span>子公司</span><input type="text" v-model="setInfo.name" readonly="readonly">
          </div>
          <div>
            <span>联系电话</span><input type="text" v-model="setInfo.phone" readonly="readonly">
          </div>
          <div class="test_box">
            <span>代理地区</span><p>{{setInfo.areaName}}</p>
          </div>
          <div class="test_box">
            <span>代理扣点</span><p>{{setInfo.serviceCharge}}%</p>
          </div>
        </div>
        <div v-show="false" class="set_btn">
          <button>取消</button><button>保存</button>
        </div>
      </div>
    </div>
</template>

<script>
import { GetsetInfo } from '../api/login'
    export default{
        name: "setting",
        data(){
            return{
              setInfo:{}
            }
        },
      mounted() {
        this.getSetInfoHandle()
      },
      methods:{
        getSetInfoHandle(){
          return new Promise((resolve,reject) => {
            GetsetInfo().then(res => {
               if(res.data.success){
                 this.setInfo = res.data.data;
               } else {
                 this.$Message.error(res.data.msg)
               }
            }).catch(err => {
              this.$Message.error(err)
            })
          })
        }
      }
    }
</script>

<style scoped lang="less">
  .set_content{
    width: 100%;
    color: #111111;
    font-size: .34rem;
    padding-top: .6rem;
    box-sizing: border-box;
    .set_form{
      padding-right: 1rem;

      div {
        text-align: right;
        margin-top: .29rem;

        span {
          font-size: 0.34rem;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(17, 17, 17, 1);
          line-height: 0.08rem;
        }
        input{
          margin-left: .33rem;
          width:4.14rem;
          height:0.74rem;
          background:#FFFFFF;
          border:1px solid rgba(191,191,191,1);
          padding-left: 0.11rem;
          color: #666666;
        }
      }
      .test_box{
        margin-top: .5rem;
        padding-left: .49rem;
      }
      .test_box p{
        display: inline-block;
        width: 4.47rem;
        text-align: left;
        color: #666666;
        padding-left: .52rem;
      }
    }
    .set_btn{
      margin-top: .67rem;
      text-align: center;
    }
    .set_btn button{
      width:3.24rem;
      height:0.66rem;
      border:1px solid rgba(247,75,61,1);
      outline: none;
      border-radius:0.33rem;
      color: #F74B3D;
      background-color: #ffffff;
    }
    .set_btn button:last-child{
      background-color: #F74B3D;
      color: #ffffff;
      margin-left: .22rem;
    }
  }
</style>
