<template>
  <!--ceo进入的首页-->
  <div>
    <div class="my_fixd">
      <div class="position_nav">
        <div class="index_nav">
          <!--logo-->
          <div class="logo_box" @click="goIndex">
            <div class="logo"></div>
            <div class="my_font">叮当会员商家后台</div>
          </div>
          <!--导航切换-->
          <div class="nav_list">
            <div v-for="(item,index) in msg" :key="index" v-if="item.isShow" :class="activeId == item.No?'actives':''" @click="selectTab(index)">
              <div>
                <div><img :src="item.src" alt=""></div>
                  <p>{{item.title}}</p>
                </div>
              </div>
            </div>
            <!--店铺信息-->
            <div class="user_box" @mouseleave="loginOutShow = false">
              <div class="change_store">
                <span>{{chainName}}</span>
                <span v-if="shopName?true:false" class="shop_name">{{shopName}}</span>
                <button @click="openRole">切换身份</button>
                <!--切换店铺模态框-->
                <el-dialog title="切换店铺" :visible.sync="motai" modal-append-to-body align="left" class="my_dialog" :modal-append-to-body='false'>
                  <el-table :data="gridData" max-height="360" class="font14 center">
                    <el-table-column property="shopName" label="名称" align="left"></el-table-column>
                    <el-table-column property="identity" label="身份" align="center"></el-table-column>
                    <el-table-column label="操作" align="right">
                      <template slot-scope="scope">
                        <span class="btn_style font14" @click="changeBtn(scope.$index)">切换</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dialog>
              </div>
              <div class="user_name" @mouseenter="loginOutShow = true">
                <div>
                  <span>{{username}}</span>
                  <i class="fa fa-caret-down icon_down" aria-hidden="true"></i>
                </div>
                <button v-show="loginOutShow" class="user_exit" @click="loginOut" :disabled="loginOutDisabled">
                  {{loginOutText}}
                  <i class="iconfont icon-tuichuxialasanjiao"></i>
                </button>
              </div>
              <div class="user_head">
                <img :src="userHead" alt="">
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: "index-navss",
  data() {
    return {
      activeId: 0,
      chainName: '',
      shopName: '',
      username: '叮叮当当会员',
      userHead: '../../static/images/img1.jpg',
      loginOutText: '退出登录',
      loginOutDisabled: false,
      // 模态框弹出内容
      // tabShow1: 1, //控制切换页面的图标状态的变量
      gridData: [
        // {
        //   id: 10,
        //   identity: '财务',
        //   shopName: '王小虎',
        //   code: 3
        // }
      ],
      motai: false,
      loginOutShow: false,
      msg: [{
          No: 0,
          isShow: '',
          title: '首页',
          src: '../../static/images/icons/icon6.png',
          url: '/indexCeo?pageCode=0'
        },
        {
          No: 1,
          isShow: '',
          title: '店铺',
          src: '../../static/images/icons/icon2.png',
          url: '/shopList?pageCode=1'
        },
        {
          No: 2,
          isShow: '',
          title: '账号',
          src: '../../static/images/icons/icon3.png',
          url: '/myareaManager?pageCode=2'
        }
      ],
      selectImg: [
        '../../static/images/icons/icon1.png',
        '../../static/images/icons/icon4.png',
        '../../static/images/icons/icon7.png',
      ],
      defaultImg: [
        '../../static/images/icons/icon6.png',
        '../../static/images/icons/icon2.png',
        '../../static/images/icons/icon3.png',
      ]
    }
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('getUserInfo'))
    // let userInfo = {roleId: 1}
    //CEO
    if (userInfo.roleId == 1) {
      for (let i = 0; i < this.msg.length; i++) {
        this.msg[i].isShow = true
      }
    }
    //区域经理
    else if (userInfo.roleId == 2) {
      this.msg[0].isShow = true
      this.msg[1].isShow = true
      this.msg[2].isShow = false
    }
    //店长
    else if (userInfo.roleId == 3) {
      for (let i = 0; i < this.msg.length; i++) {
        this.msg[i].isShow = false
      }
    }
    //财务
    else if (userInfo.roleId == 4) {
      for (let i = 0; i < this.msg.length; i++) {
        this.msg[i].isShow = false
      }
    }
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem('getUserInfo'))
    //顶部导航激活继承
    // console.log(this.$route.query.pageCode,'this.$route.query.pageCode')
    if (this.$route.query.pageCode != 0 && this.$route.query.pageCode != 1 && this.$route.query.pageCode != 2) {
      this.activeId = 1
    } else {
      this.activeId = this.$route.query.pageCode
    }
    this.chainName = userInfo.chainName
    // this.chainName = "userInfo.chainName"
    this.shopName = userInfo.shopName
    // this.shopName = "userInfo.shopName"
    this.msg[this.activeId].src = this.selectImg[this.activeId]
    for (let i = 0; i < this.msg.length; i++) {
      if (this.msg[i].No != this.activeId) {
        this.msg[i].src = this.defaultImg[i]
      }
    }
  },
  methods: {
    ...mapActions([
      'getindexcheckRole',
      'getLogout'
    ]),
    //切换导航
    selectTab(index) {
      let userInfo = JSON.parse(localStorage.getItem('getUserInfo'))
      if (this.$route.query.pageCode != 0 && this.$route.query.pageCode != 1 && this.$route.query.pageCode != 2) {
        this.activeId = 1
        this.chainName = userInfo.chainName
        // this.chainName = "userInfo.chainName"
        this.shopName = userInfo.shopName
        // this.shopName = "userInfo.shopName"
      }
      this.msg[index].src = this.selectImg[index]
      for (let i = 0; i < this.msg.length; i++) {
        if (this.msg[i].No != index) {
          this.msg[i].src = this.defaultImg[i]
        }
      }
      this.activeId = index
      this.$router.push(this.msg[index].url)
    },
    //打开切换身份
    openRole() {
      this.gridData = []
      JSON.parse(localStorage.getItem('getUserList')).forEach(item => {
        this.gridData.push({
          id: item.loginId,
          identity: item.roleName,
          shopName: item.shopName
        })
      })
      this.motai = true
    },
    //切换店铺
    changeBtn(a) {
      let list = JSON.parse(localStorage.getItem('getUserList'))
      let action
      for (let i = 0; i < list.length; i++) {
        if (i == a) {
          action = {
            loginId: list[i].loginId,
            roleId: list[i].roleId,
            chainId: list[i].chainId,
            shopId: list[i].shopId,
            token: localStorage.getItem('token')
          }
          let Base64 = require('js-base64').Base64;
          let Basic64 = Base64.encode(action.loginId + ":" + action.token);
          localStorage.removeItem('Basic64')
          localStorage.setItem("Basic64", Basic64)
          this.getindexcheckRole(action)
            .then(res => {
              // console.log(res,'xuanze')
              if (res.data.success == true) {
                localStorage.removeItem('getUserInfo')
                localStorage.setItem('getUserInfo', JSON.stringify(list[i]))
                // console.log(localStorage.getItem('getUserInfo'))
                if (list[i].roleId == 1 || list[i].roleId == 2) {
                  this.$router.push("/indexCeo?pageCode=0");
                  localStorage.removeItem('shopList')
                  location.reload()
                  // this.$router.go(0)
                } else if (list[i].roleId == 4) {
                  this.$router.push("/orderRecord?pageCode=4_1");
                  location.reload()
                  localStorage.removeItem('shopList')
                  // this.$router.go(0)
                } else {
                  this.$router.push("/spIndexCeo?pageCode=1_1");
                  location.reload()
                  localStorage.removeItem('shopList')
                  // this.$router.go(0)
                }
                this.motai = false
              } else {
                console.log(res)
                this.$message({
                  type: 'warning',
                  message: res.data.msg,
                  center: true,
                  showClose: true
                })
                this.motai = false
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
              this.motai = false
            })
        }
      }
    },
    //回首页
    goIndex() {
      //身份判断
      let userInfo = JSON.parse(localStorage.getItem('getUserInfo'))
      // let userInfo = {roleId:2}
      // console.log(userInfo)
      //CEO，区域经理
      if (userInfo.roleId == 1 || userInfo.roleId == 2) {
        this.selectTab(0)
      }
      //店长
      else if (userInfo.roleId == 3) {
        this.$router.push('/spindexCeo?pageCode=1_1')
        this.$router.go(0)
      }
      //财务
      else if (userInfo.roleId == 4) {
        this.$router.push('/orderRecord?pageCode=4_1')
        this.$router.go(0)
      }

    },
    //退出登录
    loginOut() {
      this.loginOutText = '退出中...'
      this.loginOutDisabled = true
      this.getLogout(JSON.parse(localStorage.getItem('getUserInfo')).loginId)
        .then(res => {
          // console.log(res,'loginId')
          if (res.data.success == true) {
            this.$message({
              type: 'success',
              message: res.data.msg,
              center: true,
              showClose: true
            })
            localStorage.removeItem('Basic64')
            localStorage.removeItem('getUserInfo')
            localStorage.removeItem('getUserList')
            localStorage.removeItem('shopList')
            localStorage.removeItem('token')
            this.$router.push('/')
            this.loginOutText = '退出登录'
            this.loginOutDisabled = false
          } else {
            console.log(res)
            this.$message({
              type: 'warning',
              message: res.data.msg,
              center: true,
              showClose: true
            })
            this.loginOutText = '退出登录'
            this.loginOutDisabled = false
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
          this.loginOutText = '退出登录'
          this.loginOutDisabled = false
        })
    }
  }
}

</script>
<style scoped>
@import "../assets/font-awesome-4.7.0/css/font-awesome.min.css";
/*导航栏样式*/

/*导航栏样式*/
.my_fixd {
  /*border:1px solid red;*/
  position: relative;
  height: 0.8rem;
  min-height: initial;
}

.position_nav {
  width: 100%;
  position: fixed;
  z-index: 12;
  background-color: white;

}

.index_nav {
  border-bottom: 1px solid #F5F5F5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.logo_box {
  /*border:1px solid red;*/
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  margin-left: 0.2rem;
  cursor: pointer;
}

.logo {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../static/images/icons/icon5.png");
  background-size: cover;
}

.my_font {
  font-size: 0.22rem;
  margin-left: 0.15rem;
}

.nav_list {
  /*border:1px solid blue;*/
  font-size: 0.12rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
}

.nav_list>div {
  border-bottom: 2px #fff solid;
  height: 77px;
  cursor: pointer;
  transition: all 300ms linear;
}

.actives {
  border-bottom: 2px #4471FE solid !important;
  background: -webkit-linear-gradient(rgba(69, 111, 255, 0), rgba(69, 111, 255, .1));
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgba(69, 111, 255, 0), rgba(69, 111, 255, .1));
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgba(69, 111, 255, 0), rgba(69, 111, 255, .1));
  /* Firefox 3.6 - 15 */
  background: linear-gradient(rgba(69, 111, 255, 0), rgba(69, 111, 255, .1));
  /* 标准的语法 */
  transition: all 300ms linear;
}


.nav_list>div>div {
  margin: 20px .48rem 0 .48rem;
}

.user_box {
  /*border:1px solid red;*/
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}

.change_store {
  /*border: 1px solid red;*/
  height: 0.8rem;
  font-size: 0.12rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.change_store>span {
  /*border: 1px solid red;*/
  padding: 0 0.1rem;
}

.change_store>.shop_name {
  border-left: 1px solid rgba(235, 235, 235, 1);
}

.change_store>button {
  border: 1px solid rgba(235, 235, 235, 1);
  /*border: 0.01rem solid red;*/
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  padding: 0.06rem 0.15rem;
  margin-left: 0.1rem;
}

.change_store>button:hover {
  cursor: pointer;
}

.user_name {
  font-size: 0.14rem;
  margin-left: 1rem;
  position: relative;
  cursor: pointer;
}

.icon_down {
  margin-left: 0.06rem;
  color: rgb(68, 113, 254);
  font-size: 16px;
}

.user_head {
  width: 0.46rem;
  height: 0.46rem;
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 50%;
  margin-left: 0.14rem;
  margin-right: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.user_head img {
  width: 100%;
  height: 100%;
}

.user_exit {
  border: 0;
  background: #4471FE;
  color: #fff;
  font-size: 0.14rem;
  border-radius: 0.04rem;
  position: absolute;
  top: 0.25rem;
  margin-top: 0.08rem;
  text-align: center;
  line-height: 0.26rem;
  padding-left: 0.12rem;
  padding-right: 0.12rem;
  z-index: 15;
  cursor: pointer;
}

.change_btn {
  /*background: #4471FE;*/
  /*border:1px solid blue;*/
  width: 0.6rem;
  line-height: 0.3rem;
  padding: 0
}

.icon-tuichuxialasanjiao {
  color: rgb(68, 113, 254);
  position: absolute;
  font-size: 0.14rem;
  top: -0.12rem;
  left: calc(50% - 0.08rem);
}

.btn_style {
  border: 1px solid rgba(235, 235, 235, 1);
  border-radius: 4px;
  background-color: white;
  padding: 0.08rem 0.16rem;
  color: #333333;
}

.btn_style:hover {
  border: 1px solid rgba(68, 113, 254, 1);
  background-color: rgba(68, 113, 254, 1);
  color: white;
  cursor: pointer;

}

/*以下代码是控制模态框的样式设置*/
.my_dialog .el-dialog__title {
  font-size: .16rem;
}

.my_dialog .el-table .cell {
  text-align: center;
}

.my_dialog .el-table::before {
  height: 0;
}

.my_dialog .el-table .cell {
  color: initial;
}

</style>
