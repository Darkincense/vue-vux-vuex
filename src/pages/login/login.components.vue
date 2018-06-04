<template>
    <div id="app" class="app">
        <div class="img">
            <img src="../../assets/images/personal/login-logo.png" alt="logo">
        </div>
        <div class="login-content">
            <div class="mobile">
                <input type="number" v-model="option.mobile"  placeholder="请输入手机号">
            </div>
            <div class="password">
                <input type="password" v-model="option.password"    placeholder="请输入密码">
            </div>
        </div>

        <div class="login-btn">
            <a class="btn"  @click="toLoginEvent" >登录</a>
        </div>

        <div class="prompt">
          <router-link to="/personal/forgotpassword">
            <a href="javascript:void(0)">忘记密码?</a>
            </router-link>
            <router-link to="/personal/register" @click="regisetEvent($event)">立即注册</router-link>
        </div>

        <div class="wxIcon" @click="wxLogin">
          <img src="../../assets/images/personal/wx.png" alt="">
        </div>
        
        <!-- 弹窗 -->
        <div class="login-success" v-if="loginSuccess">
            <div class="mask"></div>
            <div class="content">
                <h3>{{loginInfo ? '登录成功' : errorPrompt}}</h3>
                <div class="login-btn">
                    <a class="btn" @click="jumpPath" href="javascript:void(0)">确认</a>
                </div>
            </div>
        </div>
        <div class="bg"></div>
    </div>    
</template>
<script>
export default {
  data() {
    return {
      // 弹窗显示与否
      loginSuccess: false,
      // 登陆成功与否
      loginInfo: false,
      // 错误提示
      errorPrompt: "",
      option: {
        mobile: "",
        password: "",
        type: 1
      }
    };
  },
  components: {},
  methods: {
    jumpPath: function() {
      if (this.loginInfo) {
        // 点击注册成功弹窗的确定跳转至个人中心页面
        router.push("/personal");
      } else {
        this.loginSuccess = false;
      }
    },
    //微信授权登陆
    wxLogin: function() {
      // var option={
      //   type:2
      // }
      // this.getRequestList.goLogin(option).then(function(res) {
      //   console.log(res)
      // })
      var appId = "wx48adb8743d3357d7";
      // var redirect_uri=;
      var scope = "snsapi_userinfo";
      var state = "userinfo"; //带这个参数的好处就是防止非法的请求。

      var url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
      url = url + "appid=" + appId;
      url =
        url +
        "&redirect_uri=" +
        encodeURI("http://weipai.test01.qcw100.cn/index.html");

      url = url + "&response_type=code";
      url = url + "&scope=" + scope;
      if (state != null) {
        url = url + "&state=" + state;
      }
      url = url + "#wechat_redirect"; //进行URL的拼接
      window.location.href = url; //调用http请求的，进行微信授权
    },
    toLoginEvent: function() {
      var that = this;
      that.getRequestList.goLogin(this.option).then(function(res) {
        if (!res.data.error_code) {
          that.loginInfo = true;
        } else {
          that.loginInfo = false;
          if (res.data.error_code) {
            that.errorPrompt = "手机号或密码错误";
          }
        }
        that.loginSuccess = true;
      });
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
  }
};
</script>
<style lang="less" scoped>
.img {
  padding: 3.125rem 0;
  img {
    display: block;
    width: 5rem;
    margin: 0 auto;
  }
}
input::-webkit-input-placeholder {
  color: #333;
}
.login-content {
  padding: 0 1.5625rem;
  div {
    display: flex;
    height: 3.375rem;
    border-bottom: 0.031rem solid #999;
    align-items: center;
    box-sizing: border-box;
    &.verification-code input,
    &.password input,
    &.mobile input {
      height: 1.25rem;
      box-sizing: border-box;
      padding: 0.15625rem 0;
      padding-left: 1.875rem;
      background: url(../../assets/images/personal/icon-mobile.png) no-repeat
        left center;
      background-size: auto 100%;
      color: #333;
    }
    &.password input {
      background-image: url(../../assets/images/personal/icon-lock.png);
    }
    &.verification-code input {
      background-image: url(../../assets/images/personal/icon-key.png);
    }
    &.verification-code {
      justify-content: space-between;
    }
    &.verification-code a {
      width: 5.4375rem;
      height: 1.875rem;
      line-height: 1.875rem;
      text-align: center;
      color: #fff;
      background: #bf1616;
      border-radius: 3px;
    }
  }
}
.login-btn {
  padding-top: 2.375rem;
}
.prompt {
  width: 20.3125rem;
  height: 3.125rem;
  margin: 0 auto;
  padding-top: 1.4375rem;
  display: flex;
  justify-content: space-between;
  a {
    color: #333;
  }
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
  font-size: 0.875rem;
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
input {
  border: none;
  background: #f0f0f5;
}
.wxIcon {
  margin-top: 1.875rem;
}
.wxIcon img {
  display: block;
  width: 2.5rem;
  margin: 0 auto;
}
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


