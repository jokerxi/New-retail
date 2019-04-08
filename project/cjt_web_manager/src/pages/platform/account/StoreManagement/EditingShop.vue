<template>
    <div class="EditingShop">
        <!-- 表单类型-->
        <div class="EditingType">
            <span :class="{'active':currentType == item.id}" v-for="item in EditingTypes" :key="item.id" @click="ChangeShow(item.id)">{{item.title}}</span>
        </div>
        <!-- 表单内容 -->
        <Form class="sm_form_box" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
            <!-- 基础信息 -->
            <div class="BasicInformation" v-show="currentType == 1">
                <Row class="sm_header_content">
                    <Col span="12">
                        <div class="header_left">
                        <p class="xian">子公司</p>
                        <p style="margin-top:5px">{{formValidate.subCompanyName}}</p>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="header_right">
                        <p class="xian">合作类型</p>
                        <div class="header_right_chk">
                            <RadioGroup v-model="formValidate.joinType">
                            <Radio :label="1" :value='1' style="margin-right:40px">预付金</Radio>
                            <Radio :label="2" :value='2'>提现</Radio>
                            </RadioGroup>
                        </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p class="xian">基础信息</p>
                    </Col>
                </Row>
                <Row class="jc_form">
                    <Col :span="8">
                        <FormItem label="店铺类型:" prop="shopType">
                            <Select disabled v-model="formValidate.shopType" filterable>
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
                            <Select disabled v-model="formValidate.chainId" @on-change="changeChain" filterable :clearable="true">
                                <Option v-for="(ch,index) in chainShop" :key="index" :value="String(ch.chainId)">{{ch.shopName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="店铺简称:" prop="shopShortName">
                            <Input v-model="formValidate.shopShortName"/>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="店长:" prop="manager">
                            <Input v-model="formValidate.manager"/>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="绑定手机:" prop="telePhone">
                            <Input v-model="formValidate.telePhone"/>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem 
                        label="店铺面积（㎡）:" 
                        prop="acreage"
                        :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '面积为数字', trigger: 'blur'} : [{required: true, message: '店铺面积必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '面积为数字', trigger: 'blur'}]"
                        >
                            <Input v-model="formValidate.acreage"/>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem 
                        label="员工数（人）:" 
                        prop="workerNum"
                        :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$/,message: '员工数为整数', trigger: 'blur'} : [{required: true, message: '员工数必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$/,message: '员工数为整数', trigger: 'blur'}]" 
                        >
                            <Input v-model="formValidate.workerNum"/>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem 
                        label="日均流水（元）:" 
                        prop="incomePerDay"
                         :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '日均流水为数字', trigger: 'blur'} : [{required: true, message: '日均流水必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '日均流水为数字', trigger: 'blur'}]"
                        >
                            <Input v-model="formValidate.incomePerDay" />
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem 
                        label="移动支付流水（元）:" 
                        prop="webIncomePerDay"
                        :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '移动支付流水为数字', trigger: 'blur'} : [{required: true, message: '移动支付流水必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '移动支付流水为数字', trigger: 'blur'}]"
                        >
                            <Input v-model="formValidate.webIncomePerDay"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="bottom_xian">
                    <Col span="4">
                        <FormItem class="add_top2" label="店铺logo:">
                        <div class="add_img_box">
                            <div class="img_box">
                                <Upload @setPic="setLogo" @delPic="DelLogo" :imgList="LogoPics" />
                            </div>
                            <div class="img_botm_title">logo</div>
                        </div>
                        </FormItem>
                    </Col>
                    <Col span="20">
                        <FormItem label="店铺租赁合同:">
                        <div class="add_img_box1" style="margin-top:0.2rem">
                            <div class="img_box1">
                                <Upload @setPic="setleaseContractPics"  @delPic="DelleaseContract" :imgList="LeaseContractPics"/>
                            </div>
                        </div>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="cont_footer">
                    <Col span="8">
                        <div>
                            <p class="xian">付款二维码</p>
                            <FormItem class="payInput" label v-for="(item,index) in items" :key="index" v-show="item.status">
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
                            <Input disabled v-model="formValidate.cjtNo"/>
                        </FormItem>
                        <FormItem label="超级通密码:">
                            <Input disabled v-model="formValidate.cjtPassword"/>
                        </FormItem>
                        <FormItem label="备注:">
                            <Input
                                class="textarea"
                                v-model="formValidate.memo"
                                type="textarea"
                                :autosize="{minRows: 8,maxRows: 9}"
                                placeholder="备注"/>
                        </FormItem>
                    </Col>  
                </Row>
                <div class="staff" v-show="types=='edit'">
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
                </div>
            </div>
            <!-- 开户信息 -->
            <div class="OpeningAccountInformation" v-show="currentType == 2">
                <div class="add_content_box1">
                    <Row type="flex" align="top" class="code-row-bg">
                        <Col :span="8">
                            <FormItem label="商户类型:">
                                <Select v-model="formValidate.shopMold" placeholder="请选择商户类型" filterable>
                                    <Option v-for="license in licenseType" :key="license.id" :value="license.id">{{license.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户全称:">
                                <Input v-model="formValidate.shopFullName" placeholder="请输入商户全称"/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户简称:">
                                <Input v-model="formValidate.shopShortName" placeholder="简称" readonly/>
                            </FormItem>
                        </Col>
                        <Col :span="8" v-show="formValidate.shopMold == 3">
                            <FormItem label="执照类型:">        
                                <Select v-model="formValidate.licenseType" filterable placeholder="请选择营业执照类型">
                                    <Option :key="1" :value="1">营业执照</Option>
                                    <Option :key="2" :value="2">统一社会信用代码证</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="营业执照编号:">
                                <Input v-model="formValidate.businessLicenseNo" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="法人姓名:">
                                <Input v-model="formValidate.legalName" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="法人身份证号码:">
                                <Input v-model="formValidate.legalIdCard" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="法人电话:" prop="legalTelePhone">
                                <Input v-model="formValidate.legalTelePhone" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="法人邮箱:" prop="legalMail">
                                <Input v-model="formValidate.legalMail" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户一级分类:">
                                <Select v-model="formValidate.firstClassify" @on-change="selectSecond" filterable placeholder="商户一级分类">
                                    <Option v-for="first in firstClassify" :key="first.id" :value="first.id">{{first.classifyName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户二级分类:">
                                <Select v-model="formValidate.secondClassify" filterable placeholder="商户二级分类">
                                     <Option v-for="second in secondClassify" :key="second.id" :value="second.id">{{second.classifyName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户所在省:">
                                <Select v-model="formValidate.shopAtProvince" filterable @on-change="selectCity" placeholder="选择">
                                    <Option v-for="pro in provinces" :key="pro.id" :value="pro.id">{{pro.areaName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户所在市:">
                                <Select v-model="formValidate.shopAtCity" filterable @on-change="selectArea" placeholder="选择">
                                   <Option v-for="ct in city" :key="ct.id" :value="ct.id">{{ct.areaName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户所在区:">
                                <Select v-model="formValidate.shopAtArea" filterable placeholder="选择">
                                    <Option v-for="ar in area" :key="ar.id" :value="ar.id">{{ar.areaName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="商户实际地址:">
                                <Input v-model="formValidate.shopRealAddress "/>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="结算银行账号:">
                                <Input v-model="formValidate.settleBankAccount " placeholder/>
                                <div>
                                    <RadioGroup style="width:100%" v-model="formValidate.settleType">
                                        <Radio style="width:50%" label="提现到本超市银行卡"></Radio>
                                        <Radio  label="提现到其他超市银行卡"></Radio>                          
                                    </RadioGroup>
                                </div>
                                <Row :gutter="24">
                                     <Col :span="24">
                                        <Select v-show="formValidate.settleType == '提现到其他超市银行卡'" v-model="formValidate.settleShopId" filterable placeholder="选择">
                                            <Option v-for="other in otherChain" :key="other.id" :value="other.id">{{other.shopName}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Col>
                        <!-- <Col :span="8">
                            <FormItem label="提现方式:">
                                <RadioGroup v-model="formValidate.withdrawType">
                                    <Radio label="自动提现"></Radio>
                                    <Radio class="Radio2" label="手动提现"></Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col> -->
                        <Col :span="8">
                            <FormItem label="结算银行卡总行:">
                                <Select v-model="formValidate.settleBank" @on-change="changeBank" filterable placeholder="请选择">
                                     <Option v-for="bank in bankList" :key="bank.id" :value="bank.id">{{bank.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="结算银行卡开户省:">
                                <Select v-model="formValidate.openProvince" @on-change="selectCity" filterable placeholder="请选">
                                    <Option v-for="opro in provinces" :key="opro.id" :value="opro.id">{{opro.areaName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="结算银行卡开户市:">
                                <Select v-model="formValidate.openCity" @on-change="changeCity" filterable placeholder="请选">
                                    <Option v-for="oct in city" :key="oct.id" :value="oct.id">{{oct.areaName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="开户支行:">
                                <Select v-model="formValidate.openBank" filterable placeholder="请选">
                                    <Option v-for="obank in openBankList" :key="obank.bankCode" :value="obank.bankName">{{obank.bankName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="是否三证合一:">
                                <Select v-model="formValidate.isCardAllIn">
                                    <Option :value="1">是</Option>
                                    <Option :value="2">否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8" v-show="formValidate.shopMold == 3">
                            <FormItem label="税务登记证编号:">
                                <Input v-model="formValidate.taxRegistrationNo" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8" v-show="formValidate.shopMold == 3">
                            <FormItem label="开户许可证编号:">
                                <Input v-model="formValidate.accountPermitPicNo" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8" v-show="formValidate.shopMold == 3">
                            <FormItem label="组织机构代码证:">
                                <Input v-model="formValidate.organizationNo" placeholder/>
                            </FormItem>
                        </Col>
                        <Col :span="8" v-show="formValidate.shopMold == 3">
                            <FormItem label="组织机构代理证有效期:">
                                <Select v-model="formValidate.organizationValidity" placeholder="长期有效">
                                    <Option :value="1">长期有效</Option>
                                    <Option :value="2">非长期有效</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :span="8" v-show="formValidate.organizationValidity == 2 ">
                            <FormItem label="具体有效时间:">
                                <DatePicker type="datetime" v-model="formValidate.validTime" format="yyyy-MM-dd HH:mm:ss" style="width:100%" placeholder="选择时间" ></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                        <!-- 图片部分 -->
                    <Row>
                        <Col span="4">
                            <FormItem class="add_top" label="法人身份证:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setIdCardFacePic"  @delPic="DelidCardFacePic" :imgList="idCardFacePics"/>
                                    </div>
                                    <div class="img_botm_title">正面</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem class="add_top" label="">
                                <div class="add_img_box" style="padding-top:0.2rem">
                                    <div class="img_box">
                                        <upload @setPic="setIdCardBackPic"  @delPic="DelidCardBackPic" :imgList="idCardBackPics"/>
                                    </div>
                                    <div class="img_botm_title">反面</div>
                                </div>
                            </FormItem>
                        </Col>
                        </Row>
                        <Row>
                        <Col span="4">
                            <FormItem class="add_top2" label="营业执照:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setBusinessLicensePic"  @delPic="DelBusinessLicensePic" :imgList="businessLicensePics"/>
                                    </div>
                                    <div class="img_botm_title">营业执照</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="组织机构代码证:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setOrganizationPic"  @delPic="DelOrganizationPic" :imgList="organizationPics"/>
                                    </div>
                                    <div class="img_botm_title">组织机构代码证</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4" v-show="formValidate.shopMold == 3"> 
                            <FormItem label="统一社会信用代码证:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setSocialCreditPic"  @delPic="DelSocialCreditPic" :imgList="socialCreditPics"/>
                                    </div>
                                    <div class="img_botm_title">统一社会信用代码证</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4" v-show="formValidate.shopMold == 3">
                            <FormItem label="税务登记证:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                    <upload @setPic="setTaxRegistrationPic"  @delPic="DelTaxRegistrationPic" :imgList="taxRegistrationPics"/>
                                    </div>
                                    <div class="img_botm_title">税务登记证</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4" v-show="formValidate.shopMold == 3">
                            <FormItem label="开户许可证:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                       <upload @setPic="setAccountPermitPic"  @delPic="DelAccountPermitPic" :imgList="accountPermitPics"/>
                                    </div>
                                    <div class="img_botm_title">开户许可证</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4"  v-show="formValidate.shopMold==2">
                            <FormItem label="结算银行卡号:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setBankCardPic"  @delPic="DelBankCardPic" :imgList="bankCardPics"/>
                                    </div>
                                    <div class="img_botm_title">结算银行卡号</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4" v-show="formValidate.shopMold==2">
                            <FormItem label="门头照:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setDoorHeadPic"  @delPic="DelDoorHeadPic" :imgList="doorHeadPics"/>
                                    </div>
                                    <div class="img_botm_title">门头照</div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4" v-show="formValidate.shopMold==2">
                            <FormItem label="收银台照:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setCashierPic"  @delPic="DelCashierPic" :imgList="cashierPics"/>
                                    </div>
                                    <div class="img_botm_title">收银台照</div>
                                </div>
                            </FormItem>
                        </Col> 
                        <Col span="4" v-show="formValidate.shopMold==2">
                            <FormItem label="收银台小票:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                        <upload @setPic="setInvoicePic"  @delPic="DelInvoicePic" :imgList="invoicePics"/>
                                    </div>
                                    <div class="img_botm_title">收银台小票</div>
                                </div>
                            </FormItem>
                        </Col> 
                    </Row>
                    <Row class="appDiv">
                        <Col :span="8">
                            <FormItem label="是否事业单位:">
                                <Select v-model="formValidate.isGovernment" placeholder="选择">
                                    <Option :value="1">是</Option>
                                    <Option :value="2">否</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col :span="8">
                            <FormItem label="组织机构编码:">
                                <Input v-model="formValidate.organizationCode" />
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="服务号:">
                                <Select v-model="formValidate.servNoBelongTo" @on-change="changeAppId" placeholder="选择">
                                    <Option v-for="servNo in AllWechat" :value="servNo.id" :key="servNo.id">{{servNo.appName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="商家公众号APPID:">
                                <Input v-model="formValidate.pubAppId" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="推荐公众号APPID:">
                                <Input v-model="formValidate.recommendAppId" />
                            </FormItem>
                        </Col>
                        <Col span="8" v-show="formValidate.shopMold==2">
                            <FormItem label="生活号APPID:">
                                <Input v-model="formValidate.pid" />
                            </FormItem>
                        </Col>
                   </Row>
                </div>
                <div v-show="types=='edit'" class="OA_jinJian">
                    <IncomingParts :list="listChannel" :shopname="formValidate.shopFullName" :types='IncomeType' @Incomehandle="Incomehandle"></IncomingParts>
                </div>
            </div>
            <!-- 平台信息 -->
            <div class="PlatformInformation" v-show="currentType == 3">
                <div class="PItitle"><p class="xian">平台信息</p></div>
                <div class="PIcontent">
                    <Row>
                        <div v-show="formValidate.joinType == 1">
                            <Col :span="8">
                                <FormItem 
                                  label="预付周期（天）:" 
                                  prop="cycle" 
                                  :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$/,message: '预付周期为整数', trigger: 'blur'} : [{required: true, message: '预付周期必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$/,message: '员工数为整数', trigger: 'blur'}]" 
                                  >
                                    <Input v-model="formValidate.cycle" @on-blur="getcycle"/> 
                                </FormItem>
                            </Col>
                            <Col :span="8">
                                <FormItem 
                                  label="每日额度（元）:" 
                                  prop="quotaDaily"
                                  :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '每日额度为数字', trigger: 'blur'} : [{required: true, message: '每日额度必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '每日额度为数字', trigger: 'blur'}]"
                                  >
                                    <Input v-model="formValidate.quotaDaily" @on-blur="getquotaDaily" />
                                </FormItem>
                            </Col>
                            <Col :span="8">
                                <FormItem 
                                  class="myInput" 
                                  label="" 
                                  prop="warningRatio"
                                  :rules="formValidate.joinType == 2 ? {pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '预警值为数字', trigger: 'blur'} : [{required: true, message: '预警值必填！', trigger: 'blur'},{pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,message: '预警值为数字', trigger: 'blur'}]"
                                  >
                                    <span slot="label" class="warning">预警值（元）: <span style="color:#4471FE">{{formValidate.warning}}元</span></span>
                                    <Input v-model="formValidate.warningRatio" @on-blur="getwarningRatio" /> 
                                    <div class="myInput_w">%</div>
                                </FormItem>
                            </Col>
                        </div>
                        <Col :span="8">
                            <FormItem class="myInput" label="返利比例:" prop="rebateRatio">
                                <Input v-model="formValidate.rebateRatio" @on-blur="getrebateRatio" />
                                <div class="myInput_w">%</div>  
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem class="myInput" label="固定比例:" prop="fixedRatio">
                                <Input v-model="formValidate.fixedRatio" @on-blur="getfixedRatio"/>
                                <div class="myInput_w">%</div>  
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem class="myInput" label="壁虎保险:" prop="biHuInsurance">
                                <Input v-model="formValidate.biHuInsurance" @on-blur="getbiHuInsurance" />
                                <div class="myInput_w">%</div>  
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="资金池:">
                                <p class="PImoney">{{formValidate.cashPool}}%</p>
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem class="myInput" label="服务费:" prop="serveRatio">
                                <Input v-model="formValidate.serveRatio" @on-blur="getserveRatio" />
                                <div class="myInput_w">%</div>  
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem class="myInput" label="子公司服务费:" prop="subServeRatio">
                                <Input v-model="formValidate.subServeRatio" @on-blur="getsubServeRatio" />
                                <div class="myInput_w">%</div>  
                            </FormItem>
                        </Col>
                        <Col :span="8">
                            <FormItem label="平台服务费:" >
                                <p class="PImoney">{{formValidate.platformServeRatio}}%</p>
                            </FormItem>
                        </Col>
                    </Row>  
                    <!-- 上传图片 -->
                    <Row>
                        <Col>
                        <FormItem class="add_top2" label="上传文件:">
                                <div class="add_img_box">
                                    <div class="img_box">
                                         <upload @setPic="setUpload"  @delPic="DelUpload" :imgList="uploadFiles"/>
                                    </div>
                                </div>
                            </FormItem>         
                        </Col>
                    </Row>
                </div>
            </div>
            <div v-show="types == 'edit'" class="footer">
                <Button class="queXiao">取消</Button>
                <Button class="edbtn" type="primary" @click="editShopHandle">保存</Button>
            </div> 
            <div v-show="types == 'audit'" class="footer">
                <Button class="queXiao">取消</Button>
                <Button class="edbtn" type="primary" @click="OpenVer">审核通过</Button>
            </div> 
        </Form>
        <!-- 弹框 -->
        <Modal v-model="modal" width="350" class-name="PImodal">
            <div style="text-align:center">
                <p v-for="(txt, index) in IncomeText" :key='index' style="margin:40px 20px 10px;color:#ff0000">{{txt}}</p>
            </div>
            <div slot="footer">
            <Button type="primary" @click="closeIncome">确定</Button>
            </div>
        </Modal>
        <Modal v-model="modal1" width="350" class-name="PImodal">
            <div class="edTk">
               确定将{{formValidate.shopFullName}}审核通过？
            </div>
            <div slot="footer">
                <Button @click="closeVer">取消</Button>
               <Button type="primary" @click="Useverify">确定</Button>
            </div>
        </Modal>
    </div>
    
</template>

<script>
import moment from 'moment'
import "../../../../../static/css/commonStyle.css";
import Upload from '../../../../components/upload'
import IncomingParts from "../../../../components/IncomingParts"
import { shopDetail,shopEdit,listChannel,shopJoinSuccess,shopJoin,verify,chainList } from '@/api/shopManage'
import { shopTypes, showBank, platformRole, licenseType, showArea, showClassify, showAllWechat, yopBank, listByChain } from '@/api/public'

export default {
    name: "EditingShop",
    components: {
        Upload,
        IncomingParts
    },
    data(){
        return{
            currentType:1,
            params:{},
            IncomeType:'shop',
            types:this.$route.query.type,
            modal:false,
            modal1:false,
            IncomeText:[],
            IncomeStats:false,
            IsShow:true,
            licenseType:[],
            shopType:[], //店铺类型
            chainShop:[], //连锁店铺
            shopDetail:{}, //预付金基本信息
            provinces:[],
            otherChain:[],
            openBankList:[],
            listChannel:[],
            bankParam:{
              headBankId:'',
              bankProvince:'',
              bankCity:''
            },
            areaParam:{
                parentId: '',
                name: '',
                page: '',
                pageSize:''
            },
            city:[],
            area:[],
            firstClassify:[],
            secondClassify:[],
            bankList:[],
            shopId:this.$route.query.id,
            platfromRole:[],
            EditingTypes:[
                {
                   id:1,
                   title:'基础信息'
                },
                {
                    id:2,
                    title:'开户信息'
                },
                {
                    id:3,
                    title:'平台信息'
                }

            ],
            index: 1,
            buttonSize: "small",
            LogoPics:[],
            AllWechat:[],
            LeaseContractPics:[],
            idCardFacePics:[],
            idCardBackPics:[],
            businessLicensePics:[],
            taxRegistrationPics:[],
            socialCreditPics:[],
            organizationPics:[],
            accountPermitPics:[],
            doorHeadPics:[],
            cashierPics:[],
            invoicePics:[],
            bankCardPics:[],
            uploadFiles:[],
            items: [],
            formValidate: {
                id:'',
                optId:'',
                subCompanyId: '',
                subCompanyName:'',
                joinType: '',
                status:'',
                shopType: '',
                chainId: '',
                shopName:'',
                shopShortName: '',
                manager:'',
                telePhone:'',
                acreage:'',
                workerNum:'',
                incomePerDay:'',
                webIncomePerDay:'',
                address:'',
                logoPic:'',
                leaseContractPics:[],
                qrCodes:[],
                memo:'',
                cjtNo:'',
                cjtPassword:'',
                workers:[],
                licenseType:'',
                legalTelePhone:'',
                legalMail:'',
                openProvince:'',
                openCity:'',
                openBank:'',
                idCardFacePic:'',
                idCardBackPic:'',
                bankCardPic:'',
                isCardAllIn:'',
                taxRegistrationNo:'',
                accountPermitPicNo:'',
                accountPermitPic:'',
                organizationNo:'',
                organizationValidity:'',
                validTime:'',
                businessLicensePic:'',
                taxRegistrationPic:'',
                socialCreditPic:'',
                organizationPic:'',
                doorHeadPic:'',
                cashierPic:'',
                invoicePic:'',
                shopFullName:'',
                businessLicenseNo:'',
                legalName:'',
                legalIdCard:'',
                firstClassify:'',
                secondClassify:'',
                shopAtProvince:'',
                shopAtCity:'',
                shopAtArea:'',
                shopRealAddress:'',
                shopMold:'',
                isGovernment:'',
                organizationCode:'',
                pubAppId:'',
                recommendAppId:'',
                servNoBelongTo:'',
                pid:'',
                uploadFile:'',
                settleType:'',
                settleShopId:'',
                withdrawType:'',
                accountId:'',
                rebateRatio:'',
                fixedRatio:'',
                biHuInsurance:'',
                cashPool:'',
                serveRatio:'',
                subServeRatio:'',
                platformServeRatio:'',
                settleAccountId:'',
                settleAccountName:'',
                settleBankAccount:'',
                settleBank:'',
                settleOpenProvince:'',
                settleOpenCity:'',
                loanAccountId:'',
                cycle:'',
                quotaDaily:'',
                warningRatio:'',
                warning:'',
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
                legalTelePhone:[
                    {
                        type: 'string',
                        pattern:/^1[3456789]\d{9}$/,
                        message:'手机格式不正确',
                        trigger:'blur'
                    }
                ],
                legalMail:[
                    {
                       type: 'email',
                        message:'邮箱格式不正确！',
                        trigger: 'blur'
                    }
                ],
                rebateRatio: [{
                    required: true,
                    message: "返利比例不能为空",
                    trigger: "blur"
                },
                {
                    pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
                    message:'返利比例为数字格式',
                    trigger:'blur'
                }],
                fixedRatio: [{
                    required: true,
                    message: "固定比例不能为空",
                    trigger: "blur"
                },
                {
                    pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
                    message:'固定比例为数字格式',
                    trigger:'blur'
                }],
                biHuInsurance: [{
                    required: true,
                    message: "壁虎保险不能为空",
                    trigger: "blur"
                },
                {
                    pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
                    message:'壁虎保险为数字格式',
                    trigger:'blur'
                }],
                serveRatio: [{
                    required: true,
                    message: "服务费不能为空",
                    trigger: "blur"
                },
                {
                    pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
                    message:'服务费为数字格式',
                    trigger:'blur'
                }],
                 subServeRatio: [{
                    required: true,
                    message: "子公司服务费不能为空",
                    trigger: "blur"
                },
                {
                    pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,
                    message:'子公司服务费为数字格式',
                    trigger:'blur'
                }]
            }
        }
    },
    watch:{
        shopDetail:function(newVal,oldVal){
            this.setForm(newVal)
        }
    },
    created(){
        // console.log(this.shopId,111)
        this.getShopDetail(this.shopId)
        this.getshopType({})
        this.getChainList()
        this.getplatformRole(2)
        this.getlicenseType()
        this.getArea({},'province')
        this.getShowClassify({},'first')
        this.getBankList({name:'',page:'',pageSize:''})
        if(this.types == 'edit'){
            // 219511108925661184
           this.getlistChannel(this.shopId)
        }
    },
    methods: {
    // 表单显示
    ChangeShow(id){
      this.currentType = id;
      this.IsShow = !this.IsShow
    },
    closeIncome(){
      this.modal = false
    },
    closeVer(){
        this.modal1 = false
    },
    OpenVer(){
       this.modal1 = true
    },
    // 获取连锁Id
    changeChain(value){
      console.log(value,'连锁')
    },
    //   获取店铺详情
    getShopDetail(payload){
        return new Promise((resolve,reject) => {
            shopDetail(payload).then(res => {
              if(res.data.success){
                  this.shopDetail = res.data.data
                  console.log(this.shopDetail,888)
              } else {
                  this.$Message.error(res.data.msg)
              }
            }).catch(err => {
            })
        })
    },
    // 获取店铺类型
    getshopType(payload){
        return new Promise((resolve,reject) => {
        shopTypes(payload).then(res => {
            if(res.data.success){
                this.shopType = res.data.data
            } else {
            this.$Message.error(res.data.msg)
            }
        }).catch(err => {
            this.$Message.error(err)
        })
        })
    },
    // 获取连锁列表
    getChainList(){
        return new Promise((resolve,reject) => {
            chainList().then(res => {
                if(res.data.success){
                  this.chainShop = res.data.data
                console.log(this.chainShop,'连锁列表')
                } else{
                    this.$Message.error(res.data.msg)
                }
            }).catch(err => {
               this.$Message.error(err)
            })
        })
    },
    // 获取平台角色选项
    getplatformRole(payload){
        return new Promise((resolve,reject) => {
            platformRole(payload).then(res => {
              if(res.data.success){
                this.platfromRole = res.data.data
              } else {
                  this.$Message.error(res.data.msg)
              }
            }).catch(err => {
               this.$Message.error(err)
            })
        })
    },
    // 获取营业执照类型
    getlicenseType(){
        return new Promise((resolve,reject) => {
            licenseType().then(res => {
                if(res.data.success){
                    let _this = this
                    let data = res.data.data;
                    data.forEach(item => {
                        _this.licenseType.push({
                            id:Number(item.id),
                            name:item.name
                        })
                    })
                } else {
                    this.$Message.error(res.data.msg)
                }
            }).catch(err => {
                 this.$Message.error(err)
            })
        })
    },
    // 获取地区列表
    getArea(payload,type){
       return new Promise((resolve,reject) => {
          showArea(payload).then(res => {
             if(res.data.success){
                 if(type == 'province'){
                     this.provinces = res.data.data
                 } else if(type == 'city') {
                     this.city = res.data.data
                 } else if(type == 'area') {
                     this.area = res.data.data
                 }
             } else {
                 this.$Message.error(res.data.msg)
             }
          }).catch(err => {
            this.$Message.error(err)
          })
       })
    },
    // 改变银行
    changeBank(value){
      this.bankParam.headBankId = value
      this.getYopBank(this.bankParam)
    },
    // 选择城市
    selectCity(id){
      let param = {
          parentId:id
      }
      this.bankParam.bankProvince = id
      this.getYopBank(this.bankParam)
      this.getArea(param,'city')
    },
    changeCity(value){
      this.bankParam.bankCity = value
      this.getYopBank(this.bankParam)
    },
     // 选择区域
    selectArea(id){
      let param = {
          parentId:id
      }
      this.getArea(param,'area')
    },
    // 获取商户列表
    getShowClassify(payload,type){
       return new Promise((resolve,reject) => {
           showClassify(payload).then(res => {
              if(res.data.success){
                  if(type == 'first'){
                      this.firstClassify = res.data.data
                  } else if(type == 'second') {
                      console.log(res.data.data,'二级分类')
                      this.secondClassify = res.data.data
                  }
              } else {
                  this.$Message.error(res.data.msg)
              }
           }).catch(err => {
             this.$Message.error(err)
           })
       })
    },
    // 获取商户二级列表
    selectSecond(id){
         let param = {
          parentId:id
      }
      this.getShowClassify(param,'second')
    },
    // 获取服务号列表
    getshowAllWechat(payload){
       return new Promise((resolve,reject) => {
           showAllWechat(payload).then(res => {
               if(res.data.success){
                 this.AllWechat = res.data.data
               } else {
                  this.$Message.error(res.data.msg)
               }
           }).catch(err => {
              this.$Message.error(err)
           })
       })
    },
    // 获取银行列表
    getBankList(payload){
     return new Promise((resolve,reject) => {
        showBank(payload).then(res => {
            console.log('获取总行列表')
            if(res.data.success){
                this.bankList = res.data.data
                console.log(this.bankList,'银行总行列表')
            } else {
                this.$Message.error(res.data.msg)
            }
        }).catch(err => {
            this.$Message.error(err)
        })
     })
    },
    // 获取易宝支行
    getYopBank(payload){
       return new Promise((resolve,reject) => {
           yopBank(payload).then(res => {
             if(res.data.success){
                 this.openBankList = res.data.data
             } else {
                 this.$Message.error(res.data.msg)
             }
           }).catch(err => {
                this.$Message.error(err)
           })
       })
    },
    // 获取编辑店铺其他店铺下拉
    getlistByChain(payload){
      return new Promise((resolve,reject) => {
        listByChain(payload).then(res => {
          if(res.data.success){
              this.otherChain = res.data.data
          } else {
              this.$Message.error(res.data.msg)
          }
        }).catch(err => {
          this.$Message.error(err)
        })
      })
    },
    // 改变appId
    changeAppId(id){
     let param  = this.AllWechat.filter(item => {
          return item.id == id
      })[0]  
      this.formValidate.pubAppId = param.appId
      this.formValidate.recommendAppId = param.appId
    },
    // 动态添加二维码
    handleAdd () {
      this.index++;
      this.items.push({
        value: '',
        index: this.index,
        status: 1
      });
    },
    // 删除二维码
    handleRemove (index) {
      this.items[index].status = 0;
    },
    //  表单赋值
    setForm(value){
        // 查询二级下拉框
        this.getshowAllWechat(value.subCompanyId)
        this.getlistByChain({chainId:value.chainId})
        this.bankParam.headBankId = 3
        this.bankParam.bankProvince = value.openProvince
        this.bankParam.bankCity = value.openCity
        this.getYopBank(this.bankParam)
        if(value.shopAtProvince && value.shopAtProvince != ''){
           this.selectCity(value.shopAtProvince)
        }
        if(value.shopAtCity && value.shopAtCity != ''){
           this.selectArea(value.shopAtCity)
        }
        if(value.firstClassify && value.firstClassify != ''){
           this.selectSecond(value.firstClassify)
        }
        if(value.openProvince && value.openProvince != ''){
           this.selectCity(value.openProvince)
        }
        // 变量赋值
       this.formValidate.id = value.id == null ? '' : value.id
       this.formValidate.optId = value.optId == null ? '' : value.optId
       this.formValidate.subCompanyId = value.subCompanyId == null ? '' : value.subCompanyId
       this.formValidate.subCompanyName = value.subCompanyName == null ? '' : value.subCompanyName
       this.formValidate.joinType = value.joinType == null ? '' : value.joinType
       this.formValidate.status = value.status == null ? '' : value.status
       this.formValidate.shopType = value.shopType == null ? '' : value.shopType
       this.formValidate.chainId = value.chainId == null ? '' : value.chainId
       this.formValidate.shopName = value.shopName == null ? '' : value.shopName
       this.formValidate.shopShortName = value.shopShortName == null ? '' : value.shopShortName
       this.formValidate.manager = value.manager == null ? '' : value.manager
       this.formValidate.telePhone = value.telePhone == null ? '' : value.telePhone
       this.formValidate.acreage = value.acreage == null ? '' : String(value.acreage)
       this.formValidate.workerNum = value.workerNum == null ? '' : String(value.workerNum)
       this.formValidate.incomePerDay = value.incomePerDay == null ? '' : String(value.incomePerDay)
       this.formValidate.webIncomePerDay = value.webIncomePerDay == null ? '' : String(value.webIncomePerDay)
       this.formValidate.address = value.address == null ? '' : value.address
       this.formValidate.qrCodes = value.qrCodes == null ? [] : value.qrCodes
       this.formValidate.cjtNo = value.cjtNo == null ? '' : value.cjtNo
       this.formValidate.cjtPassword = value.cjtPassword == null ? '' : value.cjtPassword
       this.formValidate.memo = value.memo == null ? '' : value.memo
       this.formValidate.licenseType = value.licenseType == null ? '' : value.licenseType
       this.formValidate.legalTelePhone = value.legalTelePhone == null ? '' : value.legalTelePhone
       this.formValidate.legalMail = value.legalMail == null ? '' : value.legalMail
       this.formValidate.openProvince = value.openProvince == null ? '' : value.openProvince
       this.formValidate.openCity = value.openCity == null ? '' : value.openCity
       this.formValidate.openBank = value.openBank == null ? '' : value.openBank
       this.formValidate.isCardAllIn = value.isCardAllIn ? 1 : 2
       this.formValidate.taxRegistrationNo = value.taxRegistrationNo == null ? '' : value.taxRegistrationNo
       this.formValidate.accountPermitPicNo = value.accountPermitPicNo == null ? '' : value.accountPermitPicNo
       this.formValidate.organizationNo = value.organizationNo == null ? '' : value.organizationNo
       this.formValidate.organizationValidity = value.organizationValidity == null ? '' : value.organizationValidity
       this.formValidate.validTime = value.validTime == null ? '' : value.validTime
       this.formValidate.shopFullName = value.shopFullName == null ? '' : value.shopFullName
       this.formValidate.businessLicenseNo = value.businessLicenseNo == null ? '' : value.businessLicenseNo
       this.formValidate.legalName = value.legalName == null ? '' : value.legalName
       this.formValidate.legalIdCard = value.legalIdCard == null ? '' : value.legalIdCard
       this.formValidate.firstClassify = value.firstClassify == null ? '' : value.firstClassify
       this.formValidate.secondClassify = value.secondClassify == null ? '' : value.secondClassify
       this.formValidate.shopAtProvince = value.shopAtProvince == null ? '' : value.shopAtProvince
       this.formValidate.shopAtCity = value.shopAtCity == null ? '' : value.shopAtCity
       this.formValidate.shopAtArea = value.shopAtArea == null ? '' : value.shopAtArea
       this.formValidate.shopRealAddress = value.shopRealAddress == null ? '' : value.shopRealAddress
       this.formValidate.shopMold = value.shopMold == null ? '' : value.shopMold
       this.formValidate.isGovernment = value.isGovernment ? 1 : 2
       this.formValidate.organizationCode = value.organizationCode == null ? '' : value.organizationCode
       this.formValidate.pubAppId = value.pubAppId == null ? '' : value.pubAppId
       this.formValidate.recommendAppId = value.recommendAppId == null ? '' : value.recommendAppId
       this.formValidate.servNoBelongTo = value.servNoBelongTo == null ? '' : value.servNoBelongTo
       this.formValidate.pid = value.pid == null ? '' : value.pid
       this.formValidate.settleType = value.settleType == 1 ? '提现到本超市银行卡' : '提现到其他超市银行卡'
       this.formValidate.settleShopId = value.settleShopId == null ? '' : value.settleShopId
       this.formValidate.withdrawType = value.withdrawType == 1 ? '自动提现' : '手动提现'
       this.formValidate.accountId = value.accountId
       this.formValidate.rebateRatio = value.rebateRatio == null ? '' : String(value.rebateRatio)
       this.formValidate.fixedRatio = value.fixedRatio == null ? '' : String(value.fixedRatio)
       this.formValidate.biHuInsurance = value.biHuInsurance == null ? '' : String(value.biHuInsurance)
       this.formValidate.cashPool = value.cashPool == null ? '' : (value.rebateRatio-value.fixedRatio-value.biHuInsurance).toFixed(2)
       this.formValidate.serveRatio = value.serveRatio == null ? '' : String(value.serveRatio)
       this.formValidate.subServeRatio = value.subServeRatio == null ? '' : String(value.subServeRatio)
       this.formValidate.platformServeRatio = value.platformServeRatio == null ? '' : (value.serveRatio-value.subServeRatio).toFixed(2)
       this.formValidate.settleAccountId = value.settleAccountId
       this.formValidate.settleAccountName = value.settleAccountName
       this.formValidate.settleBankAccount = value.settleBankAccount
       this.formValidate.settleBank = value.settleBank == null ? '' : Number(value.settleBank)
    //    this.formValidate.settleBank = 3
       this.formValidate.settleOpenProvince = value.settleOpenProvince == null ? '' : value.settleOpenProvince
       this.formValidate.settleOpenCity = value.settleOpenCity == null ? '' : value.settleOpenCity
       this.formValidate.loanAccountId = value.loanAccountId
       this.formValidate.cycle = value.cycle == null ? '' : String(value.cycle)
       this.formValidate.quotaDaily = value.quotaDaily == null ? '' : String(value.quotaDaily)
       this.formValidate.warningRatio = value.warningRatio == null ? '' : String(value.warningRatio)
       this.formValidate.warning = value.cycle*value.quotaDaily*value.warningRatio/100
       this.formValidate.uploadFile = value.uploadFile
        
        // 图片赋值
        this.formValidate.logoPic = value.logoPic
        this.formValidate.leaseContractPics = value.leaseContractPics
        this.formValidate.idCardFacePic = value.idCardFacePic
        this.formValidate.idCardBackPic = value.idCardBackPic
        this.formValidate.businessLicensePic = value.businessLicensePic
        this.formValidate.taxRegistrationPic = value.taxRegistrationPic
        this.formValidate.socialCreditPic = value.socialCreditPic
        this.formValidate.organizationPic = value.organizationPic
        this.formValidate.accountPermitPic = value.accountPermitPic
        this.formValidate.doorHeadPic = value.doorHeadPic
        this.formValidate.cashierPic = value.cashierPic
        this.formValidate.invoicePic = value.invoicePic
        this.formValidate.bankCardPic = value.bankCardPic

        //    员工编辑
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
        this.items.push({
          value: item,
          index: index,
          status: 1
        })
      })
      } else {
         this.items.push({
            value: '',
            index: 0,
            status: 1
          })
      }
      // 图片处理
      if(value.logoPic != '' && value.logoPic != null){
         this.LogoPics.push({uid:1,url:value.logoPic,name:'',status:200})
      } else {
          this.LogoPics = []
      }
      value.leaseContractPics.forEach((item,index) => {
        this.LeaseContractPics.push({uid:index,url:item,name:'',status:200})
      })
      if(value.idCardFacePic != '' && value.idCardFacePic != null){
          this.idCardFacePics.push({uid:1,url:value.idCardFacePic,name:'',status:200})
      } else {
          this.idCardFacePics = []
      }
      if(value.idCardBackPic != '' && value.idCardBackPic != null){
          this.idCardBackPics.push({uid:1,url:value.idCardBackPic,name:'',status:200})
      } else {
          this.idCardBackPics = []
      }
      if(value.businessLicensePic != '' && value.businessLicensePic != null){
          this.businessLicensePics.push({uid:1,url:value.businessLicensePic,name:'',status:200})
      } else {
          this.businessLicensePics = []
      }
      if(value.taxRegistrationPic != '' && value.taxRegistrationPic != null){
          this.taxRegistrationPics.push({uid:1,url:value.taxRegistrationPic,name:'',status:200})
      } else {
          this.taxRegistrationPics = []
      }
      if(value.socialCreditPic != '' && value.socialCreditPic != null){
          this.socialCreditPics.push({uid:1,url:value.socialCreditPic,name:'',status:200})
      } else {
          this.socialCreditPics = []
      }
      if(value.organizationPic != '' && value.organizationPic != null){
          this.organizationPics.push({uid:1,url:value.organizationPic,name:'',status:200})
      } else {
          this.organizationPics = []
      }
      if(value.accountPermitPic != '' && value.accountPermitPic != null){
          this.accountPermitPics.push({uid:1,url:value.accountPermitPic,name:'',status:200})
      } else {
          this.accountPermitPics = []
      }
      if(value.doorHeadPic != '' && value.doorHeadPic != null){
          this.doorHeadPics.push({uid:1,url:value.doorHeadPic,name:'',status:200})
      } else {
          this.cashierPics = []
      }
      if(value.cashierPic != '' && value.cashierPic != null){
          this.cashierPics.push({uid:1,url:value.cashierPic,name:'',status:200})
      } else {
          this.cashierPics = []
      }
      if(value.invoicePic != '' && value.invoicePic != null){
          this.invoicePics.push({uid:1,url:value.invoicePic,name:'',status:200})
      } else {
          this.invoicePics = []
      }
      if(value.bankCardPic != '' && value.bankCardPic != null){
          this.bankCardPics.push({uid:1,url:value.bankCardPic,name:'',status:200})
      } else {
          this.bankCardPics = []
      }
      if(value.uploadFile != '' && value.uploadFile != null){
          this.uploadFiles.push({uid:1,url:value.uploadFile,name:'',status:200})
      } else {
          this.uploadFiles = []
      }
     },

    //  ============================================= 上传图片操作 ======================
    
    //  设置logo
    setLogo(list){
      this.formValidate.logoPic = list[0].url
    },
    // 设置租赁合同
    setleaseContractPics(list){
      let _this = this
      list.forEach(item => {
       _this.formValidate.leaseContractPics.push(item.url)
      })
    },
    // 设置法人身份证正面
     setIdCardFacePic(list){
      this.formValidate.idCardFacePic = list[0].url
    },
    //设置法人身份证反面
    setIdCardBackPic(list){
      this.formValidate.idCardBackPic = list[0].url
    },
    // 设置营业执照
    setBusinessLicensePic(list){
      this.formValidate.businessLicensePic = list[0].url
    },
    // 设置税务登记
    setTaxRegistrationPic(list){
      this.formValidate.taxRegistrationPic = list[0].url
    },
    // 设置信用代码证4
    setSocialCreditPic(list){
      this.formValidate.socialCreditPic = list[0].url
    },
    // 设置组织机构
    setOrganizationPic(list){
      this.formValidate.organizationPic = list[0].url
    },
    // 设置开户许可证
    setAccountPermitPic(list){
      this.formValidate.accountPermitPic = list[0].url
    },
    // 设置店铺门头照
    setDoorHeadPic(list){
      this.formValidate.doorHeadPic = list[0].url
    },
    // 设置收银台
    setCashierPic(list){
      this.formValidate.cashierPic = list[0].url
    },
    // 设置收银台发票
    setInvoicePic(list){
      this.formValidate.invoicePic = list[0].url
    },
    // 设置结算银行卡
    setBankCardPic(list){
      this.formValidate.bankCardPic = list[0].url
    },
    // 设置上传文件
    setUpload(list){
      this.formValidate.uploadFile = list[0].url
    },

    // ============================= 上传组件删除操作 ===============================

    // 删除上传文件
    DelUpload(list){
      this.formValidate.uploadFile = ''
    },
    // 删除Logo
    DelLogo(list){
        this.formValidate.logoPic = ''
    },
    // 删除租赁合同
    DelleaseContract(list){
        this.formValidate.leaseContractPics=[]
        if(list && list.length > 0){
            list.forEach(item => {
            this.formValidate.leaseContractPics.push(item.url)
            })
        }
    
    },
        // 上传法人身份证正面
    DelidCardFacePic(list){
        this.formValidate.idCardFacePic = ''
    },
        // 上传法人身份证反面
    DelidCardBackPic(list){
        this.formValidate.idCardBackPic = ''
    },
    // 上传营业执照
    DelBusinessLicensePic(list){
        this.formValidate.businessLicensePic = ''
    },
    // 上传组织机构代码证
    DelOrganizationPic(list){
        this.formValidate.organizationPic = ''
    },
    // 上传税务登记证
    DelTaxRegistrationPic(list){
        this.formValidate.taxRegistrationPic = ''
    },
    // 上传统一社会信用代码证
    DelSocialCreditPic(list){
        this.formValidate.socialCreditPic = ''
    },
    // 上传开户许可证
    DelAccountPermitPic(list){
        this.formValidate.accountPermitPic = ''
    },
    // 上传结算银行卡
    DelBankCardPic(list){
        this.formValidate.bankCardPic = ''
    },
    // 上传店铺门头照
    DelDoorHeadPic(list){
        this.formValidate.doorHeadPic = ''
    },
    // 上传收银台照
    DelCashierPic(list){
        this.formValidate.cashierPic= ''
    },
    // 上传收银台小票
    DelInvoicePic(list){
        this.formValidate.invoicePic = ''
    },
    // ======================== 编辑、保存店铺 ======================

    // 编辑店铺信息
    SaveShop(payload){ 
      return new Promise((resolve,reject) => {
         shopEdit(payload).then(res => {
             if(res.data.success){
                 this.$Message.success(res.data.msg)
                this.getShopDetail(this.shopId)
             } else {
                 this.$Message.error(res.data.msg)
             }
         }).catch(err => {
              this.$Message.error(err)
         })
      })
    },
    editShopHandle(){
        this.$refs['formValidate'].validate((valid) => {
            if (valid) {
                let qrCode =[]
                this.items.forEach(item => {
                    if(item.status == 1 ){
                    qrCode.push(item.value)
                }
                })
                this.formValidate.qrCodes = qrCode
                this.formValidate.joinType = this.formValidate.joinType == '预付金' ? 1 : 2
                this.formValidate.settleType = this.formValidate.settleType == '提现到本超市银行卡' ? 1: 2 
                this.formValidate.withdrawType = this.formValidate.withdrawType == '自动提现' ? 1:2
                this.formValidate.validTime = this.formValidate.validTime == '' ? '' : moment(this.formValidate.validTime).format('YYYY-MM-DD HH:MM:SS')
                this.SaveShop(this.formValidate)
            } else {
                this.$Message.error('表单验证失败，请检查填写信息是否正确');
            }
        })
    },

    // ============================================ 获取值计算=================================
    //  获取预警值
    getcycle(){
        this.formValidate.warning = (Number(this.formValidate.cycle) * Number(this.formValidate.quotaDaily) * Number(this.formValidate.warningRatio)/100).toFixed(2)
    },
    getquotaDaily(){
        this.formValidate.warning = (Number(this.formValidate.cycle) * Number(this.formValidate.quotaDaily) * Number(this.formValidate.warningRatio)/100).toFixed(2)
    },
    getwarningRatio(){
        this.formValidate.warning = (Number(this.formValidate.cycle) * Number(this.formValidate.quotaDaily) * Number(this.formValidate.warningRatio)/100).toFixed(2)
    },
    // 获取资金池
    getrebateRatio(){
       this.formValidate.cashPool = (Number(this.formValidate.rebateRatio)-Number(this.formValidate.fixedRatio)-Number(this.formValidate.biHuInsurance)).toFixed(2)
    },
    getfixedRatio(){
       this.formValidate.cashPool = (Number(this.formValidate.rebateRatio)-Number(this.formValidate.fixedRatio)-Number(this.formValidate.biHuInsurance)).toFixed(2)
    },
    getbiHuInsurance(){
       this.formValidate.cashPool = (Number(this.formValidate.rebateRatio)-Number(this.formValidate.fixedRatio)-Number(this.formValidate.biHuInsurance)).toFixed(2)
    },
    // 获取平台服务费
    getserveRatio(){
        this.formValidate.platformServeRatio = (Number(this.formValidate.serveRatio)-Number(this.formValidate.subServeRatio)).toFixed(2)
    },
    getsubServeRatio(){
        this.formValidate.platformServeRatio = (Number(this.formValidate.serveRatio)-Number(this.formValidate.subServeRatio)).toFixed(2)
    },
    // ======================== 进件 ======================
    // 店铺通道
    getlistChannel(payload){
      return new Promise((resolve,reject) => {
          listChannel(payload).then(res => {
              if(res.data.success){
                  this.listChannel = res.data.data
              } else {
                  this.$Message.error(res.data.msg)
              }
          }).catch(err => {
              this.$Message.error(err)
          })
      })
    },
    // 店铺进件
    Incomehandle(value){
      let param = {
          shopId: this.shopId,
          companyId:this.formValidate.subCompanyId,
          shopFullName:this.formValidate.shopFullName,
          shopShortName:this.formValidate.shopShortName,
          legalName:this.formValidate.legalName,
          legalIdCard:this.formValidate.legalIdCard,
          shopLegalPhone:this.formValidate.legalTelePhone,
          shopLegalEmail:this.formValidate.legalMail,
          shopLevel1No:this.formValidate.firstClassify,
          shopLevel2No:this.formValidate.secondClassify,
          shopProvince:this.formValidate.shopAtProvince,
          shopCity:this.formValidate.shopAtCity,
          shopDistrict:this.formValidate.shopAtArea,
          shopAddress:this.formValidate.shopRealAddress,
          cardNo:this.formValidate.settleBankAccount,
          headBankId:this.formValidate.settleBank,
          bankCode:this.formValidate.openBank,
          bankProvince:this.formValidate.openProvince,
          bankCity:this.formValidate.openCity,
          settleType:this.formValidate.settleType == '提现到本超市银行卡' ? 1 : 2,
          settleShopId:this.formValidate.settleShopId,
          withdrawType:this.formValidate.withdrawType == '自动提现' ? 1 : 2,
          isInstitution:this.formValidate.isGovernment,
          servNoBelongTo:this.formValidate.servNoBelongTo,
          pubAppId:this.formValidate.pubAppId,
          recommendAppId:this.formValidate.recommendAppId,
          pid:this.formValidate.pid,
          isCardAllIn:this.formValidate.isCardAllIn,
          shopCertNo:this.formValidate.businessLicenseNo,
          organizationNo:this.formValidate.organizationNo,
          file_IDCARD_FRONT:this.formValidate.idCardFacePic,
          file_IDCARD_BACK:this.formValidate.idCardBackPic,
          file_CORP_CODE:this.formValidate.businessLicensePic,
          file_ORG_CODE:this.formValidate.organizationPic,
          channelId:value,
          businessLicenseType:this.formValidate.shopMold,
          file_SETTLE_BANKCARD:this.formValidate.bankCardPic,
          file_BUSINESS_PLACE:this.formValidate.doorHeadPic,
          file_CASHIER_SCENE:this.formValidate.cashierPic,
          file_TRANSACTION_INVOICE:this.formValidate.invoicePic,
          licenseType:this.formValidate.licenseType,
          taxCode:this.formValidate.taxRegistrationNo,
          accountOpenCode:this.formValidate.accountPermitPicNo,
          orgIsLong:this.formValidate.organizationValidity,
          orgTime:this.formValidate.validTime == '' ? '' : moment(this.formValidate.validTime).format('YYYY-MM-DD HH:MM:SS'),
          file_OP_BANK_CODE:this.accountPermitPic,
          file_UNI_CREDIT_CODE:this.formValidate.socialCreditPic,
          file_TAX_CODE:this.formValidate.taxRegistrationPic,
      }
      this.JoinHandles(param)
    },
    JoinHandles(payload){
      return new Promise((resolve,reject) => {
          shopJoin(payload).then(res =>{
             if(res.data.success){
                 this.$Message.success(res.data.msg)
                 this.getlistChannel(this.shopId)
             } else {
                 if(res.data.data){
                     this.IncomeText = res.data.data;
                      this.modal = true
                 } else {
                     this.$Message.error(res.data.msg);
                 }
             }
          }).catch(err => {
              this.$Message.error(err)
          })
      })
    },
    // ==================== 店铺审核 ======================
    verifyHandle(payload){
      return new Promise((resolve,reject) => {
          verify(payload).then(res => {
              if(res.data.success){
                this.$Message.success(res.data.msg)
                this.getShopDetail(this.shopId)
              } else {
                  this.$Message.error(res.data.msg)
              }
          }).catch(err => {
             this.$Message.error(err)
          })
      })
    },
    // 调用店铺审核
    Useverify(){
        this.$refs['formValidate'].validate((valid) => {
            if (valid) {
                let qrCode =[]
                this.items.forEach(item => {
                    qrCode.push(item.value)
                })
                this.formValidate.qrCodes = qrCode
                this.formValidate.joinType = this.formValidate.joinType == '预付金' ? 1 : 2
                this.formValidate.settleType = this.formValidate.settleType == '提现到本超市银行卡' ? 1: 2 
                this.formValidate.withdrawType = this.formValidate.withdrawType == '自动提现' ? 1:2
                this.formValidate.validTime = this.formValidate.validTime == '' ? '' : moment(this.formValidate.validTime).format('YYYY-MM-DD HH:MM:SS')
                this.verifyHandle(this.formValidate)
            } else {
                this.$Message.error('表单验证失败，请检查填写信息是否正确');
            }
        })
    }
  }
}
</script>

<style type="text/scss" lang="scss">
.EditingShop{
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background-color: #ffffff;
    .EditingType{
        font-size:0.14rem;
        font-family:'Source Han Sans CN';
        font-weight:bold;
        color:#767676;
        height: 47px;
        line-height: 47px;
        border-bottom:1px solid rgba(231,238,239,1);
        span{
            padding: 0 22px;
            display: inline-block;
            position: relative;
            cursor: default;
            &.active{
                color: #151515;
            }
            &.active:before{
                content: '';
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2px;
                background: #4471FE;
            }
        }
    }
    .footer {
            padding: 0 0 0.9rem;
            text-align: center;
            button:nth-child(2) {
                margin-left: 0.2rem;
            }
            button{
                font-size: .2rem;
            }
            .ivu-btn {
                padding: 3px 10px 3px;
            }
           
            .queXiao{
                padding: 3px 24px 4px ;
            }
        }
        .ivu-select-input[disabled]{
            color: #666;
        }
     .ivu-select-single .ivu-select-selection {
            height: 32px;
        }
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
        .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            line-height: 1.5;
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
            position: relative;
        }
        .ivu-radio-wrapper{
            font-size: .14rem;
            font-weight: bold;
            color: #000;
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
    // 基础信息表单样式.BasicInformation {
   .BasicInformation {
        background-color: #ffffff;
    /*form 表单样式修改*/
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
        height:14px;
        line-height: 14px;
        vertical-align: bottom;
        padding-left: 0.1rem;
        box-sizing: border-box;
        margin-top: 32px;
        }
        .sm_header_content {
        border-bottom: 1px solid #e7eeef;
        // height: 60px;
        .header_left {
            font-size: 0.14rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            height: 80px;
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
        // .header_right_chk > label > span {
        //     color: #151515;
        //     font-size: 0.14rem;
        // }
        // .header_right_chk > input {
        //     display: none;
        //     margin-left: 0.82rem;
        // }
        // .header_right_chk > label {
        //     position: relative;
        //     margin-right: 0.82rem;
        // }

        // .header_right_chk > label::before {
        //     display: inline-block;
        //     content: "";
        //     width: 18px;
        //     height: 18px;
        //     border-radius: 50%;
        //     border: 1px solid rgb(219, 219, 219);
        //     margin-right: 6px;
        //     vertical-align: bottom;
        // }

        // .header_right_chk > input:checked + label::before {
        //     background-color: white;
        // }

        // .header_right_chk > input:checked + label::after {
        //     display: inline-block;
        //     content: "";
        //     width: 12px;
        //     height: 12px;
        //     border-radius: 50%;
        //     position: absolute;
        //     left: 3px;
        //     bottom: 2px;
        //     background-color: #4471fe;
        // }
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
//    开户信息样式
   .OpeningAccountInformation {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border-radius: 4px;
        padding: 0rem 16px;
        box-sizing: border-box;
        margin: 26px 0;
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

    }
    .PlatformInformation{
        .PItitle {
            font-size:0.14rem;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:#151515;
            margin: 20px 0 0;
        }
        .xian {
            font-size: 0.14rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            border-left: 4px solid #0061e2;
            height:14px;
            line-height: 14px;;
            vertical-align: bottom;
            padding-left: 0.1rem;
            box-sizing: border-box;
        }
        .myInput {
            position: relative;
        }

        .myInput_w {
            display: block;
            position: absolute;
            top: 0rem;
            right: 25px;
        }
        // .warning{ 
        //     font-size:0.14rem;
        //     font-family:'Source Han Sans CN';
        //     font-weight:500;
        //     line-height:24px;
        //     color:rgba(68,113,254,1);
        //     position: absolute;
        //     top:-22px;
        //     left: 87px;
        // }

    }
}
.PImodal{
    display: flex;
    justify-content: center;
    align-items: center;
    .edTk{
        color: #767676;
        font-size: 14px;
        text-align:center;
        margin:40px 34px 20px;
    }
    .ivu-modal-footer {
        border-top:none;
        button{
            font-size: .2rem;
            padding:3px 24px 4px;
        }
    }
    .ivu-modal {
        top: 0;
    }
}
</style>
