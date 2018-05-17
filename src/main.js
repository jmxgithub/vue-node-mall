// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

Vue.use(Vuex);

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

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updatedUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updatedCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount;
    }
  }
})
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
