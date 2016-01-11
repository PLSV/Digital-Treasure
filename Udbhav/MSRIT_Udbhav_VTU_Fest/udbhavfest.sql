-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2016 at 09:04 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `udbhavfest`
--

-- --------------------------------------------------------

--
-- Table structure for table `auditions`
--

CREATE TABLE IF NOT EXISTS `auditions` (
  `Filename` varchar(60) NOT NULL,
  `Auditioner` varchar(90) NOT NULL,
  `USN` varchar(10) NOT NULL,
  PRIMARY KEY (`Filename`),
  KEY `USN` (`USN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auditions`
--

INSERT INTO `auditions` (`Filename`, `Auditioner`, `USN`) VALUES
('N/A', 'N/A', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `college`
--

CREATE TABLE IF NOT EXISTS `college` (
  `College_Code` varchar(7) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Location` varchar(180) NOT NULL,
  `Affliation` varchar(10) NOT NULL,
  PRIMARY KEY (`College_Code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `college`
--

INSERT INTO `college` (`College_Code`, `Name`, `Location`, `Affliation`) VALUES
('N/A', 'N/A', 'N/A', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `Event_Code` varchar(7) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Venue` varchar(20) NOT NULL,
  `Time` time NOT NULL,
  `Date` date NOT NULL,
  `Duration` int(1) NOT NULL,
  `Cood_USN` varchar(10) NOT NULL,
  PRIMARY KEY (`Event_Code`),
  KEY `Cood_USN` (`Cood_USN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`Event_Code`, `Name`, `Venue`, `Time`, `Date`, `Duration`, `Cood_USN`) VALUES
('N/A', 'N/A', 'N/A', '00:00:00', '0000-00-00', 0, 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `msrit_students`
--

CREATE TABLE IF NOT EXISTS `msrit_students` (
  `FName` varchar(30) NOT NULL,
  `MInit` varchar(30) NOT NULL,
  `LName` varchar(30) NOT NULL,
  `USN` varchar(10) NOT NULL,
  `Semester` int(2) NOT NULL,
  `Department` varchar(60) NOT NULL,
  `PhoneNo` bigint(11) NOT NULL,
  PRIMARY KEY (`USN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `msrit_students`
--

INSERT INTO `msrit_students` (`FName`, `MInit`, `LName`, `USN`, `Semester`, `Department`, `PhoneNo`) VALUES
('N/A', 'N/A', 'N/A', 'N/A', 0, 'N/A', 0);

-- --------------------------------------------------------

--
-- Table structure for table `non_msrit_students`
--

CREATE TABLE IF NOT EXISTS `non_msrit_students` (
  `FName` varchar(30) NOT NULL,
  `MInit` varchar(30) NOT NULL,
  `LName` varchar(30) NOT NULL,
  `USN` varchar(10) NOT NULL,
  `Coll_ID` varchar(7) NOT NULL,
  `PhoneNo` bigint(11) NOT NULL,
  PRIMARY KEY (`USN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `non_msrit_students`
--

INSERT INTO `non_msrit_students` (`FName`, `MInit`, `LName`, `USN`, `Coll_ID`, `PhoneNo`) VALUES
('N/A', 'N/A', 'N/A', 'N/A', 'N/A', 0);

-- --------------------------------------------------------

--
-- Table structure for table `participation`
--

CREATE TABLE IF NOT EXISTS `participation` (
  `MSRIT_USN` varchar(10) NOT NULL,
  `NON_MSRIT_USN` varchar(10) NOT NULL,
  `Evt_Code` varchar(7) NOT NULL,
  KEY `MSRIT_USN` (`MSRIT_USN`),
  KEY `NON_MSRIT_USN` (`NON_MSRIT_USN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `participation`
--

INSERT INTO `participation` (`MSRIT_USN`, `NON_MSRIT_USN`, `Evt_Code`) VALUES
('N/A', 'N/A', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `stalls`
--

CREATE TABLE IF NOT EXISTS `stalls` (
  `Stall_Code` varchar(15) NOT NULL,
  `Name` varchar(70) NOT NULL,
  `Product` varchar(100) NOT NULL,
  `Owner` varchar(70) NOT NULL,
  `Mgr_USN` varchar(10) NOT NULL,
  PRIMARY KEY (`Stall_Code`),
  KEY `Mgr_USN` (`Mgr_USN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stalls`
--

INSERT INTO `stalls` (`Stall_Code`, `Name`, `Product`, `Owner`, `Mgr_USN`) VALUES
('N/A', 'N/A', 'N/A', 'N/A', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `volunteering`
--

CREATE TABLE IF NOT EXISTS `volunteering` (
  `FName` varchar(30) NOT NULL,
  `MInit` varchar(30) NOT NULL,
  `LName` varchar(30) NOT NULL,
  `Semester` int(2) NOT NULL,
  `V_USN` varchar(10) NOT NULL,
  `Department` varchar(30) NOT NULL,
  `PhoneNo` bigint(11) NOT NULL,
  `Event_Code` varchar(10) NOT NULL,
  KEY `V_USN` (`V_USN`),
  KEY `Event_Code` (`Event_Code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `volunteering`
--

INSERT INTO `volunteering` (`FName`, `MInit`, `LName`, `Semester`, `V_USN`, `Department`, `PhoneNo`, `Event_Code`) VALUES
('N/A', 'N/A', 'N/A', 0, 'N/A', 'N/A', 0, 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `winners`
--

CREATE TABLE IF NOT EXISTS `winners` (
  `MSRIT_Winner` varchar(10) NOT NULL,
  `Non_MSRIT_Winner` varchar(10) NOT NULL,
  `Event_Code` varchar(10) NOT NULL,
  `Prize` varchar(20) NOT NULL,
  KEY `MSRIT_Winner` (`MSRIT_Winner`),
  KEY `Non_MSRIT_Winner` (`Non_MSRIT_Winner`),
  KEY `Event_Code` (`Event_Code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `winners`
--

INSERT INTO `winners` (`MSRIT_Winner`, `Non_MSRIT_Winner`, `Event_Code`, `Prize`) VALUES
('N/A', 'N/A', 'N/A', 'N/A');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auditions`
--
ALTER TABLE `auditions`
  ADD CONSTRAINT `auditions_ibfk_1` FOREIGN KEY (`USN`) REFERENCES `msrit_students` (`USN`);

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`Cood_USN`) REFERENCES `msrit_students` (`USN`);

--
-- Constraints for table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`MSRIT_USN`) REFERENCES `msrit_students` (`USN`),
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`NON_MSRIT_USN`) REFERENCES `non_msrit_students` (`USN`);

--
-- Constraints for table `stalls`
--
ALTER TABLE `stalls`
  ADD CONSTRAINT `stalls_ibfk_1` FOREIGN KEY (`Mgr_USN`) REFERENCES `msrit_students` (`USN`);

--
-- Constraints for table `volunteering`
--
ALTER TABLE `volunteering`
  ADD CONSTRAINT `volunteering_ibfk_1` FOREIGN KEY (`V_USN`) REFERENCES `msrit_students` (`USN`),
  ADD CONSTRAINT `volunteering_ibfk_2` FOREIGN KEY (`Event_Code`) REFERENCES `event` (`Event_Code`);

--
-- Constraints for table `winners`
--
ALTER TABLE `winners`
  ADD CONSTRAINT `winners_ibfk_1` FOREIGN KEY (`MSRIT_Winner`) REFERENCES `msrit_students` (`USN`),
  ADD CONSTRAINT `winners_ibfk_2` FOREIGN KEY (`Non_MSRIT_Winner`) REFERENCES `non_msrit_students` (`USN`),
  ADD CONSTRAINT `winners_ibfk_3` FOREIGN KEY (`Event_Code`) REFERENCES `event` (`Event_Code`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
