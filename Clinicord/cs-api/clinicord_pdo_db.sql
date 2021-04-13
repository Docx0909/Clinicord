-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2021 at 02:18 PM
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
(32, 0, 'geraldtagle09@gmail.com', 'gerald09', '$2y$10$ZDgzMmJjYjY5YmIyMjU2NOvdkotlOtGggKkEpOYEKeIveQ2JnyTcq'),
(41, 0, '', '', '$2y$10$NjNlMzg1ZTI5NjM1N2Y3MuhzVXCFCthGZXMEnThAHM3X4HbU7q5fq');

-- --------------------------------------------------------

--
-- Table structure for table `checkup_tbl`
--

CREATE TABLE `checkup_tbl` (
  `ap_id` int(11) NOT NULL,
  `U_id` int(11) NOT NULL,
  `Client_name` varchar(50) NOT NULL,
  `ap_type` varchar(255) NOT NULL,
  `ap_date` date NOT NULL,
  `ap_time` time NOT NULL,
  `ap_status` varchar(100) NOT NULL,
  `ap_description` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IsDeleted` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkup_tbl`
--

INSERT INTO `checkup_tbl` (`ap_id`, `U_id`, `Client_name`, `ap_type`, `ap_date`, `ap_time`, `ap_status`, `ap_description`, `createdOn`, `UpdatedOn`, `IsDeleted`) VALUES
(19, 42, 'test account', 'Urgent', '2021-04-13', '10:00:00', 'Finished', 'Over Due Pregnancy', '2021-04-10 20:29:58', '2021-04-12 13:08:28', 'T'),
(27, 42, 'test account', 'Mild', '2021-04-14', '16:56:50', 'Finished', 'Scheduled checkup', '2021-04-11 17:02:18', '2021-04-12 12:59:39', 'F'),
(28, 43, 'Ron Benedict Panes', 'Urgent', '2021-04-15', '13:00:50', 'Approved', 'Checkup for lungs', '2021-04-12 12:05:00', '2021-04-12 12:59:48', 'F'),
(29, 44, 'Gerald B. Tagle', '', '2021-04-15', '10:00:52', 'Finished', 'Tooth Extraction', '2021-04-12 12:51:28', '2021-04-12 12:53:49', 'T');

-- --------------------------------------------------------

--
-- Table structure for table `client_accounts`
--

CREATE TABLE `client_accounts` (
  `id` int(11) NOT NULL,
  `User_username` varchar(50) NOT NULL,
  `User_email` varchar(50) NOT NULL,
  `User_password` varchar(100) NOT NULL,
  `User_image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_accounts`
--

INSERT INTO `client_accounts` (`id`, `User_username`, `User_email`, `User_password`, `User_image`) VALUES
(42, 'test123', 'test123@gmail.com', '$2y$10$OTdlMjMyNTRmNzM2NTMxYOb42rcn5lNicV9x0DAYOl0hN6/t74AXO', ''),
(43, 'ron123', 'ronpanes@gmail.com', '$2y$10$NWVkNzFhYzBlZjAyNmI3Ye6PRx4iQNsa0OrTKeznI3CgaOVZh.3WS', ''),
(44, 'gerald123', 'geraldtagle09@gmail.com', '$2y$10$OGYxZTQwZTljY2UwOGEzYOvGcYUf1cbpUQxMgSqG1zZbGsssoak5O', '');

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
(59, 42, 'test account', 'Male', '25', '1978-04-08', 'Olongapo City', '921312321', '87.00', '1.71', 'AB+', 'Anemic', 'Sinusitis', 'Yes', 'Yes', 'Yes', 'Yes', 'Occasionally', '2021-04-08 13:29:44', '0000-00-00 00:00:00', 'F'),
(60, 43, 'Ron Benedict Panes', 'Male', '21', '1997-04-12', 'West Bajac-Bajac, Olongapo City', '921327522', '90.00', '1.60', 'A+', 'Body Pain', 'Sinusitis', 'Yes', 'Yes', 'Yes', 'Yes', 'Occasionally', '2021-04-12 11:59:32', '0000-00-00 00:00:00', 'F'),
(61, 44, 'Gerald B. Tagle', 'Male', '22', '1999-09-09', 'Brgy. Pagasa, Olongapo City', '9301189136', '60.00', '1.71', 'O+', 'High Blood', 'Sinusitis, Cough', 'Yes', 'No', 'No', 'No', 'Occasionally', '2021-04-12 12:49:18', '0000-00-00 00:00:00', 'F');

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
  ADD KEY `U_id` (`U_id`);

--
-- Indexes for table `client_accounts`
--
ALTER TABLE `client_accounts`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`Doctor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  MODIFY `ap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `client_accounts`
--
ALTER TABLE `client_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `client_tbl`
--
ALTER TABLE `client_tbl`
  MODIFY `Client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `doctor_tbl`
--
ALTER TABLE `doctor_tbl`
  MODIFY `Doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkup_tbl`
--
ALTER TABLE `checkup_tbl`
  ADD CONSTRAINT `checkup_tbl_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `client_accounts` (`id`);

--
-- Constraints for table `client_tbl`
--
ALTER TABLE `client_tbl`
  ADD CONSTRAINT `client_tbl_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `client_accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
