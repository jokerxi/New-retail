<template>
  <!--滞销天数设置-->
  <div class="unsalable_day_box">
    <div class="styleHeader radius"></div>
    <div class="styleTitle">
      <div>
        <span class="font18">滞销商品天数设置</span>
        <span class="font14">超过对应天数仍没有销量则为滞销商品</span>
      </div>
      <div>
        <span class="font14" @click="open7">重置</span>
        <div>
          <i class="fa fa-floppy-o save_icon" aria-hidden="true"></i>
          <span class="font14">保存</span>
        </div>

      </div>

    </div>
    <!--一级类-->
    <div class="styleBox">

        <div class="haha1">
          <div v-for="(item,index) in style1Array" :class="{'Itemactive': current === index}" :key="index" @click="clickStyle(index)">
            <!--<span>{{item.one_id}}</span>-->
            <span class="font14">{{item.typeName}}</span>
            <div>
              <input type="text" class="normal" v-model="item.val" @change="change1(item.val)">
              <span>天</span>
            </div>

          </div>
        </div>


      <div class="haha2">
        <div v-for="(item,index) in style2Array" :key="index" :class="{'Itemactive': current1 === index}" @click="clickStyle1(index)">
          <!--<span>{{item.one_id}}</span>-->
          <span class="font14">{{item.typeName}}</span>
          <div>
            <input type="text" class="normal" v-model="item.val" @change="change2(item.val)">
            <span>天</span>
          </div>

        </div>
      </div>
      <div class="haha3">
        <div v-for="(item,index) in style3Array" :key="index" :class="{'Itemactive': current2 === index}" @click="clickStyle2(index)">
          <!--<span>{{item.one_id}}</span>-->
          <span class="font14">{{item.typeName}}</span>
          <div>
            <input type="text" class="normal" v-model="item.val" @change="change3(item.val)">
            <span>天</span>
          </div>

        </div>
      </div>

      <div class="haha4">
        <div class="searchBox">
          <div class="Wrap">
          <div class="InputWrap">
             <span class="search"><i class="iconfont icon-sousuoicon"></i></span>
             <input placeholder="请输入商品名查询" />
          </div>
          <div class="BtnSearch">
            <span>查询</span>
          </div>
        </div>
        </div>
        <el-row>
          <el-col :span="8" v-for="(item,index) in style4Array" :key="index">
            <div class="haha4_info radius" :class="{'selectActive': current3 === index}"  @click="clickStyle3(index)">
            <!--<span>{{item.one_id}}</span>-->
            <span class="font14">{{item.typeName}}</span>
            <div>
              <input type="text" class="normal" v-model="item.val">
              <span>天</span>
            </div>
          </div>
          </el-col>
        </el-row>
        <div class="paginations">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "unsalable-days",
    data() {
      return {
        current: '',
        current1: '',
        current2: '',
        current3: '',
        style1Array: [
          {
            "one_id": 1,
            "typeName": '吃的',
            "val":''
          },
          {
            "one_id": 2,
            "typeName": '喝的',
            "val":''
          },
          {
            "one_id": 3,
            "typeName": '玩的',
            "val":''
          },
        ],
        style2Array: [
          {
            "two_id": 1,
            "typeName": '主食',
            "val":''
          },
          {
            "two_id": 2,
            "typeName": '水果',
            "val":''
          },
          {
            "two_id": 3,
            "typeName": '蔬菜',
            "val":''
          }
        ],
        style3Array: [
          {
            "three_id": 1,
            "typeName": '大米',
            "val":''
          },
          {
            "three_id": 2,
            "typeName": '面条',
            "val":''
          },
          {
            "three_id": 3,
            "typeName": '米线',
            "val":''
          }
        ],
        style4Array: [
          {
            "three_id": 1,
            "typeName": '东北大米',
            "val":''
          },
          {
            "three_id": 2,
            "typeName": '西北大米',
            "val":''
          },
          {
            "three_id": 3,
            "typeName": '南方大米',
            "val":''
          },
          {
            "three_id": 4,
            "typeName": '进口大米',
            "val":''
          },
          {
            "three_id": 5,
            "typeName": '科技大米',
            "val":''
          }
        ]
      }
    },
    methods: {
      clickStyle (index){
        this.current = index
      },
      clickStyle1 (index){
        this.current1 = index
      },
      clickStyle2 (index){
        this.current2 = index
      },
       clickStyle3 (index){
        this.current3 = index
      },
      change1(val){
        console.log('一类框输入数字后',val)
        for(var i=0;i<this.style2Array.length;i++){
          this.style2Array[i].val=val
        }
        for(var j=0;j<this.style3Array.length;j++){
          this.style3Array[j].val=val
        }
        for(var k=0;k<this.style4Array.length;k++){
          this.style4Array[k].val=val
        }
      },
      change2(val){
        console.log('二类框输入数字后',val)
        for(var j=0;j<this.style3Array.length;j++){
          this.style3Array[j].val=val
        }
        for(var k=0;k<this.style4Array.length;k++){
          this.style4Array[k].val=val
        }
      },
      change3(val){
        console.log('三类框输入数字后',val)
        for(var k=0;k<this.style4Array.length;k++){
          this.style4Array[k].val=val
        }
      },
      open7() {
        this.$confirm('确定重置全部设置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      }
    }

  }
</script>

<style scoped>
  .save_icon{
    /*引用的小图标的样式*/
    color: white;
  }
  .unsalable_day_box{
    /*border:1px solid red;*/
    padding-left: 8px;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .styleHeader{
    /*border:1px solid red;*/
    width: 16.11rem;
    min-width: 1160px;
    margin: 0 auto;
    height: 1rem;
    min-height: 80px;
    background-image: url("../../static/images/unsalable_back.png");
    background-size: cover;
  }

  .styleTitle{
    border:1px solid rgba(235,235,235,1);
    /*border:1px solid red;*/
    background-color: white;
    width: 16.11rem;
    min-width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: -1px;
  }
  .styleTitle>div:first-child{
    /*border:1px solid blue;*/
    padding-left: 0.22rem;
    padding-top: 0.17rem;
    padding-bottom: 0.15rem;
  }
  .styleTitle>div:first-child>span:nth-child(2){
    /*border:1px solid green;*/
    margin-left: 0.1rem;
  }
  .styleTitle>div:last-child{
    /*border:1px solid blue;*/
    display: flex;
    justify-content: space-between;
  }
  .styleTitle>div:last-child>span{
    border:1px solid rgba(235,235,235,1);
    border-radius: 0.3rem;
    padding: 0.07rem 0.23rem;
    margin-right: 0.24rem;
  }
  .styleTitle>div:last-child>span:hover{
    cursor: pointer;
  }
  .styleTitle>div:last-child>div{
    border:1px solid rgba(235,235,235,1);
    border-radius: 0.3rem;
    padding: 0.07rem 0.15rem;
    background-color: rgba(68,113,254,1);
    color: white;
  }
  .styleTitle>div:last-child>div:hover{
    cursor: pointer;
  }

  .styleBox {
    /*border: 1px solid red;*/
    display: flex;
    width: 16.11rem;
    min-width: 1162px;
    margin: 0 auto;
  }

  .searchBox {
    /*border: 1px solid blue;*/
    display: flex;
    padding-left: 0.3rem;
    margin-top: 0.05rem;
    margin-bottom: 0.2rem;
  }

  .searchBox > div:first-child {
    /*border: 1px solid red;*/
    width: 3.8rem;
    min-width: 270px;
    height: 0.3rem;
    margin-right: 0.2rem;
  }
   .searchBox .Wrap{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height:0.4rem;
    margin: 0.1rem 0 0.05rem 0.14rem;
  }
 .Wrap .InputWrap{
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
   width:190px;
   border:1px solid rgba(231,238,239,1);
 }
 .InputWrap input{
   height: 0.35rem;
   width: 100%;
   display: inline-block;
   line-height: 0.35rem;
   border: none;
   outline: none;
   font-size: 0.14rem;
   border-radius: 0.05rem;
 }
 .InputWrap .iconfont{
   font-size: 0.14rem;
   padding: 0 0.05rem;
   padding-top: 0.02rem;
   box-sizing: border-box;
 }
 .Wrap .BtnSearch {
   margin-left: 0.15rem;
 }
 .BtnSearch span{
   display: inline-block;
   width:0.9rem;
   height:0.4rem;
   background:rgba(68,113,254,1);
   border-radius:0.05rem;
   color: #fff;
   text-align: center;
   line-height: 0.4rem;
   font-size:0.2rem;
   font-family:'Source Han Sans CN';
   font-weight:500;
   cursor: pointer;
 }

  /*一二三类样式设置*/
  .haha1,.haha2,.haha3 {
    border:1px solid rgba(235,235,235,1);
    background-color: #fff;
    width: 2.4rem;
    min-width: 171px;
    min-height: 710px;
    font-size: 0.14rem;
    margin-right: -1px;
  }

  .haha1 input,.haha2 input,.haha3 input {
    border: 1px solid lightblue;
    border-radius: 0.04rem;
    width: 0.54rem;
    height: 0.3rem;
    margin-right: 0.1rem;
    text-align: center;
  }

  .haha1 > div,.haha2>div,.haha3>div {
    border:1px solid rgba(235,235,235,1);
    border-color: transparent;
    border-radius: 0.04rem;
    width:2.2rem;
    min-width: 157px;
    background-color: rgba(238, 243, 254, 1);
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 0.05rem;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    cursor: default;
  }

   .haha1 > div:hover,.haha2>div:hover,.haha3>div:hover{
      background: #EEF3FE;
   }
.Itemactive{
  background: #4471FE!important;
  color: #fff;
}
.normal{
  color: #a5a5a5;
}
.Itemactive .normal{
  color: #000;
}

  .haha1 > div > span,.haha2 > div > span,.haha3 > div > span {
    /*border:1px solid green;*/
    padding-left: 0.18rem;
    font-weight: bold;
  }


  .haha1 > div > div,.haha2 > div > div,.haha3 > div > div {
    /*border:1px solid red;*/
    padding-right: 0.18rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /*四类样式*/
  .haha4{
    border:1px solid rgba(235,235,235,1);
    /*border:1px solid rgba(235,0,0,1);*/
    background-color: white;
    width: 9.14rem;
    min-width: 635px;
    min-height: 710px;
    font-size: 0.14rem;
    padding: 0 0 0 0.1rem;
    position: relative;

  }

  .haha4_info{
    border:1px solid rgba(235,235,235,1);
    border-color: transparent;
    width: 2.3rem;
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F8F8;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    margin: 0 auto;
    margin-top: 0.05rem;
    cursor: default;
  }
  .haha4_info:hover{
    background: #EEF3FE;
  }
  .selectActive .normal{
    color: #000;
  }
  .haha4_info>span{
    /*border:1px solid green;*/
    padding-left: 0.18rem;
    font-weight: bold;
  }
  .haha4_info>div:nth-child(2){
    /*border:1px solid blue;*/
    display: flex;
    flex-direction: row;
    padding-right: 0.18rem;
    justify-content: space-between;
    align-items: center;
  }
  .haha4_info>div:nth-child(2)>input{
    border: 1px solid lightblue;
    border-radius: 0.04rem;
    width: 0.54rem;
    height: 0.3rem;
    margin-right: 0.1rem;
    text-align: center;
  }

  /*分页栏样式控制*/
  .paginations{
    /*border:1px solid red;*/
    text-align: right;
    position: absolute;
    bottom: 0.4rem;
    right: 0;
  }
  .paginations .el-pagination{
    white-space: normal;
  }

</style>
