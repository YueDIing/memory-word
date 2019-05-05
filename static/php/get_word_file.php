<?php
  include('./conn.php');
  include('./methods.php');

  $file = $_FILES['file'] ?? null;
  $c_id = $_POST['classify_id'] ?? null;
  if ($file && $c_id) {
    $temp = $file['tmp_name'];
    $file_content = file_get_contents($temp);
    $content = explode("\n", $file_content);

    $query = "SELECT `word_en` FROM `word`";
    $res = $conn -> query($query) -> fetchAll(PDO::FETCH_ASSOC);

    // 将获取到的数据从二维数据变成一维
    foreach ($res as $k => $v) {
      $res[$k] = $v['word_en'];
    }
    $index = 0;
    $sql = "INSERT INTO `word` (`type_id`, `word_en`, `ph_en`, `ph_am`, `ph_en_mp3`, `ph_am_mp3`, `ph_tts_mp3`, `word_json`, `time`) VALUES ";
    foreach ($content as $value) {
      // 去掉首尾空格, 解决了两个问题, 1. 单词的前后空格问题 2. 回车符被渲染成了空格, 分割后的字符串最后的回车符并没有被清除, \n无法匹配
      $val = trim($value);
      // 判断单词是否重复
      if (in_array($val, $res)) {
       continue;
      }
      $index++;
      $jsonData = curl("http://fy.iciba.com/ajax.php?a=fy&f=auto&t=auto&w=$val"); // 接口
      $data = iconv("gb2312", "utf-8", $jsonData);
      $newData = json_decode($data, true);
      if ($newData && is_array($newData) && !$newData['status']) {
        $ph_en = str_replace("'", '\\\'', $newData['content']['ph_en']);
        $ph_am = str_replace("'", '\\\'', $newData['content']['ph_am']);
        $ph_en_mp3 = $newData['content']['ph_en_mp3'];
        $ph_am_mp3 = $newData['content']['ph_am_mp3'];
        $ph_tts_mp3 = $newData['content']['ph_tts_mp3'];
        $word_mean = json_encode($newData['content']['word_mean'], JSON_UNESCAPED_UNICODE);
        $time = date('Y-m-d');
        $sql .= "('$c_id', '$value', '$ph_en', '$ph_am', '$ph_en_mp3', '$ph_am_mp3', '$ph_tts_mp3', '$word_mean', '$time'), ";
      }

      // 每20个插入一次
      if ($index % 20 === 0) {
        $new_sql = substr($sql,0, -2);
        if ($conn -> exec($new_sql)) {
          $sql = "INSERT INTO `word` (`type_id`, `word_en`, `ph_en`, `ph_am`, `ph_en_mp3`, `ph_am_mp3`, `ph_tts_mp3`, `word_json`, `time`) VALUES ";
        }
      }
    }
    $new_sql = substr($sql,0, -2);
    if ($conn -> exec($new_sql)) {
      returnMsg('4000', '', 'success');
    }
  } else {
    returnMsg(4001, '', 'parameter empty');
  }