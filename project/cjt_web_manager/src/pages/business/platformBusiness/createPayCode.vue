<template>
  <div class="createPayCode">
    <!-- 付款二维码生成 -->
    <div class="cpBanner">
      <img src="../../../../static/image/paycodebg@2x.png" alt="">
        </div>
      <div ref='cpContent' class="cpContent">
        <div class="cpImgBox">
          <div class="codeBox">
          </div>
        </div>
        <div class="cpRightBox">
          <Row style="width:100%">
            <Col>
            <Form ref="formErweima" :model="formErweima" label-position="top">
              <FormItem label="地区:">
                <Select v-model="formErweima.provinceList" placeholder="省" filterable @on-change='selectCity' clearable @on-clear="reset">
                  <Option v-for="(item,index) in provinceList" :key="index" :value="item.id">{{item.areaName}}</Option>
                </Select>
              </FormItem>
              <FormItem label="">
                <Select v-model="formErweima.cityList" placeholder="市" filterable ref="city" @on-change='selectArea' clearable @on-clear="reset2">
                  <Option v-for="(item,index) in cityList" :key="index" :value="item.id">{{item.areaName}}</Option>
                </Select>
              </FormItem>
              <FormItem label="">
                <Select v-model="formErweima.areaList" placeholder="区" filterable ref="area" @on-change='selectAreaId' clearable>
                  <Option v-for="(item,index) in areaList" :key="index" :value="item.id">{{item.areaName}}</Option>
                </Select>
              </FormItem>
            </Form>
            </Col>
          </Row>
          <span>请先选择店铺所对应的省市区，不同省市区的店铺需分别填写再生成</span>
          <div class="cpRightBox-buttom">
            <p>生成数量</p>
            <InputNumber size="large" :max="10" :min="1" v-model="value1"></InputNumber>
            <span>需生成多少张不同的付款二维码</span>
          </div>
          <a ref="down" class="down" href="javascript::void(0)"><Button  @click="getQRCode()" type="primary" shape="circle" >生成二维码</Button></a>
        </div>
      </div>
      <!-- 下载模板 -->
      <div v-if="QRImg" ref="QRImg" id="screenshot">
        <div id='code'></div>
        <canvas style="width: 800px;height: 800px;" id="canvas"></canvas>
        <img src="../../../../static/image/qr.png">
        <p id="qrbm">{{qrbms2}}</p>
      </div>
    </div>
</template>
<script>
  import { showArea,qrCode } from '../../../api/public.js'
    import QRCode from 'qrcode'
    import html2canvas from 'html2canvas'
    export default {
    name: "createPayCode",
    data() {
        return{
          value1: 1,
          codes: '',
          qrbms2: '',
          fist: true,
          QRImg: false,
          qrbms: [],
          formErweima:{
              provinceList: '',
              cityList: '',
              areaList: ''
          },
          resets:0,  //重置
          // 省
          provinceList: [],
          cityList: [],
          areaList: [],
          District: {
            parentId: '',
            name: '',
            page: '',
            pageSize: ''
          },
          qrcodeId:{}
      }
    },
    mounted(){
      this.getDistrict(this.District,'pro')
    },
    methods:{
      // 获取市区
      selectCity(id) {
        this.District.parentId = id
        if (this.resets == 1) {
          this.cityList = []
          this.areaList = []
          this.$refs.city.clearSingleSelect()
          this.$refs.area.clearSingleSelect()
        }else{
          this.getDistrict(this.District,'city')
        }
      },
      selectArea(id) {
        this.District.parentId = id
        if (this.resets == 1 || this.resets == 2) {
          this.areaList =[]
          this.resets = 0
          this.$refs.area.clearSingleSelect()
        }else {
          this.getDistrict(this.District,'area')
        }

      },
      selectAreaId(id){
        this.qrcodeId.Id = id
      },
      getDistrict(paylod,types) {
        return new Promise((resolve, reject) => {
          showArea(paylod)
          .then(res =>{
            if (types == 'pro') {
            this.provinceList = res.data.data
            console.log(1)
            }else if(types == 'city'){
              this.cityList = res.data.data
            console.log(2)
            }else if(types == 'area' ) {
              this.areaList = res.data.data
              console.log(3)
            }
          })
          .catch(err =>{
            console.log(err)
          })
        })
      },
      // 重置
      reset(){
        this.resets = 1
      },
      reset2(){
        this.resets = 2
      },
      // 触发接口生成二维码
      getQRCode () {
        this.qrcodeId.amount = this.value1
        return new Promise((resolve, reject) => {
          qrCode(this.qrcodeId)
          .then(res => {
            this.qrbms = res.data.data
            this.downIMG()
          })
          .catch(err => {
            console.log(err)
          })
        })
      },
      // 循环执行
      downIMG () {
        this.QRImg = true;
        for(var i  = 0; this.qrbms.length > i; i++){
          this.newqrCode(i)
        }
      },
      // 生成二维码
      newqrCode (index) {
        const _this = this
        const QRImg = this.$refs.QRImg
        const a = this.$refs.down
        const tiem = setTimeout(function(){
          QRCode.toCanvas(canvas, 'http://pengchao.hhg365.cn/pages/index.html?cjt='+_this.qrbms[index],function(error){
            _this.qrbms2 = _this.qrbms[index]
          })
          html2canvas(document.getElementById('screenshot'),{
            async:false,
            allowTaint:true,
          }).then(canvas => {
              a.setAttribute('href', canvas.toDataURL()) 
              a.download = _this.qrbms[index]
              a.click()
              _this.QRImg = false;
              a.removeAttribute("download")
              a.removeAttribute("href")
          },1000);
          clearTimeout(tiem)
        })
      }
    }
}
</script>
<style type="text/scss" lang="scss">
  .createPayCode{
    width: 100%;
    height: 100%;
    .ivu-form-item {
      margin-right: .1rem; 
      margin-bottom: 4px;
      vertical-align: bottom;
      display: inline-block;
    }
  .cpBanner{
      img{
          width: 100%;

      }
  }
  .cpContent{
      border: 1px solid #E7EEEF;
      margin-top: .2rem;
      width:100%;
      height:7rem;
      background:#FFFFFF;
      border-radius:4px;
      padding: 1.5rem .05rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .cpImgBox{
          width: 2.8rem;
          height: 3.89rem;
          background: url("../../../../static/image/erweima.png.png")no-repeat;
          background-size: 100% 100%;
          position: relative;

          .codeBox{
              width: 1.4rem;
              height: 1.4rem;
              background-color: #E7EEEF;
              position: absolute;
              top: .73rem;
              right: .7rem;

          }
      }
      .cpRightBox{
          margin-left: .7rem;
          margin-bottom: .08rem;

          span{
              color: #767676;
              font-size:0.12rem;
              font-family:Source Han Sans CN;
              font-weight:400;
              line-height:0.4rem;
              display: block;

          }
        .ivu-btn{
          width: 1.6rem;
          height: 40px;
          margin-top: 20px;
          span {
            color: #ffffff;
            line-height: 1;
            font-size: 14px;
          }
        }
        .cpRightBox-buttom>p{
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
          color:#151515;
          font-family:Source Han Sans CN;
          font-weight:bold;
        }
      }
  }
  // 数字按钮
  .ivu-input-number-large input{
    text-align: center;
  }
  .ivu-input-number-handler {
    height: 100%
  }
  .ivu-input-number-large{
    width: 114px;
  }
  .ivu-input-number-handler-down{
    right: 92px;
    top: -35px;
    border-right: 1px solid #dcdee2 
  }
  .ivu-icon-ios-arrow-up:before{
    content: '+';
    position: absolute;
    top: -0.05rem;;
    left: 0.02rem;
    color: #4471FE;
  }

  .ivu-input-number-handler-down
  .ivu-icon-ios-arrow-down:before {
    content: '-';
    position: absolute;
    top: -0.22rem;
    color: #4471FE;
    font-size: 20px;
    left: 4px;
  }
  .ivu-input-number:hover {
    border-color: #dcdee2
  }
  //图片截图
  #screenshot{
    position: absolute;
    top: .8rem;
    z-index: -99;

    #canvas {
      position: absolute;
      top: 350px;
      left: 0;
      right: 0;
      width: 800px!important;
      height: 800px!important;
      margin: 0 auto;
      z-index: 2
    }
    #qrbm{
      position: absolute;
      top: 1100px;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      z-index: 3;
      font-size: 50px;
    }
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover {
    color: initial;
  }
  .ivu-select-input {
    height: .4rem;
  }
  @media screen and (max-width: 1400px) {
    .ivu-icon-ios-arrow-up:before{
      top: 0px;
    }
    .ivu-input-number-handler-down
    .ivu-icon-ios-arrow-down:before {
      top: -0.24rem;
    }
  }
  .ivu-form .ivu-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    color: #151515;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box; 
    font-size:0.14rem;
    font-family:Source Han Sans CN;
    font-weight:bold;
  }
  .ivu-select-input {
    
    font-size: 14px;
    
}
}
</style>
