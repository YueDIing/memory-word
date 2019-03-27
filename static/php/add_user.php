<?php
  include('./conn.php');
  include('./methods.php');
  $name = $_POST['name'] ?? null;
  $starId = $_POST['star_id'] ?? null;
  $time = time();
  if (isset($name) && isset($starId)) {
    $query = "SELECT * FROM `user` WHERE `star_id` = '$starId'";
    $res = $conn -> query($query) -> fetch(PDO::FETCH_ASSOC);
    if (!$res) {
      $insert = "INSERT INTO `user` (`star_id`, `username`, `level`, `token`, `time`) VALUES ('$starId', '$name', 0, '', $time)";
      if ($conn -> exec($insert)) {
        returnMsg(200);
      }
    }
  }