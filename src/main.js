// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

Vue.config.productionTip = false
// 分页
Vue.use(infiniteScroll);
// 懒加载
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg'
});
// 全局过滤器
Vue.filter("currency", currency);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
