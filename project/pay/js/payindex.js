Vue.filter("keepTwoNum", function (value) {
    value = value == undefined ? "0" : value;
    return Number(value).toFixed(2);
});
var app = new Vue({
    el: "#main-content",
    data: {
    	shopname:'喜洋洋便利店',//商家店铺名称
    	shopheadsrc:'../img/tupian.png',//商家店铺头像
        userAmount:12,//用户可用抵扣金
        dedmenoy:1.2,//返利抵扣
        allpay:10.8,//实际支付
        payMenoy:null,//支付金额
    },
    methods: {
        goPay:function(){
            if(app.payMenoy){
                //支付请求
            }
        }
    },
    watch: {
        'payMenoy': {
            handler: function () {
                var payPrice =0;
                if(app.payMenoy){
                    payPrice = parseFloat(app.payMenoy);
                }
                app.dedmenoy = 0;
                if (app.userAmount >= payPrice) {
                    app.dedmenoy = payPrice;
                } else {
                    app.dedmenoy = app.userAmount;
                }
                app.allpay =common.toDecimal(payPrice-app.dedmenoy);
            }
        }
    }
});
$('.key_btn').on('touchstart', function () {
    var _key = $(this).attr('data-num');
    var _oval = $('.payinfo-inp').val() == '' ? "" : $('.payinfo-inp').val();
    var _val = _oval.toString();
    console.log(_val);
    var newval = '';
    switch (_key) {
        case 'del':
            newval = _val.substring(0, _val.length - 1);
            $('.payinfo-inp').val(newval);
            break;
        case '.':
            if (_oval <= 0) {
                $('.payinfo-inp').val('0.');
            } else {
                $('.payinfo-inp').val(_val + '.');
            }
            break;
        default:
            if($('.payinfo-inp').val().indexOf('.')<0){
                if ($('.payinfo-inp').val().length > 4) {
                    $('.payinfo-inp').val().substring(0, 5);
                    return false;
                }
            }
            $('.payinfo-inp').val(_val + _key);
            break;
    }
    $('.payinfo-inp').val($('.payinfo-inp').val().toString().replace(/^0+[\d]/,"")); //清除连续‘00’
    $('.payinfo-inp').val($('.payinfo-inp').val().toString().replace(/[^\d.]/g, ""));  //清除“数字”和“.”以外的字符
    $('.payinfo-inp').val($('.payinfo-inp').val().toString().replace(/\.{2,}/g, ".")); //只保留第一个. 清除多余的
    $('.payinfo-inp').val($('.payinfo-inp').val().toString().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
    $('.payinfo-inp').val($('.payinfo-inp').val().toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));//只能输入两个小数
    $(".payPrice").html($('.payinfo-inp').val());
    $('.bink-line').show();
    var _vals = $('.payinfo-inp').val() == '' ? 0 : $('.payinfo-inp').val();
    app.payMenoy =parseFloat(_vals);
})