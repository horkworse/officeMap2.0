-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 29 2020 г., 13:15
-- Версия сервера: 5.7.20
-- Версия PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `OfficeMap`
--
CREATE DATABASE IF NOT EXISTS `OfficeMap` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `OfficeMap`;

-- --------------------------------------------------------

--
-- Структура таблицы `Employees`
--

CREATE TABLE `Employees` (
  `id` int(5) UNSIGNED NOT NULL,
  `full_name` varchar(40) NOT NULL COMMENT 'Фамилия, имя, отчество',
  `post` enum('Директор','Программист','Тестировщик','Аналитик') NOT NULL COMMENT 'Должность',
  `status` enum('Работает','В отпуске','Болеет','Командировка') DEFAULT 'Работает' COMMENT 'Статус работника'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Employees`
--

INSERT INTO `Employees` (`id`, `full_name`, `post`, `status`) VALUES
(1, 'Зиновьев Бронислав Анатольевич', 'Программист', 'Работает'),
(2, 'Лазарев Дональд Викторович', 'Директор', 'В отпуске'),
(3, 'Устинов Архип Владимирович', 'Аналитик', 'Работает'),
(4, 'Панов Яков Лукьянович', 'Тестировщик', 'Болеет'),
(5, 'Мельников Платон Михаилович', 'Программист', 'Болеет');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Employees`
--
ALTER TABLE `Employees`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Employees`
--
ALTER TABLE `Employees`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
