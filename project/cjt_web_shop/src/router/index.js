import Vue from 'vue'
import Router from 'vue-router'

//页面引入
import shuttleBox from '../components/shuttleBox';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    //登录
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/pages/login'], resolve)
    },
    //二级页面
    {
      path: '/mainPage',
      name: 'main-page',
      component: resolve => require(['@/pages/mainPage'], resolve),
      children:[
        //CEO首页
        {
          path: '/indexCeo',
          name: 'index-ceo',
          component: resolve => require(['@/pages/indexCeo'], resolve)
        },
        //店铺管理
        {
          path: '/shopList',
          name: 'shop-list',
          component: resolve => require(['@/pages/shopList'], resolve)
        },
        //CEO设置区域经理页面
        {
          path: '/myareaManager',
          name: 'myarea-manager',
          component: resolve => require(['@/pages/myareaManager'], resolve)
        },
        {
          path: '/subPage',
          name: 'sub-page',
          component: resolve => require(['@/pages/subPage'], resolve),
          children: [

            // 店铺概况
            // {
            //   path: '/indexStaff',
            //   name: 'index-staff',
            //   component: resolve => require(['@/pages/indexStaff'], resolve),
            // },
            {
              path: '/spIndexCeo',
              name: 'index-ceo',
              component: resolve => require(['@/pages/indexCeo'], resolve)
            },
            // 深度统计
            {
              path: '/AllStatistics',
              name: 'AllStatistics',
              component: resolve => require(['@/pages/AllStatistics'], resolve),
            },
            //库存
            {
              path: '/inventory',
              name: 'inventory',
              component: resolve => require(['@/pages/inventory'], resolve),
            },

            //员工列表
            {
              path: '/employeeInquiries',
              name: 'employeeInquiries',
              component: resolve => require(['@/pages/employeeInquiries'], resolve),
            },

            //奖金池记录
            {
              path: '/employeeManagement',
              name: 'employeeManagement',
              component: resolve => require(['@/pages/employeeManagement'], resolve),
            },

            //订单记录
            {
              path: '/orderRecord',
              name: 'orderRecord',
              component: resolve => require(['@/pages/orderRecord'], resolve),

            },

            //二维码
            {
              path: '/paymentCode',
              name: 'paymentCode',
              component: resolve => require(['@/pages/paymentCode'], resolve),
            },

            //促销商品查询
            {
              path: '/promotionAnalysis',
              name: 'promotionAnalysis',
              component: resolve => require(['@/pages/promotionAnalysis'], resolve),
            },

            //设置滞销天数
            {
              path: '/unsalableDays',
              name: 'unsalable-days',
              component: resolve => require(['@/components/unsalableDays'], resolve),
            },

            //滞销商品列表
            {
              path: '/unsalableSet',
              name: 'unsalable-set',
              component: resolve => require(['@/pages/unsalableSet'], resolve),
            },

            //店铺概况
            {
              path: '/shopNav',
              name: 'shop-nav',
              component: resolve => require(['@/components/shopNav'], resolve),
            },

            //畅销品缺货查询
            {
              path: '/bestSellingProducts',
              name: 'bestSellingProducts',
              component: resolve => require(['@/pages/bestSellingProducts'], resolve),
            },

            //收银统计列表
            {
              path: '/cashierStatistics',
              name: 'cashierStatistics',
              component: resolve => require(['@/pages/cashierStatistics'], resolve),
            },

            //收银统计详情
            {
              path: '/cashierStatisticsChild',
              name: 'cashierStatisticsChild',
              component: resolve => require(['@/pages/cashierStatisticsChild'], resolve),
            },
            //活动返利
            {
              path: '/rebateActivities',
              name: 'rebateActivities',
              component: resolve => require(['@/pages/rebateActivities'], resolve),
            },
            //返利统计
            {
              path: '/resultsStatistical',
              name: 'resultsStatistical',
              component: resolve => require(['@/pages/resultsStatistical'], resolve),
            },
            //添加返利模板
            {
              path: '/addRebateTemplates',
              name: 'addRebateTemplates',
              component: resolve => require(['@/pages/addRebateTemplates'], resolve),
            },
            //区域经理列表
            // {
            //   path: '/areaManager',
            //   name: 'area-manager',
            //   component: resolve => require(['@/pages/areaManager'],resolve),
            // },
          ]
        }
      ]
    },

    //组件使用测试

    // //侧边栏组件
    // {
    //   path: '/asideMenu',
    //   name: 'aside-menu',
    //   component: resolve => require(['@/components/asideMenu'],resolve),
    // },

    ////表格组件
    // {
    //   path: '/',
    //   name: 'synthesize-table',
    //   component: synthesizeTable
    // },

    // //穿梭框组件
    // {
    //   path: '/shuttleBox',
    //   name: 'shuttle-box',
    //   component: shuttleBox
    // },

    //// 顶部导航栏组件测试
    {
      path: '/index-navss',
      name: 'index-navss',
      component: resolve => require(['@/components/indexNavss'], resolve),
    },
    //// 上传图片测试
    {
      path: '/uploadPicture',
      name: 'upload-picture',
      component: resolve => require(['@/components/uploadPicture'], resolve),
    },
    //404找不到页面
    {
      path: '*',
      name: 'pageLoss',
      component: resolve => require(['@/pages/pageLoss'], resolve),
    },
  ]
})
