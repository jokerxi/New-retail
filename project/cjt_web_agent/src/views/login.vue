<template>
    <div id="login">

      <div class="login_content">
        <p>请绑定您的子公司账号</p>
        <div class="login_input">
          <div class="flex_box">
            <span>手机号</span>
            <input v-model="formMess.phone" type="number" maxlength="11" name="phone" value="" ><br>
          </div>
          <div class="flex_box">
            <span>验证码</span>
            <input name="password" v-model="formMess.password" type="text">
            <button @click="sendCode" :disabled="disabled" class="btn" type="button" >{{btntxt}}</button>
          </div>
        </div>
        <div class="login_footer">
          <button @click="confirmBinding" type="button">确认绑定</button>
        </div>
      </div>
    </div>
</template>

<script>
import { GetValidate, PhoneLogin} from '../api/login'

    export default{
        name: "login",
        data(){
            return{
              btntxt: '获取验证码',
              disabled: false,
              time: 0,
              formMess: {
                phone: '',
                password: '',
              },
              // phone: '',
//              password: ''
            }
        },
      created() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          // alert('现在用的时候苹果手机')
          this.choosePhone = 2
          // alert(this.choosePhone)

        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          // alert('现在用的是安卓手机')
          this.choosePhone = 1
          // alert(this.choosePhone)
        }
      },
      mounted() {
//        this.Keyboard ()
      },
        methods:{

            //判断手机号码格式部分
            info(value){
              var reg = 11 && /^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/;
              var tel, code
              if (value == '') {
                this.$Message.info('手机号码不能为空');
              }
              else if (!reg.test(value)) {
                this.$Message.info('手机号码格式不对');
                return tel = false;
              }
              else {
                return tel = true;
              }
            },
            // 获取验证码异步请求
              GetValidateHandle(payload){
                return new Promise((resolve,reject) =>{
                  GetValidate(payload).then(res =>{
                     resolve()
                  }).catch(err =>{
                     reject()
                  })
                })
              },
//          获取验证码点击事件
          sendCode() {
            // 验证手机号
              var verification = this.info(this.formMess.phone);
              if (verification == true) { 
                let _this = this;
                this.GetValidateHandle(this.formMess.phone)
              }
                this.time = 60;
                let that = this;
                this.disabled = true;
                var a = setInterval(() => {
                  if (that.time > 0) {
                    that.time--;
                    that.btntxt = that.time + "s后重新获取";
                  }
                  else {
                    clearInterval(a);
                    this.btntxt = "获取验证码";
                    this.disabled = false;
                  }
                }, 1000);
              },
          // 登录
          confirmBinding(){
              let payload ={
                phone: this.formMess.phone,
                code:this.formMess.password,
              }
              return new Promise((resolve,reject) => {
               PhoneLogin(payload).then(res =>{
                 if(res.data.success){
                   localStorage.setItem('authHeader',JSON.stringify(res.data.data.authHeader))
                   this.$router.push('/')
                 } else {
                   this.$Message.error(res.data.msg)
                 }
               }).catch(err => {
                   this.$Message.error(err)
               })
             })
          }
        },
    }
</script>

<style scoped lang="less">
  .login_content{
    width: 100%;
    padding: .8rem .8rem;
    box-sizing: border-box;
    text-align: center;
    p{
      font-size:0.34rem;
      margin-top: .5rem;
    }
    .login_input{
      text-align: left;
      margin-top: .8rem;
      div:last-child{
        margin-top: .5rem;
      }
      .flex_box{
        position: relative;
        span{
          position: absolute;
          left: 0.17rem;
          bottom: 0.25rem;
          color: #999999;
          font-size:0.34rem;
        }
        input{
          width: 100%;
          outline: none;
          font-size:0.34rem;
          padding: 12px 4px 12px 70px;

          border: none;

          border-bottom: 1px solid #D9D9D9;
        }
        .btn {
          height:0.61rem;
          color: #ffffff;
          border-radius: 6px;
          background-color: #F94F3E;
          border:none;
          outline: none;
          font-size:0.3rem;
          vertical-align: middle;
          padding: .05rem .2rem;
          position: absolute;
          right: 0;
          bottom: 0.15rem;
        }
      }
    }
    .login_footer{
      padding-top: .78rem;
      button{
        width: 100%;
        height: .98rem;
        background-color: #F94F3E;
        color: #ffffff;
        border-radius: 0.49rem;
        border: none;
        outline: none;
        font-size:0.34rem;
      }
    }
  }
</style>
