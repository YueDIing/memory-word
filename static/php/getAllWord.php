<?php
  include('./methods.php');
  $word = getAllWord();
  if (is_array($word)) {
    echo returnMsg(200, $word);
  }