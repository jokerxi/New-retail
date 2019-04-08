<template>
    <div id="bestSellingGoods">
        <!--畅销品缺货分析-->
        <div class="bs_content">
            <div class="bs_header">
                <p>畅销品缺货分析</p>
                <div class="bs_form_box">
                    <Form ref="formInline" inline>
                        <FormItem label="品类">
                            <Select v-model="formItem.select">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="供应商">
                            <Select v-model="formItem.select">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="">
                            <div class="bd_header_content">
                                <input id="12" type="text" placeholder="请输入商品进行查询">
                                <label for="12" class="iconfont icon-sousuoicon"></label>
                                <button class="btn" type="button">查询</button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div class="bs_content_box">
                <div class="bs_content_title">
                    <div>畅销品缺货分析</div><div>商品数数<span>{{goodsNumber}}</span>件</div>
                </div>
                <div class="bs_table_box">
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
        name: "bestSellingGoods",
        components:{
            Pages
        },
        data(){
            return{
                formItem: {
                    input: '',
                    select: '',
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
                        title: '商品名',
                        key: 'name',
                    },
                    {
                        title: '条码',
                        key: 'todaySales'
                    },
                    {
                        title: '供应商',
                        key: 'rebateGold'
                    },
                    {
                        title: '进价',
                        key: 'totalSales',
                        sortable: true
                    },
                    {
                        title: '售价',
                        key: 'totalRebate',
                        sortable: true
                    },
                    {
                        title: '系统毛利',
                        key: 'memberNum',
                        sortable: true
                    },
                    {
                        title: '进30天销售',
                        key: 'money',
                        sortable: true
                    },
                    {
                        title: '剩余库存',
                        key: 'serviceMoney',
                        sortable: true
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
    #bestSellingGoods {
        .bs_content{

            .bs_header{
                background: url("../../../../../static/image/sjbg@x.png")no-repeat;
                background-size: cover;
                overflow: hidden;
                color: #ffffff;
                padding: .44rem 0 0 .6rem;
                box-sizing: border-box;
                p{
                    font-size:0.18rem;
                    font-family:Source Han Sans CN;
                    font-weight:bold;

                }
                .bs_form_box{
                    padding-top: .3rem;
                    /*padding-bottom: .44rem;*/
                    label{
                        color: #ffffff;
                    }

                    .bd_header_content{
                        position: relative;
                    }
                    .bd_header_content label{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 14px;
                        right: 0;
                        color: #767676;
                        font-size: .14rem;
                    }
                    .bd_header_content input{
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
            .bs_content_box{
                background-color: #ffffff;
                margin-top: .1rem;
                border-radius: 4px;
                padding-bottom: .54rem;
            }
            .bs_content_title{
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
            .bs_table_box{
                padding: 0 .22rem;
            }
        }
    }
</style>
