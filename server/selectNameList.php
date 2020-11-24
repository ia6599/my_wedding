<?php
$action = $_GET['name'];
$link = mysqli_connect('bdm771769627.my3w.com', 'bdm771769627', 'czc245680.', 'bdm771769627_db');
mysqli_set_charset($link, 'utf8');
$sql = "select * from name_list where name like '%$action%' ORDER BY id desc";
$qry = mysqli_query($link, $sql);
$rows = mysqli_fetch_all($qry, MYSQLI_ASSOC);
$json = json_encode(array(
    "status"=>200,
    "message"=>"查询成功！",
    "data"=>$rows
),JSON_UNESCAPED_UNICODE);
echo $json;
mysqli_close($link);