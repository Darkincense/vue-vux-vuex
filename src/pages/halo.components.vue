<template>
    <div id="app" class="app">
        <!-- tab切换 -->
        <div class="aura_nav">
            <ul>
                <li 
                v-for="(item,index) in list" 
                @click="switchTab(index)" 
                :key="index"
                v-bind:class="state==index?'active':''">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="aura_con">
            <ul>
                <li v-show="state == 0">
                    <p>{{suggestCon.title}}</p>
                    <p v-html="suggestCon.content"></p>
                </li>
                <li v-show="state == 1">
                    <p>{{suggestCon.title}}</p>
                    <p v-html="suggestCon.content"></p>
                </li>
                <li v-show="state == 2">
                    <flexbox orient="horizontal" :gutter="0" wrap="wrap">
                        <flexbox-item 
                        :span="1/3" 
                        v-for="(item,index) in artist_list"
                        :key="index">
                            <router-link :to="{path: '/artist',query: {id:item.id}}">
                                <div class="flex-demo">
                                    <div class="artist_img">
                                        <img :src="item.avatar" alt="">
                                    </div>
                                    <p>{{item.username}}</p>
                                </div>
                            </router-link>
                        </flexbox-item>
                    </flexbox>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
const list = ["光环介绍", "光环机构", "合作艺术家"];
import { Flexbox, FlexboxItem } from "vux";

export default {
  data() {
    return {
      list: list,
      suggestCon: "",
      state: 0,
      artist_list: []
    };
  },
  components: {
    Flexbox,
    FlexboxItem
  },
  methods: {
    switchTab: function(index) {
      this.state = index;
      if (index == 0 || index == 1) {
        let that = this;
        let option = {
          type: index + 1
        };
        this.getRequestList.systemSetup(option).then(function(res) {
          if (!res.data.error_code) {
            that.suggestCon = res.data.response_data[0];
          }
        });
      }
    }
  },
  created: function() {
    this.$store.state.showBottomNav = true;
    let that = this;
    // 光环简介、光环机构
    let option2 = {
      type: 1
    };
    this.getRequestList.systemSetup(option2).then(function(res) {
      if (!res.data.error_code) {
        that.suggestCon = res.data.response_data[0];
      }
    });

    // 艺术家列表
    let option = {
      num: null,
      page: null
    };
    this.getRequestList.artistList(option).then(function(res) {
      if (!res.data.error_code) {
        that.artist_list = res.data.response_data.lists;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.app {
  background: #f0f0f5;
}
.aura_nav {
  height: 3.125rem;
  background: #fff;
  margin-bottom: 0.625rem;
}
.aura_nav ul li {
  float: left;
  width: 33.33333%;
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: center;
  color: #333;
  font-size: 0.938rem;
}
.aura_nav .active {
  color: #ba0303;
  background: url(../assets/images/halo/active.png) center center no-repeat;
  background-size: 80% 38%;
}
.aura_con {
  background: #fff;
  padding: 1.25rem 0.938rem 1rem 0.938rem;
}
.aura_con ul li {
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5rem;
}
.vux-flexbox-item {
  margin-bottom: 1.562rem;
}
.vux-flexbox-item a {
  display: block;
  width: 100%;
  height: 100%;
}
.artist_img {
  display: block;
  width: 4.062rem;
  height: 4.062rem;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.artist_img img {
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
}
.flex-demo p {
  color: #333;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.312rem;
  padding-top: 0.375rem;
}
</style>
