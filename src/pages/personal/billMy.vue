<template>
  <div>
    <!-- 竞拍精品 -->
    <div v-if="billList.length>0">
      <div 
      class="boutique"
      v-for="(item,index) of billList"
      :key="index">
        <router-link :to="{path:'/personal/orderMy/orderMyDetail', query: {id: item.id,payStatus:item.pay_status,order_number:item.order_number,type:item.type}}">
          <div class="boutique-img">
              <img :src="item.img" alt="精品">
          </div>
          <div class="boutique-info">
              <h3>{{item.title}}</h3>
              <p>订单号：{{item.order_number}}</p>
              <p>交易时间：{{item.ctime}}</p>
              <p class="col_red">已交金额：<span class="price">￥{{item.bidding_price/100}}</span></p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 分页加载 -->
    <p v-if="billList.length > 0" @click="loadMore" class="mores">{{loadMoretxt}}</p>
    <p class="notCon" v-else>暂无账单内容~</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      billList: [],
      loadMoretxt: "点击加载更多...",
      page: 1
    };
  },
  methods: {
    loadMore: function() {
      this.page++;
      this.loading();
    },
    loading: function() {
      let that = this;
      //我的账单
      let option = {
        type: 3, //	是	string	类型 1全部订单和竞价 2竞价 3订单
        // status: 2, //否	string	订单状态 1:已下单 2:已完成 3:已关闭 4:已取消
        logistics_status: "", //否	string	发货状态 1:未发货 2:已发货 3:已收货
        pay_status: 2, //否	string	支付状态 1:未支付 2:已支付
        page: this.page, //否	string	页码
        num: 3 //否	string	数量
      };
      that.getRequestList.myOrderList(option).then(function(res) {
        if (!res.data.error_code) {
          if (that.page == 1) {
            that.billList = res.data.response_data.lists;
            console.log(that.billList);
          } else {
            if (res.data.response_data.lists.length != 0) {
              res.data.response_data.lists.forEach(item => {
                that.billList.push(item);
              });
            } else {
              that.loadMoretxt = "加载完毕";
            }
          }
        }
      });
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
    let that = this;
    that.loading();
  }
};
</script>
<style lang="less" scoped>
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
    p.col_red {
      color: #bf1616;
    }
    h3 {
      padding-bottom: 2%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.notCon {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
</style>


