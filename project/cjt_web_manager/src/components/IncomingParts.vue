<template>
    <div class="IncomingParts">
        <!-- 进件 -->
        <div class="add_IncomingParts">
            <div class="add_enter" v-for="Income in btnList" :class="Income.flag" :key="Income.channelId">
                <span>{{Income.channelName}}</span>
                <span v-show="Income.status == 1 && types == 'sub'">进件成功<span class="join_icon iconfont icon-chenggong"></span></span>
                <span v-show="Income.status == 1 && types == 'shop'">
                    <span v-if="selected && current == Income.channelId">选择中<span class="join_icon iconfont icon-chenggong"></span></span>
                    <span @click="OpenModal1(Income)" v-else>选择<span class="join_icon iconfont icon-xialaicon"></span></span>
                </span>
                <span v-show="Income.status == 2">审核中<span class="join_icon iconfont icon-shenhezhong"></span></span>
                <span @click="OpenModal(Income)" v-show="Income.status == 3">失败<span class="join_icon iconfont icon-shenhezhong"></span></span>
                <span @click="OpenModal1(Income)" v-show="Income.status == 99">进件<span class="join_icon iconfont icon-xialaicon"></span></span>
            </div>
        </div>
        <Modal v-model="Income" width="330" class-name="PImodal">
            <div style="text-align:center;margin:30px 20px 5px;line-height:25px">
                <p>{{text}}</p>
            </div>
            <div slot="footer">
              <Button type="primary" @click="closeModal">确定</Button>
            </div>
        </Modal>
        <Modal v-model="Income1" width="330" class-name="PImodal">
            <div style="text-align:center;margin:40px 20px 5px;line-height:25px">
                <p>{{text}}</p>
            </div>
            <div slot="footer">
              <Button type="primary" @click="closeModal1">取消</Button>
              <Button type="primary" @click="JoinHandle">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "IncomingParts",
        props:{
            list:{
                type:Array,
                default:() => {
                    return []
                }
            },
            shopname:{
                type:String,
                default:''
            },
            types:{
                type:String,
                default:''
            }
        },
        watch:{
            list:function(newVal,oldVal){
              this.btnList = newVal
            },
            shopname:function(newVal,oldVal){
                this.shopName = newVal
            }
        },
        data() {
            return {
                btnList:[],
                shopName:'',
                text:'',
                status:'',
                selected:false,
                Income:false,
                Income1:false,
                channelId:'',
                current:''
            }
        },
        methods: {
            // 打开模态框
            OpenModal(item){
                if(item.status == 3){
                    this.text = '由于'+item.reason +'进件失败，请调整无误后再重新进件'
                }
              this.Income = true
            },
            // 关闭模态框
            closeModal(){
             this.Income = false
            },
            OpenModal1(item){
             this.Income1 = true
             this.current = item.channelId
             this.status = item.status
              if(item.status == 99){
                  this.channelId=item.channelId
                    this.text = '点击确定将会为'+this.shopName+'进件'+item.channelName + '是否继续？'
                } else if(item.status == 1){
                    this.text = '选择后，该店铺的支付通道则为'+item.channelName +',是否继续？'
                }
            },
            closeModal1(){  
             this.Income1 = false
            },
            JoinHandle(){
              if(this.status == 99){
                this.$emit('Incomehandle',this.channelId)
              } else if(this.status == 1){
                  this.selected = true
              }
              this.Income1 = false
            }
        }

    }
</script>


<style type="text/scss" lang="scss">
    .IncomingParts {
        .add_IncomingParts {
            width: 100%;
            font-size: 0.28rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #ffffff;
            display: flex;
            justify-content: space-between;

            .official {
                background: url(../../static/image/official.png) no-repeat;
            }

            .yop {
                background: url(../../static/image/yibaobg@2x.png) no-repeat;
            }

            .add_enter {
                width: 49%;
                background-size: 100% 100%;
                padding: 0.46rem 0.24rem 0.46rem 0.82rem;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                border-radius: 4px;
            }

            .add_enter>span:nth-of-type(1){
                cursor: pointer;
            }

            .add_enter>span:last-of-type{
                cursor: pointer;
                display: flex;
                align-items: center;
                font-weight: initial;
            }

            .join_icon{
                margin-left: 0.123rem;
                font-size: inherit;
            }
        }
    }
    .PImodal{
        .ivu-modal-footer{
            text-align: center
        }
    }

</style>
