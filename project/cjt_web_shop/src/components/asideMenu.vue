<template>
  <div class="my_aside module_bg font16 shadow" v-if="asideIf">
    <div class="left_aside" v-if="hiddenAside">
      <div class="aside_menu" v-for="(item,i) in asideMenu" :key="i">
        <div style="cursor: default">
          <div class="title_img"><img :src="item.titleImg" alt=""></div>
          <span class="font_black bold">{{item.titleText}}</span>
        </div>
        <div v-for="(items,index) in item.label" :key="index" :class="activeId == item.id+'_'+items.code?'actives':''"
             @click="selectMenu(item.id,items.code)" style="cursor: pointer">
          <p class="font_gray">{{items.text}}</p>
        </div>
        <div class="hidden_btn" @click="hiddenBtn"><i class="font14 iconfont icon-shouqiicon"></i></div>
      </div>
    </div>
    <div class="little_aside" v-else>
      <div>
        <div class="hidden_aside" v-for="icon in theHidden" :class="activeHidden == icon.id?'actives':''"><img
          :src="icon.titleImg" alt=""></div>
      </div>
      <div class="open_btn" @click="hiddenBtn"><i class="font14 iconfont icon-zhankaijiantouicon"></i></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'aside-menu',
    data() {
      return {
        asideIf: true,
        hiddenAside: true,
        asideCode: 0,
        activeId: this.$route.query.pageCode,
        activeHidden: '1',
        theHidden: [
          {
            id: 1,
            titleImg: '../static/images/icons/business_analysis.png'
          },
          {
            id: 2,
            titleImg: '../static/images/icons/precision_marketing.png'
          },
          {
            id: 3,
            titleImg: '../static/images/icons/store_management.png'
          },
          {
            id: 4,
            titleImg: '../static/images/icons/financial_management.png'
          },
        ],
        asideMenu: [
          {
            id: 1,
            titleImg: '../static/images/icons/business_analysis.png',
            titleText: '经营分析',
            label: [
              {
                id: 1,
                code: 1,
                text: '店铺概况'
              },
              {
                id: 1,
                code: 2,
                text: '深度分析'
              },
              {
                id: 1,
                code: 3,
                text: '畅销缺货分析'
              },
              {
                id: 1,
                code: 4,
                text: '滞销分析'
              },
              {
                id: 1,
                code: 5,
                text: '促销分析'
              },
              {
                id: 1,
                code: 6,
                text: '库存情况'
              }
            ]
          },
          {
            id: 2,
            titleImg: '../static/images/icons/precision_marketing.png',
            titleText: '精准营销',
            label: [
              {
                id: 2,
                code: 1,
                text: '返利活动'
              }
            ]
          },
          {
            id: 3,
            titleImg: '../static/images/icons/store_management.png',
            titleText: '店铺管理',
            label: [
              {
                id: 3,
                code: 1,
                text: '员工管理'
              },
              {
                id: 3,
                code: 2,
                text: '下载付款二维码'
              }
            ]
          },
          {
            id: 4,
            titleImg: '../static/images/icons/financial_management.png',
            titleText: '财务管理',
            label: [
              {
                id: 4,
                code: 1,
                text: '订单记录'
              },
              {
                id: 4,
                code: 2,
                text: '奖金池记录'
              },
              {
                id: 4,
                code: 3,
                text: '收银统计'
              },
            ]
          }
        ]
      }
    },
    //获取权限代码，赋予初始激活状态
    created() {
      let pageCode = this.$route.query.pageCode
      let userId=JSON.parse(localStorage.getItem('getUserInfo')).roleId
      this.activeId = this.$route.query.pageCode
      this.activeHidden = this.$route.query.pageCode.substring(0,1)
      // console.log(this.$route.query.pageCode.substring(0,1))
      if (this.$store.state.userInfo.code==3) {
        let tempArr,tempHidden
        tempArr=[]
        tempHidden=[]
        for (let i=0;i<this.asideMenu.length;i++) {
          if (this.asideMenu[i].id==4) {
            tempArr.push(this.asideMenu[i])
            tempHidden.push(this.theHidden[i])
            this.asideMenu=tempArr
            this.theHidden=tempHidden
            // this.activeId='4_1'
            this.activeHidden='4'
          }
        }
      }
      if (userId==4){
        this. asideMenu= [
          {
            id: 4,
            titleImg: '../static/images/icons/financial_management.png',
            titleText: '财务管理',
            label: [
              {
                id: 4,
                code: 1,
                text: '订单记录'
              },
              {
                id: 4,
                code: 2,
                text: '奖金池记录'
              },
              {
                id: 4,
                code: 3,
                text: '收银统计'
              },
            ]
          }
        ]
        this. theHidden= [
          {
            id: 4,
            titleImg: '../static/images/icons/financial_management.png'
          }
        ]
        this.activeHidden='4'
      }
    },
    methods: {
      //侧边栏激活样式及页面跳转路由
      selectMenu(i, index) {
        // console.log(i, index)
        this.activeId = i + '_' + index
        this.activeHidden = i
        switch (i) {
          case 1:
            switch (index) {
              case 1:
                this.$router.push('/spIndexCeo?pageCode=1_1')
                break;
              case 2:
                this.$router.push('/AllStatistics?pageCode=1_2')
                break;
              case 3:
                this.$router.push('/bestSellingProducts?pageCode=1_3')
                break;
              case 4:
                this.$router.push('/unsalableSet?pageCode=1_4')
                break;
              case 5:
                this.$router.push('/promotionAnalysis?pageCode=1_5')
                break;
              case 6:
                this.$router.push('/inventory?pageCode=1_6')
                break;
            }
            break;
          case 2:
            switch (index) {
              case 1:
                this.$router.push('/rebateActivities?pageCode=2_1')
                break;
            }
            break;
          case 3:
            switch (index) {
              case 1:
                this.$router.push('/employeeInquiries?pageCode=3_1')
                break;
              case 2:
                this.$router.push('/paymentCode?pageCode=3_2')
                break;
            }
            break;
          case 4:
            switch (index) {
              case 1:
                this.$router.push('/orderRecord?pageCode=4_1')
                break;
              case 2:
                this.$router.push('/employeeManagement?pageCode=4_2')
                break;
              case 3:
                this.$router.push('/cashierStatistics?pageCode=4_3')
                break;
            }
            break;
        }
      },
      //收起侧边栏
      hiddenBtn() {
        if (this.hiddenAside == true) {
          this.asideCode = 1
          this.$emit('changeAside', this.asideCode)
          // this.$store.commit('changeChild')
          // this.$nextTick(() => (this.$store.state.isRouterAlive = true))
          this.hiddenAside = false
          // console.log(this.$store.state.isRouterAlive)
        }
        else {
          this.asideCode = 0
          this.$emit('changeAside', this.asideCode)
          // this.$store.commit('changeChild')
          // this.$nextTick(() => (this.$store.state.isRouterAlive = true))
          this.hiddenAside = true
          // console.log(this.$store.state.isRouterAlive)
        }
        // this.hiddenAside = !this.hiddenAside
        // console.log(this.hiddenAside)
      }
    }
  }

</script>
<style scoped>
  .my_aside {
    border-right: 1px #E7EEEF solid;
    box-shadow: 4px 0 10px rgba(0, 0, 0, .04);
    height: 100%;
  }

  .my_aside:hover .open_btn, .my_aside:hover .hidden_btn {
    display: block;
  }

  .little_aside {
    padding-top: 12px;
  }

  .left_aside {
    width: 2.5rem;
  }

  .hidden_btn {
    width: .18rem;
    min-width: 11px;
    padding: 50px 0;
    border: 1px #E7EEEF solid;
    border-right: 1px #fff solid;
    color: #4471FE;
    border-radius: 4px 0 0 4px;
    transition: all 300ms linear;
    background: #fff;
    position: absolute;
    top: 30%;
    right: -1px;
    cursor: pointer;
    /*box-shadow: -4px 0 2px rgba(0, 0, 0, .01);*/
    display: none;
  }

  .open_btn {
    width: .18rem;
    min-width: 11px;
    padding: 50px 0;
    border: 1px #E7EEEF solid;
    border-left: 1px #fff solid;
    color: #4471FE;
    border-radius: 0 4px 4px 0;
    transition: all 300ms linear;
    position: absolute;
    top: 30%;
    left: 38px;
    background: #fff;
    box-shadow: 5px 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    display: none;
  }

  .hidden_btn:hover, .open_btn:hover {
    color: white;
    background: #4471FE;
    border: 1px #4471FE solid;
  }

  .hidden_btn > i, .open_btn > i {
    margin-left: 1px;
    /*display: inline-block;*/
  }

  .hidden_aside {
    width: 16px;
    /*min-width: 10px;*/
    padding: 10px;
    border-left: 2px #fff solid;
  }

  .aside_menu {
    margin-top: 0.12rem;
  }

  .aside_menu > div:nth-of-type(1) {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-left: 0.2rem;
  }

  .title_img {
    width: 0.16rem;
    /*height: 0.16rem;*/
    overflow: hidden;
    margin-right: 0.05rem;
  }

  .aside_menu span {
    padding-top: .095rem;
    padding-bottom: .095rem;
  }

  .aside_menu p {
    padding: .095rem 0 .095rem 0.41rem;
    border-left: 0.02rem #fff solid;
    transition: all 200ms linear;
  }

  .actives {
    background: #eef3fe;
    border-left: 2px #4471FE solid;
    transition: all 200ms linear;
  }

  .actives p {
    color: #151515;
    font-weight: bold;
    transition: all 200ms linear;
  }

  .main_content {
    background: #f8f8f8;
    padding: .15rem;
  }

</style>
