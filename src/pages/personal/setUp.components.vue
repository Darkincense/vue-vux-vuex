<template>
    <div id="app" class="app">
        <div class="top">
          <!--  @click="uploadImg" -->
            <div class="infoLi">
                <span>头像</span>
                <!-- <div class="arrow"></div> -->
                <div class="headPhoto">
                    <img :src="avactUrl" alt="用户头像">
                </div>                
            </div>
            <div class="infoLi">
                <!-- <router-link to="/setNickname"> -->
                    <span>昵称</span>
                    <!-- <div class="arrow"></div>  -->
                    <p>{{userInfo.nickname}}</p>
                <!-- </router-link> -->
            </div>
            <div class="infoLi">
                <span>账号</span>
                <p>{{userInfo.mobile}}</p>   
            </div>
        </div>
        <div class="bottom">
            <div class="infoLi">
                <router-link to="/AddressList">
                  <span>收货地址</span>
                  <div class="arrow"></div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import avatar from "@/assets/images/personal/ava.png";
import {} from "vux";
export default {
  data() {
    return {
      // 个人信息
      userInfo: {}
    };
  },
  // 计算属性
  computed: {
    avactUrl: function() {
      if (this.userInfo.avatar) {
        return this.userInfo.avatar;
      } else {
        return avatar;
      }
    }
  },
  components: {},
  methods: {
    /**
     * 上传图片
     */
    uploadImg: function() {
      let that = this;
      //  拍照或从手机相册中选图接口
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // 上传图片接口
          that.WxUpload(localIds);
        },
        fail: function(res) {}
      });
    },
    WxUpload: function(localIds) {
      let that = this;
      setTimeout(function() {
        wx.uploadImage({
          localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function(res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            that.WxDown(serverId);
          },
          fail: function(res) {}
        });
      }, 300);
    },
    WxDown: function(serverId) {
      var option = {};
      var that = this;
      that.getRequestList.getToken(option).then(function(res) {
        var token = res.data.response_data;
        var str =
          "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=" +
          token +
          "&media_id=" +
          serverId;
        that.downOwn(str);
      });
    },
    downOwn: function(str) {
      var that = this;
      var option = {
        url: str
      };
      that.getRequestList.downOwn(option).then(function(res) {
        var imgUrl = res.data.response_data; //返回的图片地址
        var optionUpload = {
          avatar: res.data.response_data
        };
        that.getRequestList.updateInfo(optionUpload).then(function(res) {
          if (!res.data.error_msg) {
            that.getRequestList.getUserInfo().then(function(res) {
              if (!res.data.error_code) {
                that.userInfo = res.data.response_data;
              }
            });
          } else {
            that.$vux.alert.show({
              title: "警告",
              content: "更新头像失败"
            });
          }
        });
      });
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
    let that = this;
    let option = {};
    this.getRequestList.getCongfig(option).then(function(res) {
      wx.config({
        appId: res.data.response_data.appId,
        timestamp: res.data.response_data.timestamp,
        nonceStr: res.data.response_data.nonceStr,
        signature: res.data.response_data.signature,
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          "chooseImage",
          "uploadImage",
          "downloadImage",
          "getLocalImgData"
        ]
      });
      wx.ready(function() {});
    });

    // 获取个人信息
    that.getRequestList.getUserInfo().then(function(res) {
      if (!res.data.error_code) {
        that.userInfo = res.data.response_data;
      }
    });
  }
};
</script>

<style lang="less">
.login-btn {
  padding-top: 2.375rem;
}

.login-btn a {
  display: block;
  width: 20.3125rem;
  height: 3.125rem;
  text-align: center;
  line-height: 3.125rem;
  color: #fff;
  background: #bf1616;
  border-radius: 3px;
  margin: 0 auto;
  font-size: 1rem;
  letter-spacing: 0.1875rem;
}
.login-success {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .content {
    position: fixed;
    top: 8.4375rem;
    left: 50%;
    transform: translateX(-50%);
    width: 16.875rem;
    height: 9.375rem;
    background: #fff;
    h3 {
      padding: 2.0625rem 0;
      text-align: center;
    }
  }
  .login-btn {
    padding-top: 0;
  }
  .login-btn a {
    width: 13.5625rem;
    height: 2.125rem;
    line-height: 2.125rem;
  }
}

.top,
.bottom {
  margin-top: 0.625rem;
  background: #fff;
}
.infoLi {
  padding: 0.4375rem 0.9375rem;
  height: 2.375rem;
  line-height: 2.375rem;
}
.infoLi:not(:last-child) {
  border-bottom: 0.0625rem solid #f0f0f5;
}
.infoLi a {
  display: block;
  width: 100%;
  height: 100%;
}
.infoLi span {
  color: #000;
  font-size: 0.875rem;
  float: left;
}
.infoLi p {
  float: right;
  color: #b5b5b5;
  font-size: 0.875rem;
  // margin-right: 0.9375rem;
}
.arrow {
  width: 0.5625rem;
  height: 1rem;
  float: right;
}
.arrow:after {
  content: " ";
  display: inline-block;
  height: 10px;
  width: 10px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  margin-top: 0.8125rem;
}
.headPhoto {
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 50%;
  float: right;
  // margin-right: 0.9375rem;
  position: relative;
  overflow: hidden;
}
.headPhoto img {
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>

