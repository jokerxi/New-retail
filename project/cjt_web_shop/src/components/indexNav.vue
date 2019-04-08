<template>
  <div class="index_nav">

<!--ceo之外职位的导航条-->

          <div class="logo_box">
            <div class="logo"></div>
            <div class="my_font">叮当会员商家后台</div>
          </div>


          <div class="nav_list">
            <div v-for="(item,index) in msg" :key="index" :class="'nav_list'+(index+1)" @click="myClick((index+1))">
              <div :class="'change_page_btn'+(index+1)" v-show="$store.state.tabShow1==(index+1)" :style="{backgroundImage:'url('+item.urlA+')'}"></div>
              <div :class="'change_page_btns'+(index+1)" v-show="$store.state.tabShow1!=(index+1)" :style="{backgroundImage:'url('+item.urlB+')'}"></div>
              <div>{{item.title}}</div>
            </div>
          </div>



          <div class="user_box">
            <div class="change_store">
              <span>喜洋洋连锁</span>
              <span>喜洋杭州店</span>
              <button @click="dialogTableVisible = true">连锁切换</button>
              <el-dialog title="切换店铺" :visible.sync="dialogTableVisible" append-to-body align="left" class="my_dialog">
                <el-table :data="gridData" max-height="360">
                  <el-table-column property="name" label="名称" align="center"></el-table-column>
                  <el-table-column property="rank" label="身份" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <!--<el-button type="primary change_btn" slot="reference">切换</el-button>-->
                      <span class="btn_style font14" @click="changeBtn(scope.$index)">切换</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
            </div>

            <div class="user_name">
              <div @click="userExit()">
                <span>叮当会员</span>
                <i class="fa fa-caret-down icon_down" aria-hidden="true"></i>
              </div>
              <div class="user_exit">
                退出账号
                <i class="iconfont icon-tuichuxialasanjiao"></i>
              </div>
            </div>
            <div class="user_head"></div>

          </div>



  </div>
</template>

<script>

  export default {
    name: "index-nav",
    data() {
      return {
        // 模态框弹出内容
        // tabShow1: 1, //控制切换页面的图标状态的变量
        gridData: [{
          rank: '局长',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
          {
            rank: '省长',
            name: '王小虎ddddddd',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '主任',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            rank: '老百姓',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        dialogTableVisible: false,
        //
        msg: [
          {title: '首页',urlA:'../../static/images/icons/icon1.png',urlB:'../../static/images/icons/icon6.png'},
          {title: '店铺',urlA:'../../static/images/icons/icon4.png',urlB:'../../static/images/icons/icon2.png'},
          {title: '账号',urlA:'../../static/images/icons/icon7.png',urlB:'../../static/images/icons/icon3.png'}
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        stateNum: true
      }

    },
    created() {
    },
    methods: {
      myClick(index) {
        console.log(this.msg.length)
        var changeLine
        for (var i = 0; i < this.msg.length; i++) {
          changeLine = document.querySelectorAll(".nav_list" + (i + 1))
          changeLine[0].style.borderBottom = "2px solid rgba(0,0,0,0)"
          changeLine[0].style.backgroundColor = "rgba(255,255,255,0)"

        }

        this.$store.commit('getUsercount', index)

        changeLine = document.querySelectorAll(".nav_list" + index)
        changeLine[0].style.borderBottom = "2px solid rgba(10,132,255,1)"
        changeLine[0].style.backgroundColor = "rgba(0, 97, 226, 0.05)"


        // if(index==1){
        //   this.$router.push('/indexceo')
        // }else if(index==2){
        //   this.$router.push('/shoplist')
        // }else {
        //   this.$router.push('/myareaManager')
        // }


      },
      userExit() {
        if (this.stateNum == true) {
          document.querySelectorAll(".user_exit")[0].style.opacity = "0"
          this.stateNum = false
        } else {
          document.querySelectorAll(".user_exit")[0].style.opacity = "1"
          this.stateNum = true
        }
      },
      changeBtn(a) {
        console.log(a, '哈哈')
        var arr1 = document.getElementsByClassName('btn_style')
        var myBtn = document.getElementsByClassName('btn_style')[a]
        console.log(arr1, myBtn)


        // 以下是体现按钮选中或者未选中时的不同颜色状态
        // for (var i = 0; i < arr1.length; i++) {
        //   arr1[i].style.border = '1px solid rgba(235,235,235,1)'
        //   arr1[i].style.backgroundColor = 'white'
        //   arr1[i].style.color = '#333333'
        // }

        // myBtn.style.border = '1px solid rgba(68,113,254,1)'
        // myBtn.style.backgroundColor = 'rgba(68,113,254,1)'
        // myBtn.style.color = 'white'
      }
    }
  }
</script>

<style scoped>
  @import "../assets/font-awesome-4.7.0/css/font-awesome.min.css";
  /*导航栏样式*/

  /*导航栏样式*/
  .index_nav{
    border-bottom:1px solid #F5F5F5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .logo_box {
    /*border:1px solid red;*/
    display: flex;
    flex-wrap: nowrap;
    justify-content: left;
    align-items: center;
    margin-left: 0.2rem;
  }

  .logo {
    width: 0.4rem;
    height: 0.4rem;
    background-image: url("../../static/images/icons/icon5.png");
    background-size: cover;
  }

  .my_font {
    font-size: 0.22rem;
    margin-left: 0.15rem;
  }

  .nav_list {
    /*border:1px solid blue;*/
    font-size: 0.12rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
  }

  .nav_list1 {
    border-bottom: 1px solid #4471FE;
    width: 1.2rem;
    height: 0.8rem;
    text-align: center;
    background-color: rgba(0, 97, 226, 0.05);
  }

  .nav_list1:hover, .nav_list2:hover, .nav_list3:hover {
    cursor: pointer;
  }

  .nav_list2, .nav_list3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    width: 1.2rem;
    height: 0.8rem;
    text-align: center;
    background-color: rgba(255, 255, 255, 0);
  }

  .nav_list1 > div:first-child, .nav_list2 > div:first-child, .nav_list3 > div:first-child {
    /*border:1px solid red;*/
    width: 0.24rem;
    height: 0.24rem;
    margin: 0 auto;
    margin-top: 0.2rem;
  }

  .nav_list1 > div:nth-child(2), .nav_list2 > div:nth-child(2), .nav_list3 > div:nth-child(2) {
    width: 0.24rem;
    height: 0.24rem;
    margin: 0 auto;
    margin-top: 0.2rem;
  }

  .nav_list1 > div:first-child {
    background-size: cover;
  }

  .nav_list2 > div:first-child {
    background-size: cover;
  }

  .nav_list3 > div:first-child {
    background-size: cover;
  }

  .nav_list1 > div:nth-child(2) {
    background-size: cover;
  }

  .nav_list2 > div:nth-child(2) {
    background-size: cover;
  }

  .nav_list3 > div:nth-child(2) {
    background-size: cover;
  }

  .user_box {
    /*border:1px solid red;*/
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
  }

  .change_store {
    /*border: 1px solid red;*/
    height: 0.8rem;
    font-size: 0.12rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /*margin-right: 0.2rem;*/

  }

  .change_store > span {
    /*border: 1px solid red;*/
    padding: 0 0.1rem;
  }
  .change_store>span:first-child{
    border-right:2px solid rgba(235,235,235,1);
  }

  .change_store > button {
    border: 1px solid rgba(235,235,235,1);
    /*border: 0.01rem solid red;*/
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0);
    font-size: 12px;
    padding: 0.06rem 0.15rem;
    margin-left: 0.1rem;
  }

  .change_store > button:hover {
    cursor: pointer;
  }

  .user_name {
    /*border:1px solid red;*/
    font-size: 0.14rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
  }

  .user_name:hover {
    cursor: pointer;
  }

  .icon_down {
    margin-left: 0.1rem;
    color: rgb(68, 113, 254);
    font-size: 16px;
  }

  .user_head {
    /*border:1px solid blue;*/
    width: 0.46rem;
    height: 0.46rem;
    border: 1px solid lightblue;
    border-radius: 0.23rem;
    background-image: url("../../static/images/img1.jpg");
    background-size: cover;
    margin-left: 0.14rem;
    margin-right: 0.2rem;

  }

  .user_exit {
    border: 0;
    background: #4471FE;
    color: white;
    font-size: 0.14rem;
    border-radius: 0.04rem;
    position: absolute;
    top: 0.5rem;
    margin-top: 0.08rem;
    text-align: center;
    line-height: 0.26rem;
    padding-left: 0.12rem;
    padding-right: 0.12rem;
  }

  .change_btn {
    /*background: #4471FE;*/
    /*border:1px solid blue;*/
    width: 0.6rem;
    line-height: 0.3rem;
    padding: 0
  }

  .icon-tuichuxialasanjiao {
    color: rgb(68, 113, 254);
    position: absolute;
    font-size: 0.14rem;
    top: -0.12rem;
    left: calc(50% - 0.08rem);
  }

  .btn_style {
    border: 1px solid rgba(235, 235, 235, 1);
    border-radius: 4px;
    background-color: white;
    padding: 0.08rem 0.16rem;
    color: #333333;
  }

  .btn_style:hover {
    border: 1px solid rgba(68, 113, 254, 1);
    background-color: rgba(68, 113, 254, 1);
    color: white;
    cursor: pointer;

  }

  /*以下代码是控制模态框的样式设置*/


</style>
