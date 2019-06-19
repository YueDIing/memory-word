-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-05-06 13:13:18
-- 服务器版本： 10.1.38-MariaDB
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `wordv2`
--
CREATE DATABASE IF NOT EXISTS `wordv2` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `wordv2`;

-- --------------------------------------------------------

--
-- 表的结构 `test`
--

CREATE TABLE `test` (
  `id` int(11) UNSIGNED NOT NULL,
  `cid` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `number` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `json_data` text NOT NULL,
  `time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `test_type`
--

CREATE TABLE `test_type` (
  `id` int(11) UNSIGNED NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `num` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='试卷类型';

--
-- 转存表中的数据 `test_type`
--

INSERT INTO `test_type` (`id`, `type_name`, `num`, `time`) VALUES
(1, '综合测试', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `star_id` int(11) NOT NULL COMMENT '星辰平台id',
  `username` varchar(255) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '修改权限',
  `token` varchar(255) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `star_id`, `username`, `level`, `token`, `time`) VALUES
(1, 44, '廖俊', 0, '', 1553512097),
(3, 45, '陈纪盛', 1, '', 1554949391),
(4, 9, 'admin', 0, '', 1554949482),
(5, 40, '黄博滔', 1, '', 1556865775);

-- --------------------------------------------------------

--
-- 表的结构 `word`
--

CREATE TABLE `word` (
  `id` int(11) UNSIGNED NOT NULL,
  `uid` int(11) UNSIGNED NOT NULL DEFAULT '1',
  `type_id` int(11) UNSIGNED NOT NULL,
  `word_en` varchar(255) NOT NULL,
  `ph_en` varchar(255) NOT NULL,
  `ph_am` varchar(255) NOT NULL,
  `ph_en_mp3` text NOT NULL,
  `ph_am_mp3` text NOT NULL,
  `ph_tts_mp3` text NOT NULL,
  `word_json` text NOT NULL,
  `time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转储表的索引
--

--
-- 表的索引 `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `test_type`
--
ALTER TABLE `test_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_name` (`type_name`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `word_en` (`word_en`),
  ADD KEY `uid` (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `test_type`
--
ALTER TABLE `test_type`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `word`
--
ALTER TABLE `word`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
