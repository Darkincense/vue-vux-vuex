import Vue from 'vue'

import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import axios from 'axios'
import * as custom from './assets/common/filters/custom'
import App from './App'
import store from './store/store'
import routers from './router'
import util from './assets/common/js/util'



// ju
import { ToastPlugin } from 'vux'
import { AlertPlugin } from 'vux'
import { Group, Grid, GroupTitle, XInput, XButton, GridItem, Cell, CellBox, Divider, Tab, TabItem, FormPreview, CheckIcon } from 'vux'

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)


// ju end 

Vue.use(VueRouter);
Vue.use(util);
// Vue.prototype.$axios = axios;
// 请求域
window.axios = axios;
window.baseUrl = "http://weipai.test01.qcw100.cn/rest/2.0";
// window.imgUrl = "http://admin.weipai.test01.qcw100.cn"



// 全局使用自定义过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

const router = new VueRouter({
  // mode: 'history',
  routes: routers
})


FastClick.attach(document.body)


Vue.config.productionTip = false

// ju
Vue.component('group', Group)
Vue.component('grid', Grid)

Vue.component('group-title', GroupTitle)

Vue.component('x-button', XButton)
Vue.component('x-input', XInput)

Vue.component('grid-item', GridItem)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)

Vue.component('divider', Divider)

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('form-preview', FormPreview)
Vue.component('check-icon', CheckIcon)




// ju end


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  window.backUrl = from.fullPath;
  console.log('路由来自', backUrl);
  // console.log('路由去向',to.fullPath);
  next();
})


window.router = router;

// px  rem转换
var vM = 375;
var vfontSize = 16;
var html = document.documentElement;
var newfontSize = vfontSize * html.clientWidth / vM;
html.style.fontSize = newfontSize + 'px';