import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const state = {
    // 控制主路由导航组件的显示和隐藏
    showBottomNav: true,
    imgUrl: "http://admin.weipai.test01.qcw100.cn"
}

export default new Vuex.Store({
    state
})