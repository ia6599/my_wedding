<?php
$name = $_POST['name'];
$tell = $_POST['tell'];
$date = $_POST['date'];
$carNum = $_POST['carNum'];
$arrive = $_POST['arrive'];
$greeting = $_POST['greeting'];
$isUpdate = false;


$link = mysqli_connect('bdm771769627.my3w.com', 'bdm771769627', 'czc245680.', 'bdm771769627_db');
mysqli_set_charset($link, 'utf8');
$selectSql = "select * from name_list";
$selectQry = mysqli_query($link, $selectSql);
$selectRows = mysqli_fetch_all($selectQry, MYSQLI_ASSOC);
for ($i = 0; $i <count($selectRows); $i++) {
    if ($selectRows[$i]['name'] == $name && $selectRows[$i]['tell'] == $tell) {
        $isUpdate = true;
    break;
    }
}
if ($isUpdate) {
    $updateSql = "update name_list set date='$date', car='$carNum',arrive='$arrive' where name='$name' and tell='$tell'";
    $updateQry = mysqli_query($link,$updateSql);
    var_dump($updateQry);
} else {
    $sql = "insert into name_list (name,tell,date,car,arrive) values ('$name','$tell','$date','$carNum','$arrive')";
    $qry = mysqli_query($link,$sql);
}
if ($greeting) {
    $sql_1 = "insert into greeting_list (name,greeting) values ('$name','$greeting')";
    $qry_1 = mysqli_query($link,$sql_1);
} else {
    $qry_1 = true;
}

if ($qry && $qry_1) {
    $json = json_encode(array(
        "status"=>200,
        "message"=>"添加成功！"
    ),JSON_UNESCAPED_UNICODE);
} else {
    $json = json_encode(array(
        "status"=>-1,
        "message"=>"添加失败！"
    ),JSON_UNESCAPED_UNICODE);
}
echo $json;
mysqli_close($link);