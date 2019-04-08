<template>
  <div id="menuPage">
    <div class="menuPage-top">
      <div class="smTable">
        <span :class="{'current': menuType === item.id}" v-for="(item,index) in titleList" :key="index" @click="Change(item.id)">{{item.title}}</span>
      </div>
      <div class="mpBtnBox">
        <Button type="primary" @click="openModal('add')"><span class="iconfont icon-tianjiaicon-"></span> 新增菜单</Button>
      </div>
    </div>
   
    <Menu v-for="(one,index) in oneList" :key="index" class="Menuindex" :open-names="['index']" style="width: 100%" >
      <Submenu :name="index">
        <template slot="title">
          <span>{{one.name}}</span>
          <Icon type="md-menu" />
          <Button type="primary" @click.stop="openModal(one.id)">编辑</Button>
          <Button type="primary" @click.stop="openDel(one)" class="delbtn">删除</Button>
        </template>
        <MenuGroup>
          <Menu :open-names="[opennames]">
            <Submenu :name="index+'-'+sindex" v-for="(suns,sindex) in one.suns" :key="sindex">
              <template slot="title">
                 <Icon type="md-arrow-dropdown" color="#4471FE" :size='20' />
                <span>{{suns.name}}</span>
                <Button type="primary" @click.stop="openModal(suns.id)">编辑</Button>
                <Button type="primary" @click.stop="openDel(suns)" class="delbtn">删除</Button>
              </template>
              <MenuGroup>
                <MenuItem v-for="(three,tindex) in suns.suns" :name="index+'-'+sindex+'-'+tindex" :key="tindex">
                  <span>{{three.name}}</span>
                  <Button type="primary" @click.stop="openModal(three.id)">编辑</Button>
                  <Button type="primary" @click.stop="openDel(three)" class="delbtn">删除</Button>
                </MenuItem>                
              </MenuGroup>          
            </Submenu>
          </Menu>
        </MenuGroup>
      </Submenu>
    </Menu>

    <!-- 模态框 -->
    <Modal v-model="action" class-name="vertical-center-menu" :title="title" width=500 ok-text="保存">
      <div><span>菜单名称*：</span><Input v-model="formList.name" placeholder="请输入菜单名称"  style="width: 3.25rem" /></div>
      <div><span>菜单路径*：</span><Input v-model="formList.url" placeholder="请输入菜单路径" style="width: 3.25rem" /></div>
      <div><span>一级父级菜单：</span><Select size="small"  @on-change="getMenu" v-model="formList.firParentId" style="width: 3.25rem" transfer>
          <Option v-for="item in menuList1" :value="Number(item.id)" :key="item.id">{{ item.name }}</Option>
        </Select></div>
      <div><span>二级父级菜单：</span><Select size="small" v-model="formList.secParentId" style="width: 3.25rem" transfer>
          <Option v-for="sec in menuList2" :value="Number(sec.id)" :key="sec.id">{{ sec.name }}</Option>
        </Select></div>
      <div><span>排序编号*：</span><Input v-model="formList.sort" placeholder="请输入编号" style="width: 3.25rem" /></div>
      <div slot="footer">
              <Button @click='closeEdit'>取消</Button>
              <Button type="primary" @click="SaveEdit">确定</Button>
            </div>
    </Modal> 
    <!-- DelModal -->
     <Modal v-model="DelModal" class-name="vertical-center" title="" width=330>
      <p>确定删除{{menuName}}菜单</p>
      <div slot="footer">
        <Button @click='closeDel'>取消</Button>
        <Button type="primary" @click="deleteMenuHandle(id)">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { menuDetails,allMenuList,addMenu,menuEdit,deleteMenu,parentMenu } from '../../../api/menuPermissions'
export default {
  name: 'menuPage',
  data() {
    return {
      current: 0,
      action: false,
      DelModal: false,
      // Operate: true,
      formList:{
          firParentId: "",
          firParentIdName: "",
          id: "",
          menuType: "",
          name: "",
          secParentId: "",
          secParentIdName: "",
          sort: "",
          thParentId: "",
          thParentIdName: "",
          url: "",
    },
      title: '',
      opennames: "",
      menuName: "",
      ingleMenu: {
        level: 1,
        parentId: '',
        menuType: 1,
      },
      titleList: [
        {
          id: 1,
          title: '运营后台菜单配置'
        },
        {
          id: 2,
          title: '商家后台菜单配置'
        },
      ],
      oneList: [
        {
          id: "",
          name: "",
          suns: ""
        }
      ],
      id:'',
      menuType:1,
      menuList1: [],
      menuList2: [],
      model: ''
    }
  },
  created(){
     this.getAllMenuList(this.menuType)
     this.parentMenuHandle(this.ingleMenu)
  },
  methods: {
    // 获取所有菜单
    getAllMenuList(payload){
      return new Promise((resolve,reject) => {
        allMenuList(payload).then(res => {
          if(res.data.success){
              this.oneList = res.data.data
          }else{
            this.$Message.error(res.data.msg)
          }
        }).catch(err => {
          this.$Message.error(err)
        })
      })
    },
      //  菜单详情
    menuDetailsHandle(item){
      return new Promise((resolve,reject) => {
        menuDetails(item).then(res => {
          if(res.data.success){
            this.formList = res.data.data
            let data = res.data.data
            if(data.firParentId){
              this.ingleMenu.parentId = data.firParentId
              this.ingleMenu.level = 2
              this.parentMenuHandle(this.ingleMenu)
            }
          }else{
            this.$Message.error(res.data.msg)
          }
        }).catch(err =>{
          this.$Message.error(err)
        })
      })
    },
    //  打开模态框
     openModal(val) {
      if(val=='add'){
        this.title = '新增菜单'  
        this.formList={
          firParentId: "",
          firParentIdName: "",
          id: "",
          menuType: "",
          name: "",
          secParentId: "",
          secParentIdName: "",
          sort: "",
          thParentId: "",
          thParentIdName: "",
          url: "",
        }
      }else{
        this.title = '编辑菜单'
        this.action = true;
        this.menuDetailsHandle(val)
        this.parentMenuHandle(this.ingleMenu)
      } 
      this.action = true;
    },
    // 关闭模态框
    closeEdit(){
      this.action = false
    },
    // 保存或编辑
    SaveEdit(){
      if(this.formList.id && this.formList.id != ''){
        this.menuEditHandle(this.formList)
      } else {
        this.formList.menuType = this.menuType
       this.addMenuHandle(this.formList)
      }
    },
    // 打开删除
    openDel(item){
      this.id = item.id
      this.menuName = item.name
      this.DelModal = true
    },
    closeDel(){
      this.DelModal = false
    },
    // 删除菜单
    deleteMenuHandle(payload){
      return new Promise((resolve,reject) => {
        deleteMenu(payload).then(res => {
          if(res.data.success){
            this.$Message.success(res.data.msg)
            this.getAllMenuList(this.menuType)
            this.DelModal = false
          }else{
            this.$Message.error(res.data.msg)
          }
        }).catch(err => {
          this.$Message.error(err)
        })
      })     
    },

    //  新增菜单
    addMenuHandle(payload){
      return new Promise((resolve,reject) => {
        addMenu(payload).then(res => {
          if(res.data.success){
            this.$Message.success(res.data.msg)
            this.getAllMenuList(this.menuType)
            this.action = false
          }else{
            this.$Message.error(res.data.msg)
          }
        }).catch(err => {
          this.$Message.error(err)
        })
      })
    },
    //  编辑菜单
    menuEditHandle(payload){
      return new Promise((resolve,reject) => {
        menuEdit(payload).then(res => {
          if(res.data.success){
            this.$Message.success(res.data.msg)
            this.getAllMenuList(this.menuType)
            this.action = false
          }else{
            this.$Message.error(res.data.msg)
          }
        }).catch(err =>{
          this.$Message.error(err)
        })
      })
    },
    //  弹框下拉框 一级菜单
    parentMenuHandle(payload){
      return new Promise((resolve,reject) => {
        parentMenu(payload).then(res => {
          if(res.data.success){
            if(this.ingleMenu.level==1){
              this.menuList1 = res.data.data
            }else{
              this.menuList2 = res.data.data
            }
          }else{
            this.$Message.error(res.data.msg)
          }
        }).catch(err => {
          this.$Message.error(err)
        })
      })
    },
    //弹框下拉框 二级菜单
    getMenu(val){
      this.ingleMenu.level = 2
      this.ingleMenu.parentId = val
      this.parentMenuHandle(this.ingleMenu)
    },
    //点击table变换颜色
    Change(index){
      this.menuType = index 
      this.getAllMenuList(index) 
    },  
  }
}

</script>
<style lang="scss">
#menuPage {
  .menuPage-top {
    background-color: #FFFFFF;
    padding: 0 .2rem;
    border-radius: 4px;
    margin-bottom: .1rem;
    .smTable{

            height: .5rem;
            border-bottom: 1px solid #E7EEEF;
            padding-bottom:2px; 
                
            span{
                line-height: .5rem;
                height: .5rem;
                cursor: default;
                display: block;
                float: left;
                text-align: center;
                width: 150px;
                color: #767676;
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:bold;                   
                &.current{
                    border-bottom: 2px solid #0061E2;
                    color: #000000;
                }
            }
        }
        .mpBtnBox{
          padding: .21rem 0 .18rem 0;
          span {
            font-size: 0.12rem;
            padding-right: 0.05rem;
            box-sizing: border-box;
          }
          .ivu-btn {
            padding: 5px 8px 6px;
          }
        }
    #operation {
      button {
        font-size: .12rem;

        i {
          line-height: initial;
        }
      }
    }
  }

  .Menuindex {
    font-size: .14rem;
    font-weight: bold;
    margin-bottom: .1rem;
    border-radius: 4px;

    &:after {
      display: none;
    }

    button {
      float: right;
      margin-left: 10px;
      width: 60px;
      height: 30px;
      line-height: 1;
      margin-top: -5px;
    }

    .delbtn {
      background-color: #FFFFFF;
      color: #000000;
    }

    .ivu-menu-opened {
      // box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1)
    }

    .ivu-menu:after {
      display: none;
    }
      .ivu-menu .ivu-menu-item-group:last-child .ivu-menu-submenu-title,
    .ivu-menu .ivu-menu-item-group:last-child .ivu-menu-item:last-child {

      &:before {
        display: none;
      }
    }

    .ivu-menu-submenu-has-parent-submenu>.ivu-menu-submenu-title:before {
      content: '';
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      margin: auto;
      border-bottom: 1px #E7EEEF solid;
      width: 95%;
      z-index: 999;
    }

    .ivu-menu-opened:before {
      content: '';
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      margin: auto;
      border-bottom: 1px #E7EEEF solid;
      width: 97%;
      z-index: 999;
    }

    .ivu-menu-submenu-title {
      font-size: .14rem;
      font-weight: bold;
      position: relative;

    }

    .ivu-menu-item-group-title {
      display: none;
    }

    .ivu-menu {
      width: 100% !important;
    }

    .ivu-menu-submenu-title-icon {
      display: none;
    }

    .ivu-menu-submenu-title>.ivu-icon-md-menu {
      font-size: 26px;
      color: #4471FE;
      float: left;
      line-height: .9;
    }
  }

  .ivu-menu-submenu-title-icon:nth-child(2) {
    display: none;
  }

  .ivu-menu-item:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 93px;
    right: 0;
    border-bottom: 1px #E7EEEF solid;
    width: 94.6%;
  }

  .ivu-menu-submenu-title:last-child {
    height: 100rem;

    &:before {
      display: none;
    }
  }
}
.ivu-modal-header p, .ivu-modal-header-inner {
    font-size: .14rem;
    color: #000000;
    font-weight: bold;

}

.vertical-center{
    display: flex;
    justify-content: center;
    align-items: center;
  .ivu-modal-body {
  
    text-align: center;
    font-size:0.14rem;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height:0.18rem;
    color:rgba(118,118,118,1);
    opacity:1;
    padding: 60px 74px 20px 74px;
    line-height: 1.5;
  }
  
}

.vertical-center-menu{
  display: flex;
  justify-content: center;
  align-items: center;
  .ivu-modal-body {
      padding: 25px 30px;
      font-size: 12px;
      line-height: 1.5;
      // text-align: center;
      .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
          height: 30px; 
          line-height: 30px; 
          font-size: .14rem;
          width: 100%;
          text-align: left;
      }
  }
  

  .ivu-modal-body>div {
    margin-bottom: 10px;

    span {
      display: inline-block;
      width: 100px;
      color: #151515;
      font-size: .14rem;
    }

    .ivu-modal-header {
      border-bottom: 1px solid #E7EEEF;
    }
  }
}
.ivu-modal {
    top: 0;
  }
.ivu-modal-footer {
  border: none;
  text-align: center;
  padding: .12rem .18rem .3rem;
  .ivu-btn>span {
      vertical-align: baseline;
  }
  button {
    width: 90px;
    height: 40px;
    
    border: 1px #E7EEEF solid;
    font-size: .2rem;
    &:hover {
      border: 1px #57a3f3 solid;
    }
  }
 
}
 .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
      padding-left: 96px !important;
  }
  .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
      color: #4471FE;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: #4471FE;
      background: #f0faff;
      z-index: 2;
  }
</style>
