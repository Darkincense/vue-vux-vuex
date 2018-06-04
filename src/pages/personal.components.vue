<template>
  <div>  
    <div class="person_top" >

      <img src="../assets/images/personal/topbg.png" alt="" style="width: 100%">

      <router-link to="/setUp">
          <img src="../assets/images/personal/set.png"  alt="" style="width: 22px; position: absolute; top:30px; right: 15px ">
      </router-link>  
        <div class="z_2" >
          <div to="" class="photoImg">
            <img  :src="avactUrl" alt="用户头像">
          </div>
            <div>
              {{userInfo.nickname?userInfo.nickname:'昵称'}}
            </div>
            <div class="" v-if="userInfo.mobile">
                手机号：{{userInfo.mobile.substr(0,3)+'****'+userInfo.mobile.substr(7)}}
            </div>
        </div>
    </div>
    <group style="margin-top: -2%;">
      <cell 
      style="font-size: 14px;" 
      :link='order.url' 
      :title="order.title" 
      :value="order.desc" 
      :is-link="false" ></cell>
    </group>
    <grid :cols="5">
      <grid-item 
      :link='item.link' 
      :label="item.title" 
      v-for="item in orderItem" 
      :key="item.id" >
        <img slot="icon" v-bind:src="item.iconSrc" />
      </grid-item>
    </grid>
    <group style="margin-top: -2%;">
      <cell 
      class="font14 f_menu" 
      :link='item2.link' 
      :label="item2.title" 
      v-for="item2 in menuItems" 
      :key="item2.id" 
      :title="item2.title" 
      value="">
        <img slot="icon" width="22" style="display:block;margin-right:10px;" :src="item2.iconSrc">
      </cell>
    </group>
    <loading-img ref="loading"/>
  </div>
</template>

<script>
import LoadingImg from "@/components/loading.components";
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
import avatar from "@/assets/images/personal/ava.png";

export default {
  name: "menuIndex",
  data() {
    return {
      isLoading: true, // 加载样式
      login_status: false, //登陆状态
      nickname: "",
      order: {
        url: "/personal/orderMy?curIndex=0",
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
          link: "/personal/orderMy?curIndex=2",
          title: "待付款",
          iconSrc: waitPay
        },
        {
          link: "/personal/orderMy?curIndex=3",
          title: "待发货",
          iconSrc: waitShipping
        },
        {
          link: "/personal/orderMy?curIndex=4",
          title: "待收货",
          iconSrc: waitTake
        },
        {
          link: "/personal/orderMy?curIndex=5",
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
          link: "/personal/orderMy?curIndex=1",
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
      ],
      // 个人信息(模拟数据)
      userInfo: {},
      loginState: false
    };
  },
  components: {
    LoadingImg
  },
  mounted: function() {},
  computed: {
    avactUrl: function() {
      if (this.userInfo.avatar) {
        return this.userInfo.avatar;
      } else {
        return avatar;
      }
    }
  },
  methods: {
    jumpPath: function() {
      router.push("/personal/login");
    }
  },
  created: function() {
    // 显示路由
    this.$store.state.showBottomNav = true;
    // 获取个人信息
    let that = this;
    that.getRequestList.getUserInfo().then(function(res) {
      if (!res.data.error_code) {
        that.$refs.loading.close();
        console.log(res);
        that.userInfo = res.data.response_data;
      } else {
        that.$vux.toast.text("获取授权失败");
        document.location = "http://weipai.test01.qcw100.cn/index.html";
      }
    });
  }
};
</script>
<style lang="less" scoped>
.person_top {
  width: 100%;
  .z_2 {
    z-index: 90;
    position: absolute;
    top: 25px;
    text-align: center;
    left: 50%;
    width: 250px;
    margin-left: -125px;
    div {
      line-height: 2.3;
      &.log {
        background: #bf1616;
        color: #fff;
        width: 8em;
        margin: 0 auto;
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
.weui-cell {
  height: 3.125rem;
  box-sizing: border-box;
}
.weui-grid:before {
  width: 0;
  border: none;
}
.photoImg {
  width: 4rem;
  height: 4rem;
  display: block;
  margin: 10px auto 10px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
.photoImg img {
  display: block;
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.mb {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 80;
}
.login-success {
  .mask {
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .content {
    width: 16.875rem;
    height: 9.375rem;
    margin: 0 auto;
    background: #fff;
    h3 {
      padding: 2.0625rem 0;
      text-align: center;
    }
  }
  .login-btn {
    padding-top: 0;
  }
  .login-btn a {
    width: 13.5625rem;
    height: 2.125rem;
    line-height: 2.125rem;
  }
}
</style>

