<?php
  include('./conn.php');
  include('./methods.php');

  $word = $_GET['word'] ?? null;
  if (isset($word)) {
    $fy = curl("http://fy.iciba.com/ajax.php?a=fy&f=auto&t=auto&w=$word");
    $fy_res = json_decode($fy, true);
    // 中转英文时, status = 1
    if (isset($fy_res['content'])/*  && $fy_res['status'] / 1 !== 1 */) {
      returnMsg(4000, $fy_res);
    } else {
      returnMsg(4002);
    }
  }