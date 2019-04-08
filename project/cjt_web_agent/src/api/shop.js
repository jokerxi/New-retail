import axios from '../lib/request'

// 店铺列表
export const getShopList = (params) => {
    return axios.request({
        url: '/shopManager/list',
        data: params,
        method: 'post'
    })
}

// 店铺详情
export const shopDetails = (params) => {
   return axios.request({
       url:'/shopManager/details/'+params,
       method:'post'
   })
}

// 店铺收入
export const shopIncome = (params) => {
    return axios.request({
        url:'/shopManager/shopIncome/'+params,
        method:'post'
    })
}

// 店铺提现记录
export const CashRecord = (params) => {
    return axios.request({
        url:'/shopManager/withdrawRecordsAPP',
        data:params,
        method:'post'
    })
}

// 店铺预付金还款记录
export const PreBackRecord = (params) => {
    return axios.request({
        url:'/shopManager/prepaidRepaymentList',
        data:params,
        method:'post'
    })
}

// 店铺员工列表
export const shopStsff = (params) => {
    return axios.request({
        url:'/shopManager/staffList',
        data:params,
        method:'post'
    })
}

// 店铺余额
export const shopRemainent = (params) => {
    return axios.request({
        url:'/shopManager/loadMyBalance/'+params,
        method:'post'
    })
}

// 店铺预付金周期金额
export const prepaidInfo = (params) => {
    return axios.request({
        url:'/shopManager/prepaidInfo/'+params,
        method:'post'
    })
}