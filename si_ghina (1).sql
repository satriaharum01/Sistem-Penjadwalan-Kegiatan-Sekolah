-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 19, 2025 at 07:47 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si_ghina`
--

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id` int(11) NOT NULL,
  `nama_guru` varchar(30) NOT NULL,
  `kode` char(3) NOT NULL,
  `jam_kerja` int(3) NOT NULL,
  `jabatan` varchar(15) NOT NULL,
  `tugas_tambahan` varchar(50) NOT NULL,
  `status` char(10) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id`, `nama_guru`, `kode`, `jam_kerja`, `jabatan`, `tugas_tambahan`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
(8, 'RISA HAYADI, S.Pd', 'RH', 18, 'Guru', '-', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(9, 'MARDIANA LAOWO,S.Th', 'MD', 21, 'Guru', '-', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(10, 'SUSILAWATI SALABI, S.Pd ', 'SL', 24, 'Guru', 'Wali Kelas 7.6', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(7, 'MUHAMMAD DZAKIR,S.Pd', 'MZ', 21, 'Guru', 'Wali Kelas 8.10', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(11, 'ROSNAULI PANE, S.Pd', 'RT', 24, 'Guru', 'Wali Kelas 7.4', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(12, 'TUMPAL FERDINAN HUTAJULU, S.Pd', 'TF', 18, 'Guru', 'Petugas Piket', 'PPPK', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(13, 'INDAH KUMARA PUTRI, S.Pd', 'IK', 6, 'Guru', 'Wali Kelas 7.7/UKS', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(14, 'CHAIRIYAH SITOMPUL. S.Pd', 'CH', 28, 'Guru', 'Wali Kelas 7.5', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(15, 'RAHMAYANTI, S.Pd', 'RY', 28, 'Guru', '-', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(16, 'Dra. MARIYANTI', 'MY', 30, 'Guru', 'Wali Kelas 9.5', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(17, 'ELY FRIDA, S.Pd', 'EF', 30, 'Guru', 'Wali Kelas 9.4', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(18, 'SITI SUNDARI, S.Pd', 'SI', 30, 'Guru', '-', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(19, 'Dra. EBEN EZER', 'EB', 30, 'Guru', '-', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(20, 'MATONDANG SIMAMORA, S.Pd', 'MM', 28, 'Guru', 'Wali Kelas 7.8', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(21, 'MUTI APRIANI HUTASUHUT, S.Pd', 'MT', 23, 'Guru', 'Wali Kelas 7.2', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(23, 'SUSILAWATI SIGALINGGING, S.Pd', 'SG', 15, 'Guru', 'Wali Kelas 7.3', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(24, 'FACHRUZIE SATRYA NORIS, S.Pd', 'FS', 15, 'Guru', 'Wali Kelas 7.9', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(25, 'SUMARDI SITANGGANG, S.Pd', 'ST', 24, 'Guru', 'Wali Kelas 7.1', 'PPPK', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(26, 'FUAD HASAN LUBIS,S.Pd', 'FL', 12, 'Guru', 'Wali Kelas 8.9 /BK K', 'Honorer', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(27, 'MURLAN NAIDA, M.KOM', 'MU', 28, 'Guru', 'Wali Kelas 8.2', 'ASN', NULL, '2025-05-12 17:21:16', '2025-05-12 17:21:16'),
(28, 'WIDYA KARTIKA SITUMORANG, S.Pd', 'WI', 19, 'Guru', 'Wali Kelas 7.10', 'Honorer', NULL, '2025-05-12 10:27:07', '2025-05-12 10:27:07');

-- --------------------------------------------------------

--
-- Table structure for table `guru_mapel`
--

CREATE TABLE `guru_mapel` (
  `id` int(11) NOT NULL,
  `guru_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guru_mapel`
--

INSERT INTO `guru_mapel` (`id`, `guru_id`, `mapel_id`, `created_at`, `updated_at`) VALUES
(11, 17, 1, '2025-05-12 11:38:14', '2025-05-12 11:38:14'),
(7, 14, 6, '2025-05-12 11:32:19', '2025-05-12 11:32:19'),
(10, 16, 1, '2025-05-12 11:36:18', '2025-05-12 11:36:18'),
(9, 19, 2, '2025-05-12 11:35:59', '2025-05-12 11:35:59'),
(12, 24, 8, '2025-05-12 11:39:04', '2025-05-12 11:39:04'),
(13, 26, 13, '2025-05-16 08:19:47', '2025-05-16 08:19:47'),
(14, 13, 5, '2025-05-16 08:20:06', '2025-05-16 08:20:06'),
(15, 9, 10, '2025-05-16 08:20:25', '2025-05-16 08:20:25'),
(16, 20, 9, '2025-05-16 08:20:41', '2025-05-16 08:20:41'),
(17, 7, 10, '2025-05-16 08:21:02', '2025-05-16 08:21:02'),
(18, 27, 12, '2025-05-16 08:21:21', '2025-05-16 08:21:21'),
(19, 21, 9, '2025-05-16 08:21:52', '2025-05-16 08:21:52'),
(20, 21, 11, '2025-05-16 08:21:52', '2025-05-16 08:21:52'),
(21, 15, 6, '2025-05-16 08:22:09', '2025-05-16 08:22:09'),
(22, 8, 10, '2025-05-16 08:22:31', '2025-05-16 08:22:31'),
(23, 11, 5, '2025-05-16 08:22:53', '2025-05-16 08:22:53'),
(24, 18, 2, '2025-05-16 08:23:22', '2025-05-16 08:23:22'),
(25, 25, 13, '2025-05-16 08:23:44', '2025-05-16 08:23:44'),
(26, 10, 5, '2025-05-16 08:24:12', '2025-05-16 08:24:12'),
(27, 23, 8, '2025-05-16 08:24:31', '2025-05-16 08:24:31'),
(28, 12, 5, '2025-05-16 08:24:55', '2025-05-16 08:24:55'),
(29, 28, 11, '2025-05-16 08:25:40', '2025-05-16 08:25:40'),
(30, 28, 9, '2025-05-16 08:25:40', '2025-05-16 08:25:40');

-- --------------------------------------------------------

--
-- Table structure for table `guru_piket`
--

CREATE TABLE `guru_piket` (
  `id` int(11) NOT NULL,
  `hari` varchar(10) NOT NULL,
  `guru_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `id` int(11) NOT NULL,
  `kelas_id` int(11) NOT NULL,
  `mapel_id` int(11) DEFAULT NULL,
  `guru_id` int(11) DEFAULT NULL,
  `slot_id` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id`, `kelas_id`, `mapel_id`, `guru_id`, `slot_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 19, '51', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(2, 1, 2, 19, '52', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(3, 1, 2, 19, '53', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(4, 1, 2, 19, '69', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(5, 1, 2, 19, '70', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(6, 1, 1, 17, '54', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(7, 1, 1, 17, '55', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(8, 1, 1, 17, '96', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(9, 1, 1, 17, '71', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(10, 1, 1, 17, '72', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(11, 1, 8, 23, '73', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(12, 1, 8, 23, '101', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(13, 1, 8, 23, '57', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(14, 1, 5, 11, '102', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(15, 1, 5, 11, '58', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(16, 1, 5, 11, '59', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(17, 1, 5, 11, '60', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(18, 1, 5, 11, '61', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(19, 1, 5, 11, '75', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(20, 1, 6, 14, '97', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(21, 1, 6, 14, '98', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(22, 1, 6, 14, '76', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(23, 1, 6, 14, '77', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(24, 1, 11, 28, '78', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(25, 1, 11, 28, '103', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(26, 1, 11, 28, '63', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(27, 1, 9, 21, '64', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(28, 1, 9, 21, '65', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(29, 1, 9, 21, '66', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(30, 1, 9, 21, '80', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(31, 1, 13, 25, '67', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(32, 1, 13, 25, '99', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(33, 1, 13, 25, '81', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(34, 1, 12, 27, '100', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(35, 1, 12, 27, '82', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(36, 1, 10, 9, '83', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(37, 1, 10, 9, '84', '2025-05-19 17:33:00', '2025-05-19 17:33:00'),
(38, 1, 10, 9, '104', '2025-05-19 17:33:00', '2025-05-19 17:33:00');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `nama_kelas` varchar(15) NOT NULL,
  `tingkat` char(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `nama_kelas`, `tingkat`, `created_at`, `updated_at`) VALUES
(1, 'VII-1', 'VII', '2025-05-08 15:14:36', '2025-05-08 15:14:36'),
(2, 'VII-2', 'VII', '2025-05-08 15:14:36', '2025-05-08 15:14:36'),
(3, 'VII-3', 'VII', '2025-05-08 15:14:49', '2025-05-08 15:14:49'),
(4, 'VII-4', 'VII', '2025-05-08 15:14:49', '2025-05-08 15:14:49'),
(5, 'VII-5', 'VII', '2025-05-12 10:11:09', '2025-05-12 10:11:09'),
(6, 'VII-6', 'VII', '2025-05-12 10:11:19', '2025-05-12 10:11:19'),
(7, 'VII-7', 'VII', '2025-05-12 10:11:30', '2025-05-12 10:11:30'),
(8, 'VII-8', 'VII', '2025-05-12 10:11:44', '2025-05-12 10:11:44'),
(9, 'VII-9', 'VII', '2025-05-12 10:12:32', '2025-05-12 10:12:32'),
(10, 'VII-10', 'VII', '2025-05-12 10:12:41', '2025-05-12 10:12:41');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_mapel`
--

CREATE TABLE `kelas_mapel` (
  `id` int(11) NOT NULL,
  `kelas_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `total_jam` int(2) NOT NULL DEFAULT 2,
  `min_pertemuan` int(2) NOT NULL,
  `max_pertemuan` int(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas_mapel`
--

INSERT INTO `kelas_mapel` (`id`, `kelas_id`, `mapel_id`, `total_jam`, `min_pertemuan`, `max_pertemuan`, `created_at`, `updated_at`) VALUES
(50, 1, 2, 5, 2, 3, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(49, 1, 1, 5, 2, 4, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(48, 1, 8, 3, 1, 2, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(47, 1, 5, 6, 3, 4, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(46, 1, 6, 4, 2, 2, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(45, 1, 11, 3, 1, 2, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(44, 1, 9, 4, 2, 3, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(43, 1, 13, 3, 1, 2, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(42, 1, 12, 2, 1, 1, '2025-05-16 09:45:12', '2025-05-16 09:45:12'),
(41, 1, 10, 3, 1, 2, '2025-05-16 09:45:12', '2025-05-16 09:45:12');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_mapel_guru`
--

CREATE TABLE `kelas_mapel_guru` (
  `id` int(11) NOT NULL,
  `kelas_mapel_id` int(11) NOT NULL,
  `guru_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas_mapel_guru`
--

INSERT INTO `kelas_mapel_guru` (`id`, `kelas_mapel_id`, `guru_id`, `created_at`, `updated_at`) VALUES
(21, 41, 9, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(23, 42, 27, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(22, 41, 7, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(24, 43, 25, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(25, 44, 21, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(26, 45, 28, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(27, 46, 14, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(28, 47, 11, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(30, 49, 17, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(29, 48, 23, '2025-05-16 16:45:12', '2025-05-16 16:45:12'),
(31, 50, 19, '2025-05-16 16:45:12', '2025-05-16 16:45:12');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id` int(11) NOT NULL,
  `nama_mapel` varchar(50) NOT NULL,
  `kode` varchar(8) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id`, `nama_mapel`, `kode`, `created_at`, `updated_at`) VALUES
(1, 'MATEMATIKA', 'MM', '2025-05-08 06:08:56', '2025-05-08 06:08:56'),
(2, 'ILMU PENGETAHUAN ALAM', 'IPA', '2025-05-08 06:08:56', '2025-05-08 06:08:56'),
(8, 'SENI BUDAYA', 'SBK', '2025-05-12 11:38:53', '2025-05-12 11:38:53'),
(5, 'BAHASA INDONESIA', 'B.IND', '2025-05-08 06:09:43', '2025-05-08 06:09:43'),
(6, 'BAHASA INGGRIS', 'B.ING', '2025-05-08 06:09:43', '2025-05-08 06:09:43'),
(9, 'ILMU PENGETAHUAN SOSIAL', 'IPS', '2025-05-12 11:42:23', '2025-05-12 11:42:23'),
(10, 'AGAMA', 'AGAMA', '2025-05-12 11:43:54', '2025-05-12 11:43:54'),
(11, 'PENDIDIKAN PANCASILA', 'PP', '2025-05-12 11:44:26', '2025-05-12 11:44:26'),
(12, 'TEKNOLOGI INFORMASI KOMUNIKASI', 'TIK', '2025-05-12 11:44:52', '2025-05-12 11:44:52'),
(13, 'PENDIDIKAN JASMANI, OLAHRAGA KESEHATAN', 'PJOK', '2025-05-12 11:45:40', '2025-05-12 11:45:40');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE `slots` (
  `id` int(11) NOT NULL,
  `hari` varchar(10) NOT NULL,
  `mulai` time NOT NULL,
  `selesai` time NOT NULL,
  `jenis` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slots`
--

INSERT INTO `slots` (`id`, `hari`, `mulai`, `selesai`, `jenis`, `created_at`, `updated_at`) VALUES
(50, 'Senin', '07:15:00', '08:10:00', 'Upacara', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(51, 'Senin', '08:10:00', '08:50:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(52, 'Senin', '08:50:00', '09:30:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(53, 'Senin', '09:45:00', '10:25:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(54, 'Senin', '10:25:00', '11:05:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(55, 'Senin', '11:20:00', '12:00:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(56, 'Selasa', '07:15:00', '07:30:00', 'Selasa Motivasi', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(57, 'Selasa', '07:30:00', '08:10:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(58, 'Selasa', '08:10:00', '08:50:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(59, 'Selasa', '08:50:00', '09:30:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(60, 'Selasa', '09:45:00', '10:25:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(61, 'Selasa', '10:25:00', '11:05:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(62, 'Rabu', '07:15:00', '07:30:00', 'Rame Rame', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(63, 'Rabu', '07:30:00', '08:10:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(64, 'Rabu', '08:10:00', '08:50:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(65, 'Rabu', '08:50:00', '09:30:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(66, 'Rabu', '09:45:00', '10:25:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(67, 'Rabu', '10:25:00', '11:05:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(68, 'Kamis', '07:15:00', '07:30:00', 'Kamis Saberling', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(69, 'Kamis', '07:30:00', '08:10:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(70, 'Kamis', '08:10:00', '08:50:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(71, 'Kamis', '08:50:00', '09:30:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(72, 'Kamis', '09:45:00', '10:25:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(73, 'Kamis', '10:25:00', '11:05:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(74, 'Jumat', '07:15:00', '08:10:00', 'Religi', '2025-05-09 18:37:36', '2025-05-16 08:48:53'),
(75, 'Jumat', '08:10:00', '08:50:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(76, 'Jumat', '08:50:00', '09:30:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(77, 'Jumat', '09:45:00', '10:25:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(78, 'Jumat', '10:25:00', '11:05:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(79, 'Sabtu', '07:15:00', '08:10:00', 'Sabtu Ceria', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(80, 'Sabtu', '08:10:00', '08:50:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(81, 'Sabtu', '08:50:00', '09:30:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(82, 'Sabtu', '09:45:00', '10:25:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(83, 'Sabtu', '10:25:00', '11:05:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(84, 'Sabtu', '11:20:00', '12:00:00', 'Mata Pelajaran', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(85, 'Senin', '09:30:00', '09:45:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(86, 'Senin', '11:05:00', '11:20:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(87, 'Selasa', '09:30:00', '09:45:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(88, 'Selasa', '11:05:00', '11:20:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(89, 'Rabu', '09:30:00', '09:45:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(90, 'Rabu', '11:05:00', '11:20:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(91, 'Kamis', '09:30:00', '09:45:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(92, 'Kamis', '11:05:00', '11:20:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(93, 'Jumat', '09:30:00', '09:45:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(94, 'Sabtu', '09:30:00', '09:45:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(95, 'Sabtu', '11:05:00', '11:20:00', 'Istirahat', '2025-05-09 18:37:36', '2025-05-09 18:37:36'),
(96, 'Senin', '12:00:00', '12:40:00', 'Mata Pelajaran', '2025-05-16 08:32:15', '2025-05-16 08:32:15'),
(97, 'Selasa', '11:20:00', '12:00:00', 'Mata Pelajaran', '2025-05-16 08:43:09', '2025-05-16 08:43:09'),
(98, 'Selasa', '12:00:00', '12:40:00', 'Mata Pelajaran', '2025-05-16 08:43:29', '2025-05-16 08:43:29'),
(99, 'Rabu', '11:20:00', '12:00:00', 'Mata Pelajaran', '2025-05-16 08:44:04', '2025-05-16 08:44:04'),
(100, 'Rabu', '12:00:00', '12:40:00', 'Mata Pelajaran', '2025-05-16 08:44:33', '2025-05-16 08:44:33'),
(101, 'Kamis', '11:20:00', '12:00:00', 'Mata Pelajaran', '2025-05-16 08:45:27', '2025-05-16 08:45:27'),
(102, 'Kamis', '12:00:00', '12:40:00', 'Mata Pelajaran', '2025-05-16 08:45:42', '2025-05-16 08:45:42'),
(103, 'Jumat', '11:05:00', '11:45:00', 'Mata Pelajaran', '2025-05-16 08:52:10', '2025-05-16 08:52:10'),
(104, 'Sabtu', '12:00:00', '12:40:00', 'Mata Pelajaran', '2025-05-16 08:53:40', '2025-05-16 08:53:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('Administrator','Guru') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Guru',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `faces` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.png',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `level`, `remember_token`, `last_login`, `faces`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2y$10$.zyv.mN4ewS36HGJcBDXWua88yylf2MwZRK3603IZfRfoNZhJEvHy', 'Administrator', NULL, '2025-05-19 05:29:13', 'default.png', '2024-10-20 01:44:16', '2025-05-19 05:29:13'),
(2, 'Muhammad Edi', 'm_edi@gmail.com', '$2y$10$.zyv.mN4ewS36HGJcBDXWua88yylf2MwZRK3603IZfRfoNZhJEvHy', 'Guru', NULL, '2025-05-02 17:38:33', 'default.png', '2024-10-20 01:44:16', '2024-12-06 17:31:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guru_mapel`
--
ALTER TABLE `guru_mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guru_piket`
--
ALTER TABLE `guru_piket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas_mapel`
--
ALTER TABLE `kelas_mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas_mapel_guru`
--
ALTER TABLE `kelas_mapel_guru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slots`
--
ALTER TABLE `slots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `guru_mapel`
--
ALTER TABLE `guru_mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `guru_piket`
--
ALTER TABLE `guru_piket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `kelas_mapel`
--
ALTER TABLE `kelas_mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `kelas_mapel_guru`
--
ALTER TABLE `kelas_mapel_guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
