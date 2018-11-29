$(function () {
    var mmb = new Mmb();
    mmb.render();
})

var Mmb = function () {

}

Mmb.prototype = {
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
    },
    render: function () {
        var id = this.GetQueryString('productId');
        $.ajax({
            url: 'http://localhost:9090/api/getdiscountproduct',
            data: {
                productid: id
            },
            success: function (result) {
                console.log(result);
                var html = template('productInfoTpl', result);
                $('.top').html(html);
            }
        })
    },
}