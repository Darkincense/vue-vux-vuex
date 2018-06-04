<template>
  <div class="lot" v-if="biddingList.length > 0">
      <!-- 专场竞拍 -->
      <div 
        class="bidding"
        data-id="unit.id"
        v-for="(item,index) of biddingList"
        :key="index"
        @click="Jump($event)"
        v-show="biddingList.length>0">
          <router-link :to="{path: '/specialAuctionDetail', query: {id:item.id,jie_status2:item.jie_status}}">
            <div class="top-bidding">
                <img :src="item.img" alt="拍品">
                <div class="txt-top">
                    <p class="state" v-if="item.jie_status == '1'">未开始</p>
                    <p class="state" v-if="item.jie_status == '2'">预展中</p>
                    <p class="state" v-if="item.jie_status == '3'">竞拍中</p>
                    <p class="state" v-if="item.jie_status == '4'">已结拍</p>
                    <p :style="{backgroundImage: 'url(' + eyesImg + ')' }" class="watch">{{item.look_num}}</p>
                </div>
            </div>
            <div class="bottom-bidding">
                <div class="bidding-title">
                    <h3>{{item.name}}</h3>
                    <p class="font12 gray">时间：{{item.start_date}} 至 {{item.end_date}}</p>
                </div>
                <div class="bidding-info">
                    <!-- <p class="font12 cutdown" v-if="item.jie_status==3&&item.end_time.indexOf(':')!=-1&&item.ctime==true">结拍倒计时 {{item.end_time}}</p> -->
                    <!-- <p class="font12 cutdown" >结拍倒计时{{item.c_time}}</p> -->
                    <p class="bode">已出价 {{item.bidding_num}}人</p>
                </div>
            </div>
          </router-link>
      </div>
      <!-- hourCount -->
    <!-- <page-more :load="a" v-on:LoadMore="zidingyi($event)"/> -->
  </div>
</template>
<script>
import eyesImg from "@/assets/images/home/eyes.png";
import { setInterval } from "timers";
// import PageMore from "@/components/pageMore.components";
export default {
  name: "BiddingComponent",
  props: ["biddingList", "auction"],
  data() {
    return {
      page: 1,
      a: 12,
      eyesImg: eyesImg,
      CountDown: [],
      state: true,
      // daojishi: "",
      curTime: "", // 当前时间
      jishuqi: "",
      biddingList1: []
    };
  },
  // components: { PageMore },
  computed: {
    status() {
      let that = this;
    }
    // daojishi: function(endTime) {
    //   let that = this;
    //   return setInterval(function() {
    //     jishuqi = that.hourCount(that.curTime, endTime);
    //     return jishuqi;
    //   }, 1000);
    // }
  },
  methods: {
    zidingyi: function(e) {
      this.page = e;
      console.log("当前页面", this.page);
    },
    Jump: function(e) {},
    counter: function() {
      // // 倒计时
      // let option = {
      //   jie_status: 3,
      //   coming_status: 1
      // };
      // let timer = [];
      // Promise.all([
      //   that.getRequestList.getCurTime(),
      //   that.getRequestList.getLists(option)
      // ]).then(function(resolve) {
      //   let specialInfo2 = resolve["1"].data.response_data.lists;
      //   var nowTime = [];
      //   var showState = [];
      //   // specialInfo2.forEach(function(item, index) {
      //   //   if (that.biddingList[0].jie_status == 3) {
      //   //     // 当前时间
      //   //     nowTime.push("nowTime" + index);
      //   //     nowTime[index] = resolve["0"].data.response_data;
      //   //     // 声明多个定时器
      //   //     timer.push("timer" + index);
      //   //     // 显隐状态
      //   //     that.biddingList[index].ctime = false;
      //   //     if (
      //   //       item.end_time - nowTime[index] <= 300 &&
      //   //       item.end_time - nowTime[index] > 0
      //   //     ) {
      //   //       that.biddingList[index].ctime = true;
      //   //       timer[index] = setInterval(() => {
      //   //         nowTime[index]++;
      //   //         if (nowTime[index] >= item.end_time) {
      //   //           that.biddingList[index].ctime = false;
      //   //           clearInterval(timer[index]);
      //   //           timer[index] = undefined;
      //   //         }
      //   //         that.biddingList[index].end_time = that.timeStamp(
      //   //           item.end_time - nowTime[index]
      //   //         );
      //   //       }, 1000);
      //   //     }
      //   //   }
      //   // });
      // });
      // let that = this;
      // let newArr = [];
      // that.getRequestList.getCurTime().then(function(res) {
      //   if (!res.data.error_data) {
      //     that.curTime = res.data.response_data;
      //     // console.log("倒计时参数", curTime, params);
      //     that.biddingList.forEach((item, index) => {
      //       setInterval(function() {
      //         item["c_time"] = that.hourCount(that.curTime, item.end_time);
      //       }, 1000);
      //     });
      //     console.log("that.biddingList", that.biddingList);
      //     that.biddingList1 = that.biddingList;
      //   }
      // });
    }
  },
  created: function() {
    let that = this;
    // this.counter(1528886160);
    // 获取当前时间
    this.counter();

    // console.log("倒计时", that.jishuqi);
    // setTimeout(() => {
    //   console.log("倒计时", that.jishuqi);
    // }, 5000);
  }
};
</script>
<style lang="less" scoped>
// 组件样式
.bidding {
  margin-bottom: 4%;
  a {
    display: block;
    width: 100%;
    height: 100%;
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
      top: 9%;
      right: 0.9375rem;
      display: flex;
      p {
        padding: 0.25rem 0;
        min-width: 4.4rem;
        text-align: center;
        border-radius: 60px;
        box-sizing: border-box;
        font-size: 0.688rem;
        &.state {
          margin-right: 4%;
          color: #bf1616;
          border: 1px solid #bf1616;
        }
        &.watch {
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding-left: 22%;
          background-repeat: no-repeat;
          background-position: 19% center;
          background-size: auto 42%;
          display: flex;
          align-items: center;
          font-size: 0.688rem;
        }
      }
    }
  }
  .bottom-bidding {
    display: flex;
    padding: 0 4%;
    background: #fff;
    padding: 0.625rem 0.9375rem;
    justify-content: space-between;
    .font12 {
      font-size: 12px;
    }
    p,
    h3 {
      padding: 1% 0;
    }
    h3 {
      letter-spacing: 2px;
    }
    .bidding-title {
      margin-right: 5%;
      .gray {
        color: #999999;
        white-space: nowrap;
      }
    }
    .bidding-info {
      .cutdown {
        color: #bf1616;
        text-align: center;
      }
    }
  }
}
.bode {
  font-size: 0.75rem;
  white-space: nowrap;
}
</style>


