<template>
    <div class="SubCorporation">
        <!--子公司查询-->
        <div class="sc_header">
            <search :SearchParam='SearchParam' v-on:SearchBtn="mySearch"></search>
            <div class="sc_content">
                <div class="sc_content_title">
                    <div class="sc_content_left">
                        <div>子公司列表</div>
                        <div>子公司数 <span>{{pagations.total}}</span> 个</div>
                    </div>
                    <div>
                        <router-link to="/platForm/addSubCorporation" tag="button" class="sc_btn" type="primary">
                            <span class="iconfont icon-tianjialanseicon"></span>
                            新建子公司
                        </router-link>
                    </div>
                </div>
                <div class="sc_table_box">
                    <Table :columns="tableHead" :data="tableData" :loading="tableLoad"></Table>
                    <pages
                        :pagations="pagations"
                        @skipHandle="PageHandle"
                        @PageSizeChange="PageSizeHandle"
                        @PageChange="PageHandle"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from '../../../../components/Search'
    import Pages from '../../../../components/Pages'

    import {getSubCorporation} from '../../../../api/SubCorporation'

    export default {
        name: "SubCorporation",
        components: {
            Search,
            Pages
        },
        data() {
            return {
                searchText: '',
                SearchParam: {
                    title: '子公司查询',
                    placeholder: '请输入子公司、省总或电话进行查询'
                },
                pagations: {
                    currents: 1,
                    total: 0,
                    pageSize: 10
                },
                tableLoad:false,
                tableHead: [
                    {
                        type: 'index',
                        title: '序号',
                        key: '',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: '子公司',
                        key: 'companyName',
                        width: 300,
                    },
                    {
                        title: '省总',
                        key: 'provincialTotal',
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                    },
                    {
                        title: '地区',
                        key: 'region',
                    },
                    {
                        title: '店铺数量',
                        key: 'storesNum',
                    },
                    {
                        title: '累计交易额',
                        key: 'totalMoney',
                    },
                    {
                        title: '服务费',
                        key: 'serviceMoney',
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
                                        marginRight: '5px',
                                        padding:'2px 15px 3px',
                                        fontSize: '14px'
                                    },
                                    on: {
                                        click: () => {
                                            //写到这里
                                            this.$router.push('/platForm/addSubCorporation?id='+params.row.id)
                                        }
                                    }
                                }, '编辑'),
                            ]);
                        }
                    }
                ],
                tableData: []
            }
        },
        created() {
            this.getCompanyList(1, 10, '')
        },
        methods: {
            //获取子公司列表
            getCompanyList(page, pageSize, name) {
                this.tableLoad=true
                this.tableData = []
                let payload = {
                    name: name,
                    page: page,
                    pageSize: pageSize
                }
                return new Promise(() => {
                getSubCorporation( payload)
                            .then(res => {
                                // console.log(res)
                                if (res.data.success == true) {
                                    if (res.data.data.length > 0) {
                                        res.data.data.forEach(t => {
                                            if (!t.companyShortName) {
                                                t.companyShortName = '暂无数据'
                                            }
                                            if (!t.leaderName) {
                                                t.leaderName = '暂无数据'
                                            }
                                            if (!t.phone) {
                                                t.phone = '暂无数据'
                                            }
                                            if (!t.areaName) {
                                                t.areaName = '暂无数据'
                                            }
                                            if (!t.shopNum&&t.shopNum!=0) {
                                                t.shopNum = '暂无数据'
                                            }
                                            if (!t.transactionAmount&&t.transactionAmount!=0) {
                                                t.transactionAmount = '暂无数据'
                                            }
                                            else {
                                                t.transactionAmount = '￥' + t.transactionAmount
                                            }
                                            if (!t.serviceCharge&&t.serviceCharge!=0) {
                                                t.serviceCharge = '暂无数据'
                                            }
                                            else {
                                                t.serviceCharge = '￥' + t.serviceCharge
                                            }
                                            this.tableData.push({
                                                id: t.id,
                                                companyName: t.companyShortName,
                                                provincialTotal: t.leaderName,
                                                phone: t.phone,
                                                region: t.areaName,
                                                storesNum: t.shopNum,
                                                totalMoney: t.transactionAmount,
                                                serviceMoney: t.serviceCharge
                                            })
                                        })
                                        this.pagations.total = res.data.total
                                        this.tableLoad=false
                                    } else {
                                        this.$Message.warning('暂无数据哦')
                                        this.tableLoad=false
                                    }
                                }
                                else {
                                    console.log(res)
                                    this.$Message.warning(res.data.msg)
                                    this.tableLoad=false
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                                this.tableLoad=false
                            })
                    })
                },

            //搜索
            mySearch(val) {
                this.searchText = val
                this.getCompanyList(1, this.pagations.pageSize, val)
            },
            //    改变每页显示条数
            PageSizeHandle(pageSize) {
                this.pagations.pageSize = pageSize
                this.getCompanyList(this.pagations.currents, pageSize, this.searchText)
            },
            //    跳转页数
            PageHandle(page) {
                this.pagations.currents = page
                this.getCompanyList(page, this.pagations.pageSize, this.searchText)
            }
        }
    }
</script>

<style type="text/scss" lang="scss">
    .SubCorporation {
        .sc_content {
            background-color: #ffffff;
            margin-top: .1rem;
            border-radius: 4px;
            padding-bottom: .54rem;

            .sc_content_title {
                display: flex;
                justify-content: space-between;
                padding: .27rem .21rem .21rem .21rem;
                box-sizing: border-box;
                width: 100%;

                .sc_content_left {
                    display: flex;
                    align-items: flex-end;

                    div:first-child {
                        /*color: #151515;*/
                        font-size: 0.18rem;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        line-height: 0.23rem;
                        color: rgba(21, 21, 21, 1);
                        opacity: 1;
                    }

                    div:nth-of-type(2) {
                        margin-left: .06rem;
                        font-size: 0.12rem;
                        font-weight: 400;
                        font-family: Source Han Sans CN;
                        color: rgba(118, 118, 118, 1);
                        opacity: 1;

                        span {
                            color: #151515;
                        }
                    }
                }

                .sc_btn {
                    background-color: #4471FE;
                    border: 0;
                    color: #ffffff;
                    height: 30px;
                    line-height: 30px;
                    font-size: 0.12rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    padding: 0px 10px 3px;
                    border-radius: 4px;

                    span {
                        font-size: 0.12rem;
                        padding-right: 0.05rem;
                        box-sizing: border-box;
                    }
                }
            }

            .sc_table_box {
                padding: 0 .22rem;
            }
        }
    }


</style>
