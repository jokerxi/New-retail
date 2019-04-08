<template>
  <div id="employeeInquiries">
    <!-- 员工查询 -->
    <div class="inquiries_content radius">
      <div class="content_box">
        <p>{{title_name}}</p>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input size="small" placeholder="请输入姓名关键字或完整手机号进行搜索" prefix-icon="el-icon-search" v-model="searchShop">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button class="query_btn" size="mini" type="primary"
                         @click="mySearch(theTable.pages.counts)">查询
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">员工列表<span class="staff_text font12 font_gray">员工数<span
          class="font_black">{{theTable.pages.total}}</span>位</span></p>
        <div class="add_btn font12 font_white radius" @click="dialogFormVisible = true">
          <i class="iconfont icon-tianjiaicon-"></i>
          添加员工
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tBody="theTable.tBody" :tHead="theTable.tHead"
                        v-on:deleteAxios="myDelete" v-on:redactAxios="myRedact" v-on:paginationAxios="myPagination">
        <!-- <synthesize-table :tablePages="theTable.pages" :tBody="theTable.tBody" :tHead="theTable.tHead" v-on:deleteAxios="myDelete" v-on:redactAxios="myRedact"> -->
      </synthesize-table>
      <!--<dataAnomaly/>-->
    </div>
    <!-- 模态框 -->
    <el-dialog top='30vh' id='motai' width='330px' title="新增员工" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="*姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*电话">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*职务">
          <img class="downImg" src="../../static/images/icons/downicon@2x.png">
          <el-select v-model="form.value" placeholder="请选择职务">
            <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStaff" :disabled="form.confirmAdd=='保存中...'?true:false">
          {{form.confirmAdd}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // jshint esversion: 6
  import '../assets/css/time.css';
  import {mapActions} from 'vuex'

  export default {
    name: 'employeeInquiries',
    data() {
      return {
        searchShop: '',
        title_name: '员工查询',
        restaurants: [],
        timeout: null,
        dialogFormVisible: false,
        form: {
          confirmAdd: '确定保存',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          options: [
            {
              value: '5',
              label: '店员'
            },
            {
              value: '4',
              label: '财务'
            }
          ],
          value: ''
        },
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
              text: '职务'
            }
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: '小美美啊',
            //   col02: '12345678901',
            //   col03: 'CEO',
            //   btn: [
            //     {
            //       text: '删除',
            //       code: 1
            //     },
            //     {
            //       text: '编辑',
            //       code: 2
            //     }
            //   ]
            // },
          ]
        }
      };
    },

    created() {
      this.theStaffList(1, 10, '')
    },
    mounted() {
      $('.el-icon-search').attr('class', 'iconfont icon-sousuoicon');
    },
    methods: {
      ...mapActions([
        'getStaffSave',
        'getStaffRemove',
        'getStaffList'
      ]),
      //增加员工
      addStaff() {
        // console.log(this.form.tel, 'this.myShuttle.shuttleTel', this.form.name, 'this.myShuttle.shuttleTel')
        var reg = 11 && /^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/;
        if (!reg.test(this.form.tel) || this.form.name == '') {
          this.$message({
            type: 'warning',
            message: '请输入正确姓名和手机号！',
            center: true,
            showClose: true
          })
          this.form.name = ''
          this.form.tel = ''
        } else if (this.form.value == '') {
          this.$message({
            type: 'warning',
            message: '请选择职位！',
            center: true,
            showClose: true
          })
        } else {
          this.form.confirmAdd = '保存中...'
          let savedata = {
            realName: this.form.name,
            telePhone: this.form.tel,
            shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
            role: this.form.value
          }
          this.getStaffSave(savedata)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                })
                this.theStaffList(1, this.theTable.pages.counts, '')
                this.dialogFormVisible = false
                this.form.confirmAdd = '确定保存'
                this.form.name = ''
                this.form.tel = ''
                this.form.value = ''
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                })
                this.form.confirmAdd = '确定保存'
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
              this.form.confirmAdd = '确定保存'
            })
        }
      },
      //  删除员工
      myDelete(id) {
        let params = {
          roleId: '',
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          staffId: id
        }
        this.theTable.tBody.forEach(item => {
          if (item.id == id) {
            params.roleId = item.roleId
          }
        })
        // console.log(params,'params')
        this.getStaffRemove(params)
          .then(res => {
            // console.log(res);
            if (res.data.success == true) {
              this.$message({
                type: 'success',
                message: res.data.msg,
                center: true,
                showClose: true
              })
              this.theStaffList(1, this.theTable.pages.counts, this.searchShop)
            } else {
              console.log(res)
              this.$message({
                type: 'info',
                message: res.data.msg,
                center: true,
                showClose: true
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'warning',
              message: '出错啦！请检查网络后重试！',
              center: true,
              showClose: true
            })
          })
      },
      //重新获取表格
      myRedact() {
        this.theStaffList(1, this.theTable.pages.counts, this.searchShop)
      },
      //  获取列表
      theStaffList(page, limit, queryWord) {
        this.theTable.tBody = []
        let staffListAction = {
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          queryWord: queryWord,
          page: page,
          limit: limit
        }
        // console.log(staffListAction,'staffListAction')
        // let newArr = []
        this.getStaffList(staffListAction)
          .then(res => {
            // console.log(res, 'xxxx')
            if (res.data.data) {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => {
                  if (!item.roleId) {
                    item.roleId = '暂无数据'
                  }
                  if (!item.realName) {
                    item.realName = '暂无数据'
                  }
                  if (!item.telePhone) {
                    item.telePhone = '暂无数据'
                  }
                  if (!item.roleName) {
                    item.roleName = '暂无数据'
                  }
                  this.theTable.tBody.push({
                    id: item.loginId,
                    roleId: item.roleId,
                    col01: item.realName,
                    col02: item.telePhone,
                    col03: item.roleName,
                    btn: [
                      {
                        disabled: false,
                        text: '删除',
                        code: 1
                      },
                      {
                        disabled: false,
                        text: '编辑',
                        code: 2
                      }
                    ]
                  })
                })
                this.theTable.tBody.forEach((t) => {
                  if (t.roleId == '3') {
                    t.btn[0].disabled = true
                    t.btn[1].disabled = true
                  }
                })
                // console.log(this.theTable.tBody, 'this.theTable.tBody')
                this.theTable.pages.total = res.data.total
                this.theTable.pages.pageState = page
                this.theTable.pages.counts = limit
                this.theTable.pages.initPage = Math.ceil((res.data.total / limit) / 2)
                this.theTable.pages.totalPage = Math.ceil(res.data.total / limit)
              } else {
                this.$message({
                  type: 'info',
                  message: '暂时没有数据哦',
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
            // this.theTable.tBody = newArr
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
      //  分页跳转
      myPagination(page, limit) {
        this.theStaffList(page, limit, this.searchShop)
      },
      //  搜索
      mySearch(limit) {
        this.theStaffList(1, limit, this.searchShop)
      }
    }
  };

</script>
<style lang='scss'>
  .module_bg {
    position: relative;
  }

  .popper__arrow {
    z-index: -1;
  }

  .el-scrollbar {
    border-radius: 4px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  }

  .el-autocomplete-suggestion li.highlighted,
  .el-autocomplete-suggestion li:hover {
    background-color: #4471FE;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 3px;
  }

  .v-modal {
    opacity: .2;
  }

  #employeeInquiries {
    padding: .2rem;

    .inquiries_content {
      background-image: url('../../static/images/bg@2x-5.png');
      background-size: cover;
      background-repeat: no-repeat;
      padding: .61rem 1rem .61rem .6rem;
      color: #ffffff;
      z-index: -1;
      overflow: hidden;
    }

    .content_box > p {
      font-size: 0.18rem;
      font-weight: bold;
      line-height: 0.34rem;
      margin: 0;
      margin-bottom: .2rem;
    }

    /*表格组件包框*/
    .table_box {
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      position: relative;
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
      width: 90px;
      height: 30px;
      background: #4471FE;
      line-height: 2.5;
      text-align: center;
      cursor: pointer
    }

    .icon-tianjiaicon- {
      font-size: 12px;
    }

    .add_btn > div {
      width: 0.11rem;
      margin-right: .03rem;
    }

    #motai {
      .el-dialog__header .el-dialog__title {
        font-size: .14rem;
        font-weight: 800;
      }

      .downImg {
        font-size: 2px;
        position: absolute;
        left: 113px;
        top: 18px;
        color: #4471FE;
        width: 8px;
        z-index: 1;
      }

      .el-dialog {
        border-radius: 4px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.14);
      }

      .el-form-item__content {
        display: flex;
      }

      .el-form-item {
        margin: 0;
      }

      .el-form-item__label {
        font-size: 14px;
        margin-left: 60px;
        color: #000;
      }

      .el-dialog__header {
        border-bottom: 1px #E7EEEF solid;
        margin-bottom: 14px;
      }

      .el-dialog__footer {
        text-align: center;
      }

      .el-dialog__body {
        padding: 0;

      }

      .el-button--primary {
        font-size: .2rem;
        line-height: .5;
        height: 40px;
        margin: 17px 0;
        background: #4471FE;
      }

      .el-input {
        width: 134px;

        .el-input__inner {
          height: 30px;
          color: #000;
        }
      }

      .el-select .el-input .el-select__caret {
        font-size: 0;
      }

      .el-input--suffix .el-input__inner {
        border: 1px #E7EEEF solid;
      }
    }
  }

</style>
