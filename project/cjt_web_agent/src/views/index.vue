<template>
   <div class="Index">
       <div class="MonthIncom">
           <div class="Income">
              <div>本月收入</div>
              <div>{{homeInfo.monthIncome}}元</div>
           </div>
           <div class="Info">
              <div class="div">
                  <p>店铺数量</p>
                  <p>{{homeInfo.shopNum}}</p>
              </div>
              <div class="div">
                  <p>累计收入</p>
                  <p>{{homeInfo.allIncome}}</p>
              </div>
           </div>
       </div>
       <div class="Prolist">
           <ul>
               <router-link to='/shopManagement' tag="li"><span class="shop"></span>店铺管理</router-link>
               <router-link to='/addBasic' tag="li"><span class="addShop"></span>添加店铺</router-link>
               <router-link to='/setting' tag="li"><span class="set"></span>设置</router-link>
           </ul>
       </div>
    </div>
</template>

<script>
import { LoginInfo, getHomeInfo } from '../api/login'
export default {
  name: 'index',
  data(){
      return{
        loginInfo:{},
        homeInfo:{}
      }
  },
  created(){
    // 调用获取登录信息
    this. LoginInfoHandle()
  },
  methods:{
    // 获取登录信息
    LoginInfoHandle(){
      return new Promise((resolve,reject) => {
        LoginInfo().then(res => {
          if(res.data.success){
            this.loginInfo = res.data.data;
            let companyId = res.data.data.companyId ? res.data.data.companyId : '';
            localStorage.setItem('companyId',companyId);
            this.getHomeInfoHandle(companyId)
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(err => {
          this.$Message.error(err)
        })
      })
    },
    // 获取首页信息
    getHomeInfoHandle(payload){
      return new Promise((resolve,reject) => {
        getHomeInfo(payload).then(res => {
           if(res.data.success){
             this.homeInfo = res.data.data;
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
.Index{
      .MonthIncom{
    width: 100%;
    height: 4rem;
    background: url('../../static/images/mbg.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-family: 'PingFangSC-Regular';
    .Income{
        text-align:center;
        font-size: 0.36rem;
        font-weight: bold;
        padding: 0.6rem 0 0.5rem;
        div{
          &:last-child{
           font-size: 0.4rem;
           font-weight: 400;
           margin-top: 0.2rem;
        }
        }
    }
    .Info{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .div{
            flex: 1;
            text-align: center;
            font-size: 0.3rem;
            font-weight: 400;
            &:last-child{
                border-left: 1px solid #FF8C80;
                margin-left: -0.01rem;
            }
            p{
              &:last-child{
                margin-top: 0.2rem;
            }
            }
        }
    }
}
      .Prolist{
        ul{
            list-style: none;
            li{
                width: 100%;
                height: 0.93rem;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
                padding: 0 0.2rem;
                font-size:0.34rem;
                font-family:'PingFangSC-Regular';
                font-weight:400;
                color:rgba(0,0,0,1);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span{
                    display: inline-block;
                    width: 0.4rem;
                    height: 0.4rem;
                    margin-right: 0.15rem;
                    background: url('../../static/images/_s-icon1.png') no-repeat;
                    background-size: 100% 100%;
                    &.addShop{
                        background: url('../../static/images/_s-icon2.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.set{
                        background: url('../../static/images/_s-icon3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
}
</style>
