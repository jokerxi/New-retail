<template>
    <div class="details">
        <!-- 账号管理》用户管理》详情 -->
        <div class="banner">  
            <div class="bannerLeft">
                <div class="imgBox">
                    <img src="../../../../../static/image/logo.png" alt="">
                </div> 
                <div class="userBox">
                    <h2>用户郭采洁</h2>
                    <p class="myWords">会员卡数：<span class="myNumber">12</span></p>
                </div>
                <div class="userBox1">
                    <p class="userLabel">老用户</p>
                    <p class="myWords">电话：<span class="myNumber">1878987668</span></p>
                </div>
            </div>
            <div class="bannerRight">
                <div class="cpBox">
                    <p>消费金额</p>
                    <p>￥<span>60.15</span></p>
                </div>
                <div class="cpBox">
                    <p>消费次数</p>
                    <p>￥<span>60.15</span></p>
                </div>
                <div class="cpBox">
                    <p>客单价</p>
                    <p>￥<span>60.15</span></p>
                </div>
                <div class="cpBox">
                    <p>共获得返利金</p>
                    <p>￥<span>60.15</span></p>
                </div>
                <div class="cpBox">
                    <p>当前返利金</p>
                    <p>￥<span>60.15</span></p>
                </div>
            </div>
        </div>
        <!-- table -->
        <div class="detailTable">
            <div class="filter">
              <span :class="{'current': current === index}" v-for="(item,index) in Types" :key="index" @click="Change(index)">{{item.val}}</span>
            </div>
            <div class="TableHead">
                <div class="head-left">
                    <h4>消费记录</h4>
                    <p>共 <span>234</span> 条</p>
                </div>
                <div class="head-right">
                    <p>总金额： ￥247234</p>
                    <p>交易单数： 247 单</p>
                    <p>返利金： ￥247234</p>
                    <button class="btn dwidth" type="button">导出</button>
                </div>
            </div>
            <Table :columns="columns" :data="[]"></Table>
            <pages
              :pagations="pagations"
              @skipHandle="PageSkip"
              @PageSizeChange="PageSizeHandle"
              @PageChange="PageHandle"
            ></pages>
        </div>
    </div> 
</template>

<script>
import Pages from '../../../../components/Pages'
export default {
    name: "details",
    components:{
        Pages
    },
    data() {
        return{
            current: 0,
            pagations:{
                currents:1,
                total:20,
                pageSize:10
            },
            Types:[
                {
                    id: 1,
                    val: '全部'
                },
                {
                    id: 2,
                    val: '喜洋洋超市'
                },
                {
                    id: 3,
                    val: '我的家超市'
                },
                {
                    id: 4,
                    val: '人人乐超市'
                }
            ],
            columns: [
                {
                    title:'订单编号',
                    align: 'left',
                },
                {
                    title: '店铺名称',
                    key: '',
                    align: 'left',
                },
                {
                    title: '交易时间',
                    key: '',
                    align: 'left',
                },
                {
                    title: '交易金额',
                    key: '',
                    align: 'left',
                },
                {
                    title: '获得返利',
                    key: '',
                    align: 'left',
                },
                {
                    title: '支付方式',
                    key: '',
                    align: 'left',
                },
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
    .details{
        .banner{
            width:100%;
            height:1.7rem;
            background:rgba(255,255,255,1);
            border:0px solid rgba(231,238,239,1);
            opacity:1;
            border-radius: 4px;
            padding: .35rem .22rem;
            display: flex;
            justify-content: center;
            justify-content:space-between;
            // border: 1px solid red;
            .bannerLeft{
                display: flex;
                justify-content: center;
                align-items: center;
                .imgBox{
                    margin-right:.2rem;
                    width: 1rem;
                    height: 1rem;
                    img{
                        width: 100%;
                    }
                }
                .userBox{
                    // border: 1px solid red;
                    margin-right: .2rem;
                    line-height: .26rem;
                    h2{
                        font-size:0.2rem;
                        font-family:Source Han Sans CN;
                        font-weight:bold;
                        color:rgba(0,0,0,1);
                        opacity:1;
                        line-height:0.49rem;
                    }                     
                }
                .userBox1{
                    // border: 1px solid blue;
                    height: 1rem;
                    // line-height: .49rem;
                    padding: .15rem 0;
                    .userLabel{
                        text-align: center;
                        width: .8rem;
                        height: .26rem;
                        color: #FFBA1C;
                        background-color: rgba(255,181,13,0.2);
                        border-radius: .15rem;
                        line-height:0.26rem;
                                
                    }
                }                    
            }
            .myNumber{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:0.5rem;
                color:#000000;
            } 
            .myWords{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676; 
                                    
            }  
            .bannerRight{
                width: 70%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // border: 1px solid red;
                
                .cpBox{
                    width: 1.6rem;
                    height: .66rem;
                    line-height: .2rem;
                    border: 1px solid #E7EEEF;
                    border-radius: 4px;
                    text-align: center;
                    padding: .12rem 0;
                    background:rgba(250,250,250,1);
                }
            }
        }

        .detailTable{
            width: 100%;
            border:1px solid #E7EEEF;
            border-radius: 0.02rem;
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.12rem 0.22rem;
            font-family:'Source Han Sans CN';
            .filter{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-bottom: 0.11rem;
                border-bottom: 1px dashed #E7EEEF;
                span{
                    display: inline-block;
                    // width:0.74rem;
                    height:0.28rem;
                    line-height: .28rem;
                    padding: 0 12px;
                    text-align: center;
                    border:1px solid #E7EEEF;
                    border-radius:0.5rem;
                    font-size:0.14rem;
                    font-weight:400;
                    cursor: pointer;
                    color:rgba(21,21,21,1);
                    margin-right: 0.1rem;
                    &.current{
                    background:rgba(68,113,254,1);
                    color: #fff;
                    border-color: transparent;
                    }
                }
            }
            .TableHead{
                width: 100%;
                margin-top: 0.28rem;
                margin-bottom: 0.2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .head-left{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    h4{
                        font-size:0.18rem;
                        font-weight:bold;
                        line-height:0.23rem;
                        color:rgba(21,21,21,1);
                        margin-right: 0.11rem;
                    }
                    p{
                        font-size:0.14rem;
                        font-weight:400;
                        line-height:0.23rem;
                        color:rgba(118,118,118,1);
                        span{
                            color: #151515;
                        }
                    }
                }
                .head-right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    p{
                        font-size:0.14rem;
                        font-weight:bold;
                        line-height:0.23rem;
                        color:rgba(1,1,1,1);
                        margin-left: 1.01rem;
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
    }

</style>
