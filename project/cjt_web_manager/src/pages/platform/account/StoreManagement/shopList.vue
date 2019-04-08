<template>
    <div class="ShopList">
        <div class="shopHead">
            <div class="TabWrap">
                <div class="shopTabs">
                    <span v-for="item in types" :key="item.id" :class="{'active': status == item.id}" @click="changeType(item.id)">{{item.title}}</span>
                </div>
                <div class="WillAudit">
                    <router-link :to="{path:'/platForm/WillAuditShop',query:{isWaitCheck:true}}">待审核店铺(12)</router-link>
                </div>
            </div>
            <div class="QueryForm">
                <div class="shopleft">
                    <div class="items">
                        <span>地区</span>
                         <Select placeholder="省" style="width:1.34rem"  @on-change="selectCity" v-model="paramData.province" filterable :clearable="true">
                            <Option v-for="item in provinces" :key="item.id" :value="item.id">{{item.areaName}}</Option>
                        </Select>
                        <Select placeholder="市" style="width:1.34rem"  @on-change="selectCity" v-model="paramData.city" filterable :clearable="true">
                            <Option v-for="item in city" :key="item.id" :value="item.id">{{item.areaName}}</Option>
                        </Select>
                         <Select placeholder="区县" style="width:1.34rem" v-model="paramData.area" filterable :clearable="true">
                            <Option v-for="item in area" :key="item.id" :value="item.id">{{item.areaName}}</Option>
                        </Select>
                    </div>
                    <div class="items">
                        <span>子公司</span>
                       <Select placeholder="子公司名称" style="width:1.34rem" v-model="paramData.subCompanyId" filterable :clearable="true">
                            <Option v-for="item in SubCorporation" :key="item.id" :value="item.id">{{item.companyShortName}}</Option>
                        </Select>
                    </div>
                </div>
                <div class="shopright">
                    <div class="searchInput">
                        <span class="search"></span>
                        <Input type="text" v-model="paramData.queryWord" placeholder="请输入店铺名称/店长/手机号码查询" />
                    </div>
                    <Button type="primary" @click="submitHandle">查询</Button>
                </div>
            </div>
        </div>
        <h3 class="TabTitle">店铺列表</h3>
        <div class="TableContent">
           <Table :columns="columns" :data="shopList" :loading="loading"></Table>
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
import { shopList } from '../../../../api/shopManage'
import { showArea } from '../../../../api/public'
import { getSubCorporation } from '../../../../api/SubCorporation'
export default {
  name:'shopList',
  components:{
    Pages
  },
  data(){
    return{
        paramData:{
            province:'',
            city:'',
            area:'',
            subCompanyId:'',
            queryWord:'',
            joinType:1,
            isWaitCheck:'',
            page:1,
            limit:10
        },
        provinces:[],
        city:[],
        area:[],
        SubCorporation:[],
        status:1,
        types:[
            {
                id:1,
                title:'借款'
            },
            {
                id:2,
                title:'非借款'
            },
        ],
        shopList:[],
        loading:false,
        pagations:{
            currents:1,
            total:0,
            pageSize:10
        },
        current:'',       
        columns:[
            {
                type: 'index',
                title:'序号',
                align: 'center', 
            },
            {
                title:'logo',
                key:'logo',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('div', {
                            class: 'ImgWrap'
                        },[
                            h('img',{
                            attrs:{
                                src: params.row.logo
                            },
                        }),
                        h('img',{
                            class:'BigImg',
                            attrs:{
                                src: params.row.logo
                            },
                        })
                        ]),
                    ]);
                }
            },
            {
                title:'店铺名称',
                align: 'center', 
                key:'shopName'
            },
            {
                title:'店长',
                align: 'center', 
                key:'shopManager'
            },
            {
                title:'电话',
                align: 'center', 
                key:'telePhone'
            },
            {
                title:'商户类型',
                align: 'center', 
                key:'shopTypeName'
            },
            {
                title:'子公司',
                align: 'center', 
                key:'subCompany'
            },
            {
                title:'日均流水',
                align: 'center', 
                key:'incomePerDay'
            },
            {
                title:'移动支付流水',
                align: 'center', 
                key:'webIncomePerDay'
            },
            {
                title:'返利比例',
                align: 'center', 
                key:'rebateRatio',
                render:(h,params) => {
                   return params.row.rebateRatio ? <span>{params.row.rebateRatio}%</span> : <span>0%</span>
                }
            },
            {
                title:'服务费',
                align: 'center', 
                key:'serveRatio',
                 render:(h,params) => {
                   return params.row.serveRatio ? <span>{params.row.serveRatio}%</span> : <span>0%</span>
                }
            },
            {
                title:'操作',
                align: 'center',
                key:'operate',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            class:'DownBtn',
                            props: {
                                type: 'default',
                                size: 'small',
                                class:'downBtn'
                            },
                            style: {
                                width:'0.35rem',
                                height:'0.35rem',
                                borderRadius:'0.04rem',
                                margin:'0 0.05rem',
                                background:'url(../../../../../../static/image/down.png) no-repeat center center',
                                backgroundSize:'15px 15px'
                            },
                            on: {
                                click: () => {
                                    // this.showModal(params.index)
                                    // this.$router.push("/platForm//EditingShop")
                                }
                            }
                        }, ''),
                        h('Button', {
                            props: {
                                 type: params.index === this.current ? 'primary':'default',
                                size: 'small'
                            },
                            style:{
                                width:'0.6rem',
                                height:'0.35rem',
                                borderRadius:'0.04rem',
                                margin:'0 0.05rem'
                            },
                            on: {
                                click: () => {
                                    // this.remove(params.index)
                                    this.$router.push({path:"/platForm/EditingShop",query:{id:params.row.id,type:'edit'}})
                                }
                            }
                        }, '编辑')
                    ]);
                }
            },
        ]
      }
  },
  created(){
    // 获取店铺列表
    let param = this.paramData
    this.loading = true
    this.getShopList(param)
    this.getArea({parentId:'',name:'',page:'',pageSize:''},'pro')
    this.getCompany({name:'',page:'',pageSize:''})
  },
  methods:{
       // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            }  
            this.paramData.page = cur;
            this.getShopList(this.paramData)
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
            this.paramData.limit = Pagesize;
            this.getShopList(this.paramData)
        },
        // 分页当前页
        PageHandle(Page){
            this.paramData.page = Page;
            this.getShopList(this.paramData)
        },
        // 借款、费借款切换
        changeType(id){
            this.status = id
            this.paramData.joinType = id
            this.getShopList(this.paramData) 
        },
        // 获取店铺列表
        getShopList(payload){
            this.loading = true;
            return new Promise((resolve,reject) => {
                shopList(payload).then(res => {
                  if(res.data.success){
                    this.shopList = res.data.data;
                    this.loading = false
                    this.pagations.total = res.data.total
                    this.$Message.success(res.data.msg)
                  } else {
                   this.$Message.error(res.data.msg)
                  }
                }).catch(err => {
                  this.$Message.error(err)
                })
            })
        },
        // 获取城市
        selectCity(id){
         if(this.city && this.city.length>0){
             this.getArea({parentId:id},'area')
         } else{
           this.getArea({parentId:id},'city')
         }
        },
        // 获取地区
        getArea(payload,type){
            console.log(type,111)
            return new Promise((resolve,reject) => {
                showArea(payload).then(res => {
                   if(res.data.success){
                       if(type == 'pro'){
                        this.provinces = res.data.data;
                       } else if(type == 'city'){
                           this.city = res.data.data;
                       } else if(type == 'area'){
                          this.area = res.data.data;
                       }
                   } else {
                       this.$Message.error(res.data.msg)
                   }
                }).catch(err => {
                    console.log(err)
                   this.$Message.error(err)
                })
            })
        },
        // 获取子公司
        getCompany(payload){
         return new Promise((resolve,reject) => {
             getSubCorporation(payload).then(res => {
               if(res.data.success){
                   this.SubCorporation = res.data.data
               } else {
                   this.$Message.error(res.data.msg)
               }
             }).catch(err => {
                this.$Message.error(err)
             })
         })
        },
        // 查询操作
        submitHandle(){
         this.getShopList(this.paramData)
        }
        
  }
}
</script>

<style lang="scss">
.ShopList{
   .shopHead{
        width: 100%;
        border-radius: 0.04rem;
        background: #fff;
        padding: 0.18rem 0.22rem;
        box-sizing: border-box;
        .TabWrap{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E7EEEF;
            margin-bottom: 0.2rem;
            .WillAudit{
                a{
                    display: inline-block;
                    width:1.2rem;
                    height:0.3rem;
                    line-height: 0.28rem;
                    background:rgba(255,181,13,1);
                    opacity:1;
                    border-radius:4px;
                    color: #fff;
                    text-align: center;
                    vertical-align: middle;
                }
            }
        }
        .shopTabs{
            span{
                display: inline-block;
                padding: 0.11rem 0.19rem;
                box-sizing: border-box;
                text-align: center;
                font-size:0.14rem;
                font-family:'Source Han Sans CN';
                font-weight:bold;
                color:#767676;
                cursor: pointer;
                width: 1.72rem;
                &.active{
                  color:#000;
                  border-bottom: 2px solid #0061E2  
                }
            }
        }
        .QueryForm{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:0.14rem;
            font-family:'Source Han Sans CN';
            font-weight:bold;
            color:rgba(0,0,0,1);
            .shopleft,.shopright{
                display: flex;
                align-items: center;
            }
            .shopleft{
                .items{
                   margin: 0 0.05rem;
                   margin-right: 0.4rem;
                }
            }
            .shopright{
                justify-content: flex-end;
                position: relative;
                .ivu-input{
                width:3.8rem;
                height: 0.4rem;
                background: #fff;
                border-radius: 0.04rem;
                box-sizing: border-box;
                padding-left: 0.4rem;
                font-size:0.14rem;
                font-family:'Source Han Sans CN';
                font-weight:400;
                line-height:0.2rem;
                color:rgba(118,118,118,1);
                margin-right: 0.3rem;
            }
            .ivu-btn-primary{
                width:0.9rem;
                height:0.4rem;
                background:rgba(68,113,254,1);
                border-radius:0.04rem;
                font-size:0.16rem;
                font-family:'Source Han Sans CN';
                font-weight:500;
                line-height:0.15rem;
                color:rgba(255,255,255,1);
                text-align: center;
            }
            .search{
                display: inline-block;
                position: absolute;
                width: 0.16rem;
                height: 0.16rem;
                left: 0.1rem;
                top:0.12rem;
                z-index: 111;
                background: url('../../../../../static/image/search.png') no-repeat;
                background-size: 100% 100%;
            }
            }
            .ivu-select{
                margin: 0 0.05rem;
            }
           
        }
      }
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
        .DownBtn{
            position: relative;
            &:before{
                content: '账单报表下载';
                display: inline-block;
                position: absolute;
                top:-0.36rem;
                width: 1.2rem;
                height: 0.3rem;
                line-height: 0.32rem;
                left:-0.4rem;
                background:rgba(255,255,255,1);
                box-shadow:0px 0.02rem 0.06rem rgba(0,0,0,0.16);
                opacity:1;
                border-radius:0.04rem;
                font-size:'0.14rem';
                font-family:'Source Han Sans CN';
                font-weight:400;
                display: none;
            }
            &:after{
                content: '';
                position: absolute;
                height: 0.1rem;
                width: 0.1rem;
                background: #fff;
                -webkit-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
                transform: rotate(45deg);
                top:-0.12rem;
                left:0.1rem;
                z-index: 10;
                display: none;
            }
            &:hover:before,&:hover:after{
             display: inline-block;
            }
        }
        .ImgWrap{
            width: 1rem;
            height: 1rem;
            padding: 0.1rem;
            box-sizing: border-box;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .BigImg{
                display: inline-block;
                position: absolute;
                width:2rem;
                height:2rem;
                background:rgba(0,0,0,0);
                border-radius:0.08rem;
                left: 1rem;
                display: none;
                z-index: 10;
            }
        }
        .ImgWrap:hover .BigImg{
            display: inline-block;
        }

     .ivu-select-input{
                font-weight: 400;
                color: #151515;
                height:.4rem;
                line-height: .4rem;
            }
            .ivu-select-item{
                font-weight: 400;
                color: #151515;
                font-size:0.14rem!important;
                font-family:'Source Han Sans CN';
            }
            .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
                line-height: 0.35rem;
            }    
}
</style>
