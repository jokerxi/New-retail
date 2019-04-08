import { Login } from '../../api/login'
import Message from 'iview/src/components/message'
import router from '../../router/index'
export default {
    state: {
        loading: false //登录状态
    },
    mutations: {
        setLoading(state, data) {
            state.loading = data
        }
    },
    actions: {
        Login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Login(payload).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        commit('setLoading', false)
                        Message.success(res.data.msg)
                        localStorage.setItem('Authorization', res.data.data)
                        router.push('/Index/kanban')
                    } else {
                        commit('setLoading', false)
                        Message.error(res.data.msg)
                    }
                    resolve()
                }).catch(err => {
                    reject()
                })
            })
        }
    }
}
