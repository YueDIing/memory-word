<?php
  include('./conn.php');
  include('./methods.php');

  $sql = "SELECT * FROM `test` ORDER BY `time` DESC";
  $res = $conn -> query($sql) -> fetchAll(PDO::FETCH_ASSOC);
  if ($res) {
    $len = count($res);
    for ($i = 0; $i < $len; $i++) {
      $res[$i]['time'] = date("Y-m-d", $res[$i]['time']);
    }
    returnMsg(4000, $res, 'get test success');
  } else {
    returnMsg(4004, '', 'error');
  }