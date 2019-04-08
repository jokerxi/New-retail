// jshint esversion: 6
import {
  queryAllRoleloginId,
  userlogingetCode,
  uerloginLogin,
  indexcheckRole,
  loginshowTop,
  logout
} from '../../api/login.js';

export default {
  // 定义初始值
  state: {
    queryAllRoles: [],
    Basic64: '',
    success: '',
    token:'',
    loginId: ''
  },
  // 改变state值
  mutations: {
    setqueryAllRoles(state, data) {
      state.queryAllRoles = data;
    },
    setuerloginLogin(state, data) {
      // state.success = data.success
      state.token = data
      // state.loginId = data.loginId
    }
  },
  // 异步
  actions: {
    // 用户获取验证码
    getuserlogingetCode({ state, commit }, telephone) {
      return new Promise((resolve, reject) => {
        userlogingetCode(telephone)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 用户登入
    getuerloginLogin({ state, commit }, telephone_code) {
      // console.log(telephone_code);
      return new Promise((resolve, reject) => {
        uerloginLogin(telephone_code)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 用户选择职务
    getindexcheckRole({ state, commit }, action) {
      return new Promise((resolve, reject) => {
        indexcheckRole(action)
          .then(res => {
            // console.log(res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //顶部菜单  没接
    getloginshowTop({state,commit}, roleId_menuType){
      return new Promise((resolve, reject)=> {
        loginshowTop(roleId_menuType)
        .then(res=> {
          console.log(res);
          resolve(res);
        })
        .catch(err=> {
          reject(err)
        });
      });
    },

    // 查询用户所有职务
    getqueryAllRoleloginId({ state, commit }, loginId) {
      return new Promise((resolve, reject) => {
        queryAllRoleloginId(loginId)
          .then(res => {
            // console.log(res)
            // commit('setqueryAllRoles', res.data.data);
            resolve(res);
          })
          .catch(err => {
            // console.log(res)
            reject(err);
          });
      });
    },

  //  退出登录
    getLogout({ state, commit }, loginId) {
      return new Promise((resolve, reject) => {
        logout(loginId)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
