
<template>
  <div>  
    <div class="rules_tit">
    发货规则
    </div>
    <div class="w_80">
    <divider>· · · ·</divider>
      
    </div>
    <div class="pad_20_15 " v-html="content.content"></div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          content:{            
          },
        }
    },
    created: function() {
      this.$store.state.showBottomNav = false;
      let that = this;
    
      //  4发货规则 
      let option = {
          type: 4,
      };
      this.getRequestList.systemSetup(option).then(function(res) {
        if(!res.data.error_code) {
          that.content = res.data.response_data[0];
        }
      })
    }

}
</script>
<style lang="less" scoped>
.content { padding: 1.875rem 0; background:#fff;  }
.w_80 { width: 80%; overflow: hidden ; margin: 0 10%; }
.rules_tit {    color: #ba0303;font-weight: bold;  font-size: 1.125rem; text-align: center;margin-top: 0.625rem; }
p.vux-divider { margin: 0; padding: 0;font-size: 3.125rem;    letter-spacing: -.25rem;    line-height: 1.25rem;}
.pad_20_15 { padding: 1.25rem 0.9375rem;text-align: justify;}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  z-index: -20;
}
</style>

