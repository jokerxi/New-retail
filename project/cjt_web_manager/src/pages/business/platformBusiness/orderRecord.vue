<template>
    <div class="orderRecord">
        <!-- 运营管理》平台管理》订单记录 -->
        <div class="orHeader">
            <p>用户数据查询</p>
            <div class="orFormBox">
                <Form ref="userdataform" inline>
                    <FormItem label="选择日期">
                        <DatePicker @on-change="getTime" format="yyyy-MM-dd HH:mm:ss" type="daterange" placeholder="选择日期"></DatePicker>
                    </FormItem>
                    <FormItem label="状态">
                        <Select class="user" clearable v-model="parameter.orderStatus">
                            <Option v-for="(sal,index) in ticket_sales" :key="index" :value="sal.id">{{sal.orderStatus}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="支付方式">
                        <Select class="user" clearable v-model="parameter.payType">
                            <Option v-for="(sales,index) in payType" :key="index" :value="sales.id">{{sales.payName}}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="子公司">
                        <Select class="user" clearable v-model="parameter.shopId">
                            <Option v-for="(item,index) in SubsidiaryList" :key="index" :value="item.id">{{item.companyShortName}}</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="">
                        <div class="orHeaderContent">
                            <input id="12" type="text" clearable placeholder="请输入店铺名称查询">
                            <label for="12" class="iconfont icon-sousuoicon"></label>
                        </div>
                    </FormItem>
                    <FormItem label="">
                        <div class="orHeaderContent">
                            <button @click="queryHandle" class="btn" type="button">查询</button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="orContentBox">
            <div class="orContentBoxHeader">
                <div class="ortitle">订单列表<span class="ortitle1">共 <span>{{pagations.total}}</span> 条</span></div>
                <div><a @mouseenter="exportOrderDataHandle" :href="exportOrderDataUrl" download="订单记录"><button class="btn dwidth" type="button">导出</button></a></div>
            </div>
            <Table :columns="columns" :data="data"></Table>
            <pages :pagations="pagations" @skipHandle="PageSkip" @PageSizeChange="PageSizeHandle" @PageChange="PageHandle"></pages>
        </div>
    </div>
</template>
<script>
import { OrderList,exportOrderData } from '../../../api/platFormBusiness'
import {getSubCorporation} from '../../../api/SubCorporation'
import Pages from '../../../components/Pages'
import { payChannelSave } from '../../../api/finance';
export default {
    name: 'orderRecord',
    components:{
        Pages
    },
    data() {
        return {
            orderNumber: "",
            exportOrderDataUrl:'',
            pagations:{
                currents:1,
                total:20,
                pageSize:10
            },
            parameter:{
                shopId: "",
                startDate: "",
                endDate: "",
                orderStatus: "",
                payType: "",
                page: 1,
                limit: 10,
            },
            shopList:{
                name: "",
                page: "",
                pageSize: ""
            },
            ticket_sales: [
                { 
                    id: 1 ,
                    orderStatus: '已完成'                   
                },
                {
                    id: 2 ,
                    orderStatus: '返利金计算中'  
                },
            ],
            payType: [
                { 
                    id: 1 ,
                    payName: '微信'                   
                },
                {
                    id: 2 ,
                    payName: '支付宝'  
                },
            ],
            SubsidiaryList: [],
            data:[],
            columns: [
                {
                    type:'index',
                    title:'序号',
                    align: 'center',
                    width: 80
                },
                {
                    title: '平台单号',
                    key: 'orderNo',
                    align: 'left',
                    width: 180
                },
                {
                    title: '店铺名称',
                    key: 'shopName',
                    align: 'left',
                    width: 120
                },
                {
                    title: '交易时间',
                    key: 'payTime',
                    align: 'left',
                    width: 150
                },
                {
                    title: '交易金额',
                    key: 'totalMoney',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.totalMoney}</span>
                    }
                },
                {
                    title: '微信',
                    key: 'weixin',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.weixin}</span>
                    }
                },
                {
                    title: '支付宝',
                    key: 'alipay',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.alipay}</span>
                    }
                },
                {
                    title:'返利金抵扣',
                    key:'discountMoney',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.discountMoney}</span>
                    }
                },
                {
                    title: '奖金池',
                    key: 'cashPool',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.cashPool}</span>
                    }
                },
                {
                    title: '服务费',
                    key: 'serveTotal',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.serveTotal}</span>
                    }
                },
                {
                    title: '入账金额',
                    key: 'accountMoney',
                    align: 'left',
                    render:(h,params) => {
                        return <span>￥{params.row.accountMoney}</span>
                    }
                },
                {
                    title: '状态',
                    key: 'orderStatus',
                    align: 'left',
                    render:(h,params) => {
                        return <span>{params.row.orderStatus == 1 ? "已完成":"返利计算中"}</span>
                    }
                },
                {
                    title: '支付方式',
                    key: 'payTypeName',
                    align: 'left',
                },
            ] 
        };
    },
    created(){
        this.OrderListHandler(this.parameter)
        this.getCompanyList(this.shopList)
    },
    methods: {
         Change(index){
            this.current = index
        },
        // 分页跳转
        PageSkip(cur){
            if(cur){
               this.pagations.currents = cur;
            } 
            this.parameter.page = cur 
            this.OrderListHandler(this.parameter) 
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
            // console.log(Pagesize,123)
            this.parameter.limit = Pagesize
            this.OrderListHandler(this.parameter) 
        },
        // 分页当前页
        PageHandle(Page){
            this.parameter.page = Page
            // console.log(this.parameter,456)
            this.OrderListHandler(this.parameter) 
        },
        //  获取订单列表
        OrderListHandler(payload){
            return new Promise((resolve,reject) => {
                OrderList(payload).then(res => {
                    if(res.data.success){
                        console.log(111,res.data.data)
                        this.data = res.data.data
                        this.pagations.total = res.data.total.total
                    }else{
                        this.loading = false;
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        //  获取子公司
        // getCompanyList(payload){
        //     return new Promise((resolve,reject) => {
        //         getSubCorporation(payload).then(res => {
        //             if(res.data.success){
        //                 this.SubsidiaryList = res.data.data
        //                 //  console.log(888,this.SubsidiaryList)
        //             }else{
        //                 this.$Message.error(res.data.msg)
        //             }
        //         }).catch(err => {
        //             this.$Message.error(err)
        //         })
        //     })
        // },

        //  获取日期
        getTime(start){
            // console.log(start,2222)
            this.parameter.startDate = start[0]
            this.parameter.endDate = start[1]
        },

        //  查询操作
        queryHandle(){
            // console.log(9999)
            this.OrderListHandler(this.parameter)
        },

        //  导出提现
        exportOrderDataHandle(payload){
            let param = this.parameter
             param.page=''
             param.limit=''
             return new Promise((resolve,reject) => {
                exportOrderData(payload).then(err => {
                    if(res.data.success){
                        this.exportOrderDataUrl = res.data.data;
                        // console.log(this.exportWithdrawsUrl,'订单记录')
                    }else{
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
             })
        }
    }

};
</script>
<style type="text/scss" lang="scss">
    .orderRecord{
        width: 100%;
        // height: 100%;
        .orHeader{
            background: url("../../../../static/image/sjbg@x.png")no-repeat;
            background-size: cover;
            border-radius: 4px;
            padding: .44rem 0 0 .6rem;
            box-sizing: border-box;
            p{
                font-size:0.18rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:rgba(255,255,255,1);
                opacity:1;
                padding-bottom: .3rem;
                box-sizing: border-box;
            }
            .orFormBox{

                label{
                    color: #ffffff;
                }
                .orHeaderContent label{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 14px;
                    right: 0;
                    color: #767676;
                    font-size: .14rem;
                }
                .orHeaderContent input{
                    width: 3.8rem;
                    height: .4rem;
                    border-radius: 4px;
                    font-size:0.14rem;
                    color: #767676;
                    padding: 12px 4px 12px 35px;
                }
                .btn {
                       
                        padding: .0rem .2rem;
                }    
                .ivu-input {
                    height: .4rem;
                    padding: 4px 7px;
                    font-size: .14rem;
                    width: 3.35rem;
                }             
            }
        }
        .ivu-input-icon {
            width: .4rem;
            height: .4rem;
            line-height: .4rem;
            font-size: .16rem;
            color: #808695;
            position: absolute;
            right: 0;
            z-index: 3;
        }
        .ivu-date-picker-cells span em{
            color:  #151515;
            font-size: .14rem;
        }
        
        .ivu-select-single .ivu-select-selection {
            height: .4rem;
        }
        .user .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            height: .4rem;
            line-height: .4rem;
            color: #151515;
        }
        // table
        .orContentBox{
            width: 100%;
            border:1px solid #E7EEEF;
            border-radius: 4px;
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.12rem 0.22rem;
            font-family:'Source Han Sans CN';

            .orContentBoxHeader{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .ortitle{
                    font-size:0.18rem;
                    font-family:Source Han Sans CN;
                    font-weight:bold;
                    line-height:0.23rem;
                    color:#151515;
                    opacity:1;
                    .ortitle1{
                        font-size:0.14rem;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        line-height:0.23rem;
                        color:#767676;
                        opacity:1;
                        margin-left: .13rem;
                        span{
                            color: #151515;
                        }
                    }
                }
                .dwidth{
                    width: .6rem;
                    height: 30px ;
                    line-height: 30px;
                    font-size: .12rem;
                    margin-left: .3rem;
                }
            }
        }
    }
</style>
