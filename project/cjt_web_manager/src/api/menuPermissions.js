import axios from '../lib/request'
//=================== 菜单 =================

//  菜单详情
export const menuDetails = (params) =>{
    return axios.request({
        url:'/manager/menu/show/'+params,
        method:'post'
    })
}

//  所有菜单
export const allMenuList = (params) =>{
    return axios.request({
        url:'/manager/menu/showAll/'+params,
        method:'post'
    })
}

//  新增菜单
export const addMenu = (params) => {
    return axios.request({
        url:'/manager/menu/save',
        data:params,
        method:'post'
    })
}

//  编辑菜单
export const menuEdit = (params) =>{
    return axios.request({
        url:'/manager/menu/update',
        data:params,
        method:'post'
    })
}

//  删除菜单
export const deleteMenu = (params) =>{
    return axios.request({
        url:'/manager/menu/delete/'+params,
        method:'post'
    })
}

//  单层父级菜单
export const parentMenu = (params) =>{
    return axios.request({
        url:'/manager/menu/showPar',
        data:params,
        method:'post'
    })
}

//=============================权限==============================

//获取角色下拉框
export const showAll = (params) =>{
    return axios.request({
        url: '/manager/role/showAll/'+params,
        method:'post'
    })
}

//获取菜单列表
export const showMenu = (params) =>{
    return axios.request({
        url:  '/manager/role/showMenu',
        data:params,
        method:'post'
    })
}

//保存指派角色
export const saveRoleMenu = (params) =>{
    return axios.request({
        url:  '/manager/role/saveRoleMenu',
        data:params,
        method:'post'
    })
}

