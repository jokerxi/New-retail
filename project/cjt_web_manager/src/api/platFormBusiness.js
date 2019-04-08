import axios from '../lib/request'

// =============================== 连锁管理 ===============================

// 连锁列表
export const chainShopList = (params) => {
    return axios.request({
        url:'/manager/chainShop/list',
        data:params,
        method:'post'
    })
}

// 保存连锁
export const saveChainShop = (params) => {
    return axios.request({
        url:'/manager/chainShop/save',
        data:params,
        method:'post'
    })
}

// 连锁详情
export const chainDetail = (params) => {
    return axios.request({
        url:'/manager/chainShop/show/'+params,
        method:'post'
    })
}

// ============================= 订单记录 ==============================

//  订单列表
export const OrderList = (params) => {
    return axios.request({
        url:'/manager/order/list',
        data:params,
        method:'post'
    })
}

//  导出订单
export const exportOrderData = (params) => {
    return axios.request({
        url:'/manager/order/export',
        data:params,
        method:'post'
    })
}
