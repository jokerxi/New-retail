<template>
    <div id="businessData">
        <!--商家数据查询-->
        <div class="businessData">
          <search :SearchParam='SearchParam'></search>
          <div class="bd_content">
            <div class="bd_content_title">
                <div>商家列表</div><div>店铺数<span>{{shopNumber}}</span>家</div></div>
                <div class="bd_table_box">
                    <Table :columns="columns1" :data="data1"></Table>
                    <pages
                        :pagations="pagations"
                        @skipHandle="PageSkip"
                        @PageSizeChange="PageSizeHandle"
                        @PageChange="PageHandle"
                    ></pages>
                </div>
          </div>
        </div>
    </div>
</template>

<script>
 import Search from '../../../../components/Search'
 import Pages from '../../../../components/Pages'
    export default{
        name: "businessData",
        components:{
            Search,
            Pages
        },
        data(){
            return {
                SearchParam: {
                    title: '商家数据查询',
                    placeholder: '请输入商家名称/店长/联系电话进行查询'
                },
                pagations:{
                    currents:1,
                    total:20,
                    pageSize:10
                },
                shopNumber: '20',
                columns1: [
                    {
                        type: 'index',
                        title: '序号',
                        key: '',
                        width: 60,
                    },
                    {
                        title: '商家信息',
                        key: 'name',
                    },
                    {
                        title: '今日销售金额',
                        key: 'todaySales',
                        sortable: true
                    },
                    {
                        title: '今日返利金',
                        key: 'rebateGold',
                        sortable: true
                    },
                    {
                        title: '总销售额',
                        key: 'totalSales',
                        sortable: true
                    },
                    {
                        title: '总返利',
                        key: 'totalRebate',
                        sortable: true
                    },
                    {
                        title: '关注会员数/总会员数',
                        key: 'memberNum',
                        sortable: true,
                        width: 160
                    },
                    {
                        title: '账户余额/预付金情况',
                        key: 'money',
                        sortable: true,
                        width: 160
                    },
                    {
                        title: '服务费',
                        key: 'serviceMoney',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'opeate',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看详情'),
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        serialNumber: '1',
                        name: '叮当会员',
                        address: '。。。。',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: '喜洋洋超市',
                        todaySales: '￥1000',
                        rebateGold: '￥5',
                        totalSales: '￥500000',
                        totalRebate: '￥200',
                        memberNum: '500/￥41000',
                        money: '￥5000/￥2000',
                        serviceMoney: '￥2000',

                    }
                ]
            }
        },
        methods: {
            Change(index){
                this.current = index
            },
            PageSkip(cur){
                if(cur){
                    this.pagations.currents = cur;
                }
            },
            PageSizeHandle(Pagesize){
                console.log(Pagesize,123)
            },
            PageHandle(Page){
                console.log(page,456)
            }
        }
    }

</script>

<style type="text/scss" lang="scss">

    #businessData{
        .businessData{
            width: 100%;
            /*border: 1px solid red;*/
        }
        .bd_content{
            background-color: #ffffff;
            border-radius: 4px;
            margin-top: .1rem;
            padding-bottom: .54rem;
            .bd_content_title{
                padding: .27rem 0 .21rem .21rem;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                align-items: flex-end;
                div:first-child{
                    /*color: #151515;*/
                    font-size:0.18rem;
                    font-family:Source Han Sans CN;
                    font-weight:bold;
                    line-height:0.23rem;
                    color:rgba(21,21,21,1);
                    opacity:1;
                }
                div:last-child{
                    margin-left: .18rem;
                    font-size:0.12rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(118,118,118,1);
                    opacity:1;
                    span{
                        color: #151515;
                    }
                }
            }
            .bd_table_box{
                padding: 0 .22rem;
            }
        }
    }

</style>
