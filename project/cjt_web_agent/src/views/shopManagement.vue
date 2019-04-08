<template>
  <div id="shopManagement">
    <div class="search_box">
      <Input class="search_input" search placeholder="请输入商户名称进行搜索" v-model="searchVal" @on-search="searchInput"/>
    </div>
    <div class="placeholder"></div>
    <div class="shop_item" v-for="(item,index) in shopList" :key="index">
      <div>
        <p>{{item.shopName}}
          <Icon type="ios-arrow-forward"/>
        </p>
        <p>{{item.manager}}<span>{{item.tel}}<Icon class="icon_tel" @click="openModal" type="ios-call"/></span></p>
      </div>
      <div>
        <div>
          <p>营业额</p>
          <p>{{item.turnover}} 元</p>
        </div>
        <div>
          <p>订单数</p>
          <p>{{item.orders}} 单</p>
        </div>
        <div>
          <p>收入</p>
          <p>{{item.earning}} 元</p>
        </div>
      </div>
    </div>
     <Modal v-model="modal" :closable="false">
        <div :style="{'text-align':'center','padding': '0.3rem 0 0','font-size':'0.32rem'}">
            <p>即将打给喜洋洋，是否继续？</p>
            <p>13212345678</p>
        </div>
        <div slot="footer">
            <Button @click="closeModal">取消</Button>
            <Button @click="closeModal" type="error">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { getShopList } from '../api/shop'
  export default {
    name: "shopManagement",
    data() {
      return {
        searchVal: '',
        shopList: [
          {
            id: 1,
            shopName: '嘻嘻店',
            manager: '嘻嘻',
            tel: '13453556464',
            turnover: '34567.89',
            orders: '2345',
            earning: '2345.67'
          },
          {
            id: 2,
            shopName: '嘻嘻店',
            manager: '嘻嘻',
            tel: '13453556464',
            turnover: '34567.89',
            orders: '2345',
            earning: '2345.67'
          },
          {
            id: 3,
            shopName: '嘻嘻店',
            manager: '嘻嘻',
            tel: '13453556464',
            turnover: '34567.89',
            orders: '2345',
            earning: '2345.67'
          },
          {
            id: 4,
            shopName: '嘻嘻店',
            manager: '嘻嘻',
            tel: '13453556464',
            turnover: '34567.89',
            orders: '2345',
            earning: '2345.67'
          },
          {
            id: 5,
            shopName: '嘻嘻店',
            manager: '嘻嘻',
            tel: '13453556464',
            turnover: '34567.89',
            orders: '2345',
            earning: '2345.67'
          },
        ],
        modal: false,
        queryWord:'',
        page:1,
        pageSize:10
      }
    },
    created(){
      let companyId = localStorage.getItem('companyId');
      let id = localStorage.getItem('id')
      let param = {
        subCompanyId: companyId ? companyId : '',
        queryWord: this.queryWord,
        dateRange: id ? id : '',
        page: this.page,
        pageSize: this.pageSize
      }
      this.getShopListHandle(param)
//      let myHeader = localStorage.getItem('header');
    //   let { companyId } = JSON.parse(localStorage.getItem('userData'));
    //   console.log(companyId,333);
    //  this.$axios.post('/api/shopManager/list',{"subCompanyId": companyId,
    //    "queryWord": "",
    //    "dateRange": "",
    //    "page": "1",
    //    "pageSize": "10"},{
    //    headers:{
    //      "Authorization": "Basic MTI6YzU1OTI5YzYyZTUyNGE3MmIxNjU5NjM1NWM0NWQzMjI="
    //    },
    //  }).then((res) => {
    //    console.log(res)
    //  }).catch((err) => {
    //    console.log(err)
    //  })
    },
    methods: {
      searchInput() {
        console.log(this.searchVal)
      },
      // 打开模态框
      openModal(){
      this.modal = true
      },
      // 关闭模态框
      closeModal(){
          this.modal = false;
          this.shows = false;
      },
      // 获取店铺列表信息
      getShopListHandle(payload){
        return new Promise((resolve,reject) => {
          getShopList(payload).then(res => {
              console.log(res,9999)
          }).catch(err => {

          })
        })
      }
    }
  }
</script>

<style lang="less">
  #shopManagement {
    min-height: 100%;
    background-color: #EDEDED;

    .search_box{
      background-color: #EDEDED;
      position: fixed;
    }

    .search_input {
      width: 5.62rem;
      margin: .15rem .94rem;
    }
.placeholder{
  height: 1rem;
}
    .shop_item {
      font-size: .3rem;
      color: #111;
      padding: .25rem .22rem;
      margin-bottom: .2rem;
      background-color: #fff;
    }

    .shop_item > div:nth-of-type(1) {
      border-bottom: 1px #CCCCCC solid;
    }

    .shop_item > div:nth-of-type(1) > p:nth-of-type(1) {
      font-size: .34rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: .3rem;
    }

    .shop_item > div:nth-of-type(1) > p:nth-of-type(2) {
      display: flex;
      align-items: center;
      margin-bottom: .25rem;
    }

    .shop_item > div:nth-of-type(1) > p:nth-of-type(2) > span {
      color: #3ACF61;
      display: flex;
      align-items: center;
      margin-left: .76rem;
    }

    .icon_tel {
      margin-left: .15rem;
    }

    .shop_item > div:nth-of-type(2) {
      display: flex;
    }

    .shop_item > div:nth-of-type(2) > div {
      width: 33.3%;
      text-align: center;
    }

    .shop_item > div:nth-of-type(2) > div > p:nth-of-type(1) {
      margin-top: .22rem;
      margin-bottom: .22rem;
    }
  }
</style>
