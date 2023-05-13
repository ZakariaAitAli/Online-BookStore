-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2023 at 04:34 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `type` enum('Magazine','Novel','Life','Arts','Comics','Education & Reference','Humanities & Social Sciences','Science & Technology','Kids','Sports') NOT NULL,
  `published_at` datetime NOT NULL,
  `stock` int(11) DEFAULT 0,
  `price` decimal(15,2) DEFAULT 0.00,
  `author` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `type`, `published_at`, `stock`, `price`, `author`) VALUES
(1, 'The Great Gatsby', 'Novel', '1925-04-10 00:00:00', 100, '9.99', 'F. Scott Fitzgerald'),
(2, 'To Kill a Mockingbird', 'Novel', '1960-07-11 00:00:00', 50, '8.99', 'Harper Lee'),
(3, 'The Catcher in the Rye', 'Novel', '1951-07-16 00:00:00', 75, '7.99', 'J.D. Salinger'),
(6, 'Harry Potter', 'Novel', '1997-06-26 00:00:00', 200, '12.99', 'J.K. Rowling'),
(7, 'The New Yorker', 'Magazine', '1925-02-21 00:00:00', 500, '2.99', 'William Shawn'),
(9, 'National Geographic', 'Magazine', '1888-10-01 00:00:00', 150, '4.99', 'Alexander Graham Bell'),
(11, 'To Kill a Mockingbird', 'Novel', '1960-07-11 00:00:00', 50, '8.99', 'Harper Lee'),
(12, 'Pride and Prejudice', 'Novel', '1813-01-28 00:00:00', 80, '7.99', 'Jane Austen'),
(15, 'To the Lighthouse', 'Novel', '1927-05-05 00:00:00', 60, '6.49', 'Virginia Woolf'),
(16, 'Brave New World', 'Novel', '1932-06-11 00:00:00', 90, '7.49', 'Aldous Huxley'),
(18, 'The Catcher in the Rye', 'Novel', '1951-07-16 00:00:00', 75, '7.99', 'J.D. Salinger'),
(20, 'The Lord of the Rings', 'Novel', '1954-07-29 00:00:00', 150, '12.99', 'J.R.R. Tolkien');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `balance` decimal(15,2) DEFAULT 0.00,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `balance`, `email`, `password`) VALUES
(1, '500.00', 'zakaria@gmail.com', 'qwertyuiop'),
(2, '600.00', 'hamid', 'qwertyuiop'),
(3, '100.00', 'zineb@gmail.com', 'qwertyuiop'),
(4, '100.00', 'jaafar@gmail.com', 'qwertyuiop');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
