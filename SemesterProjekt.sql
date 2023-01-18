-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.14-MariaDB - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             11.1.0.6118
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for SemProj_Schule
CREATE DATABASE IF NOT EXISTS `SemProj_Schule` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `SemProj_Schule`;

-- Dumping structure for table SemProj_Schule.gebaeude
CREATE TABLE IF NOT EXISTS `gebaeude` (
  `gebaeude_id` int(11) NOT NULL AUTO_INCREMENT,
  `gebaeude_straße` varchar(50) NOT NULL,
  `gebaeude_plz` mediumint(8) unsigned NOT NULL,
  `gebaeude_ort` varchar(50) NOT NULL,
  `gebaeude_nr` int(11) unsigned NOT NULL,
  PRIMARY KEY (`gebaeude_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.gebaeude: ~0 rows (approximately)
DELETE FROM `gebaeude`;
/*!40000 ALTER TABLE `gebaeude` DISABLE KEYS */;
INSERT INTO `gebaeude` (`gebaeude_id`, `gebaeude_straße`, `gebaeude_plz`, `gebaeude_ort`, `gebaeude_nr`) VALUES
	(4, 'afaf', 2245, 'kiel', 4);
/*!40000 ALTER TABLE `gebaeude` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.klasse
CREATE TABLE IF NOT EXISTS `klasse` (
  `klasse_id` int(11) NOT NULL AUTO_INCREMENT,
  `klasse_jahrgang` tinyint(4) unsigned NOT NULL,
  `klasse_name` varchar(50) NOT NULL,
  PRIMARY KEY (`klasse_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.klasse: ~2 rows (approximately)
DELETE FROM `klasse`;
/*!40000 ALTER TABLE `klasse` DISABLE KEYS */;
INSERT INTO `klasse` (`klasse_id`, `klasse_jahrgang`, `klasse_name`) VALUES
	(1, 12, '12C'),
	(2, 11, '11B'),
	(3, 12, '12A');
/*!40000 ALTER TABLE `klasse` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.lehrer
CREATE TABLE IF NOT EXISTS `lehrer` (
  `lehrer_id` int(11) NOT NULL AUTO_INCREMENT,
  `lehrer_vorname` varchar(50) NOT NULL,
  `lehrer_nachname` varchar(50) NOT NULL,
  `lehrer_straße` varchar(50) NOT NULL,
  `lehrer_plz` mediumint(8) unsigned NOT NULL,
  `lehrer_ort` varchar(50) NOT NULL,
  `lehrer_geburtsdatum` date NOT NULL,
  `lehrer_parkplatznummer` int(11) unsigned DEFAULT NULL,
  `lehrer_parkplatz_behindertengerecht` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`lehrer_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.lehrer: ~3 rows (approximately)
DELETE FROM `lehrer`;
/*!40000 ALTER TABLE `lehrer` DISABLE KEYS */;
INSERT INTO `lehrer` (`lehrer_id`, `lehrer_vorname`, `lehrer_nachname`, `lehrer_straße`, `lehrer_plz`, `lehrer_ort`, `lehrer_geburtsdatum`, `lehrer_parkplatznummer`, `lehrer_parkplatz_behindertengerecht`) VALUES
	(1, 'hans', 'mayer', 'kajf', 2939, 'kiel', '1957-05-10', 42221, 1),
	(2, 'peter', 'griffin', 'akfj', 3392, 'kiel', '1954-01-23', 39922, 1),
	(3, 'olaf', 'müller', 'musterstraße 3', 2831, 'lübeck', '1980-01-23', NULL, NULL);
/*!40000 ALTER TABLE `lehrer` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.lehrung
CREATE TABLE IF NOT EXISTS `lehrung` (
  `unterrichtsfach_id` int(11) NOT NULL,
  `lehrer_id` int(11) NOT NULL,
  KEY `FK_lehrung_unterrichtsfach` (`unterrichtsfach_id`),
  KEY `FK_lehrung_lehrer` (`lehrer_id`),
  CONSTRAINT `FK_lehrung_lehrer` FOREIGN KEY (`lehrer_id`) REFERENCES `lehrer` (`lehrer_id`),
  CONSTRAINT `FK_lehrung_unterrichtsfach` FOREIGN KEY (`unterrichtsfach_id`) REFERENCES `unterrichtsfach` (`unterrichtsfach_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.lehrung: ~6 rows (approximately)
DELETE FROM `lehrung`;
/*!40000 ALTER TABLE `lehrung` DISABLE KEYS */;
INSERT INTO `lehrung` (`unterrichtsfach_id`, `lehrer_id`) VALUES
	(2, 1),
	(2, 2),
	(1, 2),
	(3, 1),
	(3, 2),
	(1, 1);
/*!40000 ALTER TABLE `lehrung` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.raum
CREATE TABLE IF NOT EXISTS `raum` (
  `raum_id` int(11) NOT NULL AUTO_INCREMENT,
  `gebaeude_id` int(11) NOT NULL,
  `raum_digitalisiert` tinyint(1) unsigned NOT NULL,
  `raum_art` varchar(50) NOT NULL,
  `raum_nr` int(11) unsigned NOT NULL,
  PRIMARY KEY (`raum_id`) USING BTREE,
  KEY `FK_raum_gebaeude` (`gebaeude_id`) USING BTREE,
  CONSTRAINT `FK_raum_gebaeude` FOREIGN KEY (`gebaeude_id`) REFERENCES `gebaeude` (`gebaeude_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.raum: ~2 rows (approximately)
DELETE FROM `raum`;
/*!40000 ALTER TABLE `raum` DISABLE KEYS */;
INSERT INTO `raum` (`raum_id`, `gebaeude_id`, `raum_digitalisiert`, `raum_art`, `raum_nr`) VALUES
	(2, 4, 1, 'mathe', 32),
	(3, 4, 0, 'deutsch', 321),
	(4, 4, 1, 'normal', 3214);
/*!40000 ALTER TABLE `raum` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.schueler
CREATE TABLE IF NOT EXISTS `schueler` (
  `schueler_id` int(11) NOT NULL AUTO_INCREMENT,
  `klasse_id` int(11) NOT NULL,
  `schueler_vorname` varchar(50) NOT NULL,
  `schueler_nachname` varchar(50) NOT NULL,
  `schueler_geburtsdatum` date NOT NULL,
  `schueler_straße` varchar(50) NOT NULL,
  `schueler_plz` mediumint(8) unsigned NOT NULL,
  `schueler_ort` varchar(50) NOT NULL,
  `schueler_abiturNr` int(11) unsigned DEFAULT NULL,
  `schueler_abiturnote` tinyint(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`schueler_id`) USING BTREE,
  KEY `FK_schueler_klasse` (`klasse_id`) USING BTREE,
  CONSTRAINT `FK_schueler_klasse` FOREIGN KEY (`klasse_id`) REFERENCES `klasse` (`klasse_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.schueler: ~6 rows (approximately)
DELETE FROM `schueler`;
/*!40000 ALTER TABLE `schueler` DISABLE KEYS */;
INSERT INTO `schueler` (`schueler_id`, `klasse_id`, `schueler_vorname`, `schueler_nachname`, `schueler_geburtsdatum`, `schueler_straße`, `schueler_plz`, `schueler_ort`, `schueler_abiturNr`, `schueler_abiturnote`) VALUES
	(1, 1, 'ajf', 'akfja', '2001-01-01', 'ajfaf', 0, 'Friedrichtsort', 8669, 2),
	(2, 1, 'afavv', 'afafvv', '2012-06-04', 'aaaaafv', 0, 'Friedrichtsort', 24, 4),
	(3, 1, 'ajf', 'akfj', '2000-05-09', 'vye', 0, 'Friedrichtsort', 2332, 2),
	(4, 2, 'hkh', 'jrjj', '2010-05-12', 'sgs', 2525, 'kiel', NULL, NULL),
	(5, 2, 'afafvz', 'akfj', '2002-01-20', 'afaf', 23521, 'kiel', NULL, NULL),
	(6, 3, 'afjklajfvv', 'fakjflknv', '2021-01-23', 'afafa', 3229, 'kiel', 3255, 5);
/*!40000 ALTER TABLE `schueler` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.unterrichtsfach
CREATE TABLE IF NOT EXISTS `unterrichtsfach` (
  `unterrichtsfach_id` int(11) NOT NULL AUTO_INCREMENT,
  `unterrichtsfach_fachrichtung` varchar(50) NOT NULL,
  `unterrichtsfach_abkuerzung` varchar(50) NOT NULL,
  PRIMARY KEY (`unterrichtsfach_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.unterrichtsfach: ~2 rows (approximately)
DELETE FROM `unterrichtsfach`;
/*!40000 ALTER TABLE `unterrichtsfach` DISABLE KEYS */;
INSERT INTO `unterrichtsfach` (`unterrichtsfach_id`, `unterrichtsfach_fachrichtung`, `unterrichtsfach_abkuerzung`) VALUES
	(1, 'mathe', 'm0'),
	(2, 'deutsch', 'd0'),
	(3, 'mathe', 'm1');
/*!40000 ALTER TABLE `unterrichtsfach` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.unterrichtung
CREATE TABLE IF NOT EXISTS `unterrichtung` (
  `lehrer_id` int(11) NOT NULL,
  `klasse_id` int(11) NOT NULL,
  KEY `FK_unterrichtung_klasse` (`klasse_id`) USING BTREE,
  KEY `FK_unterrichtung_lehrer` (`lehrer_id`) USING BTREE,
  CONSTRAINT `FK_unterrichtung_klasse` FOREIGN KEY (`klasse_id`) REFERENCES `klasse` (`klasse_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_unterrichtung_lehrer` FOREIGN KEY (`lehrer_id`) REFERENCES `lehrer` (`lehrer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.unterrichtung: ~3 rows (approximately)
DELETE FROM `unterrichtung`;
/*!40000 ALTER TABLE `unterrichtung` DISABLE KEYS */;
INSERT INTO `unterrichtung` (`lehrer_id`, `klasse_id`) VALUES
	(1, 1),
	(1, 2),
	(2, 2);
/*!40000 ALTER TABLE `unterrichtung` ENABLE KEYS */;

-- Dumping structure for table SemProj_Schule.unterrichtungsort
CREATE TABLE IF NOT EXISTS `unterrichtungsort` (
  `klasse_id` int(11) NOT NULL,
  `raum_id` int(11) NOT NULL,
  KEY `FK_unterrichtungsort_klasse` (`klasse_id`) USING BTREE,
  KEY `FK_unterrichtungsort_raum` (`raum_id`) USING BTREE,
  CONSTRAINT `FK_unterrichtungsort_klasse` FOREIGN KEY (`klasse_id`) REFERENCES `klasse` (`klasse_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_unterrichtungsort_raum` FOREIGN KEY (`raum_id`) REFERENCES `raum` (`raum_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table SemProj_Schule.unterrichtungsort: ~3 rows (approximately)
DELETE FROM `unterrichtungsort`;
/*!40000 ALTER TABLE `unterrichtungsort` DISABLE KEYS */;
INSERT INTO `unterrichtungsort` (`klasse_id`, `raum_id`) VALUES
	(1, 3),
	(2, 4),
	(3, 4);
/*!40000 ALTER TABLE `unterrichtungsort` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
