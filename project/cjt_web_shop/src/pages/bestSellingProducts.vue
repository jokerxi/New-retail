<template>
  <div id="bestSellingProducts">
    <!-- 畅销品设置分析 -->
    <div class="content_box">
      <p class="my_title">{{title_name}}</p>
      <div class="flex_box">
        <div class="flex_box_items">
          <p>{{title_category}}</p>
          <el-select popper-append-to-body="false" class="select_list" v-model="category" filterable placeholder="请选择">
            <el-option size="small" v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="flex_box_items">
          <p>{{title_supplier}}</p>
          <el-select class="select_list" v-model="supplier" filterable placeholder="请选择">
            <el-option size="small" v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="flex_box_items">
          <el-input class="y_input" size="small" placeholder="请输入姓名、电话" prefix-icon="el-icon-search" v-model="myInput">
          </el-input>
        </div>
        <div class="flex_box_items">
          <el-button class="query_btn" size="small" type="primary">查看</el-button>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div>
        <p class="font18 bold font_black">畅销品缺货分析<span class="staff_text font12 font_gray">缺货商品数<span
          class="font_black">{{staffNum}}</span>件</span></p>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tableData="theTable.data" v-on:rankAxios="myRank"></synthesize-table>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
import '../assets/css/time.css';

export default {
  name: 'bestSellingProducts',

  data() {
    return {
      title_name: '畅销品缺货查询',
      title_category: '品类',
      title_supplier: '供应商',
      myInput: '',
      options1: [{
        value: '选项1',
        label: '食品'
      }, {
        value: '选项2',
        label: '易燃易爆品'
      }, {
        value: '选项3',
        label: '日用品'
      }, {
        value: '选项4',
        label: '文具用品'
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
              text: '条码'
            },
            {
              text: '供应商'
            },
            {
              text: '进价',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '售价',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '系统毛利',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '近30天日均销量',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '剩余库存',
              myIcon: {
                code: 0,
                src: '../../static/images/icons/default.png'
              }
            },
            {
              text: '建议进货量'
            }
          ],
          tBody: [{
              id: 1,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 2,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 3,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 4,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 5,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 6,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 7,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 8,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 9,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            },
            {
              id: 10,
              col01: '小美美的玩具',
              col02: '123456716a52d890a5d131',
              col03: '嘻嘻商/哈哈商',
              col04: '1234.56',
              col05: '1243.56',
              col06: '12.56',
              col07: '123',
              col08: '嘻嘻仓-500/蛤蛤仓-600',
              col09: '234',
            }
          ]
        }
      }
    };
  },
  created() {
    this.staffNum = this.theTable.data.tBody.length
  },
  mounted() {
    $('.el-icon-arrow-up').attr('class', 'iconfont icon-tuichuxialasanjiao2');
    $('.el-icon-search').attr('class', 'iconfont icon-sousuoicon')
  },
  methods: {
    // setting(){
    //  this.$router.push('/paymentCode')
    // }
    //  表格请求事件
    myRank(index) {
      console.log(index)
    }
  }
};

</script>
<style lang='scss' scoped>
p {
  margin: 0;
}

#bestSellingProducts {
  padding: .24rem .2rem;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #ffffff;
  background-color: #4471FE;
}

.el-select-dropdown__item {
  font-size: .14rem;
  margin: 0 2px;
  border-radius: 4px;
}

.content_box {
  background-image: url(../../static/images/bg@2x-2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-right: 4px;
  padding: .44rem 0 .43rem .6rem;
  color: #ffffff;
}

.my_title {
  font-size: 0.18rem;
  font-weight: bold;
  line-height: 0.34rem;
  margin: 0rem;
  margin-bottom: .2rem;
}

.flex_box {
  display: flex;
  align-items: flex-end;
}

.flex_box_items+.flex_box_items {
  margin-left: .2rem;
}

.flex_box_items>p {
  margin-bottom: .11rem;
  font-size: .14rem;
  font-weight: bold;
}

.select_list {
  width: 1.34rem;
  border-radius: .04rem;
}

.y_input {
  width: 3.8rem;
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
