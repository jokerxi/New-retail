<template>
  <div id="employeeManagement">
    <!-- 奖金池记录查询 -->
    <div class="employee_content radius">
      <div class="my_content">
        <p class="employee_title">{{employee_title}}</p>
        <div class="date_box">
          <div class="date_box1">
            <p class="sam_title">{{chk_date}}</p>
            <el-date-picker
              class="my_date"
              size='small'
              v-model="selectDate"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="getToDay"
              clear-icon=''>
            </el-date-picker>
          </div>
          <div class="date_box1">
            <p class="sam_title">{{employee_type}}</p>
            <el-select class="select_list" size="small" v-model="rewardType" placeholder="请选择">
              <el-option v-for="item in payOptions" :key="item.value" :label="item.label"
                         :value="item.state"></el-option>
            </el-select>
          </div>
          <div class="date_box1">
            <el-button class="query_btn" size="small" type="primary"
                       @click="mySearch( theTable.pages.counts)">查看
            </el-button>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="right1">
          <img src="../../static/images/奖金池icon@2x.png" alt="">
        </div>
        <div class="">
          <p class="money_title">{{money_content}}</p>
          <p class="money">￥<span>{{money}}</span></p>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">奖金池记录<span class="staff_text font12 font_gray">共<span
          class="font_black">{{theTable.pages.total}}</span>条</span></p>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tBody="theTable.tBody" :tHead="theTable.tHead"
                        v-on:paginationAxios="myPagination"/>
    </div>
  </div>
</template>
<script>

  import '../assets/css/time.css';
  import {mapActions} from 'vuex'

  export default {
    name: 'employeeManagement',
    data() {
      return {
        employee_title: '奖金池记录查询',
        chk_date: '选择时间',
        employee_type: '类型',
        money_content: '当前奖金池',
        money: 0,
        selectDate: [],
        // 控制日期到今天之前
        getToDay: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        payOptions: [
          {
            state: 0,
            label: '全部'
          },
          {
            state: 1,
            label: '奖金池入账'
          },
          {
            state: 2,
            label: '高消费返利'
          },
          {
            state: 3,
            label: '周末返利'
          },
          {
            state: 4,
            label: '精准营销返利'
          },
          {
            state: 5,
            label: '固定返利'
          },
          {
            state: 6,
            label: '返利退回'
          },
        ],
        rewardType: '',
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
            {text: '用户昵称'},
            {text: '时间'},
            {text: '金额'},
            {text: '类型'}
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: '小美美嘻嘻',
            //   col02: '2018.01.01/20:00',
            //   col03: '123.45',
            //   col04: '支护宝'
            // },
          ]
        }
      }
    },
    created() {
      this.getCashPoolList(1, 10, '', '', 0)
    },
    mounted() {
      $('.el-icon-arrow-up').attr('class', 'iconfont icon-tuichuxialasanjiao2');
      $('.el-icon-search').attr('class', 'iconfont icon-sousuoicon')
    },
    methods: {
      ...mapActions([
        'getfinancialcashPoolList'
      ]),
      //获取奖金池列表
      getCashPoolList(page, limit, startDate, endDate, type) {
        if (startDate != '' && endDate != '') {
          startDate = this.$getData(startDate) + ' 00:00:00'
          endDate = this.$getData(endDate) + ' 23:59:59'
        }
        let bonusPools = {
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          startDate: startDate,
          endDate: endDate,
          type: type,
          page: page,
          limit: limit
        }
        // console.log(bonusPools, 'bonusPools')
        this.getfinancialcashPoolList(bonusPools)
          .then(res => {
            // console.log(res, 'resresres')
            this.theTable.tBody = []
            if (res.data.success == true) {
              if (res.data.data.dataList.length > 0) {
                this.money = res.data.data.totalCash
                res.data.data.dataList.forEach(item => {
                  if (!item.nickName) {
                    item.nickName = '暂无数据'
                  }
                  if (!item.date) {
                    item.date = '暂无数据'
                  }
                  if (!item.money) {
                    item.money = '暂无数据'
                  } else {
                    item.money = '￥' + item.money
                  }
                  if (!item.typeName) {
                    item.typeName = '暂无数据'
                  }
                  this.theTable.tBody.push({
                    col01: item.nickName,
                    col02: item.date,
                    col03: item.money,
                    col04: item.typeName
                  })
                })
                this.theTable.pages.total = res.data.data.countNum
                this.theTable.pages.pageState = page
                this.theTable.pages.counts = limit
                this.theTable.pages.initPage = Math.ceil((res.data.data.countNum / limit) / 2)
                this.theTable.pages.totalPage = Math.ceil(res.data.data.countNum / limit)
              } else {
                this.$message({
                  type: 'info',
                  message: '暂时还没有数据哦！',
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
        // console.log(this.selectDate[0], 'value1', this.selectDate[1], 'value2', this.rewardType, 'rewardType')
        if (this.selectDate.length < 2) {
          this.selectDate.push('')
          this.selectDate.push('')
        }
        this.getCashPoolList(1, limit, this.selectDate[0], this.selectDate[1], this.rewardType)
      },
      //  分页跳转
      myPagination(page, limit) {
        if (this.selectDate.length < 2) {
          this.selectDate.push('')
          this.selectDate.push('')
        }
        // console.log(limit,'limit')
        this.getCashPoolList(page, limit, this.selectDate[0], this.selectDate[1], this.rewardType)
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
  #employeeManagement {
    margin: .24rem .2rem;
  }

  .employee_content {
    background-image: url(../../static/images/bg@2x-6.png);
    background-size: cover;
    background-repeat: no-repeat;
    padding: .44rem 1.2rem .44rem .6rem;
    color: #ffffff;
    z-index: -1;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }

  .employee_title {
    margin: 0;
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

  .date_box1 > p {
    font-size: 0.14rem;
    font-weight: bold;
  }

  .date_box {
    display: flex;
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

  /*right*/
  .content_right {
    display: flex;
    align-items: center;
    position: relative;
  }

  .content_right .right1:before {
    content: '';
    position: absolute;
    top: .36rem;
    left: .75rem;
    height: .5rem;
    border-right: 1px #ffffff solid;
  }

  .right1 {
    padding-right: .4rem;
    width: .48rem;
    height: .48rem;
  }

  .right1 > i {
    font-size: .5rem;
    color: #FFB50D;
  }

  .money_title {
    font-size: 0.16rem;
    margin-left: 4px;
  }

  .money {
    font-size: .3rem;
    font-weight: bold;
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


  .block {
    display: flex;
    margin-top: .1rem;
  }

  .block > .dateTime {
    line-height: 2.4;
    margin-right: .1rem;
  }

  .block > .el-range__icon {
    color: #4471FE;
  }

  .block > .el-range__close-icon:before {
    content: '';
    position: absolute;
    top: 11px;
    background: url(../../static/images/icons/downicon@2x.png) no-repeat;
    background-size: 100%;
    width: .1rem;
    height: .1rem;
  }

  .block > .el-range-editor--mini.el-input__inner {
    width: 2.9rem;
    margin-right: .2rem;
  }

</style>
