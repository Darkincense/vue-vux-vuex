<template>
  <div>

    <div 
    class="big-box"
    v-for="(item,index) of orderList"
    :key="index">
      <div class="boutique">
      <router-link :to="{path:item.order_status == 3 || item.order_number == '' ? '' : '/personal/orderMy/orderMyDetail', query: {id: item.id,payStatus:item.pay_status,order_number:item.order_number,type:item.type}}">
        <div class="boutique-img">
            <img :src="item.img" alt="精品">
        </div>
        <div class="boutique-info">
            <h3>{{item.title}}</h3>
            <p>订单号：{{item.order_number}}</p>
            <p>交易时间：{{item.ctime}}</p>
        </div>
        <div class="boutique-info-right">
          <p v-if="item.pay_status == 1 && item.order_status != 3">待付款</p>
          <p v-if="item.pay_status == 1 && item.order_status == 3">已关闭</p>
          <p v-if="item.pay_status == 2 && item.logistics_status == 1 && item.type == 1" style="">待发货</p>
          <p v-if="item.logistics_status == 2 && item.pay_status == 2 && item.type == 1" style="">待收货</p>
          <p v-if="item.logistics_status == 3 && item.type == 1" style="">已完成</p>
          <p v-if="item.type == 2 && item.pay_status == 2" style="font-size:12px">保证金订单</p>
          <p v-if="item.type == 1 && item.status == '3' && item.order_number == ''" style="">竞拍失败</p>
        </div>
      </router-link>
    </div>
      <div v-if="item.logistics_status == 2 && tabType == 4 && item.type != 2" class="confirm-btn">
        <p @click="confirmGoods(item.order_number)">确认收货</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["orderList", "tabType"],
  data() {
    return {};
  },
  computed: {
    status() {
      let that = this;
      let jie_status;
      that.orderList.forEach((item, index) => {
        if (item.jie_status == "1") {
          jie_status = "未开始";
        } else if (item.jie_status == "2") {
          jie_status = "预展中";
        } else if (item.jie_status == "3") {
          jie_status = "竞拍中";
        } else if (item.jie_status == "4") {
          jie_status = "竞拍结束";
        }
      });
      return jie_status;
    }
  },
  methods: {
    /**
     * 确认收货
     */
    confirmGoods: function(order_number) {
      let that = this;
      this.getRequestList
        .confirmReceipt({ order_number: order_number })
        .then(function(res) {
          if (!res.data.error_code) {
            that.$vux.toast.text("确认收货成功");
            location.reload();
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.big-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.625rem;
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
}
// 精品样式
.boutique {
  display: flex;
  padding: 0.9375rem 0.9375rem;
  align-items: flex-start;
  background: #fff;
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
</style>


