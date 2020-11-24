<?php
//curl获取请求文本内容
function get_curl_contents($url, $method ='GET', $data = array()) {
    if ($method == 'POST') {
      //使用crul模拟
      $ch = curl_init();
      //禁用https
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
      //允许请求以文件流的形式返回
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
      curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
      curl_setopt($ch, CURLOPT_DNS_CACHE_TIMEOUT, 30);
      curl_setopt($ch, CURLOPT_URL, $url);
      $result = curl_exec($ch); //执行发送
      curl_close($ch);
    }else {
      if (ini_get('allow_fopen_url') == '1') {
        $result = file_get_contents($url);
      }else {
        //使用crul模拟
        $ch = curl_init();
        //允许请求以文件流的形式返回
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        //禁用https
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result = curl_exec($ch); //执行发送
        curl_close($ch);
      }
    }
    return $result;
  }
  //获取微信公从号access_token
  function wx_get_token() {
    $AppID = 'wxffe2aea3bf4c4fc7';//AppID(应用ID)
    $AppSecret = '838b93b03569b9fad0b78cefeda48a4f';//AppSecret(应用密钥)
    $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$AppID.'&secret='.$AppSecret;
    $res = get_curl_contents($url);
    $res = json_decode($res, true);
    //这里应该把access_token缓存起来，至于要怎么缓存就看各位了，有效期是7200s
    return $res['access_token'];
  }
  //获取微信公从号ticket
  function wx_get_jsapi_ticket() {
    $url = sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi", wx_get_token());
    $res = get_curl_contents($url);
    $res = json_decode($res, true);
    return $res['ticket'];
  }
  $wx = array();
  //生成签名的时间戳
  $wx['timestamp'] = time();
  //生成签名的随机串
  $wx['noncestr'] = uniqid();
  //jsapi_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取。
  $wx['jsapi_ticket'] = wx_get_jsapi_ticket();
  //分享的地址，注意：这里是指当前网页的URL，不包含#及其后面部分，曾经的我就在这里被坑了，所以小伙伴们要小心了
  $wx['url'] = $_GET['url'];
  $string = sprintf("jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s", $wx['jsapi_ticket'], $wx['noncestr'], $wx['timestamp'], $wx['url']);
   
  //生成签名
  $wx['signature'] = sha1($string);
  echo json_encode($wx);die;
  /*
  注意事项
  签名用的noncestr和timestamp必须与wx.config中的nonceStr和timestamp相同。
  签名用的url必须是调用JS接口页面的完整URL。
  出于安全考虑，开发者必须在服务器端实现签名的逻辑。
  */