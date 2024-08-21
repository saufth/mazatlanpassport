SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `mzpass` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mzpass`;

CREATE TABLE IF NOT EXISTS `mzpass`.`genres` (
  `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`users` (
  `id` BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(), "-", ""))),
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(48) NOT NULL,
  `last_name` VARCHAR(48) NOT NULL,
  `gender_id` TINYINT UNSIGNED NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 0,
  `active_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users-genres_idx` (`gender_id` ASC),
  CONSTRAINT `fk_users-genres`
    FOREIGN KEY (`gender_id`)
    REFERENCES `mzpass`.`genres` (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`suscriptions_types` (
  `id` BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(), "-", ""))),
  `name` VARCHAR(32) NOT NULL,
  `payment_cost` FLOAT(4,2) UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`suscriptions` (
  `id` BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(), "-", ""))),
  `user_id` BINARY(16) NOT NULL,
  `suscription_type_id` BINARY(16) NOT NULL,
  `payment_cost` FLOAT(4,2) UNSIGNED NOT NULL,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_suscriptions-users_idx` (`user_id` ASC),
  INDEX `fk_suscriptions-suscriptions_types_idx` (`suscription_type_id` ASC),
  CONSTRAINT `fk_suscriptions-users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mzpass`.`users` (`id`),
  CONSTRAINT `fk_suscriptions-suscriptions_types`
    FOREIGN KEY (`suscription_type_id`)
    REFERENCES `mzpass`.`suscriptions_types` (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`promos` (
  `id` BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(), "-", ""))),
  `name` VARCHAR(64) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`suscriptions_promos` (
  `suscription_id` BINARY(16) NOT NULL,
  `promo_id` BINARY(16) NOT NULL,
  `user_id` BINARY(16) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`suscription_id`, `promo_id`),
  INDEX `fk_suscriptions_promos-suscriptions_idx` (`suscription_id` ASC),
  INDEX `fk_suscriptions_promos-users_idx` (`user_id` ASC),
  INDEX `fk_suscriptions_promos-promos_idx` (`promo_id` ASC),
  CONSTRAINT `fk_suscriptions_promos-suscriptions`
    FOREIGN KEY (`suscription_id`)
    REFERENCES `mzpass`.`suscriptions` (`id`),
  CONSTRAINT `fk_suscriptions_promos-users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mzpass`.`suscriptions` (`user_id`),
  CONSTRAINT `fk_suscriptions_promos-promos`
    FOREIGN KEY (`promo_id`)
    REFERENCES `mzpass`.`promos` (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mzpass`.`admins` (
  `id` BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(), "-", ""))),
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(48) NOT NULL,
  `last_name` VARCHAR(48) NOT NULL,
  `gender_id` TINYINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_admins-genres_idx` (`gender_id` ASC),
  CONSTRAINT `fk_admins-genres`
    FOREIGN KEY (`gender_id`)
    REFERENCES `mzpass`.`genres` (`id`))
ENGINE = InnoDB;