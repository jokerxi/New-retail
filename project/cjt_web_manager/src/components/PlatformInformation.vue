<template>
  <div class="PlatformInformation">
    <!-- 账号管理/店铺管理/平台信息 -->
    <div class="PItitle"><p class="xian">平台信息</p></div>
    <!-- form内容 -->
    <div class="PIcontent">
      <Form ref="formValidate" :model="formPlatformdate" :rules="ruleValidate" label-position="top">
        <Row>
            <div v-show="pingTai">
                <Col span="8">
                    <FormItem label="预付周期（天）:" prop="PrepaidCycle">
                        <Input v-model="formPlatformdate.PrepaidCycle" placeholder=""></Input>  
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="每日额度（元）:" prop="DailyQuota">
                        <Input v-model="formPlatformdate.DailyQuota" placeholder=""></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem class="myInput" label="预警值（元）:" prop="WarningValue">
                        <Input v-model="formPlatformdate.WarningValue" placeholder=""></Input>  
                        <div class="myInput_w">%</div>
                    </FormItem>
                </Col>
            </div>
            
            <Col span="8">
                <FormItem class="myInput" label="返利比例:" prop="RebateRatio">
                    <Input v-model="formPlatformdate.RebateRatio" placeholder=""></Input>
                    <div class="myInput_w">%</div>  
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem class="myInput" label="固定比例:" prop="FixedProportion">
                    <Input v-model="formPlatformdate.FixedProportion" placeholder=""></Input>
                    <div class="myInput_w">%</div>  
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem class="myInput" label="壁虎保险:" prop="HouseLizard">
                    <Input v-model="formPlatformdate.HouseLizard" placeholder=""></Input>
                    <div class="myInput_w">%</div>  
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="资金池:" prop="moneyPool">
                    <!-- <Input v-model="formPlatformdate.moneyPool" placeholder=""></Input>   -->
                    <p class="PImoney">{{formPlatformdate.moneyPool}}%</p>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem class="myInput" label="服务费:" prop="ServiceCharge">
                    <Input v-model="formPlatformdate.ServiceCharge" placeholder=""></Input>
                    <div class="myInput_w">%</div>  
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem class="myInput" label="子公司服务费:" prop="SubsidiaryServiceCharge">
                    <Input v-model="formPlatformdate.SubsidiaryServiceCharge" placeholder=""></Input>
                    <div class="myInput_w">%</div>  
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="平台服务费:" prop="PlatformServiceFee">
                    <!-- <Input v-model="formPlatformdate.moneyPool" placeholder=""></Input>   -->
                    <p class="PImoney">{{formPlatformdate.PlatformServiceFee}}%</p>
                </FormItem>
            </Col>
        </Row>  
        <!-- 上传图片 -->
        <Row>
            <Col>
               <FormItem class="add_top2" label="上传文件:">
                    <div class="add_img_box">
                        <div class="img_box">
                        <uploadPictures></uploadPictures>
                        </div>
                        <div class="img_botm_title">营业执照</div>
                    </div>
                </FormItem>         
            </Col>
        </Row>

        <div class="footer">
            <Button @click="handleReset('formPlatformdate')">重置</Button>
            <Button type="primary" @click="modal10 = true">审核通过</Button>
         </div>    
      </Form>
    </div>
    <!-- 弹框 -->
    <div>
        <Modal
            v-model="modal10"
            width="330"
            class-name="PImodal">
            <p slot="header" style="color:#f60;text-align:center">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <!-- <span>Delete confirmation</span> -->
            </p>
            <div style="text-align:center">
                <p>确定将喜洋洋店铺审核通过？</p>
            </div>
            <div slot="footer">
                <Button style="margin-left: 8px">取消</Button>
                <Button type="primary">确定</Button>
                <!-- <Button type="error" size="large" long >Delete</Button> -->
            </div>
        </Modal>
    </div>
  </div>
</template>
<script>
import '../../static/css/commonStyle.css'
import uploadPictures from '../components/uploadPictures'

export default {
  name: "PlatformInformation",
  components: {
        uploadPictures
            
    },

  data() {
    return {
        pingTai: true, //预付显示 提现隐藏
      formPlatformdate: {
        PrepaidCycle: "",
        DailyQuota: "",
        WarningValue: "",
        RebateRatio: "",
        FixedProportion: "",
        HouseLizard: "",
        moneyPool: "100",
        ServiceCharge: "",
        SubsidiaryServiceCharge: "",
        PlatformServiceFee: "20",
      },
      ruleValidate: {
        PrepaidCycle: [
          { required: true, message: "请输入预付周期", trigger: "blur"}
        ],
        DailyQuota: [
          { required: true, message: "请输入每日额度", trigger: "blur"}
        ],
        WarningValue: [
          { required: true,  message: "请输入预警值", trigger: "blur"}
        ],
        RebateRatio: [
          { required: true, message: "请输入返利比例", trigger: "blur"}
        ],
        FixedProportion: [
          { required: true, message: "请输入固定比例", trigger: "blur"}         
        ],
        HouseLizard: [
          { required: true, message: "请输入壁虎保险", trigger: "blur"}
        ],
        ServiceCharge: [
          { required: true, message: "请输入服务费", trigger: "blur"}
        ],
        SubsidiaryServiceCharge: [
          { required: true, message: "请输入子公司服务费", trigger: "blur"} 
        ]
      },
      modal10: false,
    };
  },
  methods: {
    
  }
};
</script>

<style type="text/scss" lang="scss">
/* 弹框样式修改 */
.PImodal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
    }
    .ivu-modal-header {
        border: none;
        padding: 12px 16px;
        line-height: 1;
    }
    .ivu-modal-body {
        padding: .5rem;
        font-size: .14rem;
        line-height: 1.5;      
        font-size:0.14rem;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:#767676;
    }
    .ivu-modal-footer {
        border: none;
        padding: 12px 18px 12px 18px;
        text-align: center;
    }
}
/* 弹框样式修改 */

 /*form 表单样式修改*/
  .ivu-select-single .ivu-select-selection {
      height: 32px;
  }

  .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
      line-height: 32px;
      color: #151515;
  }
  .ivu-col-span-8 .ivu-form-item {
    padding: 0 50px 0 0px;
  }

  .ivu-form-item {
    //   width: 4.8rem;
      margin: 0 auto .18rem;
  }

  .myInput {
      position: relative;
  }

  .myInput_w {
      display: block;
      position: absolute;
      top: 0rem;
      right: -15px;
  }

  .ivu-form .ivu-form-item-label {
      padding: 0 0 .05rem 0;
      color: #000000;
  }

  .ivu-select-item {
      color: #151515;
  }

  .ivu-input {
      line-height: 1.5;
      padding: 4px 7px;
      font-size: .14rem;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      color: #151515;
      background-color: #fff;
  }

/*日期*/

  .ivu-input-icon {
      height: 32px;
      line-height: 32px;
      font-size: .16rem;
  }

  .ivu-date-picker {
      width: 100%;
  }
/*form 表单样式修改*/


.PlatformInformation {
    // 上传图片
    .add_img_box {
      // height: 1.8rem;
      text-align: left;
      font-size: 0.14rem;
      color: #000000;
      font-family: Source Han Sans CN;
      font-weight: 400;
      margin-top: 0.2rem;
      // overflow: hidden;
      .img_box {
        // width: 1.8rem;
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
    .img_botm_title {
        width: 1.8rem;
        text-align: center;
            }
  .PItitle {
        // border: 1px solid red;
        padding-left: 16px;
        font-size:0.14rem;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:#151515;
    }
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
  .PIcontent{
      padding: 0 16px;
      .PImoney{
            font-size:0.14rem;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color: #000000;
            padding-left: 7px;
            
        }

        .footer {
            padding: 0.9rem 0;
            text-align: center;
            vertical-align: middle

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
