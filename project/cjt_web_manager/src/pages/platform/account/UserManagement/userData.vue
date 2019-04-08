<template>
    <div class="userData">
        <!--平台管理》用户数据查询-->
        <div class="ud_header">
            <p>用户数据查询</p>
            <div class="ud_form_box"> 
                <Form ref="userdataform" inline>
                    <FormItem label="选择日期">
                        <DatePicker 
                        :value="userdataform.date" 
                        format="yyyy-MM-dd HH:mm:ss" 
                        type="daterange"  
                        placeholder="选择日期"></DatePicker>
                    </FormItem>
                    <FormItem label="客单价">
                        <Select class="user" v-model="userdataform.select">
                            <Option 
                            v-for="(sales,index) in ticket_sales"
                            :key="index"
                            :value="sales.ticketSales">{{sales.ticketSales}}</Option>
                            
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
        <!-- tableContent -->
        <div class="ud_content_box">
            <h3 class="TabTitle">店铺列表</h3>
            <div class="TableContent">
                <Table :columns="columns" :data="datas"></Table>
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
import Pages from '../../../../components/Pages'
import '../../../../../static/css/commonStyle.css'

export default {
    name: "userData",
    components: {
        Pages
    },
    data() {
        return{
             pagations:{
                currents:1,
                total:20,
                pageSize:10
            },
            userdataform: {
                input: '',
                select: '',
                date: ['2016-01-01', '2016-02-15'],
            },
            ticket_sales: [
                { ticketSales: '100-400' },
                { ticketSales: '400-800' },
            ],
            datas:[
                {
                logo:'logo',
                shopName:'logo',
                shoper:'logo',
                phone:'logo',
                shopType:'logo',
                subcompany:'logo',
                dayMoney:'logo',
                },
                {
                logo:'logo',
                shopName:'logo',
                shoper:'logo',
                phone:'logo',
                shopType:'logo',
                subcompany:'logo',
                dayMoney:'logo',
                
                }
            ],        
             columns:[
            {
                type: 'index',
                title:'序号',
                align: 'center',
                width: 100 
            },
            {
                title:'头像',
                key:'logo',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('div', {
                            class: 'ImgWrap'
                        },[
                            h('img',{
                            attrs:{
                                src: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
                            },
                        }),
                        h('img',{
                            class:'BigImg',
                            attrs:{
                                src: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
                            },
                        })
                        ]),
                    ]);
                }
            },
            {
                title:'昵称',
                align: 'center',
                key:'shopName'
            },
            {
                title:'创建时间',
                align: 'center',
                key:'shoper'
            },
            {
                title:'会员卡数量',
                align: 'center',
                key:'phone'
            },
            {
                title:'消费金额',
                align: 'center',
                key:'shopType'
            },
            {
                title:'消费次数',
                align: 'center',
                key:'subcompany'
            },
            {
                title:'客单价',
                align: 'center',
                key:'dayMoney'
            },
            {
                title:'操作',
                key:'operate',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                 type: params.index === this.current ? 'primary':'default',
                                size: 'small'
                            },
                            style:{
                                width:'74px',
                                height:'30px',
                                borderRadius:'0.04rem',
                                margin:'0 0.05rem'
                            },
                            on: {
                                click: () => {
                                    // this.remove(params.index)
                                    this.$router.push("/platForm/details")
                                }
                            }
                        }, '查看详情')
                    ]);
                }
            },
            ]
        }
    },
    methods: {
         // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            }  
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
            console.log(Pagesize,123)
        },
        // 分页当前页
        PageHandle(Page){
            console.log(page,456)
        },
    }

}
</script>

<style type="text/scss" lang="scss">
    .userData{
        width: 100%;
        height: 100%;
        .ud_header{
            background: url("../../../../../static/image/sjbg@x.png")no-repeat;
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
            .ud_form_box{

                label{
                    color: #ffffff;
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
                .ivu-input {
                    height: .4rem;
                    padding: .04rem .07rem;
                    font-size: .14rem;
                    width: 3.3rem;
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


        // table bufen
        .ud_content_box{

            border-radius: 4px;
            .TabTitle{
                font-size:0.16rem;
                font-family:'PingFang SC';
                font-weight:800;
                line-height:0.15rem;
                color:rgba(21,21,21,1);
                padding-left: 0.1rem;
                box-sizing: border-box;
                border-left: 0.04rem solid #4471FE;
                margin: 0.2rem 0 0.14rem;
            }
            .TableContent{
                background: #fff;
                background:rgba(255,255,255,1);
                border:1px solid rgba(231,238,239,1);
                border-radius:4px;
                padding: 0 0.21rem;
                box-sizing: border-box;
            }
            .ImgWrap{
                width: .5rem;
                height: .5rem;
                padding: 0.1rem;
                box-sizing: border-box;
                position: relative;
                margin: 0 auto;
                img{
                    width: 100%;
                }
                .BigImg{
                    display: inline-block;
                    position: absolute;
                    width:1rem;
                    height:1rem;
                    background:rgba(0,0,0,0);
                    border-radius:0.08rem;
                    left: .5rem;
                    display: none;
                    z-index: 10;
                }
            }
            .ImgWrap:hover .BigImg{
                display: inline-block;
            }
        }
    }

</style>
