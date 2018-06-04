<template>
  <div style="background:#FFF;padding-bottom:3.125rem;">  
    <div class="content" v-html="content.content"> </div>
    <div id="allmap" v-bind:style="mapStyle"></div>
  </div>
</template>

<script>
export default {
  name: "menuIndex",
  props: {
    // 地图在该视图上的高度
    mapHeight: {
      type: Number,
      default: 100
    },
    // 经度
    longitude: {
      type: Number,
      default: 116.551481
    },
    // 纬度
    latitude: {
      type: Number,
      default: 39.905716
    },
    description: {
      type: String,
      default: "六洲大厦"
    }
  },
  data() {
    return {
      mapStyle: {
        width: "90%",
        height: "20rem",
        margin: "0 auto"
      },
      content:{},
    };
  },
  mounted() {
    this.baiduMap();
  },
  created: function() {
    this.$store.state.showBottomNav = true;
    let that = this;
    //5 联系客服
    let option = {
        type: 5,
    };
    this.getRequestList.systemSetup(option).then(function(res) {
      that.content = res.data.response_data[0];
    })
  },

  methods: {
    baiduMap() {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(this.longitude, this.latitude);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      map.centerAndZoom(point, 15);
      // 信息窗的配置信息
      var opts = {
        width: 100,
        height: 50,
        title: "地址："
      };
      var infoWindow = new BMap.InfoWindow(this.description, opts); // 创建信息窗口对象
      marker.addEventListener("click", function() {
        map.openInfoWindow(infoWindow, point);
      });
      map.enableScrollWheelZoom(true);
      map.openInfoWindow(infoWindow, point); //开启信息窗口
    }
  }
};
</script>
<style lang="less" scoped>
#app {background: #fff; }
.content { line-height: 2.5; padding: 0.938rem;padding-top: 3.438rem; }
#allmap {
  height: 20rem;
}
div.weui-form-preview:after,
div.weui-form-preview__hd:after,
div.weui-form-preview:before {
  border: none;
}
.box {
  padding: 15px;
}
.active-6-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}
.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
.active-6-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}
.tab-swiper {
  background-color: #fff;
  height: 6.25rem;
}
.weui-form-preview__value {
  text-align: left;
}
</style>