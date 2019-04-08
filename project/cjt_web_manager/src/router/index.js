import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'
import menus from '../common/menu'
import Main from '@/pages/Main';
import Login from '@/pages/login'
import businessData from '@/pages/index/information/merchant/businessData';
import settingUnsalable from '@/pages/index/information/merchant/settingUnsalable';
import bestSellingGoods from '@/pages/index/information/merchant/bestSellingGoods';


// 账号管理 > 运营人员管理
import SysUser from '@/pages/platform/account/operation/SysUser'

// 账号管理 > 子公司管理
import SubCorporation from '@/pages/platform/account/SubCompanyManagement/SubCorporation'
import addSubCorporation from '@/pages/platform/account/SubCompanyManagement/addSubCorporation'

// 账号管理 > 店铺管理
import ShopList from '../pages/platform/account/StoreManagement/shopList'
import shopManagement from '../pages/platform/account/StoreManagement/shopManagement'
import WillAuditShop from '../pages/platform/account/StoreManagement/WillAuditShop'
import EditingShop from '../pages/platform/account/StoreManagement/EditingShop'

// 账号管理 > 用户管理
import userData from '../pages/platform/account/UserManagement/userData'
import details from '../pages/platform/account/UserManagement/details'

// 系统管理
import Role from '@/pages/platform/system/role'
import Menu from '@/pages/platform/system/menu'
import privilege from '@/pages/platform/system/privilege' //权限管理

// 运营管理
import OrderRecord from '@/pages/business/platformBusiness/orderRecord' //订单记录
import chainStoreList from '@/pages/business/platformBusiness/chainStoreList' //连锁商家列表
import createPayCode from '@/pages/business/platformBusiness/createPayCode' //付款二维码生成
//小程序
import salesManagement from '@/pages/business/smallProgram/salesManagement' //促销管理
import vegetablePrice from '@/pages/business/smallProgram/vegetablePrice' //菜价管理
import merchantCategory from '@/pages/business/smallProgram/merchantCategory' //配置商家品类

// 财务管理 
import CollAndLend from '@/pages/financeManage/finance/collAndlend' //收放款
import LoanManagement from '@/pages/financeManage/finance/LoanManagement' //打款管理 
import cashManagement from '@/pages/financeManage/finance/cashManagement' //提现 
import payRoad from '@/pages/financeManage/finance/payRoad' //支付通道 
import FundManagement from '@/pages/financeManage/finance/FundManagement'

// 首页
import kanban from '@/pages/index/echartsData/entiretykanban/kanban.vue' //整体看板
import shopdata from '@/pages/index/echartsData/entiretykanban/shopdata.vue' //商家数据
// import userdata from '@/pages/index/echartsData/entiretykanban/userdata.vue' //用户数据
import userDataQuery from '@/pages/index/information/user/userDataQuery'; //首页》用户数据



Vue.use(Router);

let router = new Router({
  // mode: 'history',
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      component: Main,
      redirect: '/login'
    },
    {
      path: '/Index',
      component: Main,
      redirect: '/Index/kanban',
      children: [{
          path: 'kanban',
          name: 'kanban',
          component: kanban
        },
        {
          path: 'settingUnsalable',
          name: 'settingUnsalable',
          component: settingUnsalable
        },
        {
          path: 'bestSellingGoods',
          name: 'bestSellingGoods',
          component: bestSellingGoods
        },
        {
          path: 'userDataQuery', //首页》用户数据
          name: 'userDataQuery',
          component: userDataQuery
        },
        {
          path: 'shopdata',
          name: 'shopdata',
          component: shopdata
        }
      ]
    },
    {
      path: '/platForm',
      component: Main,
      redirect: '/platForm/menu',
      children: [{
          path: 'menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: 'SysUser',
          name: 'SysUser',
          component: SysUser
        },
        {
          path: 'SubCorporation', //子公司管理
          name: 'SubCorporation',
          component: SubCorporation
        },
        {
          path: 'role',
          name: 'Role',
          component: Role
        },
        {
          path: 'privilege', //权限管理
          name: 'privilege',
          component: privilege
        },
        {
          path: 'addSubCorporation', //添加子公司
          name: 'addSubCorporation',
          component: addSubCorporation
        },
        {
          path: 'shopList', //店铺列表
          name: 'ShopList',
          component: ShopList
        },
        {
          path: 'WillAuditShop',
          name: 'WillAuditShop',
          component: WillAuditShop
        },
        {
          path: 'shopManagement', //店铺管理
          name: 'shopManagement',
          component: shopManagement
        },
        {
          path: 'EditingShop', //店铺管理》编辑
          name: 'EditingShop',
          component: EditingShop
        },
        {
          path: 'userData', //用户管理
          name: 'userData',
          component: userData
        },
        {
          path: 'details', //用户管理》查看详情
          name: 'details',
          component: details
        }
      ]
    },
    {
      path: '/business',
      component: Main,
      redirect: '/business/orderRecord',
      children: [{
          path: 'orderRecord',
          name: 'OrderRecord',
          component: OrderRecord
        },
        {
          path: 'chainStoreList', //连锁商家列表
          name: 'chainStoreList',
          component: chainStoreList
        },
        {
          path: 'createPayCode', //付款二维码生成
          name: 'createPayCode',
          component: createPayCode
        },
        {
          path: 'salesManagement', //小程序》促销管理
          name: 'salesManagement',
          component: salesManagement
        },
        {
          path: 'merchantCategory', //小程序》配置商家品类
          name: 'merchantCategory',
          component: merchantCategory
        },
        {
          path: 'vegetablePrice', //小程序》菜价管理
          name: 'vegetablePrice',
          component: vegetablePrice
        },
      ]
    },
    {
      path: '/finance',
      component: Main,
      redirect: '/finance/collAndlend',
      children: [{
          path: 'collAndlend', //收放款
          name: 'CollAndLend',
          component: CollAndLend
        },
        {
          path: 'cashManagement', //提现管理
          name: 'cashManagement',
          component: cashManagement
        },
        {
          path: 'LoanManagement', //打款管理
          name: 'LoanManagement',
          component: LoanManagement
        },
        {
          path: 'payRoad', //支付通道
          name: 'payRoad',
          component: payRoad
        },
        {
          path: 'FundManagement', //放款管理
          name: 'FundManagement',
          component: FundManagement
        }
      ]
    }
  ]
});
export default router
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('Index') > -1) {
    let menu = menus.Index
    store.commit('setMenus', menu)
  } else if (to.path.indexOf('platForm') > -1) {
    let menu = menus.platForm
    store.commit('setMenus', menu)
  } else if (to.path.indexOf('business') > -1) {
    let menu = menus.business
    store.commit('setMenus', menu)
  } else if (to.path.indexOf('finance') > -1) {
    let menu = menus.finance
    store.commit('setMenus', menu)
  }
  next();
})
