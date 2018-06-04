<template>
<div>
<!-- 未结算    -->
    <div class="weijiesuan" v-if="$route.query.payStatus == 1" >
        <group title=""  v-if="$route.query.type != 2">
          <x-input class="font14" title="收货人: " v-model="username" placeholder=""></x-input>
          <x-input class="font14" title="联系电话: " mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile"></x-input>
          <!-- <x-input class="font14" title="邮编: " v-model="maskValue" :max="6" ></x-input> -->
          <x-input class="font14" title="详细地址: " v-model="adress" placeholder=""></x-input>
      </group>
      <!-- 弹窗 -->
      <div class="login-success" v-if="isShow">
          <div class="mask" @click="closeModel"></div>
          <div class="content">
              <h3>{{tipInfo}}</h3>
              <div class="login-btn">
                  <a class="btn" @click="onlinePay" href="javascript:void(0)">线上支付</a>
                  <a class="btn" @click="offlinePay" href="javascript:void(0)">线下支付</a>
              </div>
          </div>
      </div>

      <!-- 底部支付 -->
      <div class="footer-pay">
        <div class="pay-left">
          <p>合计金额：<span>￥{{response_data.price / 100}}</span></p>
        </div>
        <div class="pay-right" :class="{disabled:response_data.type == 1 && response_data.pay_method != 3}" @click="submitPay">
          <p>提交订单</p>
        </div>
      </div>
    </div>

<!-- 已结 -->
    <div class="yijieshu" v-if="$route.query.payStatus == 2">
        <div class="vux-form-preview weui-form-preview">
            <div class="weui-form-preview__hd" style="color: #383838;">
                <label class="weui-form-preview__label">订单信息</label>
                <em class="weui-form-preview__value">&nbsp;</em>
            </div>
            <div class="weui-form-preview__bd" style="color: #383838;">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单状态:</label>
                    <span class="weui-form-preview__value">{{logisticsStatus}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">我的出价:</label>
                    <span class="weui-form-preview__value">{{response_data.price / 100}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">下单时间:</label>
                    <span class="weui-form-preview__value">{{response_data.ctime}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">支付状态:</label>
                    <span class="weui-form-preview__value">{{pay_method}}</span>
                </div>
            </div>
        </div>
        <div class="vux-form-preview weui-form-preview" style="color: #383838;" v-if="$route.query.type != 2">
          <div class="weui-form-preview__hd">
              <label class="weui-form-preview__label">收件人信息</label>
              <em class="weui-form-preview__value">&nbsp;</em>
          </div>
          <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">收件人: </label>
                  <span class="weui-form-preview__value">{{response_data.logistics_name}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">手机号码: </label>
                  <span class="weui-form-preview__value">{{response_data.logistics_mobile}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">地址: </label>
                  <span class="weui-form-preview__value">{{response_data.logistics_address}}</span>
                </div>
          </div>
          <div class="weui-form-preview__ft"></div>
      </div>
    </div>

    
    
      <div style="margin-top: 5%;">
        <!-- 拍品详情 -->
        <div class="boutique" v-if="response_data">
          <router-link :to="{path: '/auctionGoodDetail', query: {id: response_data.product_id}}">
            <div class="boutique-img">
                <img :src="response_data.img" alt="精品">
            </div>
            <div class="boutique-info">
                <h3>{{response_data.title}}</h3>
                <p>开拍时间：{{response_data.start_time}}</p>
                <p>结束时间：{{response_data.end_time}}</p>
                <p>拍卖状态：<span>{{status}}</span><span style="padding-left:.625rem">围观 {{response_data.look_num}}</span><span style="padding-left:.625rem">出价 {{response_data.count_user}}</span></p>
                <p>最高价格：<span class="price">￥{{response_data.max_price/100}}</span></p>
            </div>
          </router-link>
        </div>
        <div v-if="response_data.logistics_status == 2 && $route.query.type != 2" class="confirm-btn">
            <p @click="confirmGoods($route.query.order_number)">确认收货</p>
          </div>
    </div>
  </div>
</template>

<script>
// 组件引用
import orderComponent from "@/components/order.components";

export default {
  name: "menuIndex",
  data() {
    return {
      isShow: false, // 选择支付方式的弹窗
      tipInfo: "请您选择支付方式",
      username: "", // 收货人姓名
      mobile: "", // 用户电话
      adress: "", // 用户地址
      isOk: "", // 判断能不能提交订单
      response_data: {},
      // pay_method: "", // 判断是否已经选择支付方式
      // 支付方式
      option: {
        order_number: "", // 	订单号
        pay_method: "", // 支付方式 1线上支付 2线下支付
        logistics_address: "", // 	收货地址
        logistics_mobile: "", // 收货人手机号
        logistics_name: "" // 收货人
      }
    };
  },
  components: {
    orderComponent
  },
  computed: {
    // 拍卖状态
    status: function() {
      let status = this.response_data.jie_status;
      if (status == "1") {
        return "未开始";
      } else if (status == "2") {
        return "预展中";
      } else if (status == "3") {
        return "竞拍中";
      } else if (status == "4") {
        return "已结拍";
      }
    },
    // 物流状态
    logisticsStatus: function() {
      let status = this.response_data.status;
      if (status == "1") {
        return "已下单";
      } else if (status == "2") {
        return "已完成";
      } else if (status == "3") {
        return "已关闭";
      } else if (status == "4") {
        return "已取消";
      }
    },
    // 支付状态
    pay_method: function() {
      let status = this.response_data.pay_method;
      if (status == "1") {
        return "线上支付";
      } else if (status == "2") {
        return "线下支付";
      } else if (status == "3") {
        return "待选择";
      }
    }
  },
  methods: {
    closeModel: function() {
      this.isShow = false;
    },
    /**
     * 线上支付
     */
    onlinePay: function() {
      this.option.pay_method = "1";
      console.log(`选择线上支付`);
      this.submitOrderInfo();
    },
    /**
     * 线下支付
     */
    offlinePay: function() {
      this.option.pay_method = "2";
      this.submitOrderInfo();
    },
    /**
     * 获取支付方式并设置收货地址
     */
    submitOrderInfo: function() {
      let that = this;
      console.log("参数", this.adress, this.mobile, this.username);
      if (!this.adress || !this.mobile || !this.username) {
        this.$vux.toast.text("收货地址不能为空");
        return;
      }
      that.option = {
        order_number: that.$route.query.order_number, // 	订单号
        pay_method: that.option.pay_method, // 支付方式 1线上支付 2线下支付
        logistics_address: that.adress, // 	收货地址
        logistics_mobile: that.mobile, // 收货人手机号
        logistics_name: that.username // 收货人
      };
      that.getRequestList.changePayment(that.option).then(function(res) {
        console.log("提交到后台数据设置支付方式", res);
        // 如果是线上支付需要唤醒微信支付并付款
        if (!res.data.error_code) {
          if (that.option.pay_method == "1") {
            let payOptions = {
              order_number: that.$route.query.order_number
            };
            // 开始支付拍品订单
            that.getRequestList.toPay(payOptions).then(function(res) {
              alert("支付拍品订单", res);
              if (!res.data.error_code) {
                that.wxPay(res.data, function() {
                  router.push("/personal/orderMy?curIndex=2");
                });
              } else {
                alert("后台支付接口错误信息", res.data.error_msg);
              }
            });
          } else {
            // 线下支付处理
            that.$vux.toast.text("已改为线下付款");
            that.isShow = false;
            router.push("/personal/orderMy?curIndex=2");
          }
        }
      });
      that.isShow = false;
    },
    /**
     * 提交订单
     */
    submitPay: function() {
      // 打开弹窗来选择线上或线下支付
      let that = this;
      if (that.$route.query.type == 2) {
        // 表示保证金订单，直接调取微信支付不用选择线上线下
        let orderOptions = {
          order_number: that.$route.query.order_number
        };
        // alert("保证金订单号", that.$route.query.order_number);
        // 开始支付
        that.getRequestList.toPay(orderOptions).then(function(res) {
          // alert("支付保证金订单", res);
          if (!res.data.error_code) {
            that.wxPay(res.data, function() {
              router.push("/personal/orderMy?curIndex=2");
            });
          }
        });
      } else {
        // 表示拍品订单，选择线上线下支付方式，再进行支付
        that.isShow = true;
      }
    },
    /**
     * 确认收货
     */
    confirmGoods: function(order_number) {
      let that = this;
      this.getRequestList
        .confirmReceipt({ order_number: order_number })
        .then(function(res) {
          if (!res.data.error_code) {
            that.$vux.toast.text("已确认!");
            router.push("/personal/orderMy?curIndex=5");
          }
        });
    }
  },
  created: function() {
    let that = this;
    let payStatus = that.$route.query.payStatus;
    if (payStatus == 1) {
      // 隐藏导航按钮
      that.$store.state.showBottomNav = false;
      // 如果打开未付款页面去请求默认地址接口
      that.getRequestList.getDefaultAddress().then(function(res) {
        if (!res.data.error_code) {
          that.adress = res.data.response_data.address;
          that.mobile = res.data.response_data.mobile;
          that.username = res.data.response_data.name;
          console.log("默认地址", res);
        }
      });
    } else {
      that.$store.state.showBottomNav = true;
    }
    console.log("路由参数", payStatus);
    // 获取当前订单详情
    console.log("当前订单号", this.$route.query.order_number);
    that.getRequestList
      .myOrderListDetail({ order_number: that.$route.query.order_number })
      .then(function(res) {
        if (!res.data.error_code) {
          that.response_data = res.data.response_data;
          that.adress = res.data.response_data.logistics_address
            ? res.data.response_data.logistics_address
            : that.adress;
          that.mobile = res.data.response_data.logistics_mobile
            ? res.data.response_data.logistics_mobile
            : that.mobile;
          that.username = res.data.response_data.logistics_name
            ? res.data.response_data.logistics_name
            : that.username;
          that.pay_method = res.data.response_data.pay_method;
        }
      });
  }
};
</script>
<style lang="less" scoped>
.disabled {
  cursor: default;
  opacity: 0.6;
  pointer-events: none;
}
.confirm-btn {
  display: flex;
  justify-content: flex-end;
  padding: 2% 5% 2% 0;
  background: #fff;
  p {
    width: 30%;
    text-align: center;
    height: 1.875rem;
    line-height: 1.875rem;
    border: 1px solid #ba0303;
    color: #ba0303;
    border-radius: 0.375rem;
  }
}
.footer-pay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.125rem;
  line-height: 3.125rem;
  display: flex;
  justify-content: center;
  z-index: 5;
  font-weight: 700;
  .pay-left {
    width: 73%;
    text-align: right;
    background: #fff;
    p {
      color: #333333;
      padding-right: 6%;
      span {
        color: #ba0303;
      }
    }
  }
  .pay-right {
    width: 27%;
    background: #ba0303;
    p {
      font-weight: 700;
      text-align: center;
      color: #fff;
    }
  }
}
.login-btn a {
  display: block;
  width: 20.3125rem;
  height: 3.125rem;
  text-align: center;
  line-height: 3.125rem;
  color: #fff;
  background: #bf1616;
  border-radius: 3px;
  margin: 0 auto;
  font-size: 0.875rem;
  letter-spacing: 0.1875rem;
}

.login-success {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 6;
  }
  .content {
    position: fixed;
    top: 8.4375rem;
    left: 50%;
    transform: translateX(-50%);
    width: 16.875rem;
    height: 9.375rem;
    background: #fff;
    z-index: 10;
    h3 {
      padding: 2.0625rem 0;
      text-align: center;
    }
  }
  .login-btn {
    padding: 0 1.7rem;
    display: flex;
    justify-content: center;
  }
  .login-btn a {
    display: inline-block;
    width: 40%;
    height: 2.125rem;
    line-height: 2.125rem;
    &:first-child {
      margin-right: 3%;
    }
  }
}
input {
  border: none;
  background: #f0f0f5;
}
.weui-form-preview {
  position: relative;
  background-color: #ffffff;
}
.weui-form-preview:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-form-preview:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-form-preview__hd {
  position: relative;
  padding: 10px 15px;
  text-align: right;
  line-height: 2.5em;
}
.weui-form-preview__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
}
.weui-form-preview__hd .weui-form-preview__value {
  font-style: normal;
  font-size: 1.6em;
}
.weui-form-preview__bd {
  padding: 10px 15px;
  font-size: 0.9em;
  text-align: right;
  color: #999999;
  line-height: 2;
}
.weui-form-preview__ft {
  position: relative;
  line-height: 50px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.weui-form-preview__ft:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-form-preview__item {
  overflow: hidden;
}
.weui-form-preview__label {
  float: left;
  margin-right: 1em;
  min-width: 4em;
  color: #999999;
  text-align: justify;
  text-align-last: justify;
}
.weui-form-preview__value {
  display: block;
  overflow: hidden;
  word-break: normal;
  word-wrap: break-word;
}
.weui-form-preview__btn {
  position: relative;
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #3cc51f;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
button.weui-form-preview__btn {
  background-color: transparent;
  border: 0;
  outline: 0;
  line-height: inherit;
  font-size: inherit;
}
.weui-form-preview__btn:active {
  background-color: #eeeeee;
}
.weui-form-preview__btn:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.weui-form-preview__btn:first-child:after {
  display: none;
}
.weui-form-preview__btn_default {
  color: #999999;
}
.weui-form-preview__btn_primary {
  color: #0bb20c;
}
.vux-form-preview {
  overflow: hidden;
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

// 精品样式
.boutique {
  display: flex;
  padding: 0.9375rem 0.9375rem;
  align-items: flex-start;
  background: #fff;
  // margin-bottom: 0.625rem;
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

.fix_bot {
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  z-index: 5555;
  background: #fff;
}
.col_red {
  color: #ba0303;
}
.lef_tit {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
  text-align: right;
  padding-right: 15px;
}
.rig_but {
  text-align: center;
  width: 120px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #ba0303;
  color: #fff;
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
    width: 6.25rem;
    height: 6.25rem;
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
    padding-left: 1.375rem;
    float: left;
    width: 13.75rem;
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
}
</style>