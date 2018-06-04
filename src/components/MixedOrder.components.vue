<template>
    <div>
        <div 
        v-for="(item,index) in competitiveOrderList"
        :key="index">
        <!-- 竞拍中样式 跳转到出价页面 -->
        <link-router :to="{path: '/auctionGoodDetail', query: {id: item.id}}" v-if="(!item.order_number && item.type == 1) && (item.jie_status == 3 || item.jie_status == 2 )">
            <div class="auctioning-jingpaizhong" >
            <boutique-component 
            :boutiqueList="[item]"/>
        </div>
        </link-router>
        <!-- 订单的样式 /未付款跳转到付款页面  /付完款跳转到有收货地址的页面 -->
        <link-router 
        :to="{path: '/personal/orderMy/orderMyDetail', params: {id: item.id,payStatus:item.pay_status,order_number:item.order_number,type:item.type}}" v-else>
            <div class="auctioning-jingpaizhong" >
            <order-component 
                :orderList="[item]"
                :tabType="tabType"/>
            </div>
        </link-router>
        </div>
    </div>
</template>
<script>
// 订单
import orderComponent from "@/components/order.components";
// 竞价
import BoutiqueComponent from "@/components/boutique.components";
export default {
  props: ["competitiveOrderList", "tabType"],
  data() {
    return {};
  },
  computed: {},
  components: {
    orderComponent,
    BoutiqueComponent
  }
};
</script>
<style lang="less" scoped>
</style>


