<template>
  <div>
    <div class="auctioning-jingpaizhong" v-if="historyList.length>0">
     <boutique-component 
        :boutiqueList="historyList"/>
    </div>
    <!-- 分页加载 -->
    <p v-if="historyList.length > 0" @click="loadMore" class="mores">{{loadMoretxt}}</p>
    <p class="notCon" v-else>暂无浏览记录~</p>
  </div>
</template>

<script>
// 组件引用
import BoutiqueComponent from "@/components/boutique.components";

export default {
  name: "menuIndex",
  data() {
    return {
      historyList: [],
      loadMoretxt: "点击加载更多...",
      page: 1
    };
  },
  components: {
    BoutiqueComponent
  },
  methods: {
    loadMore: function() {
      this.page++;
      this.loading(this.page);
    },
    loading: function(page, num) {
      let that = this;
      let option = {
        page: page,
        num: 3
      };
      that.getRequestList.getHistory(option).then(function(res) {
        if (!res.data.error_code) {
          if (that.page == 1) {
            that.historyList = res.data.response_data.lists;
          } else {
            if (res.data.response_data.lists != 0) {
              res.data.response_data.lists.forEach(item => {
                that.historyList.push(item);
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
    this.loading();
  }
};
</script>
<style lang="less" scoped >
p.mores {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
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