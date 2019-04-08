<template>
    <!-- 提现管理》放款管理 -->
    <div class="FundManagement">
        <div class="fmBanner">
            <div class="fmHeader">
                <span>{{accountInfo.shopName}}</span> 
                <span class="iconfont icon-tishiicon"></span>
                <span>当前商家风控监测有异常，请谨慎放款(异常说明：一个借款周期内，还款不足50%)</span>
            </div>
            <div class="fmFormBox">
                <div class="leftBox">
                    <p class="ash">收款户名：</p>
                    <p>{{accountInfo.receiveName}}</p>
                    <p class="ash">收款卡号</p>
                    <p>{{accountInfo.receiveCard}}</p>
                    <p class="ash">地区：</p>
                    <p>{{accountInfo.receiveArea}}</p>  
                    <p class="ash">收款银行</p> 
                    <p>{{accountInfo.receiveBank}}</p>
                </div>
           
                <div class="rightBox">
                    <Form ref="formCashWithdrawal" :model="formCashWithdrawal" :rules="ruleValidate" label-position="top">
                        <Row type="flex" align="top" :gutter="60">
                            <Col :span="12">
                                <FormItem label="付款户名:"  prop="outName">
                                    <Input v-model="formCashWithdrawal.outName"/>
                                </FormItem>

                                <FormItem label="付款卡号:" prop="outCardCode">
                                    <Input v-model="formCashWithdrawal.outCardCode"/>
                                </FormItem>
                        
                            
                                <FormItem label="地区:" prop="outArea">
                                    <Input v-model="formCashWithdrawal.outArea"/>
                                </FormItem>
    
                                <FormItem label="付款银行:" prop="outBank">        
                                    <Input v-model="formCashWithdrawal.outBank" />
                                </FormItem>
                            
                                <FormItem label="回单编号:" prop="returnOrderNo">
                                    <Input v-model="formCashWithdrawal.returnOrderNo" />
                                </FormItem>
                            </Col>
                            <Col :span="12">
                                <FormItem label="放款金额(元):" prop="amount">
                                    <Input v-model="formCashWithdrawal.amount" placeholder/>
                                </FormItem>
                                <FormItem label="开始时间:" prop="startTime">
                                    <DatePicker  style="width:100%" type="datetime" format="yyyy-MM-dd HH:MM:SS" v-model="formCashWithdrawal.startTime"></DatePicker>
                                </FormItem>
                                <FormItem label="放款周期(天):" prop="cycle">
                                    <Input @on-blur="getCycle" v-model="formCashWithdrawal.cycle" placeholder/>
                                </FormItem>
                                <FormItem label="结束时间:">
                                    <Input style="border-color:none" v-model="formCashWithdrawal.endTime" readonly placeholder/>
                                </FormItem>
                            </Col>
                        </Row > 
                    </Form>
                </div>
             </div>
            <div class="btnDiv">
                <Button class="nextStep" type="primary" @click="OpenSave">下一步</Button>
            </div> 
        </div> 
        <div class="lgContent">
            <p class="lgSmallTitle">店铺列表</p>
            <div class="lgBigTitle">
                <p class="firstDiv">放款周期</p>
                <p class="lgWidth">放款金额</p>
                <p class="lgsChedule">还款进度</p>
                <p class="peiqi">收款信息</p>
                <div class="footer">
                    <span class="">付款信息</span>
                    <span>操作</span>
                </div>
                
            </div>
            <div v-for="(item,index) in loanList" :key="index" class="lgCard">
                <div class="firstDiv"><p>{{item.startTime}}</p><p>{{item.endTime}}</p></div>
                <div class="lgxian money lgWidth">￥{{item.amount}}</div>
                <div class="lgxian lgsChedule" style="display:flex;align-items: center">
                     <div>
                        <p v-show="item.status == 1" class="changeColor" style="color:#ff0000">尚未开始还款</p>
                        <p v-show="item.status == 2" class="changeColor" style="color:#4471FE">还款中</p>
                        <p v-show="item.status == 3" class="changeColor" style="color:#7BD31B">还款完毕</p>
                        <p v-show="item.status == 2">{{item.returnRatio}}%/剩余￥{{item.remainAmount}}</p>
                     </div>
                </div>
                <div class="lgxian peiqi">
                    <span>收款户名：{{item.receiveInfo.inName}}</span>   <span>收款银行：{{item.receiveInfo.inBank}}</span>
                    <p>收款账号：{{item.receiveInfo.inCardCode}}</p>
                </div>
                <div class="lgFooter">
                    <div class="lgxian peiqi">
                        <p>付款账户名：{{item.payInfo.outName}}</p>
                        <p>付款账号：{{item.payInfo.outCardCode}}</p>
                    </div>
                    <div class="lgFoot">
                        <p>收款银行：{{item.payInfo.outBank}}</p>
                        <p>回执单号：{{item.payInfo.returnOrderNo}}</p>
                    </div>
                    <div class="lgFootDiv">
                        <div v-show="item.status == 1">
                            <Button @click="OpenDel(item)" class="btnShow">删除</Button>
                            <Button @click="OpenEdit(item)" class="btnBianji">修改信息</Button>
                        </div>  
                        <Button v-show="item.status == 3 || item.status == 2"  disabled class="prohibit">无法修改信息</Button>
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
        <!-- 删除-弹框 -->
        <div>
            <Modal
                v-model="dele"
                title=""
                width="330"
                class-name="FMmodal">
                <div class="FMcontent">
                    确定删除该条放款记录？
                </div>
                <div slot="footer">
                    <Button class="tkDelBtn" @click="closeDele" style="margin-botton: 8px">取消</Button>
                    <Button class="tkDelBtn" @click="deleteHandle" type="primary">确定</Button>                  
                </div>
            </Modal>
        </div>
        <div>
            <!-- 大弹框 修改信息 -->
             <Modal
                v-model="save"
                title="新增收款"
                width="800"
                class-name="lgmodal">
                <div class="lgcontent">
                    <Row :gutter="24">
                    <Col :span="12"> 
                        <p class="lgtkTitle">收款人信息</p>
                        <p>收款户名：<span class="price">{{formCashWithdrawal.inName}}</span></p>
                        <p>收款卡号：<span class="price">{{formCashWithdrawal.inCardCode}}</span></p>
                        <p>地区：<span class="price">{{formCashWithdrawal.inArea}}</span></p>
                        <p>收款银行：<span class="price">{{formCashWithdrawal.inBank}}</span></p> 
                    </Col>
                    <Col :span="12">
                        <p class="lgtkTitle">付款人信息</p>
                        <p>付款户名：<span class="price">{{formCashWithdrawal.outName}}</span></p>
                        <p>付款卡号：<span class="price">{{formCashWithdrawal.outCardCode}}</span></p>
                        <p>地区：<span class="price">{{formCashWithdrawal.outArea}}</span></p>
                        <p>付款银行：<span class="price">{{formCashWithdrawal.outBank}}</span></p> 
                        <p>回单编号：<span class="price">{{formCashWithdrawal.returnOrderNo}}</span></p> 
                    </Col>
                </Row>      
                <Row :gutter="24">
                    <Col :span="12"> 
                        <p class="lgtkTitle">打款信息</p>
                        <p>放款金额：<span class="price">{{formCashWithdrawal.amount}}</span></p>
                        <p>放款周期：<span class="price">{{formCashWithdrawal.cycle}}</span></p>                
                </Col>
                <Col :span="12">
                        <p class="lgtkTitle null"></p>
                        <p>开始时间：<span class="price">{{formCashWithdrawal.startTime}}</span></p>
                        <p>结束时间：<span class="price">{{formCashWithdrawal.endTime}}</span></p>
                    </Col>
                </Row>
                </div>
                <div slot="footer">
                    <Button class="backBian" style="margin-left: 8px" @click="closeSave">返回编辑</Button>
                    <Button class="nextStep" type="primary" @click="SaveEdit">确定放款</Button>                  
                </div>               
            </Modal>
        </div>  
          <!-- 编辑放款信息 -->
        <div>
          <Modal
                v-model="edit"
                title="编辑放款"
                :width="800"
                class-name="lgmodal">
                <div class="EditModal">
                        <Row :gutter="24">
                            <Col :span="12">
                                <p class="title">收款人信息</p>
                                <p><span>收款户名：</span><span class="val">{{editForm.inName}}</span></p>
                                
                                <p><span>收款卡号：</span><span class="val">{{editForm.inCardCode}}</span></p>
                                
                                <p><span>地区：</span><span class="val">{{editForm.inArea}}</span></p>
                                
                                <p><span>收款银行：</span><span class="val">{{editForm.inBank}}</span></p> 
                            </Col>
                            <Col :span="12">
                                <p class="title">付款人信息</p>
                                <p><span class="labels">付款户名：</span><Input v-model="editForm.outName"/></p>
                                <p><span class="labels">付款卡号：</span><Input v-model="editForm.outCardCode"/></p>
                                <p><span class="labels">地区：</span><Input v-model="editForm.outArea"/></p>
                                <p><span class="labels">付款银行：</span><Input v-model="editForm.outBank"/></p>
                                <p><span class="labels">回单编号：</span><Input v-model="editForm.returnOrderNo"/></p>
                            </Col>
                        </Row>
                        <Row>
                             <p class="title">打款信息</p>
                            <Col :span="12">
                                <p><span class="labels label1">放款金额(元)：</span><Input v-model="editForm.amount"/></p>
                                <p><span class="labels label1">放款周期(天)：</span><Input v-model="editForm.cycle"/></p>
                            </Col>
                            <Col :span="12">
                                <p><span class="labels">开始时间：</span><Input v-model="editForm.startTime"/></p>
                                <p><span class="labels">结束时间：</span><Input v-model="editForm.endTime"/></p>
                            </Col>
                        </Row>
                </div>
                <div slot="footer">
                    <Button style="margin-left: 8px" @click="closeEdit">取消</Button>
                    <Button class="nextStep" type="primary" @click="EditHandle">确定</Button>                  
                </div>               
            </Modal>
        </div>
    </div>
</template>

<script>
import Pages from '../../../components/Pages'
import { loanDetailList, deleteLoanDetail, accountInfo, saveLoan } from '../../../api/finance'
import moment from 'moment'
export default {
    name: "FundManagement",
    components:{
        Pages
    },
    data() {
        return{
            shopId:this.$route.query.shopId,
            queryParam:{
                shopId:this.$route.query.shopId,
                page:1,
                limit:10
            },
            deleParam:{
               shopId:'',
               id:''
            },
            loanList:[],
            dele: false,
            edit:false,
            save: false,
            pagations:{
                currents:1,
                total:0,
                pageSize:10
            },
            accountInfo:{},
            formCashWithdrawal:{
                shopId:'',
                id:'',
                inName:'',
                inCardCode:'',
                inArea:'',
                inBank:'',
                outName: '',
                outCardCode: '',
                outArea: '',
                outBank: '',
                returnOrderNo: '',
                amount: '',
                startTime: '',
                endTime: '',
                cycle: ''
            },
            editForm:{
                shopId:'',
                id:'',
                inName:'',
                inCardCode:'',
                inArea:'',
                inBank:'',
                outName: '',
                outCardCode: '',
                outArea: '',
                outBank: '',
                returnOrderNo: '',
                amount: '',
                startTime: '',
                endTime: '',
                cycle: ''
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
                { required: true, message: "放款金额不能为空", trigger: "blur"},
                { pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message:'放款金额为数字', trigger:'blur'},
                ],
                startTime: [
                { required: true, type: 'date', message: "开始时间不能为空", trigger: "blur"}
                ],
                cycle: [
                { required: true, message: "放款周期不能为空", trigger: "blur"},
                { pattern:/^[+]{0,1}(\d+)$/, message:'放款周期为整数', trigger:'blur'}
                ],
                endTime: [
                { required: true, type: 'string', message: "结束时间不能为空", trigger: "blur"}
                ]
            }
        }
    },
    created(){
      this.getloanDetailList(this.queryParam)
      this.getAccountInfo(this.shopId)
    },
    methods:{
        getCycle(){
          let cycle = Number(this.formCashWithdrawal.cycle)
          if(this.formCashWithdrawal.startTime != '' && this.formCashWithdrawal.cycle != ''){
            this.formCashWithdrawal.endTime = moment(this.formCashWithdrawal.startTime).add('days',cycle).format('YYYY-MM-DD HH:MM:SS');
          }
        },
        // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            } 
            this.queryParam.page=cur
            this.getloanDetailList(this.queryParam) 
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
             this.queryParam.limit=Pagesize
            this.getloanDetailList(this.queryParam)
        },
        // 分页当前页
        PageHandle(Page){
             this.queryParam.page=Page
            this.getloanDetailList(this.queryParam)
        },
        // 放款记录列表
        getloanDetailList(payload){
            return new Promise((resolve,reject) => {
                loanDetailList(payload).then(res => {
                    if(res.data.success){
                        this.loanList = res.data.data
                        this.pagations.total = res.data.total
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        // 打开删除模态框
        OpenDel(item){
          this.dele = true;
          this.deleParam.shopId = item.shopId
          this.deleParam.id = item.id
        },
        // 关闭删除模态框
        closeDele(){
          this.dele = false
        },
        // 关闭确认信息模态框
        closeSave(){
          this.save = false
        },
        // 删除放款记录
        deleteHandle(){
           return new Promise((resolve,reject) => {
               deleteLoanDetail(this.deleParam).then(res => {
                   if(res.data.success){
                       this.$Message.success(res.data.msg)
                       this.getloanDetailList(this.queryParam)
                       this.dele = false
                   } else {
                       this.$Message.error(res.data.msg)
                   }
               }).catch(err => {
                   this.$Message.error(err)
               })
           })
        },
        // 增加信息确认框
        OpenSave(){
            this.save= true
            this.formCashWithdrawal.inName = this.accountInfo.receiveName
            this.formCashWithdrawal.inCardCode = this.accountInfo.receiveCard
            this.formCashWithdrawal.inArea = this.accountInfo.receiveArea
            this.formCashWithdrawal.inBank = this.accountInfo.receiveBank
            this.formCashWithdrawal.shopId = this.accountInfo.shopId
            this.formCashWithdrawal.startTime = this.formCashWithdrawal.startTime == '' ? '' : moment(this.formCashWithdrawal.startTime).format('YYYY-MM-DD HH:MM:SS')
        },
        // 获取店铺信息
        getAccountInfo(payload){
            return new Promise((resolve,reject) => {
                accountInfo(payload).then(res => {
                    if(res.data.success){
                        this.accountInfo = res.data.data
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                     this.$Message.error(err)
                })
            })
        },
        // 打开编辑
        OpenEdit(item){
            this.editForm.id = item.id
            this.editForm.shopId = item.shopId
            this.editForm.inName = item.receiveInfo.inName
            this.editForm.inCardCode = item.receiveInfo.inCardCode
            this.editForm.inArea = item.receiveInfo.inArea
            this.editForm.inBank = item.receiveInfo.inBank 
            this.editForm.outName = item.payInfo.outName
            this.editForm.outCardCode = item.payInfo.outCardCode
            this.editForm.outArea = item.payInfo.outArea
            this.editForm.outBank = item.payInfo.outBank
            this.editForm.returnOrderNo =item.payInfo.returnOrderNo
            this.editForm.amount = item.amount
            this.editForm.startTime = item.startTime
            this.editForm.endTime = item.endTime 
            this.editForm.cycle = item.cycle
            this.edit = true
        },
        // 关闭模态框
        closeEdit(){
            this.edit = false
        },
        // 新增、编辑放款记录
        saveLoanHandle(payload){
           return  new Promise((resolve,reject) => {
               saveLoan(payload).then(res => {
                   if(res.data.success){
                       this.$Message.success(res.data.msg);
                       this.getloanDetailList(this.queryParam)
                       if(this.editForm.id != ''){
                         this.edit = false
                       } else{
                        this.save = false
                       }
                        this.$refs['formCashWithdrawal'].resetFields();
                        this.formCashWithdrawal.endTime = ''
                   } else {
                       this.$Message.error(res.data.msg)
                   }
               }).catch(err => {
                    this.$Message.error(res.data.msg)
               })
           })
        },
        // 保存
        SaveEdit(){
          this.saveLoanHandle(this.formCashWithdrawal)
        },
        // 修改信息
        EditHandle(){
            this.saveLoanHandle(this.editForm)
        }
    }
}
</script>

<style lang="scss">
  /* 弹框样式修改 */
        .FMmodal{
            display: flex;
            justify-content: center;
            align-items: center;
            .FMcontent{
                text-align: center;
            }         
            .ivu-modal-body {
                padding: 62px 0 34px 0;
                text-align: center;
                font-size: .14rem;
                line-height: 1.5;      
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676;
            }
        }
        .ivu-modal{
                top: 0;
            }
            
            .ivu-modal-footer {
                border: none;
                padding: 0px 18px 18px 18px;
                text-align: center;
            }
            .tkDelBtn{
                padding: 5px 25px 6px;
                border: 1px solid #E7EEEF;
            }
        /* 弹框样式修改 */
 /* 大弹框*/
       /* 弹框样式修改 */
        .lgmodal{
            display: flex;
            align-items: center;
            justify-content: center;
            .lgcontent{               
            




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
            .lgtkTitle{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:#151515;
                padding-left: 6px;
                height: 14px;
                line-height: 14px;
                border-left: 4px solid #0061E2;
                margin-bottom: 10px;
            }
            .null{
                border-left-color: transparent
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
                font-size: .14rem;
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676;
            }
            .ivu-modal-footer {
                border: none;
                padding: 30px 18px 40px 18px;
                text-align: center;
                .ivu-btn {
                    padding: 6px 18px 6px;
                    font-size: .2rem;
                }
            }

        }
        /* 弹框样式修改 */
 
.FundManagement{
   
    .fmBanner{
        background-color: #ffffff;
        border: 1px solid #E7EEEF;
        border-radius: 4px;
        padding: 0 .21rem;
        .fmHeader{
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
    .fmFormBox{
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
        .nextStep{
            padding: 5px 22px 6px;
        }
    }

    .lgContent{
        margin-top:.24rem;

        .lgSmallTitle{
            border-left: 4px solid #4471FE;
            height: 14px;
            line-height: 14px;
            font-size:0.16rem;
            font-family:PingFang SC;
            font-weight:800;
            color:#151515;
            padding-left:.1rem;
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
                padding-left: .49rem;
            }
        }
        .firstDiv{
            width: 2.04rem;
            padding-left: 0 !important;
        }
        .lgWidth{
            width:1.46rem;
        }
        .lgsChedule{
            width: 1.83rem;
            // padding-left: .47rem;
        }
        .peiqi{
            width:3.5rem;
            text-align: left;
        }
        .footer{
            width:5.7rem;
            position: relative;
            span:first-child{
                padding-left:.49rem;
            }
            span:last-child{
                position: absolute;
                right: .26rem;
            }
            .backBian:hover {
                border-color:#4471FE;
                color: #4471FE;
            }
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
                padding-left: .49rem;
                height: .65rem;
            }
            .money{
                line-height: .65rem;
            }
            .lgFooter{
                display: flex;
                align-items: center;
                width: 5.7rem;
            }
            .lgFoot{
                width:1.95rem;
                text-align: left;
            }
            .lgFootDiv{
                text-align: right;
                .btnShow{
                    margin-bottom:10px;
                    font-size: .14rem;
                    padding: 3px 23px 4px;
                    border-color: #E7EEEF;
                    &:hover{
                        color: #4471FE;
                        border-color: #4471FE;
                    }
                }
                .btnBianji {                  
                    padding: 3px 9px 4px;
                    font-size: .14rem;
                    border-color: #E7EEEF;
                    &:hover{
                        color: #4471FE;
                        border-color: #4471FE;
                    }
                }
            }
            .changeColor{
                color: #4471FE;
            }
            
           .prohibit{
               color: #757575;
               background-color: #ffffff;
               border-color:#E7EEEF;
           }
        }
    }

}
// 编辑弹框
.EditModal {
    .ivu-row{
        width: 100%;
    }
    .ivu-input-wrapper{
        width: 60%;
    }
    p{
        margin: 10px 0;
        &.title{
            font-size:14px;
            font-family:'Source Han Sans CN';
            font-weight:bold;
            line-height:23px;
            color:rgba(21,21,21,1);
            border-left: 3px solid #0061E2;
            padding-left: 6px;
            line-height: 15px;
        }
        span{
        display: inline-block;
        &.labels{
            width: 70px;
        }
        &.label1{
            width: 95px;
        }
        &.val{
            color: #000;
        }
    }
    }
}
</style>
