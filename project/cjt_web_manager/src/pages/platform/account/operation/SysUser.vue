<template>
    <div class="SysUser">
       <div class="bd_header">
        <p>运营人员查询</p>
        <div class="bd_header_content">
            <Form ref="formInline" :model="QueryForm" inline>
                <FormItem label="选择角色">
                    <Select v-model="QueryForm.roleId" filterable  clearable>
                        <Option v-for="item in RoleList" :key="item.id" :value="item.id">{{item.name}}</Option>
                   </Select>
                </FormItem>
                <FormItem label="">
                    <span class="search"></span>
                    <Input type="text" clearable v-model="QueryForm.realName" placeholder="运营人员姓名" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="QueryHandle">查询</Button>
                </FormItem>
            </Form>
        </div>
      </div>
      <div class="setData">
         <div class="TableHead">
                <div class="head-left">
                    <h4>运营人员列表</h4>
                    <p>共 <span>{{pagations.total}}</span> 名</p>
                </div>
                <div class="head-right">
                    <div class="ssAdd" @click="openModal('add')"><span class="iconfont icon-tianjiaicon-"></span><span>添加员工</span></div>
                </div>
            </div>
            <Table :columns="columns" :data="SysUserList" :loading="loading"></Table>
            <pages
            :pagations="pagations"
            @skipHandle="PageSkip"
            @PageSizeChange="PageSizeHandle"
            @PageChange="PageHandle"
            ></pages>
      </div>
      <Modal
        class="SysUserModal"
        v-model="visiable"
        class-name="vertical-center-modal"
        :title="title"
        :width="330"
        ok-text="保存"
        @on-ok="sysUserHandle"
        @on-cancel="closeModal">
         <Form ref="editForm" :model="editForm" :rules="ruleValidate" label-position="left" :label-width="82">
            <FormItem label="姓名：">
                <Input v-model="editForm.realName" />
            </FormItem>
            <FormItem label="角色：">
              <Select v-model="editForm.roleId" filterable  clearable>
                        <Option v-for="item in RoleList" :key="item.id" :value="item.id">{{item.name}}</Option>
                   </Select>
            </FormItem>
             <FormItem label="账号名：">
                <Input v-model="editForm.userName"/>
            </FormItem>
            <FormItem label="账号密码：" prop="password">
                <Input type="password" v-model="editForm.password"/>
            </FormItem>
        </Form>
    </Modal>


    <Modal
        class="deleModal"
        v-model="deleVisiable"
       
        :width="330"
        class-name="vertical-center-modal"
        ok-text="确定"
        @on-ok="DeleteHandle(id)" 
        @on-cancel="closeModal">
         <div class="deleHandle">
             <p>确认将{{editForm.userName}}删除吗？</p>
         </div>
    </Modal>
    </div>
</template>

<script>
import Pages from '../../../../components/Pages'
import { SysUserList, SavesysUser, editSysUser, SysuserDetail, DelSysuser, showAllRole } from '../../../../api/shopManage'
    export default{
        name: "SysUser",
        components:{
            Pages
        },
        data(){
            return {
                QueryForm:{
                    roleId: '',
                    realName:'',
                    page:1,
                    pageSize:10
                },
                loading:false,
                RoleList:[],
                SysUserList:[],
                pagations:{
                    currents:1,
                    total:20,
                    pageSize:10
                },
                id:'',
                columns:[
                    {
                       type: 'index',
                       title:'序号',
                       align: 'center',
                       width:100 
                    },
                    {
                        title:'姓名',
                        align: 'center',
                        key:'realName'
                    },
                    {
                        title: '角色',
                        align: 'center',
                        key:'roleName'
                    },
                    {
                        title: '账号名',
                        align: 'center',
                        key: 'userName'
                    },
                    {
                        title:'操作',
                        key:'opearate',
                        align: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.roleName == '超级管理员' ? true:false

                                    },
                                    style: {
                                        height: '30px',
                                        width:'60px',
                                        padding: '2px 7px 2px',
                                        
                                       borderRadius:'0.04rem',
                                       margin:'0.1rem 0.1rem'
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal(params.row.id)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small',
                                        disabled: params.row.roleName == '超级管理员' ? true:false
                                    },
                                    style:{
                                        height: '30px',
                                        width:'60px',
                                        padding: '2px 7px 2px',
                                        borderRadius:'0.04rem',
                                        margin:'0 0.1rem'
                                    },
                                    on: {
                                        click: () => {
                                            this.formHandle(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                visiable:false,
                deleVisiable:false,
                title:'添加人员',
                editForm:{
                    id:'',
                    roleName:'',
                    roleId:'',
                    password:'',
                    realName:'',
                    userName:''
                },
                ruleValidate:{
                   password:[
                        { 
                            type: 'string', 
                            min: 6, 
                            max: 20,
                            message: '密码长度6-20位', 
                            trigger: 'blur' 
                        }
                    ]
                }
            }
        },
        created(){
          this.getSysuserList(this.QueryForm)
          this.getRoleList(1)
        },
        methods:{
            // 分页跳转
            PageSkip(cur){
                if(cur){
                this.pagations.currents = cur;
                } 
                this.QueryForm.page = cur
                this.getSysuserList(this.QueryForm) 
            },
            // 分页条数操作
            PageSizeHandle(Pagesize){
              this.QueryForm.pageSize = Pagesize
                this.getSysuserList(this.QueryForm) 
            },
            // 分页当前页
            PageHandle(Page){
                this.QueryForm.page = Page
                this.getSysuserList(this.QueryForm) 
           },
            // 打开模态框
            openModal(id){
                this.visiable = true;
                if(id == 'add'){
                     this.title = '添加人员'
                     this.id = ''
                     this.editForm={
                        id:'',
                        roleName:'',
                        roleId:'',
                        password:'',
                        realName:'',
                        userName:''
                    }
                } else  {
                    this.title = '编辑人员'
                    this.id = id
                    this.getSysuserDetail(id)
                }
            },
            // 关闭模态框
            closeModal(){
                this.visiable = false
                this.$refs['editForm'].resetFields();
            },
            // 获取运营列表
            getSysuserList(payload){
                this.loading = true
                return new Promise((resolve,reject) => {
                    SysUserList(payload).then(res => {
                        if(res.data.success){
                            console.log(res.data.data)
                            this.SysUserList = res.data.data
                            this.pagations.total = res.data.total
                            this.loading = false
                        } else {
                            this.loading = false
                            this.$Message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$Message.error(err)
                        this.loading = false
                    })
                })
            },
            // 获取角色的下拉列表
            getRoleList(payload){
                return new Promise((resolve,reject) => {
                    showAllRole(payload).then(res => {
                        if(res.data.success){
                            this.RoleList = res.data.data
                        } else {
                            this.$Message(res.data.msg)
                        }
                    }).catch(err => {
                        this.$Message.error(err)
                    })
                })
            },
            // 保存运营人员
            SavesysUserHandle(payload){
                return new Promise((resolve,reject) => {
                    SavesysUser(payload).then(res => {
                       if(res.data.success){
                           this.$Message.success(res.data.msg)
                           this.getSysuserList(this.QueryForm)
                       } else {
                           this.$Message.error(res.data.msg)
                       }
                    }).catch(err => {
                       this.$Message.error(err)
                    })
                })
            },
            // 编辑运营人员
            EditSysUserHandle(payload){
                return new Promise((resolve,reject) => {
                    editSysUser(payload).then(res => {
                        if(res.data.success){
                            this.$Message.success(res.data.msg)
                            this.getSysuserList(this.QueryForm)
                        } else {
                            this.$Message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$Message.error(err)
                    })
                }) 
            },
            // 获取运营人员详情
            getSysuserDetail(payload){
              return new Promise((resolve,reject) => {
                  SysuserDetail(payload).then(res => {
                      if(res.data.success){
                            let data = res.data.data;
                            this.editForm={
                                id:data.id,
                                roleName:data.roleName,
                                roleId:data.roleId,
                                password:data.password,
                                realName:data.realName,
                                userName:data.userName
                            }
                      } else {
                          this.$Message.error(res.data.msg)
                      }
                  }).catch(err => {
                   this.$Message.error(err)
                  })
              })
            },
            sysUserHandle(){
                let param = {
                    roleId: this.editForm.roleId,
                    userName: this.editForm.userName,
                    password: this.editForm.password,
                    realName: this.editForm.realName
                }
              if(this.id !== ''){
                  param.id = this.id
                  this.EditSysUserHandle(param)                
              } else {
                  this.QueryForm.page = 1     
                  this.QueryForm.roleId = '' 
                  this.SavesysUserHandle(param)
              }
              this.visiable = false;
              this.$refs['editForm'].resetFields();
            },
            // 删除运营人员
            DeleteHandle(payload){
                return new Promise((resolve,reject) => {
                    DelSysuser(payload).then(res=>{
                        if(res.data.success){
                            this.$Message.success(res.data.msg)
                            this.getSysuserList(this.QueryForm)
                        } else {
                            this.$Message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$Message.error(err)
                    })
                })
            },
            //  小弹框
            formHandle(item){
                
                this.deleVisiable = true
                this.id = item
            },
            // 查询操作
            QueryHandle(){
                this.QueryForm.page = 1
                this.getSysuserList(this.QueryForm)
            }
        }
    }
</script>

<style lang="scss">
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
.SysUserModal{
    
    .ivu-modal-header p, .ivu-modal-header-inner {
        color: #000000;
        font-size:0.14rem;
        font-family:Source Han Sans CN;
        font-weight:bold;
    }
    .ivu-modal-body{
        padding: 0.13rem 0.25rem 0.1rem;
        margin: 0 auto;
        box-sizing: border-box;
        .ivu-form .ivu-form-item-label{
               padding: 0.15rem 0.12rem 0.1rem 0;
               font-size:0.14rem;
               font-family:'Source Han Sans CN';
               font-weight:400;
               color: #151515;
        }
        .ivu-form-item{
            margin-bottom: 0.1rem;
        }
        .ivu-select-single .ivu-select-selection {
            height: 32px;
            min-height: 29px;
        }
    }
    
}
.ivu-modal-footer{
        text-align: center;
        border-top:0;
        padding: 5px 18px 20px 18px;
        .ivu-btn{
            // width:0.9rem;
            // height:0.4rem;
            padding:6px 24px 6px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(231,238,239,1);
            border-radius:0.04rem;
            margin: 0 0.2rem;
            line-height:0.15rem;
            span{
                font-size:0.2rem;
                font-family:'Source Han Sans CN';
                font-weight:400;
                color:rgba(0,0,0,1);
            }
        }
        .ivu-btn-primary{
            background: #4471fe;
            border-color: transparent;
            span{
             color:#fff;
            }
        }
    }
.deleHandle{
    text-align: center;
    padding: 40px 35px 15px 35px;    
    font-size:0.14rem;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height:0.23rem;
    color:rgba(118,118,118,1);
    opacity:1;
}
.SysUser{
    height: 100%;
    border-radius: 0.04rem;
    .ivu-table th{
        padding: 0 25px;
    }
    .bd_header {
        background-size: 100%;
        padding: .61rem 0 .61rem .6rem;
        color: #ffffff;
        background: url("../../../../../static/image/SysBg.png")no-repeat;
        background-size: cover;
    }
    .bd_header p{
        font-size:0.18rem;
        font-weight:bold;
        margin-bottom: 0.2rem;
    }
        .bd_header_content{
            position: relative;
        }
        .ivu-form-item-label{
            font-size:0.14rem;
            font-family:'Source Han Sans CN';
            font-weight:bold;
            line-height:0.23rem;
            color:rgba(255,255,255,1);
        }
        .ivu-form-item{
            margin-bottom:0;
        }
        .ivu-select-input{
            height: 0.38rem;
        }
        .ivu-form-item-content{
            position: relative;
            .ivu-select{
                // display: block;
                width:1.5rem;
                // height:0.4rem;
                background:rgba(255,255,255,1);
                border-radius:0.04rem;
            }
            .ivu-input{
                width:3.8rem;
                height: 0.4rem;
                background: #fff;
                border-radius: 0.04rem;
                box-sizing: border-box;
                padding-left: 0.4rem;
                font-size:0.14rem;
            }
            .ivu-input-icon {
                line-height: .4rem;
            }
            .ivu-select-input {
                color: #151515;
                font-size: .14rem;
            }
            .ivu-btn-primary{
                width:0.9rem;
                height:0.4rem;
                background:rgba(68,113,254,1);
                border-radius:0.04rem;
                font-size:0.2rem;
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
        .setData{
            width: 100%;
            border:1px solid #E7EEEF;
            border-radius: 0.02rem;
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.12rem 0.22rem;
            font-family:'Source Han Sans CN';
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
                  .ssAdd{
                    padding: 0 7px;
                    height: 30px;
                    line-height: 27px;;
                    background:rgba(68,113,254,1);
                    border-radius:0.04rem;
                    text-align: center;
                    font-size:0.14rem;
                    font-family:'Source Han Sans CN';
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    cursor: pointer;
                    span{
                      vertical-align: middle;
                      font-size: .12rem;
                      margin: 0 0.02rem;
                      display: inline-block;
                    }
                    .iconfont{
                        font-size: .1rem;
                    }
                  }
              }
            }
        }
}
</style>
