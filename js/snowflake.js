// $(function() {
var snowflakeURl = [
    "./image/icon_petal_1.png",
    "./image/icon_petal_2.png",
    "./image/icon_petal_3.png",
    "./image/icon_petal_4.png",
    "./image/icon_petal_5.png",
    "./image/icon_petal_6.png",
    "./image/icon_petal_7.png",
    "./image/icon_petal_8.png",
];
var container = $("#content");
visualWidth = container.width();
visualHeight = container.height();
//获取content的宽高
function snowflake() {
    // 雪花容器
    var $flakeContainer = $("#snowflake");

    // 随机六张图
    function getImagesName() {
        return snowflakeURl[[Math.floor(Math.random() * 8)]];
    }
    // 创建一个雪花元素
    function createSnowBox() {
        var url = getImagesName();
        return $('<div class="snowbox" />')
            .css({
                width: 25,
                height: 26,
                position: "absolute",
                backgroundRepeat: "no-repeat",
                zIndex: 100000,
                top: "-41px",
                backgroundImage: "url(" + url + ")",
            })
            .addClass("snowRoll");
    }
    // 开始飘花
    setInterval(function() {
        // 运动的轨迹
        var startPositionLeft = Math.random() * visualWidth - 100,
            startOpacity = 1,
            endPositionTop = visualHeight - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration = visualHeight * 10 + Math.random() * 5000;
        // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;
        // 创建一个雪花
        var $flake = createSnowBox();
        // 设计起点位置
        $flake.css({
            left: startPositionLeft,
            opacity: randomStart,
        });
        // 加入到容器
        $flakeContainer.append($flake);
        // 开始执行动画
        $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7,
            },
            duration,
            "ease-out",
            function() {
                $(this).remove(); //结束后删除
            }
        );
    }, 500);
}

// });