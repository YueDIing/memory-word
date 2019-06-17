<?php
  include('./conn.php');
  include('./methods.php');

  $tid = $_GET['tid'] ?? null;

  if ($tid) {
    $current = isEmpty("`test`", "`id` = '$tid'");
    $current[0]['time'] = date('Y-m-d', $current[0]['time']);
    if (isset($current)) {
      // returnMsg(4000, $current, 'success');
      $wordData = json_decode($current[0]['json_data'], true);
      $wordLen = count($wordData);

      $strId = '';

      for ($i = 0; $i < $wordLen; $i++) {
        $strId .= $wordData[$i][0] . ",";
      }

      $newId = substr($strId, 0, -1);

      $words = isEmpty("`word`", "`id` in (" . $newId . ")");
      if ($current[0]['status']) {
        // 出卷
        $current[0]['test'] = $words;
      } else {
        // 打印
        $newWords = [];      
        for ($i = 0; $i < $wordLen; $i++) {
          // 0 中文 1 英文
          if ($wordData[$i][1]) {
            $cn = json_decode($words[$i]['explanation'], true)[0];
            $newWords[] = $cn;
          } else {
//            echo $i . '/--/';
            $newWords[] = (isset($words[$i]['word'])) ? trim($words[$i]['word']) : '';
          }
          $current[0]['test'] = $newWords;
        }
      }
      returnMsg(4000, $current[0], 'success');
    }
  } else {
    returnMsg(4001, '', 'parameter is empty');
  }