<template>
  <div class="Main">
    <Layout>
      <Header>
        <div class="head-left">
          <span class="logo"></span>
          <span class="title">叮当会员运营后台</span>
        </div>
        <div class="head-center">
          <ul>
            <li @click="changeCurrent(indexs)" v-for="(items,indexs) in headMenu" :key='indexs'>
              <router-link :to='items.path'>
                <div>
                  <span class="Icon">
                        <img :src="indexs === current ? items.selectImg : items.imgs" :alt="items.title">
                      </span>
                  <p>{{items.title}}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="head-right">
          <div class="inform">
            <Badge :count="1">
              <i class="iconfont icon-xiaoxiicon"></i>
            </Badge>
          </div>
          <div class="loginOut">
            <div class="username" @click="IsloginOut">
              <span>叮当会员</span>
              <i class="iconfont icon-tuichuxialasanjiao2"></i>
            </div>
            <div v-show="loginout" class="loginoutWrap">
              <span @click="LoginoutHandle">退出账号</span>
            </div>
          </div>
          <!--<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>-->
          <Avatar class="user_img" src="../../static/image/user_img.png" />
        </div>
      </Header>
      <Layout>
        <Sider :width='collaspe ? min : max' :style="{background: '#fff'}">
          <div class="collaspHandle" :class="{'rightcollaspHandle': collaspe}" @click="IsCollasp"><span :class="collaspe ? 'iconfont icon-zhankaijiantouicon' : 'iconfont icon-shouqiicon'"></span></div>
          <ul>
            <li class="MenuItems" v-for="(item,index) in menus" :key="index">
              <div class="subMenu" :class="{'bigIcon':collaspe}">
                <img :src="item.img" :alt="item.title">
                <span v-if='!collaspe'>{{item.title}}</span>
              </div>
              <ul v-if='!collaspe'>
                <li class="menu" v-for="(menu,index) in item.subMenu" :key="index">
                  <router-link :to='menu.path'><span>{{menu.title}}</span></router-link>
                </li>
              </ul>
            </li>
          </ul>
        </Sider>
        <Layout>
          <Content :class="{'bigContent': collaspe}">
            <div class="subContent">
              <router-view></router-view>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { showBank, showClassify, showArea, licenseType } from '../api/public'

export default {
  name: 'home',
  data() {
    return {
      loginout: false,
      max: 200,
      min: 78,
      current: 0,
      collaspe: false,
      headMenu: [{
          title: '首页',
          imgs: '../../static/image/index.png',
          selectImg: '../../static/image/index_color.png',
          path: '/Index'
        },
        {
          title: '平台管理',
          imgs: '../../static/image/shop.png',
          selectImg: '../../static/image/index_color.png',
          path: '/platForm'
        },
        {
          title: '运营管理',
          imgs: '../../static/image/yunying.png',
          selectImg: '../../static/image/yunying_color.png',
          path: '/business'
        },
        {
          title: '财务管理',
          imgs: '../../static/image/finance.png',
          selectImg: '../../static/image/finance_color.png',
          path: '/finance'
        }
      ]
    }
  },
  computed: {
    menus() {
      return this.$store.state.menus
    }
  },
  created() {
    // let param = {
    //     parentId: "",
    //     name: "",
    //     page: "",
    //     pageSize: ""
    // }
    // let param1 = {
    //     name: "",
    //     page: "",
    //     pageSize: ""
    // }
    // // 获取银行总行列表
    // this.$store.dispatch('getBank', param1)
    // // 获取商户类型
    // this.$store.dispatch('getClassify', param)
    this.getLicenseType()
    this.getBankList()
    this.getClassifyList()
    this.getShowArea()
  },
  methods: {
    IsloginOut() {
      this.loginout = !this.loginout;
    },
    LoginoutHandle() {
       localStorage.clear()
      this.$router.push('/login')
    },
    changeCurrent(index) {
      this.current = index
    },
    IsCollasp() {
      this.collaspe = !this.collaspe
    },
    //获取营业执照
    getLicenseType() {
      if (!sessionStorage.getItem('licenseType')) {
        return new Promise(() => {
          licenseType()
            .then(res => {
              if (res.data.success = true) {
                // console.log(res.data.data, 'getAreaName')
                sessionStorage.setItem('licenseType', JSON.stringify(res.data.data))
              } else {
                console.log(res, 'licenseType')
                this.$Message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$Message.error('出错啦！请检查网络后重试！')
            })
        })
      }
    },
    //    获取区域
    getShowArea() {
      if (!sessionStorage.getItem('showArea')) {
        return new Promise(() => {
          showArea({})
            .then(res => {
              if (res.data.success = true) {
                // console.log(res.data.data, 'getAreaName')
                sessionStorage.setItem('showArea', JSON.stringify(res.data.data))
              } else {
                console.log(res, 'getAreaName')
                this.$Message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$Message.error('出错啦！请检查网络后重试！')
              // this.tableLoad=false
            })
        })
      }
    },
    // 获取银行总行列表
    getBankList() {
      if (!sessionStorage.getItem('bankList')) {
        return new Promise(() => {
          showBank({})
            .then(res => {
              if (res.data.success = true) {
                // console.log(res.data.data, 'getAreaName')
                sessionStorage.setItem('bankList', JSON.stringify(res.data.data))
              } else {
                console.log(res, 'bankList')
                this.$Message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$Message.error('出错啦！请检查网络后重试！')
              // this.tableLoad=false
            })
        })
      }
    },
    // 获取商户类型
    getClassifyList() {
      if (!sessionStorage.getItem('classifyList')) {
        return new Promise(() => {
          showClassify({})
            .then(res => {
              if (res.data.success = true) {
                // console.log(res.data.data, 'getAreaName')
                sessionStorage.setItem('classifyList', JSON.stringify(res.data.data))
              } else {
                console.log(res, 'classifyList')
                this.$Message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$Message.error('出错啦！请检查网络后重试！')
            })
        })
      }
    },
  }
};

</script>
<style lang='scss'>
.Main {
  font-family: 'PingFang SC';
  height: 100%;

  .ivu-layout {
    background: #F8F8F8;
    height: 100%;
  }

  .ivu-layout-header {
    width: 100%;
    height: 0.79rem;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #E7EEEF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    box-sizing: border-box;
    line-height: normal;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    /*box-shadow: 5px 0 10px rgba(0, 0, 0, .1);*/
  }

  .head-left {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      display: inline-block;
    }

    .logo {
      width: 0.4rem;
      height: 0.4rem;
      background: url('../../static/image/logo.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 0.14rem;
    }

    .title {
      font-size: 0.22rem;
      font-weight: bold;
      color: rgba(21, 21, 21, 1);
    }
  }

  .head-center {
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;

      li {
        float: left;
        width: 1.2rem;
        height: 0.79rem;

        a {
          width: 100%;
          height: 100%;
          justify-content: center;
          display: flex;
          align-items: center;
          color: #151515;
          border-bottom: 2px solid transparent;

          &:hover {
            border-bottom: 2px solid #0061E2;
            color: #151515;
          }

          &.router-link-active {
            border-bottom: 2px solid #0061E2;
            background:linear-gradient(top,rgba(0,97,226,0) 0.06%,rgba(0,97,226,.06) 100%);
            
          }
        }

        div {
          width: 100%;
          text-align: center;
        }

        span {
          width: 0.24rem;
          height: 0.24rem;
          display: inline-block;
          margin-bottom: 0.04rem;

          img {
            width: 100%;
            height: 100%;
          }
        }

        P {
          width: 100%;
          text-align: center;
          font-size: 0.12rem;
          font-weight: bold;
        }
      }
    }
  }

  .head-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .TabSpan {
      span {
        display: inline-block;
        font-size: 0.12rem;
        font-weight: 400;
        line-height: 0.2rem;
        color: rgba(21, 21, 21, 1);
        margin-left: 0.08rem;
        padding: 0.05rem 0.1rem;
        cursor: pointer;

        &.TabShop {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(231, 238, 239, 1);
          text-align: center;
          border-radius: 0.15rem;
        }
      }
    }

    .inform {
      /*margin-left: 0.45rem;*/
      cursor: pointer;

      .icon-xiaoxiicon {
        font-size: 0.3rem;
      }

      .ivu-badge-count {
        font-size: 0.1rem;
        font-family: 'PingFang TC';
        font-weight: 500;
        /*line-height: 0.24rem;*/
        color: rgba(255, 255, 255, 1);
        transform: translateX(50%);
        top: -0.1rem;
        height: 0.2rem;
        line-height: 0.18rem;
        border-radius: 50%;
        min-width: 0.2rem;
        background: #ffb50d;
        border: 1px solid transparent;
        color: #fff;
        text-align: center;
        padding: 0 0.06rem;
        white-space: nowrap;
        transform-origin: -10% center;
        z-index: 10;
        box-shadow: 0 0 0 1px #fff;
      }
    }

    .ivu-avatar {
      width: 0.46rem;
      height: 0.46rem;
      line-height: normal;
      background: rgba(0, 0, 0, 0);
      border: 1px solid rgba(255, 255, 255, 1);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.16);
      /*border-radius: 50%;*/
      box-sizing: border-box;
      margin-left: 0.08rem;
    }

    .icon-tuichuxialasanjiao2 {
      color: #4471FE;
    }

    .loginOut {
      position: relative;
      cursor: pointer;
      margin-left: 0.41rem;
    }

    .loginOut span {
      font-size: 0.14rem;
      font-weight: 400;
    }

    .loginoutWrap {
      position: absolute;
      left: 0;
      width: 100%;
      top: 0.3rem;
      text-align: center;
      background: #4471FE;
      color: #fff;
      padding: 0.08rem 0;
      border-radius: 0.05rem;

      &:after {
        content: "";
        display: inline-table;
        width: 0.15rem;
        height: 0.15rem;
        transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        background: #4471FE;
        position: absolute;
        left: 50%;
        top: -0.07rem;
        margin-left: -0.035rem;
      }
    }
  }

  .ivu-layout-sider {
    border-right: 1px solid #E7EEEF;
    min-height: 100vh;
    position: fixed;
    left: 0;
    top: 0.79rem;
    box-sizing: border-box;
    padding: 0.07rem 0;
    z-index: 2;
    box-shadow: 5px 0 10px rgba(0, 0, 0, .1);

    &:hover .collaspHandle {
      display: inline-block;
    }

    .collaspHandle {
      width: 0.15rem;
      height: 1.5rem;
      line-height: 1.5rem;
      color:#ffffff;
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -0.75rem;
      background: #4471FE;
      border-radius: 0.05rem 0 0 0.05rem;
      display: none;
    }

    .rightcollaspHandle {
      right: -0.15rem;
      border-radius: 0 0.05rem 0.05rem 0;
    }

    img {
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      margin-right: 0.1rem;
      margin-left: 0.2rem;
    }

    .bigIcon {
      height: 0.6rem !important;

      img {
        width: 0.35rem;
        height: 0.35rem;
        margin-left: 0.4rem;
      }
    }

    ul {
      list-style: none;

      li {
        height: auto;
        line-height: 0.4rem;
        width: 100%;

        .subMenu {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 0.4rem;
          font-size: 0.16rem;
          font-family: 'Source Han Sans CN';
          font-weight: bold;
          color: #111;
        }

        ul {
          li {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 0.4rem;

            a {
              font-size: 0.16rem;
              font-family: 'Source Han Sans CN';
              font-weight: 500;
              color: #999;
              display: block;
              padding-left: 0.46rem;
              box-sizing: border-box;
              width: 100%;

              &:hover {
                color: #111;
                background: #EEF3FE;
              }

              &.router-link-active {
                color: #111;
                background: #EEF3FE;
                opacity: 0.8;
                border-left: 2px solid #4471FE;
              }
            }
          }
        }
      }
    }
  }

  .ivu-layout-content {
    margin-left: 200px;
    padding-top: 0.79rem;
    background: transparent;
    height: 100%;

    .subContent {
      padding: .24rem .2rem;
      box-sizing: border-box;
      width: 100%;
      min-height: 100%;
    }
  }

  .bigContent {
    margin-left: 78px;
  }

  .user_img {
    width: 0.46rem;
    /*height: 0.46rem;*/
    min-width: 33px;
    /*min-height: 33px;*/
  }

  .ivu-avatar {
    border-radius: 0;
  }

  /*.user_img img{*/
  /*width: 100%;*/
  /*}*/
}

</style>
