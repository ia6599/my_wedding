$(function() {
    var html = document.documentElement;

    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + "px";
    }

    window.addEventListener("resize", onWindowResize);
    // 计算HTML的fontsize大小
    onWindowResize();
    // 初始化fullpage
    $(document).ready(function() {
        $("#fullpage").fullpage();
    });
    // 音乐播放按钮事件
    $(".music-icon").click(function() {
        if ($(this).hasClass("play")) {
            $(".musicCon")[0].play();
            $(this).removeClass("play");
        } else {
            $(".musicCon")[0].pause();
            $(this).addClass("play");
        }
    });
    // 初始化静态地图
    var addressParentP = $(".page20-content").css('padding')
    var addressParentW = $(".page20-content").width() - parseInt(addressParentP) * 2;
    console.log($(".page20-content").css('padding'));
    var size = parseInt(addressParentW) + "*" + parseInt(addressParentW / 1.88);
    $(".page20-address-img").attr(
        "src",
        "https://restapi.amap.com/v3/staticmap?key=2e950b35bf2e5541092e720483c65eab&location=115.568191%2C39.116678&zoom=13&size=" +
        size +
        "&markers=mid%2C%2CA%3A115.568191%2C39.116678"
    );
    $(".page20-address-img").css('width', addressParentW);
    // 点击静态地图跳转详情地图
    $(".page20-address-img").click(function() {
        location.href =
            "https://uri.amap.com/marker?position=115.568191,39.116678&name=婚礼现场&src=mypage&coordinate=gaode&callnative=1";
    });
});