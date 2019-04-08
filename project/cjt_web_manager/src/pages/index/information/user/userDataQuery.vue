<template>
    <div id="userDataQuery">
            <!--首页》用户数据查询-->
        <div class="udq_content">
            <div class="udq_header">
                <p>用户数据查询</p>
                <div class="udq_form_box">
                    <Form ref="formInline" inline>
                        <FormItem label="选择日期">
                            <DatePicker :value="formItem.value2" format="yyyy/MM/dd" type="daterange"  placeholder="选择日期"></DatePicker>
                        </FormItem>
                        <FormItem label="超市">
                            <Select class="uesr" v-model="formItem.select">
                                <Option value="beijing">舞东风</Option>
                                <Option value="shanghai">人人乐</Option>
                                <Option value="shenzhen">家乐福</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="客单价">
                            <Select v-model="formItem.select">
                                <Option value="beijing">100-400</Option>
                                <Option value="shanghai">400-800</Option>
                                <Option value="shenzhen">800-1200</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="">
                            <div class="udq_header_content">
                                <input id="12" type="text" placeholder="请输入用户昵称查询">
                                <label for="12" class="iconfont icon-sousuoicon"></label>
                                <button class="btn" type="button">查询</button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div class="udq_content_box">
                <div class="udq_content_title">
                    <div>用户列表</div><div>用户数 <span>{{goodsNumber}}</span> 位</div>
                </div>
                <div class="udq_table_box">
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
    import Pages from '../../../../components/Pages'
    

    export default{
        name: "userDataQuery",
        components:{
            Pages           
        },
        data(){
            return{
                formItem: {
                    input: '',
                    select: '',
                    value2: ['2016-01-01', '2016-02-15'],
                },
                goodsNumber: '218',
                pagations:{
                    currents:1,
                    total:20,
                    pageSize:10
                },
                columns1: [
                    {
                        type: 'index',
                        title: '序号',
                        key: '',
                    },
                    {
                        title: '用户头像',
                        key: 'avatar',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
//                                        params.row.avatar
                                        src: '../../../../../static/image/touxiang@2x.png'
                                    },
                                    style: {
                                        width: '.34rem;',
                                        borderRadius: '.04rem;'

                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看详情'),
                            ]);
                        }
                    },
                    {
                        title: '昵称',
                        key: 'todaySales'
                    },
                    {
                        title: '消费金额',
                        key: 'rebateGold',
                        sortable: true
                    },
                    {
                        title: '总返利',
                        key: 'totalSales',
                        sortable: true
                    },
                    {
                        title: '会员卡数量',
                        key: 'totalRebate',
                        sortable: true
                    },
                    {
                        title: '消费最高的超市',
                        key: 'memberNum',
                    },
                    {
                        title: '该超市用户的标签',
                        key: 'money',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#FFB50D',
                                        borderColor:'#FFB50D',
                                        borderRadius:'.15rem',
                                        height:'0.26rem;',
                                        background:'rgba(255,181,13,1);',
                                        opacity:'0.2;',

                                    },
                                    on: {

                                    }
                                }, '查看详情'),
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#4471FE',
                                        borderColor:'#4471FE',
                                        borderRadius:'.15rem',
                                        height:'0.26rem;',
                                        backgroundColor:'rgba(255,181,13,0.8);',
                                        opacity:'0.2;',

                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '沉默顾客')


                            ]);
                        }

                    },
                    {
                        title: '客单价',
                        key: 'serviceMoney',
                        sortable: true
                    },
                    {
                        title: '创建时间',
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
                        name: '喜洋洋超市',
                        todaySales: '￥1000',
                        rebateGold: '￥5',
                        totalSales: '￥500000',
                        totalRebate: '￥200',
                        memberNum: '500/41000',
                        money: '￥5000/￥2000',
                        serviceMoney: '￥2000',
                    }
                ]
            }
        },
        methods:{
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
    #userDataQuery{
        width: 100%;
        height: 100%;
        .udq_content{

            .udq_header{
                background: url("../../../../../static/image/sjbg@x.png")no-repeat;
                background-size: cover;
                color: #ffffff;
                padding: .44rem 0 0 .6rem;
                box-sizing: border-box;
                p{
                    font-size:0.18rem;
                    font-family:Source Han Sans CN;
                    font-weight:bold;
                }
                .udq_form_box{
                    padding-top: .3rem;
                    box-sizing: border-box;
                    /*padding-bottom: .44rem;*/
                    label{
                        color: #ffffff;
                    }

                    .cdq_header_content{
                        position: relative;
                    }
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
                    .btn {
                        margin-left: .3rem;
                        padding: .0rem .2rem;
                    }
                }
            }
            .udq_content_box{
                background-color: #ffffff;
                margin-top: .1rem;
                padding-bottom: .54rem;
                border-radius: 4px;
            }
            .udq_content_title{
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
                    font-weight:400;
                    font-family:Source Han Sans CN;
                    color:rgba(118,118,118,1);
                    opacity:1;
                    span{
                        color: #151515;
                    }
                }
            }
            .udq_table_box{
                padding: 0 .22rem;
            }
        }
        .ivu-date-picker-cells span em{
            color:  #151515;
            font-size: .14rem;
        }
        .ivu-input-icon{
            color: #4471FE  !important;
        }
        .ivu-input {
            height: .4rem;
            padding: 4px 7px;
            font-size: .14rem;
            width: 3.3rem;
        }
        .ivu-input-icon {
            // width: .4rem;
            // height: 40px;
            // line-height: 40px;
            font-size: .16rem;
            color: #808695;
            position: absolute;
            right: 0;
            z-index: 3;
        }
        .ivu-select-single .ivu-select-selection {
            height: .4rem;
        }
        .uesr .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            height: .4rem;
            line-height: .4rem;
            color: #151515;
        }
    }

</style>
