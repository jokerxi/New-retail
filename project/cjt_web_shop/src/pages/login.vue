<template>
  <div id="login">
    <div class="content_box">
      <transition :duration="{ enter: 600, leave: 600 }" enter-active-class="animated bounceInUp"
                  leave-active-class="animated bounceOutUp" mode="out-in">
        <!--<div class="transition_box">-->
        <!--登录-->
        <div class="login_box shadow pull-up" v-if="animationChange==1" key="1">
          <div class="input_box">
            <p class="login_title">{{login_title}}</p>
            <div class="input_1">
              <p class="input_title">手机号</p>
              <input type="number" suffix-icon="false" class="my_input" name="phone" value="" @focus="deleTips"
                     autofocus="true"
                     v-model="phone" oninput="if(value.length>14)value=value.slice(0,14)"
                     onkeyup="this.value=this.value.replace(/[^\d]/g,'');">
              <p class="tishi_title" v-show="tips"><i class="iconfont icon-tishiicon"></i>&nbsp{{tips_text}}</p>
            </div>
            <div class="input_2">
              <div class="width1">
                <p class="input_title">{{input2_title}}</p>
                <input type="text" name="password" v-model="formMess.password" @focus="deleTips"
                       oninput="if(value.length>6)value=value.slice(0,6)">
                <p class="tishi_title2" v-show="tips1"><i class="iconfont icon-tishiicon"></i>&nbsp{{tishi_title2}}</p>
              </div>
              <div class="width2">
                <el-button class="yan_btn" :loading="btntxt=='发送中...'" @click="sendCode(phone)">{{btntxt}}</el-button>
              </div>
            </div>
            <el-button class="login_btn shadow" type="primary" :loading="senBtnText=='登录中...'"
                       @click="senBtn(phone,formMess.password)">
              {{senBtnText}}
            </el-button>
          </div>
        </div>
        <!--身份判断列表-->
        <div class="chk_box shadow drop-down" v-if="animationChange==0" key="0">
          <div class="title_box">
            <p>选择店铺 </p><span style="cursor:pointer" @click="closeProjectileFrame()"><i
            class="iconfont icon-qingchuicon"></i></span>
          </div>
          <div class="table_box1">
            <el-table class="my_table" :data="shopList" max-height="380">
              <el-table-column prop="shopName" label="名称" width=""></el-table-column>
              <el-table-column prop="roleName" label="身份"></el-table-column>
              <el-table-column label="操作" width="80  ">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" class="chk_btn" @click="choiceIdentity(scope.$index)">选择
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!--</div>-->
      </transition>
    </div>
  </div>
</template>
<script>
  import '../assets/css/time.css';
  import {mapActions} from 'vuex'


  export default {
    name: 'login',
    data() {
      return {
        senBtnText: '立即登录',
        popout: '',
        animationChange: '1',
        show: true,
        login_title: '欢迎登录',
        input2_title: '手机验证码',
        loginAa: true,
        tips: false,
        tips1: false,
        projectileFrame: false,
        tips_text: '手机号码格式错误',
        tishi_title2: '',
        btntxt: "获取验证码",
        time: 0,
        shopList: [],
        formMess: {
          phone: '',
          password: '',
        },
        phone: '',
      };
    },
    created() {
      localStorage.removeItem('Basic64')
      localStorage.removeItem('getUserInfo')
      localStorage.removeItem('getUserList')
      localStorage.removeItem('shopList')
      localStorage.removeItem('token')
    },
    methods: {
      ...mapActions([
        'getuerloginLogin',
        'getuserlogingetCode',
        'getqueryAllRoleloginId',
        'getindexcheckRole'
      ]),
      //判断手机号码格式部分
      myTudge() {
        var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
        if (this.phone == '') {
          this.tips_text = "手机号码不能为空";
          this.tips = true;
          return false;
        } else if (!reg.test(this.phone)) {
          this.tips = true;
          this.tips_text = "手机号码格式不对";
          return false;
        } else {
          this.tips = false;
          return true;
        }
      },

      //      获取验证码点击事件
      sendCode(value) {
        var verification = this.myTudge(value);
        let telephone = value;
        if (verification) {
          this.time = 60;
          let that = this;
          this.btntxt = '发送中...'
          this.getuserlogingetCode(telephone)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                var a = setInterval(() => {
                  if (that.time > 0) {
                    that.time--;
                    that.btntxt = that.time + "s后重新获取";
                  } else {
                    clearInterval(a);
                    this.btntxt = "重新获取";
                  }
                }, 1000);
                this.$message({
                  type: 'success',
                  message: res.data.msg + '，信息已发送！',
                  center: true,
                  showClose: true
                })
              } else {
                console.log(res)
                this.$message({
                  type: 'warning',
                  message: res.data.msg + '，请重试！',
                  center: true,
                  showClose: true
                })
                this.btntxt = '重新获取'
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: '出错啦！请检查网络后重试！',
                center: true
              })
              this.btntxt = '重新获取'
            })
        }
        // this.senDisabled=false
      },

      //      获取输入框焦点隐藏提示
      deleTips() {
        this.tips = false;
        this.tips1 = false;
        this.tips_text = ''
        this.tishi_title2 = ''
      },

      //      点击x返回登录
      closeProjectileFrame() {
        this.loginAa = true;
        this.projectileFrame = false;
        this.tips = false;
        this.tips1 = false;
        this.tips_text = ''
        this.tishi_title2 = ''
        this.formMess.password = '';
        this.animationChange = 1
      },

      //      登录点击判断几个身份弹窗出现还是跳转
      senBtn(value, code) {
        this.senBtnText = '登录中...'
        let telephone_code = {
          telephone: value,
          code: code
        }
        var myVerificationthis = this.myTudge(value);
        if (myVerificationthis) {
          if (!code) {
            this.tips1 = true;
            this.tishi_title2 = "验证码不能为空";
            this.senBtnText = '立即登录'
          } else {
            //验证验证码和手机
            this.getuerloginLogin(telephone_code)
              .then(res => {
                // console.log(res, 'dsds')
                if (res.data.success) {
                  localStorage.setItem('token', res.data.data.token)
                  //获取职务
                  this.getqueryAllRoleloginId(res.data.data.loginId)
                    .then(res => {
                      // console.log(res,'zhiwei')
                      if (res.data.success) {
                        localStorage.setItem('getUserList', JSON.stringify(res.data.data))
                        if (res.data.data.length == 0) {
                          this.$message({
                            type: 'error',
                            message: '抱歉，该系统暂不支持店员登录！',
                            center: true,
                            showClose: true
                          })
                        } else if (res.data.data.length == 1) {
                          this.choiceIdentity(0)
                        } else {
                          this.shopList = []
                          res.data.data.forEach(item => {
                            this.shopList.push(item)
                          })
                          this.loginAa = false;
                          this.projectileFrame = true;
                          this.animationChange = 0
                        }
                        this.senBtnText = '立即登录'
                      } else {
                        console.log(res)
                        this.tips1 = true;
                        this.tishi_title2 = res.data.msg
                        this.senBtnText = '立即登录'
                      }
                    })
                    .catch(err => {
                      this.$message({
                        type: 'error',
                        message: '出错啦！请检查网络后重试！',
                        center: true,
                        showClose: true
                      })
                      this.senBtnText = '立即登录'
                      console.log(err)
                    })
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.data.msg,
                    center: true,
                    showClose: true
                  })
                  this.tips1 = true;
                  this.senBtnText = '立即登录'
                }
              })
              .catch(err => {
                this.$message({
                  type: 'error',
                  message: '出错啦！请检查网络后重试！',
                  center: true,
                  showClose: true
                })
                this.senBtnText = '立即登录'
                console.log(err)
              })
          }
        } else {
          this.tips_text = "手机号码错误";
          // this.tips1 = true;
          this.formMess.password = ''
          this.senBtnText = '立即登录'
        }
      },

      //      弹框里点击选择判断身份跳转
      choiceIdentity(a) {
        // console.log(a);
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
            // console.log(action)
            // localStorage.setItem('action',JSON.stringify(action))
            let Base64 = require('js-base64').Base64;
            let Basic64 = Base64.encode(action.loginId + ":" + action.token);
            localStorage.setItem("Basic64", Basic64);
            // this.$store.dispatch('getindexcheckRole', JSON.stringify(action))
            this.getindexcheckRole(action)
              .then(res => {
                // console.log(res,'xuanze')
                if (res.data.success) {
                  localStorage.setItem('getUserInfo', JSON.stringify(list[i]))
                  // console.log(localStorage.getItem('getUserInfo'))
                  if (list[i].roleId == 1 || list[i].roleId == 2) {
                    this.$router.push("/indexCeo?pageCode=0");
                  } else if (list[i].roleId == 4) {
                    this.$router.push("/orderRecord?pageCode=4_1");
                  } else {
                    this.$router.push("/spIndexCeo?pageCode=1_1");
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
                this.closeProjectileFrame()
              })
              .catch(err => {
                this.$message({
                  type: 'error',
                  message: '出错啦！请检查网络后重试！',
                  center: true,
                  showClose: true
                })
                this.closeProjectileFrame()
                console.log(err)
              })
          }
        }
      }
    }
  }

</script>
<style scoped>
  @import "../assets/css/animate.css";

  .content_box {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    background-image: url("../../static/images/bg@2x.png");
    overflow: hidden;
    position: absolute;
    background-size: cover;
    top: 0;
    left: 0;
  }

  .login_box {
    /*border: 1px solid red;*/
    width: 500px;
    height: 394px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #ffffff;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 12.6%;
    padding: 45px 45px 41px 45px;
  }

  p {
    margin: 0;
  }

  .login_title {
    font-size: 22px;
    font-weight: bold;
  }

  .input_box {
    padding-bottom: 40px;
    box-sizing: border-box;
    /*border: 1px solid red;*/
  }

  .input_1 {
    position: relative;
    padding-top: 45px;
  }

  .input_1 > input {
    height: 30px;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #EAEBF0;
  }

  .input_2 {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .input_2 > div > input {
    height: 30px;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #EAEBF0;
  }

  .input_title {
    font-size: 14px;
    color: #767676;
  }

  .tishi_title {
    color: #EA4949;
    position: absolute;
    top: 68px;
    right: 0;
  }

  .tishi_title2 {
    color: #EA4949;
    position: absolute;
    top: 220px;
    right: 190px;
  }

  .width1 {
    width: 65%;
  }

  .yan_btn {
    color: #060A0D;
    background-color: #ffffff;
    margin-right: 0;
  }

  .login_btn {
    width: 302px;
    font-size: 18px;
    margin: 0 auto;
    background-color: #4471FE;
    display: block;
    margin-top: 55px;
  }

  /*弹窗*/
  .chk_box {
    width: 500px;
    height: 460px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #ffffff;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 12.6%;
  }

  .title_box {
    position: relative;
    padding: 16px 25px;
    border-bottom: 1px solid #E7EEEF;
  }

  .title_box > p {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }

  .title_box > span {
    position: absolute;
    right: 25px;
    top: 16px;
  }

  .table_box1 {
    /*border: 1px solid blue;*/
    padding: 0 25px;
  }

  .chk_btn {
    color: #000000;
    font-size: 14px;
    width: 60px;
    height: 30px;
  }

  .table_box1 .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border: none;
    text-align: left;
  }

  .table_box1 .el-table td,
  .el-table th {
    padding: 0 0 !important;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }

  /*滚动条的宽度*/

  .table_box1 .el-table--scrollable-y .el-table__body-wrapper {
    background-color: white;
  }

  .table_box1 .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {

    /*border:1px solid red;*/
    width: 5px;
    background-color: blue;
  }

  .table_box1 th {
    text-align: center !important;
  }

  .table_box1 td {
    border-top: 0.01rem #e7eeef solid;
    /*line-height: 0.49rem;*/
    text-align: center !important;
  }

  /*!*滚动条的滑块*!*/
  /*.my_table .el-table__body-wrapper::-webkit-scrollbar-thumb {*/
  /*background-color: #a1a3a9;*/
  /*border-radius: 3px;*/
  /*}*/

  /*.el-button--primary:focus, .el-button--primary:hover {*/
  /*background: #6288FF;*/
  /*border-color: #6288FF;*/
  /*color: #fff;*/
  /*}*/

</style>
