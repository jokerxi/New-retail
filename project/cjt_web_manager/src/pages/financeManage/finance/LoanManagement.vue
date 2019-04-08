<template>
    <!-- 提现管理》打款管理 -->
    <div class="LoanManagement">
        <div class="lgBanner">
            <div class="lgHeader">
                <span>{{AccountInfo.shopName}}</span> 
                <span class="iconfont icon-tishiicon"></span>
                <span>当前商家风控监测有异常，请谨慎放款(异常说明：一个借款周期内，还款不足50%)</span>
            </div>
            <div class="lgFormBox">
                <div class="leftBox">
                    <p class="ash">收款户名：</p>
                    <p>{{AccountInfo.receiveName}}</p>
                    <p class="ash">收款卡号</p>
                    <p>{{AccountInfo.receiveCard}}</p>
                    <p class="ash">地区：</p>
                    <p>{{AccountInfo.receiveAreaName}}</p>  
                    <p class="ash">收款银行</p> 
                    <p>{{AccountInfo.receiveBank}}</p>
                </div>
                <div class="rightBox">
                     <Form ref="formCashWithdrawal" :model="formCashWithdrawal" :rules="ruleValidate" label-position="top">
                        <Row type="flex" align="top" :gutter="60">
                        <Col :span="12">
                            <FormItem label="付款户名:"  prop="outName">
                                <Input v-model="formCashWithdrawal.outName" placeholder></Input>
                            </FormItem>

                            <FormItem label="付款卡号:" prop="outCardCode">
                                <Input v-model="formCashWithdrawal.outCardCode" placeholder="请输入商户全称"></Input>
                            </FormItem>
                       
                        
                            <FormItem label="地区:" prop="outArea">
                                <Input v-model="formCashWithdrawal.outArea" placeholder="简称"></Input>
                            </FormItem>
 
                            <FormItem label="付款银行:" prop="outBank">        
                                <Input v-model="formCashWithdrawal.outBank" placeholder></Input>
                            </FormItem>
                        
                            <FormItem label="回单编号:" prop="returnOrderNo">
                                <Input v-model="formCashWithdrawal.returnOrderNo" placeholder></Input>
                            </FormItem>
                        </Col>
                        <Col :span="12">
                            <FormItem label="打款金额(元):" prop="amount">
                                <Input v-model="formCashWithdrawal.amount" placeholder></Input>
                            </FormItem>
                            <FormItem label="打款时间:" prop="paymentTime">
                                 <DatePicker  style="width:100%" type="datetime"  v-model="formCashWithdrawal.paymentTime" format="yyyy-MM-dd HH:MM:SS"></DatePicker>
                            </FormItem>
                        </Col>
                        </Row > 
                    </Form>
                </div>
            </div>
            <div class="btnDiv">
                <Button @click="openModal" class="nextStep" type="primary">下一步</Button>
            </div>
        </div>
        <!-- 店铺列表 -->
        <div class="lgContent">
            <p class="lgSmallTitle">店铺列表</p>
            <div class="lgBigTitle">
                <p class="firstDiv">打款时间</p>
                <p class="lgWidth">打款金额</p>
                <p class="peiqi">收款信息</p>
                <p class="footer">付款信息</p>
            </div>
            <div v-for="(item,index) in list" :key="index" class="lgCard">
                <div class="firstDiv">{{item.createdTime}}</div>
                <div class="lgxian money lgWidth">￥{{item.payAmount}}</div>
                <div class="lgxian peiqi">
                    <span style="margin-right:10px">收款户名：{{item.receiveInfo.accountName}}</span>   <span>收款银行：{{item.receiveInfo.bank}}</span>
                    <p>收款账号：{{item.receiveInfo.card}}</p>
                </div>
                <div class="lgFooter">
                    <div class="lgxian peiqi">
                    <p>付款账户名：{{item.payInfo.accountName}}</p>
                    <p>付款账号：{{item.payInfo.card}}</p>
                </div>
                <div class="lgFoot">
                    <p>付款银行：{{item.payInfo.bank}}</p>
                    <p>回执单号：{{item.payInfo.returnOrderNo}}</p>
                </div>
                </div>     
            </div>
            <pages
              :pagations="pagations"
              @skipHandle="PageSkip"
              @PageSizeChange="PageSizeHandle"
              @PageChange="PageHandle"
            ></pages>
        </div>
        <!-- 弹框 -->
        <div>
            <Modal
                v-model="visiable"
                title="信息确认"
                width="900" 
                class-name="lgModal">
                <div class="lgcontent">
                    <div> 
                        <p class="lmtkTitle">收款人信息</p>
                        <p>收款户名：<span class="price">{{formCashWithdrawal.inName}}</span></p>
                        
                        <p>收款卡号：<span class="price">{{formCashWithdrawal.inCardCode}}</span></p>
                        
                        <p>地区：<span class="price">{{formCashWithdrawal.inArea}}</span></p>
                         
                        <p>收款银行：<span class="price">{{formCashWithdrawal.inBank}}</span></p> 
                        
                    </div>
                    <div>
                        <p class="lmtkTitle">付款人信息</p>
                        <p>付款户名：<span class="price">{{formCashWithdrawal.outName}}</span></p>
                        
                        <p>付款卡号：<span class="price">{{formCashWithdrawal.outCardCode}}</span></p>
                        
                        <p>地区：<span class="price">{{formCashWithdrawal.outArea}}</span></p>
                         
                        <p>付款银行：<span class="price">{{formCashWithdrawal.outBank}}</span></p> 
                        <p>回单编号：<span class="price">{{formCashWithdrawal.returnOrderNo}}</span></p> 
                    </div>
                    
                </div>
                <div class="lgdiv3">
                    <p class="lmtkTitle">打款信息</p>
                    <p>打款金额：<span class="price">{{formCashWithdrawal.amount}}</span></p>
                    <p>打款时间：<span class="price">{{formCashWithdrawal.paymentTime}}</span></p>
                </div>
                <div slot="footer">
                    <Button style="margin-left: 8px" @click="closeModal">返回编辑</Button>
                    <Button class="nextStep" type="primary" @click="CashAgreeHandle">保存</Button>                  
                </div>               
            </Modal>
        </div>
    </div>  
</template>

<script>
import Pages from '../../../components/Pages'
import { accountInfo, CashAgree, withdrawDetailRecords } from '../../../api/finance'
import moment from 'moment'
export default {
    name: "LoanManagement",
    components:{
        Pages
    },
    data(){
        return{
            pagations:{
                currents:1,
                total:10,
                pageSize:10
            },
            shopId:this.$route.query.shopId,
            queryParam:{
              shopId:this.$route.query.shopId,
              withdrawCashId:this.$route.query.withdrawId,
              page:1,
              limit:10
            },
            visiable:false,
            AccountInfo:{},
            list:[],
            formCashWithdrawal:{
                shopId: '',
                withdrawCashId: '',
                inName: '',
                inCardCode:'',
                inArea: '',
                inBank: '',
                outName: '',
                outCardCode: '',
                outArea: '',
                outBank: '',
                returnOrderNo: '',
                amount: '',
                paymentTime: '',
            },
             ruleValidate: {
                outName: [
                { required: true, message: "付款户名不能为空", trigger: "blur"}
                ],
                outCardCode: [
                { required: true, message: "付款卡号不能为空", trigger: "blur"}
                ],
                outArea: [
                { required: true,  message: "地区不能为空", trigger: "blur"}
                ],
                outBank: [
                { required: true, message: "付款银行不能为空", trigger: "blur"}
                ],
                returnOrderNo: [
                { required: true, message: "回单编号不能为空", trigger: "blur"}         
                ],
                amount: [
                { required: true, message: "打款金额不能为空", trigger: "blur"},
                { pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message:'打款金额为数字', trigger:'blur'},
                ],
                paymentTime: [
                { required: true, type: 'date', message: "打款时间不能为空", trigger: "blur"}
                ]
            }
        }
    },
    created(){
      this.getAccountInfo(this.shopId)
      this.getwithdrawDetailRecords(this.queryParam)
    },
    methods: {
        // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            } 
            this.queryParam.page = cur 
            this.getwithdrawDetailRecords(this.queryParam)
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
             this.queryParam.limit = Pagesize 
            this.getwithdrawDetailRecords(this.queryParam)
        },
        // 分页当前页
        PageHandle(Page){
             this.queryParam.page = Page
            this.getwithdrawDetailRecords(this.queryParam)
        },
        // 获取账户信息
        getAccountInfo(payload){
            return new Promise((resolve,reject) => {
                accountInfo(payload).then(res => {
                    if(res.data.success){
                        this.AccountInfo = res.data.data
                    } else{
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        // 获取打款记录列表
        getwithdrawDetailRecords(payload){
            return new Promise((resolve,reject) => {
               withdrawDetailRecords(payload).then(res => {
                   if(res.data.success){
                       this.list = res.data.data
                       this.pagations.total = res.data.total
                   } else {
                       this.$Message.error(res.data.msg)
                   }
               }).catch(err => {
                   this.$Message.error(err)
               })
            })
        },
        // 打开模态框
        openModal(){
           this.visiable = true
           this.formCashWithdrawal.shopId = this.AccountInfo.shopId
           this.formCashWithdrawal.inName = this.AccountInfo.receiveName
           this.formCashWithdrawal.inBank = this.AccountInfo.receiveBank
           this.formCashWithdrawal.inArea = this.AccountInfo.receiveAreaName
           this.formCashWithdrawal.inCardCode = this.AccountInfo.receiveCard
           this.formCashWithdrawal.withdrawCashId = this.$route.query.withdrawId
           this.formCashWithdrawal.paymentTime = this.formCashWithdrawal.paymentTime == '' ? '' : moment(this.formCashWithdrawal.paymentTime).format('YYYY-MM-DD HH:MM:SS')
        },
        // 关闭模态框
        closeModal(){
            this.visiable = false
        },
        // 同意打款
        CashAgreeHandle(){
            return new Promise((resolve,reject) => {
                CashAgree(this.formCashWithdrawal).then(res => {
                    if(res.data.success){
                        this.$Message.success(res.data.msg)
                        this.getwithdrawDetailRecords(this.queryParam)
                        this.visiable = false
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                      this.$Message.error(err)
                })
            })
        }
    }
}
</script>

<style lang="scss">
/* 弹框样式修改 */
        .lgModal{
            display: flex;
            align-items: center;
            justify-content: center;
            .lgcontent{               
               display: flex;
               justify-content: space-around;
               align-items: flex-start;
               text-align: left;
               div{
                   flex: 1;
               }   
            }
             p{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height: 34px;
                color:#757575;
            }
            .price{
                color: #000000;
            }
            .lmtkTitle{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:#151515;
                padding-left: 6px;
                height:14px;
                line-height: 14px;
                border-left: 4px solid #0061E2;
            }
            .lgdiv3{
                margin-top: .55rem;
            }
            .ivu-modal{
                top: 0;
                width: 9rem;
            }
            .ivu-modal-header-inner {
                display: inline-block;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #000000;
                font-weight:bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .ivu-modal-header {                
                border-color: #E7EEEF;
                padding: 12px 16px;
                line-height: 1;
            }
            .ivu-modal-body {
                padding:.31rem .5rem;
                box-sizing: border-box;
                font-size: .14rem;
                // line-height: 1.5;      
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676;
            }
            .ivu-modal-footer {
                border: none;
                padding: 30px 18px 40px 18px;
                text-align: center;
                button:last-child{
                    margin-left:.2rem;
                }
                .ivu-btn {
                    width:95px;
                    padding: 3px 6px 4px;
                    font-size: .2rem;
                }
            }

        }
        /* 弹框样式修改 */

.nextStep{
                padding: 5px 27px 6px;
            }
.LoanManagement{

    .lgBanner{
        background-color: #ffffff;
        border: 1px solid #E7EEEF;
        border-radius: 4px;
        padding: 0 .21rem;
        .lgHeader{
            height: .49rem;
            line-height: .49rem;
            border-bottom: 1px solid #E7EEEF;
            span:first-child{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                line-height:0.23rem;
                color:#000000;
                opacity:1;
                padding-right:.19rem;
            }
            span{
                color: #FF7474;
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:0.23rem;
            }
        }
    }
    .lgFormBox{
        padding: .26rem .16rem;
        display: flex;

        .leftBox{
            width:4.95rem;
            flex: 1;
            p{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                line-height:40px;
                color:#000000;
            }
            .ash{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:500;
                line-height:24px;
                color:#757575;
            }
        }
        .rightBox{
            border-left: 1px solid #E7EEEF;
            padding-left: .6rem;
            flex: 2;
            .ivu-form-item {
                margin-bottom: .18rem;
            }
            .ivu-form .ivu-form-item-label {
                font-size: .14rem;
                font-weight:500;
                padding: 0 0 .05rem 0;
                color: #000000;
            }
            .ivu-form-item-error-tip {
                position: absolute;
                top: 100%;
                left: 0;
                line-height: 1;
                padding-top: 0; 
                color: #ed4014;
            }
        }
       
    }
     .btnDiv{
            padding-bottom: .27rem;
            text-align: center;
            
        }
    .lgContent{
        margin-top:.24rem;

        .lgSmallTitle{
            border-left: 4px solid #4471FE;
            font-size:0.16rem;
            font-family:PingFang SC;
            font-weight:800;
            line-height:14px;
            height:14px;
            color:#151515;
            padding-left:6px;
            margin:0;
        }
        .lgBigTitle{
            height:.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #E7EEEF;
            border-radius: 4px;
            background-color: #ffffff;
            padding: 0 .2rem;
            margin-top:.14rem;
            p{            
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:0.49rem;
                color:#757575;
                padding-left: .4rem;
            }
        }
        .firstDiv{
            // width: 2rem;
            padding-left: 0 !important;
            flex: 1
        }
        .lgWidth{
            // width:2.5rem;
            flex: 1
        }
        .peiqi{
            // width:3.5rem;
            flex: 2
        }
        .footer{
            // width:5.7rem;
            flex: 2
        }
        .lgCard{
            height:1.1rem;
            border: 1px solid #E7EEEF;
            border-radius: 4px;
            margin-top:.1rem;
            background-color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .22rem .2rem;
            font-size:0.14rem;
            font-family:Source Han Sans CN;
            font-weight:500;
            line-height:0.29rem;
            color:#000000;
            .lgxian{
                border-left: 1px solid #E7EEEF;
                padding-left: .25rem;
                vertical-align: middle;
                min-height: .65rem;
            }
            .money{
                line-height: .65rem;
                flex: 1
            }
            .lgFooter{
                display: flex;
                flex: 2;
                min-height: .65rem;
                div{
                    flex: 1
                }
            }
            .lgFoot{
                text-align: left;
            }
        }

    }
    
}
    
</style>
