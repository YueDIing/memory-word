<?php
  include('./conn.php');
  include('./methods.php');

  $word = $_GET['word'] ?? null;

  function transilation ($content = '') {
    $fy = curl("http://fy.iciba.com/ajax.php?a=fy&f=auto&t=auto&w=$content");
    return json_decode($fy, true);
  }

  if (isset($word)) {
    $fy_res = transilation($word);
    // 中转英文时, status = 1
    $content = $fy_res['content'] ?? null;
    if (isset($content)) {
      // $fy_res['status'] 参数为1是中文 0 是英文
      // 由于api翻译中文是返回了英文, 所以需要再次调用api翻译, 获取解释以及音频
      if ($fy_res['status'] / 1 === 1) {
        $word_en = $content['out'];
        $fy_res = transilation($word_en);
        $fy_res['content']['word_en'] = $word_en;
      } else {
        $fy_res['content']['word_en'] = $word;
      }
      returnMsg(4000, $fy_res);
    }
  }