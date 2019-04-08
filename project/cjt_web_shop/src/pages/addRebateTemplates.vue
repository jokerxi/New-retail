<template>
    <!--添加返利模板页-->
    <div id="addRebateTemplates">
      <div class="add_content">
        <div class="add_content_box">
          <div class="add_img">
            <img src="../../static/images/phone.png" alt="">
          </div>
          <div class="add_templates">
            <p class="add_title">添加返利模板</p>
            <p class="add_my_title">*发放范围:</p>
            <div class="part_one">
              <input type="radio" name="paixu" id="paixu1" checked>
              <label  @click="openModalFrame(0)" for="paixu1" style="cursor:pointer"><span><i class="iconfont icon-tianjialanseicon"></i>添加商品</span></label>
              <input type="radio" name="paixu" id="paixu2">
              <label @click="openModalFrame(1)" for="paixu2" style="cursor:pointer"><span><i class="iconfont icon-tianjialanseicon"></i>添加品类</span></label>

              <div v-if="productName?true:false" class="add_xian_box">
                <el-button plain>{{productName}}</el-button> <span @click="addRemove(4)" class="iconfont icon-qingchuicon"></span>
              </div>
            </div>

            <div class="part_two">
              <el-form ref="form" :model="sizeForm" label-width="79px" size="mini">
                <el-form-item label="*返利比例:">
                  <el-input v-model="sizeForm.name"></el-input><span class="percent">%</span>
                </el-form-item>
              </el-form>
            </div>
            <p class="my_title">*适用范围:</p>
            <div class="part_three">
              <input type="radio" name="paixu" id="paixu3">
              <label for="paixu3" style="cursor:pointer">全场通用</label>
              <input type="radio" name="paixu" id="paixu4" checked>
              <label  @click="openModalFrame(2)" for="paixu4" style="cursor:pointer"><span><i class="iconfont icon-tianjialanseicon"></i>添加商品</span></label>
              <input type="radio" name="paixu" id="paixu5">
              <label @click="openModalFrame(3)" for="paixu5" style="cursor:pointer"><span><i class="iconfont icon-tianjialanseicon"></i>添加品类</span></label>

              <div v-if="productName1?true:false" class="add_xian_box">
                <el-button plain>{{productName1}}</el-button> <span @click="addRemove(5)" class="iconfont icon-qingchuicon"></span>
              </div>
            </div>

            <div class="part_four">
              <el-form ref="form" :model="sizeForm" label-width="106px" size="mini">
                <el-form-item label="*返利金有效期:">
                  <el-input v-model="sizeForm.tian"></el-input><span class="percent">天</span>
                </el-form-item>
              </el-form>
            </div>

            <div class="part_five">
              *发放范围:
              <el-date-picker class="my_date1" size='small' v-model="value13" type="daterange"
                :picker-options="getToDay"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div>
              <el-button class="add_query_btn" size="mini" type="primary">确认添加</el-button>
            </div>
          </div>
        </div>
      </div>
      <!--添加返利模板模态框-->
      <div v-show="displayFrame" class="add_Modal_frame">
        <div class="add_Modal_box radius">
          <div class="add_Modal_title">
            <p>添加商品</p><span @click="CloseModalFrame()" style="cursor:pointer"><i class="iconfont icon-qingchuicon"></i></span>
          </div>
          <div style="clear: both"></div>
          <div class="add_Modal_search">
            <input v-model="add_input" type="text"  placeholder="请输入内容">
            <el-button @click="addSearch" type="primary" plain size="mini" class="add_chk_btn">搜索</el-button>
          </div>
          <div class="add_Modal_box1">
           <div v-for="item in list" class="add_Modal_flex">
             <span>{{item.name}}</span><span>{{item.number}}</span>
             <span> <el-button @click="addMerchandise(item.name,item.code)" type="primary" plain size="mini" class="add_chk_btn my_add_btn">添加</el-button></span>
           </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import '../assets/css/precisionMarketing.css'
    export default{
        name: "addRebateTemplates",
        data(){
            return{
              showBtn1: true,
              showBtn2: true,
              displayFrame: false,
              productName: '',
              productName1: '',
              value13:'',
              radio: '',
              input: '',
              add_input: '',
              sizeForm: {
                name: '',
                tian: ''
              },
              // 控制日期到今天之前
              getToDay: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }
              },
              list:[
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '猫耳朵', number: '111111',code:1},
                {name: '酱油', number: '111111',code:2},
                {name: '旺仔QQ糖', number: '111111',code:3},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '1111111111 ',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '8888888888',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
                {name: '旺仔QQ糖', number: '111111',code:0},
              ],
            }
        },
        methods:{
//            模态框弹出
          openModalFrame(index) {
              let path;
              if(index==0){
                  path=''
              }
              else if(index==1){
                path=''
              }
              else if(index==2){
                path=''
              }
              else if(index==3){
                path=''

              }
            this.$axios.post(path,'')
              .then(res=>{
//                this.displayFrame=true;
//                this.$openModal();
//                this.radio=index;
//                console.log (this.radio)
              })
              .catch(err=>{

              })
            this.displayFrame=true;
            this.$openModal();
            this.radio=index;
            console.log (this.radio)
          },
//          关闭模态框
          CloseModalFrame(){
            this.displayFrame=false;
            this.$closeModal()
          },
//          添加的谁
          addMerchandise(a,b){
            console.log(a);
            if (b==0||b==1){
              this.productName = a;
            }
            else if(b==2||b==3){
              this.productName1 = a;
            }
            this.CloseModalFrame();
          },
//          搜索
          addSearch(){

          },
//          移除
          addRemove(a){

            if (a==4){
              console.log(11111,a);
              this.productName = false;
            }else if(a==5){
              this.productName1 = false;
            }
          }
        }
    }
</script>

<style scoped>
  .add_content{
    background-color: #FFFFFF;
    margin: .24rem .2rem 0 .2rem ;
    height: 100%;
    min-height: 7.7rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #E7EEEF;
  }
  .add_content_box{
    width: 10.97rem;
    display: flex;
    align-items: center;
    justify-items: center;
    margin: auto;
  }
  .add_img{
    width: 6.22rem;
  }
  .add_img img{
    width: 100%;
  }
  .add_title{
    font-size:0.24rem;
    font-weight:bold;
  }
  .add_templates{
    width: 700px;
  }
  i{
    color: #4471FE;
    padding-right: .05rem;
    font-size: .14rem;
  }
  .add_my_title{
    color: #000000;
    font-size:0.14rem;
    margin: .33rem 0 .01rem 0;
  }

/*lable*/

  .part_three,.part_one{
    display: flex;
    justify-items: center;
    align-items: center;
    margin-top: .1rem;
  }
  .part_one>label>span{
    color: #151515;
    border: 1px solid #E7EEEF;
    background: #fff;
    padding: .06rem .062rem;
    font-size: .14rem;
    border-radius: 4px;
  }
  .part_three,.part_one>input{
      display: none;
    }
  .part_three,.part_one>label{
    position: relative;
    margin-right: 15px;
  }
  .part_one>label::before{
    display: inline-block;
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgb(219, 219, 219);
    margin-right: 6px;
    vertical-align: bottom;
  }
  .part_one>input:checked+label::before{
    background-color: white;
  }
  .part_one>input:checked+label::after{
    display: inline-block;
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    bottom: 4px;
    background-color: #4471FE;
  }

  .part_three>label>span{
    color: #151515;
    border: 1px solid #E7EEEF;
    background: #fff;
    padding: .06rem .062rem;
    font-size: .14rem;
    border-radius: 4px;
  }
  .part_three>input:checked+label::after{
    display: inline-block;
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    bottom: 4px;
    background-color: #4471FE;
  }
  .part_three>input:checked+label::before{
    background-color: white;
  }
  .part_three>label::before{
    display: inline-block;
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgb(219, 219, 219);
    margin-right: 6px;
    vertical-align: bottom;
  }
  .part_three>input{
    display: none;
  }
  .part_three>label{
    position: relative;
    margin-right: 15px;
  }
  /*lable*/

  .el-button {
    background: #fff;
    border: 1px solid #E7EEEF;
    color: #151515;
    padding: .08rem .062rem;
    font-size: .14rem;
    border-radius: 4px;
  }
  .el-radio+.el-radio {
    margin-left: 15px;
  }

  .add_xian_box{
    border-left: 1px solid #E7EEEF;
    height: .32rem;
    /*margin-left: .15rem;*/
    padding-left: .15rem;
    box-sizing: border-box;
    color: #4471FE;
  }
  .add_xian_box .el-button{
    border: 1px solid #4471FE;
    width: 1rem;
    text-align: left;
    color: #151515;
  }
  .add_chk1{
    /*padding-right: .1rem;*/
  }
  .part_two{
    /*border: 1px solid red;*/
    margin-top: .26rem;
  }
  .part_three{
    display: flex;
    align-items: center;
  }
  .percent{
    position: relative;
    top: -30px;
    left: 1.36rem;
  }
  .part_four{
    margin-top: .26rem;
  }
  .my_date1{
    width: 2.71rem;
    height: .3rem;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 18px;
    height: .38rem;
  }
  .el-range-editor--small .el-range-input {
    font-size: .14rem;
  }
  /*button*/
  .add_query_btn{
    font-size:0.2rem;
    line-height:0.23rem;
    padding:.075rem 0.213rem;
    border-radius: 0.04rem;
    background-color: #4471FE;
    border-color: #4471FE;
    color: #ffffff;
    margin-top: .34rem;
  }
  /*模态框*/
  .add_Modal_frame{
    position: fixed;
    overflow: hidden;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    z-index: 99;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .add_Modal_box{
    width: 5rem;
    height: 4.6rem;
    background: #ffffff;
    border-radius:.04rem;
    z-index: 999;
  }
  .add_Modal_title{
    height: .5rem;
    line-height: .5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E7EEEF;
    padding: 0 0.15rem 0 .27rem;
    box-sizing: border-box;
  }
  .add_Modal_title > p{
    font-size:0.16rem;
    font-weight:bold;
  }
  .add_Modal_title > span >i{
    color: #767676;
    font-size: 20px;
  }
  .add_Modal_search{
    display: flex;
    justify-content: flex-start;
    margin-top: 0.14rem;
    padding: 0 0.15rem 0 .27rem;
    box-sizing: border-box;
  }

  .add_chk_btn{
    color: #ffffff;
    background-color: #4471FE;
    border: 1px solid #4471FE;
    width: .7rem;
    height: .3rem;
  }
  .my_add_btn{
    width: .6rem;
  }
  .el-button--primary:focus, .el-button--primary:hover {
     background: #6288FF;
     border-color: #6288FF;
     color: #fff;
   }
  .add_Modal_box1{
    margin-top: .08rem;
    height: 3.44rem;
    overflow: hidden;
    overflow-y:scroll;
  }
  .add_Modal_flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E7EEEF;
    height: .48rem;
    line-height: .18rem ;
    margin: .1rem 0.15rem 0 .27rem;
  }
  .add_Modal_flex span{
    width: 33%;

  }
  .add_Modal_flex span:nth-of-type(3){
    text-align: right;
  }
  .add_Modal_flex span:nth-of-type(2){
    text-align: center;
  }
</style>
