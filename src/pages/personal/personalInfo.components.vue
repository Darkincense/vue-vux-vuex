<template>
  <div>  

    <div class="person_top" >
      <img src="/src/assets/images/personal/topbg.png" alt="" style="width: 100%">
      <img src="/src/assets/images/personal/set.png" alt="" style="width: 22px; position: absolute; top:30px; right: 15px ">
        <div class="z_2" >
          <router-link to="home">
            <img  :src="avactUrl?avactUrl:'/src/assets/images/personal/ava.png'" alt="">
          </router-link>
            <div>
              {{nickname?nickname:'昵称'}}
            </div>
            <div class="log" v-if="!login_status" >
              <router-link to="/personal/login" >登录  </router-link>
              /
              <router-link to="/personal/register" >  注册  </router-link>
            </div>
            <div class="" v-if="login_status" >
                账号：13652525252
            </div>
        </div>
    </div>
    <group>
      <cell :link='order.url' :title="order.title" :value="order.desc" :is-link="false" >        
      </cell>
    </group>

    <grid :cols="5">
      <grid-item :link='item.link' :label="item.title" v-for="item in orderItem" :key="item.id" >
        <img slot="icon" v-bind:src="item.iconSrc" />
      </grid-item>
    </grid>
    <group>
      <cell class="font14 f_menu" :link='item2.link' :label="item2.title" v-for="item2 in menuItems" :key="item2.id" :title="item2.title" value="">
        <img slot="icon" width="22" style="display:block;margin-right:5px;" :src="item2.iconSrc">
      </cell>
    </group>
  </div>
</template>

<script>
// import setImg from "@/assets/images/personal/set.png";
// import bg from "@/assets/images/personal/bg.png";


import auctionIng from "@/assets/images/personal/auctionIng.png";

import waitPay from "@/assets/images/personal/waitPay.png";
import waitShipping from "@/assets/images/personal/waitShipping.png";
import waitTake from "@/assets/images/personal/waitTake.png";
import off from "@/assets/images/personal/off.png";

import billMy from "@/assets/images/personal/billMy.png";
import historyMy from "@/assets/images/personal/historyMy.png";
import auctionMy from "@/assets/images/personal/auctionMy.png";
import auctionRules from "@/assets/images/personal/auctionRules.png";
import shippingRules from "@/assets/images/personal/shippingRules.png";
import concat from "@/assets/images/personal/concat.png";

export default {
  name: "menuIndex",
  data() {
    return {
      login_status:false,  //登陆状态
      nickname:'',
      avactUrl:'',

      order: {
        url: "/personal/orderMy",
        title: "我的订单",
        desc: "全部订单"
      },
      orderItem: [
        {
          link: "/personal/orderMy?curIndex=1",
          title: "竞拍中",
          iconSrc: auctionIng
        },
        {
          link: "/waitPay",
          title: "待付款",
          iconSrc: waitPay
        },
        {
          link: "/waitShipping",
          title: "待发货",
          iconSrc: waitShipping
        },
        {
          link: "/waitTake",
          title: "待收货",
          iconSrc: waitTake
        },
        {
          link: "/off",
          title: "已完成",
          iconSrc: off
        }
      ],
      menuItems: [
        {
          link: "/personal/billMy",
          title: "我的账单",
          iconSrc: billMy
        },
        {
          link: "/personal/historyMy",
          title: "浏览记录",
          iconSrc: historyMy
        },
        {
          link: "/personal/auctionMy",
          title: "我的竞拍",
          iconSrc: auctionMy
        },
        {
          link: "/personal/auctionRules",
          title: "拍卖规则",
          iconSrc: auctionRules
        },
        {
          link: "/personal/shippingRules",
          title: "发货规则",
          iconSrc: shippingRules
        },
        {
          link: "/personal/concat",
          title: "联系客服",
          iconSrc: concat
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.person_top {
  width: 100%; 
  .z_2{
    z-index: 2;
    position: absolute;
    top: 25px;
    text-align: center;
    left:50%;
    width: 250px;

    margin-left: -125px; 
    img {
      width: 4rem;
      display: block;
      margin: 25px auto 10px     
    }
    div { line-height: 2.3;
        &.log { background: #bf1616; color: #fff; width: 8em; margin: 0 auto
      
        }
    }

  }
}

.weui-grids:before {
  border: none;
}
.weui-grids {
  background: #fff;
}
.weui-cells {
  font-size: 14px;
}
</style>

