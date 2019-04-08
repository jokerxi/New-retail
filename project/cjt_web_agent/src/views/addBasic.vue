<template>
    <div class="addBasic">
        <h3>基础信息</h3>
        <h4 class="InfoType">
          <span class="title">合作类型</span>
          <span class="addType">
              <RadioGroup v-model="addType">
                <Radio label="预付金"></Radio>
                <Radio label="提现"></Radio>
            </RadioGroup>
              <!-- <span class="prepay">
                  <span class="radius active"></span>
                  <span>预付金</span>
              </span>
              <span class="cash">
                  <span class="radius"></span>
                  <span>提现</span>
              </span> -->
          </span>
        </h4>
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <h4 class="InfoType">基本信息</h4>
            <FormItem label="店铺类型" prop="shopType">
               <Select placeholder="连锁商超" v-model="formValidate.shopType">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
            </FormItem>
            <FormItem label="选择连锁店铺" prop="selectShop">
               <Select placeholder="喜洋洋连锁" v-model="formValidate.selectShop">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
            </FormItem>
            <FormItem label="店铺名" prop="shopName">
                <Input v-model="formValidate.shopName"/>
            </FormItem>
            <FormItem label="店铺简称" prop="shopNickName">
                <Input v-model="formValidate.shopNickName"/>
            </FormItem>
            <FormItem label="店长" prop="shoper">
                <Input v-model="formValidate.shoper" />
            </FormItem>
            <FormItem label="绑定手机" prop="phone">
                <Input v-model="formValidate.phone" />
            </FormItem>
            <FormItem label="店铺面积" prop="shopArea">
                <Input v-model="formValidate.shopArea" />
                <span>㎡</span>
            </FormItem>
             <FormItem label="员工数" prop="staffCount">
                <Input v-model="formValidate.staffCount" />
                <span>人</span>
            </FormItem>
            <FormItem label="日均流水" prop="dayFlow">
                <Input v-model="formValidate.dayFlow" />
                <span>元</span>
            </FormItem>
            <FormItem label="移动支付流水" prop="mobFlow">
                <Input v-model="formValidate.mobFlow" />
                <span>元</span>
            </FormItem>
            <FormItem label="店铺地址" prop="shopAddr">
                <upload></upload>
            </FormItem>
           <FormItem label="logo" prop="logo">
                <upload></upload>
            </FormItem>
            <FormItem label="店铺租赁合同" prop="shopHt">
                <Input />
            </FormItem>
            <h4 class="InfoType">付款二维码</h4>
            <FormItem prop="EWM" label='绑定二维码'>
            <Row v-for="(item, index) in Items" :key="index" v-if="item.status" :style="{'margin-bottom':'0.33rem'}">
                <Col span="22">
                    <Input type="text" v-model="item.value"/>
                </Col>
                <Col span="2">
                <span v-if="len" @click="handleRemove(index)" :style="{'font-size':'0.46rem','font-weight': 'bold'}">
                      -
                  </span>
                </Col>
            </Row>
            <Row>
                <Col span="22">
                    <Input type="text"/>
                </Col>
                <Col span="2">
                <span @click="handleAdd" :style="{'font-size':'0.46rem','font-weight': 'bold'}">
                      +
                  </span>
                </Col>
            </Row>
        </FormItem>
            <h4 class="InfoType">其他</h4>
            <FormItem label="备注" prop="sort">
                <Input  v-model="formValidate.sort" :style="{'width':'4.14rem','heigth': '2rem'}" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="点击输入" />
            </FormItem>
            <div class="next">
              <Button type="primary" @click="Next">下一步</Button>
            </div>
    </Form>
    </div>
</template>

<script>
import Upload from '../components/upLoad'
export default {
    name: 'addBasic',
    components:{
      Upload
    },
    data(){
        return{
            addType: '预付金',
            index:0,
            Items: [
                        {
                            value: '',
                            index: 1,
                            status: 0
                        }
                    ],
            formValidate: {
                    shopType: '',
                    selectShop: '',
                    shopName: '',
                    shopNickName: '',
                    shoper: '',
                    phone: '',
                    shopArea: 0,
                    staffCount: 0,
                    dayFlow:0,
                    mobFlow: 0,
                    shopAddr: '',
                    logo: [],
                    shopHt: [],
                    EWC: [],
                    sort:''
            },
            ruleValidate: {
                shopType: [
                    { required: true, message: '请选择店铺类型', trigger: 'change' }
                ],
                selectShop: [
                    { required: true, message: '请选择连锁店铺', trigger: 'change' },
                ],
                shopName: [
                    { required: true, message: '请填写店铺名', trigger: 'blur' }
                ],
                shopNickName: [
                    { required: true, message: '请填写店名简称', trigger: 'blur' }
                ],
                shoper: [
                    { required: true, message: '请填写店长', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请填写手机号', trigger: 'blur' },
                    {
                        pattern:'/^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/', message:'手机格式不正确',trigger:'blur'
                    }
                ],
                shopArea: [
                    { required: true, message: '请填写店铺面积', trigger: 'blur' }
                ],
                staffCount: [
                    { required: true, message: '请填写员工数', trigger: 'blur' }
                ],
                dayFlow: [
                    { required: true, message: '请填写日均流水', trigger: 'blur' }
                ],
                mobFlow: [
                    { required: true, message: '请填写移动支付流水', trigger: 'blur' }
                ],
                shopAddr: [
                    { required: true, message: '店铺地址不能为空', trigger: 'blur' }
                ],
                logo: [
                    { required: true, message: '店铺logo不能为空', trigger: 'blur' }
                ],
                shopHt: [
                    { required: true, message: '店铺租赁合同不能为空', trigger: 'blur' }
                ],
                EWC: [
                    { required: true, message: '二维码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        len(){
            return this.Items.length > 1 ? true : false
        }
    },
    methods:{
        handleAdd () {
                this.index++;
                this.Items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
        handleRemove (index) {
            this.Items[index].status = 0;
        },
        Next(){
            this.$router.push('/addPrepay')
        }
    }
}
</script>

<style lang="less">
.addBasic{
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
    .InfoType{
      margin-bottom: 0.25rem;
      font-size: 0.36rem;
      font-weight: bold;
      color: #111;
      padding-left: 0.11rem;
      box-sizing: border-box;
      position: relative;
      &::before{
          content: '';
          display: inline-block;
          width: 0.04rem;
          height: 0.3rem;
          background: #F94F3E;
          position: absolute;
          left: -0.02rem;
          top: 50%;
          margin-top: -0.13rem;
          border-radius: 0.1rem;
      }
      .addType{
          margin-left: 0.74rem;
          font-size: 0.34rem;
          font-weight: 400;
          color:#111;
          .ivu-radio-wrapper{
              font-size: 0.34rem;
            font-weight: 400;
            color:#111;
          }
          .ivu-radio-inner{
             width: 0.32rem;
            height: 0.32rem;
          }
          .ivu-radio-inner:after{
              width: 100%;
              height: 100%;
              left: 0;
              top:0;
              border-radius: 0.32rem;
              display: inherit;
              background-color: #41D170;
          }
          .ivu-radio-checked:hover .ivu-radio-inner{
                 border-color: #41D170;
          }
      }
    }
    .ivu-form .ivu-form-item-label{
        font-size: 0.34rem;
        font-weight: 400;
        color: #111;
        width: 2.6rem!important;
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
        margin-left: 2.6rem!important;
    }
    .ivu-input-wrapper,.ivu-select,.ivu-input-number{
        width: 90%;
    }
     .ivu-select-item{
        font-size: 0.3rem!important;
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
    .next{
        width: 95%;
        margin: 0 auto;
         margin-bottom: 1.53rem;
        .ivu-btn-primary{
            width: 100%;
            background: #F94F3E;
            color: #fff;
            font-size: 0.34rem;
            font-weight: 400;
            border-radius: 0.5rem;
            height: 0.98rem;
            border-color:#F94F3E; 
        }
    }
}
</style>
