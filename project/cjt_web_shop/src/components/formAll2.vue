<template>
  <!--echars图标组件备份-->

  <div class="outBox">
    
    <div class="formBox1">
      <div class="form1">

        <div class="form1Title font14">
          <div>
            <span class="verticalLine">今日销售额</span>
          </div>
          <div>
            <span>去年今日￥</span>
            <span>12890</span>
          </div>
        </div>
        <div class="form1Msg">
          <div class="font26">
            <span>￥</span><span>12890</span>
          </div>
          <div class="font14">
            <span>上升</span><span>28%</span><i class="fa fa-long-arrow-up" aria-hidden="true"></i>
          </div>
          <div>
            <span>昨天</span><span>￥</span><span>12890</span>
          </div>
        </div>

        <div id="main1"></div>
      </div>
      <div class="form2">
        <div class="form2Title font14">
          <div>
            <span class="verticalLine">今日销售额</span>
          </div>
          <div>
            <span>去年今日￥</span>
            <span>12890</span>
          </div>
        </div>
        <div class="form2Msg">
          <div class="font26">
            <span>￥</span><span>12890</span>
          </div>
          <div class="font14">
            <span>上升</span><span>28%</span><i class="fa fa-long-arrow-up" aria-hidden="true"></i>
          </div>
          <div>
            <span>昨天</span><span>￥</span><span>12890</span>
          </div>
        </div>
        <div id="main2"></div>
      </div>
      <div class="form3">
        <div class="font14">
          <span class="verticalLine">今日客单价</span>
        </div>
        <div>
          <div class="font26"><span>￥</span><span>12980</span></div>
          <div>&nbsp;<span>上升</span><span>128%</span><i class="fa fa-long-arrow-up" aria-hidden="true"></i></div>
        </div>
        <div>
          <div class="font16" style="text-align: left">
            <div>
              <span>昨日</span><i class="fa fa-long-arrow-up" aria-hidden="true"></i>
            </div>
            <div>
              <span>￥</span><span>12980</span>
            </div>
          </div>
          <div class="font16 oldPrice" style="text-align: left">
            <div><span>去年今日</span></div>
            <div>
              <span>￥</span><span>12980</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="formBox2">
      <div>
        <span class="verticalLine font14">一级品类销售占比{{testProp}}/{{testProp2}}</span>
      </div>
      <div class="tabNav font12">
        <div v-for="(item,index) in tabs" :key="index" :class="'tabss'+(index+1)" @click="myClick((index+1))">
          <span>{{item.tabTitle}}</span>
        </div>
      </div>
      <div id="main3"></div>
    </div>

  </div>
</template>

<script>
  var echarts = require('echarts')
  export default {
    name: "form-all2",
    data() {
      return {
        tabs: [
          {tabTitle: '销售额'}, {tabTitle: '销售量'}
        ]
      }
    },
    props: ['testProp', 'testProp2'],
    mounted() {
      var testNum = [200, 100, 30, 100, 50, 80, 120, 102]
      var sum = 0
      for (var x in testNum) {
        sum += testNum[x]
      }
      var myChart1 = echarts.init(document.getElementById('main1'))
      var myChart2 = echarts.init(document.getElementById('main2'))
      var myChart3 = echarts.init(document.getElementById('main3'))
      var option1 = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // calculable : true,
        // color: ['#1fc7bd', '#f6bb42', '#f476af', '#76aff4'],
        // 如果指示线或者指示文字没有特殊给颜色那么会默认继承对应的颜色
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],//饼图在外框中的相对中心位置
            labelLine: {
              normal: {
                length: 50,
                length2: 50,
                lineStyle: {
                  color: "gray" // 此处可以更改指示线的颜色
                }
              }
            },
            label: {
              normal: {
                // a代表大标题，b代表对应展示的内容标题，c代表具体数值，d代表百分比例
                formatter: '{b}{d}%\n\n￥{c}',
                borderWidth: 20,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                padding: [0, -50],
                rich: {
                  a: {
                    // color: 'orange', // 改变对应提示文字的颜色
                    fontSize: 12,
                    lineHeight: 20
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 20,
                    // color: 'black' // 改变对应提示文字的颜色
                  }

                }
              }
            },

            data: [
              {value: 310, name: '支付宝'},
              {value: 234, name: '微信未关注'},
              {value: 135, name: '微信关注'},
              {value: 335, name: '线下'}
            ]
          }
        ]
      };
      var option2 = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // calculable : true,
        // color: ['#1fc7bd', '#f6bb42', '#f476af', '#76aff4'],
        // 如果指示线或者指示文字没有特殊给颜色那么会默认继承对应的颜色
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],//饼图在外框中的相对中心位置
            labelLine: {
              normal: {
                length: 50,
                length2: 50,
                lineStyle: {
                  color: "gray" // 此处可以更改指示线的颜色
                }
              }
            },
            label: {
              normal: {
                // a代表大标题，b代表对应展示的内容标题，c代表具体数值，d代表百分比例
                formatter: '{b}{d}%\n\n￥{c}',
                borderWidth: 20,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                padding: [0, -50],
                rich: {
                  a: {
                    // color: 'orange', // 改变对应提示文字的颜色
                    fontSize: 12,
                    lineHeight: 20
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 20,
                    // color: 'black' // 改变对应提示文字的颜色
                  }

                }
              }
            },

            data: [
              {value: 310, name: '支付宝'},
              {value: 234, name: '微信未关注'},
              {value: 135, name: '微信关注'},
              {value: 335, name: '线下'}
            ]
          }
        ]
      };
      var option3 = {
        color: ['#55b7e5'],
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['食品', '非食品', '生鲜日配', '外租区', '广场家电区', '01食品', '02非食品', '03生鲜日配'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false

            },
            axisLabel: {
              fontSize: 16,
              interval:0

            }
            // show:false

          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false,
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '45%',
            data: testNum,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  distance: 0,// 字体上下移动相应距离
                  textStyle: {
                    color: '#636061',
                    fontSize: 14,
                  },
                  // 以下重点技术需要关注，此处解决了一般柱状图无法显示数值对应的百分比数据
                  formatter: function (params) {
                    // return  (params.value/sum)*100 + '%';
                    return params.seriesName + '\n' + Math.round((params.value / sum) * 1000) / 10 + '%';
                  },
                },
                // 以下的color是可以单独控制每一个柱状图的颜色样式
                // color: function (params) {
                //   var colorList = ['#ff7e50', '#333333', '#ff7e50', '#999999', '#ff7e50', '#ff7e50', '#ff7e50', '#ff7e50']
                //   return colorList[params.dataIndex]
                // }
              }
            }
          }
        ]
      };
      myChart1.setOption(option1)
      myChart2.setOption(option2)
      myChart3.setOption(option3)
      window.addEventListener('resize', function () {
        setTimeout(function () {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
        }, 100)
      })

    },
    methods: {
      myClick(index) {
        var myNode
        for (var i = 0; i < this.tabs.length; i++) {
          myNode = document.getElementsByClassName("tabss" + (i + 1))[0]
          console.log(myNode, '仅供参考')
          myNode.style.color = '#999999'
          myNode.style.borderBottom = '0.015rem solid rgba(68, 132, 254, 0)'
        }
        myNode = document.getElementsByClassName("tabss" + index)[0]
        myNode.style.color = '#333333'
        myNode.style.borderBottom = '0.015rem solid rgba(68, 132, 254, 1)'

        // 如果子组件中的某些数值需要被父组件使用那么就可以利用以下方法（$emit）将值传给父组件
        //   //fatherClcik是父组件中的自定义事件，子组件点击事件触发以后直接触发父组件中对应的自定义事件
        //   //data是传的参数（是一个对象）
        let data = {
          myParam: index,
          allLength: this.tabs.length
        }
        this.$emit('fatherClick', data)
      }
    }
  }
</script>

<style scoped>
  .outBox {
    background-color: rgba(238, 238, 238, 1);
    width: 16.15rem;
    padding-left: 1.44rem;

  }

  /*  以下为第一行饼图的综合样式  */

  .formBox1 {
    /*border:1px solid blue;*/
    width: 16.15rem;
    /*min-width:1366px;*/
    /*margin: 0 auto;*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .form1, .form2 {
    /*border: 1px solid green;*/
    width: 6rem;
  }
  .form2{
    margin: 0 0.2rem;
  }

  .form3 {
    width: 4rem;
    /*border: 1px solid blue;*/
  }

  /*main1,main2是对应具体两个饼图的挂载外框*/
  #main1, #main2 {
    width: 5.9rem;
    height: 2.6rem;
    /*border: 1px solid red;*/
    margin: 0 auto;
    background-color: white;
  }

  #main3 {
    width: 100%;
    height: 4rem;
    /*border: 1px solid blue;*/
    background-color: white;
    margin: 0 auto;
  }

  .form1Title, .form2Title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .verticalLine {
    border-left: 0.04rem solid rgba(68, 132, 254, 1);
    padding-left: 0.05rem;
  }

  .form1Msg, .form2Msg {
    /*border: 1px solid blue;*/
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: baseline;
    padding-top: 0.2rem;
    background-color: white;
  }

  .form1Title, .form2Title {
    /*border:1px solid red;*/
    padding-top: 0.2rem;
    padding-bottom: 0.13rem;
  }

  .form3 > div:first-child {
    text-align: left;
    /*border:1px solid red;*/
    padding-top: 0.2rem;
    padding-bottom: 0.13rem;
  }

  .form3 > div:nth-child(2) {
    /*border:1px solid blue;*/
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 0.6rem;
    padding-left: 0.4rem;
    padding-top: 0.4rem;
    padding-bottom: 0.38rem;
    background-color: white;
  }

  .form3 > div:nth-child(3) {
    /*border:1px solid green;*/
    display: flex;
    height: 0.4rem;
    padding-top: 0.47rem;
    padding-bottom: 0.47rem;
    padding-left: 0.4rem;
    margin-top: 0.25rem;
    background-color: white;
  }

  .oldPrice {
    margin-left: 1.22rem;
  }

  /*  以下为第二行柱形图的相关综合样式  */
  .formBox2{
    /*border:1px solid red;*/
    width: 16.15rem;
  }
  .formBox2 > div:first-child {
    /*border:1px solid blue;*/
    width: 100%;
    margin: 0 auto;
    text-align: left;
    padding-top: 0.24rem;
    padding-bottom: 0.13rem;
    font-weight: bold;
  }

  .formBox2 > div:nth-child(2) {
    /*border:0.01rem solid red;*/
    width: 100%;
    margin: 0 auto;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
  }

  .tabNav > div {
    border-bottom: 0.015rem solid rgba(68, 132, 254, 0);
    padding: 0.2rem 0.32rem;
    font-weight: bold;
    color: #999999;
  }

  .tabNav > div:hover {
    cursor: pointer;
  }

  .tabNav > div:first-child {
    border-bottom: 0.015rem solid rgba(68, 132, 254, 1);
    margin-left: 0.2rem;
    color: #333333;
  }

</style>
