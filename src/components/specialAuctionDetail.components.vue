<template>
  <div class="lot">
    <div class="review-pic" v-if="view">
        <div class="mask" @click="closeView"></div>
        <div class="img">
          <img :src="curPath" alt="查看图片">
        </div>
      </div>
      <!-- 首页→→→→拍卖专场→→→→竞拍中页面 -->
      <div class="bidding">
            <div class="top-bidding">
              <!-- <img :src="specialInfo.banner_img" alt="拍品"> -->
              <swiper
                auto loop height="9.375rem"
                dots-position="center"
                @on-index-change="changePot">
                  <swiper-item class="black" v-for="(item,index) in swiperList" :key="index">
                      <img @click="reviewImages(item.path)" :src="item.path" alt="">
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
            <div class="bottom-bidding">
                <div class="specialInfo">
                  <div class="bidding-title">
                      <h3>{{specialInfo.name}}</h3>
                      <p class="state color-red" v-if="specialInfo.jie_status">{{jie_status}}</p>
                  </div>
                  <div class="bidding-info">
                      <p class="gray">时间：{{specialInfo.start_date}} 至 {{specialInfo.end_date}}</p>
                      <p 
                      v-if="specialInfo.jie_status == '3'&&CountDown&&state==true"
                      class="cutdown color-red"
                      >结拍倒计时<span>{{CountDown}}</span></p>
                  </div>
                </div>
                <div class="title-border">
                    <ul>
                        <li>
                            <span>拍品总量：</span>
                            <span>{{specialInfo.count}}件</span>
                        </li>
                        <li>
                            <span>出价人数：</span>
                            <span>{{specialInfo.bidding_num}}人</span>
                        </li>
                        <li>
                            <span>围观人数：</span>
                            <span>{{specialInfo.look_num}}人</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 拍品列表 -->
        <div v-if="auctionGoodList.length>0">
          <boutique-component 
            :boutiqueList="auctionGoodList"/>
        </div>
        <div v-else class="notHave">暂无拍品...</div>
    </div>
</template>
<script>
import { Swiper, SwiperItem } from "vux";
import eyesImg from "@/assets/images/home/eyes.png";
import BoutiqueComponent from "@/components/boutique.components";
import boutique from "@/assets/images/home/paipinzhanshi.png";
import boutique1 from "@/assets/images/home/jingpin.jpg";
import { clearInterval, setInterval } from "timers";
export default {
  name: "BiddingComponent",
  //   props: [""],
  data() {
    return {
      swiperList: [],
      batchId: "9",
      CountDown: "",
      eyesImg: eyesImg,
      jie_status: "",
      specialInfo: [],
      auctionGoodList: [],
      state: true,
      view: false,
      curPath: "",
      absoIndex: ""
    };
  },
  components: {
    BoutiqueComponent,
    Swiper,
    SwiperItem
  },
  computed: {},
  created: function() {
    this.$store.state.showBottomNav = false;
    let that = this;
    // let jie_status2 = this.$route.query.jie_status2;
    let option = {
      id: this.$route.query.id
    };
    this.countDown(option);
    // 专场详情  请求接口
    this.getRequestList.getDetailLists(option).then(function(res) {
      that.specialInfo = res.data.response_data;
    });
    // 专场内拍品
    let option2 = {
      special_id: option.id,
      // jie_status: jie_status2,
      coming_status: 1
    };
    that.getRequestList.getlotsLists(option2).then(function(res) {
      console.log(res);
      if (!res.data.error_code) {
        that.auctionGoodList = res.data.response_data.lists;
      }
    });

    // 轮播图
    let option4 = {
      type: 4,
      related_id: option.id
    };
    this.getRequestList.carouselList(option4).then(function(res) {
      that.swiperList = res.data.response_data.lists;
    });
  },
  methods: {
    closeView: function() {
      this.view = false;
    },
    /**
     * 点击查看图片
     */
    reviewImages: function(url) {
      this.view = true;
      this.curPath = url;
    },
    changePot: function(index) {
      this.absoIndex = index;
    },
    Jump: function(e) {},
    /**
     * 获取当前时间戳和商品结束时间戳判断进行倒计时
     * @param {Object} option  [当前商品id]
     */
    countDown: function(option) {
      let that = this;
      Promise.all([
        that.getRequestList.getCurTime(),
        that.getRequestList.getDetailLists(option)
      ]).then(function(resolve) {
        let specialInfo2 = resolve["1"].data.response_data;
        let nowTime = resolve["0"].data.response_data;
        let endTime = specialInfo2.end_time;
        let timer;
        if (specialInfo2.jie_status == "3") {
          that.jie_status = "竞拍中";
          if (endTime - nowTime <= 300 && endTime - nowTime > 0) {
            timer = setInterval(() => {
              nowTime++;
              if (nowTime >= endTime) {
                that.CountDown = "";
                that.jie_status = "已结拍";
                that.state = false;
                clearInterval(timer);
              }
              that.CountDown = that.timeStamp(endTime - nowTime);
            }, 1000);
          }
        } else {
          if (specialInfo2.jie_status == "2") {
            that.jie_status = "预展中";
          } else if (specialInfo2.jie_status == "1") {
            that.jie_status = "未开始";
          } else if (specialInfo2.jie_status == "4") {
            that.jie_status = "已结拍";
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.review-pic {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #000;
    opacity: 0.6;
    z-index: 9;
  }
  .img {
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 99;
    img {
      display: block;
      width: 100%;
    }
  }
}
// 组件样式
.bidding {
  &:last-child {
    margin-bottom: 0;
  }
  img {
    width: 100%;
  }
  .top-bidding {
    position: relative;
    height: 9.375rem;
    overflow: hidden;
    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .txt-top {
      position: absolute;
      width: 44%;
      top: 9%;
      right: -9%;
      display: flex;
      p {
        width: 34%;
        padding: 1%;
        text-align: center;
        border-radius: 60px;
        box-sizing: border-box;
        &.state {
          margin-right: 4%;
          color: #bf1616;
          border: 1px solid #bf1616;
        }
        &.watch {
          background: #a2a2a3;
          color: #fff;
          padding-left: 15%;
          background-repeat: no-repeat;
          background-position: 10% center;
          background-size: auto 50%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .bottom-bidding {
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-bottom: 0.625rem;
    .specialInfo {
      padding: 0 0.9375rem;
    }
    .bidding-title,
    .bidding-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2%;
    }
    .bidding-info {
      font-size: 12px;
      padding-bottom: 2%;
      border-bottom: 1px solid #f0f0f5;
      p {
        white-space: nowrap;
        text-align: left;
      }
    }
  }
}
h3 {
  letter-spacing: 2px;
  font-weight: 700;
}
.gray {
  color: #afafaf;
}
.color-red {
  color: #bf1616;
}
.state {
  padding: 1%;
  text-align: center;
  border-radius: 60px;
  box-sizing: border-box;
  color: #bf1616;
  border: 1px solid #bf1616;
  padding-right: 4%;
  padding-left: 4%;
  white-space: nowrap;
}
.title-border {
  padding: 4%;
  background: #fff;
  border-bottom: 1px solid #f0f0f5;
  ul {
    background: url(../assets/images/home/title-border.png) no-repeat center
      center;
    background-size: 100% 85%;
    display: flex;
    padding: 0.6% 0;
    justify-content: space-around;
    li {
      width: 30%;
      display: flex;
      white-space: nowrap;
      justify-content: center;
      border-right: 1px solid #646464;
      box-sizing: border-box;
      color: #949495;
      padding-right: 3%;
      font-size: 0.75rem;
      line-height: 0.75rem;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.notHave {
  color: #b5b5b5;
  font-size: 0.875rem;
  text-align: center;
  background: #fff;
  padding: 0.9375rem 0;
}
.pot {
  position: absolute;
  bottom: 0.875rem;
  left: 51%;
  transform: translateX(-50%);
  z-index: 1;
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
</style>