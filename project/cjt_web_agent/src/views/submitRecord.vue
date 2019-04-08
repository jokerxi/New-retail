<template>
  <div id="submitRecord">
        <!--提现记录-->
    <div class="sub-top">
      <div class="sub-top-img">
        <img src="../../static/images/iicon@3x.png">
      </div>
        <p>店铺余额</p>
        <p>￥{{remaining_sum}}</p>
      </div>
      <div class="sub-button">
        <div class="sub-button-items" v-for="(item, index) in items">
          <p>提现金额<span>￥{{item.withdraw_deposit_money}}</span></p>
          <p>申请时间<span>{{item.application_date}}</span></p>
          <p>归还进度<span>{{item.return_schedule}}</span></p>
        </div>
      </div>
    </div>
</template>
<script>
import { CashRecord, shopRemainent } from '../api/shop'
export default {
  name: 'submitRecord',
  data() {
    return {
      remaining_sum: '213456.12',
      page:1,
      pageSize:10,
      items: [{
          withdraw_deposit_money: '6000.00',
          application_date: '2018.8.30 14:04:01',
          return_schedule: '待审核'
        },
        {
          withdraw_deposit_money: '6000.00',
          application_date: '2018.8.30 14:04:01',
          return_schedule: '已打款'
        },
        {
          withdraw_deposit_money: '6000.00',
          application_date: '2018.8.30 14:04:01',
          return_schedule: '未通过审核'
        }]
    }
  },
  created(){
    let shopId = '219511108925661184';
    let param = {
        shopId: shopId,
        page: this.page,
        pageSize: this.pageSize
    }
    this.shopRemainentHandle(shopId); //店铺余额
    this.CashRecordHandle(param) //店铺提现记录
  },
  methods:{
    // 店铺余额
    shopRemainentHandle(payload){
      return new Promise((resolve,reject) => {
        shopRemainent(payload).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 提现记录
    CashRecordHandle(payload){
      return new Promise((resolve,reject) => {
        CashRecord(payload).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }

};

</script>
<style lang="less">
#submitRecord {
  background-color: #EDEDED;
  min-height: 100%;

  .sub-top {
    background-color: #fff;
    padding: .48rem 0;

    p {
      text-align: center;

      &:nth-child(2) {
        font-size: .34rem;
        margin-top: .28rem;
      }

      &:nth-child(3) {
        color: #111111;
        font-size: .4rem;
        font-weight: 600;
      }
    }

    .sub-top-img {
      width: .8rem;
      height: .8rem;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .sub-button {
    .sub-button-items {
      background-color: #fff;
      margin-top: .2rem;
      padding: .1rem 0;

      p {
        padding: .18rem 1rem;
        font-size: .3rem;
        color: #777777;

        span {
          display: inline-block;
          color: #111111;
          text-align: center;
          text-indent: .5rem;
          font-weight: 400;
        }
      }
    }
  }
}

</style>
