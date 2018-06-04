<template>
    <div class="recomted">
        <div class="recomed-title">
            <img src="../assets/images/home/recomed-title.jpg" alt="推荐标题">
        </div>
        <div class="content-list">
            <ul>
                <li 
                v-if="tempData"
                v-for="(item,index) in recomedList"
                :key="index"
                >
                 <!-- :to="{path: '/auctionGoodDetail?v='+ item.id, query: {id:item.id}}" -->
                  <div @click="changeDetail(item.id)">
                    <div class="img">
                      <div class="img_inner">
                        <img :src="item.img" alt="拍品图">
                      </div>
                    </div>
                    <div class="info">
                        <p style="padding-top:.1875rem;">{{item.title}}</p>
                        <p style="padding-top:.3125rem;">当前价：<span>￥{{item.max_price / 100}}</span></p>
                    </div>
                  </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import TempImg from "@/assets/images/home/recomed-item-img.jpg";
export default {
  props: ["recomedList"],
  data() {
    return {
      tempImg: TempImg,
      tempData: [
        {
          img: TempImg,
          name: "梵音净土字画",
          size: "12×28cm",
          curPrice: "￥9999"
        },
        {
          img: TempImg,
          name: "梵音净土字画",
          size: "12×28cm",
          curPrice: "￥9999"
        },
        {
          img: TempImg,
          name: "梵音净土字画",
          size: "12×28cm",
          curPrice: "￥9999"
        },
        {
          img: TempImg,
          name: "梵音净土字画",
          size: "12×28cm",
          curPrice: "￥9999"
        }
      ]
    };
  },
  methods: {
    /**
     * 点击跳转
     */
    changeDetail: function(id) {
      // console.log("当前点击的", id);
      // console.log(
      //   "当前点击的",
      // "http://weipai.test01.qcw100.cn/index.html?login=1#/auctionGoodDetail?id=" +
      //   id
      // );
      let url1 = window.location.href.replace("id", id);
      window.location.href =
        "http://weipai.test01.qcw100.cn/index.html?login=1#/auctionGoodDetail?id=" +
        id;
      console.log("处理过的url", url1);
      setTimeout(() => {
        window.location.reload();
      }, 0.3);
    }
  }
};
</script>
<style lang="less" scoped>
.recomted {
  background: #fff;
}
.recomed-title {
  padding: 1.25rem 0;
  img {
    display: block;
    margin: 0 auto;
    width: 50%;
  }
}
.content-list {
  padding-bottom: 2.5rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4%;
    padding-top: 0.9375rem;
    li {
      width: 32%;
      margin-right: 2%;
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      div.img {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #f2f2f2;
        padding: 15%;
        .img_inner {
          width: 100%;
          height: 3.75rem;
          position: relative;
          overflow: hidden;
        }
        img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .info {
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 0.75rem;
      &:nth-child(2) {
        margin: 0.4375rem 0;
        span {
          color: #bf1616;
          font-weight: 700;
        }
      }
    }
  }
}
</style>


