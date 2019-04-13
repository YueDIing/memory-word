<?php
  include('./conn.php');
  include('./methods.php');

  $query = "SELECT * FROM `test_type` ORDER BY `time` DESC";
  $res = $conn -> query($query) -> fetchAll(PDO::FETCH_ASSOC);
  returnMsg(4000, $res, 'success');