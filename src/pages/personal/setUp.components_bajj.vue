<template>
    <div id="app" class="app">
        <div class="top">
            <div class="infoLi">
                <span>头像</span>
                <div class="arrow"></div>
                <div class="headPhoto">
                    <img  :src="avactUrl"  @click="uploadImg"  alt="用户头像">
                </div>                
            </div>
            <div class="infoLi">
                <router-link to="/setNickname">
                    <span>昵称</span>
                    <div class="arrow"></div> 
                    <p>{{userInfo.nickname}}</p>
                </router-link>
            </div>
            <div class="infoLi">

                <router-link to="">
                <span>账号</span>
                <div class="arrow"></div>
                <p>{{userInfo.mobile}}</p>   
                </router-link>

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
      // 个人信息(模拟数据)
      userInfo: {
        // id: "1",
        // openid: "11454521",
        // mobile: "13121086266",
        // wechat: "testceshi",
        // nickname: "李大大123",
        // avatar: "",
        // disable: "1",
        // ctime: "2018-04-26 11:50:59",
        // mtime: "2018-04-26 11:25:35"
      }
    };
  },
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
      let that=this
      //  拍照或从手机相册中选图接口
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
             
              // 上传图片接口
              setTimeout(function(){
                wx.uploadImage({
                    localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1,  // 默认为1，显示进度提示
                    success: function (res) {                      
                        that.$vux.alert.show({
                          title: 'uploadImage success ' ,
                          content: res.serverId,
                        });
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        setTimeout(function(){
                          wx.downloadImage({
                              serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                              isShowProgressTips: 1, // 默认为1，显示进度提示
                              success: function (res) {
                                  that.$vux.alert.show({
                                    title: '本地路径1',
                                    content: res.localId,
                                  })
                                  setTimeout(function(){
                                    that.$vux.alert.show({
                                      title: '本地路径2',
                                      content: res.localId,
                                    });
                                    wx.getLocalImgData({
                                        localId: res.localId, // 图片的localID
                                        success: function (resLo) {
                                          var localData = resLo.localData;    // localData是图片的base64数据，可以用img标签显示
                                          that.$vux.alert.show({
                                            title: '本地路径3',
                                            content:localData,
                                          });
                                          setTimeout(function(){

                                            that.resUpload(localData)
                                          },300)
                                        },
                                        fail:function(res){
                                          that.$vux.alert.show({
                                            title: 'localImg 错误 ',
                                            content:res,
                                          });
                                        },                                      
                                    })
                                  },300)

                              },fail:function(res){
                                  that.$vux.alert.show({
                                    title: 'download报错',
                                    content:res,
                                  });
                              }
                          })
                        },300)
                    },
                    fail:function(res){
                        that.$vux.alert.show({
                          title: 'upload报错',
                          content:res,
                        });
                    }
                })
              },300)
              

          },
          fail:function(res){
              that.$vux.alert.show({
                title: 'choose报错',
                content:res,
              });
          }
      });

    },
    resUpload:function(data){
        // 图片上传接口
        let option = {
          file: data
        };
        that.getRequestList.upLoadImg(option).then(function(res) {
          that.$vux.alert.show({
            title: 'VUX is Cool',
            content: '后台上传'+res.data.response_data,
          });
          that.avactUrl = res.data.response_data;
        });
        
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
    
    let that = this;
    let option = {
    };
    this.getRequestList.getCongfig(option).then(function(res) {
      console.log('默认执行的配置回调 ')
      console.log(res.data.response_data.appId)
      wx.config({
     
        appId: res.data.response_data.appId,
        timestamp:res.data.response_data.timestamp ,
        nonceStr:res.data.response_data.nonceStr ,
        signature:res.data.response_data.signature ,
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "chooseImage",
            "uploadImage",
            "downloadImage",
            "getLocalImgData",
          ]
      });
      wx.ready(function () {
        // 在这里调用 API
        
      
      });

    });
    // config
  





    // // 联系我们
    // let option = {
    //   type: 5
    // };
    // this.getRequestList.getUserInfo(option).then(function(res) {
    //   that.userInfo = res.data.response_data[0];
    // });
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
  font-size: 1.0rem;
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
  margin-right: 0.9375rem;
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
  margin-right: 0.9375rem;
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

