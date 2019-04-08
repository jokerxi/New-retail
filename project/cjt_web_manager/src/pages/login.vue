<template>
    <div class="Login">
        <div class="loginWrap">
            <h3>欢迎登录</h3>
            <div class="LoginForm">
                <Form ref="formValidate" :model="formValidate">
                    <FormItem label="账号" prop="username">
                        <Input v-model="formValidate.userName"/>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input :type="IsClose ? 'password' : 'text'" v-model="formValidate.password"/>
                        <span :class="{'openEye': !IsClose}" @click="CloseHanlde" class="eye"></span>
                    </FormItem>
                    <span class="errMsg" v-if="errMsg"> <span class="Icon"></span><span>账号密码错误</span></span>
                    <FormItem class="btns" :class="{'btnTop':!errMsg}">
                        <Button type="primary" :loading="loading" @click="LoginHandle">
                            <span v-if="!loading">立即登录</span>
                            <span v-else>登录中...</span>
                        </Button>
                        <!-- <Button @click="LoginHandle" :loading="loading" type="primary">立即登录</Button> -->
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                formValidate: {
                    userName: '',
                    password: '',
                },
                IsClose: true,
                errMsg: false
            }
        },
        created() {
            sessionStorage.clear()
            localStorage.clear()
        },
        computed: {
            loading() {
                return this.$store.state.login.loading
            }
        },
        methods: {
            CloseHanlde() {
                this.IsClose = !this.IsClose;
            },
            LoginHandle() {
                if (this.formValidate.userName == "" || this.formValidate.password == "") {
                    this.$Message.error('用户名或密码不能为空')
                } else {
                    this.$store.commit('setLoading', true)
                    let loginAction = {
                        userName: this.formValidate.userName,
                        password: this.formValidate.password
                    }
                    this.$store.dispatch('Login', loginAction)
                }
            }
        }
    }
</script>

<style lang="scss">
    .Login {
        width: 100%;
        min-height: 100vh;
        background: url('../../static/image/bg@2x.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 0 2.42rem;
        font-family: 'Source Han Sans CN';

        .ivu-form-item {
            width: 100%;
        }

        .loginWrap {
            width: 5rem;
            // height:3.94rem;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
            border-radius: 0.03rem;
            padding: 0.4rem 0.45rem 0.2rem;
            box-sizing: border-box;

            h3 {
                font-size: 0.22rem;
                font-weight: bold;
                line-height: 0.37rem;
                color: rgba(6, 10, 13, 1);
                margin-bottom: 0.4rem;
                font-family: 'Source Han Sans CN';
            }

            .ivu-form-item {
                margin-bottom: 0.25rem;
            }

            .ivu-form-item-content {
                position: relative;
            }

            .ivu-form .ivu-form-item-label {
                font-weight: 400;
                padding: 0;
                font-family: 'Source Han Sans CN';
            }

            .ivu-input {
                border: 0;
                border-bottom: 1px solid rgba(234, 235, 240, 1);
                outline: none;
                box-shadow: 0 !important;
                font-size: 0.16rem;
                color: #060A0D;
                font-family: 'Source Han Sans CN';
            }

            .ivu-input:focus {
                outline: 0;
                box-shadow: 0 0 0 transparent;
            }

            .btns {
                text-align: center;
            }

            .btnTop {
                margin-top: 0.5rem;
            }

            .ivu-btn-primary {
                width: 3.02rem;
                height: 0.5rem;
                background: rgba(68, 113, 254, 1);
                box-shadow: 0px 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
                border-radius: 0.04rem;
                margin: 0 auto;
                font-size: 0.18rem;
                font-family: 'Source Han Sans CN';
                font-weight: 500;
            }
        }

        .eye {
            width: 0.25rem;
            height: 0.15rem;
            display: inline-block;
            position: absolute;
            right: 0.05rem;
            top: 50%;
            background: url('../../static/image/close.png');
            background-size: 100% 100%;
        }

        .openEye {
            background: url('../../static/image/open.png');
            background-size: 100% 100%;
        }

        .errMsg {
            display: block;
            margin-top: -0.15rem;
            color: rgba(234, 73, 73, 1);
            font-size: 0.14rem;
            font-weight: 400;
            font-family: 'Source Han Sans CN';
            display: flex;
            align-items: center;
            margin-bottom: 0.25rem;

            .Icon {
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                background: url('../../static/image/tishi.png') no-repeat center center;
                background-size: 100% 100%;
                margin-right: 0.02rem;
                vertical-align: middle;
                margin-top: 0.02rem;
            }
        }
    }
</style>
