var common = {
   
    toDecimal: function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    },
    tosat: function (msg) {
        //提示弹窗
        $('body').append('<div class="toast_Mask"><p>' + msg + '</p></div>');
        setTimeout(function () {
            $('.toast_Mask').remove();
        }, 2000);
    },
    ShowLoading: function (_text) {
        //添加loading
        //_text为4个字
        /*
        if(typeof _text!='' && _text!='undefined' && _text!=undefined){
	        loading = '<div class="ball-load"><p>'+_text+'</p><div class="ball-pulse"><div></div><div></div><div></div></div></div>';
	    }else{
	        loading = '<div class="ball-load"><p>正在加载</p><div class="ball-pulse"><div></div><div></div><div></div></div></div>';
	    }
        */
        var webwinbg = "<div class='webwinbg'></div>";
        var loading = '';
        loading = '<div class="ball-load"><div class="ball-pulse"><div></div><div></div><div></div></div></div>';
        $('body').append(webwinbg);
        $('body').append(loading);
    },
    ShowLoading_white: function (_text) {
        //添加透明loading

        var webwinbg = "<div class='webwinbg white'></div>";
        var loading = '';
        loading = '<div class="ball-load white"><div class="ball-pulse"><div></div><div></div><div></div></div></div>';
        $('body').append(webwinbg);
        $('body').append(loading);
    },
    HideLoading: function () {
        //移除loading
        $('.webwinbg').remove();
        $('.ball-load').remove();
    },
    ShowTips: function (showtit, showmsg) {
        var tips = '<div class="tipsMask flex f_center showtips_con"><div class="tips_min"><h5>' + showtit + '</h5><ul><li>' + showmsg + '</li></ul><span class="close_btn close_showtips">知道了</span>';
        $('body').append(tips);
        $('.close_showtips').on('click', function () {
            $('.showtips_con').remove();
        })
    },
    GetWinWidth: function () {
        //获取窗口宽度
        return $(window).width();
    },
    GetWinHeight: function () {
        //获取窗口高度
        return $(window).height();
    },
    AddPop: function (tips, content, btn, poptype, callback) {
        /*[tips][空值]显示提示否则为标题；
			 *[content]显示内容(文字不能超过12字)；
			 *[btn][1]确定按钮[2]取消和确定按钮
			 *[poptype]展示类型，[1]显示一行内容[2]显示多行内容*/
        var pop = "<div class='popupbox'><p class='popuptit'>" + (tips == "" || tips == null ? "提示" : tips) + "</p>";
        if (poptype == 1) {
            pop += "<p class='popupmsg'>" + (content == "" || content == null ? "啊偶，没有内容！" : content) + "</p>";
        } else {
            pop += "<div class='popmore'><p class='popuptips'>" + (content == "" || content == null ? "啊偶，没有内容！" : content) + "</p></div>";
        }
        pop += "<div class='popup_btnbox'>";
        switch (parseInt(btn)) {
            case 1:
                pop += "<a href='javascript:;' class='popup_ok'>确定</a>";
                break;
            case 2:
                pop += "<a href='javascript:;' class='popup_cancle lt-xs-5'>取消</a>";
                pop += "<a href='javascript:;' class='popup_ok border-l lt-xs-5'>确定</a>";
                break;
            default:
                pop += "<a href='javascript:;' class='popup_cancle'>取消</a>";
                break;
        }
        pop += "</div>";
        $("body").append("<div class='popupbg'></div>")
        $("body").append(pop);
        //var boxw = (common.GetWinWidth() - $(".popupbox").width()) / 2;
        //var boxh = (common.GetWinHeight() - $(".popupbox").height()) / 2;
        //common.SetBoxPos("popupbox", boxw, boxh);
        $(".popup_cancle").on("click", function () {
            common.RemoveWeb("popupbox");
            common.RemoveWeb("popupbg");
        })
        $(".popup_ok").on("click", function () {
            common.RemoveWeb("popupbox");
            common.RemoveWeb("popupbg");
            if (callback) {
                callback(true);
            }
        })
        return
    },
}

