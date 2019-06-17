<?php
  include('./conn.php');
  include('./methods.php');

  $id = $_POST['id'] ?? null;

  if ($id) {
    $update = "UPDATE `test` SET `status` = 1 WHERE `id` = $id";
    if ($conn -> exec($update)) {
      returnMsg(4000, '', 'update success');
    }
  } else {
    returnMsg(4001, '', 'parameter is empty');
  }