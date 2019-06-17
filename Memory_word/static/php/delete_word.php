<?php
  include('./conn.php');
  include('./methods.php');

  $id = $_POST['id'] ?? null;
  if ($id) {
      $delete = "DELETE FROM `word` WHERE `id` = '$id'";
      if ($conn -> exec($delete)) {
        returnMsg(4000, '', 'success');
      }
  } else {
    returnMsg(4001, '', 'parameter empty');
  }