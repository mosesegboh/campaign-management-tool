-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 27, 2025 at 02:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campaign_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisers`
--

CREATE TABLE `advertisers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `advertisers`
--

INSERT INTO `advertisers` (`id`, `user_id`, `name`, `email`, `created_at`, `updated_at`) VALUES
(1, 2, 'jerry', 'jerry@yahoo.com', '2025-01-26 07:22:32', '2025-01-26 07:22:32');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `advertiser_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `landing_page_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_status` enum('active','paused') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'paused',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `advertiser_id`, `title`, `landing_page_url`, `activity_status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Test campaign', 'https://test.url.com/laravel', 'active', '2025-01-26 18:54:12', '2025-01-26 20:36:56'),
(2, 1, 'another ad', 'https://another.com', 'paused', '2025-01-26 20:36:38', '2025-01-26 20:36:38');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_payouts`
--

CREATE TABLE `campaign_payouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campaign_id` bigint(20) UNSIGNED NOT NULL,
  `country` enum('Estonia','Spain','Bulgaria') COLLATE utf8mb4_unicode_ci NOT NULL,
  `payout_value` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaign_payouts`
--

INSERT INTO `campaign_payouts` (`id`, `campaign_id`, `country`, `payout_value`, `created_at`, `updated_at`) VALUES
(1, 1, 'Estonia', '2.00', '2025-01-26 18:54:12', '2025-01-26 18:54:12'),
(2, 2, 'Estonia', '2.00', '2025-01-26 20:36:38', '2025-01-26 20:36:38'),
(3, 2, 'Spain', '2.00', '2025-01-26 20:36:38', '2025-01-26 20:36:38');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_23_045850_create_personal_access_tokens_table', 1),
(5, '2025_01_23_133301_create_advertisers_table', 1),
(6, '2025_01_23_150032_create_campaigns_table', 1),
(7, '2025_01_23_152947_create_campaign_payouts_table', 1),
(8, '2025_01_24_095741_add_user_id_to_advertisers_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(4, 'App\\Models\\User', 2, 'auth_token', 'd0913c47a9d2bdaceb700fdb97d00e81914893b3c98eead8c5266e1031c3ff1b', '[\"*\"]', '2025-01-26 18:51:01', NULL, '2025-01-26 18:50:18', '2025-01-26 18:51:01'),
(5, 'App\\Models\\User', 2, 'auth_token', '63276ff84f2c80046f565c68d9d5eb8b67080539536754a1de9faf9535c873c4', '[\"*\"]', '2025-01-26 18:51:39', NULL, '2025-01-26 18:51:05', '2025-01-26 18:51:39'),
(7, 'App\\Models\\User', 2, 'auth_token', 'def08a6de36926e4c0f6289a10197974fbf0f6d51dd06b5bf61e048cabfa89c8', '[\"*\"]', '2025-01-26 18:53:41', NULL, '2025-01-26 18:53:07', '2025-01-26 18:53:41'),
(8, 'App\\Models\\User', 2, 'auth_token', 'fcabfd4af1ef2f096ebb7eed9eba70839bd466cfd5745775c46adcbf727e9cf3', '[\"*\"]', '2025-01-26 18:55:57', NULL, '2025-01-26 18:53:45', '2025-01-26 18:55:57'),
(9, 'App\\Models\\User', 2, 'auth_token', 'e7193816ce460575bec74bf0cfb265345a39be3f1b74f9cb5a9ef45878a3664b', '[\"*\"]', '2025-01-26 20:17:13', NULL, '2025-01-26 18:56:01', '2025-01-26 20:17:13'),
(12, 'App\\Models\\User', 2, 'auth_token', 'c9820117631760b42f8c7f8398892a5b1c2e04330ad01117e0a31ea78cc86838', '[\"*\"]', '2025-01-26 20:32:15', NULL, '2025-01-26 20:32:10', '2025-01-26 20:32:15'),
(15, 'App\\Models\\User', 2, 'auth_token', 'bd084cd032464f522ee6cb694dd51deaea10b570ea610cacc2785d5d5ed77701', '[\"*\"]', '2025-01-26 21:08:30', NULL, '2025-01-26 20:53:54', '2025-01-26 21:08:30'),
(17, 'App\\Models\\User', 2, 'auth_token', 'aa8845863aea6c35d4202665b54a26b5d986863e52d4f8793e8f44b68e156213', '[\"*\"]', '2025-01-27 08:12:49', NULL, '2025-01-27 08:11:35', '2025-01-27 08:12:49'),
(18, 'App\\Models\\User', 2, 'auth_token', 'cfe366de01ad28be1917f6d8f5ad63ad3f2d82d1d5a491e78c352b614e7401b3', '[\"*\"]', '2025-01-27 08:41:10', NULL, '2025-01-27 08:12:52', '2025-01-27 08:41:10'),
(19, 'App\\Models\\User', 2, 'auth_token', 'cb2ccedcfa8d07796f7313bf0f064a4f6baa9136f4e446a752ba102de9c32e13', '[\"*\"]', '2025-01-27 08:41:26', NULL, '2025-01-27 08:41:19', '2025-01-27 08:41:26'),
(20, 'App\\Models\\User', 2, 'auth_token', '7f51c8b160998cd69116a6713810663ae66acd524974956d9356a91ad424db3a', '[\"*\"]', '2025-01-27 09:17:43', NULL, '2025-01-27 08:47:03', '2025-01-27 09:17:43'),
(21, 'App\\Models\\User', 2, 'auth_token', '10b3f1c5ebbfe7f3df5ddc7d96fc85c2432c61029fa3a88486d2aa8b43a6994e', '[\"*\"]', '2025-01-27 09:17:54', NULL, '2025-01-27 09:17:50', '2025-01-27 09:17:54');

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2025-01-26 06:29:56', '$2y$12$vu.wXE7HtCZAWQwJXJBvpOOyM/maAce0lV8kFxgVbom6GdZmpo8I2', '3kbO0IKiHj', '2025-01-26 06:29:56', '2025-01-26 06:29:56'),
(2, 'jerry', 'jerry@yahoo.com', NULL, '$2y$12$Jg0RkIJOynW3dKSsrWodCexY4vHMAtousw7BSuOyX30kERUrG31r.', NULL, '2025-01-26 07:22:32', '2025-01-26 07:22:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisers`
--
ALTER TABLE `advertisers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `advertisers_email_unique` (`email`),
  ADD KEY `advertisers_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaigns_advertiser_id_foreign` (`advertiser_id`);

--
-- Indexes for table `campaign_payouts`
--
ALTER TABLE `campaign_payouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaign_payouts_campaign_id_foreign` (`campaign_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisers`
--
ALTER TABLE `advertisers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `campaign_payouts`
--
ALTER TABLE `campaign_payouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advertisers`
--
ALTER TABLE `advertisers`
  ADD CONSTRAINT `advertisers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_advertiser_id_foreign` FOREIGN KEY (`advertiser_id`) REFERENCES `advertisers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `campaign_payouts`
--
ALTER TABLE `campaign_payouts`
  ADD CONSTRAINT `campaign_payouts_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
