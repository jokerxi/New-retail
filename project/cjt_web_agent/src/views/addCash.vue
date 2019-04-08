<template>
    <div class="addCash">
         <h3>开户信息</h3>
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="法人电话" prop="phone">
                <Input v-model="formValidate.phone" />
            </FormItem>
            <FormItem label="法人邮箱" prop="mail">
                <Input v-model="formValidate.mail" />
            </FormItem>
            <FormItem label="开户省" prop="provice">
                <Select v-model="formValidate.provice" placeholder="请选择省">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="开户市" prop="city">
                <Select v-model="formValidate.city" placeholder="请选择市">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="开户支行" prop="bankBrach">
                <Input v-model="formValidate.bankBrach" />
            </FormItem>
            <FormItem label="法人身份证" prop="identity">
                <upload></upload>
            </FormItem>
            <FormItem label="是否三证合一" prop="merge">
                <Select v-model="formValidate.merge">
                    <Option value="yes">是</Option>
                    <Option value="no">否</Option>
                </Select>
            </FormItem>
            <FormItem label="营业执照类型" prop="companyType">
                <Select v-model="formValidate.companyType">
                    <Option value="yes">企业</Option>
                    <Option value="no">企业</Option>
                </Select>
            </FormItem>
           <FormItem label="营业执照" prop="identity">
                <upload></upload>
            </FormItem>
            <FormItem label="组织机构代码证" prop="identity">
                <upload></upload>
            </FormItem>
            <FormItem label="结算银行卡" prop="identity">
                <upload></upload>
            </FormItem>
            <FormItem label="店铺实景" prop="identity">
                <upload></upload>
            </FormItem>
            <FormItem label="收银台照" prop="identity">
                <upload></upload>
            </FormItem>
            <FormItem label="收银台小票" prop="identity">
                <upload></upload>
            </FormItem>
             <div class="next">
              <Button>上一步</Button>
              <Button type="primary">确认添加</Button>
            </div>
    </Form>
    </div>
</template>

<script>
import Upload from '../components/upLoad'
export default {
  name: 'addCash',
  components:{
      Upload
  },
   data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        }
}
</script>

<style lang="less">
   .addCash{
      padding: 0.2rem 0.22rem;
    background: #fff;
    font-family: 'PingFangSC-Semibold';
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    h3{
        font-size:0.38rem;
        font-weight:600;
        color:rgba(153,153,153,1);
        line-height:0.08rem;
        padding-left: 0.15rem;
        box-sizing: border-box;
        margin: 0.2rem 0;
        height: 0.36rem;
    }
    .ivu-form .ivu-form-item-label{
        font-size: 0.34rem;
        font-weight: 400;
        color: #111;
        width: 3.5rem!important;
        padding: 0.2rem 0.32rem 0.1rem 0;
    }
    .ivu-form-item{
        margin-bottom: 0.33rem;
         span{
            font-size: 0.34rem;
            color: #111;
            font-weight: 400;
        }
    }
    .ivu-input-number:hover .ivu-input-number-handler-wrap{
        opacity: 0;
    }
    .ivu-form-item-error-tip{
        padding-top:0.03rem;
    }
    .ivu-form-item-content{
        margin-left: 3.5rem!important;
    }
    .ivu-input-wrapper,.ivu-select,.ivu-input-number{
        width: 90%;
    }
    .ivu-input-number{
        height: 0.74rem;
        font-size: 0.3rem;
        padding: 0.04rem 0.07rem;
        border-radius: 0;
        border-color:#BFBFBF
    }
    .ivu-input,.ivu-select-selection,.ivu-input-number-input{
        width: 100%;
        height: 0.74rem;
        font-size: 0.3rem;
        padding: 0.04rem 0.07rem;
        border-radius: 0;
        border-color:#BFBFBF
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
        font-size: 0.3rem;
        color: #999;
    }
    .ivu-select-item{
        font-size: 0.3rem!important;
    }
    .next{
         width: 85%;
         margin: 0 auto;
         margin-bottom: 1.53rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
        .ivu-btn{
            width: 45%;
            color: #fff;
            font-size: 0.34rem;
            font-weight: 400;
            border-radius: 0.5rem;
            height: 0.66rem;
            color: #F94F3E;
            border-color:#F94F3E; 
            line-height: 0.4rem;
        }
        .ivu-btn-primary{
          background: #F94F3E;
          color: #fff;
        }
    }
   }
</style>
