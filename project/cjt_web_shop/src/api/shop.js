//登入请求
import axios from '../common/exReq';

//店铺列表
export const shoplist = (shopList) => {
  return axios.request({
    url: '/shop/list',
    data: shopList,
    method: 'post'
  });
};

//连锁店铺列表（不分页）
export const shoplistByChain = (chainId) => {
  return axios.request({
    url: '/shop/listByChain',
    data:chainId,
    method: 'post'
  });
};

//更新店铺名
export const shopupdateName = (action) => {
  return axios.request({
    url: '/shop/updateName',
    data:action,
    method: 'post'
  });
};
