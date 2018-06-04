<template>
    <div id="app" class="app">
        <div class="review-pic" v-if="view">
          <div class="mask" @click="closeView"></div>
          <div class="img">
            <img :src="curPath" alt="查看图片">
          </div>
        </div>
        <div style="position:relative;" id="dowebok">
          <swiper
          auto loop height="13.125rem"
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
        <!-- 拍品介绍 -->
        <div class="auctionGood_suggest">
            <div class="suggest_top">
                <a href="http://weixin.yidaochn.com/yidao/zhao/index"><img class="via" :src="detailInfo.check_img" alt=""></a>
                <div class="auctionGood_name">{{detailInfo.title}}</div>
                <div class="WorkInformation">
                    <p>作品编号：{{detailInfo.serial_number}}</p>
                    <p>作者：{{detailInfo.author}}</p>
                    <p>作品尺寸：{{detailInfo.size}}</p>
                    <p>作品材质：{{detailInfo.materials}}</p>
                </div>
                <div class="price_time">
                    <div class="spor_price">当前价：<span>￥</span><span>{{detailInfo.max_price / 100}}</span></div>
                    <div class="count_down" v-if="(jie_status == '3' || jie_status == '2')&&CountDown&&stateS==true">
                        <img src="../assets/images/home/count_down.png" alt="">
                        <span>结拍倒计时</span>
                        <span>{{CountDown}}</span>
                    </div>
                    <div class="sale_state" v-else>{{saleState}}</div>
                </div>
                <div class="number_hint">
                    <p class="number">参与人数：{{detailInfo.bidding_num}}人</p>
                    <p class="hint">最后五分钟，进入延时竞拍阶段</p>
                </div>
            </div>
            <div class="suggest_bottom">
                <ul>
                    <li>
                        <img src="../assets/images/home/state.png" alt="起步价">
                        <span>￥{{detailInfo.lowest_price ? detailInfo.lowest_price / 100 : 0}} 元</span>
                    </li>
                    <li>
                        <img src="../assets/images/home/state_2.png" alt="加价">
                        <span>￥{{detailInfo.increase_price ? detailInfo.increase_price / 100 : '0'}} 元</span>
                    </li>
                    <li>
                        <img src="../assets/images/home/state_3.png" alt="保证金">
                        <span>￥{{detailInfo.margin_price ? detailInfo.margin_price / 100 : '0'}} 元</span>
                    </li>
                    <li>
                        <img src="../assets/images/home/state_4.png" alt="延迟">
                        <span>5 分钟</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- tab  商品详情/出价历史 -->
        <div class="switchTab">
            <ul>
                <li 
                v-for="(item,index) in tabList" 
                :key="index" 
                :class="state==index?'active':''" 
                @click="switchTab(index)">
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
        <!-- tab  详情 -->
        <div class="switchCon">
            <ul>
                <li v-show="state==0">
                    <div class="WorkInformation">
                        <p>作品编号：{{detailInfo.serial_number}}</p>
                        <p>作者：{{detailInfo.author}}</p>
                        <p>作品尺寸：{{detailInfo.size}}</p>
                        <p>作品材质：{{detailInfo.materials}}</p>
                    </div>
                    <p class="detail_title">详情介绍</p>
                    <div class="detail_con" v-html="detailInfo.content"></div>
                </li>
                <li v-show="state==1">
                    <ul class="historyList" v-if="bidHistoryList2.length>0">
                        <li class="top" v-for="(item,index) in bidHistoryList" :key="index">
                            <div class="history_img">
                                <img v-if="item.avatar" :src="item.avatar" alt="">
                                <img v-else src="../assets/images/personal/ava.png" alt="">
                            </div>
                            <div class="history_info">
                                <div class="history_name">{{item.nickname}}</div>
                                <div class="history_price" :style="index==0?style:''">￥{{item.price/100}}</div>
                            </div>
                            <div class="time_state">
                                <div class="history_state" :style="index==0?style2:''">{{index==0?'领先':'被超越'}}</div>
                                <div class="history_time">{{item.ctime}}</div>
                            </div>
                        </li>
                        <div class="more" @click="loadingMore(detailInfo.id)" v-show="bidHistoryList2.length>4&&moreState==true">点击加载更多</div>
                    </ul>
                    <div class="notHave" v-else>暂无出价历史...</div>
                </li>
            </ul>
        </div>

        <!-- 光环推荐 -->
        <recomed-list
            v-if="data.recomedList"
            :recomedList="data.recomedList"/>

        <!-- 出价按钮 -->
        <div class="bidBtn"  :class="expires ? 'disabled' : ''" @click="auction">出价</div>

          <!-- 保证金提示 -->
          <div v-show="bailState">
            <div class="mask" @click="closeModel"></div>
            <div class="bailHint">
                <p>请先缴纳保证金：￥{{detailInfo.margin_price/100}}</p>
                <div class="warning_sure" @click="bail">确认</div>
                <div class="warning_cancel" @click="cancel">取消</div>
            </div>
          </div>

          <!-- 警告 -->
          <div  v-show="warning">
            <div class="mask" @click="closeModel"></div>
            <div class="warning">
                <div class="title">警告</div>
                <div class="warning_con">
                    <p>请慎重出价，如果拍卖成功，在规定时间内不能支付，将会影响个人信誉。</p>
                    <div class="warning_sure" @click="sureWarning" >确定</div>
                    <div class="warning_cancel" @click="cancel">取消</div>
                </div>
            </div>
          </div>

          <!-- 价格提示 -->
          <div v-if="sendPriceShow">
            <div class="mask" @click="closeModel11"></div>
            <div class="priceHint"  >
                <p>当前最高价</p>
                <div class="price">
                    <span class="minus" @click="minus">-</span>
                    <!-- v-focus <span class="priceText">{{maxPrice / 100}}</span> -->
                    <input class="priceText" type="text" v-model="overbid" >
                    <span class="add" @click="add">+</span>
                </div>
                <div class="sure" @click="openDetemire">出价</div>
                <div class="keyboard">
                  <ul class="key-word">
                    <li 
                    v-for="(item,index) in keyboardValue"
                    :key="index"
                    @click="keyDown(index)">{{item.key}}</li>
                  </ul>
                </div>
            </div>
          </div>

          <!-- 出价确认弹窗 -->
          <div  v-show="determine">
            <div class="mask" @click="closeModel"></div>
            <div class="warning">
                <div class="title">确定出价？</div>
                <div class="warning_con">
                    <!-- <p>确定出价？</p> -->
                    <div class="warning_sure" @click="sendPrice" >确定</div>
                    <div class="warning_cancel" @click="cancel1">取消</div>
                </div>
            </div>
          </div>

          <loading-img ref="loading"/>
    </div> 
</template>
<script>
import { Swiper, SwiperItem } from "vux";
import LoadingImg from "@/components/loading.components";
import RecomedList from "@/components/recomedList.components";
import homeData from "../assets/common/js/home.data";
import topImg from "../assets/images/home/history_state.png";
const tabList = ["商品详情", "出价历史"];
export default {
  components: {
    Swiper,
    SwiperItem,
    RecomedList,
    LoadingImg
  },
  data() {
    return {
      // 模拟按键输出数值，
      keyValue: "",
      keyboardValue: [
        {
          id: 0,
          key: "1"
        },
        {
          id: 1,
          key: "2"
        },
        {
          id: 2,
          key: "3"
        },
        {
          id: 3,
          key: "4"
        },
        {
          id: 4,
          key: "5"
        },
        {
          id: 5,
          key: "6"
        },
        {
          id: 6,
          key: "7"
        },
        {
          id: 7,
          key: "8"
        },
        {
          id: 8,
          key: "9"
        },
        {
          id: 9,
          key: "0"
        },
        {
          id: 10,
          key: "00"
        },
        {
          id: 11,
          key: "×"
        }
      ],
      view: false,
      curPath: "",
      absoIndex: "",
      // 提示
      determine: false,
      // 出价
      overbid: "",
      // 是否可以拍卖
      expires: false,
      data: homeData,
      swiperList: [],
      tabList: tabList,
      detailInfo: {},
      state: 0,
      jie_status: 3,
      CountDown: "",
      saleState: "",
      bidHistoryList: [], // 出价历史
      bidHistoryList2: [],
      style: {
        color: "#fff",
        background: "#ba0303",
        border: ".0625rem solid #ba0303"
      },
      style2: {
        color: "#ba0303",
        background: "url(" + topImg + ") no-repeat",
        "background-size": "100% 100%"
      },
      warning: false, // 提示警告弹窗
      sendPriceShow: false, // 提示输入价格弹窗
      bailState: false, // 提示保证金弹窗
      stateS: true,
      moreState: true,
      maxPrice: "",
      addPrice: "",
      mbState: false,
      initPrice: "", // 初始价格
      special_id: "", // 专场id
      option: {},
      isshowBidList: false
      // autofocus: ""
    };
  },
  created: function() {
    let that = this;
    this.$store.state.showBottomNav = false;
    if (that.$route.query.openhistory) {
      this.state = that.$route.query.openhistory;
    }
    this.getDetail();
    // 查询出价历史
    console.log("当前参数", that.getQueryString("bidding"));
    if (that.getQueryString("bidding") == "1") {
      that.state = 1;
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted: function() {
    // // 图片查看器
    // var viewer = new Viewer(document.getElementById("dowebok"), {
    //   url: "data-original"
    // });
  },
  watch: {
    $route: ["getDetail"]
  },
  methods: {
    /**
     * 键盘点击事件
     */
    keyDown: function(index) {
      let that = this;
      let value = "";
      if (index == 11) {
        console.log(`删除按键`);
        that.keyValue = that.keyValue.substring(0, that.keyValue.length - 1);
        console.log(`键盘输出值${that.keyValue}`);
      } else {
        that.keyboardValue.forEach((item, idx) => {
          if (index == item.id) {
            value = item.key;
          }
        });
        that.keyValue = that.keyValue.concat(value);
        console.log(`键盘输出值${that.keyValue}`);
      }
      that.overbid = Number(that.keyValue);
    },
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
    switchTab: function(index) {
      this.state = index;
    },
    openDetemire: function() {
      this.determine = true;
      this.sendPriceShow = false;
    },
    /**
     * 请求页面所有接口   相同路由不同参数
     */
    getDetail() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      let that = this;
      let option = {
        id: ""
      };
      if (this.$route.query.product_id && this.$route.query.id) {
        option.id = this.$route.query.product_id;
      } else {
        option.id = this.$route.query.id;
      }
      that.option = option;
      // 轮播图
      let option4 = {
        type: 3,
        related_id: option.id
      };
      this.getRequestList.carouselList(option4).then(function(res) {
        that.swiperList = res.data.response_data.lists;
      });

      // 结拍倒计时
      Promise.all([
        that.getRequestList.getCurTime(),
        that.getRequestList.getlotsListsDetail(option)
      ]).then(function(resolve) {
        that.$refs.loading.close();
        let specialInfo2 = resolve["1"].data.response_data;
        let nowTime = resolve["0"].data.response_data;
        let endTime = specialInfo2.end_time;
        let timer;
        let itemCount = "";
        // 获取拍品详情
        that.detailInfo = resolve["1"].data.response_data;
        that.jie_status = resolve["1"].data.response_data.jie_status;
        that.maxPrice = resolve["1"].data.response_data.max_price;
        that.initPrice = resolve["1"].data.response_data.max_price;
        that.special_id = resolve["1"].data.response_data.special_id;
        that.overbid = that.maxPrice / 100;
        that.addPrice = resolve["1"].data.response_data.increase_price;

        // 推荐列表
        // 光环推荐拍品
        let option6 = {
          special_id: that.special_id,
          // jie_status: 3,
          recommend_status: 2,
          product_id: that.option.id
        };
        that.getRequestList.getlotsLists(option6).then(function(res) {
          if (!res.data.error_code) {
            that.data.recomedList = res.data.response_data.lists;
            console.log("that.data.recomedList", that.data.recomedList);
          }
        });

        if (
          resolve["1"].data.response_data.jie_status != "3" &&
          resolve["1"].data.response_data.jie_status != "2"
        ) {
          // 非竞拍中出价按钮不能点击
          that.expires = true;
        } else {
          // 竞拍中出价按钮 可以点击
          that.expires = false;
        }
        // 倒计时
        if (specialInfo2.jie_status == "3" || specialInfo2.jie_status == "2") {
          that.stateS = true;
          timer = setInterval(() => {
            nowTime++;
            if (nowTime >= endTime) {
              that.CountDown = "";
              that.stateS = false;
              clearInterval(timer);
            }
            that.CountDown = that.countTime(nowTime, endTime);
          }, 1000);
        } else {
          if (specialInfo2.jie_status == "2") {
            that.saleState = "预展中";
          } else if (specialInfo2.jie_status == "1") {
            that.saleState = "未开始";
          } else if (specialInfo2.jie_status == "4") {
            that.saleState = "已结拍";
          }
        }
      });

      // 出价历史  几条  加载更多之前
      let option5 = {
        product_id: option.id,
        page: 1,
        num: 4
      };
      this.getRequestList.bidHistory(option5).then(function(res) {
        that.bidHistoryList = res.data.response_data.lists;
      });

      // 出价历史  全部
      let option7 = {
        product_id: option.id
      };
      this.getRequestList.bidHistory(option7).then(function(res) {
        that.bidHistoryList2 = res.data.response_data.lists;
      });
    },

    /**
     * 出价历史  点击加载更多
     */
    loadingMore(id) {
      let that = this;
      that.bidHistoryList = that.bidHistoryList2;
      that.moreState = false;
    },

    // 点击出价 然后执行
    auction: function() {
      // 点击出价首先判断需不需要缴纳保证金
      let that = this;
      that.getRequestList.getUserInfo().then(function(res) {
        if (!res.data.response_data.mobile) {
          // that.$refs.loading.close();
          that.$vux.toast.text("请完善个人信息！");
          router.push("/personal/register");
        } else {
          // that.$refs.loading.close();
        }
      });
      let id =
        that.$route.query.id && that.$route.query.product_id
          ? that.$route.query.product_id
          : that.$route.query.id;
      let option8 = {
        product_id: id
      };
      // 判断有没有缴纳保证金
      that.getRequestList.bail(option8).then(function(res) {
        if (!res.data.error_code) {
          //警告框显示→→→→继续弹出提示然后出价
          // that.warning = true;
          that.add();
          // that.autofocus = "autofocus";
          // that.overbid = that.maxPrice / 100;
          that.sendPriceShow = true;
        } else {
          // 交纳保证金弹窗
          // that.$vux.toast.text(res.data.error_msg);
          // 弹出交纳保证金
          that.bailState = true;
        }
      });
    },
    closeModel11: function() {
      this.warning = false; // 提示警告弹窗
      this.sendPriceShow = false; // 提示输入价格弹窗
      this.bailState = false; // 提示保证金弹窗
      this.determine = false;
      // this.autofocus = "";
      this.minus();
    },
    // 点击 缴纳保证金  确定 按钮
    bail: function() {
      let that = this;
      let id =
        that.$route.query.id && that.$route.query.product_id
          ? that.$route.query.product_id
          : that.$route.query.id;
      let orderOptions = {
        product_id: id
      };

      that.getRequestList.createOrder(orderOptions).then(function(res) {
        if (!res.data.error_code) {
          let payOptions = {
            order_number: res.data.response_data
          };
          // 开始支付
          that.getRequestList.toPay(payOptions).then(function(res) {
            if (!res.data.error_code) {
              that.wxPay(res.data);
              that.bailState = false;
            } else {
              // alert("后台返回错误信息", res.data.error_msg);
            }
          });
        } else {
          that.bailState = false;
          that.$vux.toast.text(res.data.error_msg);
          // router.push("/personal/orderMy?curIndex=2");
        }
      });
    },
    sureWarning: function() {
      let that = this;
      // 如果不报错关闭警告打开加价弹窗
      that.warning = false; // 警告消失
      that.sendPriceShow = true; // 出现加价弹窗
    },
    sendPrice: function() {
      let that = this;
      // 请求接口填写当前出的价格
      let id =
        that.$route.query.id && that.$route.query.product_id
          ? that.$route.query.product_id
          : that.$route.query.id;
      23;
      let param = {
        product_id: id,
        price: that.overbid * 100
      };
      that.getRequestList.getAuction(param).then(function(res) {
        // alert("出价接口库返回信息", res);
        if (!res.data.error_code) {
          // that.sendPriceShow = false;
          that.determine = false;
          that.$vux.alert.show({
            title: "提示信息",
            content: "出价成功"
          });
          router.push("/auctionGoodDetail?id=" + id + "&openhistory=1");
          location.reload();
        } else {
          that.$vux.toast.text(res.data.error_msg);
          // that.sendPriceShow = false;
          that.determine = false;
          if (res.data.error_code == 113012) {
            // 登录过期跳转到首页重新登录
            window.location.href = "http://weipai.test01.qcw100.cn/index.html";
          } else {
            location.reload();
          }
        }
      });
    },
    /**
     * 关闭弹窗
     */
    closeModel: function() {
      this.warning = false; // 提示警告弹窗
      this.sendPriceShow = false; // 提示输入价格弹窗
      this.bailState = false; // 提示保证金弹窗
      this.determine = false;
      this.overbid = this.initPrice / 100;
    },
    // 取消
    cancel: function() {
      let that = this;
      that.warning = false; // 警告
      that.bailState = false; //缴纳保证金
      that.sendPriceShow = false; //出价
      that.determine = false;
      that.overbid = that.initPrice;
    },
    cancel1: function() {
      this.determine = false;
      this.sendPriceShow = true;
      this.minus();
    },
    // 拍卖  价格加
    add: function() {
      this.maxPrice = parseInt(this.maxPrice);
      this.addPrice = parseInt(this.addPrice);
      // this.maxPrice += this.addPrice;
      this.overbid += this.addPrice / 100;
      // this.overbid = this.maxPrice / 100;
    },
    // 拍卖  价格减
    minus: function() {
      if (
        // this.overbid == this.detailInfo.max_price / 100 + this.addPrice / 100
        this.overbid ==
        this.detailInfo.max_price / 100
      ) {
        return;
      }
      this.maxPrice = parseInt(this.maxPrice);
      this.addPrice = parseInt(this.addPrice);
      // this.maxPrice -= this.addPrice;
      this.overbid -= this.addPrice / 100;
      // this.overbid = this.maxPrice / 100;
    },
    /**
     * 弹出交纳保证金
     */
    payDeposit: function() {
      // 判断有没有缴纳保证金
      let that = this;
      let id =
        that.$route.query.id && that.$route.query.product_id
          ? that.$route.query.product_id
          : that.$route.query.id;
      this.getRequestList.bail({ product_id: id }).then(function(res) {
        if (!res.data.error_msg) {
          if (that.detailInfo.margin_price != 0) {
            that.bailState = true;
          } else {
            that.$vux.toast.text("不需要缴纳保证金");
          }
        } else {
          //警告框 显示
          // that.$vux.toast.text(res.data.error_msg);
        }
      });
    }
  }
};
</script>
<style lang="less">
.keyboard {
  padding-top: 5%;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
    justify-content: center;
    background: #f4f4f4;
    li {
      width: 31%;
      height: 2.493125rem;
      text-align: center;
      line-height: 2.493125rem;
      margin-right: 2%;
      margin-top: 2%;
      background: #fff;
      border: 1px solid #ebebeb;
      color: #646464;
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        margin-top: 0;
      }
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
    }
  }
}
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
.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #000;
  opacity: 0.4;
  z-index: 1;
}
.bidBtn.disabled {
  pointer-events: none;
  cursor: default;
  //   opacity: 0.4;
  background: #e39a9a;
}
.app {
  padding-bottom: 1.25rem;
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
.auctionGood_suggest {
  background: #fff;
  margin-bottom: 0.625rem;
}
// 拍品简介
.suggest_top {
  padding: 0.625rem 0.9375rem;
  position: relative;
  border-bottom: 0.0625rem solid #f0f0f5;
}
.via {
  position: absolute;
  display: block;
  width: 2.625rem;
  top: 1.5625rem;
  right: 0.9375rem;
}
.auctionGood_name {
  width: 18.75rem;
  color: #000;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  font-weight: 700;
  letter-spacing: 0.125rem;
}
.WorkInformation {
  padding: 0.875rem 0;
}
.WorkInformation p {
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5rem;
}
.price_time {
  margin-bottom: 0.9375rem;
  overflow: hidden;
}
.spor_price {
  float: left;
  color: #000;
  font-size: 0.9375rem;
}
.spor_price span:first-child {
  color: #ba0303;
  font-size: 0.875rem;
}
.spor_price span:last-child {
  color: #ba0303;
  font-weight: bold;
}
.count_down {
  float: right;
}
.count_down > img {
  display: block;
  width: 0.875rem;
  float: left;
  margin-top: 0.1875rem;
}
.count_down span:nth-child(2) {
  color: #a2a2a3;
  font-size: 0.875rem;
  float: left;
  padding-left: 0.25rem;
}
.count_down span:last-child {
  color: #ba0303;
  font-weight: bold;
  font-size: 0.9375rem;
  padding-left: 0.9375rem;
  float: left;
}
.sale_state {
  float: right;
  color: #a2a2a3;
  font-size: 0.875rem;
}
.number_hint {
  overflow: hidden;
}
.number {
  color: #a2a2a3;
  font-size: 0.875rem;
  float: left;
}
.hint {
  color: #dedee0;
  font-size: 0.875rem;
  float: right;
}

.suggest_bottom {
  padding: 0.625rem 0.9375rem;
}
.suggest_bottom ul {
  overflow: hidden;
}
.suggest_bottom ul li {
  overflow: hidden;
  height: 1.625rem;
  float: left;
}
.suggest_bottom ul li:not(:last-child) {
  margin-right: 1rem;
}
.suggest_bottom ul li img {
  display: block;
  height: 100%;
  float: left;
}
.suggest_bottom ul li span {
  display: block;
  float: left;
  line-height: 1.625rem;
  padding-left: 0.125rem;
  color: #a2a2a3;
  font-size: 0.875rem;
}

// tab切换
.switchTab {
  background: #fff;
  padding: 0 0.9375rem;
  margin-bottom: 0.625rem;
}
.switchTab ul {
  overflow: hidden;
}
.switchTab ul li {
  width: 50%;
  float: left;
  padding: 0.9375rem 0;
}
.switchTab ul .active span {
  color: #ba0303;
}
.switchTab ul li span {
  display: block;
  text-align: center;
  color: #333;
  font-size: 0.9375rem;
  box-sizing: border-box;
}
.switchTab ul li:first-child span {
  border-right: 0.0625rem solid #f0f0f5;
}
.switchCon {
  background: #fff;
  margin-bottom: 0.625rem;
  padding: 1.25rem 0.9375rem;
}
// 拍品详情
.detail_title {
  border-left: 0.125rem solid #ba0303;
  color: #333;
  font-size: 0.875rem;
  line-height: 0.875rem;
  padding-left: 0.625rem;
}
.detail_con {
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5rem;
  text-align: justify;
  padding-top: 0.625rem;
  img {
    width: 100%;
  }
}

// 出价历史
.historyList {
  padding: 0 0.9375rem;
}
.historyList li {
  padding: 0.9375rem 0;
  overflow: hidden;
}
.historyList li:not(:first-child) {
  border-top: 0.0625rem dashed #b5b5b5;
}
.history_img {
  width: 2.1875rem;
  height: 2.1875rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  float: left;
  margin-top: 0.5rem;
}
.history_img img {
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.history_info {
  float: left;
  margin-left: 0.9375rem;
}
.history_name {
  color: #000;
  font-size: 0.75rem;
  line-height: 1.3125rem;
  width: 6.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.history_price {
  padding: 0 0.3125rem;
  height: 1.125rem;
  line-height: 1.125rem;
  border: 0.0625rem solid #b5b5b5;
  border-radius: 0.625rem;
  color: #b5b5b5;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
.time_state {
  float: right;
}
.history_state {
  width: 3.75rem;
  height: 1.6875rem;
  margin: 0 auto;
  line-height: 1.6875rem;
  background: url(../assets/images/home/history_state2.png) no-repeat;
  background-size: 100% 100%;
  color: #b5b5b5;
  font-size: 0.875rem;
  text-align: center;
}
.history_time {
  color: #b5b5b5;
  font-size: 0.875rem;
  line-height: 1.3125rem;
}
.more {
  width: 5.9375rem;
  height: 1.5625rem;
  margin: 0 auto;
  line-height: 1.5625rem;
  text-align: center;
  color: #000;
  border: 0.0625rem solid #b5b5b5;
  font-size: 0.875rem;
  margin-top: 1.875rem;
}
.notHave {
  color: #b5b5b5;
  font-size: 0.875rem;
  text-align: center;
}
.bidBtn {
  width: 100%;
  height: 3.125rem;
  background: #ba0303;
  // border-radius: 0.1875rem;
  color: #fff;
  font-size: 1.125rem;
  line-height: 3.125rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

// 提示
.mb {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.bailHint,
.priceHint {
  position: fixed;
  padding: 2rem 1.5625rem;
  background: #fff;
  color: #000;
  font-size: 0.875rem;
  display: table;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  p {
    padding-left: 11%;
  }
}
.priceHint {
  width: 100%;
  box-sizing: border-box;
  padding-top: 18%;
}
.sure {
  width: 15.625rem;
  height: 2.5rem;
  margin: 0 auto;
  background: #ba0303;
  color: #fff;
  font-size: 1rem;
  line-height: 2.5rem;
  text-align: center;
  margin-top: 1.875rem;
}
.priceHint .sure {
  margin-top: 1.25rem;
}

.price {
  margin-top: 0.75rem;
  overflow: hidden;
  width: 16rem;
  margin: 0 auto;
}
.price span {
  display: block;
  float: left;
}
.minus {
  width: 2.5rem;
  height: 2.5rem;
  background: #f0f0f5;
  color: #a2a2a3;
  font-size: 1.5rem;
  text-align: center;
  line-height: 2.5rem;
}
.priceText {
  float: left;
  border: none;
  width: 8.25rem;
  padding: 0 0.625rem;
  height: 2.5rem;
  background: #f0f0f5;
  color: #a2a2a3;
  font-size: 0.875rem;
  line-height: 2.5rem;
  margin: 0 0.625rem;
}
.add {
  width: 2.5rem;
  height: 2.5rem;
  background: #ba0303;
  color: #fff;
  font-size: 1.125rem;
  text-align: center;
  line-height: 2.5rem;
}

.warning {
  width: 16.875rem;
  background: #fff;
  margin: 0 auto;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
.warning .title {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: center;
  color: #fff;
  font-size: 0.9375rem;
  background: #ba0303;
}
.warning_con {
  padding: 1.25rem 1.5625rem;
  overflow: hidden;
}
.warning_con p {
  color: #000;
  font-size: 0.75rem;
  line-height: 1.3125rem;
}
.warning_sure {
  width: 6.25rem;
  height: 2.1875rem;
  margin-top: 2.5rem;
  background: #ba0303;
  color: #fff;
  font-size: 1rem;
  line-height: 2.1875rem;
  text-align: center;
  float: left;
}
.warning_cancel {
  width: 6.25rem;
  height: 2.1875rem;
  margin-top: 2.5rem;
  background: #f0f0f5;
  color: #a2a2a3;
  font-size: 1rem;
  line-height: 2.1875rem;
  text-align: center;
  float: right;
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
.vux-slider > .vux-indicator-center {
  display: none;
}
.priceHint {
  width: 100%;
  box-sizing: border-box;
  padding-top: 18%;
  position: fixed;
  padding-top: 18%;
  background: #fff;
  color: #000;
  font-size: 0.875rem;
  display: table;
  top: 30%;
  left: 50%;
  p {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4% 0 4% 10%;
    background: #f0f0f5;
    width: 100%;
  }
  div.price {
    margin-top: 0.75rem;
    overflow: hidden;
    width: 19rem;
    margin: 0 auto;
    span {
      display: block;
      float: left;
      font-size: 32px;
      &.minus {
        height: 2.5rem;
        background: #f0f0f5;
        color: #a2a2a3;
        line-height: 2.5rem;
        border-radius: 0.3rem;
      }
      &.add {
        width: 2.5rem;
        height: 2.5rem;
        background: #ba0303;
        color: #fff;
        text-align: center;
        line-height: 2.5rem;
        border-radius: 0.3rem;
      }
    }
    .priceText {
      float: left;
      border: none;
      width: 11.25rem;
      padding: 0 0.625rem;
      font-size: 0.875rem;
      margin: 0 0.625rem;
    }
  }
  .sure {
    width: 18rem;
    height: 2.5rem;
    margin: 0 auto;
    background: #ba0303;
    color: #fff;
    font-size: 1rem;
    line-height: 2.5rem;
    text-align: center;
    margin-top: 1.25rem;
    border-radius: 0.3rem;
  }
}
</style>


