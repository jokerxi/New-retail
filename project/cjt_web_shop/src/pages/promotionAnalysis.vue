<template>
  <div id="promotionAnalysis">
    <!-- 促销商品查询 -->
    <div class="Analysis_box radius">
      <div class="content_box">
        <p>{{title_name}}</p>
        <div class="date_box">
          <div class="date_box1">
            <span class="sam_title">{{chk_date}}</span>
            <el-date-picker
              class="my_date"
              size='small'
              clear-icon=''
              v-model="value13"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="getToDay">
            </el-date-picker>
          </div>
          <div class="date_box1">
            <span class="sam_title">{{chk_category}}</span>
            <el-select class="select_list" v-model="category" placeholder placeholder="请选择">
              <el-option size="small" v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="date_box1">
            <span class="sam_title">{{chk_supplier}}</span>
            <el-select class="select_list" v-model="supplier" placeholder placeholder="请选择">
              <el-option size="small" v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="date_box1">
            <el-input size="small" placeholder="请输入姓名、电话" prefix-icon="el-icon-search" v-model="input1">
            </el-input>
          </div>
          <div class="date_box1">
            <el-button class="query_btn" size="small" type="primary">查看</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">促销商品列表<span class="staff_text font12 font_gray">促销商品数<span
          class="font_black">{{staffNum}}</span>件</span></p>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tableData="theTable.data" v-on:rankAxios="myRank" v-if="isRouterAlive"></synthesize-table>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
import '../assets/css/time.css';

export default {
  name: 'promotionAnalysis',
  data() {
    return {
      // 控制日期到今天之前
      getToDay: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      title_name: '促销商品查询',
      chk_date: '选择时间',
      chk_category: '品类',
      chk_supplier: '供应商',
      value13: '',
      input1: '',
      options: [{
        value: '选项1',
        label: '生活用品'
      }, {
        value: '选项2',
        label: '食品'
      }, {
        value: '选项3',
        label: '日用品'
      }, {
        value: '选项4',
        label: '文具用品'
      }, {
        value: '选项5',
        label: '零食类'
      }],
      category: '',
      options2: [{
        value: '选项1',
        label: '超集通'
      }, {
        value: '选项2',
        label: '欣欣副食'
      }, {
        value: '选项3',
        label: '国庆杂货铺'
      }, {
        value: '选项4',
        label: '龙须文具'
      }, {
        value: '选项5',
        label: '国庆食品城'
      }],
      supplier: '',
      staffNum: '',
      theTable: {
        pages: {
          counts: 10,
          total: 1001,
          totalPage: '',
          // 当前在第几页
          pageState: 1,
          goPage: '',
          initPage: '',
        },
        //表格数据
        data: {
          theNo: 'true',
          tHead: [{
              text: '序号'
            },
            {
              text: '商品名'
            },
            {
              text: '原价',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '促销价',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '促销时间'
            },
            {
              text: '促销期间总销售额/销量',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '促销期间日均销售额/销量',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '促销前n天日均销售额/销量',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '销售额/销量涨跌幅',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '促销状态'
            }
          ],
          tBody: [{
              id: 1,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 2,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 3,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 4,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 5,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 6,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 7,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 8,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 9,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            },
            {
              id: 10,
              col01: '喜羊羊嘻嘻嘻棒棒糖',
              col02: '152.23',
              col03: '122.34',
              col04: '2018.01.01/23:00-2018.01.01/23:00',
              col05: '1523.45/256',
              col06: '1523.45/256',
              col07: '1523.45/256',
              col08: '20%/30%',
              col09: '数据分析中'
            }
          ]
        }
      },
      isRouterAlive: false
    };
  },
  created() {
    this.staffNum = this.theTable.data.tBody.length;
    setTimeout(this.$nextTick(() => (this.isRouterAlive = true)), 0)
  },
  mounted() {
    $('.el-icon-arrow-up').attr('class', 'iconfont icon-tuichuxialasanjiao2');
    $('.el-icon-search').attr('class', 'iconfont icon-sousuoicon')
  },
  methods: {
    //  表格请求事件
    myRank(index) {
      console.log(index)
    }
  }
};

</script>
<style>
.el-range__close-icon:before {
  content: '';
  position: absolute;
  top: .15rem;
  background: url(../../static/images/icons/downicon@2x.png) no-repeat;
  background-size: 100%;
  width: .1rem;
  height: .1rem;
}

</style>
<style scoped>
#promotionAnalysis {
  padding: .24rem .2rem;
}

.Analysis_box {
  background-image: url(../../static/images/bg@2x-3.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: .44rem 0 .43rem .6rem;
  color: #ffffff;
  z-index: -1;
}

.content_box>p {
  margin: 0;
  margin-bottom: .29rem;
  font-size: 0.18rem;
  font-weight: bold;
}

.sam_title {
  margin-bottom: .11rem;
  display: block;
  font-size: .14rem;
  font-weight: bold;
}

.my_date {
  width: 3rem;
  height: .4rem;
  border-radius: .04rem;
}

.bg-purple {
  margin-top: .29rem;
}

.bg-purple {
  margin-top: .29rem;
}

.select_list {
  width: 1.34rem;
  border-radius: .04rem;
}

.date_box {
  display: flex;
  align-items: flex-end;
}

.date_box1+.date_box1 {
  margin-left: .2rem;
}

.el-input {
  font-size: 0.14rem;
}

.my_date .el-range-editor .el-input__inner {
  padding: .03rem .1rem;
  align-items: center;
}

.select_list {
  width: 1.34rem;
  border-radius: .04rem;
}

.date_box {
  display: flex;
  flex-flow: row;
  align-items: flex-end;
}

.date_box1+.date_box1 {
  margin-left: .2rem;
}

.el-input {
  font-size: 0.14rem;
}

.my_date .el-range-editor .el-input__inner {
  padding: .03rem .1rem;
  align-items: center;
}

/*表格组件包框*/
.table_box {
  margin-top: 0.1rem;
  padding: 0 0.2rem;
}

.table_box>div:nth-of-type(1) {
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
