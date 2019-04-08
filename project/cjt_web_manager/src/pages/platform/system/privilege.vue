<template>
    <div class="privilege">
        <!-- 权限管理 -->
        <div class="plTop">
            <!--顶部tab-->
            <div class="smTable">
                <span v-for="item in titleList" :class="{'current': current == item.id}" :key="item.id"
                      @click="getShowAll(item.id)">{{item.title}}</span>
            </div>
            <!--角色选择-->
            <div class="plChackRoleBox">
                <span class="plChackRole">选择角色：</span>
                <Select v-model="selectRole"
                        style="width: 160px"
                        @on-change="changeRole"
                        placeholder="请选择角色">
                    <Option v-for="item in roleList"
                            v-model="item.id.toString()"
                            :key="item.id">
                        {{item.name}}
                    </Option>
                </Select>
                <Button type="primary" @click="saveRoleMenu" :loading="saveBtn=='保存中...'">{{saveBtn}}</Button>
            </div>
        </div>
        <div class="plContentBox">
            <p class="plXian"><span class="plTitle">{{title}}</span></p>
            <!--菜单权限-->
            <div v-if="menuList.length>0">
                <div class="authorBox" v-for="frist in menuList" :key="frist.id">
                    <div class="box">
                        <div class="frist">
                            <p><span @click="changStatus(frist)" class="circle"
                                     :class="{'selected': frist.status}"></span><span>{{frist.name}}</span></p>
                        </div>
                        <div v-for="second in frist.suns" :key="second.id">
                            <ul>
                                <li>
                                    <p><span @click="changStatus(second)" class="circle"
                                             :class="{'selected': second.status}"></span><span>{{second.name}}</span>
                                    </p>
                                </li>
                                <ul class="last">
                                    <li>
                                        <p v-for="three in second.suns" :key="three.id"><span
                                            @click="changStatus(three)" class="circle"
                                            :class="{'selected': three.status}"></span><span>{{three.name}}</span></p>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="null_list" v-else>暂无数据，请换选角色</div>
        </div>
    </div>
</template>

<script>
    import {
        showAll,
        showMenu,
        saveRoleMenu
    } from '../../../api/menuPermissions'

    export default {
        name: 'privilege',
        data() {
            return {
                current: 1,
                img_src: '../../../../static/image/chack@2x.png',
                titleList: [
                    {
                        id: 1,
                        title: '运营后台权限'
                    },
                    {
                        id: 2,
                        title: '商家后台权限'
                    },
                ],
                title: '运营后台权限分配',
                selectRole: '',
                menuList: [],
                roleList: [],
                firstMenu: [],
                secondMenu: [],
                thirdlyMenu: [],
                saveBtn: '保存',
                // selectedId:[]
            }
        },
        // watch() {
        // },
        created() {
            this.getShowAll(1)
        },
        methods: {
            //获取下拉框
            getShowAll(id) {
                return new Promise(() => {
                    showAll(id)
                        .then(res => {
                            // console.log(res, 'showAll')
                            if (res.data.success) {
                                this.selectRole = ''
                                this.roleList = []
                                this.menuList = []
                                res.data.data.forEach(t => {
                                    this.roleList.push(t)
                                })
                                this.current = id
                                id == 1 ? this.title = '运营后台权限分配' : this.title = '商家后台权限分配'
                            } else {
                                console.log(res, 'showAll')
                                this.$Message.warning(res.data.msg)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.$Message.error('出错啦！请检查网络后重试！')
                        })
                })
            },
            //选择身份
            changeRole() {
                let params = {
                    roleId: this.selectRole,
                    menuType: this.current
                }
                // console.log(params,'showMenu')
                if (params.roleId) {
                    return new Promise(() => {
                        showMenu(params).then(res => {
                            if (res.data.success) {
                                this.menuList = res.data.data
                                // console.log(this.menuList, 'list')
                            } else {
                                this.$Message.warning(res.data.msg)
                            }
                        })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                            })
                    })
                }
            },
            //选择权限
            changStatus(items) {
                items.status = !items.status
                if (items.suns.length > 0) {
                    items.suns.forEach(item => {
                        item.status = items.status
                        if (item.suns.length > 0) {
                            item.suns.forEach(item1 => {
                                item1.status = items.status
                                if (item1.suns.length > 0) {
                                    item1.suns.forEach(item2 => {
                                        item2.status = items.status
                                    })
                                } else {
                                    return
                                }
                            })
                        } else {
                            this.menuList.forEach(one => {
                                if (items.status) {
                                    if (items.parentId == one.id) {
                                        one.status = items.status
                                    }
                                } else {
                                    if (items.parentId == one.id) {
                                        let stats = one.suns.some(one1 => {
                                            return one1.status == 1
                                        })
                                        one.status = stats
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.menuList.forEach(one => {
                        one.suns.forEach(two => {
                            if (items.status) {
                                if (items.parentId == two.id) {
                                    two.status = items.status
                                    one.status = items.status
                                }
                            } else {
                                if (items.parentId == two.id) {
                                    let stats = two.suns.some(two1 => {
                                        return two1.status == 1
                                    })
                                    two.status = stats
                                    let stats1 = one.suns.some(one1 => {
                                        return one1.status == 1
                                    })
                                    one.status = stats1
                                }
                            }
                        })
                    })
                }
            },
            //获取被选中
            getSelected(list, arr) {
                list.forEach(t => {
                    t.status == 1 ? arr.push(t.id) : ''
                    t.suns.length > 0 ? this.getSelected(t.suns, arr) : ''
                })
            },

            // 保存
            saveRoleMenu() {
                if (this.selectRole) {
                    let list = []
                    this.getSelected(this.menuList, list)
                    let params = {
                        roleId: this.selectRole,
                        menuIds: list,
                        roleMenuType: this.current
                    }
                    // console.log(params, 'params')
                    return new Promise(() => {
                        saveRoleMenu(params)
                            .then(res => {
                                // console.log(res, 'showMenu')
                                if (res.data.success == true) {
                                    this.$Message.success(res.data.msg)
                                    this.saveBtn = '保存'
                                } else {
                                    console.log(res, 'showMenu')
                                    this.$Message.error(res.data.msg)
                                    this.saveBtn = '保存'
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                this.$Message.error('出错啦！请检查网络后重试！')
                                this.saveBtn = '保存'
                            })
                    })
                } else {
                    this.$Message.error('请选择角色！')
                    this.saveBtn = '保存'
                }
            },
        }
    }
</script>

<style lang="scss">
    .privilege {

        .plTop {
            background-color: #ffffff;
            border: 1px solid #E7EEEF;
            border-radius: 4px;
            // height: 1.2rem;
            padding: 0 .22rem;

            .smTable {

                height: .5rem;
                border-bottom: 1px solid #E7EEEF;
                padding-bottom: 2px;

                span {
                    line-height: .5rem;
                    height: .5rem;
                    display: block;
                    float: left;
                    text-align: center;
                    width: 150px;
                    color: #767676;
                    font-size: 0.14rem;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    cursor: pointer;

                    &.current {
                        border-bottom: 2px solid #0061E2;
                        color: #000000;
                    }
                }
            }

            .plChackRoleBox {
                padding: .2rem 0 .18rem 0;
                position: relative;

                Button {
                    position: absolute;
                    right: 0;
                }

                .ivu-btn-primary {
                    /*color: #fff;*/
                    /*border-color: #4471FE;*/
                }

                .ivu-btn {
                    padding: 2px 15px 3px;
                    font-size: .14rem;
                }

                .plChackRole {
                    font-size: 0.14rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    line-height: 0.4rem;
                    color: rgba(21, 21, 21, 1);
                    opacity: 1;
                }

                .ivu-select {
                    display: inline-block;
                    width: 100%;
                    box-sizing: border-box;
                    vertical-align: middle;
                    color: #151515;
                    font-size: .14rem;
                    line-height: normal;
                }

                .ivu-select-single .ivu-select-selection {
                    height: 30px;
                }

                .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
                    display: block;
                    width: 1.34rem;
                    line-height: 30px;
                    font-size: .14rem;
                }

            }
        }

        .plContentBox {
            margin-top: .2rem;
            font-size: .14rem;
            color: #000;
            font-weight: bold;

            .plXian {
                border-left: 4px solid #4471FE;

                .plTitle {
                    padding-left: 6px;
                    width: 100%;
                    font-size: 0.16rem;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    line-height: 0.23rem;
                    color: rgba(21, 21, 21, 1);
                    opacity: 1;
                }
            }

            .plFlex {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .plContentOne {
                margin-top: 10px;
                background-color: #ffffff;
                border: 1px solid #E7EEEF;
                border-radius: 4px;
                padding: 0 .24rem;
                // height: 1.6rem;

                .plImgBox {
                    width: 18px;
                    height: 18px;

                    img {
                        width: 100%;
                    }
                }

                p {
                    font-size: 0.14rem;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    line-height: 0.49rem;
                    color: #000000;
                    opacity: 1;
                    margin-left: .1rem;
                }

                .plThree {
                    padding-right: .64rem;
                    box-sizing: border-box;
                }

                .plIndex {
                    border-bottom: 1px solid #E7EEEF;

                }

                .plData {
                    margin-left: .62rem;
                    border-bottom: 1px solid #E7EEEF;
                }

                .plUserData {
                    margin-left: 1.18rem;
                }
            }

            .first_menu {
                background-color: #fff;
                padding-left: 0.24rem;
                padding-right: 0.24rem;
                border: 1px solid #E7EEEF;
                border-radius: 4px;
                margin-top: 10px;

                label {
                    line-height: 50px;
                    display: block;
                }

                .menu_box {
                    border-bottom: 1px solid #E7EEEF;
                }

                .second_menu, .thirdly_box {
                    margin-left: .56rem;

                }

                .thirdly_box {
                    label {
                        display: inline-block;
                        margin-right: .64rem;
                    }
                }

                .second_menu:last-of-type {
                    .menu_box {
                        border-bottom: none;
                    }
                }

                .ivu-checkbox-checked .ivu-checkbox-inner {
                    border-color: #E7EEEF;
                    background-color: #4471FE;
                }
            }

            .ivu-tree-arrow-open i {
                display: none;
            }

            .ivu-tree > .ivu-tree-children {
                background-color: #fff;
                border: 1px #E7EEEF solid;
                border-radius: 4px;
                margin-top: 10px;
            }

            .ivu-tree ul li {
                margin: 20px 0;
            }

            .ivu-tree-title-selected, .ivu-tree-title-selected:hover, .ivu-tree-title:hover {
                background-color: unset;
            }

            .ivu-checkbox-indeterminate .ivu-checkbox-inner:after, .ivu-checkbox-checked .ivu-checkbox-inner:after {
                /*transform:none;*/
                /*content: none;*/
            }

            label, span {
                /*border-bottom: 1px #E7EEEF solid;*/
            }

            .null_list {
                background: #fff;
                padding: 30px 15px;
                border: 1px solid #E7EEEF;
                border-radius: 4px;
                margin-top: 20px;
            }
        }


        .ivu-checkbox-inner {
            border-radius: 50%;
            margin-right: 10px;
        }
    }

    .authorBox {
        width: 100%;
        margin-top: 15px;
        padding: 0 20px 0 0;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #E7EEEF;
        border-radius: 2px;

        .box {
            margin-left: 20px;
            margin-bottom: -1px;

            p {
                display: inline-block;
                margin-right: 0.5rem;

                span {
                    font-size: 14px;
                    font-family: 'Source Han Sans CN';
                    font-weight: bold;
                    color: rgba(0, 0, 0, 1);
                    display: inline-block;
                    vertical-align: middle;

                    &.circle {
                        width: 15px;
                        height: 15px;
                        border-radius: 15px;
                        border: 1px solid #E7EEEF;
                        margin-right: 8px;
                    }
                }

                .selected {
                    position: relative;

                    &:before {
                        content: '';
                        width: 8px;
                        height: 8px;
                        border-radius: 8px;
                        background-color: #4471FE;
                        display: inline-block;
                        position: absolute;
                        left: 50%;
                        margin-left: -4px;
                        top: 50%;
                        margin-top: -4px;
                    }
                }
            }
        }

        .frist {
            line-height: 55px;
            border-bottom: 1px solid #E7EEEF;
        }

        ul {
            list-style: none;
            margin-left: 40px;

            li {
                line-height: 55px;
                border-bottom: 1px solid #E7EEEF;
                // &:last-child{
                //     border-bottom: 1px solid transparent;
                // }
            }

            &.last {
                // li{
                //    border-bottom: 1px solid #E7EEEF; 
                // }
            }
        }
    }

</style>
