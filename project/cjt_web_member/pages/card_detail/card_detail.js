// pages/card_detail/card_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName: '', //商品名称
    classesCard: '', //会员类型
    rebate: '', // 返利金
    allMoney: '', // 一共的钱
    keep_accounts: [{
        offline_consumption: '线下消费',
        time_consumption: '2018-08-12 19:15',
        money: '-4.57',
      },
      {
        offline_consumption: '消费返利',
        time_consumption: '2018-08-12 19:15',
        money: '+0.12',
      },
      {
        offline_consumption: '消费返利(30天内有效期)',
        time_consumption: '2018-08-12 19:15',
        money: '+0.12',
      },
      {
        offline_consumption: '周末返利(8.13-8.17有效)',
        time_consumption: '2018-08-12 19:15',
        money: '+0.12',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var str = options.detail;
    var detail = str.split('|');
    this.setData({
      shopName: detail[0],
      classesCard: detail[1],
      rebate: detail[2],
      allMoney: detail[3]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})