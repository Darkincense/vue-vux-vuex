<template>
    <div id="app" class="app">
        <div class="artist_top">
            <div class="artist_photo">
                <img :src="list.avatar" alt="">
            </div>
            <div class="artist_name">{{list.username}}</div>
        </div>
        <div class="artist_bottom">
            <p>人物简介</p>
            <p v-html="list.content"></p>
        </div>
    </div>
</template>
<script>
    import {
        
    } from 'vux'
    export default {
        data(){
            return {
                list: {}
            }
        },
        components: {
            
        },
        methods: {
            
        },
        created: function(){
            this.$store.state.showBottomNav = true;
            let that = this;
            let option = {
                id : this.$route.query.id
            };
            this.getRequestList.artistDetail(option).then(function(res) {
                that.list = res.data.response_data;
            })
        }
    }
</script>
<style lang="less">
    body {
        background: #f0f0f5;
    }
    .artist_top {
        padding: 1.875rem 0.938rem;
        background: #fff;
        overflow: hidden;
    }
    .artist_photo {
        float: left;
        width: 4.062rem;
        height: 4.062rem;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
    }
    .artist_photo img {
        display: block;
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .artist_name {
        float: left;
        margin-left: 1.25rem;
        color: #333;
        font-size: .9375rem;
        height: 4.062rem;
        line-height: 4.062rem;
    }
    .artist_bottom {
        padding: 0.938rem 0.938rem;
        background: #fff;
        color: #333;
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-align: justify;
    }
    .artist_bottom img {
        padding: 1.25rem 0;
        display: block;
        width: 100%;
    }
</style>
