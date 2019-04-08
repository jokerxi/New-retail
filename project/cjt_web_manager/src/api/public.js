import axios from '../lib/request'

// 地区列表
export const showArea = (params) => {
  return axios.request({
    url: '/manager/base/showArea',
    data: params,
    method: 'post'
  })
}

// 商户分类列表
export const showClassify = (params) => {
  return axios.request({
    url: '/manager/base/showClassify',
    data: params,
    method: 'post'
  })
}

// 银行总行列表
export const showBank = (params) => {
  return axios.request({
    url: '/manager/base/showBank',
    data: params,
    method: 'post'
  })
}

// 银行名称
export const bankName = (params) => {
  return axios.request({
    url: '/manager/base/bankName/' + params,
    method: 'post'
  })
}

// 地区名称
export const areaName = (params) => {
  return axios.request({
    url: '/manager/base/areaName/' + params,
    method: 'post'
  })
}

// 商户分类名称
export const ClassifyName = (params) => {
  return axios.request({
    url: '/manager/base/classifyName/' + params,
    method: 'post'
  })
}

//店铺类型列表
export const shopTypes = (params) => {
  return axios.request({
    url: '/manager/shop/shopType',
    data: params,
    method: 'post'
  })
}

// 连锁列表
export const chainShop = (params) => {
  return axios.request({
    url: '/manager/chainShop/list',
    data: params,
    method: 'post'
  })
}

// 平台信息获取
export const platformRole = (params) => {
  return axios.request({
    url: '/manager/role/showAll/' + params,
    method: 'post'
  })
}

//营业执照类型
export const licenseType = () => {
  return axios.request({
    url: '/manager/shop/licenseType',
    method: 'post'
  })
}

// 服务号列表
export const showAllWechat = (params) => {
  return axios.request({
    url: '/manager/company/showAllWechat/' + params,
    method: 'post'
  })
}


//易宝支行
export const yopBank = (params) => {
  return axios.request({
    url: '/manager/companyJoinChannel/yopBank',
    data: params,
    method: 'post'
  })
}

//生成二维码编号集合
export const qrCode = (params) => {
  return axios.request({
    url: '/manager/qrCode/create/' + params.Id + '/' + params.amount,
    method: 'POST'
  })
}

// 编辑店铺其他店铺下拉列表
export const listByChain = (params) => {
    return axios.request({
        url:'/manager/shop/listByChain',
        data:params,
        method:'post'
    })
}
