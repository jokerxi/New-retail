import axios from '../lib/request'

export const Login = ( params ) => {
    return axios.request({
        url:'/manager/login/login',
        data: params,
        method:'post'
    })
}