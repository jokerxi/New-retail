//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  goB: function(e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  userInfoHandler() {
    var that = this
    wx.login({
      success(res) {
        // console.log(res, '已拿到code')
        if (res.errMsg == "login:ok" && !!res.code) {
          wx.getUserInfo({
            success(res) {
              that.goB()
            }
          })
        }
      }
    })
  },
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    wx.getUserInfo({

    })
  }
})