$(function () {
    var mmb = new Mmb();
    mmb.render();
    mmb.jumpPage();
    mmb.backToTop();
    mmb.mSroll();
    mmb.bannerClose();
})
var Mmb = function () {

}

Mmb.prototype = {
    render: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getinlanddiscount',
            success: function (result) {
                console.log(result);
                var html = template('productTpl', result);
                $('#main').html(html);
            }
        })
    },
    jumpPage: function () {
        $('#main').on('tap', 'div', function () {
            var productId = $(this).data('id');
            location = 'productInfo.html?productId=' + productId;
        })
    },
    backToTop: function () {
        var that = this;
        $(window).scroll(function () {
            // console.log($(this).scrollTop());
            if ($(this).scrollTop() > 250) {
                $('.backtop').show();
            } else {
                $('.backtop').hide();
            }

        })
        // console.log($('#main').scrollTop());


    },
    mSroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    bannerClose: function () {
        $('.close').on('tap', function () {
            $('.banner').hide();
        })
    }
}
$('.backtop').on('tap', function () {
    goTop();
})

function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}