<?php
  include('./conn.php');
  include('./methods.php');
  $id = $_POST['id'] ?? null;
  $wordCn = $_POST['wordCn'] ?? null;

  if ($id && $wordCn) {
    $empty = isEmpty('word', "`id` = $id");
    if ($empty) {
      $json_data = json_encode($wordCn, JSON_UNESCAPED_UNICODE);
      $update = "UPDATE `word` SET `word_json` = '$json_data' WHERE `id` = $id";
      if ($conn -> exec($update)) {
        returnMsg(4000, '', 'change success');
      }
    } else {
      returnMsg(4002, '', 'parameter error');
    }
  } else {
    returnMsg(4001, '', 'parameter is empty');
  }