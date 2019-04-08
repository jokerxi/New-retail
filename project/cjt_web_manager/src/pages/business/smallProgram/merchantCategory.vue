<template>
    <div class="merchantCategory">
        <!-- 配置商家品类 -->
        <header>
            <Button @click="OpenListModal" type="primary">切换店铺</Button>
            <span class="mcTitle">喜洋洋超市</span>
        </header>
        <div class="mcContent">
            <div class="mcContentHeader">
                <p class="mcContentHeaderTitle">配置商家品类</p>
                <div class="roundBox">
                    <p class="round"></p>
                    <p>为品类更新标记</p>
                </div>                
            </div>
            <div class="mcContainer styleFlex">
                <div class="mcDiv1 styleFlex">
                    <div class="mcDivXian">
                        <div v-for="(item,index) in firstList" :class="{'currentA':item.custCategoryNo == currentA}" :key="index" class="mcChkBox">
                            <span @click='checkA(item)' class='mcImgBox' :class="{'checked':item.check}"></span>
                            <span @click="selectA(item)">{{item.categoryName}}</span> 
                            <p v-show="item.status == 1" class="round newlyAdded"></p>             
                        </div>
                    </div>
                    <div class="mcDivXian" v-show="secondList.length>0">
                        <div v-for="(item,index) in secondList" :key="index" :class="{'currentB': item.custCategoryNo == currentB}" class="mcChkBox">
                            <span class='mcImgBox' @click='checkB(item)' :class="{'checked':item.check}"></span>
                            <span @click="selectB(item)">{{item.categoryName}}</span>
                            <p v-show="item.status == 1" class="round newlyAdded"></p>
                        </div>
                    </div>
                    <div class="mcDivXian" v-show="threeList.length>0">
                        <div v-for="(item,index) in threeList" :key="index" :class="{'currentC': item.custCategoryNo == currentC}" class="mcChkBox">
                            <span @click="checkC(item)" class='mcImgBox' :class="{'checked':item.check}"></span>
                            <span @click="selectC(item)">{{item.categoryName}}</span>
                            <p v-show="item.status == 1" class="round newlyAdded"></p>
                        </div>
                    </div>
                </div>
                <div class="mcDiv2">
                    <div class="mcDiv2Header">
                        <Button @click="SaveData = true" type="primary" shape="circle"><i class="iconfont icon-baocunicon1"></i>保存</Button>
                    </div>
                    <div class="mcDiv2Content" v-show="selectList.length>0">
                        <Row>
                            <Col :span='8' v-for="(item,index) in selectList" :key='index'>
                              <p><span>{{item.categoryName}}</span></p><span @click="dele(item)" class="iconfont icon-qingchuicon"></span>
                            </Col>
                        </Row>                       
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹框 -->
        <div>
            <Modal
                v-model="SaveData"
                width="330"
                class-name="mcmodal">
                <div class="mccontent">
                    当前配置有变动，是否保存？
                </div>
                <div slot="footer">
                    <Button class="tkDelBtn" @click="closeModal" style="margin-botton: 8px">取消</Button>
                    <Button class="tkDelBtn" @click="saveHandle" type="primary">确定</Button>                  
                </div>
            </Modal>
        </div>
        <div>
            <Modal
                v-model="visiable"
                title="选择店铺"
                width="900"
                scrollable
                class-name="MCmodal">
                <div class="MCcontent">
                    <div>
                        <Input v-model="queryParam.queryWord" placeholder="" style="width: 260px" />
                        <Button class="tkDelBtn" type="primary" @click="queryHandle">搜索</Button>
                        <Button style="margin-left: 20px" @click="fresh" icon="md-sync">刷新</Button>
                    </div>
                    <div class="MCbig">
                        <div v-for="(item,index) in list" :key="index" class="MCdiv" @click="getCategory(item)">
                            <span>{{item.shopName}}</span>
                            <span v-show="item.shopStatus== 0"  class="MCspan">未配置</span> 
                            <span v-show="item.shopStatus== 1" class="MCspan clYellow">有更新</span> 
                            <span v-show="item.shopStatus== 2" class="MCspan clBlue">已配置</span> 
                        </div>                     
                    </div>
                </div>
                <div slot="footer">
                    <Button class="tkDelBtn">取消</Button>
                    <Button class="tkDelBtn" type="primary">确定</Button>                  
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { getfindShopNameAndStatus, getfindCategory, findLastCategory, getsaveShopRanks } from '../../../api/smallProgram'
import Pages from '../../../components/Pages'
export default {
    name: 'merchantCategory',
    components:{
       Pages
    },
    data(){
        return{
            list:[],
            visiable:true,
            queryParam:{
                queryWord:'',
                limit:40,
                page:1
            },
             pagations:{
                currents:1,
                total:0,
                pageSize:10
            },
            Category:{
              cjtId:'',
              custCategoryNo:''
            },
            firstList:[],
            secondList:[],
            threeList:[],
            selectList:[],
            currentA: 0,
            currentB: 0,
            currentC: 0,
            mcImgBox: 0,
            new_Add: true,
            Fork: true,
            SaveData: false,
            value: '',
            state1: false,
            state2: false,
            state3: true,
            count1:0,
            count2:0
        }
    },
    created(){
        this.getShopList(this.queryParam)
    },
    methods: {
        OpenListModal(){
            this.visiable = true
        },
         //   选中第一级品类
          selectA(item){
           this.currentA = item.custCategoryNo
           this.Category.custCategoryNo = item.custCategoryNo
           this.threeList = []
           this.findCategorySecond(this.Category,item.check)
          },
        //   选中二级品类
          selectB(item){
           this.currentB = item.custCategoryNo
           this.Category.custCategoryNo= item.custCategoryNo
           this.findCategoryThree(this.Category,item.check)
          },
        //   选中三级品类
          selectC(item){
           this.currentC = item.custCategoryNo
          },
        //   勾选三级品类
          checkC(items){
              let _this = this
              items.check = !items.check
             let status = this.threeList.some(three => {
                 return three.check == true
             })
             this.secondList.forEach(second => {
                 if(items.parentID == second.custCategoryNo){
                     second.check = status
                 }
                let status1 = _this.secondList.some(second1 => {
                    return second1.check == true
                })
                this.firstList.forEach(first => {
                    if(first.custCategoryNo == second.parentID){
                        first.check = status1
                    }
                })
             })
            if(items.check){
                if(items.subCount == 0){
                    this.selectList.push({
                       custCategoryNo:items.custCategoryNo,
                       categoryName:items.categoryName  
                    })
                }
            } else {
                this.selectList.forEach((select,index) => {
                    if(items.custCategoryNo == select.custCategoryNo){
                        this.selectList.splice(index,1)
                    }
                })
            }
            this.Category.custCategoryNo = items.custCategoryNo
            this.getLastCategory(this.Category,items.check)
          },
        //   勾选二级品类
         checkB(items){
            let _this = this
            items.check = !items.check
            if(this.threeList.length>0){
                this.threeList.forEach(item => {
                    if(item.parentID == items.custCategoryNo){
                        item.check = items.check
                    }
                })
            }
           let status = this.secondList.some(second => {
                 return second.check == true
            })
             this.firstList.forEach(first => {
                    if(first.custCategoryNo == items.parentID){
                        first.check = status
                    }
                })
            if(items.check){
                if(items.subCount == 0){
                    this.selectList.push({
                       custCategoryNo:items.custCategoryNo,
                       categoryName:items.categoryName  
                    })
                }
            } else {
                this.selectList.forEach((select,index) => {
                    if(items.custCategoryNo == select.custCategoryNo){
                        this.selectList.splice(index,1)
                    }
                })
            }
            this.Category.custCategoryNo = items.custCategoryNo
            this.getLastCategory(this.Category,items.check)
         },
        //   勾选一级品类
         checkA(items){
             let _this = this
            items.check = !items.check
            if(this.secondList.length>0){
                this.secondList.forEach(item => {
                    if(item.parentID == items.custCategoryNo){
                    item.check = items.check
                }
                    if(this.threeList.length>0){
                        this.threeList.forEach(three => {
                            if(three.parentID == item.custCategoryNo && item.parentID == items.custCategoryNo){
                                three.check = items.check
                            }
                        })
                    }
                })
            }
            if(items.check){
                if(items.subCount == 0){
                    this.selectList.push({
                       custCategoryNo:items.custCategoryNo,
                       categoryName:items.categoryName  
                    })
                }
            } else {
                this.selectList.forEach((select,index) => {
                    if(items.custCategoryNo == select.custCategoryNo){
                        this.selectList.splice(index,1)
                    }
                })
            }
            this.Category.custCategoryNo = items.custCategoryNo
            this.getLastCategory(this.Category,items.check)
         },
        //  获取最后一级
        getLastCategory(payload,sta){
           return new Promise((resolve,reject) => {
               findLastCategory(payload).then(res => {
                   if(res.data.success){
                       let data = res.data.data
                       let _this = this
                       if(sta){
                           if(this.selectList.length>0){
                               data.forEach(dat => {
                                    this.selectList.push({
                                        custCategoryNo:dat.custCategoryNo,
                                        categoryName:dat.categoryName 
                                   })
                               })
                           } else{
                                data.forEach(dats => {
                                    _this.selectList.push({
                                            custCategoryNo:dats.custCategoryNo,
                                            categoryName:dats.categoryName
                                         })
                                })
                           }
                       } else {
                           data.forEach(dat => {
                               this.selectList.forEach((select,index) => {
                                   if(dat.custCategoryNo == select.custCategoryNo){
                                      _this.selectList.splice(index,1)
                                   }
                               })
                           })
                       }
                       console.log(res.data.data,'最后一级')
                        console.log(this.selectList,'selectList')
                   } else {
                       this.$Message.error(res.data.msg)
                   }
               }).catch(err => {
                    this.$Message.error(err)
               })
           })
        },
        // 获取店铺列表及状态
        getShopList(payload){
          return new Promise((resolve,reject) => {
              getfindShopNameAndStatus(payload).then(res => {
                if(res.data.success){
                    this.list = res.data.data
                } else {
                    this.$Message.error(res.data.msg)
                }
              }).catch(err => {
                  this.$Message.error(err)
              })
          })
        },
        // 查询操作
        queryHandle(){
          this.getShopList(this.queryParam)
        },
        // 刷新操作
        fresh(){
          this.queryParam.queryWord = ''
          this.getShopList(this.queryParam)
        },
        // 获取商家品类
        getCategory(item){
          this.Category.cjtId = item.cjtNo
          this.findCategoryHandle(this.Category,false)
          this.visiable = false
        },
        // 查询店铺自己的商品品类一级
        findCategoryHandle(payload,status){
           return new Promise((resolve,reject) => {
               getfindCategory(payload).then(res => {
                 if(res.data.success){
                     let data = res.data.data
                     data.forEach(item => {
                         item.check = status
                     })
                     this.firstList = data
                 } else {
                     this.$Message.error(res.data.msg)
                 }
               }).catch(err => {
                  this.$Message.error(err)
               })
           })
        },
        // 查询店铺自己的商品分类二级
        findCategorySecond(payload,status){
           return new Promise((resolve,reject) => {
               getfindCategory(payload).then(res => {
                 if(res.data.success){
                     let data = res.data.data
                     data.forEach(item => {
                         item.check = status
                     })
                     this.secondList = data
                     this.count2 = res.data.total
                 } else {
                     this.$Message.error(res.data.msg)
                 }
               }).catch(err => {
                 this.$Message.error(err)
               })
           })
        },
        // 查询店铺自己的商品分类三级
        findCategoryThree(payload,status){
            return new Promise((resolve,reject) => {
               getfindCategory(payload).then(res => {
                 if(res.data.success){
                     let data = res.data.data
                     data.forEach(item => {
                         item.check = status
                     })
                     this.threeList = data
                      this.count1 = res.data.total
                 } else {
                     this.$Message.error(res.data.msg)
                 }
               }).catch(err => {
                  this.$Message.error(err)
               })
           })
        },
        // 删除已选中的
        dele(value){
            this.selectList.forEach((item,index) => {
                if(value.custCategoryNo == item.custCategoryNo){
                    this.selectList.splice(index,1)
                }
            })
        },
        // 关闭模态框
        closeModal(){
            this.SaveData = false
        },
        // 保存操作
        saveHandle(){
            let param = {
                cjtId:this.Category.cjtId,
                manageList:this.selectList
            }
            return new Promise((resolve,reject) => {
                getsaveShopRanks(param).then(res => {
                    if(res.data.success){
                        this.$Message.success(res.data.msg)
                        this.SaveData = false
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                }).catch(err => {
                    this.$Message.error(err)
                })
            })
        }
    }
}
</script>

<style lang="scss">
/* 弹框样式修改 */
 .mcmodal{
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
        text-align: center;
    }         
    .ivu-modal-body {
        padding: 62px 0 34px 0;
        text-align: center;
        font-size: .14rem;
        line-height: 1.5;      
        font-size:0.14rem;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:#767676;
    }
}
.ivu-modal{
    top: 0;
}
            
.ivu-modal-footer {
    border: none;
    padding: 0px 18px 18px 18px;
    text-align: center;
}
.tkDelBtn{
    padding: 5px 25px 6px;
    border: 1px solid #E7EEEF;
}
.MCmodal{
    display: flex;
    justify-content: center;
    align-items: center;
    .MCcontent{   
        min-height: 400px;
        text-align: left;
        .ivu-btn>.ivu-icon {
            line-height: 1;
            vertical-align: middle;
            font-size: 18px;
            color: #4471FE;
        }
        .ivu-btn>.ivu-icon+span, .ivu-btn>span+.ivu-icon {
            margin-left: 0;
        }
        .MCbig{
            margin-top: .2rem;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap ;
            align-items: center;
        }
        .MCdiv{
            position: relative;
            border: 1px solid #E7EEEF;
            border-radius: 4px;
            height: 30px;
            width: 250px;
            margin-bottom: 10px;
            padding: 0 10px;
            font-size:0.14rem;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:0.3rem;
            color:#000000;
            margin-right:.25rem;
            opacity:1;
            cursor: pointer;
            .MCspan{
                color: #FF7474;
                position: absolute;
                right: 10px;
            }
            .clYellow{
                color: #FFB50D;
            }
            .clBlue{
                color: #4471FE;
            }
        }
    }         
    .ivu-modal-body {
        padding: 14px 14px 34px 50px;
        text-align: center;
        font-size: .14rem;
        line-height: 1.5;      
        font-size:0.14rem;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:#767676;
    }
}


    /* 弹框样式修改 */

.merchantCategory{
       

    header{
        background: url('../../../../static/image/SysBg.png')no-repeat;
        background-size: 100% 100%;
        padding: 0 .21rem;
        border-radius: 4px;
        height: 100px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .mcTitle{
            font-size:0.2rem;
            font-family:Source Han Sans CN;
            font-weight:bold;
            line-height:0.23rem;
            color:rgba(255,255,255,1);
            opacity:1;
            padding-left:.1rem;
        }
        .ivu-btn {
            padding: 2px 15px 6px;

        }    

    }
    .mcContent{
        border-radius: 4px;
        border: 1px solid #E7EEEF;
        background-color: #ffffff;
        margin-top: .2rem;
        .mcContentHeader{
            border-bottom: 1px solid #E7EEEF;
            height: .5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: .22rem;
            .mcContentHeaderTitle{
                font-size:0.18rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                line-height:0.23rem;
                color:#151515;
                opacity:1;
                padding-right:.26rem;
            }
            .roundBox{
                display: flex;
                justify-content: center;
                align-items: center;
                
                p:last-child{
                font-size:0.14rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                line-height:0.23rem;
                color:#767676;
                opacity:1;
                margin-left:5px;
                }
            }
        }
        .round{
            width:10px;
            height: 10px;
            background-color: #FFB50D;
            border-radius: 50%;
            display: block;
        }
        .newlyAdded{
            position: absolute;
            right: .2rem;



        }
        .styleFlex{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .checked{
                position: relative;
                &:before{
                    content: '';
                    width:10px;
                    height: 10px;
                    border-radius: 10px;
                    background: #4471FE;
                    display: inline-block;
                    left: 50%;
                    margin-left: -5px;
                    top:50%;
                    margin-top: -5px;
                    position: absolute;
                }
            }
        }
        .mcDiv1{
            // width:7.2rem;
            // height:7rem;
            // border: 1px solid red;
            flex: 1;
            .mcDivXian{
                width: 25%;
                min-height:7rem;
                overflow-y: auto;
                padding: 10px;
                border-right: 1px solid #EAEBF0;
                padding: 8px 10px;
                position: relative;
                .mcImgBox{
                    display: block;
                    width: 18px;
                    height:18px;
                    background: url('../../../../static/image/chack@2x.png')no-repeat;
                    background-size: 100% 100%;
                    &.mcImgBox{
                        background: url('../../../../static/image/weichack@2x.png')no-repeat;
                    }
                }
            }
            .mcChkBox{
                width:100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height:40px;
                color: #151515;
                background-color: #ffffff;
                border-radius: 4px;
                padding: 0.1rem;
                &.currentA{
                    background-color: #4471FE;
                    color: #FFFFFF;
                    &:hover{
                        background-color: #4471FE;
                    }
                    
                }
                &.currentB{
                    background-color: #4471FE;
                    color: #FFFFFF;
                    &:hover{
                        background-color: #4471FE;
                    }
                    
                }
                &.currentC{
                    background-color: #4471FE;
                    color: #FFFFFF;
                    &:hover{
                        background-color: #4471FE;
                    }
                    
                }
                &:hover{
                        background-color: #EEF3FE;
                    }
                span{
                    font-size:0.14rem;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    line-height:0.4rem;
                    padding-left: .14rem;
                    width: 2rem;
                    cursor: pointer;
                }
            }
        }
        .mcDiv2{
            flex: 1;
            // height:7rem;

            // border: 1px solid blue;
            .mcDiv2Header{
                text-align: right;
                padding: .24rem .2rem;
            }
            .mcDiv2Content{
                padding: 0 .2rem  0 .29rem;
                div{
                    
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-bottom: 15px;
                    p{
                        width: 2.2rem;
                        height: 40px;
                        border:1px solid #EAEBF0;
                        border-radius: 4px;
                        padding-left: .1rem;
                        font-size:0.14rem;
                        font-family:Source Han Sans CN;
                        font-weight:400;
                        line-height:0.4rem;
                        color:#151515;
                        opacity:1;
                    }
                }
                
            }
        }
    }
}
</style>
