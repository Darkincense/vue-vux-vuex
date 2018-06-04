<template>
  <div id="app" class="app">
    <div class="swiper"  style="position:relative;">
        <swiper
        auto loop height="13.125rem" 
        dots-position="center"
        @on-index-change="changePot" >
            <swiper-item class="black" v-for="(item,index) in swiperList" :key="index">
                <div @click="openUrl(item.href_url)">
                  <img :src="item.path" alt="">
                </div>
            </swiper-item>
        </swiper>
        <div class="pot">
          <ul class="pot-main">
            <li 
            v-if="swiperList" 
            v-for="(item,index) in swiperList" 
            :class="{active: index == absoIndex}"
            :key="index"></li>
          </ul>
        </div>
    </div>
    <div class="recommend">
        <div class="left">
            <img :src="data.fixedImg.recomed" alt="">
            <span class="point"></span>
            <div class="informationList" >
              <swiper auto height="20px" 
              direction="vertical" 
              loop :interval=3000 
              class="text-scroll"
              :show-dots="false"
              @on-index-change="changeTitle">
                <swiper-item v-for="(item,index) in auraNewsList" :key="index">
                  <router-link :to="{path: '/newsDetail', query: {id:item.id}}">
                    {{item.title}}
                  </router-link>
                </swiper-item>
              </swiper>
            </div>
        </div>
        <div class="right">
            <router-link :to="{path: '/newsDetail', query: {id:newsId}}">
              <img :src="data.fixedImg.rightArrow" alt="箭头">
            </router-link>
        </div>
    </div>
    <div class="auction-nav">
        <ul>
            <span class="point2"></span>
            <span class="point2"></span>
            <li 
            :class="{active:data.auctionNav.auction == 'auctioned'}"
            @click="switchTab('auctioned')">
                <img v-if="data.auctionNav.auction == 'auctioned'" :src="tabActive" alt="">
                <img v-else :src="tabBg" alt="">
                <span >即将结拍</span>
            </li>
            <li 
            :class="{active:data.auctionNav.auction == 'auctioning'}"
            @click="switchTab('auctioning')">
                <img v-if="data.auctionNav.auction == 'auctioning'" :src="tabActive" alt="">
                <img v-else :src="tabBg" alt="">
                <span>专场拍卖</span>
            </li>
            <li 
            :class="{active:data.auctionNav.auction == 'Boutique'}"
            @click="switchTab('Boutique')">
                <img v-if="data.auctionNav.auction == 'Boutique'" :src="tabActive" alt="">
                <img v-else :src="tabBg" alt="">
                <span>精品拍卖</span>
            </li>
        </ul>
    </div>
    <!-- 即将结拍 -->
    <div 
    v-if="data.auctionNav.auction == 'auctioned'"
    class="auctioned">
      <!-- 即将结拍  专场 -->
      <div class="zhuanchang">
        <img :src="data.fixedImg.zhuanChang" alt="" v-show="data.biddingList.length>0">
      </div>
      <bidding-component
      v-if="data.biddingList"
      :biddingList="data.biddingList"
      :auction="data.auctionNav.auction"/>
      <!-- 分页加载 -->
      <p v-if="data.biddingList.length > 0" @click="loadMore1" class="mores">{{loadMoretxt1}}</p>
      <!-- 即将结拍  精品 -->
      <div class="jingpin">
        <img :src="data.fixedImg.jingPin" alt="" v-show="data.boutiqueList.length>0">
      </div>
      <boutique-component 
      v-if="data.boutiqueList"
      :boutiqueList="data.boutiqueList"/>
      <!-- 分页加载 -->
      <p v-if="data.boutiqueList.length > 0" @click="loadMore8" class="mores">{{loadMoretxt8}}</p>
    </div>
    <!-- 专场拍卖 -->
    <div
    v-if="data.auctionNav.auction == 'auctioning'"
    class="Boutique">
      <auction-switch 
      v-on:changeStatue = "changeStatue($event)"
      :statuAction="data.statuAction.statuAction1"/>
        <div 
        v-if="data.statuAction.statuAction1.status == '1'"
        class="auctioning-jingpaizhong">
        <!-- 竞拍中 -->
          <div v-if="data.specialList.length > 0">
            <bidding-component
            v-if="data.specialList"
            :biddingList="data.specialList"/>
          </div>
          <div v-else class="txt-prompt">
            <p>暂无拍品~</p>
          </div>
          <!-- 分页加载 -->
          <p v-if="data.specialList.length > 0" @click="loadMore2" class="mores">{{loadMoretxt2}}</p>
        </div>
        <div 
        v-if="data.statuAction.statuAction1.status == '2'"
        class="auctioning-yuzhanzhong">
        <!-- 预展中 -->
            <div v-if="data.specialList2.length > 0">
              <bidding-component
              v-if="data.specialList2"
              :biddingList="data.specialList2"/>
            </div>
            <div v-else class="txt-prompt">
              <p>暂无拍品~</p>
            </div>
            <!-- 分页加载 -->
            <p v-if="data.specialList2.length > 0" @click="loadMore3" class="mores">{{loadMoretxt3}}</p>
        </div>
        <div 
        v-if="data.statuAction.statuAction1.status == '3'"
        class="auctioning-yijiepai">
        <!-- 已结拍 -->
            <div v-if="data.specialList3.length > 0">
              <bidding-component
              v-if="data.specialList3"
              :biddingList="data.specialList3"/>
            </div>
            <div v-else class="txt-prompt">
              <p>暂无拍品~</p>
            </div>
            <!-- 分页加载 -->
            <p v-if="data.specialList3.length > 0" @click="loadMore4" class="mores">{{loadMoretxt4}}</p>
        </div>
    </div>

    <!-- 精品拍卖 -->
    <div
    v-if="data.auctionNav.auction == 'Boutique'"
    class="auctioning">
      <auction-switch 
      v-on:changeStatue = "changeStatue($event)"
      :statuAction="data.statuAction.statuAction2"/>
        <div 
        v-if="data.statuAction.statuAction2.status == '1'"
        class="auctioning-jingpaizhong">
        <!-- 竞拍中 -->
            <div v-if="data.competitiveProductsList.length > 0">
              <boutique-component 
              v-if="data.competitiveProductsList"
              :boutiqueList="data.competitiveProductsList"/>
            </div>
            <div v-else class="txt-prompt">
              <p>暂无拍品~</p>
            </div>
            <!-- 分页加载 -->
            <p v-if="data.competitiveProductsList.length > 0" @click="loadMore5" class="mores">{{loadMoretxt5}}</p>
        </div>
        <div 
        v-if="data.statuAction.statuAction2.status == '2'"
        class="auctioning-yuzhanzhong">
        <!-- 预展中 -->
            <div v-if="data.competitiveProductsList2.length > 0">
              <boutique-component 
              v-if="data.competitiveProductsList2"
              :boutiqueList="data.competitiveProductsList2"/>
            </div>
            <div v-else class="txt-prompt">
              <p>暂无拍品~</p>
            </div>
            <!-- 分页加载 -->
            <p v-if="data.competitiveProductsList2.length > 0" @click="loadMore6" class="mores">{{loadMoretxt6}}</p>
        </div>
        <div 
        v-if="data.statuAction.statuAction2.status == '3'"
        class="auctioning-yijiepai">
        <!-- 已结拍 -->
            <div v-if="data.competitiveProductsList3.length > 0">
              <boutique-component 
              v-if="data.competitiveProductsList3"
              :boutiqueList="data.competitiveProductsList3"/>
            </div>
            <div v-else class="txt-prompt">
              <p>暂无拍品~</p>
            </div>
            <!-- 分页加载 -->
            <p v-if="data.competitiveProductsList3.length > 0" @click="loadMore7" class="mores">{{loadMoretxt7}}</p>
        </div>
    </div>
    <div class="ad-tiitle">
        <div class="txt">
          <p class="mobile">客服热线：<span style="color:#bf1616;">15301310321</span></p>
          <p class="email">投递邮箱：guanghuanyipai@126.com</p>
        </div>
        <img :src="adTitle" alt="">
      </div>
  <loading-img ref="loading"/>
  </div>
</template>
<script>
// 组件引用
import { Swiper, SwiperItem } from "vux";
import LoadingImg from "@/components/loading.components";
import BiddingComponent from "@/components/bidders.components";
import BoutiqueComponent from "@/components/boutique.components";
import AuctionSwitch from "@/components/auctionSwitch.components";
import homeData from "../assets/common/js/home.data";
import tabBg from "../assets/images/home/tab_bg.jpg";
import tabActive from "../assets/images/home/tab_active.jpg";
import adTitle from "../assets/images/home/ad_title.png";

export default {
  data() {
    return {
      adTitle: adTitle,
      falses: false,
      absoIndex: "", // 轮播图切换index
      data: homeData,
      tabBg: tabBg,
      tabActive: tabActive,
      swiperList: [],
      auraNewsList: [],
      switchIndex: 0,
      type: {
        index: 0
      },
      newsId: "",
      loadMoretxt1: "点击加载更多...",
      loadMoretxt2: "点击加载更多...",
      loadMoretxt3: "点击加载更多...",
      loadMoretxt4: "点击加载更多...",
      loadMoretxt5: "点击加载更多...",
      loadMoretxt6: "点击加载更多...",
      loadMoretxt7: "点击加载更多...",
      loadMoretxt8: "点击加载更多...",
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      page7: 1,
      page8: 1
    };
  },
  components: {
    Swiper,
    SwiperItem,
    BiddingComponent,
    BoutiqueComponent,
    AuctionSwitch,
    LoadingImg
  },
  methods: {
    loadMore8: function() {
      this.page8++;
      console.log("去请求第", this.page8, "页");
      // this.getLists(this.page8);
      this.getlotsLists(this.page8);
    },
    // 专场即将结拍分页
    loadMore1: function() {
      this.page1++;
      console.log("去请求第", this.page1, "页");
      this.getLists(this.page1);
    },
    // 专场竞拍中标
    loadMore2: function() {
      let type = {
        index: 0
      };
      this.page2++;
      this.changeStatue(type);
    },
    // 专场竞拍中标
    loadMore3: function() {
      let type = {
        index: 1
      };
      this.page3++;
      this.changeStatue(type);
    },
    // 专场竞拍中标
    loadMore4: function() {
      let type = {
        index: 2
      };
      this.page4++;
      this.changeStatue(type);
    },
    // 专场竞拍中标
    loadMore5: function() {
      let type = {
        index: 0
      };
      this.page5++;
      this.changeStatue(type);
    },
    // 专场竞拍中标
    loadMore6: function() {
      let type = {
        index: 1
      };
      this.page6++;
      this.changeStatue(type);
    },
    // 专场竞拍中标
    loadMore7: function() {
      let type = {
        index: 2
      };
      this.page7++;
      this.changeStatue(type);
    },
    changePot: function(index) {
      this.absoIndex = index;
    },
    changeTitle: function(index) {
      this.auraNewsList.forEach((item, idx) => {
        if (index == idx) {
          this.newsId = item.id;
        }
      });
    },
    /**
     * 跳转外部链接
     */
    openUrl: function(e) {
      document.location = e;
    },
    switchTab: function(str) {
      this.data.auctionNav.auction = str;
    },
    changeStatue: function(type) {
      let that = this;
      that.type = type;
      that.$refs.loading.open();
      if (this.data.auctionNav.auction == "auctioning") {
        this.data.statuAction.statuAction1.arr.forEach((item, index) => {
          if (that.type.index == index) {
            this.data.statuAction.statuAction1.status = item.status;
            // 专场拍卖  切换
            let option3 = {
              jie_status: 3,
              coming_status: 1,
              num: 3,
              page: ""
            };
            if (index == 0) {
              option3.jie_status = 3;
              option3.page = that.page2;
            } else if (index == 1) {
              option3.jie_status = 2;
              option3.page = that.page3;
            } else if (index == 2) {
              option3.jie_status = 4;
              option3.page = that.page4;
            }
            that.getRequestList.getLists(option3).then(function(res) {
              if (!res.data.error_code) {
                if (index == 0) {
                  console.log("状态1");
                  // 专场竞拍中分页
                  if (that.page2 == 1) {
                    that.data.specialList = res.data.response_data.lists;
                  } else {
                    if (res.data.response_data.lists.length > 0) {
                      res.data.response_data.lists.forEach(item => {
                        that.data.specialList.push(item);
                      });
                    } else {
                      that.loadMoretxt2 = "加载完毕";
                    }
                  }
                } else if (index == 1) {
                  console.log("状态2");
                  // 专场预展中分页
                  if (that.page3 == 1) {
                    that.data.specialList2 = res.data.response_data.lists;
                  } else {
                    if (res.data.response_data.lists.length > 0) {
                      res.data.response_data.lists.forEach(item => {
                        that.data.specialList2.push(item);
                      });
                    } else {
                      that.loadMoretxt3 = "加载完毕";
                    }
                  }
                } else if (index == 2) {
                  console.log("状态3");
                  // 专场结已结拍分页
                  if (that.page4 == 1) {
                    that.data.specialList3 = res.data.response_data.lists;
                  } else {
                    if (res.data.response_data.lists.length > 0) {
                      res.data.response_data.lists.forEach(item => {
                        that.data.specialList3.push(item);
                      });
                      console.log("分页后", that.data.specialList3);
                    } else {
                      that.loadMoretxt4 = "加载完毕";
                    }
                  }
                }
              }
            });
          }
          that.$refs.loading.close();
        });
      } else if (this.data.auctionNav.auction == "Boutique") {
        this.data.statuAction.statuAction2.arr.forEach((item, index) => {
          if (that.type.index == index) {
            this.data.statuAction.statuAction2.status = item.status;
            // 精品拍卖  切换
            let option5 = {
              jie_status: 3,
              coming_status: 1,
              num: 3,
              page: ""
            };
            if (index == 0) {
              option5.jie_status = 3;
              option5.page = that.page5;
            } else if (index == 1) {
              option5.jie_status = 2;
              option5.page = that.page6;
            } else if (index == 2) {
              option5.jie_status = 4;
              option5.page = that.page7;
            }
            that.getRequestList.getlotsLists(option5).then(function(res) {
              if (!res.data.error_code) {
                if (index == 0) {
                  // 专场竞拍中分页
                  if (that.page5 == 1) {
                    that.data.competitiveProductsList =
                      res.data.response_data.lists;
                  } else {
                    if (res.data.response_data.lists.length > 0) {
                      res.data.response_data.lists.forEach(item => {
                        that.data.competitiveProductsList.push(item);
                      });
                    } else {
                      that.loadMoretxt5 = "加载完毕";
                    }
                  }
                } else if (index == 1) {
                  // 专场竞拍中分页
                  if (that.page6 == 1) {
                    that.data.competitiveProductsList2 =
                      res.data.response_data.lists;
                  } else {
                    if (res.data.response_data.lists.length > 0) {
                      res.data.response_data.lists.forEach(item => {
                        that.data.competitiveProductsList2.push(item);
                      });
                    } else {
                      that.loadMoretxt6 = "加载完毕";
                    }
                  }
                } else if (index == 2) {
                  // 专场竞拍中分页
                  if (that.page7 == 1) {
                    that.data.competitiveProductsList3 =
                      res.data.response_data.lists;
                  } else {
                    if (res.data.response_data.lists.length > 0) {
                      res.data.response_data.lists.forEach(item => {
                        that.data.competitiveProductsList3.push(item);
                      });
                    } else {
                      that.loadMoretxt7 = "加载完毕";
                    }
                  }
                }
              }
            });
          }
          that.$refs.loading.close();
        });
        that.$refs.loading.close();
      }
    },
    checkState: function() {
      let that = this;

      let code = location.href.match(/code=(\S*)&state=/)[1];
      let state = location.href.match(/state=(\S*)#/)[1];

      var optionCode = {
        code: code
      };
      if (state == "base") {
        that.getRequestList.sendCodeBase(optionCode).then(function(res) {
          if (!res.data.error_code) {
            document.location =
              "http://weipai.test01.qcw100.cn/index.html?login=1";
          }
        });
      } else {
        that.getRequestList.sendCode(optionCode).then(function(res) {
          if (!res.data.error_code) {
            document.location =
              "http://weipai.test01.qcw100.cn/index.html?login=1";
          }
        });
      }
    },
    // 微信静默登陆
    wxBaseLogin: function() {
      let that = this;
      var appId = "wx48adb8743d3357d7";
      var scope = "snsapi_base";
      var state = "base"; //带这个参数的好处就是防止非法的请求。
      var url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
      url = url + "appid=" + appId;
      url =
        url +
        "&redirect_uri=" +
        encodeURI("http://weipai.test01.qcw100.cn/index.html");
      url = url + "&response_type=code";
      url = url + "&scope=" + scope;
      if (state != null) {
        url = url + "&state=" + state;
      }
      url = url + "#wechat_redirect"; //进行URL的拼接
      window.location.href = url; //调用回调 完成静默登陆
    },
    // 即将结拍
    getLists: function(page1) {
      let that = this;
      let page = page1 ? page1 : 1;
      // 即将结拍 专场
      let option = {
        // jie_status: 3,
        coming_status: 2,
        page: page,
        num: 3
      };
      that.getRequestList.getLists(option).then(function(res) {
        if (!res.data.error_code) {
          if (page == 1) {
            that.data.biddingList = res.data.response_data.lists;
          } else {
            if (res.data.response_data.lists.length > 0) {
              res.data.response_data.lists.forEach(function(item) {
                that.data.biddingList.push(item);
              });
            } else {
              that.loadMoretxt1 = "已加载完毕";
            }
          }
        }
      });
    },
    // 推荐资讯
    informationList: function() {
      let that = this;
      let option6 = {
        type: 1,
        is_index: 1
      };
      this.getRequestList.informationList(option6).then(function(res) {
        if (!res.data.error_code) {
          that.auraNewsList = res.data.response_data.lists;
          that.newsId = that.auraNewsList[0].id;
        }
      });
    },
    // 即将结拍精品
    getlotsLists: function(page1) {
      let that = this;
      let page = page1 ? page1 : 1;
      let option2 = {
        special_id: 0,
        coming_status: 2,
        page: page,
        num: 3
      };
      that.getRequestList.getlotsLists(option2).then(function(res) {
        if (!res.data.error_code) {
          // that.data.boutiqueList = res.data.response_data.lists;

          if (page == 1) {
            that.data.boutiqueList = res.data.response_data.lists;
          } else {
            if (res.data.response_data.lists.length > 0) {
              res.data.response_data.lists.forEach(function(item) {
                that.data.boutiqueList.push(item);
              });
            } else {
              that.loadMoretxt8 = "已加载完毕";
            }
          }
        }
      });
    },
    // 专场拍卖
    getListss: function() {
      let that = this;
      let option3 = {
        jie_status: 3,
        coming_status: 1,
        num: 3
      };
      that.getRequestList.getLists(option3).then(function(res) {
        if (!res.data.error_code) {
          that.data.specialList = res.data.response_data.lists;
        }
      });
    },
    // 精品拍卖
    getlotsListss: function() {
      let that = this;
      let option5 = {
        special_id: 0,
        jie_status: 3,
        coming_status: 1,
        num: 3
      };
      that.getRequestList.getlotsLists(option5).then(function(res) {
        if (!res.data.error_code) {
          that.data.competitiveProductsList = res.data.response_data.lists;
        }
      });
    }
  },
  mounted: function() {
    this.$refs.loading.close();
  },
  beforeCreate: function() {},
  created: function() {
    // alert("已更新");
    this.$store.state.showBottomNav = true;
    let that = this;
    that.wxLogin();
    // 后台以获取 并完成 code 的操作 此时 当前页面携带参数 login=1
    // if (location.href.match(/login=(\S*)#/)) {
    //   //已经登陆上了
    // } else {
    //   // 判断没完成 是否 是 存在code 和state 参数 即获取到了 没向后台传值
    //   if (location.href.match(/code=(\S*)&state=/)) {
    //     that.checkState(); // status 截取判断 是静默 还是 授权
    //   } else {
    //     // that.wxBaseLogin(); // 调用静默登陆
    //   }
    // }
    // 轮播图
    let option4 = {
      type: 1
    };
    this.getRequestList.carouselList(option4).then(function(res) {
      if (!res.data.error_code) {
        that.swiperList = res.data.response_data.lists;
      }
    });
    // 即将结拍专场
    this.getLists();

    // 推荐资讯
    this.informationList();
    // 即将结拍  精品
    this.getlotsLists();
    // 专场拍卖
    this.getListss();
    // 精品拍卖
    this.getlotsListss();
    // 判断是否从公众号点击跳转过来
    console.log("this.$route.query.end", this.getQueryString("end"));
    if (this.getQueryString("end") == 1) {
      // 打开即将结拍
      this.data.auctionNav.auction = "auctioned";
    }
  }
};
</script>
<style lang="less" scoped>
.ad-tiitle {
  position: relative;
  img {
    display: block;
    width: 100%;
  }
  .txt {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .mobile {
      position: absolute;
      left: 50%;
      font-size: 12px;
    }
    .email {
      position: absolute;
      top: 57%;
      left: 60%;
      font-size: 12px;
    }
    p {
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      color: #78787a;
    }
  }
}
p.mores {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
.txt-prompt {
  p {
    padding: 1.25rem;
    color: #666;
    font-size: 0.938rem;
    text-align: center;
  }
}
img {
  display: block;
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
.informationList {
  margin-left: 1.625rem;
}
.informationList .vux-slider {
  width: 15rem;
}
.informationList .vux-swiper-item a {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recommend {
  padding: 0 4%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
  padding: 0.75rem 0.9375rem;
  border-bottom: 1px solid #f0f0f5;
  background: #fff;
  position: relative;
  .point {
    margin: 0 2%;
  }
  .left {
    width: 90%;
    display: flex;
    align-items: center;
  }
  img {
    height: 1.2rem;
    &.point {
      height: 0.3125rem;
      padding: 0 0.25rem;
    }
  }
}
.auction-nav {
  position: relative;
  background: #fff;
  height: 4.6875rem;
  img {
    width: 100%;
  }
  ul {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    li {
      position: relative;
      width: 33%;
      text-align: center;
      img {
        display: block;
        width: 100%;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 14%;
        transform: translateY(-50%);
      }
      span {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        color: #000;
        font-size: 0.9375rem;
        line-height: 1.375rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }
      &.active::before {
        position: absolute;
        bottom: 18%;
        content: "";
        left: 50%;
        transform: translateX(-50%);
        width: 20%;
        height: 2px;
        background: #bf1616;
        border-radius: 3px;
        z-index: 2;
      }
    }
  }
}
.auctioned {
  img {
    width: 100%;
  }
}
.notHave {
  color: #b5b5b5;
  font-size: 0.875rem;
  text-align: center;
  background: #fff;
  padding: 0.9375rem 0;
}
.point,
.point2 {
  width: 0.25rem;
  height: 0.25rem;
  background: #333;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
}
.point {
  left: 4.375rem;
}
.point2:first-child {
  left: 33.3%;
}
.point2:nth-child(2) {
  right: 33.3%;
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
.tab,
.vux-slider {
  margin-bottom: 0;
}
</style>
