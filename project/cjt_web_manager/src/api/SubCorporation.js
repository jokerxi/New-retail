/**
 * Created by lx442 on 2018/12/7.
 */
import axios from '../lib/request'

//获取子公司列表
export const getSubCorporation = (params) => {
    return axios.request({
        url: '/manager/company/list',
        data: params,
        method: 'post'
    })
}

//获取子公司详情
export const getSubCorporationDetail = (params) => {
    return axios.request({
        url: '/manager/company/show/'+params,
        method: 'post'
    })
}

//保存子公司
export const saveSubCorporation = (params) => {
    return axios.request({
        url: '/manager/company/save',
        data: params,
        method: 'post'
    })
}

//获取公众或生活号列表
export const showApp = (params) => {
    return axios.request({
        url: '/manager/company/showAllApp/'+params,
        method: 'post'
    })
}

//获取生活号列表
export const showWechat = (params) => {
    return axios.request({
        url: '/manager/company/showAllWechat/'+params,
        method: 'post'
    })
}

//新增公众或生活号
export const saveApp = (params) => {
    return axios.request({
        url: '/manager/company/saveApp',
        data: params,
        method: 'post'
    })
}

//子公司通道
export const listChannel = (params) => {
    return axios.request({
        url: '/manager/company/listChannel/'+params,
        method: 'post'
    })
}

//易宝进件
export const join = (params) => {
    return axios.request({
        url: '/manager/companyJoinChannel/join',
        data: params,
        method: 'post'
    })
}



