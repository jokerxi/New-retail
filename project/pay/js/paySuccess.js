$(window).bind("unload", function () { });
    if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
        window.onpageshow = function (event) {
            //判断页面是否从缓存中加载页面
            if (event.persisted) {
                window.location.reload()
            }
        };
    }
    var app = new Vue({
        el: "#app",
        data: {
            orderPrice: "22.33",//订单金额
            storeName: "喜洋洋便利店",//店铺名称
            fixedRatioMoney: "0.22",//消费返利金
            weekendRedPocket: "5.00",//周末返利金
            highConsumeRedPocket: "3.00",//高消费返利金
            Ht: '',
        }, methods: {
            closeWin: function () {
                try {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        WeixinJSBridge.call('closeWindow');
                    } else if (ua.indexOf("alipay") != -1) {
                        AlipayJSBridge.call('closeWebview');
                    }
                } catch (error) { }
            }
        }
    });
    /**
     * 浏览器回退事件监听
     */
    var listenerBackHandler = {
        param: {
            isRun: false, //防止微信返回立即执行popstate事件
        },
        listenerBack: function () {
            var state = {
                title: "title",
                url: "#"
            };
            window.history.pushState(state, "title", "#");
            window.addEventListener("popstate", function (e) {
                if (listenerBackHandler.param.isRun) {
                    try {
                        var ua = navigator.userAgent.toLowerCase();
                        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                            WeixinJSBridge.call('closeWindow');
                        } else if (ua.indexOf("alipay") != -1) {
                            AlipayJSBridge.call('closeWebview');
                        }
                    } catch (error) { }
                }
            }, false);
        },
        //初始化返回事件
        initBack: function () {
            window.addEventListener('pageshow', function () {
                listenerBackHandler.param.isRun = false;
                setTimeout(function () { listenerBackHandler.param.isRun = true; }, 1000); //延迟1秒 防止微信返回立即执行popstate事件
                listenerBackHandler.listenerBack();
            });
        }
    }
    listenerBackHandler.initBack();