//数据分析管理
import axios from '../common/exReq';

//首页店铺概况
export const webDataOverview = (params) => {
  return axios.request({
    url: '/analyse/getWebDataOverview/' + params.cjtId + '/' + params.dateType,
    method: 'POST'
  });
};

//一级品类销售占比
export const firstCategoryPercent = (params) => {
  return axios.request({
    url: '/analyse/getFirstCategoryPercent/' + params.cjtId + '/' + params.dateType+'/'+ params.orderType,
    method: 'POST'
  });
};

//商品或二级品类销售排行
export const secondOrGoodsOrder = (params) => {
  return axios.request({
    url: '/analyse/getSecondOrGoodsOrder/' + params.cjtId + '/' + params.dateType + '/' + params.queryType + '/' + params.orderType,
    method: 'POST'
  });
};

