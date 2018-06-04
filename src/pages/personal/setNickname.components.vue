<template>
    <div id="app" class="app">
        <div class="nickname">
            <input type="text" placeholder="填写昵称" v-model="option.nickname" class="nickname">
        </div>
        <div class="login-btn">
            <a class="btn" @click="keepNickname" style="font-size: 1.0rem;">完成</a>
        </div>
    </div>
</template>

<script>
    import {
        
    } from 'vux'
    export default {
        data(){
            return {
                option: {
                    nickname: ''
                }
            }
        },
        components: {
            
        },
        methods: {
            // 修改昵称
            keepNickname: function(){
                let that = this;
                this.getRequestList.updateInfo(this.option).then(function(res) {
                    if(!res.data.error_code) {
                        that.$vux.toast.text('修改成功');
                        setTimeout(function(){
                            router.push("/setUp");
                        },1500)
                    }
                })
            }
        },
        created: function(){
            this.$store.state.showBottomNav = false;
        }
    }
</script>

<style lang="less">
    .nickname {     
        padding: .4375rem .9375rem;
        background: #fff;
        height: 2.375rem;
        margin-top: .625rem;
    }
    .nickname input {
        width: 100%;
        height: 100%;
        display: block;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        color: #dcdce0;
    }
    input::-webkit-input-placeholder{
        color: #dcdce0;
    }
</style>

