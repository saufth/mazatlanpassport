SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `mazatlanpassport` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mazatlanpassport`;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`roots` (
  `row_key` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  CONSTRAINT `chk_roots-username`
    CHECK (LENGTH(`username`) >= 4),
  CONSTRAINT `chk_roots-password`
    CHECK (LENGTH(`password`) = 60))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`admins` (
  `row_key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `root_row_key` TINYINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `verified_at` TIMESTAMP NULL,
  `blocked_at` TIMESTAMP NULL,
  `blocked` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `fk_admins-roots`
    FOREIGN KEY (`root_row_key`)
    REFERENCES `mazatlanpassport`.`roots` (`row_key`),
  CONSTRAINT `chk_admins-email`
    CHECK (LENGTH(`email`) >= 6),
  CONSTRAINT `chk_admins-password`
    CHECK (LENGTH(`password`) = 60),
  CONSTRAINT `chk_admins-name`
    CHECK (LENGTH(`name`) >= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`stores` (
  `row_key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(32) NOT NULL,
  `slogan` VARCHAR(50) NULL,
  `description` VARCHAR(250) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `phone` BIGINT UNSIGNED NOT NULL,
  `website` VARCHAR(50) NULL,
  `address` VARCHAR(250) NOT NULL,
  `maps_slug` VARCHAR(17) NOT NULL,
  `profile_image` VARCHAR(250) NOT NULL,
  `cover_image` VARCHAR(250) NOT NULL,
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
  `reservation` TINYINT UNSIGNED NOT NULL,
  `rate` FLOAT NULL,
  `rate_count` INT UNSIGNED NULL,
  `admin_row_key` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_stores-admins_idx` (`admin_row_key` ASC),
  CONSTRAINT `fk_stores-admins`
    FOREIGN KEY (`admin_row_key`)
    REFERENCES `mazatlanpassport`.`admins` (`row_key`),
  CONSTRAINT `chk_stores-name`
    CHECK (LENGTH(`name`) >= 3),
  CONSTRAINT `chk_stores-slogan`
    CHECK (LENGTH(`slogan`) >= 6),
  CONSTRAINT `chk_stores-description`
    CHECK (LENGTH(`description`) >= 12),
  CONSTRAINT `chk_stores-email`
    CHECK (LENGTH(`email`) >= 6),
  CONSTRAINT `chk_stores-address`
    CHECK (LENGTH(`address`) >= 12),
  CONSTRAINT `chk_stores-phone`
    CHECK (`phone` > 11000000009 AND `phone` <= 19399999999900),
  CONSTRAINT `chk_stores-website`
    CHECK (LENGTH(`website`) >= 5),
  CONSTRAINT `chk_stores-maps_slug`
    CHECK (LENGTH(`maps_slug`) = 17),
  CONSTRAINT `chk_stores-profile_image`
    CHECK (LENGTH(`profile_image`) >= 12),
  CONSTRAINT `chk_stores-cover_image`
    CHECK (LENGTH(`cover_image`) >= 12),
  CONSTRAINT `chk_stores-facebook_id`
    CHECK (LENGTH(`facebook_id`) >= 5),
  CONSTRAINT `chk_stores-rate`
    CHECK (`rate` >= 0 AND `rate` <= 5),
  CONSTRAINT `chk_stores-rate_count`
    CHECK (`rate_count` > 0))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`store_categories` (
  `row_key` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `chk_store_categories-name`
    CHECK (LENGTH(`name`) >= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`stores_store_categories` (
  `store_row_key` INT UNSIGNED NOT NULL,
  `store_category_row_key` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`store_row_key`, `store_category_row_key`),
  INDEX `fk_stores_store_categories-stores_idx` (`store_row_key` ASC),
  INDEX `fk_stores_store_categories-store_categories_idx` (`store_category_row_key` ASC),
  CONSTRAINT `fk_stores_store_categories-stores`
    FOREIGN KEY (`store_row_key`)
    REFERENCES `mazatlanpassport`.`stores` (`row_key`),
  CONSTRAINT `fk_stores_store_categories-store_categories`
    FOREIGN KEY (`store_category_row_key`)
    REFERENCES `mazatlanpassport`.`store_categories` (`row_key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`stores_branches` (
  `row_key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `phone` BIGINT UNSIGNED NOT NULL,
  `address` VARCHAR(250) NOT NULL,
  `maps_slug` VARCHAR(17) NOT NULL,
  `store_row_key` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  INDEX `fk_stores_branches-stores_idx` (`store_row_key` ASC),
  CONSTRAINT `fk_stores_branches-stores`
    FOREIGN KEY (`store_row_key`)
    REFERENCES `mazatlanpassport`.`stores` (`row_key`),
  CONSTRAINT `chk_stores_branches-name`
    CHECK (LENGTH(`name`) >= 3),
  CONSTRAINT `chk_stores_branches-address`
    CHECK (LENGTH(`address`) >= 12),
  CONSTRAINT `chk_stores_branches-phone`
    CHECK (`phone` > 11000000009 AND `phone` <= 19399999999900))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users` (
  `row_key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `first_name` VARCHAR(32) NOT NULL,
  `last_name` VARCHAR(32) NOT NULL,
  `phone` BIGINT UNSIGNED NULL,
  `genre_iso` TINYINT UNSIGNED NOT NULL,
  `birthdate` DATE NOT NULL,
  `newsletters` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `verified_at` TIMESTAMP NULL,
  `blocked_at` TIMESTAMP NULL,
  `blocked` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
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
    CHECK (`phone` > 11000000009 AND `phone` <= 19399999999900),
  CONSTRAINT `chk_users-genre_iso`
    CHECK (`genre_iso` = 0 OR `genre_iso` = 1 OR `genre_iso` = 2 OR `genre_iso` = 9))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users_stores_likes` (
  `user_row_key` INT UNSIGNED NOT NULL,
  `store_row_key` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_row_key`, `store_row_key`),
  INDEX `fk_users_stores_likes-users_idx` (`user_row_key` ASC),
  INDEX `fk_users_stores_likes-stores_idx` (`store_row_key` ASC),
  CONSTRAINT `fk_users_stores_likes-users`
    FOREIGN KEY (`user_row_key`)
    REFERENCES `mazatlanpassport`.`users` (`row_key`),
  CONSTRAINT `fk_users_stores_likes-stores`
    FOREIGN KEY (`store_row_key`)
    REFERENCES `mazatlanpassport`.`stores` (`row_key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`subscriptions` (
  `row_key` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `user_id` BINARY(16) NOT NULL,
  `paid_in_cash` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `stripe_price_id` VARCHAR(30) NOT NULL,
  `stripe_payment_id` VARCHAR(66) NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `canceled_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `stripe_price_id_UNIQUE` (`stripe_price_id` ASC),
  INDEX `fk_subscriptions-users_idx` (`user_id` ASC),
  CONSTRAINT `fk_subscriptions-users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mazatlanpassport`.`users` (`id`),
  CONSTRAINT `chk_subscriptions-stripe_price_id`
    CHECK (LENGTH(`stripe_price_id`) = 30),
  CONSTRAINT `chk_subscriptions-stripe_payment_id`
    CHECK (LENGTH(`stripe_payment_id`) = 66))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`products` (
  `row_key` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `image` VARCHAR(250) NOT NULL,
  `amount` MEDIUMINT UNSIGNED NOT NULL,
  `discount` TINYINT UNSIGNED NOT NULL,
  `store_row_key` INT UNSIGNED NOT NULL,
  `stock` SMALLINT UNSIGNED NULL,
  `available` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `expired` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `expires_at` TIMESTAMP NULL,
  `enable_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  INDEX `fk_products-stores_idx` (`store_row_key` ASC),
  CONSTRAINT `fk_products-stores`
    FOREIGN KEY (`store_row_key`)
    REFERENCES `mazatlanpassport`.`stores` (`row_key`),
  CONSTRAINT `chk_products-title`
    CHECK (LENGTH(`title`) >= 3),
  CONSTRAINT `chk_products-description`
    CHECK (LENGTH(`description`) >= 12),
  CONSTRAINT `chk_products-image`
    CHECK (LENGTH(`image`) >= 12),
  CONSTRAINT `chk_products-amount`
    CHECK (`amount` <= 999999),
  CONSTRAINT `chk_products-discount`
    CHECK (`discount` >= 20 AND `discount` <= 80))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`product_categories` (
  `row_key` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `chk_product_categories-name`
    CHECK (LENGTH(`name`) >= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`products_product_categories` (
  `product_row_key` BIGINT UNSIGNED NOT NULL,
  `product_category_row_key` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`product_row_key`, `product_category_row_key`),
  INDEX `fk_products_product_categories-products_idx` (`product_row_key` ASC),
  INDEX `fk_products_product_categories-product_categories_idx` (`product_category_row_key` ASC),
  CONSTRAINT `fk_products_product_categories-products`
    FOREIGN KEY (`product_row_key`)
    REFERENCES `mazatlanpassport`.`products` (`row_key`),
  CONSTRAINT `fk_products_product_categories-product_categories`
    FOREIGN KEY (`product_category_row_key`)
    REFERENCES `mazatlanpassport`.`product_categories` (`row_key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`orders` (
  `row_key` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subscription_row_key` BIGINT UNSIGNED NOT NULL,
  `store_row_key` INT UNSIGNED NOT NULL,
  `products` JSON NOT NULL,
  `rate` TINYINT UNSIGNED NULL,
  `completed_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`row_key`),
  UNIQUE INDEX `row_key_UNIQUE` (`row_key` ASC),
  INDEX `fk_orders-subscriptions_idx` (`subscription_row_key` ASC),
  INDEX `fk_orders-stores_idx` (`store_row_key` ASC),
  CONSTRAINT `fk_orders-subscriptions`
    FOREIGN KEY (`subscription_row_key`)
    REFERENCES `mazatlanpassport`.`subscriptions` (`row_key`),
  CONSTRAINT `fk_orders-stores`
    FOREIGN KEY (`store_row_key`)
    REFERENCES `mazatlanpassport`.`stores` (`row_key`),
  CONSTRAINT `chk_orders-rate`
    CHECK (`rate` >= 0 AND `rate` <= 5))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`roots_verify_codes` (
  `root_row_key` TINYINT UNSIGNED NOT NULL,
  `code` MEDIUMINT UNSIGNED NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`root_row_key`),
  UNIQUE INDEX `root_row_key_UNIQUE` (`root_row_key` ASC),
  INDEX `fk_roots_verify_codes-roots_idx` (`root_row_key` ASC),
  CONSTRAINT `fk_roots_verify_codes-roots`
    FOREIGN KEY (`root_row_key`)
    REFERENCES `mazatlanpassport`.`roots` (`row_key`),
  CONSTRAINT `chk_roots_verify_codes-code`
    CHECK (`code` >= 100000 AND `code` <= 999999),
  CONSTRAINT `chk_roots_verify_codes-attempts`
    CHECK (`attempts` <= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`roots_recovery_codes` (
  `root_row_key` TINYINT UNSIGNED NOT NULL,
  `code` MEDIUMINT UNSIGNED NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`root_row_key`),
  UNIQUE INDEX `root_row_key_UNIQUE` (`root_row_key` ASC),
  INDEX `fk_roots_recovery_codes-roots_idx` (`root_row_key` ASC),
  CONSTRAINT `fk_roots_recovery_codes-roots`
    FOREIGN KEY (`root_row_key`)
    REFERENCES `mazatlanpassport`.`roots` (`row_key`),
  CONSTRAINT `chk_roots_recovery_codes-code`
    CHECK (`code` >= 100000 AND `code` <= 999999),
  CONSTRAINT `chk_roots_recovery_codes-attempts`
    CHECK (`attempts` <= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`admins_verify_codes` (
  `admin_row_key` INT UNSIGNED NOT NULL,
  `code` MEDIUMINT UNSIGNED NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`admin_row_key`),
  UNIQUE INDEX `admin_row_key_UNIQUE` (`admin_row_key` ASC),
  INDEX `fk_admins_verify_codes-admins_idx` (`admin_row_key` ASC),
  CONSTRAINT `fk_admins_verify_codes-admins`
    FOREIGN KEY (`admin_row_key`)
    REFERENCES `mazatlanpassport`.`admins` (`row_key`),
  CONSTRAINT `chk_admins_verify_codes-code`
    CHECK (`code` >= 100000 AND `code` <= 999999),
  CONSTRAINT `chk_admins_verify_codes-attempts`
    CHECK (`attempts` <= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`admins_recovery_codes` (
  `admin_row_key` INT UNSIGNED NOT NULL,
  `code` MEDIUMINT UNSIGNED NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`admin_row_key`),
  UNIQUE INDEX `admin_row_key_UNIQUE` (`admin_row_key` ASC),
  INDEX `fk_admins_recovery_codes-admins_idx` (`admin_row_key` ASC),
  CONSTRAINT `fk_admins_recovery_codes-admins`
    FOREIGN KEY (`admin_row_key`)
    REFERENCES `mazatlanpassport`.`admins` (`row_key`),
  CONSTRAINT `chk_admins_recovery_codes-code`
    CHECK (`code` >= 100000 AND `code` <= 999999),
  CONSTRAINT `chk_admins_recovery_codes-attempts`
    CHECK (`attempts` <= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users_verify_codes` (
  `user_row_key` INT UNSIGNED NOT NULL,
  `code` MEDIUMINT UNSIGNED NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_row_key`),
  UNIQUE INDEX `user_row_key_UNIQUE` (`user_row_key` ASC),
  INDEX `fk_users_verify_codes-users_idx` (`user_row_key` ASC),
  CONSTRAINT `fk_users_verify_codes-users`
    FOREIGN KEY (`user_row_key`)
    REFERENCES `mazatlanpassport`.`users` (`row_key`),
  CONSTRAINT `chk_users_verify_codes-code`
    CHECK (`code` >= 100000 AND `code` <= 999999),
  CONSTRAINT `chk_users_verify_codes-attempts`
    CHECK (`attempts` <= 3))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mazatlanpassport`.`users_recovery_codes` (
  `user_row_key` INT UNSIGNED NOT NULL,
  `code` MEDIUMINT UNSIGNED NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (NOW()),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_row_key`),
  UNIQUE INDEX `user_row_key_UNIQUE` (`user_row_key` ASC),
  INDEX `fk_users_recovery_codes-users_idx` (`user_row_key` ASC),
  CONSTRAINT `fk_users_recovery_codes-users`
    FOREIGN KEY (`user_row_key`)
    REFERENCES `mazatlanpassport`.`users` (`row_key`),
  CONSTRAINT `chk_users_recovery_codes-code`
    CHECK (`code` >= 100000 AND `code` <= 999999),
  CONSTRAINT `chk_users_recovery_codes-attempts`
    CHECK (`attempts` <= 3))
ENGINE = InnoDB;
