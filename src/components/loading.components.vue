<template>
    <div class="loading" v-if="isLoading">
        <div class="mask"></div>
        <img :src="loadingImg" alt="加载中...">
    </div>
</template>
<script>
import loading from "@/assets/images/personal/loading.png";
export default {
  data() {
    return {
      loadingImg: loading,
      isLoading: true
    };
  },
  methods: {
    /**
     * 关闭
     */
    close: function() {
      this.isLoading = false;
    },
    /**
     * 打开
     * */

    open: function() {
      this.isLoading = true;
    }
  }
};
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.4;
  z-index: 98;
}
.loading img {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(0);
  animation: loading 1s ease infinite;
  z-index: 99;
}
@-webkit-keyframes loading {
  from {
    transform: translateX(-50%) translateY(-50%) rotate(0);
  }
  to {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}
</style>


