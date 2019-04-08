<template>
  <div>
    <div class="backImg">
      <div class="shopTitle"><span>店铺管理</span></div>
      <div class="searchBox">
        <div class="demo-input-suffix" style="width:3.8rem">
          <el-input
            placeholder="请输入店铺名称/店长/电话查询"
            prefix-icon="el-icon-search" v-model="inputMsg">
          </el-input>
        </div>
        <el-button type="primary searchBtn" @click="mySearch1()">查&nbsp&nbsp询</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">区域经理列表<span class="staff_text font12 font_gray">共查询到<span
          class="font_black">{{staffNum}}</span>条</span></p>
        <div class="add_btn font12 font_white radius">
          <div><img src="../../static/images/icons/employeeInquiriesAdd.png" alt=""></div>
          新建区域经理
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tableData="theTable.data"></synthesize-table>
    </div>

  </div>
</template>

<script>

  export default {
    name: "area-manager",
    data() {
      return {
        // 每页展示条数的默认数据
        counts: 6,
        // 当前在第几页
        pageState: 1,
        inputMsg: '',
        tableData: [
          {
            num: 1,
            name: '沃尔玛',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 2,
            name: '家乐福',
            telNum: '13708718279',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 3,
            name: '沃尔玛',
            telNum: '18864899898',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 4,
            name: '沃尔玛',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 5,
            name: '沃尔玛',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 6,
            name: '沃尔玛',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 7,
            name: '沃尔玛',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 8,
            name: '肯德基',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 9,
            name: '家乐福副',
            telNum: '11000156987',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 10,
            name: '沃尔玛',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 11,
            name: '中国',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }, {
            num: 12,
            name: '大河马',
            telNum: '13345811137',
            money1: '99',
            money2: '199',
            counter: '110',
            test: '980',
          }
        ],
        tableData2: [],
        staffNum: '',
        theTable: {
          pages: {
            counts: 10,
            total: 1001,
            totalPage: '',
            // 当前在第几页
            pageState: 1,
            goPage: '',
            initPage: '',
          },
          //表格数据
          data: {
            theNo: 'true',
            tHead: [
              '序号',
              '姓名',
              '电话',
              '管理店铺数'
            ],
            tBody: [
              {
                id: 1,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 2,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 3,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 4,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 5,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 6,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 7,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 8,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 9,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              },
              {
                id: 10,
                col01: '小美美',
                col02: '12345678901',
                col03: '123',
                btn: [
                  {
                    text: '删除',
                    code: 1
                  },
                  {
                    text: '编辑',
                    code: 2
                  }
                ]
              }
            ]
          }
        }

      }
    },
    created() {
      var x = (this.tableData.length) % (this.counts)
      this.tableData2 = []
      if (this.tableData.length >= this.counts) {

        //如果数据总条数大于等于每页展示条数，那么当前页展示每页限制的条数

        if (this.pageState == 1) {
          for (var i = 0; i < this.counts; i++) {
            this.tableData2.push(this.tableData[i])
          }
        } else {
          if (x == 0) {
            for (var i = (this.pageState - 1) * this.counts; i < this.pageState * this.counts; i++) {
              this.tableData2.push(this.tableData[i])
            }
          } else {
            if (this.pageState * this.counts <= (this.tableData.length - x)) {
              for (var i = (this.pageState - 1) * this.counts; i < this.pageState * this.counts; i++) {
                this.tableData2.push(this.tableData[i])
              }
            } else {
              for (var i = (this.pageState - 1) * this.counts; i < (this.pageState - 1) * this.counts + x; i++) {
                this.tableData2.push(this.tableData[i])
              }
            }

          }

        }
      } else if (this.tableData.length < this.counts) {
        //如果数据总条数小于每页展示条数，那么当前页就直接展示所有数据
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData2.push(this.tableData[i])
        }
      }
      this.staffNum = this.theTable.data.tBody.length
    },
    methods: {
      handleSizeChange(val) {
        this.counts = val
        var x = (this.tableData.length) % (this.counts)
        console.log(`每页 ${val} 条`, this.tableData.length, x);
        this.tableData2 = []
        if (this.tableData.length >= this.counts) {

          //如果数据总条数大于等于每页展示条数，那么当前页展示每页限制的条数

          if (this.pageState == 1) {
            for (var i = 0; i < this.counts; i++) {
              this.tableData2.push(this.tableData[i])
            }
          } else {
            if (x == 0) {
              for (var i = (this.pageState - 1) * this.counts; i < this.pageState * this.counts; i++) {
                this.tableData2.push(this.tableData[i])
              }
            } else {
              if (this.pageState * this.counts <= (this.tableData.length - x)) {
                for (var i = (this.pageState - 1) * this.counts; i < this.pageState * this.counts; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              } else {
                for (var i = (this.pageState - 1) * this.counts; i < (this.pageState - 1) * this.counts + x; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              }

            }

          }
        } else if (this.tableData.length < this.counts) {
          //如果数据总条数小于每页展示条数，那么当前页就直接展示所有数据
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData2.push(this.tableData[i])
          }
        }


      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`, this.tableData.length);
        this.pageState = val
        var x = (this.tableData.length) % (this.counts)
        this.tableData2 = []
        if (this.tableData.length >= this.counts) {

          //如果数据总条数大于等于每页展示条数，那么当前页展示每页限制的条数

          if (this.pageState == 1) {
            for (var i = 0; i < this.counts; i++) {
              this.tableData2.push(this.tableData[i])
            }
          } else {
            if (x == 0) {
              for (var i = (this.pageState - 1) * this.counts; i < this.pageState * this.counts; i++) {
                this.tableData2.push(this.tableData[i])
              }
            } else {
              if (this.pageState * this.counts <= (this.tableData.length - x)) {
                for (var i = (this.pageState - 1) * this.counts; i < this.pageState * this.counts; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              } else {
                for (var i = (this.pageState - 1) * this.counts; i < (this.pageState - 1) * this.counts + x; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              }

            }

          }
        } else if (this.tableData.length < this.counts) {
          //如果数据总条数小于每页展示条数，那么当前页就直接展示所有数据
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData2.push(this.tableData[i])
          }
        }
      },
      mySearch1() {
        console.log('查询开始')
        this.tableData2 = []
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name.search(this.inputMsg) != -1 || this.tableData[i].telNum.search(this.inputMsg) != -1) {
            this.tableData2.push(this.tableData[i])
          }
        }
        console.log(this.tableData2)

      }
    },
    watch: {
      inputMsg() {
        console.log('及时查询')
        this.tableData2 = []
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name.search(this.inputMsg) != -1 || this.tableData[i].telNum.search(this.inputMsg) != -1) {
            this.tableData2.push(this.tableData[i])
          }
        }
        console.log(this.tableData2)
      }

    },
    components: {}
  }
</script>

<style scoped>
  .searchBox {
    /*border:1px solid blue;*/
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 0.59rem;
  }

  .backImg {
    /*border:1px solid blue;*/
    background-image: url("./../../static/images/backimg.png");
    background-size: cover;
  }

  .shopTitle {
    /*border:1px solid red;*/
    padding-top: 0.42rem;
    padding-bottom: 0.16rem;
    padding-left: 1.21rem;
    text-align: left;
    color: white;
  }

  .searchBox > div:first-child {
    margin-left: 1.21rem;
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

