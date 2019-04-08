<template>
  <div class="BasicInformation">
      <!-- 账号管理/店铺管理/基础信息 -->
    <Row class="sm_header_content">
      <Col span="12">
        <div class="header_left">
          <p class="xian">子公司</p>
          <p>{{formValidate.subCompanyName}}</p>
        </div>
      </Col>
      <Col span="12">
        <div class="header_right">
          <p class="xian">合作类型</p>
          <div class="header_right_chk">
            <RadioGroup v-model="formValidate.joinType">
              <Radio label="预付金" style="margin-right:40px"></Radio>
              <Radio label="提现"></Radio>
            </RadioGroup>
          </div>
        </div>
      </Col>
    </Row>
    <Form class="sm_form_box" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
      <Row>
        <Col>
          <p class="xian">基础信息</p>
        </Col>
      </Row>
      <Row class="jc_form">
        <Col :span="8">
          <FormItem label="店铺类型:" prop="shopType">
            <Select v-model="formValidate.shopType" filterable>
              <Option
                v-for="(item,index) in shopType"
                :key="index"
                :value="item.id"
              >{{item.typeName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="连锁名称 :" prop="chainId">
            <Select v-model="formValidate.chainId" filterable>
              <Option
                v-for="(item,index) in chainShop"
                :key="index"
                :value="item.id"
              >{{item.shopName}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="店铺简称:" prop="shopShortName">
            <Input v-model="formValidate.shopShortName"/>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="店长:" prop="manager">
            <Input v-model="formValidate.manager"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="绑定手机:" prop="telePhone">
            <Input v-model="formValidate.telePhone"/>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="店铺面积（㎡）:" prop="acreage">
            <Input v-model="formValidate.acreage"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="员工数（人）:" prop="workerNum">
            <Input v-model="formValidate.workerNum"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="日均流水（元）:" prop="incomePerDay">
            <Input v-model="formValidate.incomePerDay" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="移动支付流水（元）:" prop="webIncomePerDay">
            <Input v-model="formValidate.webIncomePerDay"/>
          </FormItem>
        </Col>
      </Row>
      <Row class="bottom_xian">
        <Col span="4">
          <FormItem class="add_top2" label="店铺logo:">
            <div class="add_img_box">
              <div class="img_box">
                <Upload @setPic="setLogo" :imgList="LogoPics" />
              </div>
              <div class="img_botm_title">logo</div>
            </div>
          </FormItem>
        </Col>
        <Col span="20">
          <FormItem label="店铺租赁合同:">
            <div class="add_img_box1" style="margin-top:0.2rem">
              <div class="img_box1">
               <Upload @setPic="setleaseContractPics" :imgList="LeaseContractPics" />
              </div>
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row class="cont_footer">
        <Col span="8">
          <div>
            <p class="xian">付款二维码</p>
            <FormItem class="payInput" label v-for="(item, index) in formValidate.items" :key="index" v-if="item.status">
              <Input v-model="item.value" />
              <Button  v-if="index==0" @click="handleAdd"  class="payCode" :size="buttonSize">
                <span class="iconfont icon-tianjialanseicon"></span>
              </Button>
              <Button v-else @click="handleRemove(index)" class="payCode" :size="buttonSize">
                 <Icon type="ios-remove" style="color:#0061e2;font-weight:bold;line-height:1em" size="18"></Icon>
              </Button>
            </FormItem>
          </div>
        </Col>
        <Col span="12" offset="3">
          <p class="xian">其他</p>
          
            <FormItem label="超级通账号:">
              <Input v-model="formValidate.cjtNo"/>
            </FormItem>
        
            <FormItem label="超级通密码:">
              <Input v-model="formValidate.cjtPassword"/>
            </FormItem>
          
          <FormItem label="备注:">
            <Input
              class="textarea"
              v-model="formValidate.memo"
              type="textarea"
              :autosize="{minRows: 8,maxRows: 9}"
              placeholder="备注"
            ></Input>
          </FormItem>
        </Col>  
      </Row>
       <div class="staff">
      <div class="PItitle"><p class="xian">员工信息</p></div>
      <div class="yuangong">
          <Row>
              <Col span="8"  
              v-for="(parent,index) in formValidate.workers"
              :key="index">
                <FormItem >
                  <Col span="6" style="margin:0 5px">
                    <Select v-model="parent.workerRole">
                        <Option v-for="(child,index) in platfromRole" 
                        :key="index" 
                        :value="child.id">{{child.name}}</Option>
                    </Select>
                  </Col> 
                  <Col span="6" style="margin:0 5px">    
                     <Input v-model="parent.workerName" />
                  </Col>  
                  <Col span="6" style="margin:0 5px">    
                     <Input v-model="parent.workerPhone" />
                  </Col>  
                </FormItem>  
              </Col>
          </Row>
      </div>
      <div class="footer">
          <Button class="btn">取消</Button>
          <Button class="btn" type="primary" @click="SaveBasic">保存</Button>
      </div>    
  </div>
    </Form>
  </div>
</template>

<script>
import "../../static/css/commonStyle.css";
import uploadPictures from "../components/uploadPictures";
import Upload from '../components/upload'
export default {
  name: "BasicInformation",
  components: {
    uploadPictures,
    Upload
  },
  props:{
    shopType:{
      type:Array,
      default(){
        return []
      }
    },
    chainShop:{
      type:Array,
      default () {
        return []
      }
    },
    details:{
      type:Object
    },
    platfromRole:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      index: 1,
      buttonSize: "small",
      LogoPics:[],
      LeaseContractPics:[],
      formValidate: {
        subCompanyId: "",
        subCompanyName: "",
        joinType: "",
        shopType: "",
        shopTypeName: "",
        chainId: "",
        chainName:'',
        shopShortName:'',
        manager:'',
        telePhone:'',
        acreage:'',
        workerNum:'',
        incomePerDay:'',
        webIncomePerDay:'',
        logoPic:'',
        leaseContractPics:[],
        qrCodes:[],
        cjtNo:'',
        cjtPassword:'',
        memo:'',
        workers:[],
        items: []
    },
      ruleValidate: {
        shopType: [{
            type:'number',
            required: true, 
            message: "请选择", 
            trigger: "change" 
          }],
        chainId: [{  
            required: true, 
            message: "请选择", 
            trigger: "change" 
          }],
        shopShortName: [{ 
            required: true, 
            message: "请输入店铺简称", 
            trigger: "blur" 
          }],
        manager: [{ 
            required: true,
            message: "请输入店长姓名",
            trigger: "blur"
          }],
        telePhone: [{
            required: true,
            message: "请绑定手机号码", 
            trigger: "blur" 
          },
          {
            type: 'string',
            pattern:/^1[3456789]\d{9}$/,
            message:'手机格式不正确',
            trigger:'blur'
          }],
        acreage: [{
            required: true,
            message: "请输入店铺面积",
            trigger: "blur"
          },
          {
            pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message:'面积为数字格式',
            trigger:'blur'
          }],
        workerNum: [{
            required: true,
            message: "请输入员工人数",
            trigger: "blur"
          },
          {
            pattern:/^[+]{0,1}(\d+)$/,
            message:'员工数为整数',
            trigger:'blur'
          }],
        incomePerDay: [{
            required: true,
            message: "请输入日均流水",
            trigger: "blur"
          },
          {
            pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message:'日均流水为数字格式',
            trigger:'blur'
          }],
        webIncomePerDay: [{
            required: true,
            message: "请输入移动支付流水",
            trigger: "blur"
          },
          {
            pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message:'移动支付流水为数字格式',
            trigger:'blur'
          }]
      }
    };
  },
  watch:{
    details:function(newVal,oldVal){
      this.setForm(newVal)
    }
  },
  methods: {
     handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
          }
      })
    },
    handleReset (name) {
                this.$refs[name].resetFields();
            },        
    handleAdd () {
      this.index++;
      this.formValidate.items.push({
        value: '',
        index: this.index,
        status: 1
      });
    },
    handleRemove (index) {
      this.formValidate.items[index].status = 0;
    },
    //  表单赋值
     setForm(value){
       this.formValidate.subCompanyId = value.subCompanyId
       this.formValidate.subCompanyName = value.subCompanyName
       this.formValidate.joinType = value.joinType == 1 ? '预付金' : '提现'
       this.formValidate.shopType = value.shopType
       this.formValidate.shopTypeName = value.shopTypeName
       this.formValidate.chainId = value.chainId
       this.formValidate.chainName = value.chainName
       this.formValidate.shopShortName = value.shopShortName
       this.formValidate.manager = value.manager
       this.formValidate.telePhone = value.telePhone
       this.formValidate.acreage = value.acreage
       this.formValidate.workerNum = value.workerNum
       this.formValidate.incomePerDay = value.incomePerDay
       this.formValidate.webIncomePerDay = value.webIncomePerDay
       this.formValidate.logoPic = value.logoPic
       this.formValidate.leaseContractPics = value.leaseContractPics
       this.formValidate.qrCodes = value.qrCodes
       this.formValidate.cjtNo = value.cjtNo
       this.formValidate.cjtPassword = value.cjtPassword
       this.formValidate.memo = value.memo
       value.workers.forEach(item => {
         this.formValidate.workers.push({
            workerId: item.workerId,
            workerName: item.workerName,
            workerPhone: item.workerPhone,
            workerRole: Number(item.workerRole)
         })
       })
      // 二维码赋值
      if(value.qrCodes && value.qrCodes.length>0){
        value.qrCodes.forEach((item,index) => {
        this.formValidate.items.push({
          value: item,
          index: index,
          status: 1
        })
      })
      } else {
         this.formValidate.items.push({
            value: '',
            index: 0,
            status: 1
          })
      }
      // 图片赋值
      this.LogoPics.push({uid:1,url:value.logoPic,name:'',status:200})
      value.leaseContractPics.forEach((item,index) => {
        this.LeaseContractPics.push({uid:index,url:item,name:'',status:200})
      })
     },
    //  设置logo
    setLogo(list){
      this.formValidate.logoPic = list.url
    },
    // 设置租赁合同
    setleaseContractPics(list){
      let _this = this
      list.forEach(item => {
       _this.formValidate.leaseContractPics.push(item)
      })
    },
    // 保存基本信息
    SaveBasic(){
      let qrCode =[]
      this.formValidate.items.forEach(item => {
        qrCode.push(item.value)
      })
      let param = {
        joinType:this.formValidate.joinType == '预付金' ? 1 : 2,
        shopType:this.formValidate.shopType,
        chainId:this.formValidate.chainId,
        shopShortName:this.formValidate.shopShortName,
        manager:this.formValidate.manager,
        telePhone:this.formValidate.telePhone,
        acreage:this.formValidate.acreage,
        workerNum:this.formValidate.workerNum,
        incomePerDay:this.formValidate.incomePerDay,
        webIncomePerDay:this.formValidate.webIncomePerDay,
        logoPic:this.formValidate.logoPic,
        leaseContractPics:this.formValidate.leaseContractPics,
        qrCodes:qrCode,
        cjtNo:this.formValidate.cjtNo,
        cjtPassword:this.formValidate.cjtPassword,
        memo:this.formValidate.memo,
        workers:this.formValidate.workers
      }
      this.$emit('setBasic',param)
    }
  }
};
</script>

<style type="text/scss" lang="scss">
.BasicInformation {
  .ivu-tabs-nav .ivu-tabs-tab {
    display: inline-block;
    height: 100%;
    padding: 8px 16px;
    margin-right: 16px;
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease-in-out;
  }

  background-color: #ffffff;
  /*form 表单样式修改*/
  .ivu-select-single .ivu-select-selection {
    height: 32px;
  }
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    line-height: 32px;
    color: #151515;
  }
  .ivu-form-item-error-tip {
    padding-top: 0;
  }
  
  .ivu-form-item-content {
    line-height: 40px;
    position: relative;
    padding-right: 45px;
    box-sizing: border-box;
  }
  .ivu-form-item {
    // width: 4.8rem;
    margin: 0.18rem 0 0;
  }
  .ivu-form .ivu-form-item-label {
    padding: 0 0 0.05rem 0;
    color: #000000;
  }
  .ivu-select-item {
    color: #151515;
  }
  .ivu-select {
    // border: 1px solid #E7EEEF;
  }
  .ivu-input {
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 0.14rem;
    border: 1px solid #e7eeef;
    border-radius: 4px;
    color: #151515;
    background-color: #fff;
  }
  .ivu-btn-small {
    // padding: 0rem 7px .02rem;
    height: 30px;
    font-size: 0.14rem;
    border-radius: 3px;
    color: #0061e2;
    position: absolute;
    right: 0;
    top:6px;
    .payInput {
      display: flex;
      justify-content: flex-start;
    }
  }
  .ivu-btn > span {
    vertical-align: middle;
    font-size: 0.14rem;
  }
  .jc_form {
    margin-top: 14px;
  }

    padding-bottom: 1rem;
    box-sizing: border-box;
    .xian {
      font-size: 0.14rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #000000;
      border-left: 4px solid #0061e2;
      vertical-align: bottom;
      padding-left: 0.06rem;
      box-sizing: border-box;
    }
    .sm_header_content {
      border-bottom: 1px solid #e7eeef;
      height: 60px;
      .header_left {
        font-size: 0.14rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #000000;
        height: 80px;
        padding-left: 16px;
        :nth-last-child(1) {
          padding-top: 5px;
          box-sizing: border-box;
        }
      }
      .header_right {
        font-size: 0.14rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #000000;
      }
      .header_right_chk {
        padding-top: 5px;
      }
      /*单选按钮lable*/
      .header_right_chk > label > span {
        color: #151515;
        font-size: 0.14rem;
      }
      .header_right_chk > input {
        display: none;
        margin-left: 0.82rem;
      }
      .header_right_chk > label {
        position: relative;
        margin-right: 0.82rem;
      }

      .header_right_chk > label::before {
        display: inline-block;
        content: "";
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid rgb(219, 219, 219);
        margin-right: 6px;
        vertical-align: bottom;
      }

      .header_right_chk > input:checked + label::before {
        background-color: white;
      }

      .header_right_chk > input:checked + label::after {
        display: inline-block;
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        left: 3px;
        bottom: 2px;
        background-color: #4471fe;
      }
    }

    .sm_form_box {
      margin-top: 20px;
      padding-left: 16px;
      .cont_footer {
        margin-top: 0.24rem;
      }
    }
    .bottom_xian {
      border-bottom: 1px solid #e7eeef;
      padding: 0.18rem 0;
      box-sizing: border-box;
    }
    .add_img_box {

      text-align: center;
      font-size: 0.14rem;
      color: #000000;
      font-family: Source Han Sans CN;
      font-weight: 400;
      margin-top: 0.2rem;
      // overflow: hidden;
      .img_box {
        width: 1.8rem;
        height: 1.85rem;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
        }
      }
      .img_botm_title {
        width: 1.8rem;
        text-align: center;
      }
    }
    .staff{
        width: 100%;
        height: 100%;
        padding-left: 16px;
        background-color: #ffffff;
        padding-bottom: .8rem;
        margin-top: 18px;
        .PItitle{
          border-top:1px solid #e7eeef;
          padding-top: 12px;
        }
        .yuangong{
            margin-top: 14px;
            .ivu-col-span-8 .ivu-form-item {
                padding: 0 20px 0 0px;
            }
            .ivu-select {       
                width: 1.2rem;        
                font-size: .14rem;
            }
            .ivu-input-wrapper {
                font-size: .14rem;
                width: 1.2rem;
                
                
            }
            input::-webkit-input-placeholder {
                color: #151515;
                font-size: .14rem;
            }
        }
        .footer {
            padding: 0.9rem 0;
            text-align: center;
            button:nth-child(2) {
                margin-left: 0.2rem;
            }
            .btn {
                width: 0.9rem;
            }
        }
    }

  
}
</style>
