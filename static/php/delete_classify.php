<?php
  include('./conn.php');
  include('./methods.php');

  $id = $_POST['id'] ?? null;

  if (isset($id)) {
      $query = "SELECT * FROM `test_type` WHERE `id` = $id";
      $res = $conn -> query($query) -> fetch();
      if (isset($res)) {
        $delete = "DELETE FROM `test_type` WHERE `id` = $id";
        $delete_res = $conn -> exec($delete);
        if ($delete_res) {
          returnMsg(4000, '', 'delete success');
        }
      } else {
        returnMsg(4002, '', 'data error');
      }
  } else {
    returnMsg(4001, '', 'parameter is empty');
  }