<template>
  <div>  
      <h1>我的竞拍</h1>
  </div>
</template>

<script>
export default {
  name: "menuIndex",
  data() {
    return {
      order: {
        url: "",
        title: "我的订单",
        desc: "全部订单"
      },
      orderItem: [
        {
          link: "/auctionIng",
          title: "竞拍中"
          // iconSrc:auctionIng
        },
        {
          link: "/waitPay",
          title: "待付款"
          // iconSrc:waitPay
        },
        {
          link: "/waitShipping",
          title: "待发货"
          // iconSrc:waitShipping
        },
        {
          link: "/waitTake",
          title: "待收货"
          // iconSrc:waitTake
        },
        {
          link: "/off",
          title: "已完成"
          // iconSrc:off
        }
      ],
      menuItems: [
        {
          link: "/personal/billMy",
          title: "我的账单"
          // iconSrc:billMy
        },
        {
          link: "/personal/historyMy",
          title: "浏览记录"
          // iconSrc:historyMy
        },
        {
          link: "/personal/auctionMy",
          title: "我的竞拍"
          // iconSrc:auctionMy
        },
        {
          link: "/personal/auctionRules",
          title: "拍卖规则"
          // iconSrc:auctionRules
        },
        {
          link: "/personal/shippingRules",
          title: "发货规则"
          // iconSrc:shippingRules
        },
        {
          link: "/personal/concat",
          title: "联系客服"
          // iconSrc:concat
        }
      ]
    };
  },
  created: function(){
    this.$store.state.showBottomNav = false;
  }
};
</script>
