-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2020 at 12:02 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinicord_pdo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `checkup_tbl`
--

CREATE TABLE `checkup_tbl` (
  `checkup_id` int(11) NOT NULL,
  `Client_id` int(11) NOT NULL,
  `Doctor_id` int(11) NOT NULL,
  `treatment` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkup_tbl`
--

INSERT INTO `checkup_tbl` (`checkup_id`, `Client_id`, `Doctor_id`, `treatment`, `createdOn`) VALUES
(1, 1, 1, 'Tooth Extraction due to poor tooth condition', '2020-12-10 17:35:44');

-- --------------------------------------------------------

--
-- Table structure for table `client_tbl`
--

CREATE TABLE `client_tbl` (
  `Client_id` int(11) NOT NULL,
  `Client_name` varchar(40) NOT NULL,
  `Client_gender` varchar(5) NOT NULL,
  `Client_age` varchar(5) NOT NULL,
  `Client_address` varchar(100) NOT NULL,
  `Client_phone` varchar(12) NOT NULL,
  `Client_findings` varchar(255) NOT NULL,
  `Client_IsForCheckup` char(5) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IsDeleted` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_tbl`
--

INSERT INTO `client_tbl` (`Client_id`, `Client_name`, `Client_gender`, `Client_age`, `Client_address`, `Client_phone`, `Client_findings`, `Client_IsForCheckup`, `createdOn`, `IsDeleted`) VALUES
(14, 'Jhay Velarmino', 'M', '26', 'Olongapo City', '0921312321', '', 'True', '2020-12-16 14:48:05', 'F'),
(15, 'Jessica Miraflor', 'F', '23', 'Olongapo City', '0921312321', '', 'True', '2020-12-16 14:48:00', 'F'),
(18, 'Bernardo Aquilan', 'M', '33', '62 Dimariwa St. Muhangan Pangasinan', '09201753291', '', 'True', '2020-12-16 14:47:56', 'F'),
(19, 'Ernesto Rockfeller', 'M', '25', 'New York', '09324161312', '', 'True', '2020-12-16 14:47:48', 'F'),
(20, 'Marica Borna', 'F', '23', 'New York', '09324161312', '', 'True', '2020-12-16 14:47:43', 'F'),
(21, 'Enzo Mora', 'F', '21', 'Banicain', '09201753291', '', 'False', '2020-12-16 14:06:25', 'F'),
(22, 'Ron Benedict Panes', 'M', '23', 'West Bajac Bajac', '09324161312', '', 'True', '2020-12-16 18:16:53', 'T'),
(24, 'Timothy Cortez', 'M', '21', 'West Bajac Bajac', '09324161312', '', 'False', '2020-12-16 18:16:55', 'T'),
(25, 'Jerome Villafuerte', 'M', '21', 'West Bajac Bajac', '09324161312', '', 'False', '2020-12-16 17:57:32', 'T'),
(26, 'Jonas Silvia', 'M', '27', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 14:48:33', 'T'),
(32, 'Ron Benedict Panes', 'M', '23', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 14:48:43', 'T'),
(34, 'Krupt Chrysler', 'M', '23', 'Germany', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 14:28:25', 'T'),
(39, 'Krupt Chrysler', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 18:16:51', 'T'),
(40, 'sadasd', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 18:16:46', 'T'),
(41, 'sadasd', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 18:38:13', 'T'),
(42, 'sadasd', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 18:38:12', 'T'),
(43, 'asdas', 'M', '21', 'Germany', '09324161312', 'Sore Throat', 'True', '2020-12-16 18:38:09', 'T'),
(44, 'dasd', 'M', '21', 'West Bajac Bajac', '09201753291', 'Sore Throat', 'True', '2020-12-16 18:38:06', 'T'),
(45, 'dasdsa', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'True', '2020-12-16 18:38:03', 'T'),
(46, 'Krupt Chrysler', 'M', '64', 'Germany', '09324161312', 'Sore Throat', 'True', '2020-12-19 13:20:47', 'T'),
(47, 'Jesse Ares', 'F', '64', 'West Bajac Bajac', '09343243432', 'Pelvic muscle pain', 'False', '2020-12-17 11:40:36', 'T'),
(48, 'Jesse Ares', 'F', '64', 'West Bajac Bajac', '09343243432', 'Pelvic muscle pain', 'True', '2020-12-17 11:38:38', 'T'),
(49, 'Krupt Chrysler', 'M', '54', 'West Bajac Bajac', '09324161312', 'Heart Weakness', 'True', '2020-12-19 00:08:34', 'T');

-- --------------------------------------------------------

--
-- Table structure for table `clinicord_accounts`
--

CREATE TABLE `clinicord_accounts` (
  `id` int(11) NOT NULL,
  `Doctor_id` int(11) NOT NULL,
  `Doctor_email` varchar(40) NOT NULL,
  `Doctor_username` varchar(40) NOT NULL,
  `Doctor_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clinicord_accounts`
--

INSERT INTO `clinicord_accounts` (`id`, `Doctor_id`, `Doctor_email`, `Doctor_username`, `Doctor_password`) VALUES
(31, 0, 'Mcdo@business.com.ph', 'McdonaldsNumbawan', '$2y$10$YTE0NmUyYzU0ZDM0ZjNhN.7E/WdMbee6BnRnH9YeeZ/6.8YrnCbH2'),
(32, 0, 'geraldtagle09@gmail.com', 'gerald09', '$2y$10$ZDgzMmJjYjY5YmIyMjU2NOvdkotlOtGggKkEpOYEKeIveQ2JnyTcq'),
(33, 0, 'geraldtagle09@gmail.com', 'gerald09', '$2y$10$NzBmM2QxZmIxMmVlZTliM.a0AmK3UQVmwrqOv9TvtCf0EL9opnOy2');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_tbl`
--

CREATE TABLE `doctor_tbl` (
  `Doctor_id` int(11) NOT NULL,
  `Doctor_name` varchar(30) NOT NULL,
  `Doctor_specialty` varchar(30) NOT NULL,
  `Doctor_gender` varchar(10) NOT NULL,
  `Doctor_age` varchar(11) NOT NULL,
  `Doctor_phone` varchar(12) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IsDeleted` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_tbl`
--

INSERT INTO `doctor_tbl` (`Doctor_id`, `Doctor_name`, `Doctor_specialty`, `Doctor_gender`, `Doctor_age`, `Doctor_phone`, `createdOn`, `IsDeleted`) VALUES
(3, 'Tagle, Gerald B.', 'Optometrist', 'M', '26', '0921312321', '2020-12-16 12:36:42', 'F'),
(4, 'Crisaldo Mercurio', 'Cardiologist', 'M', '44', '0921312321', '2020-12-16 12:36:46', 'F'),
(5, 'Feliza Diosdado', 'Psychotherapist', 'F', '32', '0921312321', '2020-12-16 12:36:48', 'F'),
(10, 'Prince Delacruz', 'Dermatologists', 'F', '35', '0921312321', '2020-12-16 12:36:49', 'F'),
(11, 'Miraflor Macaraeg', 'Dermatologists', 'F', '35', '0921312321', '2020-12-16 12:36:54', 'F'),
(12, 'Jose Manalo', 'Endocrinologists', 'M', '28', '0921312321', '2020-12-16 13:03:20', 'F'),
(13, 'Jose Bundang', 'Physician', 'M', '54', '0921312321', '2020-12-19 13:21:58', 'T'),
(14, 'Crisaldo Mercurio', 'Physician', 'M', '21', '09343243432', '2020-12-17 11:41:53', 'T');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  ADD PRIMARY KEY (`checkup_id`),
  ADD KEY `Doctor_id` (`Doctor_id`),
  ADD KEY `Client_id` (`Client_id`);

--
-- Indexes for table `client_tbl`
--
ALTER TABLE `client_tbl`
  ADD PRIMARY KEY (`Client_id`);

--
-- Indexes for table `clinicord_accounts`
--
ALTER TABLE `clinicord_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  ADD PRIMARY KEY (`Doctor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  MODIFY `checkup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `Client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `clinicord_accounts`
--
ALTER TABLE `clinicord_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  MODIFY `Doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
