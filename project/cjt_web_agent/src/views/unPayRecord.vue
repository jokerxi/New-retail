<template>
    <div class="unPayRecord">
      <!--预付金记录-->
        <div class="PrePayToatl">
            <div>
                <p @click="show">预付周期</p>
                <p class="value">3天</p>
            </div>
            <div>
                <p>每日额度</p>
                <p class="value">￥20000</p>
            </div>
        </div>
        <!-- 记录 -->
        <div class="PrePayRecord">
            <div class="content">
                <div class="div">
                    <div class="name">预付金额</div>
                    <div>￥60000</div>
                </div>
                <div class="div">
                    <div class="name">预付周期</div>
                    <div><span>3天</span><span>2018.8.30-2018.9.1</span></div>
                </div>
                <div class="div">
                    <div class="name">归还进度</div>
                    <div class="Prog">
                        <Progress :percent="percent" hide-info />
                        <div class="text">
                            尚未开始还款
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="PrePayRecord">
            <div class="content">
                <div class="div">
                    <div class="name">预付金额</div>
                    <div>￥60000</div>
                </div>
                <div class="div">
                    <div class="name">预付周期</div>
                    <div><span>3天</span><span>2018.8.30-2018.9.1</span></div>
                </div>
                <div class="div">
                    <div class="name">归还进度</div>
                    <div class="Prog">
                        <Progress :percent="percent1" hide-info />
                        <div class="text color">
                             还款中78%（¥46800）
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="PrePayRecord">
            <div class="content">
                <div class="div">
                    <div class="name">预付金额</div>
                    <div>￥60000</div>
                </div>
                <div class="div">
                    <div class="name">预付周期</div>
                    <div><span>3天</span><span>2018.8.30-2018.9.1</span></div>
                </div>
                <div class="div">
                    <div class="name">归还进度</div>
                    <div class="Prog">
                        <Progress :percent="percent2" hide-info />
                        <div class="text">
                             还款完毕
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'unPayRecord',
  data(){
      return{
          percent: 0,
          percent1: 78,
          percent2: 100,
          prePay:{
            Date: '预付周期',
            money: '预付金额',
            process: '归还进度'
          },
          Borrow:{
            Date: '借款周期',
            money: '借款金额',
            process: '还款进度'
          },
          currentPage: ''
      }
  },
  methods:{
      show(){
           Message.info('This is a info tip');
      }
  }
}
</script>

<style scoped lang="less">
.unPayRecord{
    width: 100%;
    height: 100%;
    background: #ededed;
    .PrePayToatl{
        width: 100%;
        height: 1.7rem;
        background: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        div{
            flex: 1;
            text-align: center;
            height: 1rem;
            &:first-child{
                border-right: 1px solid #e6e6e6
            }
            p{
                font-size:0.3rem;
                font-family:'PingFangSC-Regular';
                font-weight:400;
                color:rgba(119,119,119,1);
                margin: 0.15rem 0;
                &:first-child{
                    margin-top: 0;
                }
                &.value{
                    color: #111;
                }
            }
        }
    }
    // 记录样式
    .PrePayRecord{
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        box-sizing: border-box;
        padding: 0.3rem 0.9rem 0.4rem;
        margin-top: 0.2rem;
        .content{
            .div{
                margin: 0.15rem;
              div{
                display: inline-block;
                &.name{
                    font-size:0.3rem;
                    font-family:'PingFangSC-Regular';
                    font-weight:400;
                    color:rgba(119,119,119,1);
                    line-height:0.08rem;
                    margin-right: 0.34rem;
                }
                &:last-child{
                    color: #111;
                }
                span{
                    margin-right: 0.13rem;
                }
            }
            .Prog{
                width: 3.7rem;
                position: relative;
                .text{
                    position: absolute;
                    font-size:0.24rem;
                    font-family:'PingFangSC-Regular';
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    line-height:0.08rem;
                    left: 0;
                    top: 0.55rem;
                }
                .color{
                    color: #F94F3E;
                }
            }
            }
        }
    }
}
</style>
