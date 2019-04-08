import axios from '../lib/request'

// 获取验证码
export const GetValidate = (params) =>{
    return axios.request({
        url:'/login/validCode/'+params,
        method:'post'
    })
}

// 手机验证码登录
export const PhoneLogin =(params) => {
    return axios.request({
        url:'/login/login',
        data:params,
        method:'post'
    })
}

// 登录信息获取
export const LoginInfo = (params) => {
    return axios.request({
        url:'/main/userInfo',
        data:params,
        method:'post'
    })
}

// 获取首页信息
export const getHomeInfo = (params) => {
    return axios.request({
        url:'/main/info/'+params,
        method:'post'
    })
}

// 设置信息查询
export const GetsetInfo = (params) => {
    return axios.request({
        url:'/companyMember/showMember',
        data:params,
        method:'post'
    })
}