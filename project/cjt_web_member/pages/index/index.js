// pages/card_detail/card_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: true,
    index: '0',
    page:1,
    items: [{
      id: 0,
      shopName: '我的家超市(尖山店)',
      classesCard: '黄金会员卡',
      rebate: '4.23',
    }, {
      id: 1,
      shopName: '我的家超市(尖山店)',
      classesCard: '黄金会员卡',
      rebate: '5.23',
    }, {
      id: 2,
      shopName: '我的家超市(尖山店)',
      classesCard: '黄金会员卡',
      rebate: '6.23',
    }],
    merchandiseName: '乐事薯片70g',
    discount: '5',
    price: '3.5',
    original_price: '5',
    shopName: '我的家超市(尖山店)',
    publish_time: '6',
    allMondy: '14.23.'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  onReachBottom: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 500)
  },
  onGetTo: function(e) {
    var classesCard = e.currentTarget.dataset.classescard
    var rebate = e.currentTarget.dataset.rebate
    var shopName = e.currentTarget.dataset.shopname
    var allMondy = this.data.allMondy
    wx.navigateTo({
      url: '../card_detail/card_detail?detail=' + shopName + '|' + classesCard + '|' + rebate + '|' + allMondy,
    })
  }
})