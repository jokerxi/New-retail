// jshint esversion: 6
import {
  StaffList,
  StaffShow,
  StaffRemove,
  StaffareaManagerList,
  StaffSaveAreaManager,
  StaffShowAreaManager,
  StaffSave,
  staffdeleteAreaManager,
  staffqueryClerks
} from '../../api/staff';

export default {
  state: {
    staffList: [],
    StaffareaManagerList: [],
  },
  mutations: {
    setStaffList(state, data) {
      state.staffList = data;
    },
    setStaffareaManagerList(state, data) {
      state.StaffareaManagerList = data;
    }
  },
  actions: {
    // 获取员工列表
    getStaffList({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        StaffList(payload)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 店铺员工详情（暂无用）
    getStaffShow({ state, commit }, { shopId, staffId }) {
      return new Promise((resolve, reject) => {
        StaffShow({ shopId, staffId })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 店铺财务、店员删除
    getStaffRemove({ state, commit },params) {
      return new Promise((resolve, reject) => {
        StaffRemove(params)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //区域经理列表
    getStaffareaManagerList({ state, commit }, managerList) {
      return new Promise((resolve, reject) => {
        StaffareaManagerList(managerList)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //区域经理保存
    getStaffSaveAreaManager({ state, commit }, savedata) {
      return new Promise((resolve, reject) => {
        StaffSaveAreaManager(savedata)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //区域经理详情
    getStaffShowAreaManager({ state, commit }, managerDetail) {
      return new Promise((resolve, reject) => {
        StaffShowAreaManager(managerDetail)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //店铺财务、店员保存
    getStaffSave({ state, commit }, savedata) {
      return new Promise((resolve, reject) => {
        StaffSave(savedata)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //删除区域经理
    getstaffdeleteAreaManager({ state, commit }, deleteAreaManager) {
      return new Promise((resolve, reject) => {
        staffdeleteAreaManager(deleteAreaManager)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //获取店铺收银员
    getstaffqueryClerks({ state, commit }, shopId) {
      return new Promise((resolve, reject) => {
        staffqueryClerks(shopId)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
};
