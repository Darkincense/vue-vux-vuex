<template>
  <div>
    <tab>
      <tab-item 
      v-for="(item, index) in tabItem" 
      :key="index" 
      :selected="curIndex == item.id" 
      :id="item.id" 
      @on-item-click="switchTab(item.id)"
      @click="onItemClick($event)"
      :animate="isAnimate"
      >{{item.title}}
      </tab-item>
    </tab>
      <!-- 订单展示 -->
      <div v-if="curIndex == '0' && competitiveOrderList1.length>0">
        <mixedorder-component :competitiveOrderList="competitiveOrderList1" :tabType="tabType"/>
      </div>
      <div v-if="curIndex == '1' && competitiveOrderList2.length>0">
        <mixedorder-component :competitiveOrderList="competitiveOrderList2" :tabType="tabType"/>
      </div>
      <div v-if="curIndex == '2' && competitiveOrderList3.length>0">
        <mixedorder-component :competitiveOrderList="competitiveOrderList3" :tabType="tabType"/>
      </div>
      <div v-if="curIndex == '3' && competitiveOrderList4.length>0">
        <mixedorder-component :competitiveOrderList="competitiveOrderList4" :tabType="tabType"/>
      </div>
      <div v-if="curIndex == '4' && competitiveOrderList5.length>0">
        <mixedorder-component :competitiveOrderList="competitiveOrderList5" :tabType="tabType"/>
      </div>
      <div v-if="curIndex == '5' && competitiveOrderList6.length>0">
        <mixedorder-component :competitiveOrderList="competitiveOrderList6" :tabType="tabType"/>
      </div>
      <!-- <p class="notCon" v-else>暂无订单展示~</p> -->
      <!-- 分页加载 -->
      <p v-if="curIndex == '0'" @click="loadMore1" class="mores">{{loadMoretxt1}}</p>
      <p v-if="curIndex == '1'" @click="loadMore2" class="mores">{{loadMoretxt2}}</p>
      <p v-if="curIndex == '2'" @click="loadMore3" class="mores">{{loadMoretxt3}}</p>
      <p v-if="curIndex == '3'" @click="loadMore4" class="mores">{{loadMoretxt4}}</p>
      <p v-if="curIndex == '4'" @click="loadMore5" class="mores">{{loadMoretxt5}}</p>
      <p v-if="curIndex == '5'" @click="loadMore6" class="mores">{{loadMoretxt6}}</p>
  </div>
</template>

<script>
// 订单
import orderComponent from "@/components/order.components";
// 竞价
import BoutiqueComponent from "@/components/boutique.components";
// 混合订单
import MixedorderComponent from "@/components/MixedOrder.components";

export default {
  name: "menuIndex",
  barColor: "#bf1616",
  data() {
    return {
      tabType: "",
      isAnimate: false,
      curIndex: "0",
      tabItem: [
        {
          id: "0",
          title: "全部"
        },
        {
          id: "1",
          title: "竞拍中"
        },
        {
          id: "2",
          title: "待付款"
        },
        {
          id: "3",
          title: "待发货"
        },
        {
          id: "4",
          title: "待收货"
        },
        {
          id: "5",
          title: "已完成"
        }
      ],
      competitiveOrderList1: [],
      competitiveOrderList2: [],
      competitiveOrderList3: [],
      competitiveOrderList4: [],
      competitiveOrderList5: [],
      competitiveOrderList6: [],
      // 请求订单的类型
      optionType: {
        type: "1", //是	string	类型 1全部订单和竞价 2竞价 3订单
        status: "", //否	string	订单状态 1:已下单 2:已完成 3:已关闭 4:已取消
        logistics_status: "", //否	string	发货状态 1:未发货 2:已发货 3:已收货
        pay_status: "", //否	string	支付状态 1:未支付 2:已支付
        page: "", //否	string	页码
        num: "" //否	string	数量
      },
      loadMoretxt1: "点击加载更多...",
      loadMoretxt2: "点击加载更多...",
      loadMoretxt3: "点击加载更多...",
      loadMoretxt4: "点击加载更多...",
      loadMoretxt5: "点击加载更多...",
      loadMoretxt6: "点击加载更多...",
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1
    };
  },
  components: {
    orderComponent,
    BoutiqueComponent,
    MixedorderComponent
  },
  methods: {
    switchTab: function(parent) {
      // 点击切换标签
      this.getOrderStatue(parent);
    },
    loadMore1: function() {
      this.page1++;
      this.getOrderStatue("0");
    },
    loadMore2: function() {
      this.page2++;
      this.getOrderStatue("1");
    },
    loadMore3: function() {
      this.page3++;
      this.getOrderStatue("2");
    },
    loadMore4: function() {
      this.page4++;
      this.getOrderStatue("3");
    },
    loadMore5: function() {
      this.page5++;
      this.getOrderStatue("4");
    },
    loadMore6: function() {
      this.page6++;
      this.getOrderStatue("5");
    },
    /**
     * 判断订单状态并请求
     */
    getOrderStatue: function(param) {
      let that = this;
      // 创建页面时的选项
      if (that.$route.query.curIndex) {
        that.curIndex = that.$route.query.curIndex;
      } else {
        // 没有url参数时
        that.curIndex = 0;
      }
      if (param) {
        that.curIndex = param;
      }
      switch (that.curIndex) {
        case "0":
          // 全部订单
          that.optionType = {
            type: "1", //是	string	类型 1全部订单和竞价 2竞价 3订单
            num: 3,
            page: that.page1
          };
          break;

        case "1":
          // 竞价订单
          that.optionType = {
            type: "2", //是	string	类型 1全部订单和竞价 2竞价 3订单
            num: 3,
            page: that.page2
          };
          break;

        case "2":
          // 待付款
          that.optionType = {
            type: "3", //是	string	类型 1全部订单和竞价 2竞价 3订单
            pay_status: "1", //否	string	支付状态 1:未支付 2:已支付
            status: "1",
            num: 3,
            page: that.page3
          };
          break;

        case "3":
          // 待发货
          that.optionType = {
            type: "3", //是	string	类型 1全部订单和竞价 2竞价 3订单
            logistics_status: "1", //否	string	发货状态 1:未发货 2:已发货 3:已收货
            pay_status: "2",
            status: "1",
            num: 3,
            page: that.page4
          };
          break;

        case "4":
          // 待收货
          that.optionType = {
            type: "3", //是	string	类型 1全部订单和竞价 2竞价 3订单
            logistics_status: "2", //否	string	发货状态 1:未发货 2:已发货 3:已收货
            pay_status: "2",
            status: "1",
            num: 3,
            page: that.page5
          };
          break;

        case "5":
          // 已完成
          that.optionType = {
            type: "3", //是	string	类型 1全部订单和竞价 2竞价 3订单
            status: "2", //否	string	订单状态 1:已下单 2:已完成 3:已关闭 4:已取消
            num: 3,
            page: that.page6
          };
          break;
      }
      if (that.curIndex == 4) {
        that.tabType = 4;
      } else {
        that.tabType = "";
      }

      that.getRequestList.myOrderList(that.optionType).then(function(res) {
        if (!res.data.error_code) {
          if (that.curIndex == "0") {
            if (that.page1 == 1) {
              if (res.data.response_data.lists.length > 0) {
                that.competitiveOrderList1 = res.data.response_data.lists;
              } else {
                that.loadMoretxt1 = "暂无更多";
              }
            } else {
              if (res.data.response_data.lists.length > 0) {
                res.data.response_data.lists.forEach(item => {
                  that.competitiveOrderList1.push(item);
                });
              } else {
                that.loadMoretxt1 = "加载完毕";
              }
            }
          } else if (that.curIndex == "1") {
            // that.competitiveOrderList2 = res.data.response_data.lists;

            if (that.page2 == 1) {
              if (res.data.response_data.lists.length > 0) {
                that.competitiveOrderList2 = res.data.response_data.lists;
              } else {
                that.loadMoretxt2 = "暂无更多";
              }
            } else {
              if (res.data.response_data.lists.length > 0) {
                res.data.response_data.lists.forEach(item => {
                  that.competitiveOrderList2.push(item);
                });
              } else {
                that.loadMoretxt2 = "加载完毕";
              }
            }
          } else if (that.curIndex == "2") {
            // that.competitiveOrderList3 = res.data.response_data.lists;

            if (that.page3 == 1) {
              if (res.data.response_data.lists.length > 0) {
                that.competitiveOrderList3 = res.data.response_data.lists;
              } else {
                that.loadMoretxt3 = "暂无更多";
              }
            } else {
              if (res.data.response_data.lists.length > 0) {
                res.data.response_data.lists.forEach(item => {
                  that.competitiveOrderList3.push(item);
                });
              } else {
                that.loadMoretxt3 = "加载完毕";
              }
            }
          } else if (that.curIndex == "3") {
            // that.competitiveOrderList4 = res.data.response_data.lists;

            if (that.page4 == 1) {
              if (res.data.response_data.lists.length > 0) {
                that.competitiveOrderList4 = res.data.response_data.lists;
              } else {
                that.loadMoretxt4 = "暂无更多";
              }
            } else {
              if (res.data.response_data.lists.length > 0) {
                res.data.response_data.lists.forEach(item => {
                  that.competitiveOrderList4.push(item);
                });
              } else {
                that.loadMoretxt4 = "加载完毕";
              }
            }
          } else if (that.curIndex == "4") {
            if (that.page5 == 1) {
              if (res.data.response_data.lists.length > 0) {
                that.competitiveOrderList5 = res.data.response_data.lists;
              } else {
                that.loadMoretxt5 = "暂无更多";
              }
            } else {
              if (res.data.response_data.lists.length > 0) {
                res.data.response_data.lists.forEach(item => {
                  that.competitiveOrderList5.push(item);
                });
              } else {
                that.loadMoretxt5 = "加载完毕";
              }
            }
          } else if (that.curIndex == "5") {
            // that.competitiveOrderList6 = res.data.response_data.lists;

            if (that.page6 == 1) {
              if (res.data.response_data.lists.length > 0) {
                that.competitiveOrderList6 = res.data.response_data.lists;
              } else {
                that.loadMoretxt6 = "暂无更多";
              }
            } else {
              if (res.data.response_data.lists.length > 0) {
                res.data.response_data.lists.forEach(item => {
                  that.competitiveOrderList6.push(item);
                });
              } else {
                that.loadMoretxt6 = "加载完毕";
              }
            }
          }
        }
      });
    }
  },
  created: function() {
    let that = this;
    that.$store.state.showBottomNav = false;
    that.getOrderStatue();
  }
};
</script>
<style lang="less" scoped>
p.mores {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
.box {
  padding: 15px;
}

.active-6-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}

.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}

.active-6-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}

.tab-swiper {
  background-color: #fff;
  height: 100px;
}

.weui-form-preview__value {
  text-align: left;
}
.vux-tab .vux-tab-item.vux-tab-selected {
  color: #333;
}
.vux-tab-ink-bar {
  position: absolute;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ba0303 !important;
  text-align: center;
}

// 精品样式
.boutique {
  display: flex;
  padding: 0.9375rem 0.9375rem;
  align-items: flex-start;
  background: #fff;
  margin-bottom: 0.625rem;
  a {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .boutique-img {
    width: 4.25rem;
    height: 4.25rem;
    position: relative;
    overflow: hidden;
    float: left;
    img {
      position: absolute;
      display: block;
      width: 100%;
      height: auto;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
  .boutique-info {
    padding-left: 0.375rem;
    float: left;
    width: 12.75rem;
    p {
      padding-top: 3%;
      color: #5d5d5d;
      font-size: 0.75rem;
      span {
        color: #bf1616;
        &.price {
          font-weight: 700;
        }
      }
    }
    h3 {
      padding-bottom: 2%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .boutique-info-right {
    width: 4rem;
    float: right;
    margin-top: 1.8rem;
    color: #ba0303;
  }
}
.notCon {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
</style>