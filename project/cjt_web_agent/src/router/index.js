import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import UnPayRecord from '../views/unPayRecord'
import login from '../views/login'
import Setting from '../views/setting'
import AddBasic from '../views/addBasic'
import AddPrepay from '../views/addPrepay'
import AddCash from '../views/addCash'
import informationPrepayment from '../views/informationPrepayment'
import ShopManagement from '../views/shopManagement'
import baseUrl from '../global'
import submitRecord from '../views/submitRecord'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    meta: {
      title: '叮当会员子公司',
    },
    component: Index
  },
    {
      path: '/unPayRecord',
      name: 'UnPayRecord',
      meta: {
        title: '预付金记录',
      },
      component: UnPayRecord
    },
    {
      path: '/brorrowRecord',
      name: 'BrorrowReord',
      meta: {
        title: '借款记录',
      },
      component: UnPayRecord
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        hide: true,
      },
      component: login
    },
    {
      path: '/setting',
      name: 'Setting',
      meta: {
        title: '设置',
      },
      component: Setting
    },
    {
      path: '/addBasic',
      name: 'AddBasic',
      meta: {
        title: '添加店铺'
      },
      component: AddBasic
    },
    {
      path: '/addPrepay',
      name: 'AddPrepay',
      meta: {
        title: '添加店铺'
      },
      component: AddPrepay
    },
    {
      path: '/addCash',
      name: 'AddCash',
      meta: {
        title: '添加店铺'
      },
      component: AddCash
    },
    {
      path: '/informationPrepayment',
      name: 'informationPrepayment',
      meta: {
        title: '店铺详情'
      },
      component: informationPrepayment
    },
    {

      path: '/shopManagement',
      name: 'ShopManagement',
      meta: {
        title: '店铺管理',
        Dreport:true
      },
      component: ShopManagement
    },
    {
      path: '/submitRecord',
      name: 'submitRecord',
      meta: {
        title: '提交记录'
      },
      component: submitRecord
    }
  ]
})
export default router
// router.beforeEach((to, from, next) => {

//   let locationUrl = window.location.href;
//    // 从内存取得openid
//   let openid = window.localStorage.getItem("openid");
//   let appid = 'wx106df1a0df37c4a0'
//   console.log(locationUrl,999)
//     // 内存内没有openid
//     if (!openid) {
//         // 检测是否参数内有code，若有则跳接口获取openid，若没有则跳授权页
//         if (locationUrl.indexOf("code") >= 0) {  // 链接里有code
//             axios.post(baseUrl+'/login/codeLogin/'+ getval(locationUrl, 'code'), {
//                 code: getval(locationUrl, 'code'),
//                 state: getval(locationUrl, 'state')
//             }).then((res) => {
//                 if (res.data.rel) {
//                     window.localStorage.setItem("openid", res.data.result.openid);
//                     window.localStorage.setItem("nickname", res.data.result.nickName);
//                     window.localStorage.setItem("userheadimg", res.data.result.userHeadimg);
//                     window.localStorage.setItem("amount", res.data.result.amount);
//                     // 存入vuex相关登陆信息
//                     // store.commit('setUserMsg', res.data.result);
//                     // store.commit('setOpenId', res.data.result.openid);
//                 } else {
//                     console.log('登陆失败' + res.data.msg);
//                 }
//             }).catch((err) => {
//                 console.error('登陆失败' + err);
//             })
//         } else {  // 链接里没有code
//             let redirectHref = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
//                 + appid
//                 + '&redirect_uri='
//                 + encodeURIComponent(locationUrl)
//                 + '&response_type=code&scope=snsapi_userinfo&state='
//                 // + state
//                 + getval(locationUrl, 'state')
//                 +'#wechat_redirect';
//             window.location.href = redirectHref;  // 跳转微信链接获取code和state（state没啥用目前暂时）
//         }
//     } else {  // 内存里有openid
//         let member = {};
//         member.nickName = window.localStorage.getItem("nickName");
//         member.userHeadimg = window.localStorage.getItem("userHeadimg");
//         member.amount = window.localStorage.getItem("amount");
//         // store.commit('setUserMsg', member);
//     }
// })

// //从url中获取参数值
// function getval(url, name) {
//     var reg = new RegExp("(^|\\?|&)"+ name +"=([^&|#]*)(\\s|&|#|$)", "i");  // 因为vue有添加“#”的特点，所以这里的正则表达式会匹配 & -- &/#
//     if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
//     return "";
// }
