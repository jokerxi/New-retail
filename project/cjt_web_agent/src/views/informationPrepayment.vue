<template>
    <div id="informationPrepayment">
      <!--基础信息-->
      <div class="shop_content">
        <div class="shop_banner">

          <div class="sb_flex_box">
            <div class="sb_title">全部</div>
            <div class="sb_title_right">
              <div><p>总营业额</p><p>{{allTurnover}}元</p></div>
              <div><p>总收入</p><p>{{allIncome}}元</p></div>
            </div>
          </div>

          <div class="sb_flex_box">
            <div class="sb_title">收入</div>
            <div class="sb_title_right">
              <div><p>当日</p><p>{{dayIncome}}元</p></div>
              <div><p>本周</p><p>{{weekIncome}}元</p></div>
              <div><p>本月</p><p>{{monthIncome}}元</p></div>
            </div>
          </div>
        </div>

        <div>
          <Tabs :animated="false">
            <TabPane label="基础信息">
              <div class="sb_container">
                <div class="div1">
                  <span class="xian"></span><span>合作类型</span>
                </div>
                <div @click="withdrawDeposit" class="div2">{{detailsInfo.joinType && detailsInfo.joinType == '1' ? '预付金' : '提现'}}<span>查看详情</span><img src="../../static/images/jiaoH.png" alt=""></div>
                <div class="div1">
                  <span class="xian"></span><span>基础类型</span>
                </div>
                <div class="div3">
                  <ul>
                    <li><span>店铺类型*</span> <span>{{detailsInfo.shopType ? detailsInfo.shopType : ''}}</span></li>
                    <li><span>店铺品牌*</span> <span>{{detailsInfo.chainName ? detailsInfo.chainName : ''}}</span> </li>
                    <li><span>店铺简称*</span> <span>{{detailsInfo.shopShortName ? detailsInfo.shopShortName : ''}}</span></li>
                    <li><span>店长*</span> <span>{{detailsInfo.manager ? detailsInfo.manager : ''}}</span></li>
                    <li><span>绑定手机*</span> <span>{{detailsInfo.telePhone ? detailsInfo.telePhone : ''}}</span></li>
                    <li><span>店铺面积*</span> <span>{{detailsInfo.acreage ? detailsInfo.acreage : ''}}㎡</span></li>
                    <li><span>员工数*</span> <span>{{detailsInfo.workerNum ? detailsInfo.workerNum : ''}}人</span></li>
                    <li><span>日均流水*</span> <span>{{detailsInfo.incomePerDay ? detailsInfo.incomePerDay : ''}}元</span></li>
                    <li><span>移动支付流水*</span> <span>{{detailsInfo.webIncomePerDay ? detailsInfo.webIncomePerDay : ''}}元</span></li>
                    <li><span>店铺地址*</span> <span>{{detailsInfo.address ? detailsInfo.address : ''}}</span></li>
                    <li><span>店铺logo*</span> <div><div class="img_box"><img :src="detailsInfo.logoPic ? detailsInfo.logoPic : ''" /></div></div></li>
                    <li><span>店铺租赁合同*</span>
                      <div>
                        <div v-for="(item,index) in leaseContractPics" class="img_box" :key="index"><img :src="item" /></div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="div4">
                  <div class="div1">
                    <span class="xian"></span><span>付款二维码</span>
                  </div>
                  <div>
                    <ul>
                      <li v-for="item in qrCode"><span>付款二维码*</span> <span>{{item.code}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="div5">
                  <div class="div1">
                    <span class="xian"></span><span>平台设置</span>
                  </div>
                  <div>
                    <ul>
                      <li><span class="a_color">返利比例</span> <span>{{detailsInfo.rebateRatio ? detailsInfo.rebateRatio : ''}}%</span></li>
                      <li><span>固定返利</span> <span>{{detailsInfo.fixedRatio ? detailsInfo.fixedRatio : ''}}%</span></li>
                      <li><span>壁虎</span> <span>￥{{detailsInfo.biHuInsurance ? detailsInfo.biHuInsurance : ''}}%</span></li>
                      <li><span>资金池</span> <span>{{detailsInfo.cashPool ? detailsInfo.cashPool : ''}}</span></li>
                      <li><span class="a_color">服务费</span> <span>{{detailsInfo.serveRatio ? detailsInfo.serveRatio : ''}}%</span></li>
                      <li><span>代理商服务费</span> <span>{{detailsInfo.subServeRatio ? detailsInfo.subServeRatio : ''}}%</span></li>
                      <li><span>平台服务费</span> <span>{{detailsInfo.platformServeRatio ? detailsInfo.platformServeRatio : ''}}%</span></li>
                    </ul>
                  </div>

                </div>
                <div class="div6">
                  <div class="div1">
                    <span class="xian"></span><span>其他</span>
                  </div>
                  <div>
                    <ul>
                      <li><span>超级通账号</span> <span>{{detailsInfo.cjtNo ? detailsInfo.cjtNo : ''}}</span></li>
                      <li><span>超级通密码</span> <span>{{detailsInfo.cjtPassword ? detailsInfo.cjtPassword : ''}}</span></li>
                      <li><span>备注</span> <span>{{detailsInfo.memo ? detailsInfo.memo : ''}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="div7">
                  <div class="div1">
                    <span class="xian"></span><span>员工信息</span>
                  </div>
                  <div v-for="(item,index) in workers" :key="index" class="div7_flex_box">
                    <span>{{item.workerName}}</span><span>{{item.workerPhone}}</span><span>{{item.workerRole}}</span>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane label="开户信息">
              <div class="kh_container">
                <div class="kh_box1">
                  <ul>
                    <li><span>商户全称*</span><span>{{detailsInfo.shopFullName ? detailsInfo.shopFullName : ''}}</span></li>
                    <li><span>营业执照编号*</span><span>{{detailsInfo.businessLicenseNo ? detailsInfo.businessLicenseNo : ''}}</span></li>
                    <li><span>法人姓名*</span><span>{{detailsInfo.legalName ? detailsInfo.legalName : ''}}</span></li>
                    <li><span>法人身份证号*</span><span>{{detailsInfo.legalIdCard ? detailsInfo.legalIdCard : ''}}</span></li>
                    <li><span>法人电话*</span><span>{{detailsInfo.legalTelePhone ? detailsInfo.legalTelePhone : ''}}</span></li>
                    <li><span>法人邮箱*</span><span>{{detailsInfo.legalMail ? detailsInfo.legalMail : ''}}</span></li>
                    <li><span>商户一级分类*</span><span>{{detailsInfo.firstClassify ? detailsInfo.firstClassify : ''}}</span></li>
                    <li><span>商户二级分类*</span><span>{{detailsInfo.secondClassify ? detailsInfo.secondClassify : ''}}</span></li>
                    <li><span>商户所在省*</span><span>{{detailsInfo.shopAtProvince ? detailsInfo.shopAtProvince : ''}}</span></li>
                    <li><span>商户所在市*</span><span>{{detailsInfo.shopAtCity ? detailsInfo.shopAtCity : ''}}</span></li>
                    <li><span>商户所在区*</span><span>{{detailsInfo.shopAtArea ? detailsInfo.shopAtArea : ''}}</span></li>
                    <li><span>商户实际地址*</span><span>{{detailsInfo.shopRealAddress ? detailsInfo.shopRealAddress : ''}}</span></li>
                    <li><span>结算银行账号*</span><span>{{detailsInfo.settleBankAccount ? detailsInfo.settleBankAccount : ''}}</span></li>
                    <li><span>结算银行卡总行*</span><span>{{detailsInfo.settleBank ? detailsInfo.settleBank : ''}}</span></li>
                    <li><span>开户支行*</span><span>{{detailsInfo.openBank ? detailsInfo.openBank : ''}}</span></li>
                    <li><span>开户省*</span><span>{{detailsInfo.openProvince ? detailsInfo.openProvince : ''}}</span></li>
                    <li><span>开户市*</span><span>{{detailsInfo.openCity ? detailsInfo.openCity : ''}}</span></li>
                    <li><span>法人身份证</span>
                      <div>
                        <div class="img_box"><img :src="detailsInfo.idCardFacePic ? detailsInfo.idCardFacePic : ''" /></div>
                        <div class="img_box"><img :src="detailsInfo.idCardBackPic ? detailsInfo.idCardBackPic : ''" /></div>
                      </div>
                    </li>

                    <li><span class="style2">是否三证合一*</span><span>{{detailsInfo.isCardAllIn ? '是' : '否'}}</span></li>
                    <li><span class="style2">营业执照类型*</span><span>{{detailsInfo.idCardBackPic ? detailsInfo.idCardBackPic : ''}}</span></li>

                    <li  v-if="a?true:false"><span class="style2">组织机构代理证有效期*</span><span>{{detailsInfo.organizationValidity ? detailsInfo.organizationValidity : ''}}</span></li>
                    <li  v-if="a?true:false"><span class="style2">具体有效期*</span><span>{{detailsInfo.validTime ? detailsInfo.validTime : ''}}</span></li>

                    <li><span class="style2">营业执照*</span><div><div class="img_box"><img :src="detailsInfo.validTime ? detailsInfo.validTime : ''" /></div></div></li>
                    <li><span class="style2">组织机构代码证*</span><div><div class="img_box"><img :src="detailsInfo.validTime ? detailsInfo.validTime : ''" /></div></div></li>

                    <li v-if="a?true:false"><span class="style2">税务登记证*</span><div><div class="img_box"><img :src="detailsInfo.taxRegistrationPic ? detailsInfo.taxRegistrationPic : ''" /></div></div></li>
                    <li v-if="a?true:false"><span class="style2">统一社会信用代码证*</span><div><div class="img_box"><img :src="detailsInfo.socialCreditPic ? detailsInfo.socialCreditPic : ''" /></div></div></li>
                    <li v-if="a?true:false"><span class="style2">开户许可证*</span><div><div class="img_box"><img :src="detailsInfo.validTime ? detailsInfo.validTime : ''" /></div></div></li>

                    <li><span class="style2">结算银行卡*</span><div><div class="img_box"><img :src="detailsInfo.bankCardPic ? detailsInfo.bankCardPic : ''" /></div></div></li>
                    <li><span class="style2">店铺门头照*</span><div><div class="img_box"><img :src="detailsInfo.doorHeadPic ? detailsInfo.doorHeadPic : ''" /></div></div></li>
                    <li><span class="style2">收银台照*</span><div><div class="img_box"><img :src="detailsInfo.cashierPic ? detailsInfo.cashierPic : ''" /></div></div></li>

                    <li v-if="a?true:false"><span class="style2">收银台小票*</span><div><div class="img_box"><img :src="detailsInfo.invoicePic ? detailsInfo.invoicePic : ''" /></div></div></li>
                    <li><span class="style2">商户类型*</span><span>{{detailsInfo.shopMold ? detailsInfo.shopMold : ''}}</span></li>
                    <li><span class="style2">是否事业单位*</span><span>{{detailsInfo.isGovernment ? detailsInfo.validTime : ''}}</span></li>
                    <li><span class="style2">组织机构编码*</span><span>{{detailsInfo.validTime ? '是' : '否'}}</span></li>
                    <li><span class="style2">服务号*</span><span>{{detailsInfo.servNoBelongTo ? detailsInfo.servNoBelongTo : ''}}</span></li>
                    <li><span class="style2">支付通道*</span><span>{{detailsInfo.settleType ? detailsInfo.settleType : ''}}</span></li>
                    <li><span class="style2">商家公众号APPID*</span><span>{{detailsInfo.pubAppId ? detailsInfo.pubAppId : ''}}</span></li>
                    <li><span class="style2">推荐公众号APPID*</span><span>{{detailsInfo.recommendAppId ? detailsInfo.recommendAppId : ''}}</span></li>
                  </ul>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>

      </div>
    </div>
</template>

<script>
import { shopDetails, shopIncome } from '../api/shop'
    export default{
        name: "informationPrepayment",
        data(){
            return{
                detailsInfo:{},
                a: true,
//                b: '',
                allTurnover:'',
                allIncome:'',
                dayIncome:'',
                weekIncome:'',
                monthIncome:'',
                shop_type: '',
                shop_brand: '喜洋洋便利店',
                shop_abbreviation: '喜洋洋便利店',
                shop_manager: '',
                binding_phone: '',
                shop_area: '',
                people_number: '',
                day_water: '',
                move_water: '',
                address: '',
                log_img_src:'',
                ht_img_src:'',
                qrCode:[{
                    code: '123456456'
                },
                  {
                    code: '123456456'
                  }],
              Rebate_percentage: '',
              fixed_rebate: '',
              capital_pool: '',
              service_charge: '',
              Agent_service: '',
              Platform_service: '',
              cjtId: 'xiyang',
              cjtPwd: '****',
              remark: 'xxxxx',
              employeeList:[],
              merchant_name: '你我他',
              Business_number: '125f3365s998s122233',
              legal_person: '小黄鸭',
              identity_card: '510123210365478965',
              legal_phone: '16598745698',
              legal_mail: '559878965@qq.com',
              one_classify: '海鲜',
              two_classify: '带鱼',
              province: '四川省',
              city: '成都市',
              district: '高新区',
              actual_address: '四川省成都市高新区茂业中心B座706号',
              bank_number: '666666666666',
              bank_all_ad: '中国银行四川总行',
              bank_branch_ad: '中国银行成都市骡马市分行',
              back_province: '四川省',
              back_city: '成都市',

              Three_certificates: '是',
              license_type: '个体工商户',

              valid: '非长久有效',
              valid_date: '2018-12-12 13:13:13',

              img_src: '../../static/images/mbg.png',
              province_type: '个体',
              public_institution: '是',
              OrganizationCodeCertificate: '1234567898565',
              notify_address: '四川省成都市高新区茂业中心B座706号',
              serviceNumber: '1122233',
              PaymentChannels: '微信支付',
              MerchantAPPID: 'clyy',
              RecommendAPPID: 'clyy'
            }
        },
        computed:{
          leaseContractPics(){
            return this.detailsInfo.leaseContractPics && this.detailsInfo.leaseContractPics.length>0 ? this.detailsInfo.leaseContractPics : []
          },
          workers(){
            return this.detailsInfo.workers && this.detailsInfo.workers.length>0 ? this.detailsInfo.workers : []
          }
        },
        created(){
            let shopId = '219511108925661184'
            this.shopDetailsHandle(shopId)
            this.shopIncomeHandle(shopId)
        },
        methods:{
          withdrawDeposit(){
              this.$router.push('/submitRecord')
          },
          // 店铺信息详情
          shopDetailsHandle(payload){
            return new Promise((resolve,reject) => {
              shopDetails(payload).then(res => {
                if(res.data.success){
                   this.detailsInfo = res.data.data;
                   console.log(this.detailsInfo,78787)
                } else{
                  this.$Message.error(res.data.msg)
                }
                    console.log(res,989898)
              }).catch(err => {

              })
            })
          },
          // 店铺收入
          shopIncomeHandle(payload){
            return new Promise((resolve,reject) => {
              shopIncome(payload).then(res => {
                console.log(res.data,999)
                if(res.data.success){
                  console.log(res,7777)
                }
              }).catch(err => {

              })
            })
          }
        }
    }
</script>

<style  lang="less">
  .shop_content{
    .ivu-tabs-nav{
      width: 100%;
      font-size: .38rem;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
      color: #999;
      margin-right: 0;
    }
    .ivu-tabs-ink-bar{
      background-color: #F94F3E;
    }
    .ivu-tabs-tab{
      width: 50%;
      text-align: center;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active {
      color: #111111;
    }


    ul li{
      display: flex;
      width: 100%;
      margin-top: .46rem;
      list-style-type: none;
      font-size: .34rem;
      span:first-child{
        display: block;
        width: 36%;
        text-align: right;
        color: #111111;
      }
      span:nth-child(2){
        display: block;
        width: 60%;
        text-align: left;
        margin-left: .33rem;
        color: #666666;
      }

      div{
        margin-left: .33rem;
        .img_box{
          width: 1.04rem;
          height: 1.04rem;
          vertical-align:middle;
          float: left;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .shop_banner{
      background-color: #F5F5F5;
      height:2.91rem;
      position: relative;

      .sb_title{
        width: .3rem;
        color: #111111;
        font-size: .34rem;
        line-height:1;
        margin: auto 0;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: -.1rem;
          right:-.2rem;
          border-right: 1px #BFBFBF dashed;
          height:.9rem;
        }
      }
      .sb_flex_box{
        display: flex;
        padding: .25rem;
        position: relative;
        &:nth-of-type(1):before {
          content: '';
          position: absolute;
          bottom: 0;
          border-bottom: 1px #BFBFBF dashed;
          width: 95%;
        }
        .sb_title_right{
          display: flex;
          justify-content: space-around;
          width: 100%;
          text-align: center;
        }
      }
    }
    .sb_container{
      .div1{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: .25rem;
        font-size: .36rem;
        color: #111111;
        span:last-child{
          margin-left: .11rem;
        }
        .xian{
          display: block;
          width: .04rem;
          height: .26rem;
          background-color: #F94F3E;
        }
      }
      .div2{
        color: #666666;
        height: .92rem;
        line-height: .92rem;
        font-size: .3rem;
        padding-left: 1.6rem;

        span{
          color: #F94F3E;
          margin-left: 3.6rem;
        }
        img{
          width: .14rem;
          height: .28rem;
          margin-left: .05rem;
          vertical-align: middle;
        }
      }
      .div3{
        padding: 0 .2rem;

      }
      .div4 {
        margin-top: .5rem;
        padding: 0 .2rem;
      }
      .div5 {
        margin-top: .5rem;
        padding: 0 .2rem;
        span{
          color: #666666;
        }
        .a_color{
          color: #111111;
          font-size: .34rem;
        }
      }
      .div6 {
        margin-top: .5rem;
        padding: 0 .2rem;
      }
      .div7 {
        margin: .5rem 0;
        padding: 0 .2rem;
        .div7_flex_box{
          margin-top: .46rem;
          display: flex;
          font-size: .34rem;
          color: #666666;
          justify-content: space-around;
          span:first-child{
            color: #111111;
          }
        }
      }
    }
    .kh_container{
      padding-bottom: .5rem;
      .kh_box1{
        padding: 0 .2rem;
        ul li{
          list-style-type: none;
          .style2{
            width: 50%;
          }
          span:nth-child(2){
            width: 45%;
          }
        }
      }
    }

  }
</style>
