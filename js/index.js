$(function() {
    wx.config({
        debug: false,
        appId: "wxffe2aea3bf4c4fc7",
        timestamp: '',
        nonceStr: '',
        signature: '',
        jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"],
    });
    wx.ready(function() {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title: "123", // 分享标题
            desc: "", // 分享描述
            link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "", // 分享图标
            success: function() {
                // 设置成功
            },
        });
    });
    // $.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxffe2aea3bf4c4fc7&secret=838b93b03569b9fad0b78cefeda48a4f', function(data, status) {
    //         console.log(data);
    //         console.log(status);
    //     })
    // $.ajax({
    //     url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxffe2aea3bf4c4fc7&secret=838b93b03569b9fad0b78cefeda48a4f',
    //     type: 'GET',
    //     dataType: 'jsonp',
    //     success(res) {
    //         console.log(res);
    //     },
    //     fail(err) {
    //         console.log(err);
    //     }
    // })
});