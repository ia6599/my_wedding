$(function() {
    var html = document.documentElement;

    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + "px";
    }

    window.addEventListener("resize", onWindowResize);
    // 计算HTML的fontsize大小
    onWindowResize();
    initCallList();
    if (!isMobile()) {
        $('.alert-content').html('<p>移动端浏览效果更佳</p><img style="width:150px;height:150px;margin-top:20px" src="/my_wedding/image/qrCode_wedding.png" alt="">')
        $(".custom-alert").show();
    }

    function isMobile() {
        var userAgentInfo = navigator.userAgent;
        var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var mobile_flag = false;
        //根据userAgent判断是否是手机
        for (var v = 0; v < mobileAgents.length; v++) {
            if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
                mobile_flag = true;
                break;
            }
        }
        var screen_width = window.screen.width;
        var screen_height = window.screen.height;
        //根据屏幕分辨率判断是否是手机
        if (screen_width < 500 && screen_height < 800) {
            mobile_flag = true;
        }
        return mobile_flag;
    }

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
                (fontSize / 18.75) +
                "rem;top:" +
                (top[i] / 18.75) +
                "rem;left:" +
                (left[i] / 18.75) +
                'rem">' +
                call_list[i] +
                "</div>";
        }
        $(".page1-darling").after(html);
    }

    function getGreetingList() {
        $.ajax({
            type: "GET",
            url: "/my_wedding/server/selectGreetingList.php",
            data: {
                name: name,
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success(res) {
                if (res.status == 200) {
                    var data = res.data;
                    var greetingList = [];
                    for (var i = 0; i < data.length; i++) {
                        greetingList.push(data[i].name + "：" + data[i].greeting);
                    }
                    setTimeout(function() {
                        barrage(greetingList);
                    }, 15000);
                }
            },
        });
    }

    function barrage(barrageData) {
        var pageH = parseInt($("#content").height());
        var pageW = parseInt($("#content").width());
        var colorArr = [
            "#cfaf12",
            "#12af01",
            "#981234",
            "#adefsa",
            "#db6be4",
            "#f5264c",
            "#d34a74",
        ];
        for (var i = 0; i < barrageData.length; i++) {
            auto(barrageData[i], i);
        }

        function auto(str, id) {
            $("#content").append(
                "<p class='barrage barrage" + id + "'>" + str + "</p>"
            );
            var _top = parseInt(pageH * Math.random());
            var _left = parseInt(Math.random() * 50);
            var num = parseInt(colorArr.length * Math.random());
            var timer;
            $(".barrage" + id).css({
                top: _top,
                left: pageW + 100 + _left,
                color: colorArr[num],
                "font-size": "20px",
            });
            timer = ($(".barrage" + id).width() / 140) * 10000;
            $(".barrage" + id).animate({
                    left: -($(".barrage" + id).width() + 500) + "px",
                },
                timer,
                function() {
                    $(this).remove();
                }
            );
        }
    }
    // 音乐播放按钮事件
    $(".music-icon").click(function() {
        if ($(this).hasClass("play")) {
            $(".musicCon")[0].pause();
            $(this).removeClass("play");
        } else {
            $(".musicCon")[0].play();
            $(this).addClass("play");
        }
    });
    // 点击接听电话
    $(".cid-accept").click(function() {
        // 隐藏来电页
        $(".cid").css("display", "none");
        //初始化花雨
        snowflake();
        // 初始化fullpage
        $(document).ready(function() {
            $("#fullpage").fullpage();
        });
        $(".music-icon").click();
        getGreetingList();
    });
    // 初始化静态地图
    var addressParentP = $(".page4-content").css("padding");
    var addressParentW =
        $(".page4-content").width() - parseInt(addressParentP) * 2;
    console.log($(".page4-content").css("padding"));
    var size = parseInt(addressParentW) + "*" + parseInt(addressParentW / 1.88);
    $(".page4-address-img").attr(
        "src",
        "https://restapi.amap.com/v3/staticmap?key=2e950b35bf2e5541092e720483c65eab&location=115.568191%2C39.116678&zoom=13&size=" +
        size +
        "&markers=mid%2C%2CA%3A115.568191%2C39.116678"
    );
    $(".page4-address-img").css("width", addressParentW);
    // 点击静态地图跳转详情地图
    $(".page4-address-img").click(function() {
        location.href =
            "https://uri.amap.com/marker?position=115.568191,39.116678&name=婚礼现场&src=mypage&coordinate=gaode&callnative=1";
    });
    // 点击提交事件
    $(".page5-submit").click(function() {
        var name = $("#name").val();
        var tell = $("#tell").val();
        var date = $("#date").val();
        var carNum = $("#carNum").val();
        var arrive = $("#arrive").val();
        var greeting = $("#greeting").val();
        var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (name == "") {
            showCustomAlert("姓名不能为空");
            return;
        }
        if (tell == "") {
            showCustomAlert("电话不能为空");
            return;
        }
        if (!telStr.test(tell)) {
            showCustomAlert("请填写正确的手机号");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/my_wedding/server/addNameList.php",
            data: {
                name,
                tell,
                date,
                carNum,
                arrive,
                greeting,
            },
            success(res) {
                res = JSON.parse(res);
                if (res.status == 200) {
                    if (greeting) {
                        barrage([name + "：" + greeting]);
                    }
                    showCustomAlert("提交成功！");
                    $("#name").val("");
                    $("#tell").val("");
                    $("#date").val("");
                    $("#carNum").val("");
                    $("#arrive").val("");
                    $("#greeting").val("");
                }
            },
        });
    });
    var date = new Date()
    new Mdate("date", {
        acceptId: "dateSelectorTwo",
        beginYear: date.getFullYear(),
        beginMonth: date.getMonth() + 1,
        beginDay: date.getDate(),
        endYear: "2020",
        endMonth: "12",
        endDay: "30",
        format: "-",
    });
    // 显示提示框
    function showCustomAlert(tips) {
        $(".custom-alert").show();
        $(".alert-content").text(tips);
    }
    // 隐藏提示框
    $(".alert-btn").click(function() {
        $(".custom-alert").hide();
    });
});