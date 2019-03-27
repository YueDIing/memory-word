<?php
  include('./conn.php');
  include('./methods.php');

  $word = $_POST['word'] ?? null;
  $time = time();
  if ($word) {
    $sql = "SELECT * FROM `word` WHERE `word_en` = '".$word['word_en']."'";
    $res = $conn -> query($sql) -> fetch(PDO::FETCH_ASSOC);
    if (!$res) {
      $query_user = "SELECT * FROM `user` WHERE `star_id` = '".$word['star_id']."'";
      $query_res = $conn -> query($query_user) -> fetch(PDO::FETCH_ASSOC);
      if ($query_res) {
        $json_word = json_encode($word['word_json'], JSON_UNESCAPED_UNICODE);
        $insert = "INSERT INTO `word`(`id`, `uid`, `word_en`, `ph_en`, `ph_am`, `ph_en_mp3`, `ph_am_mp3`, `ph_tts_mp3`, `word_json`, `time`) VALUES (NULL,'".$query_res['id']."','".$word['word_en']."','".$word['ph_en']."','".$word['ph_am']."','".$word['ph_en_mp3']."','".$word['ph_am_mp3']."','".$word['ph_tts_mp3']."','".$json_word."','".$time."')";
        if ($conn -> exec($insert)) {
          returnMsg(4000, '', 'insert success');
        }
      } else {
        returnMsg(4002, '', 'parameter error');
      }
    } else {
      returnMsg(4003, '', 'word repeat');
    }
  } else {
    returnMsg(4001, '', 'parameter empty');
  }
