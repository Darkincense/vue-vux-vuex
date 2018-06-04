<template>
    <div class="state-auction">
        <ul>
          <li 
          v-for="(item,index) in statuAction.arr"
          :key="index"
          data-index="index"
          @click="changeModel(index)"
          :style="item.color"
          >
            <img :src="item.current" alt="item.name">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
</template>
<script>
export default {
  props: ["statuAction"],
  data() {
    return {
      
    };
  },
  methods: {
    changeModel: function(idx) {
      let that = this;
      that.statuAction.arr.forEach((item, index) => {
        if (idx == index) {
          var temp = {
            index: idx,
            status: item.status
          };
          item.current = item.after;
          item.color = { color: "#cc5152",border: ".0625rem solid #cc5152"};
          that.$emit("changeStatue", temp);
        } else {
          item.current = item.before;
          item.color = { color: "#000" };
        }
        return;
      });
    }
  },
  created: function() {
    
  }
};
</script>
<style lang="less" scoped>
.state-auction {
  background: #fff;
  margin-bottom: .625rem;
  ul {
    display: flex;
    padding: .625rem 0;
    li {
      box-sizing: border-box;
      border-radius: 1.25rem;
      padding: .3rem .9375rem;
      margin-left: 7%;
      border: .0625rem solid transparent;
      img {
        display: block;
        float: left;
        height: .8125rem;
        margin-top: .25rem;
      }
      p {
        float: left;
        font-size: .875rem;
        line-height: 1.3125rem;
        padding: 0 .3125rem;
      }
    }
  }
}
</style>


