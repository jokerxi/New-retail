<template>
  <div id="FlowTrendAnalysis">
    <h3>流水趋势分析</h3>
    <div class="FTA">
      <div id="FlowTrendAnalysis-top">
        <RadioGroup @on-change="tabData" class="big-btn" v-model="radio" type="button">
          <Radio class="big-radio-btn" label="累计"></Radio>
          <Radio class="big-radio-btn" label="新增"></Radio>
        </RadioGroup>
        <RadioGroup v-show="ison" class="big-btn2" v-model="radio2" type="button">
          <Radio class="big-radio-btn2" label="今天"></Radio>
          <Radio class="big-radio-btn2" label="昨天"></Radio>
          <Radio class="big-radio-btn2" label="10月8日"></Radio>
          <Radio class="big-radio-btn2" label="10月9日"></Radio>
          <Radio class="big-radio-btn2" label="10月10日"></Radio>
          <Radio class="big-radio-btn2" label="10月11日"></Radio>
          <Radio class="big-radio-btn2" label="10月12日"></Radio>
        </RadioGroup>
        <RadioGroup v-show="!ison" class="big-btn2" v-model="radio3" type="button">
          <Radio class="big-radio-btn2" label="今天"></Radio>
          <Radio class="big-radio-btn2" label="昨天" />
          <Radio class="big-radio-btn2" label="10月8日"></Radio>
          <Radio class="big-radio-btn2" label="10月9日"></Radio>
          <Radio class="big-radio-btn2" label="10月10日"></Radio>
          <Radio class="big-radio-btn2" label="10月11日"></Radio>
          <Radio class="big-radio-btn2" label="10月12日"></Radio>
        </RadioGroup>
        <div class="block">
          <p>日期</p>
          <DatePicker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 200px" :options="options" @on-change="getToDate"></DatePicker>
        </div>
      </div>
      <!-- Echarts -->
      <div class="runningWater-Echarts">
        <div id="runningWater-Echarts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import $axios from 'axios';
export default {
  name: "FlowTrendAnalysis",
  data() {
    return {
      radio: '累计',
      radio2: '今天',
      radio3: '昨天',
      dateTime: '',
      ison: true,
      dateTime: '',
      loading: true,
      // 控制日期选择器到今天
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      data1: [],
      minDate: '',
      ison: true,
      dateTime: '',
      loading: true,
      arrDate: ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'],
    }
  },
  // 挂载之后执行
  mounted() {
    this.getData();
  },
  // 监听echarts数据
  watch: {
    _data: {
      handler(newValue, oldValue) {
        this.RunWaterEcharts();
        // this.loading = true;
      },
      deep: true
    }
  },
  // 函数
  methods: {
    // 获取时间
    getToDate(data, data2) {
      console.log(data, data2)
      var initNum = ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'];
      var arrDate = [];
      var arrDateH = [];
      var date1 = this.dateTime[0];
      var date2 = this.dateTime[1];
      var num = new Date(date2).getDate();
      var min = Math.min(date1, date2);
      var dateInterval = (date2 - date1) / num;
      var date = new Date(date1);
      var D = date.getMonth() + 1 + '月';

      // for (var i = 0; i < Things.length; i++) { // arrDate.push(parseInt(min) + ((i + 1) * dateInterval)); // }

      return this.arrDate = arrDate;
      // if (date1 == date2) {
      //   return this.arrDate = initNum;
      // } else {
      //   for (var i = 0; i < num; i++) {
      //     arrDate.push(new Date(parseInt(min) + ((i + 1) * dateInterval)).getMonth() + 1 + '月' + new Date(parseInt(min) + ((i + 1) * dateInterval)).getDate() + '日');
      //   }
      //   console.log(num);
      //   return this.arrDate = arrDate;
      // }

    },
    // 获取数据
    getData() {
      var st1;
      $axios.get("../../../../../../static/dataJson/run.json")
        .then(res => {
          res.data.forEach(item => {
            this.data1 = item.data1;
            st1 = setTimeout(() => { this.loading = false }, 2e3);
          });
        });
    },
    // 切换
    tabData() {
      var st2;
      window.clearTimeout(st2);
      if (this.radio == '新增') {
        $axios.get("../../../../../../static/dataJson/newrun.json")
          .then(res => {
            res.data.forEach(item => {
              this.data1 = item.data2;
              st2 = setTimeout(() => { this.loading = false }, 3e3);
            });
          });
      } else {
        this.getData();
      }
      this.radio == '累计' ? this.ison = true : this.ison = false;
    },
    RunWaterEcharts() {
      // Echarts
      let RunWaterEcharts = this.$echarts.init(document.getElementById('runningWater-Echarts'));
      let RunWaterContainer = document.getElementById('runningWater-Echarts');
      let RunWaterContainerWin = window.innerWidth;
      let RunWaterContainerH = (RunWaterContainerWin * 0.079) * 0.4125;
      let RunWaterContainerW = RunWaterContainerWin * 0.079;
      var data1 = this.data1;
      var RWD = [{
          name: '整体情况',
          data: [425821816, 38281974, 660042071, 18071371, 262495947, 626453825, 16267738, 432634476, 541461517, 448709534, 361940757, 214743987, 297813798, 312570719, 38424113, 486895040, 200473558, 108262839, 530088808, 46626075, 349367475, 344225451, 476727870, 472911563],
          type: 'line',
          smooth: true,
        },
        {
          name: '线下支付流水',
          data: [145298396, 9210638, 149609955, 423552642, 449667492, 387293741, 246628412, 96002546, 619959432, 364924995, 582423733, 607426796, 389858864, 427740669, 724475887, 419917308, 447697812, 454428918, 222667174, 165251716, 313495095, 533067886, 659859589, 200713329],
          type: 'line',
          smooth: true
        }, {
          name: '未关注顾客流水',
          data: [395714352, 715554136, 217764710, 83294641, 362375989, 490712263, 653061635, 640648412, 560801843, 560210859, 218804878, 233083162, 422594300, 610435335, 221690789, 700109670, 450662446, 413208099, 724168526, 412095445, 194874352, 593607389, 451647047, 470656999],
          type: 'line',
          smooth: true
        }, {
          name: '已关注顾客流水',
          data: [363309327, 9507566, 572493881, 291360687, 559739970, 710400933, 403484338, 295262945, 306839338, 321515900, 152195489, 375836939, 26158866, 486654591, 603356074, 633755833, 569611540, 494498922, 267739334, 195128130, 19558145, 543830332, 621858666, 317461147],
          type: 'line',
          smooth: true
        }, {
          name: '支付宝流水',
          data: [709064532, 53573587, 373474372, 267407502, 481696761, 542900118, 404385010, 686311208, 637651112, 24837803, 691506114, 617529898, 180088639, 45255080, 425183229, 204572347, 574322845, 471320799, 621295534, 683573783, 595477928, 208828236, 186260890, 371922423],
          type: 'line',
          smooth: true
        }, {
          name: '正常活跃顾客流水',
          data: [124453909, 395981415, 132998004, 338250304, 317008247, 190666905, 664235609, 190208650, 99702442, 538119266, 432140442, 533974458, 665364411, 533390328, 365734577, 672641890, 391790407, 751212114, 635362727, 148147191, 379927769, 440645506, 578085737, 427724174],
          type: 'line',
          smooth: true
        }, {
          name: '低风险沉默顾客流水',
          data: [712289968, 688271792, 533857323, 635006491, 247132400, 140219968, 663888599, 740454277, 25854188, 77104182, 467397454, 507668184, 17567832, 36172187, 579734621, 138771623, 89204382, 502475641, 458081807, 525452022, 306248592, 306472551, 208431642, 304380177],
          type: 'line',
          smooth: true
        }, {
          name: '高风险沉默顾客流水',
          data: [493775107, 671426366, 51989961, 164622063, 302852140, 220847226, 25970848, 285846010, 326475761, 189573106, 390274043, 309721590, 499518552, 387816652, 574696237, 434514946, 725168560, 696398983, 468903336, 639619007, 200195195, 596345583, 444069349, 273660145],
          type: 'line',
          smooth: true
        }, {
          name: '风险沉默顾客流水',
          data: [698890271, 151229043, 456569540, 179779369, 175325535, 625108093, 132865324, 33171796, 138295595, 539960207, 31809189, 509370893, 56440574, 735228690, 592712648, 502316959, 528536717, 340084629, 535580130, 466346066, 574379565, 744224470, 607864907, 110618644],
          type: 'line',
          smooth: true
        }, {
          name: '流失顾客流水',
          data: [238278004, 268351693, 531776850, 728744336, 562875350, 541296566, 246548089, 69024262, 124972603, 580600657, 633907023, 138032416, 29985247, 335023571, 719013264, 424046105, 685344764, 294624496, 61804837, 493400096, 460458510, 576927289, 350498401, 653875849],
          type: 'line',
          smooth: true
        }, {
          name: '回流顾客流水',
          data: [259218567, 209928066, 732656556, 347668277, 650256144, 470717431, 502593416, 523826579, 42086069, 575319852, 137984846, 26045028, 708276914, 661221015, 18958275, 540685060, 367474863, 460473182, 470488452, 157865328, 162262922, 255150516, 379914454, 207050611],
          type: 'line',
          smooth: true
        }, {
          name: '低潜力新顾客流水',
          data: [131636413, 494369454, 74486598, 354138181, 369760822, 382615323, 362653514, 108369574, 2925965, 189484722, 205961730, 291241824, 496618281, 124227344, 461753499, 374360998, 534833397, 297207076, 698666142, 17533826, 166606534, 525704202, 40198208, 657445773],
          type: 'line',
          smooth: true
        }, {
          name: '高潜力新顾客流水',
          data: [313457062, 257345908, 160492683, 41987231, 465613786, 240603493, 657889635, 243218993, 30777630, 389421798, 427262609, 419122931, 661771328, 608726422, 325783960, 215064275, 99179798, 278618260, 735991824, 199257835, 609919173, 583865924, 175137429, 97511833],
          type: 'line',
          smooth: true
        },
        {
          name: '普通顾客流水',
          data: [739085640, 57697720, 657280725, 32342831, 318790314, 711952303, 442079589, 83203752, 271973870, 686379284, 599573166, 587733723, 329201941, 700571320, 356715152, 160813577, 733298505, 8685211, 583833329, 297987729, 666628984, 406124743, 290647694, 603237236],
          type: 'line',
          smooth: true
        },
        {
          name: '优质顾客流水',
          data: [575066574, 218933320, 83428381, 87774369, 171386600, 121657207, 585759379, 508550326, 55467658, 246968548, 395419686, 323930507, 135356838, 665497832, 215561544, 87313211, 445846144, 220411142, 713245709, 411525215, 618252058, 439097095, 611598738, 424559494],
          type: 'line',
          smooth: true
        },
        {
          name: '成本趋势',
          data: [130312790, 70079448, 277854049, 208662705, 495071056, 182942517, 522259798, 690177486, 683807306, 452216863, 752286545, 368801717, 450540521, 714213509, 168355373, 738172244, 310240636, 245244857, 734134274, 743239453, 611830123, 724795418, 356515338, 303988900],
          type: 'line',
          smooth: true
        },
        {
          name: '利润趋势',
          data: [232891974, 474419977, 107566421, 35464615, 552626546, 679002331, 358636157, 661105713, 432131599, 351561802, 443567375, 262256406, 324867644, 720183047, 561588407, 684835155, 65750509, 20983459, 391857702, 319912626, 88613097, 33180551, 599219650, 741474923],
          type: 'line',
          smooth: true
        }
      ];
      // 绘图
      RunWaterEcharts.setOption({
        // 调色板
        color: ['#4471FE', '#FFB50D', '#FF7474', '#10CB7C', '#8444FE', '#FE44DA', '#BA8D8D', '#736391', '#384F96', '#B27C00', '#007242', '#EBEB14', '#00B2B2', '#1A837F', '#575757', '#E3A633', '#3C95AA'],
        series: RWD,
        legend: {
          orien: 'horizontal',
          itemWidth: RunWaterContainerW,
          itemHeight: RunWaterContainerH,
          left: 'left',
          icon: 'rect',
          width: '100%',
          top: '1%',
          padding: [5, 0, 0, 15],
          selected: {
            "线下支付流水": false,
            "未关注顾客流水": false,
            "已关注顾客流水": false,
            "支付宝流水": false,
            "正常活跃顾客流水": false,
            "低风险沉默顾客流水": false,
            "高风险沉默顾客流水": false,
            "风险沉默顾客流水": false,
            "流失顾客流水": false,
            "回流顾客流水": false,
            "低潜力新顾客流水": false,
            "高潜力新顾客流水": false,
            "普通顾客流水": false,
            "优质顾客流水": false,
            "成本趋势": false,
            "利润趋势": false
          },
          textStyle: {
            borderRadius: 4,
            align: 'center',
            padding: [-20, 0, 0, -RunWaterContainerW],
            rich: {
              a: {
                fontSize: 12,
                padding: [-25, 0, 0, 1],
                color: '#ffffff',
              },
              b: {
                fontSize: 14,
                padding: [-40, 0, 0, 0],
                lineHeight: 25,
                fontWeight: 800,
                color: '#ffffff'
              }
            }
          },
          formatter: function(name) {
            var res = "";
            for (var i = 0; i < data1.length; i++) {
              if (data1[i].name == name) {
                res = data1[i].value;
              }
            }
            var arr = [
              '{a|' + name + '}',
              '{b|' + res + '}',
            ];
            return arr.join('\n');
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.98)', //通过设置rgba调节背景颜色与透明度
          color: 'black',
          borderColor: 'gray',
          extraCssText: 'box-shadow:0px 3px 5px rgba(0,0,0,0.1)',
          textStyle: {
            color: 'black',
          }
        },
        xAxis: {
          type: 'category',
          data: this.arrDate,
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        grid: {
          top: '28%',
          left: '2%',
          right: '2%',
          bottom: '1%',
          width: '95%',
          containLabel: true
        }
      });
      // 自适应
      window.addEventListener("resize", function() {
        RunWaterEcharts.resize();
      });
    }
  }
}

</script>
<style lang="scss">
#FlowTrendAnalysis {
  h3 {
    position: relative;
    font-size: .16rem;
    font-weight: bold;
    text-indent: .1rem;

    &:before {
      content: "";
      position: absolute;
      top: .06rem;
      left: 0;
      border-left: .04rem #4471FE solid;
      height: .14rem;
    }
  }

  .FTA {
    background-color: #FFFFFF;
  }

  #FlowTrendAnalysis-top {
    position: relative;
    border-radius: 4px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    margin-top: .14rem;
    padding: .24rem .15rem;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 98%;
      border-top: 1px #E7EEEF dashed;
    }

    .big-radio-btn2:before,
    .big-radio-btn2:after,
    .big-radio-btn:before,
    .big-radio-btn:after {
      display: none;
    }

    .block {
      display: flex;

      p {
        padding-right: .1rem;
        line-height: 2.5;
        font-size: 12px;
        margin-left: .3rem;
      }
    }


    .ivu-radio-group-item {
      margin-right: .1rem;
      padding: 0 .2rem;
      border-radius: 14px;
      text-align: center;
    }

    .ivu-radio-group-button .ivu-radio-wrapper {
      position: inherit;
      border: 1px solid #dcdee2;
    }

  }

  // Echarts修改样式
  .runningWater-Echarts {
    width: 100%;
    height: 100%;
  }

  #runningWater-Echarts {
    margin-top: .1rem;
    min-height: 620px;
    width: 100%;
    height: 100%;
  }

  #runningWater-Echarts>div:nth-of-type(1) {
    margin: 0 auto !important;
  }

  // ivu 默认修改
  .ivu-input-icon {
    left: 0;
  }

  .ivu-input {
    text-indent: 20px;
  }

  .ivu-radio-wrapper-checked {
    color: #FFFFFF;
    background-color: #4471FE;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked {
    box-shadow: none;
  }

  .ivu-radio-group-button .ivu-radio-wrapper:after,
  .ivu-radio-group-button .ivu-radio-wrapper:before {
    background: inherit;
  }

}

</style>
