import Vue from 'vue'
import Vuex from 'vuex'
import Message from 'iview/src/components/message'
import home from './Modules/home'
import login from './Modules/login' //登录逻辑处理

// 子公司逻辑处理
import {showBank, showClassify, bankName, areaName, ClassifyName} from '../api/public'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        menus: [],  //二级菜单
        BankList: [], //银行总行列表
        classifyList: [], //商户分类列表
        bankNams: [], //银行名称
        areaNames: [], //地区名称
        classifyNames: [], //商户分类名称
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        setBankList(state, data) {
            state.BankList = data
        },
        setclassifyList(state, data) {
            state.classifyList = data
        },
        setbankNams(state, data) {
            state.bankNams = data
        },
        setareaNames(state, data) {
            state.areaNames = data
        },
        setclassifyNames(state, data) {
            state.classifyNames = data
        },
    },
    actions: {
        // 获取银行总行列表
        getBank({commit}, payload) {
            return new Promise((resolve, reject) => {
                showBank(payload).then(res => {
                    if (res.data.success) {
                        sessionStorage.setItem('backList',JSON.stringify(res.data.data))
                        // console.log(JSON.parse(sessionStorage.getItem('backList')),'getBank')
                        resolve()
                    } else {
                        console.log(res)
                        Message.error(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                    Message.error(err)
                    reject()
                })
            })
        },
        // 获取商户分类列表
        getClassify({commit}, payload) {
            return new Promise((resolve, reject) => {
                showClassify(payload).then(res => {
                    if (res.data.success) {
                        sessionStorage.setItem('classifyList',JSON.stringify(res.data.data))
                        // console.log(JSON.parse(sessionStorage.getItem('classifyList')),'classifyList')
                        resolve()
                    } else {
                        console.log(res)
                        Message.error(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                    Message.error(err)
                    reject()
                })
            })
        },
        // 获取银行名称
        getBankName({commit}, payload) {
            return new Promise((resolve, reject) => {
                bankName(payload).then(res => {
                    if (res.data.success) {
                        // console.log(res.data.data,'getBankName')
                        commit('setbankNams', res.data.data)
                        resolve()
                    } else {
                        console.log(res)
                        Message.error(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                    Message.error(err)
                    reject()
                })
            })
        },
        // 获取地区名称
        getAreaName({commit}, payload) {
            return new Promise((resolve, reject) => {
                areaName(payload).then(res => {
                    if (res.data.success) {
                        // console.log(res.data.data,'getAreaName')
                        commit('setareaNames', res.data.data)
                        resolve()
                    } else {
                        console.log(res)
                        Message.error(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                    Message.error(err)
                    reject()
                })
            })
        },
        // 获取商户分类名称
        getClassifyName({commit}, payload) {
            return new Promise((resolve, reject) => {
                ClassifyName(payload).then(res => {
                    if (res.data.success) {
                        // console.log(res.data.data,'getClassifyName')
                        commit('setclassifyNames', res.data.data)
                        resolve()
                    } else {
                        console.log(res)
                        Message.error(res.data.msg)
                    }
                }).catch(err => {
                    console.log(err)
                    Message.error(err)
                    reject()
                })
            })
        }
    },
    modules: {
        home,
        login
    }
})
export default store
