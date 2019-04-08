<template>
  <div id="cashierStatisticsChild">
    <!-- 收银员详情水果姐姐 -->
    <div class="content_box">
      <div class="flex_box1">
        <div class="img_box">
          <img src="../../static/images/yuangongicon@2x.png" alt="">
        </div>
        <div class="staff_box">
          <p class="people">{{clerkName}}</p>
          <div class="img_box1">
            <i class="iconfont icon-riliicon1"></i>&nbsp&nbsp
            <!--<span>09.17</span>&nbsp&nbsp-->
            <span>{{date}}</span>
          </div>
        </div>
      </div>
      <div class="flex_box" style="margin-left: 1.8rem;">
        <p class="tt">{{receivables}}</p>
        <p class="bb_money">￥<span>{{receiveMoney}}</span> &nbsp&nbsp<span>{{receiveNum}}</span>笔</p>
      </div>
      <div class="flex_box">
        <p class="tt">{{rebate}}</p>
        <p class="bb_money">￥<span>{{rebateMoney}}</span> &nbsp&nbsp<span>{{rebateNum}}</span>笔</p>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <div class="table_up_title">
          <p class="font18 bold font_black">收款记录列表<span class="staff_text font12 font_gray">共<span
            class="font_black">{{numTotal}}</span>笔</span></p>
        </div>
        <div class="table_up_title">
          <p class="bold font_black">合计收款<span class="staff_text font_gray">￥{{orderTotal}}</span></p>
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tHead="theTable.tHead" :tBody="theTable.tBody"
                        v-on:paginationAxios="myPagination"></synthesize-table>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'cashierStatisticsChild',
    data() {
      return {
        clerkName: '',
        receiveMoney: 0,
        receiveNum: 0,
        rebateMoney: 0,
        rebateNum: 0,
        numTotal: 0,
        orderTotal: 0,
        date: '无',
        receivables: '收款：',
        rebate: '返利：',
        theTable: {
          pages: {
            counts: 10,
            total: 0,
            totalPage: 0,
            // 当前在第几页
            pageState: 1,
            goPage: '',
            initPage: 0,
          },
          //表格数据
          tHead: [
            {text: '序号'},
            {text: '订单编号'},
            {text: '收银时间'},
            {text: '金额'},
            {text: '类型'}
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: '135sdad31313',
            //   col02: '2018.01.01/23:00',
            //   col03: '123.45',
            //   col04: '支护宝支护'
            // }
          ]
        }
      }
    },
    created() {
      this.getfinancialLoadOnDutyDetailTotal(this.$route.query.id)
      // this.getfinancialLoadOnDutyDetailTotal(23)
        .then(res => {
          // console.log(res, 'resdsdsds')
          if (res.data.success == true) {
            if (res.data.data) {
              this.clerkName = res.data.data.clerkName
              this.date = res.data.data.date
              this.numTotal = res.data.data.numTotal
              this.orderTotal = res.data.data.orderTotal
              this.rebateMoney = res.data.data.rebateMoney
              this.rebateNum = res.data.data.rebateNum
              this.receiveMoney = res.data.data.receiveMoney
              this.receiveNum = res.data.data.receiveNum
            } else {
              this.$message({
                type: 'info',
                message: '暂时没有数据哦',
                center: true,
                showClose: true,
              })
            }
          } else {
            console.log(res)
            this.$message({
              type: 'warning',
              message: res.data.msg,
              center: true,
              showClose: true,
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '出错啦！请检查网络后重试！',
            center: true,
            showClose: true,
          })
        })
      this.getDetailList(1, 10)
    },
    methods: {
      ...mapActions([
        'getfinancialLoadOnDutyDetailTotal',
        'getfinancialqueryOnDutyDetail'
      ]),
      //  获取列表数据
      getDetailList(page, limit) {
        let queryOnDutyDetail = {
          onDutyId: this.$route.query.id,
          page: page,
          limit: limit
        }
        // let queryOnDutyDetail={
        //   onDutyId: 23,
        //   page: page,
        //   limit: limit
        // }
        // console.log(queryOnDutyDetail,'queryOnDutyDetail')
        this.getfinancialqueryOnDutyDetail(queryOnDutyDetail)
          .then(res => {
            this.theTable.tBody = []
            // console.log(res, 'resdaxfa')
            if (res.data.success == true) {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => {
                  if (!item.orderNo) {
                    item.orderNo = '暂无数据'
                  }
                  if (!item.receiveTime) {
                    item.receiveTime = '暂无数据'
                  }
                  if (!item.receiveMoney) {
                    item.receiveMoney = '暂无数据'
                  } else {
                    item.receiveMoney = '￥' + item.receiveMoney
                  }
                  if (!item.payType) {
                    item.payTypeName = '暂无数据'
                  } else {
                    item.payTypeName += '支付'
                  }
                  this.theTable.tBody.push({
                    id: item.orderId,
                    payType: item.payType,
                    col01: item.orderNo,
                    col02: item.receiveTime,
                    col03: item.receiveMoney,
                    col04: item.payTypeName
                  })
                  this.theTable.pages.total = res.data.total
                  this.theTable.pages.pageState = page
                  this.theTable.pages.counts = limit
                  this.theTable.pages.initPage = Math.ceil((res.data.total / limit) / 2)
                  this.theTable.pages.totalPage = Math.ceil(res.data.total / limit)
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '暂时还没有数据哦！',
                  center: true,
                  showClose: true,
                })
              }
            } else {
              console.log(res)
              this.$message({
                type: 'warning',
                message: res.data.msg,
                center: true,
                showClose: true,
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '出错啦！请检查网络后重试！',
              center: true,
              showClose: true,
            })
          })
      },

      //  分页跳转
      myPagination(page, limit) {
        this.getDetailList(page, limit)
      }
    }
  }

</script>
<style scoped>
  #cashierStatisticsChild {
    margin: .24rem .2rem;

  }

  .content_box {
    background-image: url(../../static/images/bg@2x-6.png);
    background-size: cover;
    display: flex;
    color: #ffffff;
    justify-content: space-between;
    align-items: flex-end;
    padding: .6rem;
  }

  .img_box {
    width: .8rem;
    height: .8rem;
  }

  .img_box1 {
    height: .26rem;
    display: flex;
  }

  .flex_box {
    margin-right: 1.3rem;
  }

  .staff_box {
    margin-left: .21rem;
  }

  .tt {
    font-size: 0.24rem;
  }

  .bb_money {
    font-size: 0.34rem;
    font-weight: bold;
  }

  .people {
    font-size: 0.3rem;
    font-weight: bold;
  }

  .img_box1 {
    margin-top: .08rem;
  }

  .img_box1 > i {
    font-size: .20rem;
    margin-top: .03rem;
  }

  .img_box1 > span {
    font-size: .22rem;
  }

  .flex_box1 {
    display: flex;
  }

  /*表格组件包框*/
  .table_box {
    margin-top: 0.1rem;
    padding: 0 0.2rem;
  }

  .table_box > div:nth-of-type(1) {
    padding-top: 0.2rem;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .staff_text {
    margin-left: 0.18rem;
  }

</style>
