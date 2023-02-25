-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: pony_express_dev
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.10.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `region_id` bigint DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cities_region` (`region_id`),
  KEY `fk_countries_cities` (`country_id`),
  CONSTRAINT `fk_cities_region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`),
  CONSTRAINT `fk_countries_cities` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Moscow',1,1),(2,'Belgorod',2,1),(3,'Istanbul',3,2),(4,'Ankara',3,2),(5,'Kishinev',4,3),(6,'Komrat',4,3),(7,'Buharest',5,4),(8,'Yassi',5,4);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `country_code_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_countries_country_code` (`country_code_id`),
  CONSTRAINT `fk_countries_country_code` FOREIGN KEY (`country_code_id`) REFERENCES `country_codes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'ABD',1),(2,'Afganistan',2),(3,'Almanya',3),(4,'Amerikan Samoa',4),(5,'Andorra',5),(6,'Angola',6),(7,'Anguilla',7),(8,'Antigua ve Barbuda',8),(9,'Arjantin',9),(10,'Arnavutluk',10),(11,'Aruba',11),(12,'Avustralya',12),(13,'Avusturya',13),(14,'Azerbaycan',14),(15,'Bahamalar',15),(16,'Bahreyn',16),(17,'Bangladeş',17),(18,'Barbados',18),(19,'Belçika',19),(20,'Belize',20),(21,'Benin',21),(22,'Bermuda',22),(23,'Beyaz Rusya',23),(24,'Bhutan',24),(25,'Birleşik Arap Emirlikleri',25),(26,'Bolivya',26),(27,'Bonaire',27),(28,'Bosna-Hersek',28),(29,'Botsvana',29),(30,'Brezilya',30),(31,'Bruney',31),(32,'Bulgaristan',32),(33,'Burkina Faso',33),(34,'Burundi',34),(35,'Cayman Adaları',35),(36,'Cebelitarık (GB)',36),(37,'Cezayir',37),(38,'Christmas Adası',38),(39,'Cibuti',39),(40,'Cocos Adaları',40),(41,'Cook Adaları',41),(42,'Curaçao',42),(43,'Çad',43),(44,'Çek Cumhuriyeti',44),(45,'Çin',45),(46,'Danimarka',46),(47,'Doğu Timor',47),(48,'Dominik Cumhuriyeti',48),(49,'Dominika',49),(50,'Ekvador',50),(51,'Ekvator Ginesi',51),(52,'El Salvador',52),(53,'Endonezya',53),(54,'Eritre',54),(55,'Ermenistan',55),(56,'Estonya',56),(57,'Etiyopya',57),(58,'Faroe Adaları (DK)',58),(59,'Fas',59),(60,'Fiji',60),(61,'Fildişi Sahili',61),(62,'Filipinler',62),(63,'Filistin Bölgeleri',63),(64,'Finlandiya',64),(65,'Fransa',65),(66,'Fransız Guyanası (FR)',66),(67,'Fransız Polinezyası (FR)',67),(68,'Gabon',68),(69,'Gambiya',69),(70,'Gana',70),(71,'Gine',71),(72,'Gine Bissau',72),(73,'Grenada',73),(74,'Grönland (DK)',74),(75,'Guadeloupe (FR)',75),(76,'Guam',76),(77,'Guatemala',77),(78,'Guyana',78),(79,'Güney Afrika',79),(80,'Güney Kore',80),(81,'Gürcistan',81),(82,'Haiti',82),(83,'Hırvatistan',83),(84,'Hindistan',84),(85,'Hollanda',85),(86,'Honduras',86),(87,'Hong Kong (CN)',87),(88,'Irak',88),(89,'İngiliz Virjin Adaları',89),(90,'İngiltere',90),(91,'İrlanda',91),(92,'İspanya',92),(93,'İsrail',93),(94,'İsveç',94),(95,'İsviçre',95),(96,'İtalya',96),(97,'İzlanda',97),(98,'Jamaika',98),(99,'Japonya',99),(100,'Kamboçya',100),(101,'Kamerun',101),(102,'Kanada',102),(103,'Karadağ',103),(104,'Katar',104),(105,'Kazakistan',105),(106,'Kenya',106),(107,'Kıbrıs',107),(108,'Kırgızistan',108),(109,'Kiribati',109),(110,'Kolombiya',110),(111,'Kongo',111),(112,'Kongo Cumhuriyeti',112),(113,'Kosovo',113),(114,'Kosta Rika',114),(115,'Kuveyt',115),(116,'Kuzey Mariana Adaları',116),(117,'Küba',117),(118,'Laos',118),(119,'Lesoto',119),(120,'Letonya',120),(121,'Liberya',121),(122,'Libya',122),(123,'Lihtenştayn',123),(124,'Litvanya',124),(125,'Lübnan',125),(126,'Lüksemburg',126),(127,'Macaristan',127),(128,'Madagaskar',128),(129,'Makao (CN)',129),(130,'Makedonya',130),(131,'Malavi',131),(132,'Maldivler',132),(133,'Malezya',133),(134,'Mali',134),(135,'Malta',135),(136,'Marshall Adaları',136),(137,'Martinique (FR)',137),(138,'Mauritius',138),(139,'Mayotte (FR)',139),(140,'Meksika',140),(141,'Mısır',141),(142,'Mikronezya',142),(143,'Moğolistan',143),(144,'Moldova',144),(145,'Monako',145),(146,'Montserrat',146),(147,'Moritanya',147),(148,'Mozambik',148),(149,'Myanmar',149),(150,'Namibya',150),(151,'Nauru',151),(152,'Nepal',152),(153,'Nijer',153),(154,'Nijerya',154),(155,'Nikaragua',155),(156,'Norfolk Adası',156),(157,'Norveç',157),(158,'Orta Afrika Cumhuriyeti',158),(159,'Özbekistan',159),(160,'Pakistan',160),(161,'Palau',161),(162,'Panama',162),(163,'Papua Yeni Gine',163),(164,'Paraguay',164),(165,'Peru',165),(166,'Polonya',166),(167,'Portekiz',167),(168,'Porto Riko (US)',168),(169,'Réunion (FR)',169),(170,'Romanya',170),(171,'Ruanda',171),(172,'Rusya',172),(173,'Saint Barthélemy',173),(174,'Saint Kitts ve Nevis',174),(175,'Saint Lucia',175),(176,'Saint Martin',176),(177,'Saint Pierre ve Miquelon (FR)',177),(178,'Saint Vincent ve Grenadinler',178),(179,'Samoa',179),(180,'San Marino',180),(181,'São Tomé ve Príncipe',181),(182,'Senegal',182),(183,'Seyşeller',183),(184,'Sırbistan',184),(185,'Sierra Leone',185),(186,'Singapur',186),(187,'Sint Maarten',187),(188,'Slovakya Cumhuriyeti',188),(189,'Slovenya',189),(190,'Solomon Adaları',190),(191,'Sri Lanka',191),(192,'Surinam',192),(193,'Suudi Arabistan',193),(194,'Svaziland',194),(195,'Şili',195),(196,'Tacikistan',196),(197,'Tanzanya',197),(198,'Tayland',198),(199,'Tayvan',199),(200,'Togo',200),(201,'Tonga',201),(202,'Trinidad ve Tobago',202),(203,'Tunus',203),(204,'Turks ve Caicos',204),(205,'Tuvalu',205),(206,'Türkmenistan',206),(207,'Uganda',207),(208,'Ukrayna',208),(209,'Umman',209),(210,'Uruguay',210),(211,'Ürdün',211),(212,'Vanuatu',212),(213,'Vatikan',213),(214,'Venezuela',214),(215,'Vietnam',215),(216,'Virjin Adaları (ABD)',216),(217,'Wallis ve Futuna (FR)',217),(218,'Yeni Kaledonya (FR)',218),(219,'Yeni Zelanda',219),(220,'Yeşil Burun Adaları',220),(221,'Yunanistan',221),(222,'Zambiya',222),(223,'Zimbabve',223),(224,'Turkey',224);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_codes`
--

DROP TABLE IF EXISTS `country_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country_codes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(3) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_codes`
--

LOCK TABLES `country_codes` WRITE;
/*!40000 ALTER TABLE `country_codes` DISABLE KEYS */;
INSERT INTO `country_codes` VALUES (1,'US'),(2,'AF'),(3,'DE'),(4,'AS'),(5,'AD'),(6,'AO'),(7,'AI'),(8,'AG'),(9,'AR'),(10,'AL'),(11,'AW'),(12,'AU'),(13,'AT'),(14,'AZ'),(15,'BS'),(16,'BH'),(17,'BD'),(18,'BB'),(19,'BE'),(20,'BZ'),(21,'BJ'),(22,'BM'),(23,'BY'),(24,'BT'),(25,'AE'),(26,'BO'),(27,'BQ'),(28,'BA'),(29,'BW'),(30,'BR'),(31,'BN'),(32,'BG'),(33,'BF'),(34,'BI'),(35,'KY'),(36,'GI'),(37,'DZ'),(38,'CX'),(39,'DJ'),(40,'CC'),(41,'CK'),(42,'CW'),(43,'TD'),(44,'CZ'),(45,'CN'),(46,'DK'),(47,'TL'),(48,'DO'),(49,'DM'),(50,'EC'),(51,'GQ'),(52,'SV'),(53,'ID'),(54,'ER'),(55,'AM'),(56,'EE'),(57,'ET'),(58,'FO'),(59,'MA'),(60,'FJ'),(61,'CI'),(62,'PH'),(63,'PS'),(64,'FI'),(65,'FR'),(66,'GF'),(67,'PF'),(68,'GA'),(69,'GM'),(70,'GH'),(71,'GN'),(72,'GW'),(73,'GD'),(74,'GL'),(75,'GP'),(76,'GU'),(77,'GT'),(78,'GY'),(79,'ZA'),(80,'KR'),(81,'GE'),(82,'HT'),(83,'HR'),(84,'IN'),(85,'NL'),(86,'HN'),(87,'HK'),(88,'IQ'),(89,'VG'),(90,'GB'),(91,'IE'),(92,'ES'),(93,'IL'),(94,'SE'),(95,'CH'),(96,'IT'),(97,'IS'),(98,'JM'),(99,'JP'),(100,'KH'),(101,'CM'),(102,'CA'),(103,'ME'),(104,'QA'),(105,'KZ'),(106,'KE'),(107,'CY'),(108,'KG'),(109,'KI'),(110,'CO'),(111,'CD'),(112,'CG'),(113,'YK'),(114,'CR'),(115,'KW'),(116,'MP'),(117,'CU'),(118,'LA'),(119,'LS'),(120,'LV'),(121,'LR'),(122,'LY'),(123,'LI'),(124,'LT'),(125,'LB'),(126,'LU'),(127,'HU'),(128,'MG'),(129,'MO'),(130,'MK'),(131,'MW'),(132,'MV'),(133,'MY'),(134,'ML'),(135,'MT'),(136,'MH'),(137,'MQ'),(138,'MU'),(139,'YT'),(140,'MX'),(141,'EG'),(142,'FM'),(143,'MN'),(144,'MD'),(145,'MC'),(146,'MS'),(147,'MR'),(148,'MZ'),(149,'MM'),(150,'NA'),(151,'NR'),(152,'NP'),(153,'NE'),(154,'NG'),(155,'NI'),(156,'NF'),(157,'NO'),(158,'CF'),(159,'UZ'),(160,'PK'),(161,'PW'),(162,'PA'),(163,'PG'),(164,'PY'),(165,'PE'),(166,'PL'),(167,'PT'),(168,'PR'),(169,'RE'),(170,'RO'),(171,'RW'),(172,'RU'),(173,'BL'),(174,'KN'),(175,'LC'),(176,'MF'),(177,'PM'),(178,'VC'),(179,'WS'),(180,'SM'),(181,'ST'),(182,'SN'),(183,'SC'),(184,'RS'),(185,'SL'),(186,'SG'),(187,'SX'),(188,'SK'),(189,'SI'),(190,'SB'),(191,'LK'),(192,'SR'),(193,'SA'),(194,'SZ'),(195,'CL'),(196,'TJ'),(197,'TZ'),(198,'TH'),(199,'TW'),(200,'TG'),(201,'TO'),(202,'TT'),(203,'TN'),(204,'TC'),(205,'TV'),(206,'TM'),(207,'UG'),(208,'UA'),(209,'OM'),(210,'UY'),(211,'JO'),(212,'VU'),(213,'VA'),(214,'VE'),(215,'VN'),(216,'VI'),(217,'WF'),(218,'NC'),(219,'NZ'),(220,'CV'),(221,'GR'),(222,'ZM'),(223,'ZW'),(224,'TR');
/*!40000 ALTER TABLE `country_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_types`
--

DROP TABLE IF EXISTS `delivery_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_types`
--

LOCK TABLES `delivery_types` WRITE;
/*!40000 ALTER TABLE `delivery_types` DISABLE KEYS */;
INSERT INTO `delivery_types` VALUES (1,'B2C'),(2,'B2B'),(3,'C2C');
/*!40000 ALTER TABLE `delivery_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_types`
--

DROP TABLE IF EXISTS `package_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_types`
--

LOCK TABLES `package_types` WRITE;
/*!40000 ALTER TABLE `package_types` DISABLE KEYS */;
INSERT INTO `package_types` VALUES (1,'documents'),(2,'standart');
/*!40000 ALTER TABLE `package_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `weight_id` bigint DEFAULT NULL,
  `region_id` bigint DEFAULT NULL,
  `package_type_id` bigint DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prices_weight` (`weight_id`),
  KEY `fk_prices_region` (`region_id`),
  KEY `fk_prices_package_type` (`package_type_id`),
  CONSTRAINT `fk_prices_package_type` FOREIGN KEY (`package_type_id`) REFERENCES `package_types` (`id`),
  CONSTRAINT `fk_prices_region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`),
  CONSTRAINT `fk_prices_weight` FOREIGN KEY (`weight_id`) REFERENCES `weights` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=491 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,1,1,1,2914),(2,1,2,1,2996),(3,1,3,1,3593),(4,1,4,1,3053),(5,1,5,1,3062),(6,1,6,1,3183),(7,1,7,1,3222),(8,1,8,1,5158),(9,1,9,1,5436),(10,1,10,1,5585),(11,1,11,1,5745),(12,1,12,1,5005),(13,1,13,1,6990),(14,1,14,1,5158),(15,2,1,1,3192),(16,2,2,1,3284),(17,2,3,1,3888),(18,2,4,1,3345),(19,2,5,1,3357),(20,2,6,1,3536),(21,2,7,1,3532),(22,2,8,1,5344),(23,2,9,1,5693),(24,2,10,1,5875),(25,2,11,1,6045),(26,2,12,1,5177),(27,2,13,1,7940),(28,2,14,1,5344),(29,3,1,1,3414),(30,3,2,1,3510),(31,3,3,1,4185),(32,3,4,1,3574),(33,3,5,1,3586),(34,3,6,1,3790),(35,3,7,1,3779),(36,3,8,1,5531),(37,3,9,1,5948),(38,3,10,1,6170),(39,3,11,1,6346),(40,3,12,1,5352),(41,3,13,1,8888),(42,3,14,1,5531),(43,4,1,1,3633),(44,4,2,1,3736),(45,4,3,1,4482),(46,4,4,1,3807),(47,4,5,1,3819),(48,4,6,1,4010),(49,4,7,1,4027),(50,4,8,1,5717),(51,4,9,1,6207),(52,4,10,1,6459),(53,4,11,1,6645),(54,4,12,1,5524),(55,4,13,1,9838),(56,4,14,1,5717),(57,5,1,1,3854),(58,5,2,1,3965),(59,5,3,1,4776),(60,5,4,1,4038),(61,5,5,1,4053),(62,5,6,1,4284),(63,5,7,1,4267),(64,5,8,1,5903),(65,5,9,1,6464),(66,5,10,1,6752),(67,5,11,1,6948),(68,5,12,1,5696),(69,5,13,1,10788),(70,5,14,1,5903),(71,1,1,2,3449),(72,1,2,2,3546),(73,1,3,2,3994),(74,1,4,2,3740),(75,1,5,2,3777),(76,1,6,2,4244),(77,1,7,2,4442),(78,1,8,2,5884),(79,1,9,2,6349),(80,1,10,2,6625),(81,1,11,2,6813),(82,1,12,2,5495),(83,1,13,2,7294),(84,1,14,2,5884),(85,2,1,2,3595),(86,2,2,2,3699),(87,2,3,2,4246),(88,2,4,2,3904),(89,2,5,2,3939),(90,2,6,2,4357),(91,2,7,2,4559),(92,2,8,2,5993),(93,2,9,2,6504),(94,2,10,2,6801),(95,2,11,2,6997),(96,2,12,2,5613),(97,2,13,2,8338),(98,2,14,2,5993),(99,3,1,2,3746),(100,3,2,2,3852),(101,3,3,2,4498),(102,3,4,2,4067),(103,3,5,2,4102),(104,3,6,2,4467),(105,3,7,2,4680),(106,3,8,2,6099),(107,3,9,2,6659),(108,3,10,2,6978),(109,3,11,2,7179),(110,3,12,2,5731),(111,3,13,2,9383),(112,3,14,2,6099),(113,4,1,2,3892),(114,4,2,2,4004),(115,4,3,2,4753),(116,4,4,2,4227),(117,4,5,2,4267),(118,4,6,2,4581),(119,4,7,2,4798),(120,4,8,2,6205),(121,4,9,2,6816),(122,4,10,2,7155),(123,4,11,2,7362),(124,4,12,2,5851),(125,4,13,2,10427),(126,4,14,2,6205),(127,5,1,2,4040),(128,5,2,2,4156),(129,5,3,2,5005),(130,5,4,2,4390),(131,5,5,2,4430),(132,5,6,2,4694),(133,5,7,2,4915),(134,5,8,2,6311),(135,5,9,2,6970),(136,5,10,2,7331),(137,5,11,2,7542),(138,5,12,2,5969),(139,5,13,2,11472),(140,5,14,2,6311),(141,6,1,2,5509),(142,6,2,2,5667),(143,6,3,2,6938),(144,6,4,2,5993),(145,6,5,2,6052),(146,6,6,2,6655),(147,6,7,2,6639),(148,6,8,2,8489),(149,6,9,2,9442),(150,6,10,2,9949),(151,6,11,2,10234),(152,6,12,2,8051),(153,6,13,2,16642),(154,6,14,2,8489),(155,7,1,2,5708),(156,7,2,2,5870),(157,7,3,2,7278),(158,7,4,2,6207),(159,7,5,2,6269),(160,7,6,2,6484),(161,7,7,2,6797),(162,7,8,2,8631),(163,7,9,2,9645),(164,7,10,2,10187),(165,7,11,2,10481),(166,7,12,2,8209),(167,7,13,2,18033),(168,7,14,2,8631),(169,8,1,2,5906),(170,8,2,2,6078),(171,8,3,2,7619),(172,8,4,2,6423),(173,8,5,2,6484),(174,8,6,2,6931),(175,8,7,2,6956),(176,8,8,2,8775),(177,8,9,2,9852),(178,8,10,2,10423),(179,8,11,2,10727),(180,8,12,2,8367),(181,8,13,2,19431),(182,8,14,2,8775),(183,9,1,2,6108),(184,9,2,2,6283),(185,9,3,2,7956),(186,9,4,2,6641),(187,9,5,2,6706),(188,9,6,2,7131),(189,9,7,2,7256),(190,9,8,2,8918),(191,9,9,2,10064),(192,9,10,2,10656),(193,9,11,2,10967),(194,9,12,2,8527),(195,9,13,2,20829),(196,9,14,2,6561),(197,10,1,2,6330),(198,10,2,2,6516),(199,10,3,2,8313),(200,10,4,2,6889),(201,10,5,2,6956),(202,10,6,2,7466),(203,10,7,2,7445),(204,10,8,2,9079),(205,10,9,2,10307),(206,10,10,2,10918),(207,10,11,2,11236),(208,10,12,2,8711),(209,10,13,2,22255),(210,10,14,2,9079),(211,11,1,2,6563),(212,11,2,2,6750),(213,11,3,2,8801),(214,11,4,2,7136),(215,11,5,2,7200),(216,11,6,2,8065),(217,11,7,2,8039),(218,11,8,2,9307),(219,11,9,2,10625),(220,11,10,2,11285),(221,11,11,2,11611),(222,11,12,2,8944),(223,11,13,2,23679),(224,11,14,2,9307),(225,12,1,2,7273),(226,12,2,2,7484),(227,12,3,2,9286),(228,12,4,2,7914),(229,12,5,2,7984),(230,12,6,2,8650),(231,12,7,2,8624),(232,12,8,2,9538),(233,12,9,2,10936),(234,12,10,2,11648),(235,12,11,2,11986),(236,12,12,2,9175),(237,12,13,2,25105),(238,12,14,2,9538),(239,13,1,2,7775),(240,13,2,2,8006),(241,13,3,2,9767),(242,13,4,2,8463),(243,13,5,2,8534),(244,13,6,2,9703),(245,13,7,2,9211),(246,13,8,2,9765),(247,13,9,2,11250),(248,13,10,2,12014),(249,13,11,2,12358),(250,13,12,2,9404),(251,13,13,2,26531),(252,13,14,2,9765),(253,14,1,2,8815),(254,14,2,2,9072),(255,14,3,2,10906),(256,14,4,2,9590),(257,14,5,2,9675),(258,14,6,2,10331),(259,14,7,2,10432),(260,14,8,2,10630),(261,14,9,2,12309),(262,14,10,2,13163),(263,14,11,2,13549),(264,14,12,2,10250),(265,14,13,2,29742),(266,14,14,2,10630),(267,15,1,2,9350),(268,15,2,2,9630),(269,15,3,2,11432),(270,15,4,2,10173),(271,15,5,2,10262),(272,15,6,2,10430),(273,15,7,2,11052),(274,15,8,2,10873),(275,15,9,2,12643),(276,15,10,2,13558),(277,15,11,2,13944),(278,15,12,2,10500),(279,15,13,2,31256),(280,15,14,2,10873),(281,16,1,2,9894),(282,16,2,2,10184),(283,16,3,2,11948),(284,16,4,2,10762),(285,16,5,2,10859),(286,16,6,2,11019),(287,16,7,2,11681),(288,16,8,2,11116),(289,16,9,2,12980),(290,16,10,2,13944),(291,16,11,2,14344),(292,16,12,2,10745),(293,16,13,2,32774),(294,16,14,2,11116),(295,17,1,2,10432),(296,17,2,2,10736),(297,17,3,2,12459),(298,17,4,2,11349),(299,17,5,2,11448),(300,17,6,2,11615),(301,17,7,2,12311),(302,17,8,2,11363),(303,17,9,2,13315),(304,17,10,2,14327),(305,17,11,2,14741),(306,17,12,2,10991),(307,17,13,2,34287),(308,17,14,2,11363),(309,18,1,2,10969),(310,18,2,2,11297),(311,18,3,2,12976),(312,18,4,2,11941),(313,18,5,2,12042),(314,18,6,2,12212),(315,18,7,2,12933),(316,18,8,2,11611),(317,18,9,2,13655),(318,18,10,2,14716),(319,18,11,2,15141),(320,18,12,2,11236),(321,18,13,2,35806),(322,18,14,2,11611),(323,19,1,2,11535),(324,19,2,2,11872),(325,19,3,2,13491),(326,19,4,2,12551),(327,19,5,2,12610),(328,19,6,2,12797),(329,19,7,2,13565),(330,19,8,2,11846),(331,19,9,2,13987),(332,19,10,2,15109),(333,19,11,2,15544),(334,19,12,2,11483),(335,19,13,2,37322),(336,19,14,2,11846),(337,20,1,2,12096),(338,20,2,2,12455),(339,20,3,2,14013),(340,20,4,2,13162),(341,20,5,2,13221),(342,20,6,2,13393),(343,20,7,2,14197),(344,20,8,2,12094),(345,20,9,2,14324),(346,20,10,2,15496),(347,20,11,2,15941),(348,20,12,2,11724),(349,20,13,2,38849),(350,20,14,2,12094),(351,22,1,2,12756),(352,22,2,2,13144),(353,22,3,2,14869),(354,22,4,2,14110),(355,22,5,2,14213),(356,22,6,2,15343),(357,22,7,2,16263),(358,22,8,2,14310),(359,22,9,2,15651),(360,22,10,2,18322),(361,22,11,2,18853),(362,22,12,2,13131),(363,22,13,2,41384),(364,22,14,2,14310),(365,24,1,2,13419),(366,24,2,2,13836),(367,24,3,2,15727),(368,24,4,2,15057),(369,24,5,2,15206),(370,24,6,2,17295),(371,24,7,2,18337),(372,24,8,2,16531),(373,24,9,2,16979),(374,24,10,2,21151),(375,24,11,2,21769),(376,24,12,2,14541),(377,24,13,2,43923),(378,24,14,2,16531),(379,26,1,2,14081),(380,26,2,2,14529),(381,26,3,2,16583),(382,26,4,2,16005),(383,26,5,2,16203),(384,26,6,2,19242),(385,26,7,2,20409),(386,26,8,2,18752),(387,26,9,2,18311),(388,26,10,2,23983),(389,26,11,2,24681),(390,26,12,2,15953),(391,26,13,2,46462),(392,26,14,2,18752),(393,28,1,2,14738),(394,28,2,2,12863),(395,28,3,2,17441),(396,28,4,2,16957),(397,28,5,2,17198),(398,28,6,2,21194),(399,28,7,2,22479),(400,28,8,2,20972),(401,28,9,2,19638),(402,28,10,2,26808),(403,28,11,2,27597),(404,28,12,2,17363),(405,28,13,2,48996),(406,28,14,2,20972),(407,30,1,2,15402),(408,30,2,2,15915),(409,30,3,2,18301),(410,30,4,2,17905),(411,30,5,2,18193),(412,30,6,2,23144),(413,30,7,2,24551),(414,30,8,2,23191),(415,30,9,2,20970),(416,30,10,2,29638),(417,30,11,2,30508),(418,30,12,2,18775),(419,30,13,2,51535),(420,30,14,2,23191),(421,32,1,2,16063),(422,32,2,2,16606),(423,32,3,2,19157),(424,32,4,2,18853),(425,32,5,2,19188),(426,32,6,2,25096),(427,32,7,2,26620),(428,32,8,2,25411),(429,32,9,2,22297),(430,32,10,2,32470),(431,32,11,2,33422),(432,32,12,2,20185),(433,32,13,2,54074),(434,32,14,2,25411),(435,34,1,2,16724),(436,34,2,2,17297),(437,34,3,2,20015),(438,34,4,2,19803),(439,34,5,2,20180),(440,34,6,2,27043),(441,34,7,2,28691),(442,34,8,2,27632),(443,34,9,2,23625),(444,34,10,2,35296),(445,34,11,2,36336),(446,34,12,2,21597),(447,34,13,2,56611),(448,34,14,2,27632),(449,36,1,2,17384),(450,36,2,2,17990),(451,36,3,2,20871),(452,36,4,2,20753),(453,36,5,2,21177),(454,36,6,2,28995),(455,36,7,2,30761),(456,36,8,2,29852),(457,36,9,2,24956),(458,36,10,2,38125),(459,36,11,2,39250),(460,36,12,2,23004),(461,36,13,2,59150),(462,36,14,2,29852),(463,38,1,2,18047),(464,38,2,2,18681),(465,38,3,2,21729),(466,38,4,2,21701),(467,38,5,2,22170),(468,38,6,2,30945),(469,38,7,2,32833),(470,38,8,2,32069),(471,38,9,2,26283),(472,38,10,2,40954),(473,38,11,2,42164),(474,38,12,2,24417),(475,38,13,2,61689),(476,38,14,2,32069),(477,40,1,2,18709),(478,40,2,2,19376),(479,40,3,2,22590),(480,40,4,2,22651),(481,40,5,2,23167),(482,40,6,2,32897),(483,40,7,2,34903),(484,40,8,2,34290),(485,40,9,2,27616),(486,40,10,2,43783),(487,40,11,2,45078),(488,40,12,2,25826),(489,40,13,2,64228),(490,40,14,2,34290);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `en_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ro_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `tr_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `gtip_code` bigint NOT NULL,
  `item_code` bigint NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `warning` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_types`
--

LOCK TABLES `product_types` WRITE;
/*!40000 ALTER TABLE `product_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receivers`
--

DROP TABLE IF EXISTS `receivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receivers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `full_address` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `description` text COLLATE utf8mb4_bin NOT NULL,
  `country_id` bigint DEFAULT NULL,
  `city_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_receivers_country` (`country_id`),
  KEY `fk_receivers_city` (`city_id`),
  CONSTRAINT `fk_receivers_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `fk_receivers_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receivers`
--

LOCK TABLES `receivers` WRITE;
/*!40000 ALTER TABLE `receivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `receivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `senders`
--

DROP TABLE IF EXISTS `senders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `senders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `full_address` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `receive_office` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ikamet_id` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `country_id` bigint DEFAULT NULL,
  `city_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_senders_country` (`country_id`),
  KEY `fk_senders_city` (`city_id`),
  CONSTRAINT `fk_senders_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `fk_senders_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `senders`
--

LOCK TABLES `senders` WRITE;
/*!40000 ALTER TABLE `senders` DISABLE KEYS */;
/*!40000 ALTER TABLE `senders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment_items`
--

DROP TABLE IF EXISTS `shipment_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `shipment_id` bigint DEFAULT NULL,
  `en_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ro_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `tr_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `gtip_code` bigint NOT NULL,
  `item_code` bigint NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `value_for_one` int NOT NULL,
  `count` int NOT NULL,
  `warning` tinyint(1) NOT NULL,
  `total_price_try` bigint DEFAULT NULL,
  `total_price_usd` bigint DEFAULT NULL,
  `country_code_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_shipment_items_deleted_at` (`deleted_at`),
  KEY `fk_shipment_items_country_code` (`country_code_id`),
  CONSTRAINT `fk_shipment_items_country_code` FOREIGN KEY (`country_code_id`) REFERENCES `country_codes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment_items`
--

LOCK TABLES `shipment_items` WRITE;
/*!40000 ALTER TABLE `shipment_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipment_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipments`
--

DROP TABLE IF EXISTS `shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `trc` longtext COLLATE utf8mb4_bin,
  `delivery_type_id` bigint DEFAULT NULL,
  `price_usd` bigint DEFAULT NULL,
  `price_try` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  `receiver_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_shipments_deleted_at` (`deleted_at`),
  KEY `fk_shipments_delivery_type` (`delivery_type_id`),
  KEY `fk_shipments_sender` (`sender_id`),
  KEY `fk_shipments_receiver` (`receiver_id`),
  CONSTRAINT `fk_shipments_delivery_type` FOREIGN KEY (`delivery_type_id`) REFERENCES `delivery_types` (`id`),
  CONSTRAINT `fk_shipments_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `receivers` (`id`),
  CONSTRAINT `fk_shipments_sender` FOREIGN KEY (`sender_id`) REFERENCES `senders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipments`
--

LOCK TABLES `shipments` WRITE;
/*!40000 ALTER TABLE `shipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weights`
--

DROP TABLE IF EXISTS `weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weights` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `weight` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weights`
--

LOCK TABLES `weights` WRITE;
/*!40000 ALTER TABLE `weights` DISABLE KEYS */;
INSERT INTO `weights` VALUES (1,0.5),(2,1),(3,1.5),(4,2),(5,2.5),(6,3),(7,3.5),(8,4),(9,4.5),(10,5),(11,5.5),(12,6),(13,6.5),(14,7),(15,7.5),(16,8),(17,8.5),(18,9),(19,9.5),(20,10),(21,10.5),(22,11),(23,11.5),(24,12),(25,12.5),(26,13),(27,13.5),(28,14),(29,14.5),(30,15),(31,15.5),(32,16),(33,16.5),(34,17),(35,17.5),(36,18),(37,18.5),(38,19),(39,19.5),(40,20);
/*!40000 ALTER TABLE `weights` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 21:12:11
