-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2021 at 06:11 AM
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
  `ap_id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `ap_type` varchar(255) NOT NULL,
  `ap_date` varchar(100) NOT NULL,
  `ap_status` varchar(100) NOT NULL,
  `ap_description` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IsDeleted` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkup_tbl`
--

INSERT INTO `checkup_tbl` (`ap_id`, `client_name`, `ap_type`, `ap_date`, `ap_status`, `ap_description`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(1, 'Jhay Velarmino', 'Mild', '2021-12-16', 'Postponed', 'Tooth Extraction due to poor tooth condition', '2020-12-10 17:35:44', '2021-03-17 17:38:26', 'F'),
(11, 'Ron Benedict Panes', 'Mild', '2021-03-29', 'Waiting', 'sdsadsad', '2021-03-17 22:45:04', '2021-03-25 13:03:34', 'F'),
(12, 'Jerome Villafuerte', 'Mild', '2021-03-24', 'Waiting', 'dsads', '2021-03-17 22:45:26', '2021-03-17 22:45:26', 'F'),
(13, 'Enzo Mora', 'Mild', '2021-03-24', 'Waiting', 'asdasd', '2021-03-17 22:47:16', '2021-03-17 22:47:16', 'F'),
(14, 'Timothy Cortez', 'Urgent', '2021-03-27', 'Waiting', 'Covid Test', '2021-03-20 18:06:16', '2021-03-25 12:46:22', 'F');

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
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedOn` datetime NOT NULL,
  `IsDeleted` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_tbl`
--

INSERT INTO `client_tbl` (`Client_id`, `Client_name`, `Client_gender`, `Client_age`, `Client_address`, `Client_phone`, `Client_findings`, `Client_IsForCheckup`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(14, 'Jhay Velarmino', 'M', '26', 'Olongapo City', '0921312321', 'Knee Injury', 'T', '2021-03-25 00:00:00', '2021-03-25 13:27:43', 'F'),
(15, 'Jessica Miraflor', 'F', '23', 'Olongapo City', '0921312321', 'Chest Pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:29', 'F'),
(18, 'Bernardo Aquilan', 'M', '33', '62 Dimariwa St. Muhangan Pangasinan', '09201753291', 'Diarrhea', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:30', 'F'),
(19, 'Ernesto Rockfeller', 'M', '25', 'New York', '09324161312', 'Sore Throat', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:33', 'F'),
(20, 'Marica Borna', 'F', '23', 'New York', '09324161312', 'Fever', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:01', 'F'),
(21, 'Enzo Mora', 'F', '21', 'Banicain', '09201753291', '', 'F', '2021-03-25 00:00:00', '2021-03-25 13:27:50', 'F'),
(22, 'Ron Benedict Panes', 'M', '23', 'West Bajac Bajac', '09324161312', 'Hard Breathing', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:35', 'T'),
(24, 'Timothy Cortez', 'M', '21', 'West Bajac Bajac', '09324161312', 'Heart Weakness', 'F', '2021-03-25 00:00:00', '2021-03-25 13:14:21', 'F'),
(25, 'Jerome Villafuerte', 'M', '21', 'James L. Gordon, O.C.', '093241613', 'Knee Injury', 'F', '2021-03-25 00:00:00', '2021-03-25 13:14:22', 'F'),
(26, 'Jonas Silvia', 'M', '27', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:37', 'F'),
(32, 'Ron Benedict Panes', 'M', '23', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:38', 'F'),
(34, 'Krupt Chrysler', 'M', '24', 'West Bajac-Bajac, Olongapo City', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:23:45', 'F'),
(39, 'Krupt Chrysler', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:42', 'T'),
(40, 'sadasd', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:43', 'T'),
(41, 'sadasd', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:44', 'T'),
(42, 'sadasd', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:45', 'T'),
(43, 'asdas', 'M', '21', 'Germany', '09324161312', 'Sore Throat', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:46', 'T'),
(44, 'dasd', 'M', '21', 'West Bajac Bajac', '09201753291', 'Sore Throat', 'F', '2021-03-25 00:00:00', '2021-03-25 13:14:25', 'T'),
(45, 'dasdsa', 'M', '21', 'West Bajac Bajac', '09324161312', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:47', 'T'),
(46, 'Krupt Chrysler', 'M', '64', 'Germany', '09324161312', 'Sore Throat', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:49', 'T'),
(47, 'Jesse Ares', 'F', '64', 'West Bajac Bajac', '09343243432', 'Pelvic muscle pain', 'F', '2021-03-25 00:00:00', '2021-03-25 13:14:26', 'T'),
(48, 'Jesse Ares', 'F', '64', 'West Bajac Bajac', '09343243432', 'Pelvic muscle pain', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:50', 'T'),
(49, 'Krupt Chrysler', 'M', '54', 'West Bajac Bajac', '09324161312', 'Heart Weakness', 'T', '2021-03-25 00:00:00', '2021-03-25 13:14:52', 'T'),
(50, 'Howard Floresca', 'M', '19', 'West Bajac Bajac', '09201753291', 'Heart Weakness', 'T', '2021-03-25 19:28:39', '0000-00-00 00:00:00', 'F');

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
(31, 0, 'Mcdo@business.com.ph', 'admin123', '$2y$10$YTE0NmUyYzU0ZDM0ZjNhN.7E/WdMbee6BnRnH9YeeZ/6.8YrnCbH2'),
(32, 0, 'geraldtagle09@gmail.com', 'gerald09', '$2y$10$ZDgzMmJjYjY5YmIyMjU2NOvdkotlOtGggKkEpOYEKeIveQ2JnyTcq'),
(41, 0, '', '', '$2y$10$NjNlMzg1ZTI5NjM1N2Y3MuhzVXCFCthGZXMEnThAHM3X4HbU7q5fq');

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
  `UpdatedOn` datetime NOT NULL,
  `IsDeleted` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_tbl`
--

INSERT INTO `doctor_tbl` (`Doctor_id`, `Doctor_name`, `Doctor_specialty`, `Doctor_gender`, `Doctor_age`, `Doctor_phone`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(3, 'Tagle, Gerald B.', 'Optometrist', 'M', '26', '0921312321', '2020-12-16 12:36:42', '2021-03-05 14:21:27', 'F'),
(4, 'Crisaldo Mercurio', 'Cardiologist', 'M', '44', '0921312321', '2020-12-16 12:36:46', '2021-03-05 14:21:27', 'F'),
(5, 'Feliza Diosdado', 'Psychotherapist', 'F', '32', '0921312321', '2020-12-16 12:36:48', '2021-03-05 14:21:27', 'F'),
(10, 'Prince Delacruz', 'Dermatologists', 'F', '36', '0921312321', '2021-03-05 00:17:22', '2021-03-05 14:21:27', 'F'),
(11, 'Miraflor Macaraeg', 'Dermatologists', 'F', '35', '0921312321', '2021-03-05 00:11:08', '2021-03-05 14:21:27', 'F'),
(12, 'Jose Manalo', 'Endocrinologists', 'F', '28', '0921312321', '2021-03-15 22:47:02', '2021-03-15 22:47:02', 'F'),
(13, 'Jose Bundang', 'Physician', 'M', '54', '0921312321', '2020-12-19 13:21:58', '2021-03-05 14:21:27', 'T'),
(14, 'Crisaldo Mercurio', 'Physician', 'M', '21', '09343243432', '2020-12-17 11:41:53', '2021-03-05 14:21:27', 'T');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  ADD PRIMARY KEY (`ap_id`);

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
  MODIFY `ap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `Client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `clinicord_accounts`
--
ALTER TABLE `clinicord_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  MODIFY `Doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
