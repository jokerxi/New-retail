<template>
  <!--返利活动页面-->
  <div id="rebateActivities">
    <div class="content_box radius">
      <div class="header_box">
        <p>{{title_name}}</p>
        <el-button @click="addRebateTemplates()" class="query_btn" size="mini" type="primary"><i
          class="iconfont icon-tianjiaicon-"></i>添加返利模板
        </el-button>
      </div>

    </div>
    <!--表格-->
    <div class="table_box radius module_bg border">
      <div class="state_title">
        <div class="bold" v-for="states in accurateState" @click="changeAccurateState(states.id)"
             :class="activeId == states.id?'actives':''">
          {{states.name}}
        </div>
      </div>
      <synthesize-table :tablePages="theTable.pages" :tHead="theTable.tHead" :tBody="theTable.tBody"
                        v-on:informAxios="myInform"></synthesize-table>
    </div>
  </div>
</template>

<script>
  import '../assets/css/time.css';

  export default {
    name: "rebateActivities",
    data() {
      return {
        title_name: '活动返利',
        accurateState: [
          {
            id: 1,
            name: '全部'
          },
          {
            id: 2,
            name: '活动未开始'
          },
          {
            id: 3,
            name: '活动进行中'
          },
          {
            id: 4,
            name: '返利金使用中'
          },
          {
            id: 5,
            name: '活动已结束'
          },
        ],
        activeId: 1,
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
          tHead: [
            {text: '序号'},
            {text: '开放范围'},
            {text: '返利比例'},
            {text: '适用范围'},
            {text: '活动时间'},
            {text: '返利金有效期'},
            {text: '状态'}
          ],
          tBody: [
            {
              id: 1,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动未开始',
              btn: [
                {
                  text: '编辑',
                  code: 0
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 2,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 3,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 4,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 5,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 6,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 7,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动已结束',
              btn: [
                {
                  text: '活动效果',
                  code: 5
                }
              ]
            },
            {
              id: 8,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动已结束',
              btn: [
                {
                  text: '活动效果',
                  code: 5
                }
              ]
            },
            {
              id: 9,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            },
            {
              id: 10,
              col01: '白痴类',
              col02: '30%',
              col03: '西方草皮',
              col04: '2018.01.01/23:00-2018.01.02/23:00',
              col05: '2018.01.02/23:00',
              col06: '活动进行中',
              btn: [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            }
          ]
        }
      }
    },
    created() {
      this.$axios.get('')
        .then(res => {
   /*     1.活动进行中编辑按钮变停止
          2.活动结束只剩活动效果按钮
          3.通知用户只可点一次，换状态也不可重点*/
          
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].col06 == 0) {
              this.theTable.data.tBody[i].btn = [
                {
                  text: '编辑',
                  code: 0
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            } else if (res.data[i].col06 == 1) {
              this.theTable.data.tBody[i].btn = [
                {
                  text: '停止',
                  code: 6
                },
                {
                  text: '活动效果',
                  code: 4
                },
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            } else {
              this.theTable.data.tBody[i].btn = [
                {
                  text: '通知用户',
                  code: 5
                }
              ]
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      addRebateTemplates() {
        this.$router.push("/addRebateTemplates")
      },
//      table切换
      changeAccurateState(id) {
        let path
        this.activeId = id;
        if (id == 1) {
          path = ''
        } else if (id == 2) {
          path = ''
        } else if (id == 3) {
          path = ''
        } else if (id == 4) {
          path = ''
        } else if (id == 5) {
          path = ''
        }
        this.$axios.post(path)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        // console.log(id);
        // console.log(this.activeId)
      },
      //通知用户
      myInform() {
        this.$axios.post('')
          .then(res => {
            this.$message({
              showClose: true,
              message: '成功通知用户！',
              type: 'success'
            })
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: '通知用户失败，请重试！',
              type: 'error'
            })
          })
      }
    }
  }
</script>

<style scoped>
  #rebateActivities {
    padding: .2rem;
  }

  .content_box {
    background-image: url('../../static/images/bgjzyx@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
    padding: .61rem 1rem .61rem .6rem;
    color: #ffffff;
    z-index: -1;
    overflow: hidden;
  }

  .header_box p {
    font-size: 0.18rem;
    margin-bottom: .2rem;
  }

  .header_box i {
    padding-right: 0.12rem;
  }

  /*表头*/
  .state_title {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px #E7EEEF solid;
  }

  .state_title > div {
    padding: .17rem .22rem .15rem .22rem;
    border-bottom: .02rem #fff solid;
    color: #767676;
    cursor: pointer;
    transition: all 300ms linear;
  }

  .state_title p {
    margin-left: 1.01rem;
  }

  .actives {
    border-bottom: .02rem #4471FE solid !important;
    color: #000 !important;
    transition: all 300ms linear;
  }

  /*表格组件包框*/
  .table_box {
    margin-top: 0.1rem;
    padding: 0 0.2rem;
  }
</style>
