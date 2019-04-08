<template>
  <!-- 店铺管理》 审核预付提现  开户信息 -->
  <div class="OpeningAccountInformation">
    <div class="add_content_box1">
      <Form ref="formOpeningInformation" :model="formOpeningInformation" label-position="top">
        <Row>
          <Col :span="8">
            <FormItem label="商户类型:">
              <Select v-model="formOpeningInformation.businessLicenseType" placeholder="请选择商户类型">
                <Option
                  v-for="(item,index) in shop_type"
                  :key="index"
                  :value="item.shopType"
                >{{item.shopType}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="商户全称:">
              <Input v-model="formOpeningInformation.name" placeholder="请输入商户全称"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="商户简称:">
              <Input v-model="formOpeningInformation.abbreviation" placeholder="简称"></Input>
            </FormItem>
          </Col>
          <Col :span="8" v-show="tx_false">
            <FormItem label="执照类型:">         <!--//预付金显示，提现隐藏-->
              <Select v-model="formOpeningInformation.businessLicenseType" placeholder="请选择营业执照类型">
                <Option
                  v-for="(item,index) in License_type"
                  :key="index"
                  :value="item.LicenseType"
                >{{item.LicenseType}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="营业执照编号:">
              <Input v-model="formOpeningInformation.businessLicense" placeholder></Input>
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem label="法人姓名:">
              <Input v-model="formOpeningInformation.legalPersonName" placeholder></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="法人身份证号码:">
              <Input v-model="formOpeningInformation.identityCard" placeholder></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="法人电话:">
              <Input v-model="formOpeningInformation.linkmanPhone" placeholder></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="法人邮箱:">
              <Input v-model="formOpeningInformation.linkmanEmail" placeholder></Input>
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem label="商户一级分类:">
              <Select v-model="formOpeningInformation.oneClassify" placeholder="请选择营业执照类型">
                <Option
                  v-for="(item,index) in one_Classify"
                  :key="index"
                  :value="item.classify_1"
                >{{item.classify_1}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="商户二级分类:">
              <Select v-model="formOpeningInformation.twoClassify" placeholder="请选择营业执照类型">
                <Option
                  v-for="(item,index) in two_Classify"
                  :key="index"
                  :value="item.classify"
                >{{item.classify }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="商户所在省:">
              <Select v-model="formOpeningInformation.szProvince" placeholder="选择">
                <Option
                  v-for="(item,index) in sz_province"
                  :key="index"
                  :value="item.Sprovince"
                >{{item.Sprovince}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商户所在市:">
              <Select v-model="formOpeningInformation.szCity" placeholder="选择">
                <Option
                  v-for="(item,index) in sz_city"
                  :key="index"
                  :value="item.Scity"
                >{{item.Scity}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商户所在区:">
              <Select v-model="formOpeningInformation.szDistrict" placeholder="选择">
                <Option
                  v-for="(item,index) in sz_district"
                  :key="index"
                  :value="item.Sdistrict"
                >{{item.Sdistrict}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商户实际地址:">
              <Input v-model="formOpeningInformation.address " placeholder></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="结算银行账号:">
              <Input v-model="formOpeningInformation.settleBank " placeholder></Input>
              <RadioGroup class="tixian" v-model="disabledGroup">
                <div class="chkInput">
                  <Radio label="提现到其他超市银行卡"></Radio>
                  <Select v-model="formOpeningInformation.Supermarket" placeholder="选择">
                    <Option
                      v-for="(item,index) in b_Supermarket"
                      :key="index"
                      :value="item.bName"
                    >{{item.bName}}</Option>
                  </Select>
                </div>
              <div class="chkInput" >
                <Radio  label="提现到其他超市银行卡"></Radio>   
                <Select v-model="formOpeningInformation.OtherSupermarket" placeholder="选择">
                  <Option
                    v-for="(item,index) in Other_Supermarket"
                    :key="index"
                    :value="item.OtherName"
                  >{{item.OtherName}}</Option>
                </Select>
              </div>
              
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="提现方式:">
              <RadioGroup v-model="disabledGroup">
                <Radio label="自动提现"></Radio>
                <Radio class="Radio2" label="手动提现"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="结算银行卡总行:">
              <Input v-model="formOpeningInformation.settleBankTotal  " placeholder></Input>
            </FormItem>
          </Col>
          <Col span="">
            <FormItem label="">
              
            </FormItem>
          </col>
          <Col :span="8">
            <FormItem label="结算银行卡开户省:">
              <Select v-model="formOpeningInformation.openAccountProvince" placeholder="请选">
                <Option
                  v-for="(item,index) in khProvince"
                  :key="index"
                  :value="item.province"
                >{{item.province}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="结算银行卡开户市:">
              <Select v-model="formOpeningInformation.openAccountCity" placeholder="请选">
                <Option v-for="(item,index) in khCity" :key="index" :value="item.city">{{item.city}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="开户支行:">
              <Input v-model="formOpeningInformation.branchBank " placeholder></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="是否三证合一:">
              <Select v-model="formOpeningInformation.ThreeInOne" placeholder="长期有效">
                <Option value="beijing">是</Option>
                <Option value="shanghai">否</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="税务登记证编号:">
              <Input v-model="formOpeningInformation.taxAdministration" placeholder></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="开户许可证编号:">
              <Input v-model="formOpeningInformation.licence " placeholder></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="组织机构代码证:">
              <Input v-model="formOpeningInformation.InsFramework  " placeholder></Input>
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem label="组织机构代理证有效期:">
              <Select v-model="formOpeningInformation.ZuValidity" placeholder="长期有效">
                <Option value="beijing">长期有效</Option>
                <Option value="shanghai">非长期有效</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="具体有效时间:">
              <DatePicker
                :value="formOpeningInformation.validTime"
                format="yyyy/MM/dd"
                type="daterange"
                placeholder="选择日期"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>

        <!-- 图片部分 -->
        <Row>
          <Col>
            <FormItem class="add_top" label="法人身份证:">
              <div class="add_img_box">
                <div class="img_box">
                  <uploadPictures></uploadPictures>
                </div>
                <div class="img_botm_title">正面</div>
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="4">
            <FormItem class="add_top2" label="营业执照:">
              <div class="add_img_box">
                <div class="img_box">
                  <uploadPictures></uploadPictures>
                </div>
                <div class="img_botm_title">营业执照</div>
              </div>
            </FormItem>
          </Col>
          <Col span="4">
              <FormItem label="组织机构代码证:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">组织机构代码证</div>
                </div>
              </FormItem>
            </Col>
         
          <div v-if="uploadImg">    
            <Col span="4">      <!--//预付金显示，提现隐藏-->
              <FormItem label="统一社会信用代码证:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">统一社会信用代码证</div>
                </div>
              </FormItem>
            </Col>
             <Col span="4">
            <FormItem label="税务登记证:">
              <div class="add_img_box">
                <div class="img_box">
                  <uploadPictures></uploadPictures>
                </div>
                <div class="img_botm_title">税务登记证</div>
              </div>
            </FormItem>
          </Col>
            <Col span="4">
              <FormItem label="开户许可证证:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">开户许可证</div>
                </div>
              </FormItem>
            </Col>     <!--//预付金显示，提现隐藏-->
          </div>
          <div v-else>
            <Col span="4">  <!--//预付金隐藏，提现显示-->
              <FormItem label="结算银行卡号:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">结算银行卡号</div>
                </div>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="门头照:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">门头照</div>
                </div>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="收银台找照:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">收银台找照</div>
                </div>
              </FormItem>
            </Col> 
            <Col span="4">
              <FormItem label="收银小票:">
                <div class="add_img_box">
                  <div class="img_box">
                    <uploadPictures></uploadPictures>
                  </div>
                  <div class="img_botm_title">收银小票</div>
                </div>
              </FormItem>
            </Col>     <!--//预付金隐藏，提现显示-->
          </div>
        </Row>
        <Row class="appDiv">
          <div v-if="isShow">
              <Col :span="8">
                <FormItem label="执照类型:">
                  <Select v-model="formOpeningInformation.whether" placeholder="选择">
                    <Option value="beijing">是</Option>
                    <Option value="shanghai">否</Option>
                  </Select>
                </FormItem>
              </Col>              
          </div>
          <div v-else>
            <Col :span="8">
                <FormItem label="是否事业单位:">
                  <Select v-model="formOpeningInformation.whether" placeholder="选择">
                    <Option value="beijing">是</Option>
                    <Option value="shanghai">否</Option>
                  </Select>
                </FormItem>
              </Col> 
            <Col :span="8">
              <FormItem label="组织机构编码:">
              <Input v-model="formOpeningInformation.zuZhiJiGouBianMa" placeholder="12356"></Input>
            </FormItem>
            </Col>
          </div>
          <Col :span="8">
            <FormItem label="服务号:">
              <Select v-model="formOpeningInformation.zuZhiJiGouBianMa" placeholder="选择">
                <Option value="beijing">叮当会员</Option>
                <Option value="shanghai">壁虎互助</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商家公众号APPID:">
              <Input v-model="formOpeningInformation.MerchantAppid" placeholder="12356"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="推荐公众号APPID:">
              <Input v-model="formOpeningInformation.RecommendAppid" placeholder="12356"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="生活号APPID:">
              <Input v-model="formOpeningInformation.LifeAppid" placeholder="12356"></Input>
            </FormItem>
          </Col>
         
        </Row>
      </Form>
      <!-- 进件组件 -->
      <div class="OA_jinJian">
        <IncomingParts></IncomingParts>
      </div>
      <!-- 底部按钮 -->
      <div class="footer">
        <Button class="btn">取消</Button>
        <Button class="btn" type="primary" @click="modal10 = true">保存</Button>
      </div>
      <!-- 弹框 -->
      <Modal v-model="modal10" width="330" class-name="PImodal">
         <div style="text-align:center">
            <p>点击确定将会为<span>xxxx</span>店铺进件易宝支付，是否继续？</p>
        </div>
        <div slot="footer">
          <Button @click="cancel" style="margin-left: 8px">取消</Button>
          <Button @click="modal1 = true" type="primary">保存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import '../../static/css/commonStyle.css'  
import uploadPictures from '../components/uploadPictures'
import IncomingParts from "../components/IncomingParts"

export default {
  name: "OpeningAccountInformation",
  components: {
            uploadPictures,
            IncomingParts
        },

  data() {
    return {
      tx_false: true, //预付金显示，提现隐藏
      uploadImg: true, //预付金显示，提现隐藏
      isShow: true,  //预付金显示，提现隐藏
      modal10: false,
      // 开户信息table
      formOpeningInformation: {
        // disabledGroup: "",

        name: "",         //商户全称
        abbreviation: "",     //商户简称
        businessLicense: "",   //营业执照编号
        businessLicenseType: "", //营业执照类型
        legalPersonName: "",    //法人姓名
        identityCard: "",     //法人身份证号码
        linkmanPhone: "",     //法人电话
        linkmanEmail: "",     //法人邮箱
        oneClassify: "",     //商户一级分类
        twoClassify: "",    //商户二级分类
        szProvince: "",     //商户所在省
        szCity: "",         //商户所在市
        szDistrict: "",      // 商户所在区
        address: "",      //商户实际地址
        taxAdministration: "",  //税务登记证编号
        licence: "",          //开户许可证编号
        InsFramework: "",    //组织机构代码证
        ZuValidity: "",     //组织机构代理证有效期
        validTime: "",     //具体有效时间
        settleBank: "",
        settleBankTotal: "",//结算银行卡总行
        openAccountProvince: "",//结算银行卡开户省
        openAccountCity: "",//结算银行卡开户市
        branchBank: "",     //开户支行
        Supermarket: "",   //提现到其他超市银行卡
        OtherSupermarket: "",//提现到其他超市银行卡
        ThreeInOne: "",     //三证合一
        whether: "",
        MerchantAppid: "",
        RecommendAppid: "",
        LifeAppid: "",
        zuZhiJiGouBianMa: "",  // 组织机构编码

        // img_src: '../../../../static/image/logo.png',
      },
      //   商户类型
      shop_type: [
        { shopType: "企业" },
        { shopType: "个人" },
        { shopType: "事业单位" },
        { shopType: "连锁超市" },
        { shopType: "企业" }
      ],
      //   执照类型
      License_type: [
        { LicenseType: "营业执照" },
        { LicenseType: "营业执照" },
        { LicenseType: "营业执照" },
        { LicenseType: "营业执照" },
        { LicenseType: "营业执照" }
      ],
      // 商户一级分类
      one_Classify: [
        { classify_1: "四川" },
        { classify_1: "上海" },
        { classify_1: "广州" },
        { classify_1: "天津" },
        { classify_1: "安徽" },
        { classify_1: "山东" }
      ],
      // 商户二级分类
      two_Classify: [
        { classify: "四川" },
        { classify: "上海" },
        { classify: "广州" },
        { classify: "天津" },
        { classify: "安徽" },
        { classify: "山东" }
      ],
      // 所在省
      sz_province: [
        { Sprovince: "四川" },
        { Sprovince: "上海" },
        { Sprovince: "广州" },
        { Sprovince: "天津" },
        { Sprovince: "安徽" },
        { Sprovince: "山东" }
      ],
      // 所在市
      sz_city: [
        { Scity: "四川" },
        { Scity: "上海" },
        { Scity: "广州" },
        { Scity: "天津" },
        { Scity: "安徽" },
        { Scity: "山东" }
      ],
      // 所在区
      sz_district: [
        { Sdistrict: "四川" },
        { Sdistrict: "上海" },
        { Sdistrict: "广州" },
        { Sdistrict: "天津" },
        { Sdistrict: "安徽" },
        { Sdistrict: "山东" }
      ],
      // 本超市银行卡
      sz_district: [
        { bName: "四川" },
        { bName: "上海" },
        { bName: "广州" },
        { bName: "天津" },
        { bName: "安徽" },
        { bName: "山东" }
      ],
      // 其他超市银行卡
      sz_district: [
        { OtherName: "四川" },
        { OtherName: "上海" },
        { OtherName: "广州" },
        { OtherName: "天津" },
        { OtherName: "安徽" },
        { OtherName: "山东" }
      ],

      // 开户省
      khProvince: [
        { province: "四川" },
        { province: "上海" },
        { province: "广州" },
        { province: "天津" },
        { province: "安徽" },
        { province: "山东" }
      ],
      // 开户市市
      khCity: [
        { city: "成都" },
        { city: "珠海" },
        { city: "广州" },
        { city: "天津" },
        { city: "安徽" },
        { city: "山东" }
      ]
    };
  },
  methods: {

     ok () {
            this.modal10=false;
            this.modal1=false;
        },
        cancel () {
            console.log(123)
            this.modal10=false;
        },



    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
            } else {
                this.$Message.error('不能为空!');
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
    }
  }
};
</script>

<style type="text/scss" lang="scss">
.OpeningAccountInformation {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0rem 16px;
  box-sizing: border-box;
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
    .OA_jinJian{
      margin-top: .5rem;
    }
      .tixian{
        display: flex;
        justify-content: space-between;

        .chkInput{
          width: 48%;
        }

      }
  .add_img_box {
    
      text-align: left;
      font-size: 0.14rem;
      color: #000000;
      font-family: Source Han Sans CN;
      font-weight: 400;
      margin-top: 0.2rem;
    
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

 .appDiv{
   margin-top: .5rem;
 }
  .ivu-radio-wrapper {
    font-size: .14rem;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-right: .61rem;
    cursor: pointer;
    color: #000000;
    font-weight: bold;
  }

  .ivu-form-item {
      margin: 0 auto .18rem;
  }

}
</style>
