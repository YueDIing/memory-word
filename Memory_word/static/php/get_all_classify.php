<?php
  include('./conn.php');
  include('./methods.php');

  $query = "SELECT * FROM `test_type` ORDER BY `time` DESC";
  $res = $conn -> query($query) -> fetchAll(PDO::FETCH_ASSOC);
  if (isset($res)) {
    $index = 0;
    foreach ($res as $key => $value) {
      $time = $value['time'];
      $res[$key]['time'] = date('Y-m-d', $time);
    }
    returnMsg(4000, $res, 'success');
  }