<template>
  <div id="salesManagement">
    <div class="salesManagement-top">
      <p>{{chainstore}}</p>
      <Button @click="TabShopList()" type="primary">切换店铺</Button>
      <div class="tabs">
        <p v-for="(item,index) in tabs" @click="changeTab(item.id,index)" :class="{'active':index == active}">{{item.state}}</p>
      </div>
      <div class="commoditycontent">
        <div class="commoditycontent-left">
          <img :src="checked? urlimg1: urlimg" class='input-checkbox' v-model='checked' @click='checkedAll()'/>
          <span>全选</span>
          <p>商家品类</p>
          <Select ref="store" clearable size="small" placeholder="全部" v-model="merchantcategory" style="width:1.34rem" @on-change="CategoryNo">
            <Option v-for="(item,index) in categoryList" :value="item.custCategoryNo" :key="index">{{ item.categoryName }}</Option>
          </Select>
          <Button type="primary">确定</Button>
          <span class="shopnum">共<span> {{pagations.total}} </span>个商品</span>
        </div>
        <div class="upperlower" :class="shopname.goodsStatus == undefined? 'displaynone':''">
          <Button :class="shopname.goodsStatus == 1? 'displaynone':''" @click="allSeve(1)">上架</Button>
          <Button :class="shopname.goodsStatus == 2? 'displaynone':''" @click="allSeve(2)">下架</Button>
        </div>
      </div>
    </div>
    <!-- 复选框 -->
    <div>
      <div class="commodityshop" v-for="(item,index) in commoditiesLists" :key="index">
        <!--给每个复选按钮绑定同一个v-mode数组变量，数组里面有相应的value就被选中-->
        <div class="inputshop">
          <input @click="checkboxOnclick(item,index,1)" type="checkbox" name='checkboxinput' :class="item.check?'oninput-checkbox':'input-checkbox'" />
        </div>
        <!-- 内容 -->
        <div class="commodity">
          <div class="commoditytext">
            <div class="commoditytextleft">
              <p>{{item.itemName}}</p>
              <p>原价:￥{{item.originPirce}}</p>
              <p>商家活动时间: {{item.beginTime}}~{{item.endTime}}</p>
            </div>
            <p>促销价 ￥{{item.price}}</p>
            <div class="commoditytextmiddle1">
              <p>{{item.uploadTime}}</p>
              <p>库存: {{item.qty}}</p>
            </div>
          </div>
          <!-- 上传图片 -->
          <div class="upimg" @click="upload(index)">
            <upload @setPic="setAccountPermitPic" :imgList="item.goodsLogo == null|| item.goodsLogo == '' ? [] : [{uid:1,url:item.goodsLogo,name:'',status:200}]" @delPic="delPic" />
          </div>
          <div class="dispaylname">
            <p>展示名称</p>
            <Input v-model="item.goodsName" placeholder="请输入展示名称" style="width: 2.4rem" />
          </div>
          <div class="allbtn">
            <div class="allbtn-top">
              <Button :class="shopname.goodsStatus == 2 || shopname.goodsStatus == undefined? 'displaynone':''" type="primary" @click="singleok(item,index,'')">保存</Button>
              <Button :class="shopname.goodsStatus == 1 || shopname.goodsStatus == undefined? 'displaynone':''" @click="singleok(item,index,1)">上架</Button>
            </div>
            <Button :class="shopname.goodsStatus == 2 || shopname.goodsStatus == undefined? 'displaynone':''" @click="singleok(item,index,2)">下架</Button>
          </div>
        </div>
      </div>
      <pages :pagations="pagations" @skipHandle="PageSkip" @PageSizeChange="PageSizeHandle" @PageChange="PageHandle"></pages>
    </div>
    <!-- 商家模态框 -->
    <Modal class-name="shopmodal" v-model="shopmodal" width=900>
      <div slot="header">
        <p class="title">选择店铺</p>
        <Input v-model="searchshop" placeholder="请输入选择的店铺" style="width: 300px" />
        <Button type="primary" @click="TabShopList()">搜索</Button>
        <Button icon="md-sync" @click="TabShopList(1)">刷新</Button>
      </div>
      <div class="allshop">
        <p v-for="(item,index) in allShaps" class="shopname" @click="getItem(item)">
          <span>{{item.shopName}}</span>
          <span><i class ="iconfont icon-zu9" /><span>{{item.goodsCount}}</span></span>
        </p>
      </div>
      <!-- 加载动画 -->
      <Row>
        <Col class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        </Col>
      </Row>
      <p class="dixian">别拉了,我是也是有底线 -。-</p>
    </Modal>
    <!-- 确定弹框 -->
    <Modal v-model="suremodal" class-name="suremodal" @on-ok="allok">
      <p>{{confirmationmessage}}</p>
    </Modal>
  </div>
</template>
<script>
import upload from '../../../components/upload.vue'
import Pages from '../../../components/Pages'
import { getShopList, getshopPromotion, getsavePromotion, getshopRanks, getoutDatePromotion, getsaveHistoryShop, gethistoryShop } from '../../../api/smallProgram.js'
export default {
  name: "salesManagement",
  components: {
    upload,
    Pages
  },
  data() {
    return {
      shopmodal: false, //商店模态框
      suremodal: false, //确定模态框
      confirmationmessage: '', //确认消息
      searchshop: '', //所搜店铺
      chainstore: "",
      allShaps: '', // 切换店铺列表
      merchantcategory: '', //商家品类
      categoryList: '', //品类列表
      shopNum: 0, // 商品数量
      cjtId: '', //超级通编号
      Index: 0, //当前点击DOM的索引
      operatorList: [], //当前保存的数据
      opList: {}, //多条保存初始化
      bottomedge: [0, 0], //流加载触底距离
      pagations: {
        currents: 1,
        total: 0,
        pageSize: 10
      },
      page: 1, //当前页码
      allpage: 0, //下拉刷新全页码
      shopname: {
        cjtId: '',
        goodsStatus: '',
        custCategoryNo: null,
        page: 1,
        limit: "10"
      },
      urlimg: '../../../../static/image/weichack@2x.png', //全选按钮
      urlimg1: '../../../../static/image/chack@2x.png', //未选中
      // tab循环
      active: 0,
      value: 0,
      tabs: [
        { state: '待发布', id: '' },
        { state: '上架中', id: '1' },
        { state: '已下架', id: '2' },
        { state: '活动到期/库存为0' }
      ],
      //促销商品列表
      commoditiesLists: [],
      // 全选
      checked: false,
    }
  },
  // 挂载之后执行
  mounted() {
    this.historyShop()
    this.Listenscroll()
  },
  watch: { //深度 watcher
    checked: {
      handler: function(val, oldVal) {
        this.operatorList.forEach((item) => {
          if (this.checked) {
            item.check = true;
          } else {
            item.check = false
          }
        });
      },
      deep: true
    }
  },
  // 函数
  methods: {
    // 保存最后操作店铺
    saveHistoryShop(cjtNo) {
      var shopData = {
        cjtId: cjtNo,
        shopName: this.chainstore
      }
      console.log(this.chainstore)
      return new Promise((resolve, reject) => {
        getsaveHistoryShop(shopData)
          .then(res => {})
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 获取上次操作店铺id
    historyShop() {
      return new Promise((resolve, reject) => {
        gethistoryShop()
          .then(res => {
            if (res.data.success) {
              this.shopname.cjtId = res.data.data.cjtId
              this.chainstore = res.data.data.shopName
              this.shopPromotion(this.shopname)
            } else {
              this.TabShopList()
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 分页
    pages(index, page) {
      this.page = page
    },
    PageSkip(cur) {
      if (cur) {
        this.pagations.currents = cur;
      }
      this.shopname.page = cur
      this.shopPromotion(this.shopname)
    },
    // 分页条数操作
    PageSizeHandle(Pagesize) {
      this.shopname.limit = Pagesize
      this.shopPromotion(this.shopname, this.active)
    },
    // 分页当前页
    PageHandle(Page) {
      this.shopname.page = Page
      this.shopPromotion(this.shopname)
    },
    // 图片上传索引
    upload(index) {
      this.Index = index
    },
    // 删除图片
    delPic(list) {
      setTimeout(() => {
        this.commoditiesLists[this.Index].goodsLogo = ""
      }, 100);
    },
    // tab切换
    changeTab(index, val) {
      this.pagations.currents = 1
      this.checked = false;
      this.operatorList = []
      this.$refs.store.clearSingleSelect()
      this.shopname.goodsStatus = index
      if (val == 3) {
        this.getoutDatePromotion(this.shopname)
        this.active = Number(val)
      } else {
        this.shopPromotion(this.shopname)
        if (index == '') {
          this.active = 0
        } else {
          this.active = Number(val)
        }
      }
    },
    // 图片上传
    setAccountPermitPic(list) {
      this.commoditiesLists[this.Index].goodsLogo = list[0].url
    },
    // 小程序运营切换店铺列表
    TabShopList(active) {
      $('.dixian').css("display", 'none')
      this.page = 1
      this.shopmodal = true;
      if (active == 1) {
        this.searchshop = ""
      }
      var shopname = {
        queryWord: this.searchshop,
        page: "1",
        limit: "21"
      }
      return new Promise((resolve, reject) => {
        getShopList(shopname)
          .then(res => {
            if (res.data.success) {
              this.allShaps = res.data.data
              this.allpage = Math.ceil(res.data.total / 21)
            } else {
              console.log(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 切换店铺里面的按钮
    getItem(item) {
      this.chainstore = item.shopName
      this.shopname.cjtId = item.cjtNo
      this.shopPromotion(this.shopname)
      this.saveHistoryShop(item.cjtNo)
    },
    // 促销管理列表(促销)
    shopPromotion(payload) {
      return new Promise((resolve, reject) => {
        getshopPromotion(payload)
          .then(res => {
            if (res.data.success) {
              this.commoditiesLists = []
              res.data.data.forEach((item, index) => {
                item.Id = ((index += 1) - 1)
                item.displayname = ''
                item.check = false;
                this.commoditiesLists.push(item)
              })
              this.pagations.total = res.data.total
              this.shopmodal = false;
            } else {
              console.log(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
        getshopRanks({ cjtId: this.shopname.cjtId })
          .then(res => {
            if (res.data.success) {
              this.categoryList = res.data.data
              console.log()
            } else {
              console.log(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 保存促销管理上下架(促销)
    savePromotion(item, index, goodsStatus) {
      var msg = ""
      if (goodsStatus == 0) {
        goodsStatus = ''
        msg = "保存成功"
      } else if (goodsStatus == 1) {
        msg = "上架成功"
      } else {
        msg = "下架成功"
      }
      this.operatorList = {
        operatorList: [{
          cjtId: item.cjtId, //超集通编号
          barCode: item.barCode, //条码
          itemName: item.itemName, //商品名称
          goodsName: item.goodsName, //商品展示名称
          goodsLogo: item.goodsLogo, //商品logo
          goodsStatus: goodsStatus //上下架状态
        }]
      }
      return new Promise((resolve, reject) => {
        getsavePromotion(this.operatorList)
          .then(res => {
            if (res.data.success) {
              this.shopPromotion(this.shopname, 0, this.active)
              this.$Message.success({
                content: msg,
                duration: 5
              })
            } else {
              this.$Message.success({
                content: res.data.msg,
                duration: 5
              })
            }
          })
          .catch(err => {
            this.$Message.success({
              content: err,
              duration: 5
            })
          })
      })
    },
    //查询过期或0库存促销商品信息列表(促销)
    getoutDatePromotion(payload) {
      return new Promise((resolve, reject) => {
        getoutDatePromotion(payload)
          .then(res => {
            if (res.data.success) {
              this.commoditiesLists = []
              res.data.data.forEach((item, index) => {
                item.Id = ((index += 1) - 1)
                item.displayname = ''
                this.commoditiesLists.push(item)
              })
              this.pagations.total = res.data.total
            } else {
              console.log(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 全部保存 
    allSeve(goodsStatus) {
      if (this.operatorList.length > 0) {
        this.suremodal = true;
        this.confirmationmessage = '确认发布当前商品？'
        this.operatorList.forEach((item) => {
          item.goodsStatus = goodsStatus
        })
      } else {
        this.$Message.warning({
          content: '请选择商品',
          duration: 5
        })
      }
    },
    // 全部上架确定事件
    allok() {
      let operatorList = { operatorList: this.operatorList }
      return new Promise((resolve, reject) => {
        getsavePromotion(operatorList)
          .then(res => {
            if (res.data.success) {
              this.shopPromotion(this.shopname, 0, this.active)
              this.$Message.success({
                content: '保存成功',
                duration: 5
              })
            }
          })
      })
    },
    // 单个保存或者上下架
    singleok(item, index, goodsStatus) {
      this.suremodal = true;
      item.check = true;
      if (goodsStatus == '') {
        goodsStatus = this.shopname.goodsStatus
      }
      this.confirmationmessage = '当前商品信息有变动确认保存并发布？'
      if (item.check) {
        this.operatorList.push({
          Id: item.Id,
          cjtId: item.cjtId,
          barCode: item.barCode,
          itemName: item.itemName,
          goodsName: item.goodsName,
          goodsLogo: item.goodsLogo,
          goodsStatus: goodsStatus
        })
      } else {
        this.operatorList.forEach((item2, index) => {
          if (item2.Id == item.Id) {
            this.operatorList.splice(index, 1)
          }
        })
      }
    },
    // 单选事件
    checkboxOnclick(item, index, goodsStatus) {
      var arr = []
      this.commoditiesLists.forEach((item1) => {
        if (item1.Id == item.Id) {
          item1.check = !item1.check
          arr.push(item1)
        }
      })
      if (item.check) {
        this.operatorList.push({
          Id: item.Id,
          cjtId: item.cjtId,
          barCode: item.barCode,
          itemName: item.itemName,
          goodsName: item.goodsName,
          goodsLogo: item.goodsLogo,
          goodsStatus: goodsStatus
        })
      } else {
        this.operatorList.forEach((item2, index) => {
          if (item2.Id == item.Id) {
            this.operatorList.splice(index, 1)
          }
        })
      }
      if (this.operatorList.length == this.commoditiesLists.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      console.log(this.operatorList)
    },
    // 全选逻辑
    checkedAll: function() {
      this.checked = !this.checked;
      this.operatorList = []
      this.commoditiesLists.forEach((item) => {
        if (this.checked) {
          this.operatorList.push({
            Id: item.Id,
            cjtId: item.cjtId,
            barCode: item.barCode,
            itemName: item.itemName,
            goodsName: item.goodsName,
            goodsLogo: item.goodsLogo,
          })
          item.check = true
        } else {
          item.check = false
        }
      })
    },
    // 品类下拉change事件
    CategoryNo(custCategoryNo) {
      console.log(this.shopname.custCategoryNo = custCategoryNo)
      this.shopname.custCategoryNo = custCategoryN
      this.shopPromotion(this.shopname)
    },
    // 流加载
    //监听滚动条
    Listenscroll() {
      let shopname
      var _this = this
      $('.ivu-modal-body')[0].addEventListener('scroll', function() {
        var scrollTop = $('.ivu-modal-body')[0].scrollTop;
        if (scrollTop + $('.ivu-modal-body')[0].clientHeight == $('.ivu-modal-body')[0].scrollHeight) {
          if (_this.allpage > _this.page) {
            _this.page++
            $('.demo-spin-col').css("display", 'block')
          } else {
            setTimeout(function() {
              $('.dixian').css("display", 'block')
            }, 1000)
            return false
          }
          shopname = {
            queryWord: _this.searchshop,
            page: _this.page,
            limit: "21"
          }
          console.log("我触底了")
          return new Promise((resolve, reject) => {
            getShopList(shopname)
              .then(res => {
                if (res.data.success) {
                  setTimeout(function() {
                    res.data.data.forEach((item) => {
                      _this.allShaps.push(item)
                    })
                    $('.demo-spin-col').css("display", 'none')
                  }, 1000)
                } else {
                  console.log(res.data.msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
        }
      })
    }
  },
}

</script>
<style lang="scss">
#salesManagement {
  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }

  .salesManagement-top {
    position: relative;
    background-color: #FFFFFF;
    padding: .2rem .12rem;
    border-radius: 4px;
    color: #151515;
    font-size: 12px;

    &:before {
      content: '';
      position: absolute;
      top: 65px;
      left: 0;
      right: 0;
      width: 98%;
      margin: auto;
      border-bottom: 1px #E7EEEF dashed
    }

    p {
      display: inline-block;
      margin-right: 10px;
    }

    //头部
    .commoditycontent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: .2rem;

      .commoditycontent-left {
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          font-size: .14rem;
          font-weight: bold;
          margin: 0 .1rem;
        }
      }

      //上下架按钮
      .upperlower {
        button {
          width: .9rem;
          height: .4rem;
          color: #000000;
          font-size: .2rem;
        }
      }

      // 全选按钮样式
      .allelection {
        color: #000000;
        font-size: 14px;
        font-weight: bold;
        margin-right: .4rem;
      }

      .ivu-select-placeholder {
        color: #151515;
        line-height: .4rem;
        height: .4rem;
      }

      .ivu-select-selection {
        border: 1px #dcdee2 solid;
        height: .4rem;
      }

      .ivu-select-selected-value {
        height: .4rem;
        line-height: .4rem;
      }

      .shopnum {
        color: #767676;
        display: inline-block;
        align-self: flex-end;
        margin-left: .2rem;

        span {
          color: #151515;

        }
      }

      button {
        margin-left: .2rem;
        width: .9rem;
        height: .4rem;
        font-size: .2rem;
        line-height: 1;
      }

      p {
        font-weight: bold;
        font-size: 14px;
      }
    }


    .tabs {
      padding-top: 40px;
      border-bottom: 1px #E7EEEF solid;

      p {
        padding-bottom: 6px;
        color: #767676;
        font-size: .14rem;
        width: 1.5rem;
        text-align: center;
        cursor: pointer;
      }

      .active {
        border-bottom: 1px #0061E2 solid;
        color: #000000;
      }
    }
  }

  // 商品
  .commodityshop {
    display: flex;
    margin-top: .1rem;
    border-radius: 4px;
    padding: .16rem .14rem .16rem;
    background-color: #FFFFFF;
    width: 100%;


    .inputshop {
      margin: auto;

      .input-checkbox {
        width: 18px;
        height: 18px;
        background: url("../../../../static/image/weichack@2x.png");
        margin: 0;
        padding: 0;
        position: relative;
        cursor: default;
        -webkit-appearance: none;
        -webkit-user-select: none;
      }

      .oninput-checkbox {
        width: 18px;
        height: 18px;
        background: url("../../../../static/image/chack@2x.png");
        margin: 0;
        padding: 0;
        position: relative;
        cursor: default;
        -webkit-appearance: none;
        -webkit-user-select: none;
      }
    }

    .upimg {
      position: relative;
      width: .7rem;
      margin-left: .6rem;

      #uploadPictures {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -56px;
        right: 0;
        margin: auto;
        height: 1.8rem;
        width: 1.8rem;
        overflow: hidden;
        transform: scale(.4);
      }
    }

    .ivu-checkbox-default {
      cursor: initial
    }

    .ivu-checkbox {
      margin-top: 20px;
    }

    .dispaylname {
      margin-left: .2rem;

      input {
        height: .4rem;
      }

      p {
        color: #000000;
        font-size: .14rem;
        font-weight: bold;
        margin-top: .1rem;
        margin-bottom: .1rem;
      }
    }

    .commodity {
      display: flex;
      width: 100%;

      @media (min-width: 1400px) {
        .allbtn {
          width: 2rem !important;
          margin-left: 1.5rem;
        }
      }

      .allbtn {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        width: 2.6rem;
        margin-top: .1rem;

        .allbtn-top {
          display: flex;
          justify-content: flex-end;
        }

        button {
          width: 60px;
          height: .3rem;
          line-height: 0;
          font-size: .14rem
        }

        button:nth-child(2) {
          margin-left: .1rem;
        }
      }

      .commoditytext {
        display: flex;
        flex-wrap: wrap;
        margin-left: .1rem;
        width: 8.6rem;
        border-right: 1px #E7EEEF solid;

        p {
          display: inline-block;
          font-size: .14rem;
          color: #000000;
          line-height: 3;
          font-weight: bold;
        }

        .commoditytextleft {
          width: 4.6rem;

          p:nth-child(1) {
            width: 2.4rem;
          }

          p:nth-child(3) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: keep-all;
          }
        }

        .commoditytextmiddle1 {
          width: 2rem;
          margin-left: 1rem;

          p {
            display: block;
          }
        }
      }
    }
  }
}

.suremodal {
  .ivu-modal-content {
    width: 330px;
    height: 100%;
    margin: 0 auto;
  }

  p {
    color: #767676;
    font-size: .14rem;
    text-align: center;
    width: 44%;
    margin: .3rem auto;
  }

  .ivu-modal-footer {
    text-align: center;
  }

  .ivu-modal-body {
    // height: 1rem;0
  }

  .ivu-modal-footer {
    border: none;
  }

  button {
    font-size: .2rem;
    border: 1px #E7EEEF solid;
    width: .9rem;
    height: .4rem;
    line-height: 1;

    &:hover {
      border: 1px #E7EEEF solid;
    }
  }
}

.shopmodal {

  //底线
  .dixian {
    font-size: .16rem;
    text-align: center;
    margin-top: .1rem;
    display: none;
  }

  // 加载动画样式
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: .3rem;
    width: 100%;
    position: relative;
    display: none;
  }

  //模态框
  .shopname {
    width: 250px;
    border: 1px #E7EEEF solid;
    border-radius: 4px;
    padding: .05rem .1rem;
    display: flex;
    justify-content: space-between;
    color: #000000;
    font-size: 14px;

    span:nth-child(2) {
      color: #FF7474;
      font-size: 12px;
      line-height: 1.8;

      i {
        margin-top: -2px;
        margin-right: 6px;
        font-size: 15px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .ivu-modal-body {
    height: 300px;
    overflow-y: auto;

    .allshop {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      p {
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 10px;
        line-height: 2;
      }
    }
  }

  .ivu-modal-footer {
    border: none;
    text-align: center;

    button {
      width: 90px;
      height: 40px;
      line-height: 1;
      font-size: 20px;

      &:first-child {
        border: 1px #E7EEEF solid;
      }
    }

  }


  .ivu-modal-header {
    border: none;

    .title {
      font-size: 16px;
      color: #000000;
      padding: 16px;
      line-height: 0;
      border-bottom: 1px #E7EEEF solid;
      margin-bottom: 15px;
    }
  }
}

.displaynone {
  display: none;
}

</style>
