<template>
    <div class="chainStoreList">
        <!-- 连锁商家列表 -->
        <Search :SearchParam='SearchParam' @SearchBtn="queryHandle"></Search>
        <div class="orContentBox">
            <div class="orContentBoxHeader">
                 <div class="ortitle">连锁商家列表<span class="ortitle1">共 <span>{{pagations.total}}</span> 条</span></div>
                 <div @click="openModal('add')"><button class="sc_btn" type="button"><span class="iconfont icon-tianjialanseicon"></span>新建连锁商超</button></div>
            </div>
             <Table :columns="column" :data="chainList" :loading="loading"></Table>
            <pages
              :pagations="pagations"
              @skipHandle="PageSkip"
              @PageSizeChange="PageSizeHandle"
              @PageChange="PageHandle"
            ></pages>
        </div>

        <!-- 弹框 -->
        <div>
            <Modal
                v-model="visiable"
                :title="title"
                width="330"
                class-name="CSmodal">
                <div class="CScontent">
                    <Form ref="editForm" :model="editForm" :rules="ruleValidate" label-position="left" :label-width="80">
                        <FormItem label="商家名称：">
                            <Input v-model="editForm.shopName" />
                        </FormItem>
                        <FormItem label="老板：">
                            <Input v-model="editForm.realName"/>
                        </FormItem>
                        <FormItem label="电话：">
                            <Input v-model="editForm.telePhone"/>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button @click="colseModal" style="margin-left: 8px">取消</Button>
                    <Button type="primary" @click="Savechain(editForm)">保存</Button>                  
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import Search from '../../../components/Search'
import Pages from '../../../components/Pages'
import { chainShopList, saveChainShop, chainDetail } from '../../../api/platFormBusiness'
export default {
    name: "chainStoreList",
    components: {
        Search,
        Pages
    },
    data() {
        return{
            chainList:[],
            loading:false,
            query:{
               queryWord:'',
               page:1,
               limit:10
            },
            visiable: false,
            title:'',
            editForm:{
                chainId:'',
                shopName:'',
                telePhone:'',
                realName:''
            },
            ruleValidate:{
              telePhone:[{pattern:/^1[3456789]\d{9}$/,message:'手机格式不正确',trigger:'blur'}]
            },
            SearchParam: {
                title: '连锁商家查询',
                placeholder: '请输入商家名称/店长/联系电话进行查询'
            },
            pagations:{
                currents:1,
                total:20,
                pageSize:10
            },   
            column: [
                {
                    type:'index',
                    title:'序号',
                    align: 'center',
                    width: 80
                },
                {
                    title: '商家名',
                    key: 'shopName',
                    align: 'left',
                },
                {
                    title: '老板',
                    key: 'realName',
                    align: 'left',
                },
                {
                    title: '电话',
                    key: 'telePhone',
                    align: 'left',
                },
                {
                    title: '操作',
                    key: 'wxAmount',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal(params.row.chainId);
                                        }
                                    }
                                }, '编辑'),
                               
                            ]);
                    }
                }
            ] 
        }
    },
    created(){
      this.getChainList(this.query)
    },
    methods:{
         // 分页跳转
        PageSkip(cur){
            if(cur){
            this.pagations.currents = cur;
            } 
            this.query.page = cur
            this.getChainList(this.query) 
        },
        // 分页条数操作
        PageSizeHandle(Pagesize){
           this.query.limit = Pagesize
            this.getChainList(this.query) 
        },
        // 分页当前页
        PageHandle(Page){
           this.query.page = Page
           console.log(this.query,888)
            this.getChainList(this.query) 
        },
        // 获取连锁列表
        getChainList(payload){
            this.loading = true
            return new Promise((resolve,reject) => {
                chainShopList(payload).then(res => {
                    if(res.data.success){
                        this.chainList = res.data.data
                        this.loading = false
                        console.log(this.chainList,'连锁列表')
                        this.pagations.total = res.data.total
                    } else {
                        this.loading = false;
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        },
        // 关键字查询
        queryHandle(val){
            this.query.queryWord = val
            this.getChainList(this.query)
        },
        // 打开模态框
        openModal(param){
            if(param == 'add'){
                this.title = "新建连锁商家"
                this.editForm.chainId = ''
                this.editForm.realName = ''
                this.editForm.shopName = ''
                this.editForm.telePhone = ''
            } else {
                this.title = '编辑连锁商家'
                this.getchainDetail(param)
            }
            this.visiable = true
        },
        // 关闭模态框
        colseModal(){
            this.visiable = false
             this.$refs['editForm'].resetFields();
        },
        // 获取连锁列表详情
        getchainDetail(payload){
            return new Promise((resolve,reject) => {
                chainDetail(payload).then(res => {
                    if(res.data.success){
                        let data = res.data.data
                        this.editForm.chainId = data.chainId
                        this.editForm.realName = data.realName
                        this.editForm.shopName = data.shopName
                        this.editForm.telePhone = data.telePhone
                     console.log(res,'连锁详情')
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                  this.$Message.error(err)
                })
            })
        },
        // 保存连锁
        Savechain(payload){
            return new Promise((resolve,reject) => {
                saveChainShop(payload).then(res => {
                   if(res.data.success){
                       this.$Message.success(res.data.msg)
                       this.visiable = false
                       this.getChainList(this.query)
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


<style type="text/scss" lang="scss">

    /* 弹框样式修改 */
        .CSmodal{
            display: flex;
            align-items: center;
            justify-content: center;
            .CScontent{
                text-align:center;
            }
            .ivu-modal{
                top: 0;
            }
            .ivu-modal-header {
                color:#000000;
                border-color: #E7EEEF;
                padding: 12px 16px;
                line-height: 1;
            }
            .ivu-modal-header p, .ivu-modal-header-inner {
                display: inline-block;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #000000;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .ivu-modal-body {
                padding: .14rem .53rem;;
                font-size: .14rem;
                line-height: 1.5;      
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676;
            }
            .ivu-modal-footer {
                border: none;
                padding: 0px 18px 18px 18px;
                text-align: center;
            }

            // 弹框form
            .ivu-form-item {
                margin-bottom: 10px;
                vertical-align: top;
                zoom: 1;
            }
            .ivu-form .ivu-form-item-label {
                text-align: left;
                vertical-align: middle;
                float: left;
                font-size: .14rem;
                line-height: 1;
                padding: 12px 1px 10px 0;
                box-sizing: border-box;
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#151515;

            }
        }
        /* 弹框样式修改 */
    .chainStoreList{
        

         // table
        .orContentBox{
            width: 100%;
            border:1px solid #E7EEEF;
            border-radius: 4px;
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.12rem 0.22rem;
            font-family:'Source Han Sans CN';

            .orContentBoxHeader{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .ortitle{
                    font-size:0.18rem;
                    font-family:Source Han Sans CN;
                    font-weight:bold;
                    line-height:0.23rem;
                    color:#151515;
                    opacity:1;
                    .ortitle1{
                        font-size:0.14rem;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        line-height:0.23rem;
                        color:#767676;
                        opacity:1;
                        margin-left: .13rem;
                        span{
                            color: #151515;
                        }
                    }
                }
                .sc_btn {
                    background-color: #4471FE;
                    color: #ffffff;
                    height: 30px;
                    font-size: 0.12rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    padding: 0rem .08rem;
                    border: none;
                    border-radius: 4px;

                    span {
                        font-size: 0.12rem;
                        padding-right: 0.05rem;
                        box-sizing: border-box;
                    }
                }
            }
            
        }


    }
</style>
