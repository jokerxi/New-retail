// pages/price_list/price_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sideHeight: '',
    contentHeight: '',
    selectHeight: '',
    selectTab: 0,
    subscription: {
      status: 0,
      src: '../../images/icons/subscription_d.png'
    },
    sidebar: [{
        // status: 1,
        src: '../../images/side0_d.png',
        checksrc: '../../images/side0_s.png'
      },
      {
        // status: 2,
        src: '../../images/side1_d.png',
        checksrc: '../../images/side1_s.png'
      },
      {
        // status: 3,
        src: '../../images/side2_d.png',
        checksrc: '../../images/side2_s.png'
      },
      {
        // status: 4,
        src: '../../images/side3_d.png',
        checksrc: '../../images/side3_s.png'
      }
    ],
    currentShop: '阿百川店',
    selectShow: false,
    selectItem: [{
        id: 0,
        text: '喜洋洋店'
      },
      {
        id: 1,
        text: '喜洋洋店'
      },
      {
        id: 2,
        text: '喜洋洋店'
      },
      {
        id: 3,
        text: '喜洋洋店'
      },
      {
        id: 4,
        text: '喜洋洋店'
      },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 1,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 2,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 3,
      //   text: '喜洋洋店'
      // },
      // {
      //   id: 4,
      //   text: '喜洋洋店'
      // }
    ],
    priceItem: [{
        id: 1,
        src: '../../images/list_item0.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 2,
        src: '../../images/list_item1.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: ''
      },
      {
        id: 2,
        src: '../../images/list_item2.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 3,
        src: '../../images/list_item3.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 4,
        src: '../../images/list_item4.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 5,
        src: '../../images/list_item5.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 5,
        src: '../../images/list_item5.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 5,
        src: '../../images/list_item5.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 5,
        src: '../../images/list_item5.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 5,
        src: '../../images/list_item5.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
      {
        id: 5,
        src: '../../images/list_item5.png',
        title: '桃子',
        price: '5.4元/斤',
        discount: '20%'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let times = 100
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res.windowHeight);
        that.setData({
          contentHeight: res.windowHeight * 2 - 82 + 'rpx',
          sideHeight: res.windowHeight * 2 + 'rpx',
          selectHeight: res.windowHeight * 2 - 160 + 'rpx',
        })
        // 请求更新时间
        wx.setNavigationBarTitle({
          title: '今日菜价(' + times + '分钟前更新)'
        })
      },
    })
  },
  // 下拉刷新
  refreshList: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: '',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function(res) {
        that.setData({

        });
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  // 上拉加载
  loadList: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 500)
  },
  // 侧边栏切换
  selectSide: function(e) {
    // console.log(e)
    let selectTab = e.currentTarget.dataset.index;
    this.setData({
      selectTab: selectTab
    })
  },
  // 订阅
  setSubscription: function() {
    let status = this.data.subscription.status;
    if (status == 0) {
      this.setData({
        subscription: {
          status: 1,
          src: '../../images/icons/subscription_s.png'
        }
      })
    } else {
      this.setData({
        subscription: {
          status: 0,
          src: '../../images/icons/subscription_d.png'
        }
      })
    }
  },
  // 大开下拉框
  changeSelect: function() {
    let show = this.data.selectShow
    if (show == false) {
      this.setData({
        selectShow: true
      })
    } else {
      this.setData({
        selectShow: false
      })
    }
  },
  // 选择子项
  mySelect: function(e) {
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.selectItem.length; i++) {
      if (i == index) {
        this.setData({
          currentShop: this.data.selectItem[i].text,
          selectShow: false
        })
      }
    }
  }
})