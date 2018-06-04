<template>
  <div>
      <!-- 竞拍精品 -->
    <div 
    class="boutique"
    v-for="(item,index) of boutiqueList"
    :key="index">
      <router-link :to="{path: '/auctionGoodDetail', query: {id: item.id,product_id:item.product_id}}">
        <div class="boutique-img">
            <img :src="item.img" alt="精品">
        </div>
        <div class="boutique-info">
            <h3>{{item.title}}</h3>
            <p>开拍时间：{{item.start_date}}</p>
            <p>结束时间：{{item.end_date}}</p>
            <p>拍卖状态：
              <span v-if="item.jie_status == '1'">未开始</span>
              <span v-if="item.jie_status == '2'">预展中</span>
              <span v-if="item.jie_status == '3'">竞拍中</span>
              <span v-if="item.jie_status == '4'">竞拍结束</span>
            <span style="padding-left:.625rem">围观 {{item.look_num}}</span><span style="padding-left:.625rem">出价 {{item.bidding_num}}</span></p>
            <p>最高价格：<span class="price">￥{{item.max_price/100}}</span></p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["boutiqueList"],
  data() {
    return {};
  },
  computed: {}
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
    h3 {
      padding-bottom: 2%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>


