import Vue from 'vue'
import Vuex from 'vuex'
import staff from './Moudles/staff'
import login from './Moudles/login'
import financial from './Moudles/financial'
import shop from './Moudles/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabShow1: 1, //顶部导航切换状态值
    code: 0,
    userInfo: '',  //  登录后店铺及身份信息
  },
  mutations: {
    //ceo首页顶部导航切换值获取的方法
    getUsercount(state, obj) {
      console.log("传过来的n:", obj);
      this.state.tabShow1 = obj
    },
    saveCode(state, param) {
      this.state.code = param
    },
    //  登录后店铺及身份信息获取
    getUserInfo(state, user) {
      state.userInfo = user
    }
  },
  actions: {},
  modules: {
    staff,
    login,
    financial,
    shop
  }
})


