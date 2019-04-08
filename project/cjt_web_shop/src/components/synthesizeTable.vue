<template>
  <div class="main_box module_bg">
    <!--&lt;!&ndash;表头&ndash;&gt;-->
    <!--<div>-->
    <!--<p class="font18 bord font_black"></p>-->
    <!--<p>共查询到<span></span>条/<span></span>页</p>-->
    <!--</div>-->
    <!--表格-->
    <div class="table_box">
      <table border="0">
        <!--表头-->
        <tr class="t_head">
          <th class="font_gray rank_box" v-for="(item,index) in tHead">
            {{item.text}}
            <div class="rank_icon" v-if="item.myIcon?true:false" @click="rankTd(index)"><img :src="item.myIcon.src"
                                                                                             alt=""></div>
          </th>
          <th class="font_gray t_operation" v-if="tBody?(tBody.length>0?(tBody[0].btn?true:false):false):false">操作</th>
        </tr>
        <dataAnomaly :loadException="noData" />
        <!--表身-->
        <tr class="t_body" v-for="(items,index) in tBody">
          <!--序号-->
          <td>{{index+((parseInt(tablePages.pageState)-1)*parseInt(tablePages.counts))+1}}</td>
          <!--其它各列-->
          <td v-if="items.col01?true:false">{{items.col01}}</td>
          <td v-if="items.col02?true:false">{{items.col02}}</td>
          <td v-if="items.col03?true:false">{{items.col03}}</td>
          <td v-if="items.col04?true:false">{{items.col04}}</td>
          <td v-if="items.col05?true:false">{{items.col05}}</td>
          <td v-if="items.col06?true:false">{{items.col06}}</td>
          <td v-if="items.col07?true:false">{{items.col07}}</td>
          <td v-if="items.col08?true:false">{{items.col08}}</td>
          <td v-if="items.col09?true:false">{{items.col09}}</td>
          <td v-if="items.col10?true:false">{{items.col10}}</td>
          <td v-if="items.col11?true:false">{{items.col11}}</td>
          <td v-if="items.col12?true:false">{{items.col12}}</td>
          <td v-if="items.col13?true:false">{{items.col13}}</td>
          <!--操作列表-->
          <td class="operation" v-if="items.btn?true:false">
            <div>
              <button class="radius" v-for="btnItem in items.btn" @click="clickBtn(items.id,btnItem.code)" :disabled="btnItem.disabled" :class="btnItem.disabled==true?'disabledBtn':''">
                {{btnItem.text}}
              </button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!--分页-->
    <div class="paging">
      <!--页码选择按钮-->
      <div>
        <!--// 以下:page-sizes=[3,4,5,99] 代表每页显示条数的切换数值（即每页显示3条或者4条等等）-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=parseInt(tablePages.pageState) :page-size=parseInt(tablePages.counts) :total=parseInt(tablePages.total) :page-sizes="[10, 20, 30,50]" background layout="sizes,prev, pager, next" :page-count="parseInt(8)">
        </el-pagination>
      </div>
      <!--页码输入框-->
      <div class="go_page">
        <input class="radius center" type="number" :placeholder="tablePages.initPage" v-model="tablePages.goPage" @change="pageNum" onkeyup="this.value=this.value.replace(/[^\w]/g,'')">
        <button class="radius font_white" @click="goToPage" :disabled="tablePages.total>0?false:true">跳转</button>
      </div>
    </div>
    <!--编辑模态框-->
    <el-dialog :lock-scroll="1==2?'':false" top='30vh' id='motai' width='330px' title="编辑员工" v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="*姓名">
          <el-input v-model="form.name" autocomplete="off" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="*电话">
          <el-input v-model="form.tel" type="number" autocomplete="off" minlength="11" maxlength="14"></el-input>
        </el-form-item>
        <el-form-item label="*职务">
          <img class="downImg" src="../../static/images/icons/downicon@2x.png">
          <!--<el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请选择职务"></el-autocomplete>-->
          <el-select v-model="form.value" placeholder="请选择职务">
            <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="affirmChange(selectedId)" :disabled="form.confirmAdd=='保存中...'?true:false">
          {{form.confirmAdd}}
        </el-button>
      </div>
    </el-dialog>
    <!--穿梭框-->
    <div ref="myShuttle">
      <shuttle-box :myShuttle="theShuttle" v-on:closeShuttle="closeShuttle" v-if="showShuttle"></shuttle-box>
    </div>
  </div>
</template>
<script>
import ShuttleBox from './shuttleBox'
import { mapActions } from 'vuex'

export default {
  name: 'synthesize-table',
  components: { ShuttleBox },
  props: ['tablePages', 'tHead', 'tBody'],
  data() {
    return {
      //重渲染
      rm: 'a',
      //排序
      noData: false,
      //下拉框
      dialogFormVisible: false,
      labelPosition: 'right',
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
        options: [{
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
      restaurants: [],
      state: '喜洋洋超市',
      timeout: null,
      tOperation: '',
      //分页数据
      // tablePages: {
      //   counts: 10,
      //   total: 0,
      //   totalPage: 0,
      //   // 当前在第几页
      //   pageState: 1,
      //   goPage: '',
      //   initPage: 0,
      // },
      selectedId: '',
      //表格数据
      // tHead: [
      //   {
      //     text: '序号',
      //     myIcon: {
      //       code: 1,
      //       src: '../../static/images/icons/descending.png'
      //     }
      //   }
      // ],
      // tBody: [
      //   {
      //     //店铺列表
      //     id: 1,
      //     col01: '喜羊羊嘻嘻嘻店',
      //     col02: '喜羊羊',
      //     col03: '12345678901',
      //     col04: '1234.45',
      //     col05: 12,
      //     col06: '152.45',
      //     btn: [
      //       // {
      //       //   disabled:false,
      //       //   text: '查看详情',
      //       //   code: 0
      //       // },
      //       {
      //         disabled:false,
      //         text: '删除',
      //         code: 1
      //       },
      //       {
      //         disabled:false,
      //         text: '编辑',
      //         code: 2
      //       }
      //     ]
      //   }
      //  ],

      //穿梭框组件数据
      showShuttle: false,
      theShuttle: {
        id: '',
        openCode: 1,
        shuttleName: '',
        shuttleTel: '',
        shuttleBefore: [
          // {
          //   id: 10,
          //   show: true,
          //   showChange: true,
          //   name: '',
          //   shopName: '嘻嘻超市'
          // }
        ],
        shuttleAfter: [
          // {
          //   id: 1,
          //   show: true,
          //   showChange: true,
          //   name: '',
          //   shopName: '嘻嘻超市'
          // }
        ]
      }
    }
  },
  mounted() {
    // this.restaurants = this.loadAll();
  },
  methods: {
    ...mapActions([
      'getStaffSave',
      'getStaffShowAreaManager'
    ]),
    //排序
    rankTd(index) {
      let tHead = this.tableData.tHead
      for (let i = 0; i < tHead.length; i++) {
        if (i == index) {
          if (tHead[i].myIcon.code == 0) {
            tHead[i].myIcon.code = 1
            tHead[i].myIcon.src = '../../static/images/icons/descending.png'
          } else if (tHead[i].myIcon.code == 1) {
            tHead[i].myIcon.code = 2
            tHead[i].myIcon.src = '../../static/images/icons/ascending.png'
          } else {
            tHead[i].myIcon.code = 0
            tHead[i].myIcon.src = '../../static/images/icons/default.png'
          }
        } else {
          if (tHead[i].myIcon) {
            tHead[i].myIcon.code = 0
            tHead[i].myIcon.src = '../../static/images/icons/default.png'
          }
        }
      }
      this.rankAxios(index)
    },
    // 分页按钮跳转
    handleCurrentChange(page) {
      // console.log(page,'page')
      this.paginationAxios(page, this.tablePages.counts)
    },
    //分页每页显示条数
    handleSizeChange(limit) {
      this.paginationAxios(1, limit)
      this.tablePages.goPage = ''
    },
    //输入框分页跳转
    goToPage() {
      if (this.tablePages.goPage) {
        this.tablePages.pageState = this.tablePages.goPage
      } else {
        this.tablePages.goPage = this.tablePages.initPage
        this.tablePages.pageState = this.tablePages.initPage
      }
      if (this.tablePages.goPage < 1) {

      }
      // console.log(this.tablePages.pageState,'this.tablePages.pageState')
      this.paginationAxios(this.tablePages.goPage, this.tablePages.counts)
    },
    //输入页数判断
    pageNum() {
      // console.log(this.goPage)
      if (this.tablePages.goPage <= 0 || this.tablePages.goPage > Math.ceil(this.tablePages.total / this.tablePages.counts)) {
        if (this.tablePages.goPage <= 0) {
          this.tablePages.goPage = 1
        } else {
          this.tablePages.goPage = this.tablePages.totalPage
          // console.log(this.tablePages.goPage)
        }
      }
    },
    //点击列表按钮
    clickBtn(id, code) {
      //查看详情
      if (code == 0) {
        if (this.$route.query.pageCode == '4_3') {
          //收银员详情跳转
          this.$router.push('/cashierStatisticsChild?pageCode=4_3&id=' + id)
        } else if (this.$route.query.pageCode == '2_1') {
          //活动效果跳转
          this.$router.push('/addRebateTemplates?pageCode=2_1&id=' + id)
        } else {
          //店铺详情跳转
          let shopInfo = JSON.parse(localStorage.getItem('getUserInfo'))
          shopInfo.shopId = id
          shopInfo = JSON.stringify(shopInfo)
          localStorage.setItem('getUserInfo', shopInfo)
          this.$router.push('/spIndexCeo?pageCode=1_1&id=' + id);
          // this.$router.go(0)
        }
      }
      //删除
      else if (code == 1) {
        this.$confirm('确认删除该员工?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // type: 'warning',
            center: true
          })
          .then(() => {
            this.deleteAxios(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
              center: true,
              showClose: true
            })
          });
      }
      //编辑员工
      else if (code == 2) {
        for (let i = 0; i < this.tBody.length; i++) {
          if (id == this.tBody[i].id) {
            this.form.name = this.tBody[i].col01
            this.form.tel = this.tBody[i].col02
            this.form.value = this.tBody[i].col03
            this.dialogFormVisible = true
          }
        }
        this.selectedId = id
      }
      //编辑区域经理
      else if (code == 3) {
        this.theShuttle.shuttleAfter = []
        this.theShuttle.id = id
        this.theShuttle.shuttleBefore = JSON.parse(localStorage.getItem('shopList'))
        for (let i = 0; i < this.tBody.length; i++) {
          if (id == this.tBody[i].id) {
            let managerDetail = {
              chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
              staffId: id
            }
            this.theShuttle.shuttleName = this.tBody[i].col01
            this.theShuttle.shuttleTel = this.tBody[i].col02
            //获取区域经理详情
            this.getStaffShowAreaManager(managerDetail)
              .then(res => {
                // console.log(res, 'ressss')
                if (res.data.success = true) {
                  if (res.data.data.manageShops.length > 0) {
                    for (let i = 0; i < this.theShuttle.shuttleBefore.length; i++) {
                      for (let j = 0; j < res.data.data.manageShops.length; j++) {
                        if (this.theShuttle.shuttleBefore[i]) {
                          if (this.theShuttle.shuttleBefore[i].id == res.data.data.manageShops[j].shopId) {
                            this.theShuttle.shuttleBefore.splice(i, 1)
                            // console.log(this.theShuttle.shuttleBefore[i],'1234324234')
                            i--
                          }
                        }
                      }
                    }
                    res.data.data.manageShops.forEach(item => {
                      if (item.shopName == null || item.shopName == '') {
                        item.shopName = '暂无数据'
                      }
                      this.theShuttle.shuttleAfter.push({
                        id: item.shopId,
                        show: true,
                        showChange: true,
                        name: '',
                        shopName: item.shopName
                      })
                    })
                  } else {
                    this.theShuttle.shuttleAfter = []
                    this.$message({
                      type: 'info',
                      message: '暂时没有数据哦！',
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
                this.closeShuttle()
              })
          }
        }
        // console.log(this.theShuttle.shuttleName, this.theShuttle.shuttleTel)
        this.$openModal()
        this.showShuttle = true
        this.rm = 'b'
      }
      //精准编辑跳转
      else if (code == 4) {
        this.$router.push('/resultsStatistical?pageCode=2_1&id=' + id)
      }
      //精准详情
      else if (code == 5) {
        this.informAxios(id)
      }
      //停止活动
      else if (code == 6) {
        this.stopAxios(id)
      }
    },
    //确认更改
    affirmChange(id) {
      //需在页面该回调中加入注释内容
      // this.redactAxios(id)
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
          id: id,
          realName: this.form.name,
          telePhone: this.form.tel,
          shopId: JSON.parse(localStorage.getItem('getUserInfo')).shopId,
          role: this.form.value
        }
        for (let i = 0; i < this.form.options.length; i++) {
          if (this.form.value == this.form.options[i].label) {
            savedata.role = this.form.options[i].value
          }
        }
        // console.log(savedata, 'savedat3232a')
        // this.$store.dispatch('getStaffSave', savedata)
        this.getStaffSave(savedata)
          .then(res => {
            // console.log(res, 'xxres')
            if (res.data.success == true) {
              this.$message({
                type: 'success',
                message: res.data.msg,
                center: true,
                showClose: true
              })
              this.redactAxios()
              this.dialogFormVisible = false
              this.form.confirmAdd = '确定保存'
              this.form.name = ''
              this.form.tel = ''
              this.form.value = ''
            } else {
              console.log(res)
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
    //排序
    rankAxios(index) {
      this.$emit('rankAxios', index)
    },
    //删除
    deleteAxios(id) {
      this.$emit('deleteAxios', id)
    },
    //编辑重获列表
    redactAxios() {
      this.$emit('redactAxios')
    },
    //
    informAxios(id) {
      this.$emit('informAxios', id)
    },
    //停止活动
    stopAxios(id) {
      this.$emit('stopAxios', id)
    },
    //分页跳转
    paginationAxios(page, limit) {
      this.$emit('paginationAxios', page, limit)
    },
    //穿梭框组件事件
    closeShuttle() {
      this.showShuttle = false
    }
  }
}

</script>
<style lang="scss">
/*大盒子*/
.main_box {
  width: 100%;
  /*padding: 0.27rem 1.29% 0 1.29%;*/
}

/*表格*/

.table_box {
  min-height: 4.8rem;
  position: relative;
}

.table_box table {

  width: 100%;
  padding-bottom: 0.52rem;
  border-collapse: collapse;
  /*表格的边框合并，如果相邻，则共用一个边框*/
  border-spacing: 0;
  /*设置行与单元格边框的间距。当表格边框独立（即border-collapse:separate;）此属性才起作用*/
}

/*表头*/
.t_head {
  padding-left: 0.17rem;
}

.t_head th {
  line-height: 0.53rem;
  font-weight: initial;
}

.rank_box {
  /*display: flex;*/
  /*flex-flow: row;*/
  /*align-items: center;*/
}

.rank_icon {
  width: 13px;
  /*height: 14px;*/
  margin-left: .03rem;
  display: inline;
  vertical-align: middle;
}

.t_head th>div>img {
  width: initial;
}

.t_operation {
  text-align: right;
  padding-right: 0.5rem;
}

.table_box tr {
  padding-left: 0.17rem;
  /*width: 100%;*/
}

/*表身*/
.table_box td {
  /*padding: 0;*/
  border-top: 0.01rem #e7eeef solid;
  line-height: 0.49rem;
  text-align: center;
}

/*操作列*/
.operation {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
}

.operation button {
  line-height: 0.3rem;
  /*flex-grow: 1;*/
  padding-left: 0.12rem;
  padding-right: 0.12rem;
  border: 1px #e7eeef solid;
  background: #fff;
  margin-top: 0.07rem;
  margin-left: 0.15rem;
  transition: all 300ms linear;
}

.operation button:hover {
  background: #4471FE;
  color: white;
  border: 1px #4471FE solid;
  transition: all 300ms linear;
}

.operation .disabledBtn:hover {
  background: #fff;
  color: graytext;
  border-color: #e7eeef;
}

/*分页*/
.paging {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding: 0.2rem 0 0.3rem 0;
}

/*分页跳转按钮*/
.go_page>button {
  line-height: 27px;
  padding-left: 0.16rem;
  padding-right: 0.16rem;
  border: 0;
  background: #4471FE;
}

/*分页输入框*/
.go_page>input {
  line-height: 26px;
  width: 0.6rem;
  border: 1px #EAEBF0 solid;
  -moz-appearance: textfield;
}

/*框架输入框样式调整*/
.paging .el-pagination .el-select .el-input .el-input__inner {
  height: 30px;
  border: 1px #EAEBF0 solid;
}

.paging .el-input--mini .el-input__inner,
.paging .el-pagination .el-select .el-input {
  width: 100px;
}

/*下拉框样式*/
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
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
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
    }
  }
}

.popper__arrow {
  z-index: -1;
}

.paging .el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
  background-color: #4471FE;
  color: #ffffff;
  border-radius: 4px;
  margin: 0 3px;
}

.v-modal {
  opacity: .2;
}


/*分页按钮样式*/
.paging .el-pager li {
  line-height: 28px;
  height: initial;
}

.paging .el-pagination.is-background .btn-next,
.paging .el-pagination.is-background .btn-prev,
.paging .el-pagination.is-background .el-pager li {
  background-color: rgba(0, 0, 0, 0);
  border: 1px #EAEBF0 solid;
  border-radius: 4px;
  min-width: 30px;
}

.paging .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #4471FE;
  /*border: 1px #4471FE solid;*/
}

.paging .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #4471FE;
}

.paging .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  color: #fff;
  /*border: 1px #4471FE solid;*/
}

.paging .el-pager .more::before {
  line-height: 28px;
}

.paging .el-pagination .btn-next:hover,
.paging .el-pagination .btn-prev:hover {
  color: #4471FE;
}

.paging .el-pagination button,
.el-pagination span:not([class*=suffix]) {
  height: 30px;
  line-height: 30px;
}

// 表单移入效果
.t_body {
  transition: all .3s linear;
}

.t_body:hover {
  background: #EAF0F0;
  transition: all .3s linear;
}

.el-message-box__message p {
  line-height: initial;
  font-size: .2rem;
}

.el-message-box__header {
  padding: 0;
}

.paging .icon-tuichuxialasanjiao2 {
  font-size: .2rem;
  position: absolute;
  right: .05rem;
  color: #4471FE;
  line-height: 32px;
}

</style>
