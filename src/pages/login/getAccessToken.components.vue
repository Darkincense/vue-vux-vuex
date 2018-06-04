<template>
     <div>
        code:{{code}}
     </div>   
</template>
<script>
export default {
  data() {
    return {
     
    };
  },
  components: {},
  methods: {
  },
  created: function(res) {

      let that = this;

        
      if (location.href.match(/code=(\S*)&state=/)) {
        console.log(that.$route.code);
        let code = location.href.match(/code=(\S*)&state=/)[1];        
        let state = location.href.match(/state=(\S*)#/)[1];
        var optionCode = {
          code: code
        };
        if(state=='789789'){
            that.getRequestList.sendCodeBase(optionCode).then(function(res) {
              if(!res.data.error_code) {
                // that.swiperList = res.data.response_data.lists;
              }
            });
        }else{          
            that.getRequestList.sendCode(optionCode).then(function(res) {
              if(!res.data.error_code) {
                console.log(res);
                // that.swiperList = res.data.response_data.lists;
              }
            });
        }  
      }else{
        that.wxBaseLogin()
      }

  }
};
</script>
<style lang="less" scoped>

</style>


