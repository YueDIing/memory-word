<?php
  include('./methods.php');
  $type = isset($_POST['type']) ? $_POST['type'] : null;
  $word_id = isset($_POST['id']) ? $_POST['id'] : null; // 单词id

switch ($type) {
    case 'update':
      $word_explanation = isset($_POST['explanation']) ? $_POST['explanation'] : null;
      if ($word_id && $word_explanation) {
        $query = $conn -> query("SELECT * FROM `word` WHERE `id` = '$word_id'") -> fetchAll(PDO::FETCH_ASSOC);
        if ($query) {
          if ($conn -> exec("UPDATE `word` SET `explanation` = '" . json_encode($word_explanation, JSON_UNESCAPED_UNICODE) . "' WHERE `id` = $word_id")) {
            returnMsg();
          }
        } else {
          returnMsg(4004);
        }
        } else {
        returnMsg(4001);
      }
      break;
    case 'remove':
      if ($word_id) {
        $delete = "DELETE FROM `word` WHERE `id` = '$word_id'";
        if ($conn -> exec($delete)) {
          returnMsg(4000, '', 'success');
        }
      } else {
        returnMsg(4001, '', 'parameter empty');
      }
      break;
    default:
      $allWord = $conn -> query("SELECT * FROM `word` ORDER BY `id` DESC") -> fetchAll(PDO::FETCH_ASSOC);
      returnMsg(4000, $allWord);
  }
