<?php
  include('./conn.php');
  include('./methods.php');
  $id = $_POST['id'] ?? null;
  $wordCn = $_POST['cn'] ?? null;
  $wordEn = $_POST['en'] ?? null;
  if ($id) {
    $empty = isEmpty('word', "`id` = $id");
    if ($empty) {
      // 如果单词被改了后重新获取单词数据并替换
      if ($empty[0]['word_en'] !== $wordEn) {
        $newWord = transilation($wordEn);
        $wordContent = $newWord['content'];
        if ($newWord['status'] / 1 === 0) {
          $newCn = json_encode($wordContent['word_mean'], JSON_UNESCAPED_UNICODE);
          $ph_en = str_replace("'", '\\\'', $wordContent['ph_en']);
          $ph_am = str_replace("'", '\\\'', $wordContent['ph_am']);
          $new_sql = "UPDATE `word` SET `word_en` = '$wordEn', `ph_en` = '".$ph_en."', `ph_am` = '".$ph_am."', `word_json` = '".$newCn."' WHERE `id` = '$id'";
          if ($conn -> exec($new_sql)) {
            $new_word = isEmpty('word', "`id` = $id");
            if ($new_word) {
              returnMsg(4000, $new_word, 'change success');
            }
          }
        }
        exit;
      }
      // 判断是否修改了中文释义
      if ($empty[0]['word_json'] !== $wordCn) {
        $json_data = json_encode($wordCn, JSON_UNESCAPED_UNICODE);
        $update = "UPDATE `word` SET `word_json` = '$json_data' WHERE `id` = $id";
        if ($conn -> exec($update)) {
          returnMsg(4000, '', 'change success');
        }
      }
    } else {
      returnMsg(4002, '', 'parameter error');
    }
  } else {
    returnMsg(4001, '', 'parameter is empty');
  }