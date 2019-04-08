<template>
    <div class="collAndlend">
        <header class="caBanner">
            <div class="totalShop">
                <div>
                    <p class="caTitle">总店铺</p>
                    <p class="caTitleCont">{{allInfo.shopNum}}家</p>
                </div>
                 <div>
                    <p class="caTitle">当前放款总额度</p>
                    <p class="caTitleCont">￥{{allInfo.currentLoanQuota}}</p>
                </div>
                 <div>
                    <p class="caTitle">当前回款总额度</p>
                    <p class="caTitleCont">￥{{allInfo.currentReturnQuota}}</p>
                </div>
                 <div>
                    <p class="caTitle">当月累计流水</p>
                    <p class="caTitleCont">￥{{allInfo.totalFlowsOfMonth}}</p>
                    <p class="caTitleSmall">累计流水：￥{{allInfo.totalFlows}}</p>
                </div>
                 <div>
                    <p class="caTitle">当月平台抽佣</p>
                    <p class="caTitleCont">￥{{allInfo.commissionOfMonth}}</p>
                    <p class="caTitleSmall">累计平台抽佣：￥{{allInfo.commission}}</p>
                </div>
            </div>
            <div class="caTable">
                <span class="tableSpan"
                :class="{'current': current === item.classify}" 
                v-for="(item,index) in titleList" 
                :key="index" 
                @click="Change(item.classify)">{{item.classifyName}}({{item.num}})</span>
                <div class="export"><a @mouseenter="exportLoanShopHandle" :href="shopUrl" download="放款店铺"><Button class="btn exportBtn" type="primary">导出Excel</Button></a></div>
            </div>
            
            <div class="caSearch">
                <span class="caTitle">店铺列表</span>
                <Input search v-model="queryParam.queryWords" placeholder="请输入店铺名称/店长/手机号码查询" />  
                <Button class="btn cabtn" type="primary" style="font-size:0.2rem" @click="queryHandle">查询</Button>
            </div>
        </header>

        <div class="caTableBox">
            <Table :columns="columns" :data="ExportIncomeList" :loading="loading"></Table>
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
                title="调整默认放款额度"
                width="330"
                class-name="CAmodal">
                <div class="CScontent">
                    <Form :model="editForm" label-position="left" :label-width="100">
                        <FormItem label="每日额度(元)：">
                            <Input v-model="editForm.quotaDaily" />
                        </FormItem>
                        <FormItem label="放款周期(天)：">
                            <Input v-model="editForm.cycle"/>
                        </FormItem>
                        <p class="tkTitle">建议每日额度</p>
                        <p class="tkTitle2">近30天平均日营业额：<span>￥{{loadQuotaDailyAdvise}}</span></p>                       
                    </Form>
                </div>
                <div slot="footer">
                    <Button style="margin-left: 8px" @click="closeModal">取消</Button>
                    <Button type="primary" @click="adjustLoanQuotaHandle">确认修改</Button>                  
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import Pages from '../../../components/Pages'
import { allInfo, ExportIncomeList, classifyTotal, adjustLoanQuota, loadQuotaDailyAdvise,exportLoanShop,exportLoanOrders, exportLoanDetails } from '../../../api/finance'
export default {
    name: "collAndlend",
    components: {
        Pages
    },

    data() {
        return{
            visiable: false,
            shopUrl:'',
            LoanOrdersUrl:'',
            LoanDetailsUrl:'',
            queryParam:{
               type:1,
               queryWords:'',
               page:1,
               limit:10
            },
            // exportParam:{
            //    type:1,
            //    queryWords:'',
            // },
            editForm:{
              shopId:'',
              id:'',
              cycle:'',
              quotaDaily:''
            },
            loadQuotaDailyAdvise:'',
            current: 1,
            pagations:{
                currents:1,
                total:0,
                pageSize:10
            },
            titleList:[],
            allInfo:{},
            ExportIncomeList:[],
            loading:false,      
            columns:[
                {
                    type: 'index',
                    title:'序号',
                    align: 'center', 
                    width:60,
                },
                {
                    title:'店铺名称',
                    key:'shopName',
                    width:120,
                },
                {
                    title:'店长',
                    key:'manager',
                    width:120,
                },
                {
                    title:'电话',
                    key:'telephone',
                    width:150,
                },
                {
                    title:'每日额度',
                    key:'quotaDaily',
                    width:150,

                },
                {
                    title:'借款周期',
                    key:'cycle',
                    width:150,

                },
                {
                    title:'建议每日额度',
                    align: 'left',
                    renderHeader:(h,params) => {
                        return <div><p>建议每日额度</p><p style="font-size:0.12rem;font-family:Source Han Sans CN;color:#767676">(近30天平均日营业额)</p></div>
                    },
                    key:'quotaDailyAdvise',
                    width:150,

                },
                {
                    title:'风控监测',
                    align: 'left',
                    color: 'red',
                    width:290,
                    render: (h, params) => {                  
                        return h('div', [

                            h('p', {
                                style:{
                                    color: '#FF7474',
                                    fontSize:'0.14rem',                              
                                    fontWeight:'500',
                                    lineHeight:'0.2rem',
                                },
                                
                            }, params.row.riskMonitorName),
                            h('p', {
                                style:{
                                    color: '#767676',
                                    fontSize:'0.12rem',                              
                                    fontWeight:'400',
                                },
                                
                            }, params.row.riskAdvice),
                        ]);
                    }      
                },
                {
                    title:'剩余额度/预警值',
                    align: 'left',
                    renderHeader:(h,params) => {
                        return <div><p>剩余额度/预警值</p><p style="font-size:0.12rem;font-family:Source Han Sans CN;color:#767676">(比例显示为红色时需快速打款)</p></div>
                    },
                    key:'warningValue',
                    width:220,
                    render: (h, params) => {
                         return <p>￥{params.row.overplusQuota}/￥{params.row.warningQuota}<span style="color:#ff0000">（{params.row.ratio}%）</span></p>
                    }
                },
                {
                    title:'操作',
                    key:'operate',
                    width:220,
                    render: (h, params) => {
                        return h('div',{class:'operate'}, [
                            h('span',{
                                class:'spanDwon'
                                },
                                [h('span',{
                                    class:'spanList'
                                },
                                    [
                                        h('a',{
                                             attrs:{
                                                href:this.LoanOrdersUrl,
                                                download:'账单报表',
                                            },
                                             on:{
                                                mouseenter:() => {
                                                    this.exportLoanOrdersHandle({shopId:params.row.shopId})
                                                }
                                            }
                                        },'账单报表'),
                                        h('a',{
                                            attrs:{
                                                href:this.LoanDetailsUrl,
                                                download:'放款记录',
                                            },
                                            on:{
                                              mouseenter:() => {
                                                    this.exportLoanDetailsHandle({shopId:params.row.shopId})
                                                }
                                            }
                                        },'放款记录')
                                    ])

                            ]),
                            h('Button', {
                                props: {
                                    type:'default',
                                    size: 'small'
                                },
                                style:{
                                
                                    borderRadius:'0.04rem',
                                    margin:'0 0.05rem',
                                    padding: '4px 7px 5px',
                                },
                                on: {
                                    click: () => {
                                    this.$router.push({path:'/finance/FundManagement',query:{shopId:params.row.shopId}})
                                    }
                                }
                            }, '放款管理'),
                            h('Button', {
                                props: {
                                    type:'default',
                                    size: 'small'
                                },
                                style:{
                                
                                    borderRadius:'0.04rem',
                                    margin:'0 0.05rem',
                                    padding: '4px 7px 5px',
                                },
                                on: {
                                    click: () => {
                                        this.openModal(params.row)
                                    }
                                }
                            }, '调整额度')
                        ]);
                    }
                },
            ]
        }
    },
    created(){
        this.getAllInfo()
        this.getExportIncomeList(this.queryParam)
        this.getclassifyTotal()
        // this.exportLoanShopHandle(this.exportParam)
    },
    methods: {
        //点击table变换颜色
        Change(index){
            this.current = index
             this.queryParam.type = index
             this.exportParam.type = index
            this.getExportIncomeList(this.queryParam)
            this.exportLoanShopHandle(this.exportParam)
        },
        // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            }  
            this.queryParam.page = cur
            this.getExportIncomeList(this.queryParam)
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
            this.queryParam.limit = Pagesize
            this.getExportIncomeList(this.queryParam)
        },
        // 分页当前页
        PageHandle(Page){
           this.queryParam.page = Page
            this.getExportIncomeList(this.queryParam)
        },
        // 加载放款汇总
        getAllInfo(){
            return new Promise((resolve,reject) => {
                allInfo().then(res=>{
                  if(res.data.success){
                      this.allInfo = res.data.data
                  } else{
                      this.$Message.error(res.data.msg)
                  }
                }).catch(err => {
                  this.$Message.error(err)
                })
            })
        },
        // 放款店铺列表
        getExportIncomeList(payload){
            this.loading = true
            return new Promise((resolve,reject) => {
                ExportIncomeList(payload).then(res => {
                    if(res.data.success){
                        this.loading = false
                        this.ExportIncomeList = res.data.data
                        this.pagations.total = res.data.total
                    } else {
                        this.loading =false
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.loading =false
                    this.$Message.error(err)
                })
            })
        },
        // 查询操作
        queryHandle(){
            this.getExportIncomeList(this.queryParam)
        },
        // 获取分类统计数量
        getclassifyTotal(){
            return new Promise((resolve,reject) => {
                classifyTotal().then(res => {
                    if(res.data.success){
                       this.titleList = res.data.data.counter
                    } else{
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                     this.$Message.error(err)
                })
            })
        },
        // 打开模态框
        openModal(item){
            this.visiable = true
            this.editForm.shopId = item.shopId
            this.editForm.id = item.id
            this.editForm.cycle = item.cycle
            this.editForm.quotaDaily = item.quotaDaily
            this.getloadQuotaDailyAdvise(item.shopId)
        },
        closeModal(){
         this.visiable = false
        },
        // 获取建议每日额度
        getloadQuotaDailyAdvise(payload){
            return new Promise((resolve,reject) => {
                loadQuotaDailyAdvise(payload).then(res => {
                    if(res.data.success){
                       this.loadQuotaDailyAdvise = res.data.data
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        // 调整默认放款额度
        adjustLoanQuotaHandle(){
          return new Promise((resolve,reject) => {
              adjustLoanQuota(this.editForm).then(res=>{
                  if(res.data.success){
                      this.$Message.success(res.data.msg)
                      this.visiable = false;
                      this.getExportIncomeList(this.queryParam)
                  } else {
                      this.$Message.error(res.data.msg)
                  }
              }).catch(err => {
                   this.$Message.error(err)
              })
          })
        },
        // 导出放款店铺
        exportLoanShopHandle(){
            let params = this.queryParam
            params.page = ''
            params.limit =''
            return new Promise((resolve,reject) => {
               exportLoanShop(params).then(res => {
                   if(res.data.success){
                       this.shopUrl = res.data.data
                   } else {
                     this.$Message.error(res.data.msg)
                   }
               }).catch(err => {
                   this.$Message.error(err)
               })
            })
        },
        // 导出放款账单记录
        exportLoanOrdersHandle(payload){
           return new Promise((resolve,reject) => {
               exportLoanOrders(payload).then(res => {
                   if(res.data.success){
                     this.LoanOrdersUrl = res.data.data
                   } else {
                       this.$Message.error(res.data.msg)
                   }
               }).catch(err => {

               })
           })
        },
         // 放款记录导出
        exportLoanDetailsHandle(payload){
            return new Promise((resolve,reject) => {
                exportLoanDetails(payload).then(res => {
                  if(res.data.success){
                     this.LoanDetailsUrl = res.data.data
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
        .CAmodal{
            display: flex;
            align-items: center;
            justify-content: center;
            .CScontent{
                text-align:left;
                .tkTitle{
                    font-size:0.14rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:0.4rem;
                    color:#767676;
                }
                .tkTitle2{
                    font-size:0.14rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:0.4rem;
                    color:#151515;
                    span{
                        font-weight: bold;
                    }
                }
            }
            .ivu-modal{
                top: 0;
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
                padding: .14rem .4rem;;
                font-size: .14rem;
                line-height: 1.5;      
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676;
            }
            .ivu-modal-footer {
                border: none;
                padding: 0px 18px 18px 18px;
                text-align: center;
                .ivu-btn{
                    width: 95px;
                    padding:3px 5px 6px;
                    font-size:0.2rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                }
            }

            // 弹框form
            .ivu-form-item {
                margin-bottom: 10px;
                vertical-align: top;
                zoom: 1;
            }
            .ivu-form .ivu-form-item-label {
                text-align: left;
                vertical-align: middle;
                float: left;
                font-size: .14rem;
                line-height: 1;
                padding: 12px 1px 10px 0;
                box-sizing: border-box;
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#151515;

            }
        }
        /* 弹框样式修改 */

    .collAndlend{
        .ivu-table-overflowX{
            overflow-x:auto;
        }
        .caBanner{
            background-color: #ffffff;
            border: 1px solid #E7EEEF;
            height: 293px;
            min-height: 208px;
            border-radius: 4px;
            padding: 0 .21rem;
            .totalShop{
                height: 170px;
                min-height: 122px;
                display: flex;
                justify-content:center;
                align-items: center;
                border-bottom: 1px dashed #E7EEEF;
                div:first-child{
                    width: 1.99rem;
                    text-align: center;
                    padding-left: 0;
                }
                div:last-child{
                   border-right: none;
                }
                div{
                    width: 3.4rem;
                    height: 80px;
                    min-height: 55px;
                    text-align: left;
                    border-right: 1px solid #E7EEEF;
                    padding-left:0.71rem;
                    box-sizing: border-box;
                    .caTitle{
                        font-size:0.16rem;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        line-height:0.4rem;
                        color:#000000;
                    }
                    .caTitleCont{
                        font-size:0.2rem;
                        font-family:Source Han Sans CN;
                        font-weight:bold;
                        color:#000000;
                    }
                    .caTitleSmall{
                        font-size:0.14rem;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        color:#757575;
                    }
                }
            }
            

            .caTable{
                height: 50px;
                border-bottom: 1px solid #E7EEEF;
                padding-bottom:2px; 


                position: relative;
                .export{
                    position: absolute;
                    top: .1rem;
                    right: 0.2rem;
                    .exportBtn{
                        height:30px;
                        width:100%;
                        padding: 2px 15px 5px; 
                    }
                }

               
                .tableSpan{
                    line-height: 50px;
                    height: 50px;
                    display: block;
                    float: left;
                    cursor: default;
                    text-align: center;
                    width: 150px;
                    color: #767676;
                    font-size:0.14rem;
                    font-family:Source Han Sans CN;
                    font-weight:bold;                   
                     &.current{
                    border-bottom: 2px solid #0061E2;
                    color: #000000;
                    }
                }
            }
            
            .caSearch{
                height: 70px;
                min-height: 51px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .caTitle{
                    font-size:0.16rem;
                    font-family:PingFang SC;
                    font-weight:800;
                    line-height:0.23rem;
                    color:#151515;

                }
                .ivu-btn{
                    font-size: .2rem;
                    padding: 1px 15px 3px; 
                    height:40px;
                }
                .ivu-input-icon {
                width: 40px;
                height: 40px;
                line-height: 40px;
                font-size: 22px;
                text-align: center;
                color: #808695;
                position: absolute;
                left: .2rem;
                z-index: 3;
                }
                .ivu-input {
                    margin-left:.2rem; 
                    display: inline-block;
                    width: 3.8rem;
                    height: 40px;
                    line-height: 2;
                    padding: 4px 35px;
                    font-size: .14rem;
                    border: 1px solid #dcdee2;
                    border-radius: 4px;
                    color: #515a6e;
                    background-color: #fff;
                    background-image: none;
                    position: relative;
                    cursor: text;
                    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
                }
                .ivu-input-wrapper {
                    display: inline-block;
                    width: 4.2rem;
                    position: relative;
                    vertical-align: middle;
                    line-height: normal;
                }
            }
        }
        .operate{
            display: flex;
            align-items: center;
          .spanDwon{
            position: relative;
            width:.3rem;
            height:.3rem;
            margin:0 0.05rem;
            display:inline-block;
            background:url('../../../../static/image/down.png') no-repeat center center;
            background-size:.15rem .15rem;
            border:1px solid #dcdee2;
            border-radius: 3px;
            padding: 0.1rem;
            cursor: pointer;
            .spanList{
                position: absolute;
                width: .8rem;
                height: 0.5rem;
                padding: 0.05rem 0;
                box-sizing: border-box;
                background:rgba(255,255,255,1);
                border: 1px solid #ddd;
                border-radius:0.04rem;
                font-size:0.14rem;
                font-family:'Source Han Sans CN';
                font-weight:400;
                z-index: 500;
                left:0.3rem;
                top:-0.1rem;
                display: none;
                &:before{
                    content: '';
                    width:0.1rem;
                    height: 0.1rem;
                    background: #fff;
                    -webkit-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    transform: rotate(45deg);
                    display: inline-block;
                    position: absolute;
                    left:-0.05rem;
                    top:50%;
                    z-index: 0;
                    border-left: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                }
                a{
                    width: 100%;
                    display: inline-block;
                    line-height: 1.5em;
                    text-align: center;
                }
            }
            &:hover .spanList{
                   display: inline-block;
                }
        }
        }
        .caTableBox{
            margin-top:.1rem;
            border-radius: 4px;
            background-color: #ffffff;
            padding: .02rem .2rem .33rem .22rem;
        }
    }

</style>
