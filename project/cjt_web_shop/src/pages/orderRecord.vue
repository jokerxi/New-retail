<template>
  <div id="orderRecord">
    <div class="header_box radius">
      <!-- <div class="content_box"> -->
      <p class="order_title">{{title_name}}</p>
      <div class="date_box">
        <div class="date_box1">
          <p>{{chk_date}}</p>
          <div class="block">
            <el-date-picker
              class="my_date"
              size='small'
              v-model="selectDate"
              type="daterange"
              :picker-options="getToDay"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="date_box1">
          <p>{{chk_state}}</p>
          <div class="block">
            <el-select class="select_list" size="small" v-model="useState" placeholder="请选择">
              <el-option v-for="item in myOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.state">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="date_box1">
          <p>{{pay_mode}}</p>
          <div class="block">
            <el-select
              class="select_list"
              size="small"
              v-model="paymentMethod"
              placeholder="请选择">
              <el-option v-for="item in payOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <!--<div class="clear"></div>-->
          </div>
        </div>
        <div class="date_box1">
          <div class="block">
            <el-button class="query_btn" size="mini" type="primary"
                       @click="mySearch(theTable.pages.counts)">查看
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">订单记录<span class="staff_text font12 font_gray">共<span
          class="font_black">{{theTable.pages.total}}</span>条</span></p>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tHead="theTable.tHead" :tBody="theTable.tBody"
                        v-on:paginationAxios="myPagination"></synthesize-table>
    </div>
  </div>
</template>
<script>
  import '../assets/css/time.css'
  import {mapActions} from 'vuex'

  export default {
    name: 'orderRecord',
    data() {
      return {
        title_name: '订单记录查询',
        chk_date: '日期选择',
        chk_state: '状态',
        pay_mode: '支付方式',
        selectDate: [],
        // 控制日期到今天之前
        getToDay: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        myOptions: [
          {
            state: 0,
            label: '全部'
          }, {
            state: 1,
            label: '已完成'
          }, {
            state: 2,
            label: '返利计算中'
          }
        ],
        useState: 0,
        payOptions: [
          {
            value: 0,
            label: '全部'
          }, {
            value: 1,
            label: '微信支付'
          }, {
            value: 2,
            label: '支付宝支付'
          }
        ],
        paymentMethod: 0,
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
            {text: '平台单号'},
            {text: '交易时间'},
            {text: '交易金额'},
            {text: '微信'},
            {text: '支护宝'},
            {text: '返利金抵扣'},
            {text: '固定返利'},
            {text: '奖金池'},
            {text: '服务费'},
            {text: '入账金额'},
            {text: '状态'},
            {text: '支付方式'}
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: 'dsdad466546da',
            //   col02: '2018.01.01/23:00',
            //   col03: '1356.45',
            //   col04: '136.45',
            //   col05: '136.45',
            //   col06: '136.45',
            //   col07: '136.45',
            //   col08: '1361.45',
            //   col09: '1363.45',
            //   col10: '1369.45',
            //   col11: '返利金计算中',
            //   col12: '支护宝支付'
            // },
          ]

        }
      }
    },
    created() {
      // this.staffNum = this.theTable.data.tBody.length;
      this.getOrderList(1, 10, 0, 0, '', '')
    },
    mounted() {
      $('.el-icon-arrow-up').attr('class', 'iconfont icon-tuichuxialasanjiao2');
      $('.el-icon-search').attr('class', 'iconfont icon-sousuoicon')
    },
    methods: {
      ...mapActions([
        'getfinancialorderList'
      ]),
      getOrderList(page, limit, orderStatus, payType, startDate, endDate) {
        if (startDate != '' && endDate != '') {
          startDate = this.$getData(startDate) + ' 00:00:00'
          endDate = this.$getData(endDate) + ' 23:59:59'
        }
        let orderhistory = {
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          orderStatus: orderStatus,
          payType: payType,
          startDate: startDate,
          endDate: endDate,
          page: page,
          limit: limit
        }
        // console.log(orderhistory)
        this.theTable.tBody = []
        this.getfinancialorderList(orderhistory)
          .then(res => {
            // console.log(res, 'resresres')
            if (res.data.success == true) {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => {
                  if (!item.orderNo) {
                    item.orderNo = '暂无数据'
                  }
                  if (!item.payTime) {
                    item.payTime = '暂无数据'
                  }
                  if (!item.totalMoney) {
                    item.totalMoney = '暂无数据'
                  } else {
                    item.totalMoney = '￥' + item.totalMoney
                  }
                  if (!item.discountMoney) {
                    item.discountMoney = '暂无数据'
                  } else {
                    item.discountMoney = '￥' + item.discountMoney
                  }
                  if (!item.fixedRebate) {
                    item.fixedRebate = '暂无数据'
                  } else {
                    item.fixedRebate = item.fixedRebate + '%'
                  }
                  if (!item.cashPool) {
                    item.cashPool = '暂无数据'
                  } else {
                    item.cashPool = '￥' + item.cashPool
                  }
                  if (!item.serveTotal) {
                    item.serveTotal = '暂无数据'
                  } else {
                    item.serveTotal = '￥' + item.serveTotal
                  }
                  if (!item.accountMoney) {
                    item.accountMoney = '暂无数据'
                  } else {
                    item.accountMoney = '￥' + item.accountMoney
                  }
                  if (!item.orderStatus) {
                    item.orderStatus = '暂无数据'
                  } else if (item.orderStatus == 1) {
                    item.orderStatus = '已完成'
                  } else if (item.orderStatus == 2) {
                    item.orderStatus = '返利计算中'
                  }
                  if (!item.payType) {
                    item.payType = '暂无数据'
                  } else if (item.payType == 1) {
                    item.payType = '微信支付'
                  } else if (item.payType == 2) {
                    item.payType = '支付宝支付'
                  }
                  this.theTable.tBody.push({
                    col01: item.orderNo,
                    col02: item.payTime,
                    col03: item.totalMoney,
                    col04: item.totalMoney,
                    col05: item.discountMoney,
                    col06: item.discountMoney,
                    col07: item.fixedRebate,
                    col08: item.cashPool,
                    col09: item.serveTotal,
                    col10: item.accountMoney,
                    col11: item.orderStatus,
                    col12: item.payType
                  })
                  this.theTable.pages.total = res.data.total.total
                  this.theTable.pages.pageState = page
                  this.theTable.pages.counts = limit
                  this.theTable.pages.initPage = Math.ceil((res.data.total.total / limit) / 2)
                  this.theTable.pages.totalPage = Math.ceil(res.data.total.total / limit)
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '暂无数据哦',
                  center: true,
                  showClose: true
                })
              }
            } else {
              console.log(res)
              this.$message({
                type: 'warning',
                message: res.data.msg,
                center: true,
                showClose: true
              })
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '出错啦！请检查网络后重试！',
              center: true,
              showClose: true
            })
            console.log(err)
          })
      },
      //  搜索
      mySearch(limit) {
        if (this.selectDate.length < 2) {
          this.selectDate.push('')
          this.selectDate.push('')
        }
        // console.log(this.useState, 1, this.paymentMethod, 2, this.selectDate[0], 3, this.selectDate[1], 4)
        this.getOrderList(1, limit, this.useState, this.paymentMethod, this.selectDate[0], this.selectDate[1])
      },
      //  分页跳转
      myPagination(page, limit) {
        if (this.selectDate.length < 2) {
          this.selectDate.push('')
          this.selectDate.push('')
        }
        // console.log(limit,'limit')
        this.getOrderList(page, limit, this.useState, this.paymentMethod, this.selectDate[0], this.selectDate[1])
        // console.log(this.theTable.pages.counts, 'limit')
      }
    }

  }

</script>
<style>
  .el-range__close-icon:before {
    content: '';
    position: absolute;
    top: .15rem;
    background: url(../../static/images/icons/downicon@2x.png) no-repeat;
    background-size: 100%;
    width: .1rem;
    height: .1rem;
  }
</style>
<style scoped>
  #orderRecord {
    margin: .24rem .2rem;
  }

  p {
    margin: 0;
  }

  .header_box {
    background-image: url(../../static/images/bg@2x-6.png);
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    color: #ffffff;
    padding: .44rem 0 .43rem .6rem;
    overflow: hidden;
  }

  .order_title {
    font-size: 0.18rem;
    font-weight: bold;
    padding-bottom: .3rem;
    bottom: 0;
  }

  .date_box1 > p {
    font-size: 0.14rem;
    font-weight: bold;

  }

  /*时间选择器*/
  .date_box {
    display: flex;
    flex-flow: row;
    align-items: flex-end;
  }

  .date_box1 + .date_box1 {
    margin-left: .2rem;
  }

  .block {
    margin-top: .1rem;
  }

  .my_date {
    width: 3rem;
    border-radius: .04rem;
    height: .4rem;
  }

  .my_date .el-range-editor .el-input__inner {
    padding: .03rem .1rem;
    align-items: center;
  }

  .select_list {
    width: 1.34rem;
    border-radius: .04rem;
  }

  .clear {
    clear: both;
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
