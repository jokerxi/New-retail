<template>
    <div class="role">
        <div class="rolehead">
            <div class="add" @click="openModal('add')"><span class="iconfont icon-tianjiaicon-"></span> 新增角色</div>
        </div>
        <div class="setData">
         <div class="TableHead">
            <div class="head-left">
                <h4>角色列表</h4>
            </div>
        </div>
        <Table :columns="columns" :data="datas"></Table>
      </div>
      <Modal
        class="RoleModal"
        v-model="visiable"
        :title="title"
        :width="330"
        class-name="vertical-center-modal"
        ok-text="确定"
        @on-ok="formHandle"
        @on-cancel="closeModal">
         <div class="roleHandle">
             <span>角色名称：</span>
             <Input v-model="editParam.name"/>
         </div>
    </Modal>
    </div>
</template>

<script>
import Pages from '../../../components/Pages'
import { showAllRole,EditRole,AddRole } from '../../../api/shopManage'

    export default{
        name: "role",
        components:{
            Pages
        },
        data(){
            return{
                types: '',
                editParam:{
                    id:'',
                    name: '',
                    roleType: ''
                },
                visiable:false,
                title:'新增角色',
                current:'',
                datas:[],
                columns:[
                    {
                       type: 'index',
                       title:'序号',
                       align: 'center', 
                       width:100
                    },
                    {
                        title:'角色名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title:'操作',
                        key:'operate',
                        width:200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: params.index === this.current ? 'primary':'default',
                                        size: 'small',
                                        disabled: params.row.name == '超级管理员' ? true:false

                                    },
                                    style: {
                                       width:'60px',
                                       height:'30px',
                                       borderRadius:'0.04rem',
                                       margin:'0 0.1rem',
                                       
                                    },
                                    on: {
                                        click: () => {
                                            this.openModal(params.row)
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ]
            }
        },
         created(){
          this.getRoleList(1)

        },
        methods:{
            // 获取角色的下拉列表
            getRoleList(payload){
                return new Promise((resolve,reject) => {
                    showAllRole(payload).then(res => {
                        if(res.data.success){
                            console.log(res.data.data)
                            this.datas = res.data.data
                            this.pagations.total = res.data.total
                        } else {
                            this.$Message.error(res.data.msg)
                        }
                    }).catch(err => {
                        // this.$Message.error(err)
                       
                    })
                })
            },
            //操作
            formHandle(){
                 this.editParam.name = this.editParam.name.trim()
                if(this.types == 'add'){
                    this.AddRollee(this.editParam)
                }else{
                    this.editRolee(this.editParam)
                }
            },

            //编辑角色
            editRolee(payload){
                return new Promise((resolve,reject) => {
                    EditRole(payload).then(res => {
                        if(res.data.success){                         
                           this.$Message.success(res.data.msg)
                           this.getRoleList(1)
                        }else{
                            
                            this.$Message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$Message.error(err)
                    })
                })
            },

            //新增角色
            AddRollee(payload){
                return new Promise((resolve,reject) => {
                    AddRole(payload).then(res => {
                        if(res.data.success){
                           
                            this.$Message.success(res.data.msg)
                            this.getRoleList(1)
                        }else{
                            this.$Message.error(res.data.msg)
                        }
                    }).catch(err =>{
                        // this.$Message.error(err)
                        
                    })
                })

            },

            //    打开模态框
           openModal(data){
               if(data == 'add'){
                   this.types = 'add';
                   this.editParam.roleType = 1;
                   this.title = "新增角色";
                   this.editParam.name = ''
               }else{
                   this.types = 'edit'
                   this.editParam.id = data.id
                   this.editParam.name = data.name
                   this.title = '编辑角色'
               }
                this.visiable = true;
           },
            

        //    关闭模态框
           closeModal(){
               this.visiable = false
           },
            //    编辑员工
            showModal(param){
                this.current = param
            }
        }
    }
</script>

<style lang="scss">
.role{
    .rolehead{
        width: 100%;
        height: 1.2rem;
        border-radius: 0.04rem;
        background: url('../../../../static/image/SysBg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 0 0.21rem;
        box-sizing: border-box;
        .add{
            padding: 6px 14px 6px;
            background:rgba(68,113,254,1);
            border-radius:0.04rem;
            text-align: center;
            height:30px;
            font-size:0.12rem;
            font-family:'Source Han Sans CN';
            font-weight:400;
            color:rgba(255,255,255,1);
            cursor: pointer;          
            .iconfont {
              font-family: "iconfont" !important;
              font-size: 12px;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
          }
        }

    }
    .setData{
        width: 100%;
        border:1px solid #E7EEEF;
        border-radius: 0.02rem;
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.12rem 0.22rem .5rem .22rem;
        font-family:'Source Han Sans CN';
        .TableHead{
            width: 100%;
            margin-top: 0.28rem;
            margin-bottom: 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        h4{
            font-size:0.18rem;
            font-weight:bold;
            line-height:0.23rem;
            color:rgba(21,21,21,1);
            margin-right: 0.11rem;
        }
    }
    .ivu-btn-small{
        color: #000000;
        outline: none;
        padding: 0px 7px 2px;
        font-size: .14rem;
    }
    .ivu-btn-small:focus {
        background-color: #4471FE;
        color: #ffffff;
        outline: none;
    }
}
.RoleModal{
    
    .ivu-modal-body{
      padding: 0.35rem 0.5rem;
      box-sizing: border-box;
      height:100px;
      .roleHandle{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span{
            display: inline-block;
            width: 102px;
            font-size:0.14rem;
            font-family:'Source Han Sans CN';
            font-weight:400;
            color: #151515;
          }
      }
    }
    
    .ivu-modal-footer{
        text-align: center;
        border-top:0;
        padding: 5px 18px 20px 18px;
        .ivu-btn{
        width:0.9rem;
        height:0.4rem;
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
    .ivu-modal{
        top: 0;
    }
    
}
.ivu-form-item-error-tip {      
    padding-top: 0px;
} 

.vertical-center-modal{
    display: flex;
    justify-content: center;
    align-items: center;
    .ivu-modal-header p, .ivu-modal-header-inner {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight:bold;
        line-height:0.23rem;
        color:#000000;
        opacity:1;
    }

}
</style>
