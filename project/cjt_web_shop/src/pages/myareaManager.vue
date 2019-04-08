<!--区域经理-->
<template>
  <div>
    <!--<index-nav></index-nav>-->
    <div class="backImg">
      <div class="shopTitle"><span>账号管理</span></div>
      <div class="searchBox">
        <div class="demo-input-suffix" style="width:3.8rem">
          <el-input
            placeholder="请输入姓名关键字或完整手机号查询"
            prefix-icon="el-icon-search" v-model="searchShop">
          </el-input>
        </div>
        <el-button type="primary searchBtn" @click="toSearch(theTable.pages.counts)">
          查&nbsp&nbsp询
        </el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">区域经理列表<span class="staff_text font12 font_gray">共查询到<span
          class="font_black">{{theTable.pages.total}}</span>条</span></p>
        <div class="add_btn font12 font_white radius" @click="addManager">
          <div><img src="../../static/images/icons/employeeInquiriesAdd.png" alt=""></div>
          新建区域经理
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tBody="theTable.tBody" :tHead="theTable.tHead"
                        v-on:deleteAxios="myDelete" v-on:redactAxios="myRedact"
                        v-on:paginationAxios="myPagination"></synthesize-table>
    </div>
    <shuttle-box :myShuttle="theShuttle" v-on:closeShuttle="closeShuttle" v-if="showShuttle"
                 v-on:redactAxios="myRedact"></shuttle-box>
  </div>
</template>
<script>
  import ShuttleBox from '../components/shuttleBox'
  import {mapActions} from 'vuex'

  export default {
    name: "myarea-manager",
    components: {ShuttleBox},
    data() {
      return {
        searchShop: '',
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
            {
              text: '序号'
            },
            {
              text: '姓名'
            },
            {
              text: '电话'
            },
            {
              text: '管理店铺数'
            }
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: '小美美',
            //   col02: '12345678901',
            //   col03: '123',
            //   btn: [
            //     {
            //       text: '删除',
            //       code: 1
            //     },
            //     {
            //       text: '编辑',
            //       code: 3
            //     }
            //   ]
            // }
          ]
        },
        //穿梭框组件数据
        showShuttle: false,
        theShuttle: {
          openCode: 0,
          shuttleBefore: [
            // {
            //   id: 1,
            //   show: true,
            //   showChange: true,
            //   name: '',
            //   shopName: '嘻嘻超市'
            // },
          ],
          shuttleAfter: []
        }
      }
    },
    created() {
      //获取列表请求
      this.getManagerList(1, 10, '')

    },
    mounted() {
      //获取店铺信息
      let params = {
        chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
        queryWord: ''
      }
      this.getshoplistByChain(params)
        .then(res => {
          // console.log(res, 'reses')
          if (res.data.success == true) {
            if (res.data.data.length > 0) {
              res.data.data.forEach(item => {
                //对接穿梭框
                this.theShuttle.shuttleBefore.push({
                  id: item.id,
                  show: true,
                  showChange: true,
                  name: '',
                  shopName: item.shopName
                })
              })
            } else {
              newArr = res.data.data
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
            });
          }
          //存入店铺
          localStorage.setItem('shopList', JSON.stringify(this.theShuttle.shuttleBefore))
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '出错啦！请检查网络后重试！',
            center: true,
            showClose: true
          })
        })
    },
    computed: {
      areaManagerList() {
        return this.$store.state.staff.StaffareaManagerList
      }
    },
    methods: {
      ...mapActions([
        'getstaffdeleteAreaManager',
        'getStaffareaManagerList',
        'getshoplistByChain',
        'getshopupdateName'
      ]),
      //  表格请求事件
      myDelete(id) {
        // console.log(this.theTable.tBody)
        for (let i = 0; i < this.theTable.tBody.length; i++) {
          // if (this.theTable.tBody.id == id) {
          let deleteAreaManager = {
            chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
            staffId: id
          }
          // console.log(deleteAreaManager, 'deleteAreaManager')
          this.getstaffdeleteAreaManager(deleteAreaManager)
            .then(res => {
              // console.log(res, 'shanchu')
              if (res.data.success == true) {
                this.$message({
                  type: 'success',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                });
                //获取列表请求
                this.getManagerList('1', '10')
              } else {
                console.log(res)
                this.$message({
                  type: 'warning',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                });
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: '出错啦！请检查网络后重试！',
                center: true,
                showClose: true
              })
            })
        }
        // }
      },
      //重载列表
      myRedact() {
        //获取列表请求
        this.getManagerList(this.theTable.pages.pageState, this.theTable.pages.counts, this.searchShop)
      },
      //请求列表
      getManagerList(page, limit, queryWord) {
        let managerList = {
          chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
          queryWord: queryWord,
          page: page,
          limit: limit
        }
        // console.log(managerList, 'managerList')
        this.getStaffareaManagerList(managerList)
          .then(res => {
            // console.log(res, 'xx2xx')
            let tempDate = res.data.data
            let newArr = []
            let temp
            if (res.data.success == true) {
              if (res.data.data.length > 0) {
                tempDate.forEach(item => {
                  if (!item.realName) {
                    item.realName = '暂无数据'
                  }
                  if (!item.telePhone) {
                    item.telePhone = '暂无数据'
                  }
                  if (!item.manageNum) {
                    item.manageNum = '暂无数据'
                  }
                  temp = {
                    id: item.loginId,
                    col01: item.realName,
                    col02: item.telePhone,
                    col03: item.manageNum,
                    btn: [{
                      text: '删除',
                      code: 1
                    },
                      {
                        text: '编辑',
                        code: 3
                      }
                    ]
                  }
                  newArr.push(temp)
                })
                this.theTable.tBody = newArr
                this.theTable.pages.total = res.data.total
                this.theTable.pages.pageState = page
                this.theTable.pages.counts = limit
                this.theTable.pages.initPage = Math.ceil((res.data.total / limit) / 2)
                this.theTable.pages.totalPage = Math.ceil((res.data.total / limit))
              } else {
                newArr = tempDate
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
            console.log(err)
            this.$message({
              type: 'error',
              message: '出错啦！请检查网络后重试！',
              center: true,
              showClose: true
            })
          })
      },
      //穿梭框组件事件
      addManager() {
        this.theShuttle.shuttleBefore = []
        this.theShuttle.shuttleBefore = JSON.parse(localStorage.getItem('shopList'))
        this.showShuttle = true
      },
      //关闭模态框
      closeShuttle() {
        this.theShuttle.shuttleBefore = []
        this.theShuttle.shuttleAfter = []
        this.showShuttle = false
      },
      //  模糊搜索
      toSearch(limit) {
        this.getManagerList(1, limit, this.searchShop)
      },
      //  分页跳转
      myPagination(page, limit) {
        this.getManagerList(page, limit, this.searchShop)
      }
    }
  }
</script>

<style scoped>
  .searchBox {
    /*border:1px solid blue;*/
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 0.71rem;
  }

  .backImg {
    /*border:1px solid blue;*/
    background-image: url("./../../static/images/backimg.png");
    background-size: cover;
  }

  .shopTitle {
    /*border:1px solid red;*/
    padding-top: 0.3rem;
    padding-bottom: 0.16rem;
    padding-left: 1.47rem;
    text-align: left;
    color: white;
  }

  .searchBox > div:first-child {
    margin-left: 1.47rem;
  }

  .searchBtn {
    margin-left: 0.1rem;
  }

  .listCount {
    border-bottom: 1px solid rgba(235, 235, 235, 1);
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 84.5%;
    margin: 0 auto;
    padding-top: 0.27rem;
    color: #333333;
    background-color: white;
  }

  .listCount > div:first-child {
    padding-left: 0.2rem;
  }

  .listCount > div:nth-child(2) {
    padding-left: 0.2rem;
  }

  .listInfo {
    /*border: 1px solid rgba(238, 238, 238, 1);*/
    /*border: 1px solid rgba(238, 0, 0, 1);*/
    background-color: white;
    width: 83.5%;
    min-height: 4.4rem;
    margin: 0 auto;
    padding-left: 0.2rem;
  }

  .searchPage .btn-next {
    /*border: 1px solid red;*/
  }

  .mypagination {
    /*border:1px solid blue;*/
    background-color: white;
    width: 83.5%;
    margin: 0 auto;
    padding-top: 0.4rem;
    padding-bottom: 0.5rem;
    padding-right: 0.2rem;
    text-align: right;
  }

  /*表格组件包框*/
  .table_box {
    max-width: 84.688%;
    margin: -0.5rem 1.47rem 0 1.47rem;
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

  .add_btn {
    line-height: .3rem;
    background: #4471FE;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-left: .14rem;
    padding-right: .14rem;
    cursor: pointer
  }

  .add_btn > div {
    width: 0.11rem;
    margin-right: .03rem;
  }

</style>

