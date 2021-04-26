-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2021 at 07:11 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `accounts_tbl`
--

CREATE TABLE `accounts_tbl` (
  `id` int(11) NOT NULL,
  `User_username` varchar(50) NOT NULL,
  `User_email` varchar(50) NOT NULL,
  `User_password` varchar(100) NOT NULL,
  `User_image` varchar(255) NOT NULL,
  `User_role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts_tbl`
--

INSERT INTO `accounts_tbl` (`id`, `User_username`, `User_email`, `User_password`, `User_image`, `User_role`) VALUES
(74, 'tags123', 'geraldtagle09@gmail.com', '$2y$10$MjBjNmQxNzMzMzVmMDg2MumsckXE3oRjw2MX./1cpjm28.yCg/xrK', '20210419T133229+0800.png', 'client'),
(75, 'admin123', 'Mcdo@business.com.ph', '$2y$10$YTE0NmUyYzU0ZDM0ZjNhN.7E/WdMbee6BnRnH9YeeZ/6.8YrnCbH2', '', 'admin'),
(76, 'edgardo123', 'edgar@yahoo.com', '$2y$10$OTkyZDM3YTQ3YzMzODkxOO/f/xFTmh7ca440l2cDspmWQoBal23qW', '20210420T230746+0800.png', 'client'),
(82, 'test123', 'test@yahoo.com', '$2y$10$ZTkwZGQ2ZTg5NWZlYjViZO7tlNPdW07Ctn3HG3FXssazHEl15eIEC', '20210421T133621+0800.png', 'client'),
(83, 'testdoctor123', 'testdoctor@yahoo.com', '$2y$10$ZTkwZGQ2ZTg5NWZlYjViZO7tlNPdW07Ctn3HG3FXssazHEl15eIEC', '', 'doctor'),
(84, 'testtest123', 'testtest@yahoo.com', '$2y$10$MzM0YzU4ODBlN2U0YTUyOOumVlHl3PMz6Cpc4qEvtXmorEQm7AuJy', '20210424T224305+0800.png', 'client'),
(85, 'hakerman123', 'hakeeman@yahoo.com', '$2y$10$MzgyMWMxZjkxYTI5ZjlhOOwNv98uy58ayiSkbYB1OsqFkoi54TasG', '20210424T231540+0800.png', 'client'),
(86, 'anotherdoct123', 'anotherdoct123@yahoo.com', '$2y$10$YzNmMzA3YTkyYjI4ZmQ4NedOxxYy8waAKEEeqM0/tUQoj2h3g74wS', '20210426T113249+0800.png', 'doctor'),
(87, 'hakdogdoctor123', 'doctorhakdog@yahoo.com', '$2y$10$NDI1MTM2ZmYzNTU0ZmEyO.MoRWYA6aSAHBF4go01dZfN6vtm0Rmg2', '20210426T122106+0800.png', 'doctor');

-- --------------------------------------------------------

--
-- Table structure for table `admin_accounts`
--

CREATE TABLE `admin_accounts` (
  `id` int(11) NOT NULL,
  `Doctor_id` int(11) NOT NULL,
  `Doctor_email` varchar(40) NOT NULL,
  `Doctor_username` varchar(40) NOT NULL,
  `Doctor_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_accounts`
--

INSERT INTO `admin_accounts` (`id`, `Doctor_id`, `Doctor_email`, `Doctor_username`, `Doctor_password`) VALUES
(31, 0, 'Mcdo@business.com.ph', 'admin123', '$2y$10$YTE0NmUyYzU0ZDM0ZjNhN.7E/WdMbee6BnRnH9YeeZ/6.8YrnCbH2'),
(32, 0, 'geraldtagle09@gmail.com', 'gerald09', '$2y$10$ZDgzMmJjYjY5YmIyMjU2NOvdkotlOtGggKkEpOYEKeIveQ2JnyTcq');

-- --------------------------------------------------------

--
-- Table structure for table `checkup_tbl`
--

CREATE TABLE `checkup_tbl` (
  `ap_id` int(11) NOT NULL,
  `U_id` int(11) NOT NULL,
  `Doctor_id` int(11) NOT NULL,
  `ap_type` varchar(255) NOT NULL,
  `ap_date` date NOT NULL,
  `ap_time` time NOT NULL,
  `ap_status` varchar(100) NOT NULL,
  `ap_description` varchar(100) NOT NULL,
  `ap_FirstTime` varchar(5) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IsDeleted` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkup_tbl`
--

INSERT INTO `checkup_tbl` (`ap_id`, `U_id`, `Doctor_id`, `ap_type`, `ap_date`, `ap_time`, `ap_status`, `ap_description`, `ap_FirstTime`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(30, 74, 83, 'Mild', '2021-04-22', '16:30:09', 'Canceled', 'Follow up checkup', 'Yes', '2021-04-21 15:31:17', '2021-04-25 23:53:20', 'F');

-- --------------------------------------------------------

--
-- Table structure for table `client_tbl`
--

CREATE TABLE `client_tbl` (
  `Client_id` int(11) NOT NULL,
  `U_id` int(11) NOT NULL,
  `Client_name` varchar(40) NOT NULL,
  `Client_gender` varchar(5) NOT NULL,
  `Client_age` varchar(5) NOT NULL,
  `Client_birthdate` date NOT NULL,
  `Client_address` varchar(100) NOT NULL,
  `Client_phone` varchar(12) NOT NULL,
  `Client_weight` decimal(5,2) NOT NULL,
  `Client_height` decimal(3,2) NOT NULL,
  `Client_bloodtype` varchar(5) NOT NULL,
  `Client_healthcondition` text NOT NULL,
  `Client_healthsymptoms` text NOT NULL,
  `Client_healthmedication` text NOT NULL,
  `Client_healtallergies` text NOT NULL,
  `Client_healthtobacco` text NOT NULL,
  `Client_drughistory` text NOT NULL,
  `Client_alcoholhistory` text NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedOn` datetime NOT NULL,
  `IsDeleted` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_tbl`
--

INSERT INTO `client_tbl` (`Client_id`, `U_id`, `Client_name`, `Client_gender`, `Client_age`, `Client_birthdate`, `Client_address`, `Client_phone`, `Client_weight`, `Client_height`, `Client_bloodtype`, `Client_healthcondition`, `Client_healthsymptoms`, `Client_healthmedication`, `Client_healtallergies`, `Client_healthtobacco`, `Client_drughistory`, `Client_alcoholhistory`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(74, 74, 'gerald tagle ', 'Male', '22', '2014-04-19', 'Barangay Ppagasa ', '9301189136', '55.00', '1.71', 'O+', 'None', 'None', 'No', 'No', 'No', 'No', 'Occasionally', '2021-04-19 13:32:29', '0000-00-00 00:00:00', 'F'),
(75, 76, 'Edgar Ricardo', 'Male', '55', '1962-04-20', 'Olongapo City', '9189393157', '89.00', '1.58', 'A-', 'Arthritis', 'Cough', 'Yes', 'No', 'Yes', 'Yes', 'Occasionally', '2021-04-20 23:07:46', '0000-00-00 00:00:00', 'F'),
(82, 82, 'test test', 'Male', '56', '2021-04-21', 'Olongapo City', '9301189136', '90.00', '1.85', 'AB+', 'none', 'none', 'No', 'Not Sure', 'No', 'No', 'Never', '2021-04-21 13:36:21', '0000-00-00 00:00:00', 'F'),
(83, 84, 'sads', 'sadsa', '123', '0000-00-00', 'asdas', '21321', '23.00', '1.00', 'A', 'ASD', 'AS', 'SAD', 'DASD', 'ASD', 'ASDAS', 'DASD', '2021-04-24 22:43:05', '0000-00-00 00:00:00', 'F'),
(84, 85, 'haker man', 'Male', '65', '2021-04-24', 'Olongapo City', '9301189316', '68.00', '1.45', 'O+', 'none', 'none', 'No', 'Not Sure', 'No', 'No', 'Never', '2021-04-24 23:15:40', '0000-00-00 00:00:00', 'F');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_tbl`
--

CREATE TABLE `doctor_tbl` (
  `Doctor_id` int(11) NOT NULL,
  `U_id` int(11) NOT NULL,
  `Doctor_name` varchar(30) NOT NULL,
  `Doctor_specialty` varchar(30) NOT NULL,
  `Doctor_gender` varchar(10) NOT NULL,
  `Doctor_age` varchar(11) NOT NULL,
  `Doctor_birthdate` varchar(50) NOT NULL,
  `Doctor_address` varchar(50) NOT NULL,
  `Doctor_phone` varchar(12) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `UpdatedOn` datetime NOT NULL,
  `IsDeleted` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_tbl`
--

INSERT INTO `doctor_tbl` (`Doctor_id`, `U_id`, `Doctor_name`, `Doctor_specialty`, `Doctor_gender`, `Doctor_age`, `Doctor_birthdate`, `Doctor_address`, `Doctor_phone`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(15, 83, 'doctor test', 'cardiologist', 'Male', '26', '', '', '09213125312', '2021-04-21 15:29:59', '2021-04-21 09:29:18', 'F'),
(16, 86, 'sads', 'cardiologist', 'sadsa', '123', 'sadas', 'asdas', '213213', '2021-04-26 11:32:49', '0000-00-00 00:00:00', 'F'),
(17, 87, 'Hak Dog', 'Cardiologist', 'Male', '55', '1991-04-26T12:19:01.447+08:00', 'Olongapo City', '9301189136', '2021-04-26 12:21:07', '0000-00-00 00:00:00', 'F');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_tbl`
--
ALTER TABLE `accounts_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  ADD PRIMARY KEY (`ap_id`),
  ADD KEY `U_id` (`U_id`),
  ADD KEY `Doctor_id` (`Doctor_id`);

--
-- Indexes for table `client_tbl`
--
ALTER TABLE `client_tbl`
  ADD PRIMARY KEY (`Client_id`),
  ADD KEY `U_id` (`U_id`);

--
-- Indexes for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  ADD PRIMARY KEY (`Doctor_id`),
  ADD KEY `U_id` (`U_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_tbl`
--
ALTER TABLE `accounts_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  MODIFY `ap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `Client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  MODIFY `Doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  ADD CONSTRAINT `checkup_tbl_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `accounts_tbl` (`id`),
  ADD CONSTRAINT `checkup_tbl_ibfk_2` FOREIGN KEY (`Doctor_id`) REFERENCES `accounts_tbl` (`id`);

--
-- Constraints for table `client_tbl`
--
ALTER TABLE `client_tbl`
  ADD CONSTRAINT `client_tbl_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `accounts_tbl` (`id`);

--
-- Constraints for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  ADD CONSTRAINT `doctor_tbl_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `accounts_tbl` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
