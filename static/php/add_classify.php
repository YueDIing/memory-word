<?php
  include('./conn.php');
  include('./methods.php');

  $name = $_POST['name'] ?? null;
  $date = time();

  if ($name) {
    $sql = "SELECT * FROM `test_type` WHERE `type_name` = '$name'";
    $sql_res = $conn -> query($sql) -> fetchAll(PDO::FETCH_ASSOC);
    if (!$sql_res) {
      $insert = "INSERT INTO `test_type` VALUES (NULL, '$name', 0, $date)";
      if ($conn -> exec($insert)) {
        returnMsg(4000, '', 'success');
      }
    } else {
      returnMsg(4002, '', 'repeat add');
    }
  } else {
    returnMsg(4001, '', 'parameter is empty');
  }
