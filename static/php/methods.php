<?php
  include('./conn.php');
  function getAllWord () {
    global $conn;
    $res = $conn -> query("SELECT * FROM `word` ORDER BY `time` DESC") -> fetchAll(PDO::FETCH_ASSOC);
    if ($res) {
      return $res;
    } else {
      returnMsg(4001, '', 'data error');
    }
  }

  function returnMsg ($code = 400, $data = [],$msg = '') {
    // header("Content-type: application/json");
    echo json_encode([
      'code' => $code,
      'data' => $data,
      'message' => $msg
    ], JSON_UNESCAPED_UNICODE);
  }

  function curl($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5000);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'));
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $contents = curl_exec($ch);
    curl_close($ch); //关闭打开的会话
    return $contents;
  }

  function transilation ($content = '') {
    $fy = curl("http://fy.iciba.com/ajax.php?a=fy&f=auto&t=auto&w=$content");
    return json_decode($fy, true);
  }

  function isEmpty ($table = '', $condition = '') {
    global $conn;
    $sql = "SELECT * FROM $table WHERE $condition";
    $res = $conn -> query($sql);
    return $res -> fetchAll(PDO::FETCH_ASSOC);
  }