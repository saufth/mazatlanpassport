SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `mzpass` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mzpass`;

CREATE TABLE IF NOT EXISTS `mzpass`.`admins` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(40) NOT NULL,
  `first_name` VARCHAR(48) NOT NULL,
  `last_name` VARCHAR(48) NOT NULL,
  `genre_iso` TINYINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`companies_types` (
  `key` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`companies` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `slogan` VARCHAR(64) NULL,
  `description` VARCHAR(255) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `website` VARCHAR(48) NULL,
  `profile` VARCHAR(255) NOT NULL,
  `cover` VARCHAR(255) NOT NULL,
  `facebook` VARCHAR(48) NULL,
  `instagram` VARCHAR(48) NULL,
  `twitter` VARCHAR(48) NULL,
  `tiktok` VARCHAR(48) NULL,
  `admin_key` INT UNSIGNED NOT NULL,
  `company_type_key` SMALLINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_companies-companies_types_idx` (`company_type_key` ASC),
  CONSTRAINT `fk_companies-companies_types`
    FOREIGN KEY (`company_type_key`)
    REFERENCES `mzpass`.`companies_types` (`key`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `mzpass`.`companies_branches` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `maps_slug` VARCHAR(17) NOT NULL,
  `company_key` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  INDEX `fk_companies_branches-companies_idx` (`company_key` ASC),
  CONSTRAINT `fk_companies_branches-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mzpass`.`companies` (`key`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `mzpass`.`users` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(40) NOT NULL,
  `first_name` VARCHAR(48) NOT NULL,
  `last_name` VARCHAR(48) NOT NULL,
  `genre_iso` TINYINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`suscriptions_types` (
  `key` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(32) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `cost` FLOAT(4,2) UNSIGNED NOT NULL,
  `days` SMALLINT UNSIGNED NOT NULL,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `expired` TINYINT NOT NULL DEFAULT 0,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`suscriptions` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `title` VARCHAR(32) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(48) NOT NULL,
  `last_name` VARCHAR(48) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `days` SMALLINT UNSIGNED NOT NULL,
  `payment_cost` FLOAT(4,2) UNSIGNED NOT NULL,
  `currency` VARCHAR(3) NOT NULL,
  `user_key` INT UNSIGNED NOT NULL,
  `suscription_type_key` SMALLINT UNSIGNED NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `expired` TINYINT NOT NULL DEFAULT 0,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_suscriptions-users_idx` (`user_key` ASC),
  INDEX `fk_suscriptions-suscriptions_types_idx` (`suscription_type_key` ASC),
  CONSTRAINT `fk_suscriptions-users`
    FOREIGN KEY (`user_key`)
    REFERENCES `mzpass`.`users` (`key`),
  CONSTRAINT `fk_suscriptions-suscriptions_types`
    FOREIGN KEY (`suscription_type_key`)
    REFERENCES `mzpass`.`suscriptions_types` (`key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`promos` (
  `key` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id` BINARY(16) NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `company_key` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `expires_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `expired` TINYINT NOT NULL DEFAULT 0,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  INDEX `fk_promos-companies_idx` (`company_key` ASC),
  CONSTRAINT `fk_promos-companies`
    FOREIGN KEY (`company_key`)
    REFERENCES `mzpass`.`companies` (`key`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`suscriptions_promos` (
  `suscription_key` INT UNSIGNED NOT NULL,
  `promo_key` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`suscription_key`, `promo_key`),
  INDEX `fk_suscriptions_promos-suscriptions_idx` (`suscription_key` ASC),
  INDEX `fk_suscriptions_promos-promos_idx` (`promo_key` ASC),
  CONSTRAINT `fk_suscriptions_promos-suscriptions`
    FOREIGN KEY (`suscription_key`)
    REFERENCES `mzpass`.`suscriptions` (`key`),
  CONSTRAINT `fk_suscriptions_promos-promos`
    FOREIGN KEY (`promo_key`)
    REFERENCES `mzpass`.`promos` (`key`))
ENGINE = InnoDB;
