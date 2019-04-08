<template>
  <div id="Inventory">
    <p class="inventory-title">库存情况分析</p>
    <div class="swiper-top radius border">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <div class="swp_box">
            <p>整体情况</p>
            <div class="swp_particulars">
              <span>总进价</span>
              <p>￥{{all_purchasing_price}}</p>
              <span>总售价</span>
              <p>￥{{all_selling_price}}</p>
              <span>总库存</span>
              <p>￥{{all_selling_inventory}}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="swp_box">
            <p>整体情况</p>
            <div class="swp_particulars">
              <span>总进价</span>
              <p>￥{{all_purchasing_price}}</p>
              <span>总售价</span>
              <p>￥{{all_selling_price}}</p>
              <span>总库存</span>
              <p>￥{{all_selling_inventory}}</p>
              <span>总库存</span>
              <p>￥{{all_selling_inventory}}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
        <swiper-slide>
          <el-button>默认按钮</el-button>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div class="main_box module_bg">
        <!--表头-->
        <div>
          <p class="font18 bold font_black">库存商品情况分析<span class="staff_text font12 font_gray">商品数<span
            class="font_black">{{staffNum}}</span>件</span></p>
        </div>
        <!--表格-->
        <div>
          <table border="0">
            <!--表头-->
            <tr class="t_head">
              <th class="font_gray">序号</th>
              <th class="font_gray">商品名</th>
              <th class="font_gray">条码
                <div @click="rankTd(0)"><img :src="myIcon[0].src" alt=""></div>
              </th>
              <th class="font_gray">日销量
                <div @click="rankTd(1)"><img :src="myIcon[1].src" alt=""></div>
              </th>
              <th class="cumulative_sales font_gray">
                累积销量
                <div @click="rankTd(2)"><img :src="myIcon[2].src" alt=""></div>
                <div class="block">
                  <el-date-picker
                    class="date_value"
                    v-model="dateValue"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="getToDay">
                  </el-date-picker>
                </div>
              </th>
              <th class="font_gray">库存
                <div @click="rankTd(3)"><img :src="myIcon[3].src" alt=""></div>
              </th>
              <th class="font_gray">进价
                <div @click="rankTd(4)"><img :src="myIcon[4].src" alt=""></div>
              </th>
              <th class="font_gray">进价合计
                <div @click="rankTd(5)"><img :src="myIcon[5].src" alt=""></div>
              </th>
              <th class="font_gray">售价
                <div @click="rankTd(6)"><img :src="myIcon[6].src" alt=""></div>
              </th>
              <th class="font_gray">售价合计
                <div @click="rankTd(7)"><img :src="myIcon[7].src" alt=""></div>
              </th>
              <th class="font_gray t_operation" v-if="tHeadOperation">操作</th>
            </tr>
            <dataAnomaly :loadException="noData"/>
            <!--表身-->
            <tr class="t_body" v-for="(items,index) in tableData.tBody">
              <!--序号-->
              <td v-if="tableData.theNo">{{index+((tablePages.pageState-1)*tablePages.counts)+1}}</td>
              <!--其它各列-->
              <td v-if="items.col01?true:false">{{items.col01}}</td>
              <td v-if="items.col02?true:false">{{items.col02}}</td>
              <td v-if="items.col03?true:false">{{items.col03}}</td>
              <td v-if="items.col04?true:false">{{items.col04}}</td>
              <td v-if="items.col05?true:false">{{items.col05}}</td>
              <td v-if="items.col06?true:false">{{items.col06}}</td>
              <td v-if="items.col07?true:false">{{items.col07}}</td>
              <td v-if="items.col08?true:false">{{items.col08}}</td>
              <td v-if="items.col09?true:false">{{items.col09}}</td>
            </tr>
          </table>
        </div>
        <!--分页-->
        <div class="paging">
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="tablePages.pageState"
              :page-size="tablePages.counts"
              :total="tablePages.total"
              pager-count="8"
              background
              layout="prev, pager, next">
            </el-pagination>
          </div>
          <div class="go_page">
            <input class="radius center" type="number" :placeholder="tablePages.initPage" v-model="tablePages.goPage"
                   @change="pageNum"
                   onkeyup="this.value=this.value.replace(/[^\w]/g,'')">
            <button class="radius font_white" @click="goToPage">跳转</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../assets/css/time.css';

  export default {
    data() {
      return {
        // 控制日期到今天之前
        getToDay: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        noData: false,
        swiperOption: { //swiper3
          speed: 1000,
          slidesPerView: 8,
          spaceBetween: 20,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        all_purchasing_price: 62965355,
        all_selling_price: 9076288,
        all_selling_inventory: 63726925,
        staffNum: '',
        dateValue: '',
        //分页
        tablePages: {
          counts: 10,
          total: 1001,
          totalPage: '',
          // 当前在第几页
          pageState: 1,
          goPage: '',
          initPage: '',
        },
        //表格数据
        myIcon: [
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          },
          {
            code: 0,
            src: '../../static/images/icons/default.png'
          }
        ],
        tableData: {
          theNo: 'true',
          tHeadOperation: '',
          tBody: [
            {
              id: 1,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 2,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 3,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 4,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 5,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 6,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 7,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 8,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 9,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            },
            {
              id: 10,
              col01: '喜羊羊嘻嘻嘻店',
              col02: '2521gh6541fghj645h562',
              col03: '123.45',
              col04: '1234.45',
              col05: '1234',
              col06: '152.45',
              col07: '15265.45',
              col08: '152.45',
              col09: '15245.45'
            }
          ]
        }
      }
    },
    created() {
      this.staffNum = this.tableData.tBody.length
    },
    methods: {
      //分页跳转
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`, this.tableData.length);
        this.tablePages.pageState = val
        var x = (this.tableData.length) % (this.tablePages.counts)
        this.tableData2 = []
        if (this.tableData.length >= this.tablePages.counts) {
          //如果数据总条数大于等于每页展示条数，那么当前页展示每页限制的条数
          if (this.tablePages.pageState == 1) {
            for (var i = 0; i < this.tablePages.counts; i++) {
              this.tableData2.push(this.tableData[i])
            }
          } else {
            if (x == 0) {
              for (var i = (this.tablePages.pageState - 1) * this.tablePages.counts; i < this.tablePages.pageState * this.tablePages.counts; i++) {
                this.tableData2.push(this.tableData[i])
              }
            } else {
              if (this.tablePages.pageState * this.counts <= (this.tableData.length - x)) {
                for (var i = (this.tablePages.pageState - 1) * this.counts; i < this.tablePages.pageState * this.counts; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              } else {
                for (var i = (this.tablePages.pageState - 1) * this.counts; i < (this.tablePages.pageState - 1) * this.tablePages.counts + x; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              }
            }
          }
        } else if (this.tableData.length < this.tablePages.counts) {
          //如果数据总条数小于每页展示条数，那么当前页就直接展示所有数据
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData2.push(this.tableData[i])
          }
        }
      },
      handleSizeChange(val) {
        this.counts = val
        var x = (this.tableData.length) % (this.tablePages.counts)
        console.log(`每页 ${val} 条`, this.tableData.length, x);
        this.tableData2 = []
        if (this.tableData.length >= this.tablePages.counts) {
          //如果数据总条数大于等于每页展示条数，那么当前页展示每页限制的条数
          if (this.tablePages.pageState == 1) {
            for (var i = 0; i < this.tablePages.counts; i++) {
              this.tableData2.push(this.tableData[i])
            }
          } else {
            if (x == 0) {
              for (var i = (this.tablePages.pageState - 1) * this.tablePages.counts; i < this.tablePages.pageState * this.tablePages.counts; i++) {
                this.tableData2.push(this.tableData[i])
              }
            } else {
              if (this.tablePages.pageState * this.tablePages.counts <= (this.tableData.length - x)) {
                for (var i = (this.tablePages.pageState - 1) * this.tablePages.counts; i < this.tablePages.pageState * this.tablePages.counts; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              } else {
                for (var i = (this.tablePages.pageState - 1) * this.tablePages.counts; i < (this.tablePages.pageState - 1) * this.tablePages.counts + x; i++) {
                  this.tableData2.push(this.tableData[i])
                }
              }
            }
          }
        } else if (this.tableData.length < this.tablePages.counts) {
          //如果数据总条数小于每页展示条数，那么当前页就直接展示所有数据
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData2.push(this.tableData[i])
          }
        }
      },
      //输入框分页跳转
      goToPage() {
        console.log(this.tablePages.goPage)
        if (this.tablePages.goPage) {
          this.tablePages.pageState = this.tablePages.goPage
        }
        else {
          this.tablePages.pageState = this.tablePages.initPage
        }
      },
      //输入页数判断
      pageNum() {
        // console.log(this.goPage)
        if (this.tablePages.goPage <= 0 || this.tablePages.goPage > Math.ceil(this.tablePages.total / this.tablePages.counts)) {
          if (this.tablePages.goPage <= 0) {
            this.tablePages.goPage = 1
          }
          else {
            this.tablePages.goPage = this.tablePages.totalPage
            // console.log(this.tablePages.goPage)
          }
        }
      },
      rankTd(num) {
        console.log(num)
        let myIcon = this.myIcon
        let params
        for (let i = 0; i < myIcon.length; i++) {
          if (num == i) {
            if (myIcon[i].code == 0) {
              myIcon[i].code = 1
              myIcon[i].src = '../../static/images/icons/descending.png'
              params = ''
            }
            else if (myIcon[i].code == 1) {
              myIcon[i].code = 2
              myIcon[i].src = '../../static/images/icons/ascending.png'
              params = ''
            }
            else {
              myIcon[i].code = 0
              myIcon[i].src = '../../static/images/icons/default.png'
              params = ''
            }
          }
          else  {
            if (myIcon[i]) {
              myIcon[i].code = 0
              myIcon[i].src = '../../static/images/icons/default.png'
            }
          }
        }
        this.$axios.post('', params)
          .then(res => {

          })
          .catch(err => {

          })
      }
    }
  }

</script>
<style lang="scss">
  // 变量存颜色
  $red: #FF0000;
  $orange: #FFA500;
  $yellow: #FFFF00;
  $green: #008000;
  $bluegreen: #00FFFF;
  $blue: #0000FF;
  $purple: #800080;
  // 总颜色
  $colorlist: $red $orange $yellow $green $bluegreen $blue $purple;

  #Inventory {
    .inventory-title {
      font-size: .16rem;
      font-weight: bold;
      border-left: 2px solid #4471FE;
      padding: 0 .06rem;
      margin-bottom: .14rem;
      z-index: 0;
    }

    .swiper-top {
      position: relative;
      background-color: #ffffff;
      /*width: 16rem;*/

      // 滑块
      .swiper-button-next,
      .swiper-button-prev {
        outline: none;
        height: .4rem;
        width: .16rem;
        background-size: 50%;
        border-radius: 4px;
        border: 1px #E7EEEF solid;
      }

      .swiper-button-prev {
        left: 25px;
      }

      .swiper-button-next {
        right: 31px;
      }

      @media screen and (max-width: 1400px) {
        .swiper-button-prev {
          left: 15px;
        }

        .swiper-button-next {
          right: 15px;
        }
      }

      .swiper-container {
        width: 15rem;

        // border: 1px red solid;
        .swiper-slide {
          display: flex;
          align-items: center;
          padding: 10px 0;

          .swp_box {
            position: relative;
            padding: .2rem;
            width: 1.6rem;
            background-color: #FAFAFA;
            border: 1px solid rgba(231, 238, 239, 1);

            .swp_particulars {
              margin-top: .37rem;
              font-size: .14rem;

              p {
                margin-bottom: .1rem;
              }
            }

            p {
              font-weight: 800;
            }
          }
        }

        .swiper-wrapper {
          .swiper-slide:nth-child(1) {
            .swp_particulars {
              margin-top: 0.6rem;

              p {
                margin-bottom: .2rem;
              }
            }
          }

        }

        // 循环第一个P标签颜色
        @for $i from 1 to length($colorlist)+1 {
          .swiper-slide:nth-child(#{$i}) {
            p:nth-child(1) {
              font-size: .16rem;
              padding-left: .05rem;
              border-left: .03rem nth($colorlist, $i) solid;
            }
          }
        }
      }
    }

    /*控制小三角位置*/
    .el-range__close-icon:before{
      top: .11rem;
    }

    /*大盒子*/
    .main_box {
      width: 100%;
    }

    /*!*表格*!*/

    .main_box table {
      position: relative;
      width: 100%;
      padding-bottom: 0.52rem;
      border-collapse: collapse; /*表格的边框合并，如果相邻，则共用一个边框*/
      border-spacing: 0; /*设置行与单元格边框的间距。当表格边框独立（即border-collapse:separate;）此属性才起作用*/
    }

    /*表头*/
    .t_head {
      padding-left: 0.17rem;
    }

    .t_head th {
      line-height: 0.53rem;
    }

    .t_head th>div:nth-of-type(1){
      width: 13px;
      margin-left: .03rem;
      display: inline;
      vertical-align: middle;
    }

    .cumulative_sales {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
    }

    .cumulative_sales > div:nth-of-type(2) {
      margin-left: .06rem;
    }

    .cumulative_sales .date_value {
      max-height: .3rem;
      max-width: 2.15rem;
      min-width: 180px;
      padding: .03rem .05rem;
    }

    .cumulative_sales .date_value i {
      line-height: initial;
    }

    .cumulative_sales .date_value span {
      height: initial;
    }

    .t_operation {
      text-align: right;
      padding-right: 0.50rem;
    }

    .main_box tr {
      padding-left: 0.17rem;
      /*width: 100%;*/
    }

    /*表身*/
    .t_body td {
      /*padding: 0;*/
      border-top: 0.01rem #e7eeef solid;
      line-height: 0.49rem;
      text-align: center;
    }

    /*操作列*/
    .operation {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
    }

    .operation button {
      line-height: 0.3rem;
      /*flex-grow: 1;*/
      padding-left: 0.12rem;
      padding-right: 0.12rem;
      border: 1px #e7eeef solid;
      background: #fff;
      margin-top: 0.07rem;
      transition: all 300ms linear;
    }

    .operation button:first-of-type {
      margin-right: 0.15rem;
    }

    .operation button:hover {
      background: #4471FE;
      color: white;
      border: 1px #4471FE solid;
      transition: all 300ms linear;
    }

    /*分页*/
    .paging {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      align-items: center;
      text-align: right;
      padding: 0.2rem 0 0.3rem 0;
    }

    /*分页跳转按钮*/
    .go_page > button {
      line-height: 0.3rem;
      padding-left: 0.16rem;
      padding-right: 0.16rem;
      border: 0;
      background: #4471FE;
    }

    /*分页输入框*/
    .go_page > input {
      line-height: 0.3rem;
      width: 0.6rem;
      border: 0.01rem #EAEBF0 solid;
      -moz-appearance: textfield;
    }

    /*更改输入框默认样式*/
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }

    /*表格组件包框*/
    .table_box {
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      min-height: 4.8rem;
      position: relative;
    }

    .table_box > div:nth-of-type(1) {
      padding-top: 0.2rem;
    }

    .staff_text {
      margin-left: 0.18rem;
    }
    margin: .2rem;
  }


</style>
