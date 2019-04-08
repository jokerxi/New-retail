<template>
    <div class="cashManagement">
        <!-- 提现管理 -->
        <div class="cmHeader">
            <p>提现申请记录查询</p>
            <div class="cmFormBox"> 
                <Form ref="cashdataform" inline>
                    <FormItem label="日期筛选">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" @on-change="getDate" placeholder="选择日期"></DatePicker>
                    </FormItem>
                    <FormItem label="状态">
                        <Select class="user" v-model="params.status">
                            <Option 
                            v-for="(sales,index) in status"
                            :key="index"
                            :value="sales.id">{{sales.name}}</Option>
                            
                        </Select>
                    </FormItem>                       
                    <FormItem label=" ">
                        <div class="udq_header_content">
                            <input id="12" v-model="params.shopId" type="text" placeholder="请输入用户昵称查询">
                            <label for="12" class="iconfont icon-sousuoicon"></label>
                        </div>
                    </FormItem>
                    <FormItem>
                         <button class="btn" type="button" @click="queryHandle">查询</button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="cmContentBox">
            <div class="cmTitle">
                <h3>提现申请</h3><a @mouseenter="exportWithdrawsHandle" :href="exportWithdrawsUrl" download="放款记录"><Button class="btn exportBtn" type="primary">导出Excel</Button></a>
            </div>
            
            <div class="cmTableBox">
                <Table :columns="columns" :data="CashList" :loading="loading"></Table>
                <pages
                :pagations="pagations"
                @skipHandle="PageSkip"
                @PageSizeChange="PageSizeHandle"
                @PageChange="PageHandle"
                ></pages>
            </div>
        </div>
    </div>
</template>

<script>
import Pages from '../../../components/Pages'
import { CashList, CashReject,exportWithdraws } from '../../../api/finance'
export default {
    name: "cashManagement",
    components: {
        Pages
    },
    data(){
        return{
            params:{
              shopId:'',
              startDate:'',
              endDate:'',
              status:'',
              page:1,
              limit:10,
            },
            exportWithdrawsUrl:'',
            CashList:[],
            loading:false,
            status: [
                {
                   id:1,
                   name:'待审核' 
                },
                {
                   id:2,
                   name:'已打款' 
                },
                {
                   id:3,
                   name:'未通过审核' 
                },
            ],
            pagations:{
                currents:1,
                total:0,
                pageSize:10
            },
            columns:[
                {
                    type: 'index',
                    title:'序号',
                    align: 'center', 
                    width:80,
                },
                {
                    title:'创建时间',
                    key:'createdTime',
                },
                {
                    title:'店铺名称',
                    key:'shopName',
                },
                {
                    title:'提现金额',
                    key:'payAmount',
                },
                {
                    title:'余额结余',
                    key:'balance',

                },
                {
                    title:'平台单号',
                    key:'orderNo',

                },
                {
                    title:'处理状态',
                    align: 'left',
                    key:'statusName',

                },
                {
                    title:'操作',
                    key:'operate',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type:'default',
                                    size: 'small'
                                },
                                style:{
                                
                                    borderRadius:'0.04rem',
                                    margin:'0 0.05rem'
                                },
                                on: {
                                    click: () => {
                                    this.$router.push({path:'/finance/LoanManagement',query:{shopId:params.row.shopId,withdrawId:params.row.withdrawId}})
                                    }
                                }
                            }, '打款管理'),
                            h('Button', {
                                props: {
                                    type:'default',
                                    size: 'small',
                                    disabled:params.row.status == 1 ? false : true
                                },
                                style:{
                                
                                    borderRadius:'0.04rem',
                                    margin:'0 0.05rem'
                                },
                                on: {
                                    click: () => {
                                        this.CashRejectHandle(params.row)
                                    }
                                }
                            }, '驳回申请')
                        ]);
                    }
                },
            ]
        }
    },
    created(){
        this.getCashList(this.params)
    },
    methods: {
        // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            } 
            this.params.page = cur
            this.getCashList(this.params) 
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
           this.params.limit = Pagesize
            this.getCashList(this.params) 
        },
        // 分页当前页
        PageHandle(Page){
           this.params.page = Page
            this.getCashList(this.params) 
        },
        // 获取日期
        getDate(start){
           this.params.startDate = start[0]
           this.params.endDate = start[1]
        },
        // 店铺提现列表
        getCashList(payload){
            return new Promise((resolve,reject) => {
                this.loading = true
                CashList(payload).then(res => {
                    if(res.data.success){
                      this.CashList = res.data.data
                      this.loading = false
                      this.pagations.total = res.data.total
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        // 查询操作
        queryHandle(){
            this.getCashList(this.params)
        },
        // 提现驳回
        CashRejectHandle(payload){
            return new Promise((resolve,reject) => {
                CashReject(payload).then(res => {
                   if(res.data.success){
                       this.$Message.success(res.data.msg)
                   } else {
                       this.$Message.error(res.data.msg)
                   }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        // 导出提现记录
        exportWithdrawsHandle(){
             let param = this.params
             param.page=''
             param.limit=''
            return new Promise((resolve,reject) => {
                exportWithdraws(param).then(res => {
                  if(res.data.success){
                     this.exportWithdrawsUrl = res.data.data;
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
    .cashManagement{
        width: 100%;
        height: 100%;
        .cmHeader{
            background: url("../../../../static/image/sjbg@x.png")no-repeat;
            background-size: cover;
            border-radius: 4px;
            padding: .44rem 0 .43rem .6rem;
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
            .cmFormBox{

                label{
                    color: #ffffff;
                }
                // 搜索框
                .udq_header_content label{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 14px;
                    right: 0;
                    color: #767676;
                    font-size: .14rem;
                }
                .udq_header_content input{
                    width: 3.8rem;
                    height: .4rem;
                    border-radius: 4px;
                    font-size:0.14rem;
                    color: #767676;
                    padding: 12px 4px 12px 35px;
                }
                // 搜索框
                .btn {
                        padding: .0rem .2rem;
                        font-size: 0.16rem;
                        font-size: .2rem;
                }   
                // 下拉框
                .ivu-select {
                    display: inline-block;
                    width: 1.5rem;
                    box-sizing: border-box;
                    vertical-align: middle;
                    color:#151515;
                    font-size: .14rem;
                    line-height: normal;
                } 
                .ivu-select-item-focus {
                    background: #4471FE;
                }
                .ivu-select-item-selected, .ivu-select-item-selected:hover {
                    color: #ffffff;
                }
                
                .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
                    display: block;
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .14rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-left: 8px;
                    padding-right: 24px;
                }
                // 下拉框
                //日期
                .ivu-input {
                    height: .4rem;
                    padding: 4px 7px;
                    font-size: .14rem;
                    width: 3.3rem;
                }  
                .ivu-input-icon {
                    line-height: .4rem;
                    font-size: .16rem;
                    text-align: center;
                    color: #4471FE;
                    position: absolute;
                    right: 0;
                    z-index: 3;
                }
                .ivu-btn{
                    font-size: .2rem;
                    padding: 0 15px 5px; 
                    height:40px;
                }  
                .ivu-form-item {
                    margin-bottom: 0;
                }         
            }
        // 以上为header部分
        }
        .cmContentBox{
            margin-top: .24rem;
            h3{
                margin: 0;
                padding: 0;
                height: 14px;
                border-left: 4px solid #4471FE;
                padding-left: .1rem;               
                font-size:0.16rem;
                font-family:PingFang SC;
                font-weight:800;
                line-height:14px;
                color:#151515;
            }
            .cmTitle{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .exportBtn{
                        height:30px;
                        width:1rem;
                        padding: 2px 15px 5px 8px; 
                    }
            }
            .cmTableBox{
                margin-top: .14rem;
                border-radius: 4px;
                padding: .05rem .22rem;
                background-color: #ffffff;
            }

        }

    }
</style>
