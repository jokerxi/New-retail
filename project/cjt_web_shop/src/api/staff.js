// jshint esversion: 6
import axios from '../common/exReq';

// 员工列表
export const StaffList = (params) => {
  return axios.request({
    url: '/staff/list',
    data: params,
    method: 'POST'
  });
};

// 店铺员工详
export const StaffShow = ({ shopId, staffId }) => {
  return axios.request({
    url: '/staff/show/' + shopId + '/' + staffId,
    method: 'POST'
  });
};

// 店铺财务、店员删除
export const StaffRemove = (params) => {
  return axios.request({
    url: '/staff/remove/' +params.shopId + '/' + params.staffId+'/'+params.roleId,
    method: 'POST'
  });
};

//区域经理列表
export const StaffareaManagerList = (req) => {
  return axios.request({
    url: '/staff/areaManagerList',
    data: req,
    method: 'POST'
  });
};

//区域经理保存
export const StaffSaveAreaManager = (savedata) => {
  return axios.request({
    url: '/staff/saveAreaManager',
    data: savedata,
    method: 'POST'
  });
};

//区域经理详情
export const StaffShowAreaManager = (managerDetail) => {
  return axios.request({
    url: '/staff/showAreaManager/' + managerDetail.chainId + '/' + managerDetail.staffId,
    method: 'POST'
  });
};

//店铺财务、店员保存
export const StaffSave = (savedata) => {
  return axios.request({
    url: '/staff/save',
    data: savedata,
    method: 'POST'
  })
};

// 删除区域经理
export const staffdeleteAreaManager = (deleteAreaManager) => {
  return axios.request({
    url: '/staff/deleteAreaManager/' + deleteAreaManager.chainId + '/' + deleteAreaManager.staffId,
    method: 'POST'
  })
}

//获取店铺收银员
export const staffqueryClerks =(shopId) => {
  return axios.request({
    url: '/staff/queryClerks/' + shopId,
    method: 'POST'
  })
}
