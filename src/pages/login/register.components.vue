<template>
    <div id="app" class="app">
        <div class="img">
            <img src="../../assets/images/personal/login-logo.png" alt="logo">
        </div>
        <div class="login-content">
            <div class="mobile">
                <input type="text" v-model="mobile" placeholder="请输入手机号">
            </div>
            <div class="verification-code">
                <input type="text" v-model="wxcode" placeholder="请输入验证码">
                <a href="javascript:void(0)" @click="sendCode">{{codeState==true?'发送验证码':codeTime+'s后重新发送'}}</a>
            </div>
            <!-- <div class="password">
                <input type="password" v-model="password" placeholder="请输入密码">
            </div> -->
        </div>
        <div class="login-btn">
            <a class="btn" @click="goReginster" href="javascript:void(0)">保存</a>
        </div>
        <!-- <div class="goLogin">
          已有账号？<router-link to="/personal/login">立即登录</router-link>
        </div> -->
        <!-- 弹窗 -->
        <div class="login-success" v-if="registSuccess">
            <div class="mask"></div>
            <div class="content">
                <h3>保存成功</h3>
                <div class="login-btn">
                    <a class="btn" @click="jumpPath">完成</a>
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
      // 注册成功回调成功之后显示
      registSuccess: false,
      mobile: "",
      // password: "",
      wxcode: "",
      codeState: true,
      codeTime: 60
    };
  },
  components: {},
  methods: {
    jumpPath: function() {
      // 点击注册成功弹窗的确定跳转至登录页面
      router.push(backUrl);
    },
    /**
     * 点击发送验证码
     */
    sendCode: function() {
      let that = this;
      // 判断当前是不是可点击状态
      if (this.codeState == false) {
        return false;
      } else {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!that.mobile) {
          that.$vux.toast.text("请输入手机号");
          return false;
        }
        if (!myreg.test(that.mobile)) {
          that.$vux.toast.text("请输入正确的手机号");
          return false;
        }
        let option = {
          mobile: this.mobile,
          type: "1" // 1 表示注册时短信   2 表示忘记密码时短信
        };
        this.getRequestList.sendCodeF(option).then(function(res) {
          console.log(res);
          if (!res.data.error_code) {
            that.$vux.toast.text("发送成功");
            var timer = null;
            clearInterval(timer);
            timer = setInterval(function() {
              that.codeTime -= 1;
              if (that.codeTime <= 0) {
                clearInterval(timer);
                that.codeTime = 60;
                that.codeState = true;
              }
            }, 1000);
          }
        });
      }
      this.codeState = false;
    },
    /**
     * 点击绑定手机号
     */
    goReginster: function() {
      let that = this;
      if (!that.mobile) {
        that.$vux.toast.text("请输入手机号");
        return false;
      }
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(that.mobile)) {
        that.$vux.toast.text("请输入正确的手机号");
        return false;
      }
      if (!that.wxcode) {
        that.$vux.toast.text("请输入验证码");
        return false;
      }
      // if (!that.password) {
      //   that.$vux.toast.text("请输入密码");
      //   return false;
      // }

      let option = {
        mobile: this.mobile,
        code: this.wxcode
      };

      this.getRequestList.bindMobile(option).then(function(res) {
        if (!res.data.error_code) {
          that.registSuccess = true;
        } else {
          that.$vux.toast.text(res.data.error_msg);
        }
      });
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
  }
};
</script>
<style lang="less" scoped>
body {
  background: #fff;
}
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
      height: 80%;
      box-sizing: border-box;
      padding: 0.15625rem 0;
      padding-left: 1.875rem;
      background: url(../../assets/images/personal/icon-mobile.png) no-repeat
        left center;
      background-size: auto 1.25rem;
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
      height: 1.875rem;
      line-height: 1.875rem;
      text-align: center;
      color: #fff;
      background: #bf1616;
      border-radius: 3px;
      font-size: 0.812rem;
      padding: 0 0.25rem;
    }
  }
}
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
    z-index: 9;
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
.goLogin {
  margin-top: 1.875rem;
  color: #333;
  font-size: 0.875rem;
  text-align: right;
  padding-right: 1.562rem;
}
.goLogin a {
  color: #ba0303;
  font-size: 0.875rem;
  padding-left: 0.375rem;
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


