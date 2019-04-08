const menus = {
  Index: [{
    title: '数据概况',
    img: '../../static/image/jyfx.png',
    subMenu: [{
        title: '整体看板',
        path: '/Index/kanban'
      },
      {
        title: '商家数据',
        path: '/Index/shopdata'
      },
      {
        title: '用户数据',
        path: '/Index/userDataQuery'
      }
    ]
  }],
  platForm: [{
      title: '系统管理',
      img: '../../static/image/xitong@2x.png',
      subMenu: [{
          title: '菜单管理',
          path: '/platForm/menu'
        },
        {
          title: '角色管理',
          path: '/platForm/role'
        },
        {
          title: '权限管理',
          path: '/platForm/privilege'
        }
      ]
    },
    {
      title: '账号管理',
      img: '../../static/image/zhanghao@2x.png',
      subMenu: [{
          title: '运营人员管理',
          path: '/platForm/SysUser'
        },
        {
          title: '子公司管理',
          path: '/platForm/SubCorporation'
        },
        {
          title: '店铺管理',
          path: '/platForm/shopList'
        },
        {
          title: '用户管理',
          path: '/platForm/userData'
        },
      ]
    }
  ],
  business: [{
      title: '平台运营',
      img: '../../static/image/jyfx.png',
      subMenu: [{
          title: '订单记录',
          path: '/business/orderRecord'
        },
        {
          title: '连锁商家列表',
          path: '/business/chainStoreList'
        },
        {
          title: '付款二维码生成',
          path: '/business/createPayCode'
        }
      ]
    },
    {
      title: '小程序运营',
      img: '../../static/image/xiaochengxuicon@2x.png',
      subMenu: [{
          title: '促销管理',
          path: '/business/salesManagement'
        },
        {
          title: '菜价管理',
          path: '/business/vegetablePrice'
        },
        {
          title: '配置商家品类',
          path: '/business/merchantCategory'
        }
      ]
    }
  ],
  finance: [{
    title: '财务管理',
    img: '../../static/image/caiwu@2x.png',
    subMenu: [{
        title: '收放款管理',
        path: '/finance/collAndlend'
      },
      {
        title: '提现管理',
        path: '/finance/cashManagement'
      },
      {
        title: '支付通道',
        path: '/finance/payRoad'
      }
    ]
  }]
}
export default menus;
