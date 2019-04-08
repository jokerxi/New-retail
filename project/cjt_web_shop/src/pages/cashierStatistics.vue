<template>
  <div id="cashier_statistics">   <!-- 收银统计查询 -->
    <div class="content_box radius">
      <p class="b_title">{{title_name}}</p>
      <div class="date_box">
        <div class="date_box1">
          <p class="sam_title">{{chk_date}}</p>
          <el-date-picker
            class="my_date"
            size='small'
            clear-icon=''
            v-model="valueTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="getToDay">
          </el-date-picker>
        </div>
        <div class="date_box1">
          <el-button class="query_btn" size="small" type="primary" @click="searchTime">查看</el-button>
        </div>
      </div>
    </div>
    <!--表格-->
    <p class="up_title font16 font_black bold">当班记录</p>
    <div class="table_box radius module_bg border">
      <div>
        <div class="cashier_name">
          <div class="bold" v-for="cashier in cashiers" @click="changeCashier(cashier.id)"
               :class="activeId == cashier.id?'actives':''">
            <span>{{cashier.name}}</span>
          </div>
        </div>
        <!--<button @click="goLift">左</button>-->
        <!--<button @click="goRight">右</button>-->
        <div class="table_up_title">
          <p class="bold font_black">合计收款<span class="staff_text font_gray">￥{{collectionSum}}</span></p>
          <p class="bold font_black">合计返利<span class="staff_text font_gray">￥{{rebateSum}}</span></p>
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tHead="theTable.tHead" :tBody="theTable.tBody"
                        v-on:paginationAxios="myPagination"></synthesize-table>
    </div>
  </div>
</template>
<script>
  import '../assets/css/time.css';
  import {mapActions} from 'vuex'

  export default {
    name: 'cashierStatistics',
    data() {
      return {
        // 控制日期到今天之前
        getToDay: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        title_name: '收银统计查询',
        chk_date: '选择时间',
        valueTime: [],
        cashiers: [
          // {
          //   id: 1,
          //   name: '小美美'
          // }
        ],
        activeId: 1,
        collectionSum: 0,
        rebateSum: 0,
        // tempTable: [],
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
            {text: '收银员'},
            {text: '交接时间'},
            {text: '收款金额'},
            {text: '收款笔数'},
            {text: '返利金额'},
            {text: '返利笔数'}
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: '小美美',
            //   col02: '2018.01.01/23:00-2018.01.02/24:00',
            //   col03: '1234.56',
            //   col04: '123',
            //   col05: '243.56',
            //   col06: '125',
            //   btn: [
            //     {
            //       text: '查看详情',
            //       code: 0
            //     }
            //   ]
            // }
          ]
        }
      }
    },
    created() {
      //获取收银员列表
      this.getstaffqueryClerks(JSON.parse(localStorage.getItem('getUserInfo')).shopId)
        .then(res => {
          // console.log(res, 'reseeeeeeeee')
          this.cashiers = []
          if (res.data.success = true) {
            if (res.data.data.length > 0) {
              this.activeId = res.data.data[0].workerId
              res.data.data.forEach(item => {
                if (!item.workerName) {
                  item.workerName = '暂无数据'
                }
                this.cashiers.push({
                  id: item.workerId,
                  name: item.workerName
                })
              })
              //获取收银列表
              this.getDutyList('', '', 1, 10)
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
    methods: {
      ...mapActions([
        'getfinancialloadOnDutyTotal',
        'getfinancialqueryOnDutyList',
        'getstaffqueryClerks'
      ]),

//      点击查看
      searchTime() {
        if (this.valueTime.length < 2) {
          this.valueTime = []
          this.valueTime.push('')
          this.valueTime.push('')
        }
        this.getDutyList(this.valueTime[0], this.valueTime[1], 1, this.theTable.pages.counts)
      },
//      获取列表
      getDutyList(startDate, endDate, page, limit) {
        if (startDate != '' && endDate != '') {
          startDate = this.$getData(startDate) + ' 00:00:00'
          endDate = this.$getData(endDate) + ' 23:59:59'
        }
        let beOnDuty = {
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          startDate: startDate,
          endDate: endDate,
          appDate: "",
          clerkId: this.activeId
        }
        // console.log(beOnDuty, 'beOnDuty')
        //获取表头处收银统计数据
        this.getfinancialloadOnDutyTotal(beOnDuty)
          .then(res => {
            // console.log(res, 'ressss')
            if (res.data.success == true) {
              this.collectionSum = res.data.data.receiveTotal
              this.rebateSum = res.data.data.rebateTotal
            } else {
              console.log(res)
              this.$message({
                type: 'info',
                message: res.data.msg,
                center: true
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '出错啦！请检查网络后重试！',
              center: true
            })
          })

        //获取收银数据列表
        let params = {
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          clerkId: this.activeId,
          page: page,
          limit: limit,
        }
        // let params={
        //   shopId: '219511108925661184',
        //   clerkId: '14',
        //   page: page,
        //   limit: limit,
        // }
        // console.log(params,'params')
        this.getfinancialqueryOnDutyList(params)
          .then(res => {
            // console.log(res, 'resrrrrr')
            this.theTable.tBody = []
            if (res.data.success == true) {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => {
                  let date = item.startTime + '-' + item.endTime
                  if (!item.clerkName) {
                    item.clerkName = '暂无数据'
                  }
                  if (!item.startTime || !item.endTime) {
                    date = '暂无数据'
                  }
                  if (!item.receiveMoney) {
                    item.receiveMoney = '暂无数据'
                  } else {
                    item.receiveMoney = '￥' + item.receiveMoney
                  }
                  if (!item.receiveNum) {
                    item.receiveNum = '暂无数据'
                  }
                  if (!item.rebateMoney) {
                    item.rebateMoney = '暂无数据'
                  } else {
                    item.rebateMoney = '￥' + item.rebateMoney
                  }
                  if (!item.rebateNum) {
                    item.rebateNum = '暂无数据'
                  }
                  this.theTable.tBody.push({
                    id: item.onDutyId,
                    col01: item.clerkName,
                    col02: date,
                    col03: item.receiveMoney,
                    col04: item.receiveNum,
                    col05: item.rebateMoney,
                    col06: item.rebateNum,
                    btn: [
                      {
                        text: '查看详情',
                        code: 0
                      }
                    ]
                  })
                })
                this.theTable.pages.total = res.data.total
                this.theTable.pages.pageState = page
                this.theTable.pages.counts = limit
                this.theTable.pages.initPage = Math.ceil((res.data.total / limit) / 2)
                this.theTable.pages.totalPage = Math.ceil(res.data.total / limit)
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
//      table切换
      changeCashier(id) {
        this.activeId = id;
        if (this.valueTime.length < 2) {
          this.valueTime = []
          this.valueTime.push('')
          this.valueTime.push('')
        }
        this.getDutyList(this.valueTime[0], this.valueTime[1], this.theTable.pages.pageState, this.theTable.pages.counts)
      },
      //  分页跳转
      myPagination(page, limit) {
        if (this.valueTime.length < 2) {
          this.valueTime = []
          this.valueTime.push('')
          this.valueTime.push('')
        }
        this.getDutyList(this.valueTime[0], this.valueTime[1], page, limit)
      },
      // goLift(){
      //   let obj= document.getElementsByClassName('cashier_name')[0]
      //   // if (obj.deltaY)
      //   obj.scrollLift-=50
      // },
      // goRight(){
      //   let obj= document.getElementsByClassName('cashier_name')[0]
      //   // if (obj.deltaY)
      //   obj.scrollLift+=50
      // }
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
  #cashier_statistics {
    margin: .24rem .2rem;
  }

  .content_box {
    background-image: url(../../static/images/bg@2x-6.png);
    background-repeat: no-repeat;
    background-size: cover;
    color: #ffffff;
    padding: .44rem .6rem;
    overflow: hidden;
  }

  p {
    margin: 0;
  }

  .date_box {
    display: flex;
    align-items: flex-end;
  }

  .b_title {
    margin-bottom: .29rem;
    font-size: 0.18rem;
    font-weight: bold;
  }

  .sam_title {
    margin-bottom: .11rem;
    display: block;
    font-size: .14rem;
    font-weight: bold;
  }

  .date_box1 + .date_box1 {
    margin-left: .2rem;
  }

  /*.my_date {*/
  /*width: 2.6rem;*/
  /*height: .4rem;*/
  /*border-radius: .04rem;*/
  /*}*/

  .my_date .el-range-editor .el-input__inner {
    padding: .03rem .1rem;
    align-items: center;
  }

  .el-input {
    font-size: 0.14rem;
  }

  /*表格组件包框*/
  .table_box {
    margin-top: 0.1rem;
    padding: 0 0.2rem;
  }

  .table_box > div:nth-of-type(1) {
    /*padding-top: 0.2rem;*/
    /*display: flex;*/
    /*flex-flow: row;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/

    height: .53rem;
    min-height: 41px;
    /* border-top: 1px red solid; */
    overflow: hidden
  }

  .staff_text {
    margin-left: 0.18rem;
  }

  .up_title {
    padding-left: .06rem;
    border-left: 4px #4471FE solid;
    margin-top: .24rem;
    margin-bottom: .13rem;
  }

  .table_up_title {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-top: .16rem;
    padding-bottom: .15rem;
    float: right;
  }

  .table_up_title p {
    margin-left: 1.01rem;
  }

  .cashier_name > div {
    border: 1px #fff solid;
    border-bottom: 2px #fff solid;
    color: #767676;
    cursor: pointer;
    /*display: inline-block;*/
    transition: all 300ms linear;
    min-width: max-content;
    min-height: max-content;
    padding-top: .16rem;
    padding-bottom: .15rem;
  }

  .cashier_name {
    max-width: 74%;
    overflow-x: scroll;
    display: flex;
    flex-flow: row;
    justify-items: center;
    float: left;
  }

  .cashier_name span {
    margin: 0 .22rem;
  }

  .actives {
    border-bottom: 2px #4471FE solid !important;
    color: #000 !important;
    transition: all 300ms linear;
  }

  .el-range-editor--small .el-range-separator {
    line-height: .28rem;
    font-size: .13rem;
  }

  #cashier_statistics::-webkit-scrollbar { /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #cashier_statistics::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #cashier_statistics::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
