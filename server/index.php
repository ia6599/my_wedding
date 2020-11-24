<?php
$link = mysqli_connect('bdm771769627.my3w.com', 'bdm771769627', 'czc245680.', 'bdm771769627_db');
// var_dump($link);
mysqli_set_charset($link, 'utf8');
// 添加
// $sql = "insert into name_list (name,tell) values ('崔志聪','15130312093')";
// $qry = mysqli_query($link,$sql);
// var_dump($qry);
// if ($qry) {
//     echo "insert success";
// } else {
//     echo "insert failure";
//     echo mysqli_error($link);
// }
// 修改
// $sql = "update name_list set name='佟鑫' where id='1'";
// $qry = mysqli_query($link, $sql);
// var_dump($qry);
// if ($qry) {
//     echo "update success";
// } else {
//     echo "update failure";
//     echo mysqli_error($link);
// }
// 删除
// $sql = "delete from name_list where id='10'";
// $qry = mysqli_query($link, $sql);
// var_dump($qry);
// if ($qry) {
//     echo "delete success";
//     echo "受影响记录条数：".mysqli_affected_rows($link);
// } else {
//     echo "delete failure";
//     echo mysqli_error($link);
// }
// 查询
// $sql = "select * from name_list";
// $qry = mysqli_query($link, $sql);
// // var_dump($qry);
// $rows = mysqli_fetch_all($qry, MYSQLI_ASSOC);
// // echo "<pre>";
// // print_r($rows);
// // var_dump($rows);
// // echo "</pre>";
// echo json_encode($rows,JSON_UNESCAPED_UNICODE);
// mysqli_close($link);


// public function index(){
    $appId = 'wxffe2aea3bf4c4fc7';
    $appSecret = '838b93b03569b9fad0b78cefeda48a4f';//虚拟的，不要用
    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appId."&secret=".$appSecret;
    $ch = curl_init();//初始化curl
    curl_setopt($ch, CURLOPT_URL,$url); //要访问的地址 
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);//跳过证书验证
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // 从证书中检查SSL加密算法是否存在
    $data = json_decode(curl_exec($ch));
    if(curl_errno($ch)){
      var_dump(curl_error($ch)); //若错误打印错误信息 
    }
    var_dump($data); //打印信息
    
    curl_close($ch);//关闭curl
//   }