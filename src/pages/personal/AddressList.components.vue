<template>
  <div>
    <div class="topCon">
      <ul v-if="addressList.length>0">
        <li v-for="(item,index) in addressList" :key="index">
          <div class="infoLi_1">
            {{item.name}}
            {{item.mobile}}
          </div>
          <div class="infoLi_1 line_two" >
            {{item.address}}
          </div>
          <div  class="infoLi">
            <div class="fl" @click="settingDefault(item.id)">
              <input type="radio" name="default" :checked="item.is_default==1?'true':''">
              <span>默认地址</span>
            </div>
            <div class="fr">
              <router-link class="link-regist" :to="{path: '/editorAdress',query:{id: item.id}}">
                <div class="edit">
                  <img src="../../assets/images/personal/edit.png" alt="" style=" width:18px;">
                  <span>编辑</span>
                </div>
              </router-link>
              <router-link class="link-regist" to="">
              <div class="delete" @click="deleteFun(item.id)">
                <img src="../../assets/images/personal/del.png" alt="" style=" width:18px;">
              <span>
                删除
              </span>
              </div>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
      <p class="notAddress" v-else>暂无收货地址~</p>
    </div>

    <div class="login-btn fix_bot">
      <router-link to="/setAddress">
        <a class="btn" href="javascript:void(0)">添加收货地址</a>
      </router-link>
    </div>
    <!-- 删除地址弹窗 -->
    <div class="delete-adress" v-if="deleteModelIsshow">
      <div class="mask"></div>
      <div class="delete-content">
        <div class="detele_text">
          <p>确定删去该地址？</p>
        </div>
        <div class="delete-btn">
          <a href="javascript:void(0)" @click="deleteItem" class="delete-ok">确认</a>
          <a href="javascript:void(0)" @click="deleteModelIsshow = false" class="delete-cancel">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menuIndex",
  data() {
    return {
      demo2: true,
      deleteModelIsshow: false,
      addressList: [],
      addressId: ''
    };
  },
  components: {},
  methods: {
    // 初始删除
    deleteFun: function(event){
      this.addressId = event;
      this.deleteModelIsshow = true;
    },
    /**
     * 确定删除收货地址
     */
    deleteItem: function() {
      let that = this;
      let option2 = {
        id: this.addressId
      };
      this.getRequestList.deleteAdd(option2).then(function(res) {
          that.deleteModelIsshow = false;
          that.$vux.toast.text("删除成功");
          // 删除后更新数据列表
          let option = {
            page: null,
            num: null
          };
          that.getRequestList.addList(option).then(function(res) {
              that.addressList = res.data.response_data.lists;
          })
      })
    },

    // 设置为默认地址
    settingDefault: function(event){
      let option3 = {
        id: event
      };
      let that = this;
      this.getRequestList.defaultAdd(option3).then(function(res) {
          that.$vux.toast.text("设置成功");
          if(!res.data.error_code) {
            // 设置后更新数据列表
            let option = {
              page: null,
              num: null
            };
            that.getRequestList.addList(option).then(function(res) {
              if(!res.data.error_code) {
                that.addressList = res.data.response_data.lists;
              }
            })
          }
      })
    }
  },
  created: function() {
    this.$store.state.showBottomNav = false;
    // 请求收货地址列表
    let that = this;
    let option = {
      page: null,
      num: null
    };
    this.getRequestList.addList(option).then(function(res) {
        that.addressList = res.data.response_data.lists;
    })
  }
};
</script>
<style lang="less" scoped>
.delete-adress {
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }
  .delete-content {
    width: 72%;
    height: 10.9375rem;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: #fff;
    p {
      text-align: center;
      padding: 2.5rem 0;
    }
  }
  .delete-btn {
    padding: 1.25rem 0;
    display: flex;
    justify-content: space-around;
    a {
      width: 6.125rem;
      height: 2.125rem;
      line-height: 2.125rem;
      text-align: center;
    }
    a.delete-ok {
      background: #bf1616;
      color: #fff;
    }
    a.delete-cancel {
      background: #f0f0f5;
      color: #a9a9aa;
    }
  }
}
.edit,
.delete {
  display: flex;
  align-items: center;
  img {
    margin-right: 8px;
  }
}
.infoLi {
  color: #666;
  padding: 0.4375rem 0.9375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.infoLi span {
  color: #666;
}
.infoLi_1 {
  padding: 10px;
}
.infoLi_1.line_two {
  color: #666;
  border-bottom: 1px dashed #999;
}
.topCon {
  margin-bottom: 2.125rem;
}
.topCon li {
  background: #fff;
  margin-top: .625rem;
}
.fix_bot {
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
}
.login-btn {
  padding: 20px 0;
}
.fl {
  float: left;
}
.fl input {
  display: block;
  float: left;
  margin-top: .8125rem;
}
.fl span {
  display: block;
  float: left;
  color: #666;
  margin-left: .625rem;
}
.fr {
  float: right;
  display: flex;
  align-items: center;
}
.fr a {
  display: inline-block;
  overflow: hidden;
  padding: 0 15px;
}

.fr a img {
  display: inline-block;
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
  .detele_text {
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
.notAddress {
  padding: 1.25rem;
  color: #666;
  font-size: 0.938rem;
  text-align: center;
}
</style>