<template>
  <div>
    <!--店铺管理页面组件-->
    <!--<index-nav></index-nav>-->
    <div class="backImg">
      <div class="shopTitle"><span>店铺管理</span></div>
      <div class="searchBox">
        <div class="Wrap">
          <div class="InputWrap">
            <span class="search"><i class="iconfont icon-sousuoicon"></i></span>
            <input placeholder="请输入店铺名查询" v-model="searchShop"/>
          </div>
          <div class="BtnSearch" @click="toSearch(theTable.pages.counts)">
            <span>查询</span>
          </div>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">店铺列表<span class="staff_text font12 font_gray">共查询到<span
          class="font_black">{{theTable.pages.total}}</span>条/<span
          class="font_black">{{theTable.pages.totalPage}}</span>页</span></p>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tHead="theTable.tHead" :tBody="theTable.tBody"
                        v-on:paginationAxios="myPagination"></synthesize-table>
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "shop-list",
    data() {
      return {
        searchShop: '',
        inputMsg: '',
        staffNum: '',
        theTable: {
          pages: {
            counts: 10,
            total: 0,
            totalPage: 0,
            // 当前在第几页
            pageState: 1,
            goPage: '',
            initPage: 0,
          },
          //表格数据
          tHead: [
            {text: '序号'},
            {text: '店铺名称'},
            {text: '店长'},
            {text: '电话'},
            {text: '销售金额'},
            {text: '销售笔数'},
            {text: '利润'}
          ],
          tBody: [
            // {
            //   id: 1,
            //   col01: '猪美美的店',
            //   col02: '大美美',
            //   col03: '449987777',
            //   col04: '1234.56',
            //   col05: '123',
            //   col06: '123.45',
            //   btn: [
            //     {
            //       text: '查看详情',
            //       code: 0
            //     }
            //   ]
            // },
            //   ]
            // },
          ]
        }
      }
    },
    created() {
      this.staffNum = this.theTable.tBody.length
      this.theShopList(1, 10, '')
    },
    methods: {
      ...mapActions([
        'getshoplist'
      ]),
      //  获取列表
      theShopList(page, limit, queryWord) {
        this.theTable.tBody = []
        let shopList = {
          chainId: JSON.parse(localStorage.getItem('getUserInfo')).chainId,
          roleId: JSON.parse(localStorage.getItem('getUserInfo')).roleId,
          loginId: JSON.parse(localStorage.getItem('getUserInfo')).loginId,
          page: page,
          limit: limit,
          queryWord: queryWord
        }
        this.getshoplist(shopList)
          .then(res => {
            // console.log(res,'resssdsds')
            if (res.data.success == true) {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => {
                  if (!item.shopName) {
                    item.shopName = '暂无数据'
                  }
                  if (!item.shopManager) {
                    item.shopManager = '暂无数据'
                  }
                  if (!item.telePhone) {
                    item.telePhone = '暂无数据'
                  }
                  if (!item.sellMoney) {
                    item.sellMoney = '暂无数据'
                  }
                  if (!item.sellCount) {
                    item.sellCount = '暂无数据'
                  }
                  if (!item.profit) {
                    item.profit = '暂无数据'
                  }
                  this.theTable.tBody.push({
                    id: item.id,
                    col01: item.shopName,
                    col02: item.shopManager,
                    col03: item.telePhone,
                    col04: item.sellMoney,
                    col05: item.sellCount,
                    col06: item.profit,
                    btn: [
                      {
                        text: '查看详情',
                        code: 0
                      }
                    ]
                  })
                })
                this.theTable.pages.total = res.data.total
                this.theTable.pages.pageState = page
                this.theTable.pages.counts = limit
                this.theTable.pages.initPage = Math.ceil((res.data.total / limit) / 2)
                this.theTable.pages.totalPage = Math.ceil(res.data.total / limit)
              } else {
                this.$message({
                  type: 'info',
                  message: '暂无数据哦',
                  center: true,
                  showClose: true
                })
              }
            } else {
              console.log(res)
              this.$message({
                type: 'warning',
                message: res.data.msg,
                center: true,
                showClose: true
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '出错啦！请检查网络后重试！',
              center: true,
              showClose: true
            })
          })
      },
      //  模糊搜索
      toSearch(limit) {
        this.theShopList(1, limit, this.searchShop)
      },
      //  分页跳转
      myPagination(page, limit) {
        this.theShopList(page, limit, this.searchShop)
      }
    }
  }
</script>

<style scoped>
  .searchBox {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 0.71rem;
  }

  .searchBox .Wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 0.4rem;
  }

  .Wrap .InputWrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 3.8rem;
    height: 0.4rem;
    background-color: #fff;
    border-radius: 0.05rem;
    box-sizing: border-box;
    padding-left: 0.37rem;
    position: relative;
    font-size: 0.14rem;
    color: #767676;
  }

  .InputWrap input {
    height: 0.35rem;
    width: 100%;
    display: inline-block;
    line-height: 0.35rem;
    border: none;
    outline: none;
    font-size: 0.14rem;
    border-radius: 0.05rem;
  }

  .InputWrap .iconfont {
    font-size: 0.14rem;
    padding: 0 0.05rem;
    padding-top: 0.02rem;
    box-sizing: border-box;
  }

  .Wrap .BtnSearch {
    margin-left: 0.15rem;
  }

  .BtnSearch span {
    display: inline-block;
    width: 0.9rem;
    height: 0.4rem;
    background: rgba(68, 113, 254, 1);
    border-radius: 0.05rem;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.2rem;
    font-family: 'Source Han Sans CN';
    font-weight: 500;
    cursor: pointer;
  }

  .backImg {
    /*border:1px solid blue;*/
    background-image: url("./../../static/images/backimg.png");
    background-size: cover;
  }

  .shopTitle {
    /*border:1px solid red;*/
    padding-top: 0.3rem;
    padding-bottom: 0.16rem;
    padding-left: 1.47rem;
    text-align: left;
    color: white;
  }

  .searchBox > div:first-child {
    /*border:1px solid red;*/
    margin-left: 1.47rem;
  }

  .searchBtn {
    margin-left: 0.1rem;
  }

  .listCount {
    border-bottom: 1px solid rgba(235, 235, 235, 1);
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 84.5%;
    margin: 0 auto;
    padding-top: 0.27rem;
    color: #333333;
    background-color: white;
  }

  .listCount > div:first-child {
    padding-left: 0.2rem;
  }

  .listCount > div:nth-child(2) {
    padding-left: 0.2rem;
  }

  .listInfo {
    /*border: 1px solid rgba(238, 238, 238, 1);*/
    /*border: 1px solid rgba(238, 0, 0, 1);*/
    background-color: white;
    width: 83.5%;
    min-height: 4.4rem;
    margin: 0 auto;
    padding-left: 0.2rem;
  }

  .searchPage .btn-next {
    /*border: 1px solid red;*/
  }

  .mypagination {
    /*border:1px solid blue;*/
    background-color: white;
    width: 83.5%;
    margin: 0 auto;
    padding-top: 0.4rem;
    padding-bottom: 0.5rem;
    padding-right: 0.2rem;
    text-align: right;
  }

  /*表格组件包框*/
  .table_box {
    max-width: 84.688%;
    margin: -0.5rem 1.47rem 0 1.47rem;
    padding: 0 0.2rem;
  }

  .table_box > div:nth-of-type(1) {
    padding-top: 0.2rem;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .staff_text {
    margin-left: 0.18rem;
  }


</style>
