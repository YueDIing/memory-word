<?php
  /*
    4000 正确
    4001 参数为空
    4002 参数错误
    4003 数据重复
    4004 数据不存在
  */
  header("Access-Control-Allow-Origin:http://localhost:8080");
  header("Access-Control-Allow-Credentials:true");
  date_default_timezone_set("PRC");
  try{
//    $conn = new PDO("mysql:host=localhost; dbname=wordv2", 'root', '' ,[PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);
    $conn = new PDO("mysql:host=localhost; dbname=xili", 'xili', '123456' ,[PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']); // star git database use
    date_default_timezone_set("PRC");
  } catch (PDOException $e) {
    echo $e -> getMessage();
  }