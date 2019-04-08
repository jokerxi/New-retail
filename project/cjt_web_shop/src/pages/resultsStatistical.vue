<template>
  <div id="ResultsStatistical">
    <div class="rebateActivities-top">
      <h5>统计效果</h5>
      <div class="bgTop-img">
        <div class="content-text">
          <p>返利活动内容</p>
          <p>用户购买 百货类商品 返 10% 返利金<span>（限蔬菜类可用）</span></p>
        </div>
      </div>
    </div>
    <div class="rebateActivities-bottom">
      <div class="activityTime">
        <h5>活动时间</h5>
        <!--进度条-->
        <div class="progress">
          <p class="loader-text-end">还剩 {{endTime}} 天结束</p>
          <div class="loader-container">
            <p class="loader-text-star">活动已开始 {{starTime}} 天</p>
          </div>
        </div>
      </div>
      <div class="activityProgress">
        <h5>活动进展</h5>
        <p>共投放<span>￥{{rebateMoney}}</span> 返利金<span>（限蔬菜类可用）</span></p>
        <!-- 进度条 -->
        <div class="progressBar">
          <div class="headTip">
            <div class="tipDistributed" ref="distributedW">发放中 ￥34234</div>
            <div class="tipHaveBeenUsed" ref="haveBeenUsedW">已使用 ￥234243</div>
            <div class="tipHaveExpired" ref="haveExpiredW">已过期 ￥234243</div>
          </div>
          <div class="haveExpired" ref="haveExpiredTW"></div> <!-- 已过期 -->
          <div class="haveBeenUsed" ref="haveBeenUsedTW"></div> <!-- 已使用 -->
          <div class="distributed" ref="distributedTW"></div> <!-- 发放中 -->
        </div>
      </div>
      <!-- echarts 活动成效 -->
      <div class="activity-Result">
        <h5>活动成效</h5>
        <div id="ActivityResultNew"></div>
        <div id="ActivityResultOld"></div>
      </div>
      <div style="clear:both"> </div>
    </div>
  </div>
</template>
<script>
// jshint esversion: 6
export default {
  name: "resultsStatistical",
  data() {
    return {
      starTime: 5,
      endTime: 3,
      rebateMoney: 2342,
    };
  },
  mounted() {
    this.ActivityResultnew();
    // 活动时间
    var activity = 50;
    $(".loader-container").css("width", activity + "%");
    // 活动进展
    var haveBeenUsed = 60;
    var distributed = 30;
    this.$refs.haveBeenUsedTW.style.width = haveBeenUsed + '%';
    this.$refs.distributedTW.style.width = distributed + '%';
    var distributedTW = this.$refs.distributedTW.clientWidth;
    var distributedW = this.$refs.distributedW.clientWidth;
    this.$refs.distributedW.style.marginLeft = (distributedTW - distributedW) / 2 + 'px';

    var haveBeenUsedTW = this.$refs.haveBeenUsedTW.clientWidth;
    var haveBeenUsedW = this.$refs.haveBeenUsedW.clientWidth;
    this.$refs.haveBeenUsedW.style.marginLeft = (haveBeenUsedTW - distributedTW + haveBeenUsedW) / 2 + 'px';

    var haveExpiredTW = this.$refs.haveExpiredTW.clientWidth;
    var haveExpiredW = this.$refs.haveExpiredW.clientWidth;
    this.$refs.haveExpiredW.style.marginLeft = (haveExpiredTW - haveBeenUsedTW + haveExpiredW) / 2 + 'px';
    console.log(haveExpiredTW - distributedTW - haveBeenUsedTW);
  },
  methods: {
    ActivityResultnew() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('ActivityResultNew'));
      let myChart2 = this.$echarts.init(document.getElementById('ActivityResultOld'));
      let xse = '销售额';
      let xsl = '销售量';
      let xseNum = 12.11;
      let xslNum = 12.11;
      let date = 2018;
      let percentum = 12.3;
      // 数据1
      let xseNum1 = 12.11;
      let xslNum1 = 12.11;
      let date1 = 2018;
      let percentum1 = 12.3;
      let red = 'red';
      let green = 'green';
      let up = 'icon-shangshengicon';
      let down = 'icon-xiajiangicon';
      let percentage = [
        '<span style=\"color:' + green + '\">' + percentum + '%' + '<i class="iconfont ' + up + '" style=\"font-size:14px;\"></i></span>',
        '<span style=\"color:' + red + '\">' + percentum + '%' + '<i class="iconfont ' + down + '" style=\"font-size:14px;\"></i></span>'
      ];
      // 数据1
      let percentage1 = [
        '<span style=\"color:' + green + '\">' + percentum + '%' + '<i class="iconfont ' + up + '" style=\"font-size:14px;\"></i></span>',
        '<span style=\"color:' + red + '\">' + percentum + '%' + '<i class="iconfont ' + down + '" style=\"font-size:14px;\"></i></span>'
      ];
      let icon = [
        '<i class="iconfont icon-huodonghou" style=\"display:inline-block;color:#F2DA00;font-size:20px;vertical-align: middle;\"></i>',
        '<i class="iconfont icon-huodonghou" style=\"display:inline-block;color:#299DEF;font-size:20px;vertical-align: middle;\"></i>'
      ];

      // 绘制图表
      myChart.setOption({
        title: {
          text: '百货类商品',
          textStyle: {
            fontSize: 16,
          }
        },
        legend: {
          data: [{
              name: '活动后',
              icon: 'image://../../../static/images/icons/hdh.svg',
            },
            {
              name: '活动前',
              icon: 'image://../../../static/images/icons/hdq.svg'
            }
          ],
          selectedMode: false,
          right: 0,
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.98)', //通过设置rgba调节背景颜色与透明度
          color: 'black',
          borderColor: 'gray',
          extraCssText: 'box-shadow:0px 3px 5px rgba(0,0,0,0.1)',
          padding: [15, 20, 15, 20],
          textStyle: {
            color: 'black',
          },
          formatter: function(params, ticket, callback) {
            var res = date + '.' + params[0].name + '<br/>' + "<div style=\'margin-right:30px;float:left\'>" + icon[0] + params[0].seriesName + '<br/>' + xse + ':' + '￥' + xseNum + '<br/>' + xsl + ':' + '￥' + xslNum + '<br/>' + percentage[0] + "</div>" + "<div style=\'float:right\'>" + icon[1] + params[1].seriesName + '<br/>' + xse + ':' + '￥' + xseNum + '<br/>' + xsl + ':' + '￥' + xslNum + '<br/>' + percentage[1] + "</div>";
            return res;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: ['#000000']
          },
          axisLine: {
            lineStyle: {
              color: ['#E7EEEF']
            }
          },
          data: ['10.11', '10.12', '10.13', '10.14', '10.15']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false,
            inside: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#E7EEEF']
            }
          }
        },
        series: [{
            name: '活动后',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#4471FE'
                }
              }
            }
          },
          {
            name: '活动前',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#F2DA00'
                }
              }
            }
          },
        ]
      });

      myChart2.setOption({
        title: {
          text: '蔬菜类商品',
          textStyle: {
            fontSize: 16,
          }
        },
        legend: {
          data: [{
              name: '活动后',
              icon: 'image://../../../static/images/icons/hdh.svg',
            },
            {
              name: '活动前',
              icon: 'image://../../../static/images/icons/hdq.svg'
            }
          ],
          selectedMode: false,
          right: 0,
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.98)', //通过设置rgba调节背景颜色与透明度
          color: 'black',
          borderColor: 'gray',
          extraCssText: 'box-shadow:0px 3px 5px rgba(0,0,0,0.1)',
          padding: [15, 20, 15, 20],
          textStyle: {
            color: 'black',
          },
          formatter: function(params, ticket, callback) {
            var res = date + '.' + params[0].name + '<br/>' + "<div style=\'margin-right:30px;float:left\'>" + icon[0] + params[0].seriesName + '<br/>' + xse + ':' + '￥' + xseNum + '<br/>' + xsl + ':' + '￥' + xslNum + '<br/>' + percentage[0] + "</div>" + "<div style=\'float:right\'>" + icon[1] + params[1].seriesName + '<br/>' + xse + ':' + '￥' + xseNum + '<br/>' + xsl + ':' + '￥' + xslNum + '<br/>' + percentage[1] + "</div>";
            return res;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: ['#000000']
          },
          axisLine: {
            lineStyle: {
              color: ['#E7EEEF']
            }
          },
          data: ['10.11', '10.12', '10.13', '10.14', '10.15']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false,
            inside: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: ['#E7EEEF']
            }
          }
        },
        series: [{
            name: '活动后',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#4471FE'
                }
              }
            }
          },
          {
            name: '活动前',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#F2DA00'
                }
              }
            }
          },
        ]
      });
      // 自适应
      window.addEventListener("resize", function() {
        myChart.resize();
        myChart2.resize();
      });
    }
  }
};

</script>
<style lang='scss'>
#ResultsStatistical {
  padding: .25rem .2rem;

  h5 {
    margin: 0;
  }

  //头部
  .rebateActivities-top {
    h5 {
      font-size: .2rem;
      text-indent: 4px;
      margin-bottom: .14rem;
    }

    h5:first-child:before {
      content: '';
      position: relative;
      top: 0;
      left: -4px;
      height: 10px;
      border-left: 0.04rem #F2DA00 solid;
    }

    .bgTop-img {
      border-radius: 4px;
      width: 100%;
      height: 1.7rem;
      background-image: url(../../static/images/tj@2x.png);
      background-size: cover;

      .content-text {
        padding: .45rem .4rem;

        p {
          position: relative;
          font-size: .28rem;
          color: #ffffff;
          font-weight: 800;

          span {
            font-size: .2rem;
          }
        }

        p:first-child {
          font-size: .2rem;
          margin-bottom: .15rem;
        }

        p:first-child:before {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: -.1rem;
          border-bottom: 4px #FFFFFF solid;
          width: .16rem;
        }
      }

    }
  }

  //下面
  .rebateActivities-bottom {
    margin-top: 10px;
    padding: 0 .4rem;
    background-color: #FFFFFF;
    border-radius: 4px;

    // 活动时间
    .activityTime {
      padding-top: .3rem;

      h5 {
        font-size: .2rem;
        position: relative;
        width: fit-content;

        &:before {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -.1rem;
          margin: 0 auto;
          border-bottom: 4px #F2DA00 solid;
          width: .16rem;
        }
      }

      //进度条

      .progress {
        position: relative;
        width: 100%;
        height: .2rem;
        margin-top: 0.4rem;
        border-radius: 100px;
        background: -webkit-linear-gradient(left, #e4e3e4, #e4e5e4);
        background: -moz-linear-gradient(left, #e4e3e4, #e4e5e4);
        background: -o-linear-gradient(left, #e4e3e4, #e4e5e4);
        background: -ms-linear-gradient(left, #e4e3e4, #e4e5e4);
        background: linear-gradient(left, #e4e3e4, #e4e5e4);

        &:before {
          content: '';
          position: absolute;
          width: 100%;
          bottom: -16px;
          left: 0;
          border-bottom: 1px #E7EEEF solid;
        }

        .loader-text-end {
          position: absolute;
          top: -.4rem;
          right: 0;
          padding: 0 .1rem;
          height: .26rem;
          line-height: .26rem;
          text-align: center;
          width: 1.4rem;
          font-size: .14rem;
          color: #FFFFFF;
          border-radius: 10px;
          background-color: #4471FE;
          z-index: 1;
        }

        .loader-container {
          position: relative;
          height: 100%;
          width: 0%;
          background: -webkit-linear-gradient(right, rgba(232, 179, 0, 1) 0%, rgba(242, 218, 0, 1) 100%);
          background: -o-linear-gradient(right, rgba(232, 179, 0, 1) 0%, rgba(242, 218, 0, 1) 100%);
          background: linear-gradient(to left, rgba(232, 179, 0, 1) 0%, rgba(242, 218, 0, 1) 100%);
          border-radius: 100px;
          transition: all 1s linear;

          .loader-text-star {
            position: absolute;
            top: -.4rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            padding: 0 .1rem;
            height: .26rem;
            line-height: .26rem;
            text-align: center;
            width: 1.4rem;
            font-size: .14rem;
            color: #FFFFFF;
            border-radius: 10px;
            background-color: #E8B300;
            z-index: 1;

            &:before {
              position: absolute;
              left: 0;
              right: 0;
              bottom: -4px;
              margin: 0 auto;
              content: '';
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid #E8B300;
              z-index: -1;
            }
          }
        }
      }
    }

    // 活动进展
    .activityProgress {
      height: 2rem;
      margin-top: .6rem;

      h5 {
        font-size: .2rem;
        position: relative;
        width: fit-content;
        margin-bottom: .2rem;

        &:before {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -.1rem;
          margin: 0 auto;
          border-bottom: 4px #F2DA00 solid;
          width: .16rem;
        }
      }


      p {
        font-size: .28rem;
        font-weight: 800;

        span {
          font-size: .2rem;

          &:first-child {
            font-size: .28rem;
            color: #F2DA00;
          }
        }
      }

      // 活动进展进度条
      .progressBar {
        position: relative;
        height: 1rem;
        margin-top: .2rem;
        width: 100%;

        // tip
        .headTip {

          .tipDistributed,
          .tipHaveBeenUsed,
          .tipHaveExpired {
            position: relative;
            float: left;
            color: #FFFFFF;
            height: .26rem;
            border-radius: 20px;
            padding: .02rem .1rem;
            line-height: .26rem;
          }

          .tipDistributed:before,
          .tipHaveBeenUsed:before,
          .tipHaveExpired:before {
            position: absolute;
            top: 0.26rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            content: '';
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #E8B300;
          }

          .tipDistributed:before {
            border-top: 8px solid #F2DA00;
          }

          .tipHaveExpired:before {
            border-top: 8px solid #D8D8D8;
          }

          .tipDistributed {
            background-color: #F2DA00;
          }

          .tipHaveBeenUsed {
            background-color: #E8B300;
          }

          .tipHaveExpired {
            background-color: #D8D8D8;
          }
        }

        .haveExpired,
        .distributed,
        .haveBeenUsed {
          position: absolute;
          top: 0;
          left: 0;
          margin-top: .45rem;
          height: .2rem;
          background-color: #D8D8D8;
          border-radius: 100px;
          transition: all 1s linear;
        }

        .haveExpired {
          width: 100%;
        }

        .distributed {
          background-color: #F2DA00;
        }

        .haveBeenUsed {
          background-color: #E8B300;
        }
      }

    }

    .activity-Result {
      h5 {
        margin: 0.3rem 0;
        font-size: .2rem;
        position: relative;
        width: fit-content;

        &:before {
          content: ' ';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -.1rem;
          margin: 0 auto;
          border-bottom: 4px #F2DA00 solid;
          width: .16rem;
        }
      }

      #ActivityResultNew,
      #ActivityResultOld {
        width: 50%;
        height: 4rem;
        float: left;

        div:first-child {
          margin: 0 auto !important;
        }
      }
    }
  }
}

</style>
