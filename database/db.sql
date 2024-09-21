SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `mazatlanpassport` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mazatlanpassport`;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`admins` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `phone` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `chk_admins-email`
    CHECK (LENGTH(`email`) >= 6),
  CONSTRAINT `chk_admins-password`
    CHECK (LENGTH(`password`) = 60),
  CONSTRAINT `chk_admins-name`
    CHECK (LENGTH(`name`) >= 3),
  CONSTRAINT `chk_admins-phone`
    CHECK (`phone` > 10000000000 AND `phone` <= 19999999999999))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`categories` (
  `key` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `chk_categories-name`
    CHECK (LENGTH(`name`) >= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`companies` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `slogan` VARCHAR(50) NULL,
  `description` VARCHAR(255) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `website` VARCHAR(50) NULL,
  `profile_image` VARCHAR(128) NOT NULL,
  `cover_image` VARCHAR(128) NOT NULL,
  `facebook_id` VARCHAR(50) NULL,
  `instagram_id` VARCHAR(30) NULL,
  `twitter_id` VARCHAR(15) NULL,
  `tiktok_id` VARCHAR(24) NULL,
  `monday_open_at` TIME(0) NULL,
  `monday_close_at` TIME(0) NULL,
  `tuesday_open_at` TIME(0) NULL,
  `tuesday_close_at` TIME(0) NULL,
  `wednesday_open_at` TIME(0) NULL,
  `wednesday_close_at` TIME(0) NULL,
  `thuersday_open_at` TIME(0) NULL,
  `thuersday_close_at` TIME(0) NULL,
  `friday_open_at` TIME(0) NULL,
  `friday_close_at` TIME(0) NULL,
  `saturday_open_at` TIME(0) NULL,
  `saturday_close_at` TIME(0) NULL,
  `sunday_open_at` TIME(0) NULL,
  `sunday_close_at` TIME(0) NULL,
  `rate` FLOAT NULL,
  `reservation` TINYINT UNSIGNED NOT NULL,
  `admin_key` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_companies-admins_idx` (`admin_key` ASC),
  CONSTRAINT `fk_companies-admins`
    FOREIGN KEY (`admin_key`)
    REFERENCES `mazatlanpassport`.`admins` (`key`),
  CONSTRAINT `chk_companies-email`
    CHECK (LENGTH(`email`) >= 6),
  CONSTRAINT `chk_companies-name`
    CHECK (LENGTH(`name`) >= 3),
  CONSTRAINT `chk_companies-slogan`
    CHECK (LENGTH(`slogan`) >= 3),
  CONSTRAINT `chk_companies-description`
    CHECK (LENGTH(`description`) >= 12),
  CONSTRAINT `chk_companies-website`
    CHECK (LENGTH(`website`) >= 6),
  CONSTRAINT `chk_companies-profile_image`
    CHECK (LENGTH(`profile_image`) >= 4),
  CONSTRAINT `chk_companies-cover_image`
    CHECK (LENGTH(`cover_image`) >= 4),
  CONSTRAINT `chk_companies-facebook_id`
    CHECK (LENGTH(`facebook_id`) >= 5),
  CONSTRAINT `chk_companies-rate`
    CHECK (`rate` > 0 AND `rate` <= 5))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`companies_categories` (
  `company_key` INT UNSIGNED NOT NULL,
  `category_key` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`company_key`, `category_key`),
  INDEX `fk_companies_categories-companies_idx` (`company_key` ASC),
  INDEX `fk_companies_categories-categories_idx` (`category_key` ASC),
  CONSTRAINT `fk_companies_categories-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mazatlanpassport`.`companies` (`key`),
  CONSTRAINT `fk_companies_categories-categories`
    FOREIGN KEY (`category_key`)
    REFERENCES `mazatlanpassport`.`categories` (`key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`companies_branches` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `phone` BIGINT UNSIGNED NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `maps_slug` VARCHAR(17) NOT NULL,
  `company_key` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  INDEX `fk_companies_branches-companies_idx` (`company_key` ASC),
  CONSTRAINT `fk_companies_branches-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mazatlanpassport`.`companies` (`key`),
  CONSTRAINT `chk_companies_branches-name`
    CHECK (LENGTH(`name`) >= 3),
  CONSTRAINT `chk_companies_branches-address`
    CHECK (LENGTH(`address`) >= 12),
  CONSTRAINT `chk_companies_branches-phone`
    CHECK (`phone` > 10000000000 AND `phone` <= 19999999999999))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `phone` BIGINT UNSIGNED NOT NULL,
  `genre_iso` TINYINT UNSIGNED NOT NULL,
  `verified_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC),
  CONSTRAINT `chk_users-email`
    CHECK (LENGTH(`email`) >= 6),
  CONSTRAINT `chk_users-password`
    CHECK (LENGTH(`password`) = 60),
  CONSTRAINT `chk_users-first_name`
    CHECK (LENGTH(`first_name`) >= 3),
  CONSTRAINT `chk_users-last_name`
    CHECK (LENGTH(`last_name`) >= 3),
  CONSTRAINT `chk_users-phone`
    CHECK (`phone` > 10000000000 AND `phone` <= 19999999999999),
  CONSTRAINT `chk_users-genre_iso`
    CHECK (`genre_iso` = 0 OR `genre_iso` = 1 OR `genre_iso` = 2 OR `genre_iso` = 9))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users_verifications` (
  `user_key` INT UNSIGNED NOT NULL,
  `code` SMALLINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (`user_key`),
  UNIQUE INDEX `user_key_UNIQUE` (`user_key` ASC),
  INDEX `fk_users_verifications-users_idx` (`user_key` ASC),
  CONSTRAINT `fk_users_verifications-users`
    FOREIGN KEY (`user_key`)
    REFERENCES `mazatlanpassport`.`users` (`key`),
  CONSTRAINT `chk_users_verifications-code`
    CHECK (`code` >= 1000 AND `code` <= 9999))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users_recoveries` (
  `user_key` INT UNSIGNED NOT NULL,
  `code` SMALLINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  PRIMARY KEY (`user_key`),
  UNIQUE INDEX `user_key_UNIQUE` (`user_key` ASC),
  INDEX `fk_users_recoveries-users_idx` (`user_key` ASC),
  CONSTRAINT `fk_users_recoveries-users`
    FOREIGN KEY (`user_key`)
    REFERENCES `mazatlanpassport`.`users` (`key`),
  CONSTRAINT `chk_users_recoveries-code`
    CHECK (`code` >= 1000 AND `code` <= 9999))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`promos` (
  `key` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(128) NOT NULL,
  `company_key` INT UNSIGNED NOT NULL,
  `expired` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  INDEX `fk_promos-companies_idx` (`company_key` ASC),
  CONSTRAINT `fk_promos-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mazatlanpassport`.`companies` (`key`),
  CONSTRAINT `chk_promos-title`
    CHECK (LENGTH(`title`) >= 3),
  CONSTRAINT `chk_promos-description`
    CHECK (LENGTH(`description`) >= 12),
  CONSTRAINT `chk_promos-image`
    CHECK (LENGTH(`image`) >= 4))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users_companies_likes` (
  `user_key` INT UNSIGNED NOT NULL,
  `company_key` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_key`, `company_key`),
  INDEX `fk_users_companies_likes-users_idx` (`user_key` ASC),
  INDEX `fk_users_companies_likes-companies_idx` (`company_key` ASC),
  CONSTRAINT `fk_users_companies_likes-users`
    FOREIGN KEY (`user_key`)
    REFERENCES `mazatlanpassport`.`users` (`key`),
  CONSTRAINT `fk_users_companies_likes-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mazatlanpassport`.`companies` (`key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`suscriptions_types` (
  `key` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `cost` FLOAT NOT NULL,
  `days` SMALLINT UNSIGNED NOT NULL,
  `expired` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  CONSTRAINT `chk_suscriptions_types-title`
    CHECK (LENGTH(`title`) >= 3),
  CONSTRAINT `chk_suscriptions_types-description`
    CHECK (LENGTH(`description`) >= 12),
  CONSTRAINT `chk_suscriptions_types-cost`
    CHECK (`cost` >= 99 AND `cost` < 10000),
  CONSTRAINT `chk_suscriptions_types-days`
    CHECK (`days` >= 1 AND `days` <= 365))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`suscriptions` (
  `key` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `user_id` BINARY(16) NOT NULL,
  `first_name` VARCHAR(35) NOT NULL,
  `last_name` VARCHAR(35) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `phone` BIGINT UNSIGNED NOT NULL,
  `genre_iso` TINYINT UNSIGNED NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `days` SMALLINT UNSIGNED NOT NULL,
  `payment_cost` FLOAT NOT NULL,
  `currency` VARCHAR(3) NOT NULL,
  `user_key` INT UNSIGNED NOT NULL,
  `suscription_type_key` SMALLINT UNSIGNED NOT NULL,
  `expired` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_suscriptions-users_idx` (`user_key` ASC),
  INDEX `fk_suscriptions-suscriptions_types_idx` (`suscription_type_key` ASC),
  CONSTRAINT `fk_suscriptions-users`
    FOREIGN KEY (`user_key`)
    REFERENCES `mazatlanpassport`.`users` (`key`),
  CONSTRAINT `fk_suscriptions-suscriptions_types`
    FOREIGN KEY (`suscription_type_key`)
    REFERENCES `mazatlanpassport`.`suscriptions_types` (`key`),
  CONSTRAINT `chk_suscriptions-first_name`
    CHECK (LENGTH(`first_name`) >= 3),
  CONSTRAINT `chk_suscriptions-last_name`
    CHECK (LENGTH(`last_name`) >= 3),
  CONSTRAINT `chk_suscriptions-email`
    CHECK (LENGTH(`email`) >= 6),
  CONSTRAINT `chk_suscriptions-phone`
    CHECK (`phone` > 10000000000 AND `phone` <= 19999999999999),
  CONSTRAINT `chk_suscriptions-genre_iso`
    CHECK (`genre_iso` = 0 OR `genre_iso` = 1 OR `genre_iso` = 2 OR `genre_iso` = 9),
  CONSTRAINT `chk_suscriptions-title`
    CHECK (LENGTH(`title`) >= 3),
  CONSTRAINT `chk_suscriptions-description`
    CHECK (LENGTH(`description`) >= 12),
  CONSTRAINT `chk_suscriptions-days`
    CHECK (`days` >= 1 AND `days` <= 365),
  CONSTRAINT `chk_suscriptions-payment_cost`
    CHECK (`payment_cost` >= 99 AND `payment_cost` < 10000),
  CONSTRAINT `chk_suscriptions-currency`
    CHECK (LENGTH(`currency`) = 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`orders` (
  `key` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `suscription_key` BIGINT UNSIGNED NOT NULL,
  `promo_key` BIGINT UNSIGNED NOT NULL,
  `company_key` INT UNSIGNED NOT NULL,
  `rate` TINYINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  INDEX `fk_orders-suscriptions_idx` (`suscription_key` ASC),
  INDEX `fk_orders-promos_idx` (`promo_key` ASC),
  INDEX `fk_orders-companies_idx` (`company_key` ASC),
  CONSTRAINT `fk_orders-suscriptions`
    FOREIGN KEY (`suscription_key`)
    REFERENCES `mazatlanpassport`.`suscriptions` (`key`),
  CONSTRAINT `fk_orders-promos`
    FOREIGN KEY (`promo_key`)
    REFERENCES `mazatlanpassport`.`promos` (`key`),
  CONSTRAINT `fk_orders-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mazatlanpassport`.`companies` (`key`),
  CONSTRAINT `chk_users_companies_reviews-rate`
    CHECK (`rate` >= 1 AND `rate` <= 5))
ENGINE = InnoDB;
