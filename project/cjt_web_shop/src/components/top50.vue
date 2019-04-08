<template>
  <!--商品top50排行表格组件-->
  <div class="outBox">
    <div class="top50Box">
      <div class="leftBox">
        <div class="top50Title">
          <span class="verticalLine"></span>
          <span class="font16">商品Top50排行</span>
        </div>
        <div class="radius border" style="overflow: hidden">
          <div class="top50Taboutbox">
            <div class="top50Tab font12">
          <span v-for="(item,index) in top50Tab" :key="index" :class="'top50Tab'+(index+1)"
                @click="chooseTab((index+1))">{{item.msg}}</span>
            </div>
          </div>
          <div style="background-color: white">
            <div class="my_top50left">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="num"
                  label="序号"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="头像"
                  align="left">
                  <!--<template slot-scope="scope">-->
                  <!--<img  :src="scope.row.imgPath" width="40" height="40">-->
                  <!--</template>-->
                  <template slot-scope="scope">
                    <el-popover
                      placement="right"
                      title=""
                      trigger="hover">
                      <img class="img1" :src="scope.row.imgPath" width="150" height="150"/>
                      <img class="img2" slot="reference" :src="scope.row.imgPath" :alt="scope.row.imgPath" width="40"
                           height="40"/>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="商品名"
                  align="left">
                </el-table-column>
                <el-table-column
                  prop="test"
                  label="销售额"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="test"
                  label="销量"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="销售量占比"
                  align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>


      </div>
      <div class="rightBox">
        <div class="top50Title">
          <span class="verticalLine"></span>
          <span class="font16">二级品类Top50排行</span>
        </div>
        <div class="radius border" style="overflow: hidden">
          <div class="top50Taboutbox">
            <div class="top50Tab font12">
          <span v-for="(item,index) in top50Tab" :key="index" :class="'top50TabB'+(index+1)"
                @click="chooseTab2((index+1))">{{item.msg}}</span>
            </div>
          </div>

          <div style="background-color: white">
            <div class="my_top50right">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="num"
                  label="序号"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="头像"
                  align="left">
                  <!--<template slot-scope="scope">-->
                  <!--<img  :src="scope.row.imgPath" width="40" height="40">-->
                  <!--</template>-->
                  <template slot-scope="scope">
                    <el-popover
                      placement="right"
                      title=""
                      trigger="click">
                      <img class="img1" :src="scope.row.imgPath" width="150" height="150"/>
                      <img class="img2" slot="reference" :src="scope.row.imgPath" :alt="scope.row.imgPath" width="40"
                           height="40"/>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="商品名"
                  align="left">
                </el-table-column>
                <el-table-column
                  prop="test"
                  label="销售额"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="test"
                  label="销量"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="销售量占比"
                  align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>


      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "top50",
    data() {
      return {
        tableData: [
          {
          num: 1,
          name: '****王小虎***',
          address: '50%',
          test: '980',
          imgPath: require("../../static/images/img1.jpg")

        }, {
          num: 2,
          name: '****王小虎***',
          address: '50%',
          test: '980',
          imgPath: require("../../static/images/img1.jpg")
        }, {
          num: 3,
          name: '****王小虎***',
          address: '50%',
          test: '980',
          imgPath: require("../../static/images/img1.jpg")
        }, {
          num: 4,
          name: '****王小虎***',
          address: '50%',
          test: '980',
          imgPath: require("../../static/images/img1.jpg")
        }],
        top50Tab: [
          {msg: '按销售额排'}, {msg: '按销售量排'}
        ]


      }
    },
    methods: {

      chooseTab(index) {
        var x
        for (var i = 0; i < this.top50Tab.length; i++) {
          x = document.querySelectorAll('.top50Tab' + (i + 1))[0]
          // console.log('开始了', x)
          x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 0)'
          x.style.color = '#999999'
        }
        x = document.querySelectorAll('.top50Tab' + index)[0]
        x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 1)'
        x.style.color = '#333333'
      },
      chooseTab2(index) {
        var x
        for (var i = 0; i < this.top50Tab.length; i++) {
          x = document.querySelectorAll('.top50TabB' + (i + 1))[0]
          // console.log('开始了', x)
          x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 0)'
          x.style.color = '#999999'
        }
        x = document.querySelectorAll('.top50TabB' + index)[0]
        x.style.borderBottom = '0.02rem solid rgba(68, 132, 254, 1)'
        x.style.color = '#333333'
      }
    }
  }
</script>

<style>
  .outBox {
    background-color: #F5F5F5;
    /*padding-bottom: 0.6rem;*/
  }

  .top50Box {
    /*border:1px solid red;*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 16.15rem;
    min-width: 1160px;
    margin: 0 auto;
  }

  .leftBox, .rightBox {
    width: 49%;
    /*border: 1px solid blue;*/
    margin-bottom: 0.3rem;
  }

  .leftBox > div:first-child, .rightBox > div:first-child {
    /*border: 1px solid red;*/
    padding-top: 0.24rem;
    padding-bottom: 0.1rem;
    text-align: left;
    font-weight: bold;

  }

  .leftBox > div:nth-child(2), .rightBox > div:nth-child(2) {
    background-color: white;
  }

  .verticalLine {
    border-left: 4px solid rgba(68, 132, 254, 1);
    /*border: 4px solid rgba(68, 132, 254, 1);*/
    height: 0.14rem;
    padding-left: 0.05rem;
    display: inline-block;
  }

  .top50Tab {
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(235, 235, 235, 1);
    text-align: left;
    display: flex;
  }

  .top50Tab > span {
    padding: 0.2rem;
    color: #999999;
    font-weight: bold;
  }

  .top50Tab > span:first-child {
    /*margin-left: 0.2rem;*/
    border-bottom: 2px solid rgba(68, 113, 254, 1);
    color: #333333;
  }

  .img1 {
    width: 150px;
    height: 150px;
  }

  .img2 {
    width: 0.4rem;
    height: 0.4rem;
  }


  /*table>tbody>tr:last-of-type>td {*/
    /*border-bottom: 0*/
  /*}*/

  .my_top50left .el-table::before,.my_top50right .el-table::before{
    height: 0;
  }

  .my_top50left .el-table--enable-row-hover .el-table__body tr:last-of-type>td, .my_top50right .el-table--enable-row-hover .el-table__body tr:last-of-type>td{
    border-bottom: 0
  }

</style>
