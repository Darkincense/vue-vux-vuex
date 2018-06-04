<template>
  <div>
    <group title="">
        <x-input class="font14" title="收货人" placeholder="填写收货人姓名" v-model="name"></x-input>
        <x-input class="font14" 
        title="联系电话" 
        v-model="mobile" placeholder="填写联系电话"></x-input>
        <x-input class="font14" title="详细地址" placeholder="填写详细地址" v-model="address"></x-input>
    </group>

    <div class="login-btn">
        <a class="btn" 
        @click="saveAdress" 
        >保存</a>
    </div>

  </div>
</template>

<script>
export default {
  name: "menuIndex",
  data() {
    return {
      maskValue: "",
      addressId: "",
      addressInfo: [],
      name: "",
      mobile: "",
      address: ""
    };
  },
  components: {},
  methods: {
    /**
     * 修改地址
     */
    saveAdress: function() {
      let that = this;
      if (!that.mobile) {
        that.$vux.toast.text("请输入手机号");
        return false;
      }
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(that.mobile)) {
        that.$vux.toast.text("手机号格式不正确");
        return false;
      }

      if (!that.address) {
        that.$vux.toast.text("请输入详细地址");
        return false;
      }
      if (!that.name) {
        that.$vux.toast.text("请输入姓名");
        return false;
      }
      let option = {
        mobile: this.mobile,
        address: this.address,
        name: this.name,
        id: this.addressId
      };
      this.getRequestList.updateAdd(option).then(function(res) {
        if (!res.data.error_code) {
          that.$vux.toast.text("编辑成功");
          // 跳转回页面
          setTimeout(function(){
            router.push("/AddressList");
          },1500)
        }
      });
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
    this.addressId = this.$route.query.id;
    let that = this;
    let option1 = {
      page: null,
      num: null
    };
    this.getRequestList.addList(option1).then(function(res) {
      if (!res.data.error_code) {
        res.data.response_data.lists.forEach(function(item, index) {
          if (item.id == that.addressId) {
            that.name = item.name;
            that.mobile = item.mobile;
            that.address = item.address;
          }
        });
      }
    });
  }
};
</script>
<style lang="less" >
.login-btn {
  padding-top: 2.375rem;
}
.weui-cell {
  height: 3.125rem;
  box-sizing: border-box;
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
.weui-input {
  height: 16px;
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
.font14 {
  color: #666;
  font-size: 0.875rem;
}
</style>