<style lang="less" scoped >
@import "~vux/src/styles/reset.less";
* {
  list-style: none;
}
body {
  background-color: #fbf9fe;
  .cur::before {
    position: absolute;
    content: "";
    top: 8%;
    right: 23%;
    width: 6%;
    height: 0.5rem;
    background: #c73636;
  }
  ul {
    position: fixed;
    left: 0;
    right: 0;
    height: 3.125rem;
    bottom: 0;
    display: flex;
    z-index: 100;
    background: #fff;
    display: flex;
    display: -webkit-flex;
    align-items: baseline;
    justify-content: center;
    li {
      &.cur {
        color: red;
      }
      width: 25%;
      height: 100%;
      text-align: center;
      position: relative;
      padding-top: 4px;
      img {
        display: block;
        height: 1.25rem;
        width: auto;
        margin: 0 auto;
      }
      p {
        margin-top: 7%;
        color: #d7d7d9;
      }
    }
    .cur p {
      color: #000;
    }
  }
}
.beta {
  width: 6.25rem;
  height: auto;
  position: fixed;
  bottom: 4.375rem;
  right: 0.938rem;
  z-index: 101;
}
.beta img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div id="app" class="app-link">
    <!-- 测试版图标 -->
    <div class="beta">
      <img src="./assets/images/home/mobile.png" alt="">
    </div>
    <ul v-if="$store.state.showBottomNav">
        <router-link 
        tag="li" 
        v-for="(item,index) of routers" 
        :key="index" 
        @click.native="changeCUr(index)" 
        :to="item.route"
        :class="item.class"
        active-class="cur"
        exact
        >
        <img :src="item.imgUrl" alt="">
        <p>{{ item.name }}</p>
        </router-link>
      </ul>
    <router-view></router-view>
  </div>
</template>

<script>
// 灰色图标
import home1 from "@/assets/images/home/home_active.png";
import news1 from "@/assets/images/home/news_active.png";
import halo1 from "@/assets/images/home/halo_active.png";
import personal1 from "@/assets/images/home/personal_active.png";
// 选中图标
import home from "@/assets/images/home/home.png";
import news from "@/assets/images/home/news.png";
import halo from "@/assets/images/home/halo.png";
import personal from "@/assets/images/home/personal.png";
export default {
  name: "app",
  data() {
    return {
      routers: [
        {
          name: "首页",
          route: "/",
          imgUrl: home,
          class: "cur",
          activeUrl: home,
          inverUrl: home1
        },
        {
          name: "资讯",
          route: "/news",
          imgUrl: news1,
          class: "",
          activeUrl: news,
          inverUrl: news1
        },
        {
          name: "光环",
          route: "/halo",
          imgUrl: halo1,
          class: "",
          activeUrl: halo,
          inverUrl: halo1
        },
        {
          name: "个人中心",
          route: "/personal",
          imgUrl: personal1,
          class: "",
          activeUrl: personal,
          inverUrl: personal1
        }
      ]
    };
  },
  methods: {
    changeCUr: function(idx) {
      let that = this;
      this.routers.forEach((item, index) => {
        if (idx != 0) {
          that.routers[0].class = "";
          that.routers[0].imgUrl = that.routers[0].inverUrl;
        } else {
          that.routers[0].class = "cur";
          that.routers[0].imgUrl = that.routers[0].activeUrl;
        }
        if (idx == index) {
          item.imgUrl = item.activeUrl;
        } else {
          item.imgUrl = item.inverUrl;
        }
      });
      // this.$refs.loading.open();
      // 主路由切换事件
      // console.log('e',e.target)
      // console.log('当前路由',this.$route.path)
      // 路由切换时会给当前的路由标签的按钮添加一个 router-link-active 的class类名（去前提是给标签添加exact属性）
      // active-class 该属性是给当前的路由标签添加自定义属性，来控制样式
    }
  },
  created: function() {}
};
</script>


