<?php
  include('./conn.php');
  function getAllWord () {
    global $conn;
    $res = $conn -> query("SELECT * FROM `word` ORDER BY `time` DESC") -> fetchAll(PDO::FETCH_ASSOC);
    if ($res) {
      return $res;
    } else {
      returnMsg(4001, '', 'data error');
    }
  }

  function isEmptyData ($val = null) {
    return isset($val) ? $val : false;
  }

  function returnMsg ($code = 4000, $data = [], $msg = '') {
    if (isset($msg)) {
      switch ($code) {
        case 4000:
          $msg = 'success';
          break;
        case 4001:
          $msg = 'parameter is epmty';
          break;
        case 4002:
          $msg = 'parameter error';
          break;
        case 4003:
          $msg = 'data repeat';
          break;
        case 4004:
          $msg = 'data error';
          break;
        case 4005:
          $msg = 'role error';
          break;
      }
    }
    echo json_encode([
      'code' => $code,
      'data' => $data,
      'message' => $msg
    ], JSON_UNESCAPED_UNICODE);
  }

  /*function curl($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5000);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'));
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $contents = curl_exec($ch);
    curl_close($ch); //关闭打开的会话
    return $contents;
  }*/

  function curl($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5000);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      "User-Agent:" .  "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
      "Cookie:" . "BIDUPSID=C91FE32AC005E2D57325468593170740; BAIDUID=E334F7A9D577067222E2E54AA633B6B0:FG=1; PSTM=1555745819; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; MCITY=-257%3A; to_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; from_lang_often=%5B%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%5D; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1560411863,1560411892,1560411957,1560412028; BDSFRCVID=Gu8OJeC62lZsdl3w0CpObaU9r2VJy0QTH6aVNChLF9Urx9wypXWUEG0Pef8g0Ku-Nb29ogKK3gOTH4DF_2uxOjjg8UtVJeC6EG0P3J; H_BDCLCKID_SF=tRKD_CKKfCK3fJrYhPIV-PAt-U4Xat0XKKOLVK5S2h7keq8CDR7T-J-v0HrX2MTgKD6Phqrd5MQrbhc2y5jHhP-h2ho-Lqby3KngKKKhHlOpsIJMQbAWbT8ULf5-blcRaKviaKOjBMb1MhbDBT5h2M4qMxtOLR3pWDTm_q5TtUt5OCFlen3HhCCV-frb-C62aKDsbRrI-hcqEpO9QTbUqfvBeq3IQt4HQnnO0n7TyRu-ObRD35QaDUThDN0ftTK8tJ3BXjrD2-0_Hn7zeU-5yJtpbtbmhU-eWJ6ubDTMynbaJtJzDT7jQIufy4Qwt-TItb7ZVD_2tKDBMD_lePrD-t435eT22-us5Ncm2hcH0KLKVC3v0tv-eJ8Ryt6a5lL8-Jri3fbYJfb1MRjvLfRDhqLuM47zLlc8QmnLVp5TtUJ8JKnTDMRh-4kDXbbyKMnitKv9-pP23pQrh459XP68bTkA5bjZKxtq3mkjbIOFfDD2bDP4j6uMen-W5gTh546MKKJyLR-8Kb7Vbncd0MnkbfJBDxr9WlRPLJ5j_qR9KJjlbt_GQ4Qc-l_7yajKBx3z2m5wahod0hvbsRn_Bp5pQT8rbJ_OK5Oib4jMBlvvab3vOIOTXpO1jM0zBN5thURB2DkO-4bCWJ5TMl5jDh05y6TLDa_ft5D8Jb3fL-08KJj0j-5p2J__-P4DePJtqURZ5mAqoJRu-bbShP0xLn3c-4_AeqKHLfT8tN6naIQqQqrTjhRDeqoK25FW2q3vLhQ43bRT0RLy5KJvfj68-6KBhP-UyNbMWh37JgnlMKoaMp78jR093JO4y4Ldj4oxJp8eWJQ2QJ8BJI_BMCjP; H_PS_PSSID=; delPer=0; PSINO=1; BDRCVFR[VXHUG3ZuJnT]=mk3SLVN4HKm; ZD_ENTRY=baidu; locale=zh; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1560471695"
    ]);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $contents = curl_exec($ch);
    curl_close($ch); //关闭一打开的会话
    return $contents;
  }

  function isEmpty ($table = '', $condition = '') {
    global $conn;
    $sql = "SELECT * FROM $table WHERE $condition";
    $res = $conn -> query($sql);
    return $res -> fetchAll(PDO::FETCH_ASSOC);
  }