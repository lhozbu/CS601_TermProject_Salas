-- -----------------------------------------------------
-- Table `contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `message` VARCHAR(500) NOT NULL,
  `date_created` DATETIME NOT NULL,
  `ip` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
