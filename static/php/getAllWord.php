<?php
  include('./methods.php');
  $allWord = getAllWord();

  if ($allWord) {
    returnMsg(4000, $allWord, 'success');
  }