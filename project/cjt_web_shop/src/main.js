// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import echarts from 'echarts';
import 'swiper/dist/css/swiper.min.css';
import store from './store';
import Swiper from 'swiper';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'babel-polyfill';

// 引入组件
import synthesizeTable from './components/synthesizeTable';
import asideMenu from './components/asideMenu';
// import indexNav from './components/indexNav';
import indexNavss from './components/indexNavss';
import dataAnomaly from './components/dataAnomaly';

//引入rem转化
require('rem-init')({
  psd_width: 1920
})

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);
Vue.prototype.$axios = Axios;
Vue.prototype.$host = '';
Vue.prototype.$echarts = echarts;
//处理模态框滚动穿透

//打开模态框前调用
Vue.prototype.$openModal = () => {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';
}
//关闭模态框后调用
Vue.prototype.$closeModal = () => {
  var body = document.body;
  body.style.position = 'static';
  var top = body.style.top;
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
  body.style.top = '';
}
//时间格式转换
Vue.prototype.$getData=(theDate)=>{
  var date = new Date(theDate);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate();
  return Y + M + D
}

//注册组件
Vue.component('synthesize-table', synthesizeTable) //综合表格组件
Vue.component('aside-menu', asideMenu) //侧边栏组件
Vue.component('index-nav', indexNavss) //顶部导航组件
Vue.component('dataAnomaly', dataAnomaly) //加载数据异常

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {App},
  template: '<App/>'
})
