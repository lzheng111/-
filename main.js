import App from './App'

// 引入vuex
import store from "./store"
Vue.prototype.$store = store

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

//引入全局组件（分割线）
import divider from "components/common/divider.vue"
Vue.component('divider',divider)
//引入全局加载动画
import loading from "components/common/loading.vue"
Vue.component('loading',loading)

App.mpType = 'app'
const app = new Vue({
	  store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif