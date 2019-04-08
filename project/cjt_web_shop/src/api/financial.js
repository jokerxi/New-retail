/**
 * Created by lx442 on 2018/12/6.
 */
//财务管理
import axios from '../common/exReq';

//收银员收银汇总：收银统计详情
export const financialLoadOnDutyDetailTotal = (onDutyId) => {
  return axios.request({
    url: '/financial/loadOnDutyDetailTotal/' + onDutyId,
    method: 'POST'
  });
};

// 当班记录列表：收银统计
export const financialQueryOnDutyList = (onDutyList) => {
  return axios.request({
    url: '/financial/queryOnDutyList',
    data: onDutyList,
    method:'POST'
  });
};

// 奖金池记录
export const financialcashPoolList = (bonuspools) => {
  return axios.request({
    url: '/financial/cashPoolList',
    data: bonuspools,
    method: 'POST'
  })
}

//订单记录
export const financialorderList = (orderhistory) => {
  return axios.request({
    url: '/financial/orderList',
    data: orderhistory,
    method: 'POST'
  })
}

//当班汇总
export const financialloadOnDutyTotal = (beOnDuty) => {
  return axios.request({
    url: '/financial/loadOnDutyTotal',
    data: beOnDuty,
    method: 'POST'
  })
}

//收银记录列表:收银统计详情
export const financialqueryOnDutyDetail = (queryOnDutyDetail) => {
  return axios.request({
    url: '/financial/queryOnDutyDetail',
    data: queryOnDutyDetail,
    method: 'POST'
  })
}
