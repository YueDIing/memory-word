<?php
  include('./conn.php');
  function getAllWord () {
    global $conn;
    $res = $conn -> query("SELECT * FROM `word` ORDER BY `time`") -> fetchAll(PDO::FETCH_ASSOC);
    if ($res) {
      return $res;
    } else {
      returnMsg();
    }
  }

  function returnMsg ($code = 400, $data = []) {
    echo json_encode([
      'code' => $code,
      'data' => $data
    ], JSON_UNESCAPED_UNICODE);
  }