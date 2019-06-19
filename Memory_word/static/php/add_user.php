<?php
  include('./conn.php');
  include('./methods.php');
  $name = isset($_POST['name']) ? $_POST['name'] : null;
  $starId = isset($_POST['star_id']) ? $_POST['star_id'] : null;
  $getLevel = isset($_POST['level']) ? $_POST['level'] : null;
  $time = time();
  if (isset($name) && isset($starId) && isset($getLevel)) {
    $query = "SELECT * FROM `user` WHERE `star_id` = '$starId'";
    $res = $conn -> query($query) -> fetch(PDO::FETCH_ASSOC);
    if (!$res) {
      $level = ($getLevel / 1 === 3) ? 0 : 1;
      $insert = "INSERT INTO `user` (`star_id`, `username`, `level`, `token`, `time`) VALUES ('$starId', '$name', '$level', '', $time)";
      if ($conn -> exec($insert)) {
        returnMsg(4000, '', 'success');
      }
    } else {
      returnMsg(4000, $res, 'success');
    }
  }