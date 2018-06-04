<template>
    <div id="app" class="app">
        <div class="news_title">{{news_con.title}}</div>
        <div class="news_time">{{news_con.time}}</div>
        <div class="news_con">
            <img :src="news_con.path" alt="">
            <p v-html="news_con.content"></p>
        </div>
    </div>
</template>
<script>
    import imgUrl from '@/assets/images/news/news_img.jpg';
    import {
        
    } from 'vux'
    
    export default {
        data(){
            return {
                news_con: {}
            }
        },
        components: {
            
        },
        methods: {
           
        },
        created: function(){
            this.$store.state.showBottomNav = false;
            let that = this;
            let option = {
                id: this.$route.query.id
            };
            this.getRequestList.newsDetail(option).then(function(res) {
                that.news_con = res.data.response_data;
            })
        }
    }
</script>
<style lang="less" scoped>
    .app {
        padding:.9375rem .9375rem;
        background: #fff;
    }
    .news_title {
        color: #000;
        font-size: 1.125rem;
        line-height: 1.6875rem;
        font-weight: 700;
        padding: .5rem 0;
    }
    .news_time {
        color: #4c4c4c;
        font-size: .9375rem;
        line-height: 1.375rem;
        padding-bottom: 1.25rem;
    }
    .news_con {
        color: #333;
        font-size: .875rem;
        line-height: 1.3125rem;
        text-align: justify;
    }
    .news_con img {
        display: block;
        width: 100%;
        margin-bottom: 1.5rem;
    }
</style>