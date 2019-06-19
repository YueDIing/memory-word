<?php
  include('./conn.php');
  include('./methods.php');

  $file = isset($_FILES['file']) ? $_FILES['file'] : null;
  $c_id = isset($_POST['classify_id']) ? $_POST['classify_id'] : null;

  function spliceStr ($sql, $switch = false) {
    global $conn;
    $sql = substr($sql, 0, -2);
    if ($conn -> exec($sql) && $switch) {
      returnMsg(4000);
    }
  }

  if ($file && $c_id) {
    $temp = $file['tmp_name'];
    $file_content = file_get_contents($temp);
    if (isset($file_content)){
      $originWord = $conn -> query("SELECT `word` FROM `word`") -> fetchAll(PDO::FETCH_ASSOC);
      foreach ($originWord as $k => $v) {
        $originWord[$k] = $v['word'];
      }
      $originWord = ($originWord) ? $originWord : [];
      $time = date("Y-m-d");
      $num = 0;
      $sql = "INSERT INTO `word` (id, `uid`, `type_id`, `word`, `ph_am`, `ph_en`, `explanation`, `time`) VALUES";
      $word = json_decode($file_content, true);
      foreach ($word as $k => $v) {
        $k = trim($k);
        // 判断数据是否正确
        if ($v['ph_am'] && $v['ph_en'] && $v['parts'] && !in_array($k, $originWord)) {
          $num++;
          $ph_am = str_replace("ˈ", '\\\'', $v['ph_am']);
          $ph_en = str_replace("ˈ", '\\\'', $v['ph_en']);
          // $explanation = json_encode($v['parts'], JSON_UNESCAPED_UNICODE);
          $explanation = str_replace('"', '\"', json_encode($v['parts'], JSON_UNESCAPED_UNICODE));
          $sql .= "(null, '1', '$c_id', '$k', '$ph_am', '$ph_en', \"$explanation\", '$time'), ";
          // 每20次添加一次, 放置sql过长导致无效
          if ($num % 20 === 0) {
            spliceStr($sql);
            $sql = "INSERT INTO `word` (id, `uid`, `type_id`, `word`, `ph_am`, `ph_en`, `explanation`, `time`) VALUES";
            continue;
          }
        } else {
          continue;
        }
      }
      spliceStr($sql, true);
    } else {
      returnMsg(4002);
    }
  } else {
    returnMsg(4001);
  }