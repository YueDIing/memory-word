<?php
  include('./conn.php');
  include('./methods.php');

  $cid = $_POST['class_id'] ?? null;
  $number = $_POST['number'] ?? null;
  $time = time();
  if ($cid && $number) {
    $_empty = isEmpty("`test_type`", "`id` = $cid");
    if (count($_empty) !== 0) {
      $getClasifyCount = $conn -> query("SELECT count(*) AS `num` FROM `test` WHERE `id` = $cid") -> fetchAll(PDO::FETCH_ASSOC);
      $word_sql = ($cid / 1 === 1) ? "SELECT `id`, `word_en`, `word_json` FROM `word`" : "SELECT `id`, `word_en`, `word_json` FROM `word` WHERE `type_id` = '$cid'";
      $word_len_sql = ($cid / 1 === 1) ? "SELECT COUNT(*) AS `num` FROM `word`" : "SELECT COUNT(*) AS `num` FROM `word` WHERE `type_id` = '$cid'";
      $allWord = $conn -> query($word_sql) -> fetchAll();
      $allWordLen = $conn -> query($word_len_sql) -> fetch(PDO::FETCH_ASSOC);
      if ($allWordLen['num'] / 1 === 0) {
        returnMsg(4004, '', 'data empty');
        exit;
      }

      // 判断单词数量是否大于数据库中的数量

      $ranArr = []; // 随机数
      $randWord = []; // 随机数转后的单词

      // 创建随机数
      function randNumber () {
        global $ranArr, $allWordLen;
        $rand = rand(0, $allWordLen['num'] - 1);
        if (in_array($rand, $ranArr)) {
          randNumber();
        } else {
          $ranArr[] = $rand;
        }
      }

      $number = ($number > $allWordLen['num']) ? $allWordLen['num'] : $number;
      // 获取n个随机数
      for ($i = 0; $i < $number; $i++) {
        randNumber();
      }

      for ($i = 0; $i < $number; $i++) {
        $wordType = rand(0, 1);
        $randWord[] = [$allWord[$ranArr[$i]]['id'], $wordType];
      }

      $computedNum = "SELECT COUNT(*) AS `num` FROM `test` WHERE `cid` = '$cid'";
      $num = $conn -> query($computedNum) -> fetch(PDO::FETCH_ASSOC);
      $num = ($num['num'] <= 1) ? $num['num'] + 1 : $num['num'];
      $num = ($num / 1 < 10) ? '0' . $num : $num;
      $title = $_empty[0]['type_name'] . '第' . $num . '次';
      $jsonWord = json_encode($randWord);
      $insert = "INSERT INTO `test` (`cid`, `title`, `number`, `status`, `json_data`, `time`) VALUES ('$cid', '$title', '$number', 0, '$jsonWord', '$time')";
      if ($conn -> exec($insert)) {
        returnMsg(4000, '', 'add success');
      }
    } else {
      returnMsg(4004, '', 'classify does mpt exost');
    }
  } else {
    returnMsg(4001, '', 'parameter empty');
  }