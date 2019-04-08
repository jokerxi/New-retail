// jshint esversion: 6
import {
  shoplist,
  shoplistByChain,
  shopupdateName
} from '../../api/shop';

export default {
  // 定义初始值
  state: {},
  // 改变state值
  mutations: {},
  // 异步
  actions: {
    //店铺列表
    getshoplist({state, commit}, shoplList) {
      return new Promise((resolve, reject) => {
        shoplist(shoplList)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //连锁店铺列表（不分页）
    getshoplistByChain({state, commit}, chainId) {
      return new Promise((resolve, reject) => {
        shoplistByChain(chainId)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //更新店铺名
    getshopupdateName({state, commit}, action) {
      return new Promise((resolve, reject) => {
        shopupdateName(action)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  }
};
