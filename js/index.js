$(function() {
    var html = document.documentElement;

    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + "px";
    }

    window.addEventListener("resize", onWindowResize);
    // 计算HTML的fontsize大小
    onWindowResize();
    initCallList();

    function initCallList() {
        var call_list = [
            "同学",
            "叔叔",
            "阿姨",
            "小哥哥",
            "小姐姐",
            "大兄dei",
            "领导",
            "亲朋好友",
        ];
        var font_size = [60, 60, 60, 60, 30, 30, 60, 60];
        var top = [100, 168, 242, 305, 100, 236, 435, 368];
        var left = [70, 150, 200, 80, 200, 61, 200, 24];
        var html = "";
        for (var i = 0; i < call_list.length; i++) {
            var random = Math.floor(Math.random() * 4);
            var fontSize = font_size[i];
            html +=
                '<div class="page1-call page1-call' +
                (i + 1) +
                '" style="font-size:' +
                fontSize +
                "px;top:" +
                top[i] +
                "px;left:" +
                left[i] +
                'px">' +
                call_list[i] +
                "</div>";
            // $('.page1.active .page1-call').css('animation', '1s page1-call 2.' + i + 's linear forwards')
        }
        $(".page1-darling").after(html);
    }
    //初始化花雨
    // snowflake();
    // 初始化fullpage
    // $(document).ready(function() {
    //     $("#fullpage").fullpage();
    // });
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
    // 点击接听电话
    $(".cid-accept").click(function() {
        console.log(123);
        $(".cid").css("display", "none");
        //初始化花雨
        snowflake();
        // 初始化fullpage
        $(document).ready(function() {
            $("#fullpage").fullpage();
        });
        $(".music-icon").click();
    });
    // 初始化静态地图
    var addressParentP = $(".page20-content").css("padding");
    var addressParentW =
        $(".page20-content").width() - parseInt(addressParentP) * 2;
    console.log($(".page20-content").css("padding"));
    var size = parseInt(addressParentW) + "*" + parseInt(addressParentW / 1.88);
    $(".page20-address-img").attr(
        "src",
        "https://restapi.amap.com/v3/staticmap?key=2e950b35bf2e5541092e720483c65eab&location=115.568191%2C39.116678&zoom=13&size=" +
        size +
        "&markers=mid%2C%2CA%3A115.568191%2C39.116678"
    );
    $(".page20-address-img").css("width", addressParentW);
    // 点击静态地图跳转详情地图
    $(".page20-address-img").click(function() {
        location.href =
            "https://uri.amap.com/marker?position=115.568191,39.116678&name=婚礼现场&src=mypage&coordinate=gaode&callnative=1";
    });
    // 点击提交事件
    $('.page5-submit').click(function() {
        var name = $('#name').val()
        var tell = $('#tell').val()
        var date = $('#date').val()
        var carNum = $('#carNum').val()
        var arrive = $('#arrive').val()
        var greeting = $('#greeting').val()
        console.log(name,
            tell,
            date,
            carNum,
            arrive,
            greeting);
    })
});