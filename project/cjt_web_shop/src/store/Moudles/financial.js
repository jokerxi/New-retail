/**
 * Created by lx442 on 2018/12/6.
 */
//财务管理
import{
  financialLoadOnDutyDetailTotal,
  financialQueryOnDutyList,
  financialcashPoolList,
  financialorderList,
  financialloadOnDutyTotal,
  financialqueryOnDutyDetail
} from '../../api/financial.js';
//
export default {
  // 定义初始值
  state: {
    loadOnDutyDetailTotal: [], //收银员收银汇总：收银统计详情
    queryOnDutyList: [], //当班记录列表：收银统计
    financialcashPoolList: [] //订单记录
  },
  // 改变state值
  mutations: {
    setfinancialLoadOnDutyDetailTotal({ state, commit }, data) {
      state.loadOnDutyDetailTotal = data
    },
    setfinancialqueryOnDutyList(state, data) {
      state.loadOnDutyDetailTotal = data
    },
    setfinancialcashPoolList(state, data)  {
      state.financialcashPoolList = data
    }
  },
  // 异步
  actions: {
    // 收银员收银汇总：收银统计详情
    getfinancialLoadOnDutyDetailTotal({ state, commit }, onDutyId) {
      return new Promise((resolve, reject) => {
        financialLoadOnDutyDetailTotal(onDutyId)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 当班记录列表：收银统计
    getfinancialqueryOnDutyList({ state, commit }, onDutyList) {
      return new Promise((resolve, reject) => {
        financialQueryOnDutyList(onDutyList)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 奖金池记录
    getfinancialcashPoolList({ state, commit }, bonuspools) {
      return new Promise((resolve, reject) => {
        financialcashPoolList(bonuspools)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 订单记录
    getfinancialorderList({ state, commit }, orderhistory) {
      return new Promise((resolve, reject) => {
        financialorderList(orderhistory)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //当班汇总
    getfinancialloadOnDutyTotal({ state, commit }, beOnDuty) {
      return new Promise((resolve, reject) => {
        financialloadOnDutyTotal(beOnDuty)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //收银记录列表:收银统计详情
    getfinancialqueryOnDutyDetail({ state, commit }, queryOnDutyDetail) {
      return new Promise((resolve, reject) => {
        financialqueryOnDutyDetail(queryOnDutyDetail)
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
