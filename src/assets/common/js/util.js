export default {
    install(Vue, options) {


        /**
         * 分页公用参数
         * @param {num} page         页数
         * @param {obj} option       请求参数
         * @param {fun} fun          请求页数的回调函数
         * @param {Array} addList    请求数据添加到页面上去
        */
        // Vue.prototype.pageMore = function (page, option, fun, addList) {
        //     // page++;
        //     option["page"] = page;
        //     fun(option).then(function (res) {
        //         if (!res.data.error_code) {
        //             res.data.response_data.lists.forEach.forEach(function (item) {
        //                 addList.push(item);
        //             })
        //         }
        //     });
        // }
        /**
         * 获取url参数
         */
        Vue.prototype.getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
        /**
         * 时间差值转换成时分秒格式的倒计时
         * @param {str} second_time
        */
        Vue.prototype.timeStamp = function (second_time) {

            // 时间格式补零
            function PrefixInteger(num) {
                return (Array(2).join(0) + num).slice(-2);
            }
            var time = parseInt(second_time) + "秒";
            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);

            if (parseInt(second_time) > 60) {
                time = PrefixInteger(min) + ":" + PrefixInteger(second)

            } else {
                time = "00" + ":" + PrefixInteger(second)
            }
            return time;
        }

        /**
         * 倒计时时差转换成天是分秒
         * @param {int} curTime1 当前时间戳
         * @param {int} endTime1 结束时间戳
        */
        Vue.prototype.countTime = function (curTime1, endTime1) {
            // 获取当前毫秒数
            let curTime = curTime1 * 1000;
            // 获取结束毫秒数
            let endTime = endTime1 * 1000;

            //时间差  
            var leftTime = endTime - curTime;
            //定义变量 d,h,m,s保存倒计时的时间  
            var d, h, m, s;
            if (leftTime >= 0) {
                d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                m = Math.floor(leftTime / 1000 / 60 % 60);
                s = Math.floor(leftTime / 1000 % 60);
            }
            var time = d + "天" + h + "时" + m + "分" + s + "秒";

            return time;

        }

        /**
         * 倒计时时差转换成天是分秒
         * @param {int} curTime1 当前时间戳
         * @param {int} endTime1 结束时间戳
        */
        Vue.prototype.hourCount = function (curTime1, endTime1) {
            // 获取当前毫秒数
            let curTime = curTime1 * 1000;
            // 获取结束毫秒数
            let endTime = endTime1 * 1000;

            //时间差  
            var leftTime = endTime - curTime;
            //定义变量 d,h,m,s保存倒计时的时间  
            var d, h, m, s;
            if (leftTime >= 0) {
                d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                m = Math.floor(leftTime / 1000 / 60 % 60);
                s = Math.floor(leftTime / 1000 % 60);
            }
            var time = d + "天" + h + "时" + m + "分" + s + "秒";

            return time;

        }


        /**
         * 通过url获取数据
        */


        Vue.prototype.getRequestList = {
            // 专场拍卖列表
            getLists: function (option) {
                return new Vue().getSpecialList("/home/special/lists", option);
            },
            // 专场拍卖 详情
            getDetailLists: function (option) {
                return new Vue().getSpecialList("/home/special/info", option);
            },
            // 系统设置  1 光环介绍/ 2 光环机构/ 3 拍卖规则/ 4 发货规则/ 5 联系客服
            systemSetup: function (option) {
                return new Vue().getSpecialList("/system/system/info", option);
            },
            // 艺术家列表
            artistList: function (option) {
                return new Vue().getSpecialList("/user/artist/lists", option);
            },
            // 艺术家详情
            artistDetail: function (option) {
                return new Vue().getSpecialList("/user/artist/info", option);
            },
            // 资讯列表 1 图片/ 2 视频
            informationList: function (option) {
                return new Vue().getSpecialList("/message/message/lists", option);
            },
            // 轮播图列表  1 首页轮播图/ 2资讯轮播图/ 3拍品轮播图
            carouselList: function (option) {
                return new Vue().getSpecialList("/message/slider/lists", option);
            },
            // 资讯详情 图文
            newsDetail: function (option) {
                return new Vue().getSpecialList("/message/message/info", option);
            },
            // 拍品列表
            getlotsLists: function (option) {
                return new Vue().getSpecialList("/home/product/lists", option);
            },
            // 拍品详情
            getlotsListsDetail: function (option) {
                return new Vue().getSpecialList("/home/product/info", option);
            },
            // 出价历史
            bidHistory: function (option) {
                return new Vue().getSpecialList("/home/bidding/lists", option);
            },
            // 拍卖接口
            getAuction: function (option) {
                return new Vue().getSpecialList("/home/product/auction", option);
            },
            // 判断有没有缴纳保证金
            bail: function (option) {
                return new Vue().getSpecialList("/home/product/margin", option);
            },

            // 去支付接口
            toPay: function (option) {
                return new Vue().getSpecialList("/home/orders/pay", option);
            },

            // 保证金下单
            createOrder: function (option) {
                return new Vue().getSpecialList("/home/orders/create", option);
            },
            // 注册
            // goRegister: function (option) {
            //     return new Vue().getSpecialList("/user/user/register", option);
            // },
            // 登录
            // goLogin: function (option) {
            //     return new Vue().getSpecialList("/user/user/login", option);
            // },
            // 绑定手机号
            bindMobile: function (option) {
                return new Vue().getSpecialList("/user/user/bind", option);
            },
            // 发送短信接口
            sendCodeF: function (option) {
                return new Vue().getSpecialList("/user/user/sms_code", option);
            },
            // 修改密码/忘记密码
            modifyPass: function (option) {
                return new Vue().getSpecialList("/user/user/update_password", option);
            },
            // 修改个人信息  头像/昵称
            updateInfo: function (option) {
                return new Vue().getSpecialList("/user/user/update", option);
            },

            // 获取当前服务器时间
            getCurTime: function (option) {
                return new Vue().getSpecialList("/system/system/time", option);
            },
            //历史记录
            getHistory: function (option) {
                return new Vue().getSpecialList("/message/history/lists", option);
            },
            // 我的订单
            myOrderList: function (option) {
                return new Vue().getSpecialList("/home/orders/lists", option);
            },
            // 订单详情
            myOrderListDetail: function (option) {
                return new Vue().getSpecialList("/home/orders/info", option);
            },
            // 更改支付方式，并且加入收货地址接口
            changePayment: function (option) {
                return new Vue().getSpecialList("/home/orders/updateMethod", option);
            },
            // 用户信息
            getUserInfo: function (option) {
                return new Vue().getSpecialList("/user/user/user_info", option);
            },
            // 提交code 
            sendCode: function (option) {
                return new Vue().getSpecialList("/user/user/wx_auth", option);
            },
            // 提交code 
            sendCodeBase: function (option) {
                return new Vue().getSpecialList("/user/user/get_wx_auth", option);
            },


            // 收货地址列表 
            addList: function (option) {
                return new Vue().getSpecialList("/user/address/lists", option);
            },
            // 添加 收货地址
            createAdd: function (option) {
                return new Vue().getSpecialList("/user/address/create", option);
            },
            // 编辑 收货地址
            updateAdd: function (option) {
                return new Vue().getSpecialList("/user/address/update", option);
            },
            // 设置默认地址
            defaultAdd: function (option) {
                return new Vue().getSpecialList("/user/address/defaults", option);
            },
            // 删除收货地址
            deleteAdd: function (option) {
                return new Vue().getSpecialList("//user/address/delete", option);
            },

            // 上传图片（没添加图片上传）
            upLoadImg: function (option) {
                return new Vue().getSpecialList("/user/user/upload", option);
            },
            // 获取默认收货地址
            getDefaultAddress: function (option) {
                return new Vue().getSpecialList("/user/address/default_info", option);
            },
            // 确认收货
            confirmReceipt: function (option) {
                return new Vue().getSpecialList("/home/orders/confirm", option);
            },

            // 确认收货
            getCongfig: function (option) {
                return new Vue().getSpecialList("/user/user/config", option);
            },

            //获取 access_token
            getToken: function (option) {
                return new Vue().getSpecialList("/system/test/access", option);
            },
            //获取 图片 地址
            getWxPic: function (option) {
                return new Vue().getSpecialList("/system/test/access", option);
            },
            //获取 图片 地址
            downOwn: function (option) {
                return new Vue().getSpecialList("/user/user/upload", option);
            },
            //获取 图片 地址
            authLogin: function (option) {
                return new Vue().getSpecialList("/user/user/wx_auth", option);
            },
        }

        /**
         * 调取微信支付接口
         * @param {int} param
        */
        Vue.prototype.wxPay = function (param, fun) {
            let that = this;
            let fun1 = fun ? fun : ""
            if (param.error_code) {
                // alert("微信支付传进参数", param.error_msg)
            }
            WeixinJSBridge.invoke("getBrandWCPayRequest", param, function (res) {
                // alert("微信支付返回信息", res)
                switch (res.err_msg) {
                    case "get_brand_wcpay_request:cancel":
                        alert("用户取消支付！");
                        break;
                    case "get_brand_wcpay_request:fail":
                        alert("支付失败！（" + res.err_desc + "）");
                        break;
                    case "get_brand_wcpay_request:ok":
                        // alert("支付成功！");
                        fun1()
                        break;
                    default:
                        alert(JSON.stringify(res));
                        break;
                }
            });
        }
        /**
         * 微信授权登录
        */
        Vue.prototype.wxLogin = function () {
            // var option={
            //   type:2
            // }
            // this.getRequestList.goLogin(option).then(function(res) {
            //   console.log(res)
            // })
            let that = this;
            var appId = "wx48adb8743d3357d7";
            var codeUrl = "";
            // var redirect_uri=;
            var scope = "snsapi_userinfo";
            var state = "userinfo"; //带这个参数的好处就是防止非法的请求。

            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
            url = url + "appid=" + appId;
            url =
                url +
                "&redirect_uri=" +
                encodeURI("http://weipai.test01.qcw100.cn/index.html?login=1");

            url = url + "&response_type=code";
            url = url + "&scope=" + scope;
            if (state != null) {
                url = url + "&state=" + state;
            }
            url = url + "#wechat_redirect"; //进行URL的拼接
            if (window.location.href.indexOf("login") < 0) {
                codeUrl = url;
                window.location.href = url; //调用http请求的，进行微信授权
            } else {
                function getQueryValue(key, href) {
                    href = href || window.location.search;
                    var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
                    return match && match[1] && decodeURIComponent(match[1]) || '';
                };
                var code = getQueryValue("code", codeUrl);
                console.log(code);
                let option = {
                    code: code
                };
                if (window.location.href.indexOf("code") > -1) {
                    that.getRequestList.authLogin(option).then(function (res) {
                        if (!res.data.error_code) {
                            // 获取微信授权信息
                            that.getRequestList.getUserInfo(option).then(function (res) {
                                if (!res.data.error_code) {
                                    window.location.href = "http://weipai.test01.qcw100.cn/index.html?login=1";
                                }
                            })
                        }
                    });
                }
            }

        }

        /**
         * 公共get请求方法
         * @param {string} requestUrl   // 请求的url链接
         * @param {obj} params          // 请求参数
        */
        Vue.prototype.getSpecialList = function (requestUrl, params) {
            var get = axios.get(baseUrl + requestUrl, {
                params: params
            })
            return get;
        }
    }

}