<template>
    <div class="WillAuditShop">
        <!-- 待审核店铺列表 -->
        <h3 class="TabTitle">
            <span>店铺列表</span>
            <div class="right">
                <span>审核开关</span>
                <i-switch />
            </div>
        </h3>
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
export default {
   name:'WillAuditShop',
   components:{
    Pages
  },
  data(){
   return{
       pagations:{
            currents:1,
            total:20,
            pageSize:10
        },
        paramsData:{
          isWaitCheck:this.$route.query.isWaitCheck,
          page:1,
          limit:10,
        },
        current:'',
        loading:false,
        shopList:[],      
        columns:[
            {
                type: 'index',
                title:'序号',
                align: 'center', 
            },
            {
                title:'logo',
                key:'logo',
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
                key:'shopName'
            },
            {
                title:'店长',
                key:'shopManager'
            },
            {
                title:'绑定手机',
                key:'telePhone'
            },
            {
                title:'商户类型',
                key:'shopTypeName'
            },
            {
                title:'代理商',
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
                title:'合作类型',
                align: 'center',
                 render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style:{
                                // width:'0.6rem',
                                // height:'0.35rem',
                                // borderRadius:'0.04rem',
                                // margin:'0 0.05rem'
                            },
                        }, params.row.joinType == 1 ? '预付金':'提现')
                    ]);
                }
            },
            {
                title:'操作',
                align: 'center',
                key:'operate',
                render: (h, params) => {
                    return h('div', [
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
                                    this.$router.push({path:"/platForm/EditingShop",query:{id:params.row.id,type:'audit'}})
                                }
                            }
                        }, '审核')
                    ]);
                }
            },
        ]
   }
  },
  created(){
   this.getShopList(this.paramsData)
  },
   methods:{
       // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            } 
            this.paramsData.page = cur;
            this.getShopList(this.paramsData) 
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
             this.paramsData.limit = Pagesize;
            this.getShopList(this.paramsData) 
        },
        // 分页当前页
        PageHandle(Page){
            this.paramsData.page = Page;
            this.getShopList(this.paramsData) 
        },
        Audit(index){
            this.current = index;
        },
         // 获取店铺列表
        getShopList(payload){
            this.loading = true;
            return new Promise((resolve,reject) => {
                shopList(payload).then(res => {
                  if(res.data.success){
                      console.log(res.data.data)
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
  }
}
</script>

<style lang="scss">
 .WillAuditShop{
      .TabTitle{
            font-size:0.16rem;
            font-family:'PingFang SC';
            font-weight:800;
            // line-height:0.15rem;
            height:14px;
            color:rgba(21,21,21,1);
            padding-left: 0.1rem;
            box-sizing: border-box;
            border-left: 4px solid #4471FE;
            margin: 0.24rem 0 0.14rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .right{
                span{
                    font-weight: 400;
                    color:rgba(21,21,21,1);
                }
            }
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
 }
</style>
