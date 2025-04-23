-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 31, 2024 at 04:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinewave`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `screen_id` int(11) NOT NULL,
  `show_timing_id` int(11) NOT NULL,
  `booking_date` date NOT NULL DEFAULT current_timestamp(),
  `premium_seat_count` int(11) NOT NULL,
  `premium_seat_cost` decimal(5,2) NOT NULL,
  `executive_seat_count` int(11) NOT NULL,
  `executive_seat_cost` decimal(5,2) NOT NULL,
  `normal_seat_count` int(11) NOT NULL,
  `normal_seat_cost` decimal(5,2) NOT NULL,
  `total_cost` decimal(5,2) NOT NULL,
  `payment_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `movie_id`, `screen_id`, `show_timing_id`, `booking_date`, `premium_seat_count`, `premium_seat_cost`, `executive_seat_count`, `executive_seat_cost`, `normal_seat_count`, `normal_seat_cost`, `total_cost`, `payment_id`) VALUES
(7, 6, 11, 7, 19, '2024-03-22', 2, 30.00, 0, 0.00, 0, 0.00, 60.00, ''),
(8, 6, 28, 5, 3, '2024-03-22', 0, 0.00, 3, 36.00, 0, 0.00, 108.00, ''),
(9, 6, 28, 6, 16, '2024-03-23', 3, 54.00, 0, 0.00, 0, 0.00, 162.00, ''),
(11, 10, 11, 7, 8, '2024-03-31', 1, 20.00, 0, 0.00, 0, 0.00, 20.00, ''),
(12, 10, 11, 7, 19, '2024-03-31', 1, 20.00, 0, 0.00, 0, 0.00, 20.00, ''),
(13, 10, 28, 5, 21, '2024-03-31', 1, 16.00, 1, 12.00, 1, 10.00, 38.00, ''),
(14, 10, 11, 7, 19, '2024-03-31', 1, 20.00, 1, 12.00, 0, 0.00, 32.00, ''),
(15, 10, 11, 7, 19, '2024-03-31', 1, 20.00, 0, 0.00, 0, 0.00, 20.00, 'pi_3P0Oyh2LHIXdaHv905xyw90t');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `genre` text NOT NULL,
  `release_date` date NOT NULL,
  `language` varchar(50) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `rating` decimal(10,0) NOT NULL,
  `about` text NOT NULL,
  `cast` text NOT NULL,
  `poster` text NOT NULL,
  `banner` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `genre`, `release_date`, `language`, `duration_minutes`, `rating`, `about`, `cast`, `poster`, `banner`) VALUES
(5, 'Shadows in the Mist', 'Thriller', '2024-03-01', 'Spanish', 100, 2, 'Young old prove leader name identify itself lawyer life.', 'Karen Powers,  Jordan Willis,  Lisa Lutz', 'https://picsum.photos/seed/5/200/300', 'https://picsum.photos/seed/5/800/200'),
(7, 'Luca', 'Kids & family,Comedy', '2024-03-01', 'English', 100, 5, 'Set in a beautiful seaside town on the Italian Riviera, Disney and Pixar\'s original feature film \"Luca\" is a coming-of-age story about one young boy experiencing an unforgettable summer filled with gelato, pasta and endless scooter rides. Luca (voice of Jacob Tremblay) shares these adventures with his newfound best friend, Alberto (voice of Jack Dylan Grazer), but all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water\'s surface.', 'Jacob Tremblay,Jack Dylan,Emma Berman', 'https://picsum.photos/seed/7/200/300', 'https://picsum.photos/seed/7/800/200'),
(8, 'Inside Out', 'Kids & family,Comedy', '2024-03-01', 'English', 100, 5, 'Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco. Riley\'s emotions -- led by Joy (Amy Poehler) -- try to guide her through this difficult, life-changing event. However, the stress of the move brings Sadness (Phyllis Smith) to the forefront. When Joy and Sadness are inadvertently swept into the far reaches of Riley\'s mind, the only emotions left in Headquarters are Anger, Fear and Disgust.', 'Amy Poehler,Phyllis Smith,Richard Kind', 'https://picsum.photos/seed/8/200/300', 'https://picsum.photos/seed/8/800/200'),
(9, 'Finding Dory', 'Kids & family,Comedy', '2024-03-01', 'English', 100, 5, 'Dory (Ellen DeGeneres) is a wide-eyed, blue tang fish who suffers from memory loss every 10 seconds or so. The one thing she can remember is that she somehow became separated from her parents as a child. With help from her friends Nemo and Marlin, Dory embarks on an epic adventure to find them. Her journey brings her to the Marine Life Institute, a conservatory that houses diverse ocean species. Dory now knows that her family reunion will only happen if she can save mom and dad from captivity.', 'Ellen DeGeneres,Albert Brooks,Ed O\'Neil', 'https://picsum.photos/seed/9/200/300', 'https://picsum.photos/seed/9/800/200'),
(10, 'Ghostbusters: Frozen Empire', 'Adventure, Comedy, Fantasy', '2024-03-22', 'English', 115, 4, 'The discovery of an ancient artifact unleashes an evil force. Ghostbusters new and old must join forces to protect their home and save the world from a second ice age.', 'Paul Rudd, Carrie Coon, Finn Wolfhard, Mckenna Grace', 'https://picsum.photos/seed/10/200/300', 'https://picsum.photos/seed/10/800/200'),
(11, 'Dune: Part Two', 'Action, Adventure, Drama', '2024-01-01', 'English', 166, 9, 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 'Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem', 'https://picsum.photos/seed/11/200/300', 'https://picsum.photos/seed/11/800/200'),
(12, 'Joker: Folie à Deux', 'Crime, Drama, Musical', '2024-01-01', 'English', 120, 4, 'Sequel to the film \"Joker\" from 2019, further details of the plot are yet to be disclosed.', 'Joaquin Phoenix, Ken Leung, Zazie Beetz, Catherine Keener', 'https://picsum.photos/seed/picsum/200/300', 'https://picsum.photos/seed/picsum/800/200'),
(13, 'Furiosa: A Mad Max Saga', 'Action, Adventure, Sci-Fi', '2024-01-01', 'English', 120, 4, 'The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.', 'Anya Taylor-Joy, Chris Hemsworth, Nathan Jones, Charlee Fraser', 'https://picsum.photos/seed/picsum/200/300', 'https://picsum.photos/seed/picsum/800/200'),
(14, 'The Lord of the Rings: The War of the Rohirrim', 'Animation, Action, Adventure', '2024-01-01', 'English', 130, 4, 'The untold story behind Helm\'s Deep, focusing on the life of its founder, Helm Hammerhand, the King of Rohan.', 'Brian Cox, Miranda Otto, Shaun Dooley, Bilal Hasna', 'https://picsum.photos/seed/14/200/300', 'https://picsum.photos/seed/14/800/200'),
(15, 'Summoners', 'Horror', '2022-01-01', 'English', 100, 4, 'Jessica Whitman left her witchcraft behind when she left her hometown, embarking on a new, ordinary life.', 'Christine Nyland, McLean Peterson, Larry Fessenden, Madeline Grey DeFreece', 'https://picsum.photos/seed/15/200/300', 'https://picsum.photos/seed/15/800/200'),
(16, 'Midnight Peepshow', 'Horror', '2022-01-01', 'English', 100, 4, 'A Madame owns and operates a peepshow offering patrons tailor-made experiences.', 'Derek Nelson, Chiara D\'Anna, Bethan Walker, Jamie Bacon', 'https://picsum.photos/seed/16/200/300', 'https://picsum.photos/seed/16/800/200'),
(17, 'Somewhere Quiet', 'Horror', '2023-01-01', 'English', 100, 4, 'Months after escaping a brutal kidnapping, Meg travels with her husband to his family\'s isolated compound.', 'Marin Ireland, Micheál Richardson, Jennifer Kim, Kentucker Audley', 'https://picsum.photos/seed/picsum/200/300', 'https://picsum.photos/seed/picsum/800/200'),
(18, 'I Saw the TV Glow', 'Horror', '2024-01-01', 'English', 100, 4, 'Teenager Owen navigates suburban life when introduced to a mysterious television show.', 'Justice Smith, Brigette Lundy-Paine, Ian Foreman, Helena Howard', 'https://picsum.photos/seed/18/200/300', 'https://picsum.photos/seed/18/800/200'),
(19, 'Lovely, Dark, and Deep', 'Horror', '2023-01-01', 'English', 100, 4, 'Lennon, a back-country ranger, traverses dangerous wilderness to uncover the origins of a tragedy.', 'Georgina Campbell, Nick Blood, Wai Ching Ho, Edgar Morais', 'https://picsum.photos/seed/19/200/300', 'https://picsum.photos/seed/19/800/200'),
(20, 'Civil War', 'Drama', '2024-04-12', 'English', 120, 4, 'In a near-future America on the brink, the film portrays a race to the White House amid a national crisis.', 'Kirsten Dunst, Wagner Moura, Cailee Spaeny, Stephen McKinley Henderson, Jesse Plemons, Nick Offerman', 'https://picsum.photos/seed/20/200/300', 'https://picsum.photos/seed/20/800/200'),
(21, 'Abigail', 'Comedy, Horror', '2024-04-19', 'English', 120, 4, 'A group of criminals tasked with watching over a kidnapped ballerina, who is a vampire, for one night.', 'Melissa Barrera, Dan Stevens, Kathryn Newton, Angus Cloud, Kevin Durand, Alisha Weir', 'https://picsum.photos/seed/21/200/300', 'https://picsum.photos/seed/21/800/200'),
(22, 'The Ministry of Ungentlemanly Warfare', 'Action, Comedy', '2024-04-19', 'English', 120, 4, 'A secret military organization created in WWII battles Nazis, inspired by true events.', 'Henry Cavill, Eiza González, Henry Golding, Alan Ritchson, Cary Elwes, Til Schweiger, Alex Pettyfer', 'https://picsum.photos/seed/22/200/300', 'https://picsum.photos/seed/22/800/200'),
(23, 'Challengers', 'Drama', '2024-04-26', 'English', 120, 4, 'A tennis drama involving a prodigy-turned-coach, her husband, and his best friend, who is also her ex-boyfriend.', 'Zendaya, Josh O’Connor, Mike Faist', 'https://picsum.photos/seed/23/200/300', 'https://picsum.photos/seed/23/800/200'),
(24, 'The Fall Guy', 'Action', '2024-05-03', 'English', 120, 4, 'A stuntman moonlights as a bounty hunter in this adaptation of an ‘80s TV show.', 'Ryan Gosling, Emily Blunt', 'https://picsum.photos/seed/24/200/300', 'https://picsum.photos/seed/24/800/200'),
(25, 'Back to Black', 'Biopic', '2024-05-10', 'English', 120, 4, 'A biopic tracing the life and rise to fame of Amy Winehouse.', 'Marisa Abela, Jack O’Connell, Lesley Manville, Eddie Marsan', 'https://picsum.photos/seed/25/200/300', 'https://picsum.photos/seed/25/800/200'),
(26, 'Kingdom of the Planet of the Apes', 'Sci-Fi', '2024-05-10', 'English', 120, 4, 'The story continues many years after War for the Planet of the Apes.', 'Owen Teague, Freya Allan, Peter Macon, Eka Darville, Kevin Durand', 'https://picsum.photos/seed/26/200/300', 'https://picsum.photos/seed/26/800/200'),
(27, 'IF', 'Fantasy Comedy', '2024-05-17', 'English', 120, 4, 'A girl discovers she can see Imaginary Friends.', 'Ryan Reynolds, John Krasinski, Fiona Shaw, Steve Carell, Emily Blunt', 'https://picsum.photos/seed/27/200/300', 'https://picsum.photos/seed/27/800/200'),
(28, 'Furiosa: A Mad Max Saga', 'Action', '2024-05-25', 'English', 120, 5, 'Prequel to Mad Max: Fury Road, featuring a young Furiosa.', 'Anya Taylor-Joy, Chris Hemsworth, Tom Burke', 'https://picsum.photos/seed/28/200/300', 'https://picsum.photos/seed/28/800/200'),
(29, 'The Garfield Movie', 'Animation', '2024-05-24', 'English', 90, 4, 'Chris Pratt voices Garfield in this new movie adaptation.', 'Chris Pratt, Samuel L. Jackson, Nicholas Hoult', 'https://picsum.photos/seed/28/200/300', 'https://picsum.photos/seed/28/800/200');

-- --------------------------------------------------------

--
-- Table structure for table `screens`
--

CREATE TABLE `screens` (
  `id` int(11) NOT NULL,
  `screen_name` varchar(50) NOT NULL,
  `premium_seat_count` int(11) NOT NULL,
  `premium_seat_cost` decimal(5,2) NOT NULL,
  `executive_seat_count` int(11) NOT NULL,
  `executive_seat_cost` decimal(5,2) NOT NULL,
  `normal_seat_count` int(11) NOT NULL,
  `normal_seat_cost` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `screens`
--

INSERT INTO `screens` (`id`, `screen_name`, `premium_seat_count`, `premium_seat_cost`, `executive_seat_count`, `executive_seat_cost`, `normal_seat_count`, `normal_seat_cost`) VALUES
(5, 'Screen 1', 25, 16.00, 30, 12.00, 40, 10.00),
(6, 'Screen 2', 25, 18.00, 30, 12.00, 40, 10.00),
(7, 'Screen 3', 28, 20.00, 30, 12.00, 40, 10.00),
(8, 'Screen 4', 30, 22.00, 30, 12.00, 40, 10.00);

-- --------------------------------------------------------

--
-- Table structure for table `show_timings`
--

CREATE TABLE `show_timings` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `screen_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `show_timings`
--

INSERT INTO `show_timings` (`id`, `movie_id`, `screen_id`, `date`, `time`) VALUES
(3, 28, 5, '2024-03-22', '19:30:00'),
(4, 28, 5, '2024-03-31', '10:00:00'),
(5, 20, 6, '2024-03-30', '14:15:00'),
(6, 25, 6, '2024-03-31', '18:04:00'),
(7, 8, 7, '2024-04-01', '09:30:00'),
(8, 11, 7, '2024-04-05', '10:05:00'),
(9, 7, 7, '2024-03-25', '13:05:00'),
(10, 12, 8, '2024-03-29', '19:06:00'),
(11, 22, 5, '2024-04-05', '13:15:00'),
(12, 18, 6, '2024-04-07', '09:15:00'),
(13, 5, 8, '2024-04-07', '12:05:00'),
(14, 28, 5, '2024-03-29', '09:10:00'),
(15, 28, 6, '2024-04-06', '10:30:00'),
(16, 28, 6, '2024-03-23', '12:00:00'),
(17, 22, 5, '2024-04-06', '09:00:00'),
(18, 22, 6, '2024-04-12', '22:20:00'),
(19, 11, 7, '2024-04-05', '17:20:00'),
(20, 28, 6, '2024-03-23', '08:35:00'),
(21, 28, 5, '2024-03-23', '08:35:00'),
(22, 28, 5, '2024-03-25', '08:35:00'),
(23, 28, 5, '2024-03-26', '08:36:00'),
(24, 28, 5, '2024-03-28', '08:36:00'),
(25, 13, 6, '2024-03-23', '09:40:00'),
(26, 13, 7, '2024-03-23', '10:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` binary(60) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
(6, 'Mariya', 'Antony', 'mariyaantonyn13@gmail.com', 0x243262243132245a7a423835476854314d51705174577138466d5256756b436a73583157634a516f43774a5433694e6530684b4d36426c4748426c57, 'user'),
(8, 'Admin', '123', 'admin@gmail.com', 0x243262243132247041586f6b5944586e786d4863664d41755a756434656f537a3268317547364f4935793934497774632f2f3152734a536f7a2f4b2e, 'admin'),
(9, 'shinu', 'isaac', 'shinu@gmail.com', 0x2432622431322432366c2e776b544d37534e73514170576a463231347567586c6c44556678622e384870636b754c662f47664a517a37654f74374a65, 'user'),
(10, 'Justin', 'Joy', 'justinjoyn@gmail.com', 0x24326224313224794458624742436c3258503565734d62694e3447434f4c4b74734f7a502f6461657259663835554e752f6e625a352f42384e724e61, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `screen_id` (`screen_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `show_timing_id` (`show_timing_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `screens`
--
ALTER TABLE `screens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `show_timings`
--
ALTER TABLE `show_timings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slot_id` (`time`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `screens`
--
ALTER TABLE `screens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `show_timings`
--
ALTER TABLE `show_timings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `screen_id` FOREIGN KEY (`screen_id`) REFERENCES `screens` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `show_timing_id` FOREIGN KEY (`show_timing_id`) REFERENCES `show_timings` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE NO ACTION;

--
-- Constraints for table `show_timings`
--
ALTER TABLE `show_timings`
  ADD CONSTRAINT `movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
