<?php
  include('./conn.php');
  include('./methods.php');

  $star_id = isset($_GET['id']) ? $_GET['id'] : null;

  if (isset($star_id)) {
    $query = "SELECT * FROM `user` WHERE `star_id` = '$star_id'";
    $res = $conn -> query($query) -> fetch(PDO::FETCH_ASSOC);
    if ($res) {
      returnMsg(4000, $res, 'success');
    } else {
      returnMsg(4001, '', 'User does not exist ');
    }
  } else {
    returnMsg(4001, '', 'Data empty');
  }