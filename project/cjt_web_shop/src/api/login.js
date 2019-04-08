//登入请求
import axios from '../common/exReq';

//获取手机验证码
export const userlogingetCode = (telephone) => {
  return axios.request({
    url: 'login/getCode/' + telephone,
    method: 'post'
  });
};

// 用户登录
export const uerloginLogin = (telephone_code) => {
  return axios.request({
    url: 'login/login',
    data: telephone_code,
    method: 'POST'
  });
};

// 用户选择职务
export const indexcheckRole = (action) => {
  return axios.request({
    url: '/index/checkRole',
    data: action,
    method: 'POST'
  })
}

// 顶部菜单
export const loginshowTop = (roleId_menuType) => {
  return axios.request({
    url: '/login/showTop/' + roleId + '/' + menuType,
    method: 'POST'
  })
}

// 查询用户所有职务
export const queryAllRoleloginId = (loginId) => {
  return axios.request({
    url: '/staff/queryAllRoles/' + loginId,
    method: 'post'
  })
}

//退出登录
export const logout = (loginId) => {
  return axios.request({
    url: '/login/logout/' + loginId,
    method: 'post'
  })
}
