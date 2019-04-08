<template>
    <div class="payRoad">
        <!-- 支付通道 -->
        <div class="prShoupTitle">店铺列表</div>
        <div v-for="(item,index) in payChannelList" :key="index">
            <div class="prTitle prCss">
                <p>{{item.channelName}}</p><p>规则</p><p>费用比例</p><p>成本</p><p class="caozuo">操作</p>
            </div> 
            <div v-for="(Child,index) in item.suns" :key="index" class="prContent prCss">   
                
                <div class="prImgBox">
                    <div class="prImg">
                        <img v-show="Child.channelName == '微信'" src="../../../../static/image/wx@2x.png" alt="微信">
                        <img v-show="Child.channelName == '支付宝'" src="../../../../static/image/zfb@2x.png" alt="支付宝">
                    </div>
                    <span>{{Child.channelName}}官方通道</span>
                </div>
                <div class="prXian guize"><p>{{Child.rules}}</p></div>
                <div class="prXian myWidth">{{Child.proportion}}%</div>
                <div class="prXian myWidth">￥{{Child.cost}}</div>
                <div class="prXian caozuo"><Button @click="OpenModal(Child)" class="prBtn">编辑</Button></div>
            </div>
        </div>
        <!-- 弹框 -->
        <div>
            <Modal
                v-model="revise"
                :title="title"
                width="330"
                class-name="PRmodal">
                <div class="CScontent">
                    <Form :model="formValidate" :rules="ruleValidate" label-position="top" :label-width="50">
                        <FormItem label="规则:" prop="rules" >
                            <Input v-model="formValidate.rules" type="textarea" :autosize="{minRows: 5,maxRows: 15}" placeholder="Enter "></Input>
                        </FormItem>              
                    </Form>
                </div>
                <div slot="footer">
                    <Button style="margin-left: 8px" @click="CloseModal">取消</Button>
                    <Button type="primary" @click="SaveHandle">保存</Button>                  
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { PayChannelList, payChannelSave } from '../../../api/finance'
export default {
    name: "payRoad",
    data(){
        return{
            revise: false,
            payChannelList:[],
            title:'',
            formValidate:{
                rules:'',
                id:'',
            },
            ruleValidate:{
                desc: [
                        { required: true, message: '规则不能为空', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            }      
        }
    },
    created(){
       this.getPayChannelList();
    },
    methods: {
    //   获取通道列表
      getPayChannelList(payload){
          return new Promise((resolve,reject) => {
              PayChannelList(payload).then(res => {
                  if(res.data.success){
                      this.payChannelList = res.data.data
                       console.log(this.payChannelList,'通道列表')
                  } else {
                      this.$Message.error(res.data.msg)
                  }
              }).catch(err => {
                  this.$Message.error(err)
              })
          })
      },
    //   打开模态框
    OpenModal(item){
        this.revise = true
        this.title = item.channelName+'官方通道'
        this.formValidate.rules = item.rules
        this.formValidate.id = item.id
    },
    // 关闭模态框
    CloseModal(){
        this.revise = false
    },
    // 保存编辑
    SaveHandle(){
       return new Promise((resolve,reject) => {
           payChannelSave(this.formValidate).then(res => {
               if(res.data.success){
                   this.$Message.success(res.data.msg)
                   this.revise = false
                   this.getPayChannelList()
               } else {
                    this.$Message.error(res.data.msg)
               }
           }).catch(err => {
                this.$Message.error(res.data.msg)
           })
       })
    }
    }
}
</script>

<style lang="scss">
    /* 弹框样式修改 */
        .PRmodal{
            display: flex;
            align-items: center;
            justify-content: center;
            .CScontent{
                text-align:left;
                .tkTitle{
                    font-size:0.14rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:0.4rem;
                    color:#767676;
                }
                .tkTitle2{
                    font-size:0.14rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:0.4rem;
                    color:#151515;
                    span{
                        font-weight: bold;
                    }
                }
            }
            .ivu-modal{
                top: 0;
            }
            .ivu-modal-header-inner {
                display: inline-block;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #000000;
                font-weight:bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .ivu-modal-header {
                
                border-color: #E7EEEF;
                padding: 12px 16px;
                line-height: 1;
            }
            .ivu-modal-body {
                padding: .14rem .4rem;;
                font-size: .14rem;
                line-height: 1.5;      
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#767676;
            }
            .ivu-modal-footer {
                border: none;
                padding: 0px 18px 18px 18px;
                text-align: center;
                button:last-child{
                    margin-left:.2rem;
                }
                .ivu-btn {
                    width:95px;
                    padding: 3px 6px 4px;
                    font-size: .2rem;
                }
            }

            // 弹框form
            .ivu-form-item {
                margin-bottom: 10px;
            }
            .ivu-form .ivu-form-item-label {
                text-align: left;
                vertical-align: middle;
                float: left;
                font-size: .14rem;
                line-height: 1;
                // padding: 12px 1px 10px 0;
                box-sizing: border-box;
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:#151515;

            }
            .ivu-form-item-error-tip {
                position: absolute;
                top: 100%;
                left: 0;
                line-height: 1;
                padding-top: 0; 
                color: #ed4014;
            }
        }
        /* 弹框样式修改 */


    .payRoad{
        .prShoupTitle{
            border-left: 4px solid #4471FE;
            padding-left:.1rem;
            height:14px;
            font-size:0.16rem;
            font-family:PingFang SC;
            font-weight:800;
            line-height:0.14rem;
            color:rgba(21,21,21,1);
            opacity:1;
        }
        .prCss{
            background-color: #ffffff;
            border-radius: 4px;
            border: 1px solid #E7EEEF;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .2rem .2rem;
        }
        .prTitle{            
            padding: 0 .2rem 0 .2rem;
            height: .6rem;            
            font-size:0.14rem;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:0.49rem;
            color:#757575;
            margin-top: .2rem;
            p:first-Child{
                width: 2.24rem;
            }
            p:nth-child(2){
                width: 6.2rem;
                text-align: left;
                padding-left: .47rem;
            }
            p:nth-child(3){
                width: 3.1rem;
                text-align: left;
                padding-left: .47rem;
            }
            p:nth-child(4){
                width: 3.1rem;
                text-align: left;
                padding-left: .47rem;
                box-sizing: border-box;
            }
             p:nth-child(5){
                width: 1.31rem;
                text-align: left;
                text-align: center;
            }
        }
        
        .prContent:hover {
            box-shadow:3px 3px 8px #888888;
        }
        .prContent{
            // height: 1.1rem;
            padding: 0.2rem 0.2rem;
            margin-top:.1rem;           
            width: 100%;
            font-size:0.14rem;
            font-family:Source Han Sans CN;
            font-weight:500;
            line-height:0.49rem;
            color:#000000;
            .prBtn{
                width: .74rem;
            }
            .prImgBox{
                display: flex;
                align-items: center;
                width: 2.24rem;
                .prImg{
                    width: .7rem;
                    height: .7rem;
                    border-radius: 4px;
                    img{
                        width: 100%;
                    }
                }
                span{
                    padding-left: .12rem;                   
                }
            }
            .prXian{
                border-left: 1px solid #E7EEEF;
                padding: 0 .47rem;
                white-space: normal;
                line-height: normal;
                word-wrap : break-word;
                // min-height: 0.5rem;
            }
            .guize{
                width : 6.2rem;
            }
            .myWidth{
                width: 3.1rem;
            }
            .caozuo{
                width: 1.31rem;
            }
        }
        

            
    }
</style>
