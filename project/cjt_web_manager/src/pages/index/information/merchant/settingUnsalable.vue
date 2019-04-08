<template>
    <div id="settingUnsalable">
        <div class="su_content">
            <div class="su_header">
                <p>{{title_name}}</p>
                <div>
                    <button class="btn bwidth" type="button"><span class="iconfont icon-shezhiicon"></span>设置滞销天数</button>
                </div>
            </div>
        </div>
        <div class="setData">
            <div class="filter">
              <span :class="{'current': current === index}" v-for="(item,index) in Types" :key="index" @click="Change(index)">{{item.val}}</span>
            </div>
            <div class="TableHead">
                <div class="head-left">
                    <h4>滞销商品列表</h4>
                    <p>滞销商品数 <span>234</span> 件</p>
                </div>
                <div class="head-right">
                    <p>滞销商品数： 247 件</p>
                    <p>总销售额： ￥247234</p>
                    <p>总成本： ￥247234</p>
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
    import '../../../../../static/css/commonStyle.css'
    import Pages from '../../../../components/Pages'
    export default{
        name: "settingUnsalable",
        components:{
            Pages
        },
        data(){
            return{
                title_name: '喜洋洋超市',
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
                        val: '品类1'
                    },
                    {
                        id: 3,
                        val: '品类2'
                    },
                    {
                        id: 4,
                        val: '品类3'
                    }
                ],
                columns: [
                    {
                        type: 'index',
                        title:'序号',
                        align: 'center',
                    },
                    {
                        title: '商品名',
                        key: ''
                    },
                    {
                        title: '条码',
                        key: ''
                    },
                    {
                        title: '库存数',
                        key: ''
                    },
                    {
                        title: '进价',
                        key: '',
                        sortable:true
                    },
                    {
                        title: '售价',
                        key: '',
                        sortable:true
                    },
                     {
                        title: '滞销天数',
                        key: '',
                        sortable:true
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
#settingUnsalable{
    .su_header{
        background: url("../../../../../static/image/sztsbg@2x.png")no-repeat;
        background-size: cover;
        padding: .44rem 0 .43rem .6rem;
        overflow: hidden;
        p{
            font-size:0.18rem;
            font-weight:bold;
            color: #FFFFFF;
            margin-bottom: .2rem;
        }
        .bwidth{
            width: 1.8rem;
            span{
                padding-right: 0.1rem;
            }
        }
    }
    .setData{
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
                width:0.74rem;
                height:0.28rem;
                line-height: .28rem;
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
            }
        }
    }
}


</style>
