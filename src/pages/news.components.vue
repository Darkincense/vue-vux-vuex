<template>
    <div id="app" class="app">
        <div style="position:relative">
          <swiper
          auto loop height="13.125rem"
          dots-position="center"
          @on-index-change="changePot">
            <swiper-item class="black" v-for="(item,index) in baseList" :key="index">
                <img :src="item.path" alt="">
            </swiper-item>
          </swiper>
          <div class="pot">
            <ul class="pot-main">
              <li 
              v-if="baseList" 
              v-for="(item,index) in baseList" 
              :class="{active: index == absoIndex}"
              :key="index"></li>
            </ul>
          </div>
        </div>
        <!-- tab切换 -->
        <div class="tab">
            <div class="tab_li" v-for="(item,index) in tabList" :key="index" :class="state==index?'active':''" @click="switchTab(index)">
                <span>{{item}}</span>
            </div>
        </div>
        <div class="news_list" v-show="state==0">
            <ul v-if="newsList1.length>0">
                <li v-for="(item,index) in newsList1" :key="index">
                    <router-link :to="{path:'/newsDetail' ,query:{id:item.id}}">
                        <div class="news_img">
                            <img :src="item.path" alt="">
                        </div>
                        <div class="news_abstract">
                            <div class="news_title">{{item.title}}</div>
                            <div class="news_time">{{item.time}}</div>
                            <div class="news_con" v-html="item.content"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
             <!-- 分页加载 -->
            <p v-if="newsList1.length>0" @click="loadMoreNews" class="mores">{{loadMoretxt1}}</p>
            <p class="notCon" v-else>资讯图文暂无内容~</p>
        </div>
        <div class="video_list" v-show="state==1">
            <ul v-if="newsList2.length>0">
                <li v-for="(item,index) in newsList2" :key="index">
                    <div class="video_box">
                        <span class="video_sign">视频</span>
                        <video :src="item.path" :poster="item.bg_img" controls controlslist="nodownload"></video>
                    </div>
                    <div class="video_title">{{item.title}}</div>
                    <div class="video_time">{{item.time}}</div>
                    <div class="video_con" v-html="item.content"></div>
                </li>
            </ul>
             <!-- 分页加载 -->
            <p v-if="newsList2.length>0" @click="loadMoreVideo" class="mores">{{loadMoretxt2}}</p>
            <p class="notCon" v-else>资讯视频暂无内容~</p>
        </div>
        <loading-img ref="loading"/>
    </div>
</template>
<script>
import { Swiper, SwiperItem } from "vux";
import LoadingImg from "@/components/loading.components";
const tabList = ["图文", "视频"];
export default {
  data() {
    return {
      absoIndex: "",
      baseList: [],
      tabList: tabList,
      state: 0,
      newsList1: [],
      newsList2: [],
      information_id: "",
      page1: 1,
      page2: 1,
      loadMoretxt1: "点击加载更多...",
      loadMoretxt2: "点击加载更多..."
    };
  },
  components: {
    Swiper,
    SwiperItem,
    LoadingImg
  },
  methods: {
    /**
     * 视频分页加载
     */
    loadMoreNews: function() {
      this.page1++;
      this.switchTab(0);
    },
    /**
     * 图文分页加载
     */
    loadMoreVideo: function() {
      this.page2++;
      this.switchTab(1);
    },

    changePot: function(index) {
      this.absoIndex = index;
    },
    switchTab: function(index) {
      this.state = index;
      let that = this;
      // 资讯列表 切换
      let option = {
        type: index + 1,
        is_index: 2,
        page: null,
        num: 3
      };
      if (option.type == 1) {
        option.page = that.page1;
      }
      if (option.type == 2) {
        option.page = that.page2;
      }
      that.getRequestList.informationList(option).then(function(res) {
        if (option.type == 1) {
          if (that.page1 == 1) {
            that.newsList1 = res.data.response_data.lists;
          } else {
            if (res.data.response_data.lists.length != 0) {
              res.data.response_data.lists.forEach(item => {
                that.newsList1.push(item);
              });
            } else {
              that.loadMoretxt1 = "加载完毕";
            }
          }
        }
        if (option.type == 2) {
          if (that.page2 == 1) {
            that.newsList2 = res.data.response_data.lists;
          } else {
            if (res.data.response_data.lists.length != 0) {
              res.data.response_data.lists.forEach(item => {
                that.newsList2.push(item);
              });
            } else {
              that.loadMoretxt2 = "加载完毕";
            }
          }
        }
        that.$refs.loading.close();
      });
    },
    getNewsList: function() {
      let that = this;
      // 资讯列表
      let option = {
        type: 1,
        is_index: 2,
        num: 3
      };
      this.getRequestList.informationList(option).then(function(res) {
        that.$refs.loading.close();
        if (!res.data.error_code) {
          that.newsList1 = res.data.response_data.lists;
          if (res.data.response_data.lists > 0) {
            that.information_id = res.data.response_data.lists[0].id;
          }
        }
      });
    }
  },
  created: function() {
    let that = this;
    this.$store.state.showBottomNav = true;
    this.getNewsList();
    // 轮播图
    let option2 = {
      type: 2,
      related_id: 1,
      page: null,
      num: 3
    };
    this.getRequestList.carouselList(option2).then(function(res) {
      if (!res.data.error_code) {
        that.baseList = res.data.response_data.lists;
      }
    });
  }
};
</script>
<style lang="less">
p.mores {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
.black {
  position: relative;
}
.black img {
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
}
.vux-slider,
.tab {
  margin-bottom: 0.625rem;
}
.tab {
  background: #fff;
  height: 3.125rem;
  padding: 0 0.938rem;
  margin-bottom: 0.625rem;
  overflow: hidden;
}
.tab_li {
  width: 50%;
  height: 3.125rem;
  text-align: center;
  line-height: 1.312rem;
  color: #333;
  font-size: 0.938rem;
  padding: 0.938rem 0;
  float: left;
  box-sizing: border-box;
}
.tab_li span {
  display: block;
  height: 1.25rem;
}
.tab_li:first-child span {
  border-right: 0.062rem solid #f0f0f5;
}
.tab .active {
  color: #ba0303;
}
// 图文资讯
.news_list,
.video_list {
  margin-bottom: 0.625rem;
}
.news_list ul li {
  padding: 1.25rem 0.9375rem;
  overflow: hidden;
  height: 5rem;
  background: #fff;
}
.news_list ul li:not(:last-child) {
  border-bottom: 0.0625rem solid #e0e0e0;
}
.news_list ul li a {
  display: block;
  width: 100%;
  height: 100%;
}
.news_img {
  float: left;
  width: 8.4375rem;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.news_img img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  height: auto;
}
.news_abstract {
  float: right;
  width: 12.5rem;
}
.news_title {
  color: #000;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.news_time {
  margin-top: 0.375rem;
  color: #656565;
  font-size: 0.875rem;
  line-height: 1.3125rem;
}
.news_con {
  color: #656565;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.625rem;
}
// 视频资讯
.video_list ul li {
  padding: 1.25rem 0.9375rem;
  overflow: hidden;
  background: #fff;
}
.video_list ul li:not(:last-child) {
  margin-bottom: 0.625rem;
}
.video_box {
  width: 100%;
  height: 12.8125rem;
  position: relative;
  background: #f0f0f5;
}
.video_sign {
  display: block;
  width: 1.875rem;
  height: 0.9375rem;
  background: #ba0303;
  border-radius: 0.125rem;
  color: #fff;
  font-size: 0.75rem;
  line-height: 0.9375rem;
  text-align: center;
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  z-index: 10;
}
.video_box video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
}
// .play_btn {
//     width: 2rem;
//     height: 2rem;
//     display: block;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%,-50%);
//     z-index: 10;
// }
// .play_btn img {
//     display: block;
//     width: 100%;
//     height: 100%;
// }
.video_title {
  float: left;
  color: #000;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  padding: 0.625rem 0;
}
.video_time {
  float: right;
  color: #656565;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  padding: 0.625rem 0;
}
.video_con {
  width: 100%;
  float: left;
  color: #656565;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  text-align: justify;
}
.notCon {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
.pot {
  position: absolute;
  bottom: 0.875rem;
  left: 51%;
  transform: translateX(-50%);
  z-index: 6;
  .pot-main {
    display: flex;
    justify-content: center;
    li {
      margin-right: 0.375rem;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: #d0cdd1;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background: #ba0303;
      }
    }
  }
}
.vux-slider > .vux-indicator-center {
  display: none;
}
</style>

