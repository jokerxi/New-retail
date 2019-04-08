<!--穿梭框-->
<template>
  <div class="shuttle_box">
    <div class="module_bg radius shadow">
      <div>
        <!--上部-->
        <div class="title_box">
          <p class="font16 bold font_black">{{bigTitle}}</p>
          <span @click="closeShuttle"><i class="iconfont icon-guanbiicon font12 font_gray"></i></span>
        </div>
        <!--内容-->
        <div class="container_box container_text">
          <!--头部-->
          <div>
            基本信息
            <div>
              <div class="top_input">
                <label for="shuttleName">姓名：</label>
                <input class="default_input" type="text" id="shuttleName" v-model="myShuttle.shuttleName"
                       oninput="if(value.length>10)value=value.slice(0,10)"
                       placeholder="请输入姓名">
              </div>
              <div class="top_input">
                <label for="shuttleTel">电话：</label>
                <input class="default_input" type="number" id="shuttleTel" v-model="myShuttle.shuttleTel"
                       placeholder="请输入电话" oninput="if(value.length>11)value=value.slice(0,11)"
                       onkeyup="this.value=this.value.replace(/[^\d]/g,'');">
              </div>
            </div>
          </div>
          <!--店铺-->
          <div class="shuttle_content">
            <div class="shuttle_title">
              <div>
                <p>添加店铺 <span class="font_gray" v-if="myShuttle.openCode!=0">双击编辑文本</span></p>
                <input class="default_input" type="text" v-model="searchShop">
                <button type="button" class="radius font_white" @click="shuttleSearch">搜索</button>
              </div>
              <p>已添加店铺</p>
            </div>
            <div>
              <!--左-->
              <div>
                <div v-for="before in myShuttle.shuttleBefore" v-if="before.show">
                  <div class="shuttle_text radius" v-if="myShuttle.openCode==0">
                    {{before.shopName}}
                  </div>
                  <div class="shuttle_text radius" v-else @dblclick="goChange(before.id)">
                    <span v-if="before.showChange">{{before.shopName}}</span>
                    <input type="text" v-model="before.name" v-else autofocus="autofocus"
                           @blur="changeName(before.id)">
                  </div>
                  <div class="add_shuttle radius font12" @click="goAfter(before.id)"><i
                    class="iconfont icon-add"></i></div>
                </div>
              </div>
              <!--右-->
              <div>
                <div class="right_shuttle" v-for="after in myShuttle.shuttleAfter" v-if="after.show">
                  <div class="shuttle_text radius" v-if="myShuttle.openCode==0">
                    {{after.shopName}}
                  </div>
                  <div class="shuttle_text radius" v-else @dblclick="goChange(after.id)">
                    <span v-if="after.showChange">{{after.shopName}}</span>
                    <input type="text" v-model="after.name" v-else autofocus="autofocus"
                           @blur="changeName(after.id)">
                  </div>
                  <div class="close_shuttle font12" @click="goBefore(after.id)"><i
                    class="iconfont icon-qingchuicon"></i></div>
                </div>
              </div>
            </div>
          </div>
          <!--底部按钮-->
          <div class="shuttle_btn">
            <button @click="closeShuttle">取消</button>
            <button @click="toSave" :disabled="confirmAdd=='保存中...'?true:false">{{confirmAdd}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "shuttle-box",
    data() {
      return {
        bigTitle: '',
        searchShop: '',
        confirmAdd: '保存'
        // myShuttle: {
        //   id:'',
        //   openCode: '',
        //   shuttleName: '',
        //   shuttleTel: '',
        //   shuttleBefore: [
        //     {
        //       id: 1,
        //       show: true,
        //       showChange: true,
        //       name: '',
        //       shopName: '嘻嘻超市'
        //     }
        //   ],
        //   shuttleAfter: []
        // }
      }
    },
    props: ['myShuttle'],
    //获取页面高度并赋予蒙版
    mounted() {
      let orderHeight = document.documentElement.clientHeight
      // document.getElementsByClassName('shuttle_box')[0].style.minHeight = orderHeight + 'px'
      if (this.myShuttle.openCode == 0) {
        this.bigTitle = '新建区域经理'
      } else {
        this.bigTitle = '编辑区域经理'
      }
    },
    methods: {
      ...mapActions([
        'getStaffSaveAreaManager',
        'getshopupdateName',
        'getshoplistByChain'
      ]),
      //关闭模态框
      closeShuttle() {
        this.$emit('closeShuttle')
        this.myShuttle.showShuttle = false
        this.redactAxios()
        this.$closeModal()
      },
      //模糊查询
      shuttleSearch() {
        //获取店铺信息
        let params = {
          chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
          queryWord: this.searchShop
        }
        this.myShuttle.shuttleBefore = []
        this.getshoplistByChain(params)
          .then(res => {
            // console.log(res, 'reses')
            if (res.data.success == true) {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => {
                  if (!item.shopName) {
                    item.shopName = '暂无数据'
                  }
                  this.myShuttle.shuttleBefore.push({
                    id: item.id,
                    show: true,
                    showChange: true,
                    name: '',
                    shopName: item.shopName
                  })
                  //存入店铺
                  localStorage.removeItem('shopList')
                  localStorage.setItem('shopList', JSON.stringify(this.myShuttle.shuttleBefore))
                  //对接穿梭框
                  if (this.myShuttle.shuttleAfter > 0) {
                    for (let i = 0; i < this.myShuttle.shuttleAfter.length; i++) {
                      if (item.id != this.myShuttle.shuttleAfter[i].id) {
                        if (!item.shopName) {
                          item.shopName = '暂无数据'
                        }
                        this.myShuttle.shuttleBefore = []
                        this.myShuttle.shuttleBefore.push({
                          id: item.id,
                          show: true,
                          showChange: true,
                          name: '',
                          shopName: item.shopName
                        })
                      }
                    }
                  }
                })
              } else {
                console.log(res)
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
      //打开更改店铺名
      goChange(id) {
        for (let i = 0; i < this.myShuttle.shuttleBefore.length; i++) {
          if (this.myShuttle.shuttleBefore[i].id == id) {
            this.myShuttle.shuttleBefore[i].showChange = false
          }
        }
      },
      //更改店名
      changeName(id) {
        for (let i = 0; i < this.myShuttle.shuttleBefore.length; i++) {
          if (this.myShuttle.shuttleBefore[i].id == id) {
            if (this.myShuttle.shuttleBefore[i].name != '') {
              // console.log(this.myShuttle.shuttleBefore[i],'wqd132')
              let action = {
                shopId: this.myShuttle.shuttleBefore[i].id,
                chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
                shopName: this.myShuttle.shuttleBefore[i].name
              }
              // console.log(action,'action')
              this.getshopupdateName(action)
                .then(res => {
                  // console.log(res,'5443')
                  if (res.data.success == true) {
                    this.$message({
                      type: 'success',
                      message: res.data.msg,
                      center: true,
                      showClose: true
                    })
                    this.myShuttle.shuttleBefore[i].shopName = this.myShuttle.shuttleBefore[i].name
                    this.shuttleSearch()
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
            }
            this.myShuttle.shuttleBefore[i].showChange = true
          }
        }
      },
      //添加公司
      goAfter(id) {
        for (let i = 0; i < this.myShuttle.shuttleBefore.length; i++) {
          if (this.myShuttle.shuttleBefore[i].id == id) {
            this.myShuttle.shuttleAfter.push(this.myShuttle.shuttleBefore[i])
            this.myShuttle.shuttleBefore.splice(i, 1)
          }
        }
      },
      //删除公司
      goBefore(id) {
        for (let i = 0; i < this.myShuttle.shuttleAfter.length; i++) {
          if (this.myShuttle.shuttleAfter[i].id == id) {
            this.myShuttle.shuttleBefore.push(this.myShuttle.shuttleAfter[i])
            this.myShuttle.shuttleAfter.splice(i, 1)
          }
        }
      },
      //保存
      toSave() {
        var reg = 11 && /^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/;
        console.log(this.myShuttle.shuttleName, 'this.myShuttle.shuttleName', this.myShuttle.shuttleTel, 'this.myShuttle.shuttleTel')
        if (!reg.test(this.myShuttle.shuttleTel) || this.myShuttle.shuttleName == '') {
          this.$message({
            type: 'warning',
            message: '请输入正确姓名和手机号！',
            center: true,
            showClose: true
          })
          this.myShuttle.shuttleName = ''
          this.myShuttle.shuttleTel = ''
        } else {
          this.confirmAdd = '保存中...'
          let params = {
            id: this.myShuttle.id,
            realName: this.myShuttle.shuttleName,
            telePhone: this.myShuttle.shuttleTel,
            chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
            shopIds: []
          }
          // console.log(params, '3232')
          this.myShuttle.shuttleAfter.forEach(i => {
            params.shopIds.push(i.id)
          })
          // params=JSON.stringify(params)
          // console.log(params, '2323')
          this.getStaffSaveAreaManager(params)
            .then(res => {
              // console.log(res)
              if (res.data.success == true) {
                this.$message({
                  type: 'success',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                })
                this.myShuttle.shuttleName = ''
                this.myShuttle.shuttleTel = ''
                this.redactAxios()
                this.closeShuttle()
                this.confirmAdd = '保存'
              } else {
                console.log(res)
                this.$message({
                  type: 'warning',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                })
                this.confirmAdd = '保存'
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
              this.confirmAdd = '保存'
            })
        }
      },
      //编辑重获列表
      redactAxios() {
        this.$emit('redactAxios')
      },
      //// 绑定双击事件
      // bindDbl() {
      //   console.log('双击')
      //   document.getElementsByClassName("shop_name")[0].addEventListener("click", function () {
      //     // console.log('双击')
      //   })
      // }
    }
  }
</script>

<style scoped>
  /*蒙版*/
  .shuttle_box {
    width: 100%;
    background: rgba(0, 0, 0, .2);
    height: 100%;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
  }

  /*大盒子*/
  .shuttle_box > div {
    /*min-width: 640px;*/
    width: 9rem;
    margin: 7% auto;
    /*min-height: 462px;*/
    /*height: 6.5rem;*/
  }

  /*顶部标题*/
  .title_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 47px;
    border-bottom: 1px #E7EEEF solid;
    padding-left: 20px;
    padding-right: 20px;
  }

  /*内容盒子*/
  .container_box {
    padding-left: 20px;
    padding-right: 20px;
  }

  .container_box > div {
    font-weight: bold;
  }

  .container_box > div > div {
    display: flex;
    align-items: center;
  }

  /*基本信息*/
  .top_input {
    margin-right: 48px;
  }

  .top_input > label {
    color: #151515;
    font-weight: initial;
  }

  .top_input > input {
    width: 1.34rem;
    min-width: 93px;
  }

  /*店铺大框*/
  .shuttle_content > div:nth-of-type(1) {
    display: flex;
    align-items: flex-end;
  }

  /*头部标题*/
  .shuttle_title span {
    font-weight: initial;
    margin-left: 10px;
  }

  /*搜索按钮*/
  .shuttle_title button {
    margin-right: .56rem;
    background: #4471FE;
    border: none;
    padding: .07rem 21px;
    margin-left: 8px;
  }

  /*店铺框*/
  .shuttle_content > div:nth-of-type(2) {
    max-height: 3.2rem;
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    overflow: auto;
    margin-top: 10px;
  }

  /*店铺两侧框*/
  .shuttle_content > div:nth-of-type(2) > div {
    width: 50%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  /*店铺*/
  .shuttle_content > div:nth-of-type(2) > div > div {
    width: 46.5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .shuttle_content > div:nth-of-type(2) > div:nth-of-type(1) {
    border-right: 1px #E7EEEF solid;
    min-height: 230px;
  }

  .shuttle_content > div:nth-of-type(2) > div:nth-of-type(2) {
    border-left: 1px #E7EEEF solid;
  }

  .shuttle_text {
    width: 70%;
    border: 1px #E7EEEF solid;
    padding-left: 9px;
    font-weight: initial;
  }

  .shuttle_text input {
    width: 90% !important;
    border: none !important;
    outline: none;
  }

  .add_shuttle {
    line-height: 26px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px #E7EEEF solid;
    color: #4471FE;
    transition: all 300ms linear;
  }

  .add_shuttle:hover {
    border-color: #4471FE;
    background: #4471FE;
    color: #fff;
    transition: all 300ms linear;
  }

  .close_shuttle {
    color: #767676;
    /*margin-left: 5px;*/
    transition: all 300ms linear;
  }

  .close_shuttle:hover {
    color: #4471FE;
    transition: all 300ms linear;
  }

  .right_shuttle {
    margin-left: 10px;
    justify-content: space-around !important;
    margin-right: 0 !important;
  }

  /*底部按钮*/
  .shuttle_btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 30px;
  }

  .shuttle_btn > button {
    font-size: .2rem;
    padding: .1rem .25rem;
    border: 1px #E7EEEF solid;
    background: rgba(0, 0, 0, 0);
    border-radius: 4px;
    margin-right: 20px;
    transition: all 300ms linear;
  }

  .shuttle_btn > button:nth-of-type(2) {
    background: #4471FE;
    color: white;
    border-color: #4471FE;
    transition: all 300ms linear;
  }

  .shuttle_btn > button:hover {
    background: #E7EEEF;
    color: #0b0b0b;
    border-color: #E7EEEF;
    transition: all 300ms linear;
  }

  .container_text {
    line-height: 28px;
  }

  .shuttle_box input {
    height: .3rem;
    min-height: 19px;
    border: 1px #E7EEEF solid;
    border-radius: 4px;
  }

  /*更改输入框默认样式*/

  .default_input {
    text-indent: .09rem;
  }
</style>
