// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 自定义组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
import { Spin } from 'iview'
import 'swiper/dist/css/swiper.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import $ from 'jquery'
import layui from '../static/layui/layui.all.js';
import './assets/iconfont.css'

//引入rem转化
require('rem-init')({
  psd_width: 1920
})

require("layui-layer");

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$host = ''
Vue.prototype.$echarts = echarts
//时间格式转换
Vue.prototype.$getDate=(theDate)=>{
    var date = new Date(theDate);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate();
    return Y + M + D
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
