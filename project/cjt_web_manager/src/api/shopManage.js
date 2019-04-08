import axios from '../lib/request'

// ====================== 店铺管理 ===================

// 店铺列表
export const shopList = (params) => {
    return axios.request({
        url:'/manager/shop/list',
        data: params,
        method:'post'
    })
}

// 店铺详情
export const shopDetail = (params) => {
  return axios.request({
      url:'/manager/shop/show/'+params,
      method:'post'
  })
}

// 编辑店铺
export const shopEdit = (params) => {
    return axios.request({
        url:'/manager/shop/edit',
        data:params,
        method:'post'
    })
}

// 店铺通道
export const listChannel = (params) => {
    return axios.request({
        url:'/manager/shop/listChannel/'+params,
        method:'post'
    })
}

// 超市进件易宝回调结果
export const shopJoinSuccess = (params) => {
    return axios.request({
        url:'/manager/shopJoinChannel/shopJoinSuccess',
        data:params,
        method:'post'
    })
}

// 超市进件易宝
export const shopJoin = (params) => {
    return axios.request({
        url:'/manager/shopJoinChannel/join',
        data:params,
        method:'post'
    })
}

// 加盟信息审核
export const verify = (params) => {
    return axios.request({
        url:'/manager/shop/verify',
        data:params,
        method:'post'
    })
}

// 获取连锁下拉
export const chainList = () => {
    return axios.request({
        url:'/manager/shop/chainList',
        method:'post'
    })
}
// ===================== 运营人员 =====================

// 运营人员列表
export const SysUserList = (params) => {
    return axios.request({
        url:'/manager/sysUser/list',
        data:params,
        method:'post'
    })
}

// 保存运营人员列表
export const SavesysUser = (params) => {
    return axios.request({
        url:'/manager/sysUser/save',
        data:params,
        method:'post'
    })
}

// 编辑运营人员
export const editSysUser = (params) => {
    return axios.request({
        url:'/manager/sysUser/update',
        data:params,
        method:'post'
    })
}

// 运营人员详情
export const SysuserDetail = (params) => {
    return axios.request({
        url:'/manager/sysUser/show/'+params,
        method:'post'
    })
}

// 删除运营人员
export const DelSysuser = (params) => {
    return axios.request({
        url:'/manager/sysUser/delete/'+params,
        method:'post'
    })
}

// ========================== 角色管理 ======================

// 角色列表
export const showAllRole = (params) => {
    return axios.request({
        url:'/manager/role/showAll/'+params,
        method:'post'
    })
}

//编辑角色
export const EditRole = (params) => {
    return axios.request({
        url:'/manager/role/update',
        data:params,
        method:'post'
    })
}

//新增角色
export const AddRole = (params) => {
    return axios.request({
        url:'/manager/role/save',
        data:params,
        method:'post'
    })
}