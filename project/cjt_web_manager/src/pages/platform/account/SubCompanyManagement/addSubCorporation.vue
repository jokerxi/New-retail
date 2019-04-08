<template>
    <div class="addSubCorporation">
        <!-- 添加子公司页面 -->
        <div class="add_header">
            <img :src="img_src" alt="">
        </div>
        <div class="add_content">
            <Tabs :animated="false">
                <TabPane label="账号信息">
                    <div class="addAccountInformation">
                        <!-- 添加子公司》账户信息 -->
                        <div class="add_content_box1">
                            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
                                <Row>
                                    <Col :span="8">
                                        <FormItem label="子公司名称:" prop="name">
                                            <Input v-model="formValidate.name" placeholder="请输入子公司名称"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="省总姓名:" prop="provinceName">
                                            <Input v-model="formValidate.provinceName" placeholder="请输入省总姓名"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="联系电话:" prop="phone">
                                            <Input v-model="formValidate.phone" placeholder="请输入电话"
                                                   maxlength="11"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="所属区域:" prop="city">
                                            <Select v-model="formValidate.city" placeholder="请选择区域" filterable>
                                                <Option v-for="item in provinceList" :value="item.id.toString()"
                                                        :key="item.id">
                                                    {{item.areaName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem class="myInput" label="子公司服务费:" prop="serviceCharge">
                                            <Input v-model="formValidate.serviceCharge" placeholder="请输入子公司服务费"
                                            ></Input>
                                            <div class="myInput_w">%</div>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                    </div>
                    <div class="zhangfooter">
                        <Button class="btn zfBtn" @click="cancelModal=true">取消</Button>
                        <Button class="btn" type="primary" @click="saveForm" :loading="saveText=='保存中...'">
                            {{saveText}}
                        </Button>
                    </div>
                </TabPane>
                <TabPane label="开户信息">
                    <div class="AddOpening">
                        <!-- 添加子公司》开户信息 -->
                        <div class="add_content_box1">
                            <Form ref="formOpeningInformation" :model="formOpeningInformation" label-position="top">
                                <Row justify="space-between">
                                    <Col :span="8">
                                        <FormItem label="商户全称:">
                                            <Input v-model="formOpeningInformation.name" placeholder="请输入商户全称"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="商户简称:">
                                            <Input v-model="formValidate.name"
                                                   placeholder="请输入商户简称"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="营业执照编号:">
                                            <Input v-model="formOpeningInformation.businessLicense"
                                                   placeholder="请输入营业执照编号"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="营业执照类型:">
                                            <Select v-model="formOpeningInformation.businessLicenseType"
                                                    placeholder="请选择营业执照类型">
                                                <Option v-for="item in businessLicenseTypeList"
                                                        v-model="item.id.toString()"
                                                        :key="item.id">
                                                    {{item.name}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="法人姓名:">
                                            <Input v-model="formOpeningInformation.legalPersonName"
                                                   placeholder="请输入法人姓名"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="法人身份证号码:">
                                            <Input v-model="formOpeningInformation.identityCard"
                                                   placeholder="请输入法人身份证号码"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="联系人:">
                                            <Input v-model="formOpeningInformation.linkman" placeholder="请输入联系人"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="联系人电话:">
                                            <Input v-model="formOpeningInformation.linkmanPhone" placeholder="请输入联系人电话"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="联系人邮箱:">
                                            <Input v-model="formOpeningInformation.linkmanEmail" placeholder="请输入联系人邮箱"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="商户一级分类:">
                                            <Select v-model="formOpeningInformation.firstClassifySelect"
                                                    placeholder="请选择类型"
                                                    filterable @on-change="firstClassifyChange">
                                                <Option
                                                    v-for="item in firstClassify"
                                                    :key="item.id"
                                                    v-model="item.id.toString()"
                                                >{{item.classifyName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="商户二级分类:">
                                            <Select v-model="formOpeningInformation.secondClassifySelect"
                                                    placeholder="请选择类型"
                                                    filterable
                                                    :disabled="formOpeningInformation.firstClassifySelect==''">
                                                <Option
                                                    v-for="item in secondClassify"
                                                    :key="item.id"
                                                    v-model="item.id.toString()"
                                                >{{item.classifyName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="商户所在省:">
                                            <Select v-model="formOpeningInformation.province" placeholder="请选择省"
                                                    @on-change="areaChange({
                                                    parentId:formOpeningInformation.province,
                                                    obj:cityList ,
                                                    nextObj:districtList,
                                                    })"
                                                    filterable>
                                                <Option v-for="item in provinceList" v-model="item.id.toString()"
                                                        :key="item.id">
                                                    {{item.areaName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="商户所在市:">
                                            <!--<Input v-model="formOpeningInformation.city" placeholder="请输入商户所在市"></Input>-->
                                            <Select v-model="formOpeningInformation.city" placeholder="请选择市"
                                                    @on-change="areaChange({
                                                    parentId:formOpeningInformation.city,
                                                    obj:districtList
                                                    })"
                                                    :disabled="formOpeningInformation.province==''"
                                                    filterable>
                                                <Option v-for="item in cityList"
                                                        v-model="item.id.toString()" :key="item.id">
                                                    {{item.areaName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="商户所在区:">
                                            <!--<Input v-model="formOpeningInformation.district " placeholder="请输入商户所在区"></Input>-->
                                            <Select v-model="formOpeningInformation.district" placeholder="请选择区"
                                                    filterable
                                                    :disabled="formOpeningInformation.city==''">
                                                <Option v-for="item in districtList" :key="item.id"
                                                        v-model="item.id.toString()">
                                                    {{item.areaName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="商户实际地址:">
                                            <Input v-model="formOpeningInformation.address " placeholder="请输入商户实际地址"
                                            ></Input>
                                        </FormItem>
                                    </Col>

                                    <Col span="8">
                                        <FormItem label="税务登记证编号:">
                                            <Input v-model="formOpeningInformation.taxAdministration"
                                                   placeholder="请输入税务登记证编号"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="开户许可证编号:">
                                            <Input v-model="formOpeningInformation.licence " placeholder="请输入开户许可证编号"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="组织机构代码证:">
                                            <Input v-model="formOpeningInformation.InsFramework  "
                                                   placeholder="请输入组织机构代码证"
                                            ></Input>
                                        </FormItem>
                                    </Col>

                                    <Col :span="8">
                                        <FormItem label="组织机构代理证有效期:">
                                            <Select v-model="formOpeningInformation.ZuValidity" placeholder="请选择有效期"
                                                    filterable>
                                                <Option value="1">长期有效</Option>
                                                <Option value="2">非长期有效</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <!--时间格式-->
                                        <FormItem label="具体有效时间:">
                                            <DatePicker
                                                v-model="formOpeningInformation.validTime"
                                                format="yyyy/MM/dd"
                                                type="date"
                                                placeholder="选择日期"
                                                :disabled="formOpeningInformation.ZuValidity==1"
                                            ></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="结算银行账号:">
                                            <Input v-model="formOpeningInformation.settleBank " placeholder="请输入结算银行账号"
                                            ></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="结算银行卡总行:">
                                            <Select v-model="formOpeningInformation.settleBankTotal" placeholder="请选择总行"
                                                    filterable @on-change="branchBank = []">
                                                <Option
                                                    v-for="item in settleBankTotal"
                                                    :key="item.id"
                                                    v-model="item.id.toString()"
                                                >{{item.name}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="开户省:">
                                            <Select v-model="formOpeningInformation.openAccountProvince"
                                                    placeholder="请选择省"
                                                    @on-change="areaChange({
                                                    parentId:formOpeningInformation.openAccountProvince,
                                                    obj:khCity,
                                                    nextObj:branchBank
                                                    })"
                                                    filterable>
                                                <Option
                                                    v-for="item in provinceList"
                                                    v-model="item.id.toString()"
                                                    :key="item.id">
                                                    {{item.areaName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :span="8">
                                        <FormItem label="开户市:">
                                            <Select v-model="formOpeningInformation.openAccountCity" placeholder="请选择市"
                                                    filterable
                                                    :disabled="formOpeningInformation.openAccountProvince==''"
                                                    @on-change="branchBank = []">
                                                <Option v-for="item in khCity" :key="item.id"
                                                        v-model="item.id.toString()">
                                                    {{item.areaName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="开户支行:">
                                            <Select v-model="formOpeningInformation.branchBank" placeholder="请选择支行"
                                                    :disabled="formOpeningInformation.settleBankTotal==''||formOpeningInformation.openAccountProvince==''||formOpeningInformation.openAccountCity==''"
                                                    filterable @on-open-change="getbranchBank">
                                                <Option
                                                    v-for="item in branchBank"
                                                    :key="item.bankCode"
                                                    v-model="item.bankCode.toString()"
                                                >{{item.bankName}}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="4">
                                        <FormItem class="add_top2" label="法人身份证:">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setLegalIdCardFrontUrl"
                                                                    @delPic="delLegalIdCardFrontUrl"
                                                                    :imgList="formOpeningInformation.legalIdCardFrontUrl?[{uid:1,name:'',url:formOpeningInformation.legalIdCardFrontUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <div class="img_botm_title">正面</div>
                                            </div>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem class="add_top2" label=" ">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setLegalIdCardbackUrl"
                                                                    @delPic="delLegalIdCardbackUrl"
                                                                    :imgList="formOpeningInformation.legalIdCardbackUrl?[{uid:1,name:'',url:formOpeningInformation.legalIdCardbackUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <div class="img_botm_title">背面</div>
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="4">
                                        <FormItem class="add_top2" label="统一社会代码证:">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setSocietyUrl" @delPic="delSocietyUrl"
                                                                    :imgList="formOpeningInformation.societyUrl?[{uid:1,name:'',url:formOpeningInformation.societyUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <!--<div class="img_botm_title">正面</div>-->
                                            </div>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem label="银行开户许可证:">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setAccountOpenUrl"
                                                                    @delPic="delAccountOpenUrl"
                                                                    :imgList="formOpeningInformation.accountOpenUrl?[{uid:1,name:'',url:formOpeningInformation.accountOpenUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <!--<div class="img_botm_title">正面</div>-->
                                            </div>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem label="营业执照:">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setLicenseUrl" @delPic="delLicenseUrl"
                                                                    :imgList="formOpeningInformation.licenseUrl?[{uid:1,name:'',url:formOpeningInformation.licenseUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <!--<div class="img_botm_title">正面</div>-->
                                            </div>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem label="税务登记证:">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setTaxUrl" @delPic="delTaxUrl"
                                                                    :imgList="formOpeningInformation.taxUrl?[{uid:1,name:'',url:formOpeningInformation.taxUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <!--<div class="img_botm_title">正面</div>-->
                                            </div>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        <FormItem label="行业机构代码证:">
                                            <div class="add_img_box">
                                                <div class="img_box">
                                                    <uploadPictures @setPic="setOrganizationUrl"
                                                                    @delPic="delOrganizationUrl"
                                                                    :imgList="formOpeningInformation.organizationUrl?[{uid:1,name:'',url:formOpeningInformation.organizationUrl,status:200}]:[]"></uploadPictures>
                                                </div>
                                                <!--<div class="img_botm_title">正面</div>-->
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                            <IncomingParts v-if="$route.query.id" :list="incomingList"
                                           :shopname="formOpeningInformation.name" types="sub"
                                           @Incomehandle="companyJoin"></IncomingParts>
                            <div class="footer">
                                <Button class="btn" @click="cancelModal=true">取消</Button>
                                <Button class="btn" type="primary" @click="saveForm" :loading="saveText=='保存中...'">
                                    {{saveText}}
                                </Button>
                                <Modal
                                    v-model="cancelModal"
                                    title="确认取消"
                                    width="300"
                                    class-name="cancel_modal"
                                    cancel-text="取消"
                                    :mask-closable="1==2"
                                    @on-ok="$router.push('/platForm/SubCorporation')"
                                    transfer
                                >
                                    <p>已填写的内容将丢失</p>
                                    <p>确认取消吗？</p>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="公众号信息" v-if="$route.query.id">
                    <div class="MaleMedium">
                        <div>
                            <div class="m_header">
                                <p class="xian">公众号列表</p>
                            </div>
                            <div class="m_content">
                                <Table :columns="wechatCol" :data="wechatList" v-if="wechatList.length>0"></Table>
                                <div v-for="item in wechatListBtn" class="add_btn_box" :key="">
                                    <div>{{item}}</div>
                                    <div>
                                        <Button @click="addWechat = true" size="small" type="primary" icon="md-add">
                                            添加公众号
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box2">
                            <div class="m_header">
                                <p class="xian">生活号列表</p>
                            </div>
                            <div class="m_content">
                                <Table :columns="alipayCol" :data="alipayList" v-if="alipayList.length>0"></Table>
                                <div v-for="item in alipayListBtn" class="add_btn_box" :key="">
                                    <div>{{item}}</div>
                                    <div>
                                        <Button @click="addAlipay = true" size="small" type="primary" icon="md-add">
                                            添加生活号
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 弹框 -->
                        <div>
                            <Modal v-model="addWechat" width="330" class-name="PImodal">
                                <p slot="header">
                                    <span>添加公众号</span>
                                </p>
                                <div style="text-align:center">
                                    <Form ref="addWechatList" :model="addWechatList" :rules="ruleAddWechat"
                                          label-position="left" :label-width="100">
                                        <!--写到这里-->
                                        <FormItem label="公众号名称" prop="name">
                                            <Input v-model="addWechatList.name" placeholder="请输入公众号名称"></Input>
                                        </FormItem>
                                        <FormItem label="微信号" prop="appAccount">
                                            <Input v-model="addWechatList.appAccount" placeholder="请输入微信号"></Input>
                                        </FormItem>
                                        <FormItem label="AppID" prop="appId">
                                            <Input v-model="addWechatList.appId" placeholder="请输入AppID"></Input>
                                        </FormItem>
                                        <FormItem label="AppSecret" prop="appSecret">
                                            <Input v-model="addWechatList.appSecret" placeholder="请输入AppSecret"></Input>
                                        </FormItem>
                                    </Form>
                                </div>
                                <div slot="footer">
                                    <Button @click="addWechat=false" style="margin-left: 8px">取消</Button>
                                    <Button @click="affirmBtn(1)" type="primary">保存</Button>
                                </div>
                            </Modal>
                        </div>
                        <div>
                            <Modal v-model="addAlipay" width="330" class-name="PImodal">
                                <p slot="header">
                                    <span>添加生活号</span>
                                </p>
                                <div style="text-align:center">
                                    <Form ref="addAlipayList" :model="addAlipayList" :rules="ruleAddAlipay"
                                          label-position="left" :label-width="100">
                                        <!--写到这里-->
                                        <FormItem label="生活号名称" prop="name">
                                            <Input v-model="addAlipayList.name" placeholder="请输入生活号名称"></Input>
                                        </FormItem>
                                        <FormItem label="微信号" prop="appAccount">
                                            <Input v-model="addAlipayList.appAccount" placeholder="请输入生活号"></Input>
                                        </FormItem>
                                        <FormItem label="AppID" prop="appId">
                                            <Input v-model="addAlipayList.appId" placeholder="请输入AppID"></Input>
                                        </FormItem>
                                        <FormItem label="应用公匙" prop="appPublicKey">
                                            <Input v-model="addAlipayList.appPublicKey" placeholder="请输入应用公匙"></Input>
                                        </FormItem>
                                        <FormItem label="应用私匙" prop="appPrivateKey">
                                            <Input v-model="addAlipayList.appPrivateKey" placeholder="请输入应用私匙"></Input>
                                        </FormItem>
                                        <FormItem label="支付宝公匙" prop="aliPayPrivateKay">
                                            <Input v-model="addAlipayList.aliPayPrivateKay"
                                                   placeholder="请输入支付宝公匙"></Input>
                                        </FormItem>
                                    </Form>
                                </div>
                                <div slot="footer">
                                    <Button @click="addAlipay=false" class="ttbtn">取消</Button>
                                    <Button @click="affirmBtn(2)" type="primary">保存</Button>
                                </div>
                            </Modal>
                        </div>
                        <!-- 小弹框 -->
                        <Modal
                            v-model="affirmSave"
                            width="330"
                            class-name="PImodal small">
                            <p slot="header" style="border:none"></p>
                            <div style="text-align:center">
                                <p>添加{{addListText}}号后将无法进行编辑修改，是否继续？</p>
                            </div>
                            <div slot="footer">
                                <Button @click="affirmSave=false" class="ttbtn">取消</Button>
                                <Button @click="affirmList" type="primary" :loading="affirmLoad">确定</Button>
                            </div>
                        </Modal>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>

    import uploadPictures from "../../../../components/upload"
    import IncomingParts from "../../../../components/IncomingParts"
    import '../../../../../static/css/commonStyle.css'

    import {licenseType, showClassify, showArea, yopBank} from "../../../../api/public"
    import {
        saveSubCorporation,
        showApp,
        showWechat,
        getSubCorporationDetail,
        saveApp,
        listChannel,
        join
    } from "../../../../api/SubCorporation"


    export default {
        name: "addSubCorporation",
        components: {
            uploadPictures,
            IncomingParts
        },
        data() {
            return {
                // add_dele: true,
                //tab1
                img_src: "",
                formValidate: {
                    name: '',
                    provinceName: "",
                    city: "",
                    phone: "",
                    serviceCharge: '',
                    isThreeToOne: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: "请输入子公司名称", trigger: "blur"}
                    ],
                    provinceName: [
                        {required: true, message: "请输入省总姓名", trigger: "blur"}
                    ],
                    city: [{required: true, message: "请选择区域", trigger: "change"}],
                    serviceCharge: [
                        {required: true, message: "请输入服务费", trigger: "blur"}
                    ],
                    phone: [{required: true, message: "请输入手机号码", trigger: "blur"}]
                },
                //tab2
                cancelModal: false,
                saveText: '保存',
                // 开户信息table
                formOpeningInformation: {
                    name: "",
                    businessLicense: "",
                    businessLicenseType: "",
                    legalPersonName: "",
                    identityCard: "",
                    linkman: "",
                    linkmanPhone: "",
                    linkmanEmail: "",
                    firstClassifySelect: "",
                    secondClassifySelect: "",
                    province: "",
                    city: "",
                    district: "",
                    address: "",
                    taxAdministration: "",
                    licence: "",
                    InsFramework: "",
                    ZuValidity: "",
                    validTime: "",
                    settleBank: "",
                    settleBankTotal: "",
                    openAccountProvince: "",
                    openAccountCity: "",
                    branchBank: "",
                    legalIdCardFrontUrl: '',
                    legalIdCardbackUrl: '',
                    licenseUrl: '',
                    taxUrl: '',
                    organizationUrl: '',
                    societyUrl: '',
                    accountOpenUrl: '',
                    // img_src: '../../../../static/image/logo.png',
                },
                // 省
                provinceList: [],
                //营业执照类型
                businessLicenseTypeList: [],
                // 商户一级分类
                firstClassify: [],
                // 商户二级分类
                secondClassify: [],
                //商户市
                cityList: [],
                //商户区
                districtList: [],
                // 开户市
                khCity: [],
                // 开户总行
                settleBankTotal: [],
                // 开户支行
                branchBank: [],

                incomingList: [],
                //tab3
                wechatCol: [
                    {
                        title: "序号",
                        type: "index",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "公众号名称",
                        key: "appName",
                        align: "center"
                    },
                    {
                        title: "微信号",
                        key: "appAccount",
                        align: "center"
                    },
                    {
                        title: "APPID",
                        key: "appId",
                        align: "center"
                    },
                    {
                        title: "AppSecret",
                        key: "appSecret",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            disabled: true
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index);
                                            }
                                        }
                                    },
                                    "编辑公众号"
                                )
                            ]);
                        }
                    }
                ],
                wechatList: [],
                wechatListBtn: [1, 2, 3, 4, 5],
                //   table2
                alipayCol: [
                    {
                        title: "序号",
                        type: "index",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "生活号名称",
                        key: "appName",
                        align: "center"
                    },
                    {
                        title: "生活号",
                        key: "appAccount",
                        align: "center"
                    },
                    {
                        title: "APPID",
                        key: "appId",
                        align: "center"
                    },
                    {
                        title: "应用公匙",
                        key: "appPublicKey",
                        align: "center"
                    },
                    {
                        title: "应用私匙",
                        key: "appPrivateKey",
                        align: "center"
                    },
                    {
                        title: "支付宝公匙",
                        key: "aliPayPrivateKay",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            disabled: true
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index);
                                            }
                                        }
                                    },
                                    "编辑生活号"
                                )
                            ]);
                        }
                    }
                ],
                alipayList: [],
                alipayListBtn: [1],
                //   弹框
                addWechat: false,
                addWechatList: {
                    name: "",
                    appAccount: "",
                    appId: "",
                    appSecret: ""
                },
                ruleAddWechat: {
                    name: [
                        {required: true, message: "公众号名称不能为空", trigger: "blur"}
                    ],
                    appAccount: [
                        {required: true, message: "微信号不能为空", trigger: "blur"}
                    ],
                    appId: [
                        {required: true, message: "APPID不能为空", trigger: "blur"}
                    ],
                    appSecret: [
                        {required: true, message: "AppSecret不能为空", trigger: "blur"}
                    ]
                },
                addAlipay: false,
                addAlipayList: {
                    name: "",
                    appAccount: "",
                    appId: "",
                    appPublicKey: "",
                    appPrivateKey: "",
                    aliPayPrivateKay: ""
                },
                ruleAddAlipay: {
                    name: [
                        {required: true, message: "公众号名称不能为空", trigger: "blur"}
                    ],
                    wxName: [
                        {required: true, message: "微信号不能为空", trigger: "blur"}
                    ],
                    appId: [
                        {required: true, message: "AppID不能为空", trigger: "blur"}
                    ],
                    appSecret: [
                        {required: true, message: "AppSecret不能为空", trigger: "blur"}
                    ]
                },
                affirmSave: false,
                addListText: '',
                saveType: '',
                affirmLoad: false,
                //法人身份证
                idCardFacePics: []
            }
        },
        created() {
            this.img_src = '../../../../../static/image/addSubC.png'
            //获取下拉框值
            this.provinceList = JSON.parse(sessionStorage.getItem('showArea'))
            this.businessLicenseTypeList = JSON.parse(sessionStorage.getItem('licenseType'))
            this.firstClassify = JSON.parse(sessionStorage.getItem('classifyList'))
            this.settleBankTotal = JSON.parse(sessionStorage.getItem('bankList'))
            // console.log( this.provinceList ,' this.provinceList ')
            if (this.$route.query.id) {
                this.img_src = '../../../../../static/image/redactSubC.png'
                this.getDetail()
            }
        },
        mounted() {
            document.getElementsByClassName('add_content')[0].style.minHeight = (document.body.clientHeight - 250) / 100 + 'rem'
        },
        methods: {
            //获取子公司详情
            getDetail() {
                if (this.$route.query.id) {
                    return new Promise(() => {
                        getSubCorporationDetail(this.$route.query.id)
                            .then(res => {
                                // console.log(res, 'getSubCorporationDetail')
                                if (res.data.success) {
                                    let data = res.data.data
                                    //tab1
                                    data.companyShortName?this.formValidate.name = data.companyShortName.toString():''
                                    data.leaderName?this.formValidate.provinceName = data.leaderName.toString():''
                                    data.phone?this.formValidate.phone = data.phone.toString():''
                                    data.areaId?this.formValidate.city = data.areaId.toString():''
                                    data.serviceCharge?this.formValidate.serviceCharge = data.serviceCharge.toString():''
                                    // console.log(this.formValidate.city ,'areaName')
                                    //tab2
                                    this.formOpeningInformation.name = data.companyName
                                    this.formOpeningInformation.businessLicense = data.licenseCode
                                    data.licenseType?this.formOpeningInformation.businessLicenseType = data.licenseType.toString():''
                                    this.formOpeningInformation.legalPersonName = data.legalName
                                    this.formOpeningInformation.identityCard = data.legalIdCard
                                    this.formOpeningInformation.linkman = data.contactsName
                                    this.formOpeningInformation.linkmanPhone = data.contactsPhone
                                    this.formOpeningInformation.linkmanEmail = data.contactsEmail
                                    data.firClassify?this.formOpeningInformation.firstClassifySelect = data.firClassify.toString():''
                                    this.formOpeningInformation.firstClassifySelect? this.firstClassifyChange():''
                                    data.secClassify?this.formOpeningInformation.secondClassifySelect = data.secClassify.toString():''
                                    data.province?this.formOpeningInformation.province = data.province.toString():''
                                    this.formOpeningInformation.province? this.areaChange({parentId: this.formOpeningInformation.province, obj: this.cityList}):''
                                    data.city?this.formOpeningInformation.city = data.city.toString():''
                                    this.formOpeningInformation.city? this.areaChange({parentId: this.formOpeningInformation.city, obj: this.districtList}):''
                                    data.district?this.formOpeningInformation.district = data.district.toString():''
                                    this.formOpeningInformation.address = data.address
                                    this.formOpeningInformation.taxAdministration = data.taxCode
                                    this.formOpeningInformation.licence = data.openAccountCode
                                    this.formOpeningInformation.InsFramework = data.orgCode
                                    data.isOrgCodeLong?this.formOpeningInformation.ZuValidity = data.isOrgCodeLong.toString():''
                                    this.formOpeningInformation.validTime = data.orgCodeExpiry
                                    this.formOpeningInformation.settleBank = data.bankCardNo
                                    data.bankCode?this.formOpeningInformation.branchBank = data.bankCode.toString():''
                                    data.headBankId?this.formOpeningInformation.settleBankTotal = data.headBankId.toString():''
                                    data.bankProvince?this.formOpeningInformation.openAccountProvince = data.bankProvince.toString():''
                                    this.formOpeningInformation.openAccountProvince? this.areaChange({parentId: this.formOpeningInformation.openAccountProvince, obj: this.khCity}):''
                                    data.bankCity?this.formOpeningInformation.openAccountCity = data.bankCity.toString():''
                                    this.formOpeningInformation.settleBankTotal && this.formOpeningInformation.openAccountProvince && this.formOpeningInformation.openAccountCity? this.getbranchBank():''
                                    this.formOpeningInformation.legalIdCardFrontUrl = data.legalIdCardFrontUrl
                                    this.formOpeningInformation.legalIdCardbackUrl = data.legalIdCardbackUrl
                                    this.formOpeningInformation.licenseUrl = data.licenseUrl
                                    this.formOpeningInformation.taxUrl = data.taxUrl
                                    this.formOpeningInformation.organizationUrl = data.organizationUrl
                                    this.formOpeningInformation.societyUrl = data.societyUrl
                                    this.formOpeningInformation.accountOpenUrl = data.accountOpenUrl
                                    this.formOpeningInformation.isThreeToOne = data.isThreeToOne
                                    // console.log(this.formValidate,'data1',this.formOpeningInformation, 'data2')
                                    this.getListChannel()
                                    this.getApp()
                                } else {
                                    console.log(res, 'getSubCorporationDetail')
                                    this.$Message.warning(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                }
            },
            //选择一级商户
            firstClassifyChange() {
                let params = {
                    parentId: this.formOpeningInformation.firstClassifySelect,
                    name: "",
                    page: "",
                    pageSize: ""
                }
                this.secondClassify = []
                return new Promise(() => {
                    showClassify(params)
                        .then(res => {
                            if (res.data.success) {
                                // console.log(res.data.data, 'firstClassifyChange')
                                this.secondClassify = res.data.data
                            } else {
                                console.log(res, 'firstClassifyChange')
                                this.$Message.warning(res.data.msg)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.$Message.error('出错啦！请检查网络后重试！')
                        })
                })
            },
            //选择省市区
            areaChange(obj) {
                let params = {
                    parentId: obj.parentId,
                    name: "",
                    page: "",
                    pageSize: ""
                }
                // console.log(obj, 'obj')
                return new Promise(() => {
                    showArea(params)
                        .then(res => {
                            obj.obj.splice(0, obj.obj.length)
                            if (obj.nextObj) {
                                obj.nextObj.splice(0, obj.nextObj.length)
                            }
                            // if (obj.c) {
                            //     //写到这里
                            //     obj.c.replace(/[ /d]/g,"")
                            //     console.log(this.formOpeningInformation.city,'c')
                            //     console.log(obj.c,'c4')
                            //     console.log(typeof this.formOpeningInformation.city,'c2')
                            //     console.log(this.formOpeningInformation.city==obj.c,'c1')
                            // }
                            // if (obj.d) {
                            //     obj.d = null
                            //     console.log(this.formOpeningInformation.district,'d')
                            //     console.log(this.formOpeningInformation.district==obj.d,'d1')
                            // }
                            if (res.data.success) {
                                // console.log(res.data.data, 'showArea')
                                res.data.data.forEach(t => {
                                    obj.obj.push(t)
                                })
                                // console.log(this.cityList)
                            } else {
                                console.log(res, 'showArea')
                                this.$Message.warning(res.data.msg)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.$Message.error('出错啦！请检查网络后重试！')
                        })
                })
            },
            //获取支行
            getbranchBank() {
                if (this.branchBank.length < 1) {
                    let params = {
                        headBankId: this.formOpeningInformation.settleBankTotal,
                        bankProvince: this.formOpeningInformation.openAccountProvince,
                        bankCity: this.formOpeningInformation.openAccountCity
                    }
                    return new Promise(() => {
                        yopBank(params)
                            .then(res => {
                                if (res.data.success) {
                                    // console.log(res.data.data, 'getbranchBank')
                                    this.branchBank = res.data.data
                                } else {
                                    console.log(res, 'getbranchBank')
                                    this.$Message.warning(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                }
            },
            //保存
            saveForm() {
                if (this.formOpeningInformation.validTime != '') {
                    this.formOpeningInformation.validTime = this.$getDate(this.formOpeningInformation.validTime) + ' 00:00:00'
                }
                let formData = {
                    id: this.$route.query.id ? this.$route.query.id : '',
                    companyShortName: this.formValidate.name,
                    leaderName: this.formValidate.provinceName,
                    phone: this.formValidate.phone,
                    areaId: this.formValidate.city,
                    serviceCharge: this.formValidate.serviceCharge,
                    companyName: this.formOpeningInformation.name,
                    licenseCode: this.formOpeningInformation.businessLicense,
                    licenseType: this.formOpeningInformation.businessLicenseType,
                    legalName: this.formOpeningInformation.legalPersonName,
                    legalIdCard: this.formOpeningInformation.identityCard,
                    contactsName: this.formOpeningInformation.linkman,
                    contactsPhone: this.formOpeningInformation.linkmanPhone,
                    contactsEmail: this.formOpeningInformation.linkmanEmail,
                    firClassify: this.formOpeningInformation.firstClassifySelect,
                    secClassify: this.formOpeningInformation.secondClassifySelect,
                    province: this.formOpeningInformation.province,
                    city: this.formOpeningInformation.city,
                    district: this.formOpeningInformation.district,
                    address: this.formOpeningInformation.address,
                    taxCode: this.formOpeningInformation.taxAdministration,
                    openAccountCode: this.formOpeningInformation.licence,
                    orgCode: this.formOpeningInformation.InsFramework,
                    orgCodeExpiry: this.formOpeningInformation.validTime,
                    isOrgCodeLong: this.formOpeningInformation.ZuValidity,
                    bankCardNo: this.formOpeningInformation.settleBank,
                    bankCode: this.formOpeningInformation.branchBank,
                    headBankId: this.formOpeningInformation.settleBankTotal,
                    bankProvince: this.formOpeningInformation.openAccountProvince,
                    bankCity: this.formOpeningInformation.openAccountCity,
                    legalIdCardFrontUrl: this.formOpeningInformation.legalIdCardFrontUrl,
                    legalIdCardbackUrl: this.formOpeningInformation.legalIdCardbackUrl,
                    licenseUrl: this.formOpeningInformation.licenseUrl,
                    taxUrl: this.formOpeningInformation.taxUrl,
                    organizationUrl: this.formOpeningInformation.organizationUrl,
                    societyUrl: this.formOpeningInformation.societyUrl,
                    accountOpenUrl: this.formOpeningInformation.accountOpenUrl,
                    isThreeToOne: this.formOpeningInformation.isThreeToOne
                }
                // console.log(formData, 'formData')
                if (!formData.companyShortName || !formData.leaderName || !formData.phone || !formData.areaId || !formData.serviceCharge) {
                    this.$Message.error('请填写所有必填项后重试！')
                } else {
                    this.saveText = '保存中...'
                    return new Promise(() => {
                        saveSubCorporation(formData)
                            .then(res => {
                                // console.log(res)
                                if (res.data.success) {
                                    this.$Message.success(res.data.msg)
                                    this.$router.push('/platForm/SubCorporation')
                                } else {
                                    console.log(res, 'saveSubCorporation')
                                    this.$Message.warning(res.data.msg)
                                }
                                this.saveText = '保存'
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                                this.saveText = '保存'
                            })
                    })
                }
            },
            //获取公众号列表
            getWechat() {
                if (this.$route.query.id) {
                    return new Promise(() => {
                        showWechat(this.$route.query.id)
                            .then(res => {
                                console.log(res, 'showWechat')
                                if (res.data.success) {
                                } else {
                                    console.log(res, 'showWechat')
                                    this.$Message.warning(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                }
            },
            //    获取生活或公众号列表
            getApp() {
                if (this.$route.query.id) {
                    return new Promise(() => {
                        showApp(this.$route.query.id)
                            .then(res => {
                                // console.log(res, 'showApp')
                                if (res.data.success) {
                                    res.data.data.forEach(t => {
                                        if (t.WeChat) {
                                            this.wechatList = []
                                            t.WeChat.forEach(w => {
                                                this.wechatList.push(w)
                                            })
                                            this.wechatListBtn = [1, 2, 3, 4, 5]
                                            t.WeChat.length < 5 ? this.wechatListBtn.splice(0, t.WeChat.length) : this.wechatListBtn = []
                                            // console.log(t.WeChat.length, 'length')
                                            // console.log(this.wechatListBtn, 'wechatListBtn')
                                        } else if (t.Alipay) {
                                            this.alipayList = []
                                            t.Alipay.forEach(w => {
                                                this.alipayList.push(w)
                                            })
                                            this.alipayListBtn = [1]
                                            t.Alipay.length < 1 ? this.alipayListBtn.splice(0, t.Alipay.length) : this.alipayListBtn = []
                                        }
                                    })
                                } else {
                                    console.log(res, 'showApp')
                                    this.$Message.warning(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                }
            },
            //新增编辑公众号
            affirmBtn(code) {
                code == 1 ? this.addListText = '公众' : this.addListText = '生活'
                this.saveType = code
                this.affirmSave = true
            },
            affirmList() {
                this.affirmLoad = true
                let params = {
                    companyId: this.$route.query.id,
                    appName: "",
                    appAccount: "",
                    appId: "",
                    appSecret: "",
                    appPrivateKey: "",
                    appPublicKey: "",
                    aliPayPrivateKay: "",
                    type: ""
                }
                if (this.saveType == 1) {
                    params.appName = this.addWechatList.name
                    params.appAccount = this.addWechatList.appAccount
                    params.appId = this.addWechatList.appId
                    params.appSecret = this.addWechatList.appSecret
                    params.type = 1
                } else if (this.saveType == 2) {
                    params.appName = this.addAlipayList.name
                    params.appAccount = this.addAlipayList.appAccount
                    params.appId = this.addAlipayList.appId
                    params.appSecret = this.addAlipayList.appSecret
                    params.appPublicKey = this.addAlipayList.appPublicKey
                    params.appPrivateKey = this.addAlipayList.appPrivateKey
                    params.aliPayPrivateKay = this.addAlipayList.aliPayPrivateKay
                    params.type = 2
                }
                return new Promise(() => {
                    saveApp(params)
                        .then(res => {
                            if (res.data.success) {
                                // console.log(res.data.data, 'saveApp')
                                this.$Message.success(res.data.msg)
                                this.getApp()
                                this.affirmLoad = false
                                this.affirmSave = false
                                if (this.saveType == 1) {
                                    this.addWechat = false
                                    for (let w in this.addWechatList) {
                                        this.addWechatList[w] = ''
                                        // console.log(this.addWechatList[w])
                                    }
                                } else if (this.saveType == 2) {
                                    this.addAlipay = false
                                    for (let a in this.addAlipayList) {
                                        this.addAlipayList[a] = ''
                                    }
                                }
                            } else {
                                console.log(res, 'saveApp')
                                this.$Message.warning(res.data.msg)
                                this.affirmLoad = false
                                this.affirmSave = false
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.$Message.error('出错啦！请检查网络后重试！')
                            this.affirmLoad = false
                            this.affirmSave = false
                        })
                })
            },
            //获取子公司通道
            getListChannel() {
                if (this.$route.query.id) {
                    return new Promise(() => {
                        listChannel(this.$route.query.id)
                            .then(res => {
                                // console.log(res, 'listChannel')
                                if (res.data.success) {
                                    this.incomingList = res.data.data
                                } else {
                                    console.log(res, 'listChannel')
                                    this.$Message.warning(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                }
            },

            //图片上传删除路径

            //获取身份证正面
            setLegalIdCardFrontUrl(list) {
                // console.log(list)
                if (list.length > 0) {
                    this.formOpeningInformation.legalIdCardFrontUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setLegalIdCardFrontUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除身份证正面
            delLegalIdCardFrontUrl(list) {
                if (list.length > 0) {
                    console.log(list, 'delLegalIdCardFrontUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.legalIdCardFrontUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //获取身份证背面
            setLegalIdCardbackUrl(list) {
                if (list.length > 0) {
                    this.formOpeningInformation.legalIdCardbackUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setLegalIdCardbackUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除身份证背面
            delLegalIdCardbackUrl(list) {
                if (list.length > 0) {
                    console.log(list, 'delLegalIdCardbackUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.legalIdCardbackUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //获取统一社会代码
            setSocietyUrl(list) {
                if (list.length > 0) {
                    this.formOpeningInformation.societyUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setSocietyUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除统一社会代码
            delSocietyUrl(list) {
                if (list.length > 0) {
                    console.log(list, 'delSocietyUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.societyUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //获取银行许可
            setAccountOpenUrl(list) {
                if (list.length > 0) {
                    this.formOpeningInformation.accountOpenUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setAccountOpenUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除银行许可
            delAccountOpenUrl(list) {
                if (list.length > 0) {
                    console.log(list, 'delAccountOpenUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.accountOpenUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //获取营业执照
            setLicenseUrl(list) {
                if (list.length > 0) {
                    this.formOpeningInformation.licenseUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setLicenseUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除营业执照
            delLicenseUrl(list) {
                if (list.length > 0) {
                    console.log(list, 'delLicenseUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.licenseUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //获取税务登记
            setTaxUrl(list) {
                if (list.length > 0) {
                    this.formOpeningInformation.taxUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setTaxUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除税务登记
            delTaxUrl(list) {
                if (list.length > 0) {
                    console.log(list, 'delTaxUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.taxUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //获取机构代码证URL
            setOrganizationUrl(list) {
                if (list.length > 0) {
                    this.formOpeningInformation.organizationUrl = list[0].url
                    this.$Message.success('上传成功！')
                } else {
                    console.log(list, 'setOrganizationUrl')
                    this.$Message.error('出错啦！上传失败！请检查网络后重试！')
                }
            },
            //删除机构代码证URL
            delOrganizationUrl(list) {
                // this.formOpeningInformation.organizationUrl=list[0].url
                if (list.length > 0) {
                    console.log(list, 'delOrganizationUrl')
                    this.$Message.error('出错啦！删除失败！请检查网络后重试！')
                } else {
                    this.formOpeningInformation.organizationUrl = ''
                    this.$Message.success('删除成功！')
                }
            },

            //进件
            companyJoin(code) {
                if (this.formOpeningInformation.name != '' &&
                    this.formOpeningInformation.businessLicense != '' &&
                    this.formOpeningInformation.businessLicenseType != '' &&
                    this.formOpeningInformation.legalPersonName != '' &&
                    this.formOpeningInformation.identityCard != '' &&
                    this.formOpeningInformation.linkman != '' &&
                    this.formOpeningInformation.linkmanPhone != '' &&
                    this.formOpeningInformation.linkmanEmail != '' &&
                    this.formOpeningInformation.firstClassifySelect != '' &&
                    this.formOpeningInformation.secondClassifySelect != '' &&
                    this.formOpeningInformation.province != '' &&
                    this.formOpeningInformation.city != '' &&
                    this.formOpeningInformation.district != '' &&
                    this.formOpeningInformation.address != '' &&
                    this.formOpeningInformation.taxAdministration != '' &&
                    this.formOpeningInformation.InsFramework != '' &&
                    this.formOpeningInformation.validTime != '' &&
                    this.formOpeningInformation.ZuValidity != '' &&
                    this.formOpeningInformation.settleBank != '' &&
                    this.formOpeningInformation.branchBank != '' &&
                    this.formOpeningInformation.settleBankTotal != '' &&
                    this.formOpeningInformation.openAccountProvince != '' &&
                    this.formOpeningInformation.openAccountCity != '' &&
                    this.formOpeningInformation.legalIdCardFrontUrl != '' &&
                    this.formOpeningInformation.legalIdCardbackUrl != '' &&
                    this.formOpeningInformation.licenseUrl != '' &&
                    this.formOpeningInformation.taxUrl != '' &&
                    this.formOpeningInformation.organizationUrl != '' &&
                    this.formOpeningInformation.societyUrl != '' &&
                    this.formOpeningInformation.accountOpenUrl != '') {
                    let params = {
                        id: this.$route.query.id,
                        companyName: this.formOpeningInformation.name,
                        licenseCode: this.formOpeningInformation.businessLicense,
                        licenseType: this.formOpeningInformation.businessLicenseType,
                        legalName: this.formOpeningInformation.legalPersonName,
                        legalIdCard: this.formOpeningInformation.identityCard,
                        contactsName: this.formOpeningInformation.linkman,
                        contactsPhone: this.formOpeningInformation.linkmanPhone,
                        contactsEmail: this.formOpeningInformation.linkmanEmail,
                        firClassify: this.formOpeningInformation.firstClassifySelect,
                        secClassify: this.formOpeningInformation.secondClassifySelect,
                        province: this.formOpeningInformation.province,
                        city: this.formOpeningInformation.city,
                        district: this.formOpeningInformation.district,
                        address: this.formOpeningInformation.address,
                        taxCode: this.formOpeningInformation.taxAdministration,
                        openAccountCode: this.formOpeningInformation.licence,
                        orgCode: this.formOpeningInformation.InsFramework,
                        orgCodeExpiry: this.formOpeningInformation.validTime,
                        isOrgCodeLong: this.formOpeningInformation.ZuValidity,
                        bankCardNo: this.formOpeningInformation.settleBank,
                        bankCode: this.formOpeningInformation.branchBank,
                        headBankId: this.formOpeningInformation.settleBankTotal,
                        bankProvince: this.formOpeningInformation.openAccountProvince,
                        bankCity: this.formOpeningInformation.openAccountCity,
                        legalIdCardFrontUrl: this.formOpeningInformation.legalIdCardFrontUrl,
                        legalIdCardbackUrl: this.formOpeningInformation.legalIdCardbackUrl,
                        licenseUrl: this.formOpeningInformation.licenseUrl,
                        taxUrl: this.formOpeningInformation.taxUrl,
                        organizationUrl: this.formOpeningInformation.organizationUrl,
                        societyUrl: this.formOpeningInformation.societyUrl,
                        accountOpenUrl: this.formOpeningInformation.accountOpenUrl,
                        channelId: code
                    }
                    return new Promise(() => {
                        join(params)
                            .then(res => {
                                // console.log(res)
                                if (res.data.success) {
                                    this.$Message.success(res.data.msg)
                                    this.saveForm()
                                } else {
                                    console.log(res, 'join')
                                    this.$Message.warning(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                } else {
                    this.$Message.warning('请填写所有内容后重试！')
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss">
    // table切换底部线的颜色
    .ivu-tabs-bar {
        border-bottom: 1px solid #E7EEEF;
        margin-bottom: 16px;
    }

    .ivu-tabs-ink-bar {
        background-color: #0061E2;
    }

    .ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #767676;
    }

    .addSubCorporation {


        width: 100%;
        /*min-height: 100%;*/

        .add_header {
            width: 100%;

            img {
                width: 100%;
            }

        }

        .add_content {
            min-height: 100%;
            width: 100%;
            background-color: #ffffff;
            margin-top: .1rem;
            border-radius: 4px;
            padding: .1rem .2rem;
            box-sizing: border-box;
            /*position: relative;*/
        }

        .ivu-tabs {
            overflow: unset;
            /*overflow-x: hidden;*/
        }


        .addAccountInformation {


            /*form 表单样式修改*/
            .ivu-select-single .ivu-select-selection {
                height: 32px;
            }

            .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
                line-height: 32px;
                color: #151515;
            }

            .ivu-form-item-error-tip {
                padding-top: 0;
            }

            .ivu-col-span-8 .ivu-form-item {
                padding: 0 50px 0 16px;
                margin: 0 auto .25rem;
            }

            .ivu-form-item-content {
                position: relative;
                line-height: 40px;
                font-size: .14rem;
            }

            .myInput {
                position: relative;
            }

            .myInput_w {
                display: block;
                position: absolute;
                top: 0;
                right: -15px;
            }

            .ivu-form .ivu-form-item-label {
                padding: 0 0 .05rem 0;
                color: #000000;
            }

            .ivu-select-item {
                color: #151515;
            }


        }

        .zhangfooter {
            text-align: center;
            margin: 4rem auto 20px auto;

            .zfBtn:hover {
                color: #4471FE;
                border-color: #4471FE;
            }

            button {
                padding: 2px 15px;
            }

            button:nth-child(2) {
                margin-left: 0.2rem;
            }

            .btn {
                width: 0.9rem;
                min-width: 70px;
                font-size: 0.2rem;
                padding: 1px 15px 3px;
            }

        }

        .AddOpening {
            // table切换底部线的颜色
            .ivu-tabs-bar {
                border-bottom: 1px solid #e7eeef;
                margin-bottom: 16px;
            }

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

            .ivu-col-span-8 .ivu-form-item {
                padding: 0 50px 0 16px;
                margin: 0 auto 0.25rem;
            }

            .ivu-form-item-content {
                // width: 4.8rem;
                position: relative;
                line-height: 40px;
                font-size: 0.14rem;
            }

            .myInput {
                position: relative;
            }

            .myInput_w {
                display: block;
                position: absolute;
                top: 0;
                right: -15px;
            }

            .ivu-form .ivu-form-item-label {
                padding: 0 0 0.05rem 0;
                color: #000000;
            }

            .ivu-select-item {
                color: #151515;
            }

            /*日期*/
            .ivu-input-icon {
                height: 32px;
                line-height: 32px;
                font-size: 0.16rem;
            }

            .ivu-date-picker {
                width: 100%;
            }

            .add_content_box1 {
                box-sizing: border-box;
                /*padding-bottom: 1rem;*/
                height: 100%;

                .add_top {
                    padding: 0.2rem 0 0 16px;
                    box-sizing: border-box;
                }

                .add_top2 {
                    padding: 0 0 0 16px;
                    box-sizing: border-box;
                }

                .div2 {
                    margin-left: 0.3rem;
                }

                .add_img_box {
                    text-align: left;
                    font-size: 0.14rem;
                    color: #000000;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    margin-top: 0.2rem;

                    .img_box {
                        width: 100%;
                        height: 1.85rem;
                        border-radius: 4px;
                        overflow: hidden;

                        img {
                            width: 100%;
                        }
                    }

                    .img_botm_title {
                        width: 1.8rem;
                        text-align: center;
                    }
                }

                .footer {
                    padding-top: 0.9rem;
                    padding-bottom: 0.4rem;
                    text-align: center;

                    button:nth-child(2) {
                        margin-left: 0.2rem;
                    }

                    .btn {
                        width: 0.9rem;
                        font-size: .2rem;
                        padding: 0;
                    }
                }
            }
        }

        .m_content .ivu-table:before {
            height: 0;
        }

        .add_btn_box {
            height: 47px;
            border-bottom: 1px solid #e7eeef;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .add_btn_box > div:nth-of-type(1) {
            width: 61px;
            text-align: center;
        }

        .add_btn_box > div:nth-of-type(2) {
            flex-grow: 1;
            text-align: center;
        }

        .add_btn_box:last-of-type {
            border-bottom: none;
        }


        // 二次弹框
        .small {
            .ivu-modal-header {
                border: none;
            }

            .ivu-modal-body {
                padding: 0.17rem .84rem;
                font-size: 0.14rem;
                line-height: 1.5;
                font-size: 0.14rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #767676;
            }


        }

        /* 弹框样式修改 */

        .MaleMedium {
            .ivu-table th {
                background: #fff;
                border-top: 1px solid #e7eeef;
            }

            .ivu-table td,
            .ivu-table th {
                border-bottom: 1px solid #e7eeef;
            }

            .m_header {
                padding-left: 16px;

                .xian {
                    font-size: 0.14rem;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #151515;
                    border-left: 4px solid #0061e2;
                    vertical-align: bottom;
                    padding-left: 0.06rem;
                    box-sizing: border-box;
                }
            }

            .m_content {
                box-sizing: border-box;
                margin-top: 14px;
                // border: 1px solid red;
            }

            .m_xian {
                padding: 0.18rem 0;
                // border: 1px solid red;
                text-align: center;
            }

            .mm {
                border-top: 1px solid #e7eeef;
            }

            .box2 {
                border-top: 1px dashed #e7eeef;
                padding-top: 0.18rem;
            }

        }
    }

    /* 弹框样式修改 */
    .PImodal {
        font-size: 0.14rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #000000;
        padding-left: 7px;

        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }

        .ivu-btn:hover {
            color: #4471FE;
            background-color: #fff;
            border-color: #4471FE;
        }

        .ivu-modal-header {
            padding: 12px 16px;
            line-height: 1;
            color: #000000;
            text-align: left;
            font-weight: bold;
            font-size: 0.14rem;
        }

        .ivu-modal-body {
            padding: 0.17rem .4rem;
            font-size: 0.14rem;
            line-height: 1.5;
            font-size: 0.14rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #767676;

        }

        .ivu-modal-footer {
            border: none;
            padding: 0 18px 12px 18px;
            text-align: center;
        }

        // 弹框from
        .ivu-form .ivu-form-item-label {
            font-size: .14rem;
            font-weight: bold;
            padding: 0;
            color: #151515;
            font-family: Source Han Sans CN;
            font-weight: 400;
        }

        .ivu-form .ivu-form-item-label {
            font-size: 0.14rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #151515;
            line-height: 1;
            padding: 15px 12px 10px 0;
            box-sizing: border-box;
        }

        .ivu-form-item-error-tip {
            position: absolute;
            top: 100%;
            left: 0;
            line-height: 1;
            padding: 0;
            color: #ed4014;
        }

    }

    .ivu-modal-header p, .ivu-modal-header-inner {
        font-size: 0.14rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #000000;
    }

    .ivu-form-item {
        margin-bottom: .15rem;
    }

    .ivu-form-item-error-tip {
        padding-top: 0px;
    }

    .ivu-modal-footer {
        border: none;
        padding: 12px 18px 20px 18px;
        text-align: center;
    }

    /*取消模态框垂直剧中页面*/
    .cancel_modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: -10%;
        }

        .ivu-modal-body {
            padding: 16px;
            font-size: .14rem;
            line-height: 0.18rem;
            line-height: 1.5;
            text-align: center;
            color: #767676
        }

        .ivu-modal-header {
            border-bottom: none;
        }

        .ivu-btn-text {
            color: #515a6e;
            background-color: transparent;
            border-color: transparent;
            border: 1px solid #E7EEEF;
        }

        button {
            padding: 3px 24px 4px;
            font-size: .2rem;
        }
    }

</style>
