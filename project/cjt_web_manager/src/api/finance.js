import axios from '../lib/request'

// ========================== 收放款 ======================

// 放款店铺列表
export const ExportIncomeList = (params) => {
    return axios.request({
        url:'/manager/financeManager/list',
        data:params,
        method:'post'
    })
}

// 店铺滞留金
export const loadRetentionMoney = (params) => {
    return axios.request({
        url:'/manager/financeManager/loadRetentionMoney/'+params,
        method:'post'
    })
}

// 获取建议每日额度
export const loadQuotaDailyAdvise = (params) => {
    return axios.request({
        url:'/manager/financeManager/loadQuotaDailyAdvise/'+params,
        method:'post'
    })
}

// 加载放款汇总
export const allInfo = (params) => {
    return axios.request({
        url:'/manager/financeManager/allInfo',
        data:params,
        method:'post'
    })
}

// 调整默认放款额度
export const adjustLoanQuota = (params) => {
    return axios.request({
        url:'/manager/financeManager/adjustLoanQuota',
        data:params,
        method:'post'
    })
}

// 放款记录列表
export const loanDetailList = (params) => {
    return axios.request({
        url:'/manager/financeManager/loanDetailList',
        data:params,
        method:'post'
    })
}

// 删除放款记录
export const deleteLoanDetail = (params) => {
    return axios.request({
        url:'/manager/financeManager/deleteLoanDetail/'+params.shopId+'/'+params.id,
        method:'post'
    })
}

// 预警店铺列表
export const riskShopList = (params) => {
    return axios.request({
        url:'/manager/financeManager/riskShopList',
        data:params,
        method:'post'
    })
}

// 保存或编辑放款记录
export const saveLoan = (params) => {
    return axios.request({
        url:'/manager/financeManager/saveLoan',
        data:params,
        method:'post'
    })
}

// 获取分类统计数量
export const classifyTotal = (parms) => {
    return axios.request({
        url:'/manager/financeManager/classifyTotal',
        method:'post'
    })
}

// 导出放款记录
export const exportLoanDetails = (params) => {
    return axios.request({
        url:'/manager/financeManager/exportLoanDetails',
        data:params,
        method:'post'
    })
}

// 导出放款店铺
export const exportLoanShop = (params) => {
    return axios.request({
        url:'/manager/financeManager/exportLoanShop',
        data:params,
        method:'post'
    })
}

// 导出放款账单
export const exportLoanOrders = (params) => {
    return axios.request({
        url:'/manager/financeManager/exportLoanOrders',
        data:params,
        method:'post'
    })
}
// ================================ 提现管理 ==================================

// 店铺提现申请列表
export const CashList = (params) => {
    return axios.request({
        url:'/manager/cash/list',
        data:params,
        method:'post'
    })
}

// 店铺账户信息
export const accountInfo = (params) => {
    return axios.request({
        url:'/manager/cash/accountInfo/'+params,
        method:'post'
    })
}

// 同意打款
export const CashAgree = (params) => {
    return axios.request({
        url:'/manager/cash/agree',
        data:params,
        method:'post'
    })
}

// 提现驳回
export const CashReject = (params) => {
    console.log(params.shopId,params.withdrawId,777)
    return axios.request({
        url:'/manager/cash/reject/'+params.shopId+'/'+Number(params.withdrawId),
        method:'post'
    })
}

// 打款记录列表
export const withdrawDetailRecords = (params) => {
    return axios.request({
        url:'/manager/cash/withdrawDetailRecords',
        data:params,
        method:'post'
    })
}

// 导出提现记录
export const exportWithdraws = (params) => {
    return axios.request({
        url:'/manager/cash/exportWithdraws',
        data:params,
        method:'post'
    })
}
// ================================= 支付通道 ===============================

// 通道列表
export const PayChannelList = (params) => {
    return axios.request({
        url:'/manager/payChannel/show',
        data:params,
        method:'post'
    })
}

// 编辑通道
export const payChannelSave = (params) => {
    return axios.request({
        url:'/manager/payChannel/save',
        data:params,
        method:'post'
    })
}