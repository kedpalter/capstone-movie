-- CREATE TABLE
CREATE TABLE
    IF NOT EXISTS `Movies` (
        `movieId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `movieName` VARCHAR(255) NOT NULL,
        `movieTrailer` VARCHAR(255),
        `movieImage` VARCHAR(255),
        `movieDescription` TEXT,
        `dateRelease` DATETIME,
        `movieRating` INT,
        `isTrending` BOOLEAN,
        `isShowing` BOOLEAN,
        `isUpcoming` BOOLEAN,
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Banners` (
        `bannerId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `movieId` INT NOT NULL,
        `bannerImage` VARCHAR(255) NOT NULL,
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Brands` (
        `brandId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `brandName` VARCHAR(255) NOT NULL,
        `brandLogo` VARCHAR(255),
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Cinemas` (
        `cinemaId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `cinemaName` VARCHAR(255) NOT NULL,
        `cinemaAddress` VARCHAR(255),
        `brandId` INT,
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Screens` (
        `screenId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `screenName` VARCHAR(255),
        `cinemaId` INT NOT NULL,
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Seats` (
        `seatId` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `seatName` CHAR(3) NOT NULL,
        `seatType` VARCHAR(255) NOT NULL,
        `screenId` INT NOT NULL,
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Users` (
        `userId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `userFullname` VARCHAR(255),
        `userEmail` VARCHAR(255) NOT NULL UNIQUE,
        `userPhone` VARCHAR(255),
        `userPassword` VARCHAR(255) NOT NULL,
        `userType` VARCHAR(255),
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Showtime` (
        `showId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `screenId` INT NOT NULL,
        `movieId` INT NOT NULL,
        `showTime` DATETIME NOT NULL,
        `bookingPrice` INT NOT NULL,
        `isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `Booking` (
        `bookingId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `userId` INT NOT NULL,
        `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `BookingDetail` (
        `detailId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `bookingId` INT NOT NULL,
        `showId` INT NOT NULL,
        `seatId` INT NOT NULL,
        UNIQUE (`showId`, `seatId`)
    );

-- SET FK
ALTER TABLE `Banners`
ADD FOREIGN KEY (`movieId`) REFERENCES `Movies`(`movieId`);

ALTER TABLE `Cinemas`
ADD FOREIGN KEY (`brandId`) REFERENCES `Brands`(`brandId`);

ALTER TABLE `Screens`
ADD FOREIGN KEY (`cinemaId`) REFERENCES `Cinemas`(`cinemaId`);

ALTER TABLE `Seats`
ADD FOREIGN KEY (`screenId`) REFERENCES `Screens`(`screenId`);

ALTER TABLE `Showtime`
ADD FOREIGN KEY (`screenId`) REFERENCES `Screens`(`screenId`),
ADD FOREIGN KEY (`movieId`) REFERENCES `Movies`(`movieId`);

ALTER TABLE `Booking`
ADD FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`),
ADD FOREIGN KEY (`showId`) REFERENCES `Showtime`(`showId`),
ADD FOREIGN KEY (`seatId`) REFERENCES `Seats`(`seatId`);

ALTER TABLE `BookingDetail`
ADD FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`bookingId`),
ADD FOREIGN KEY (`showId`) REFERENCES `Showtime`(`showId`),
ADD FOREIGN KEY (`seatId`) REFERENCES `Seats`(`seatId`);
-- MOCK
INSERT INTO `Movies` (`movieName`, `movieTrailer`, `movieImage`, `movieDescription`, `dateRelease`, `movieRating`, `isTrending`, `isShowing`, `isUpcoming`)
VALUES
('Avengers: Endgame', 'https://youtube.com', 'https://google.com', 'Superhero movie', '2019-04-26 00:00:00', 9, 1, 0, 0),
('Inception', 'https://youtube.com', 'https://google.com', 'Sci-fi thriller', '2010-07-16 00:00:00', 8, 0, 0, 0);

INSERT INTO `Banners` (`movieId`, `bannerImage`)
VALUES
(1, 'mockBanner.jpg'),
(2, 'mockBanner.jpg');

INSERT INTO `Brands` (`brandName`, `brandLogo`)
VALUES
('CGV', 'cgv.png'),
('Galaxy', 'galaxy.png'),
('Lotte', 'lotte.png');

INSERT INTO `Cinemas` (`cinemaName`, `cinemaAddress`, `brandId`)
VALUES
('CGV Vincom', '72 Le Thanh Ton, HCM', 1),
('Galaxy Nguyen Du', '116 Nguyen Du, HCM', 2),
('Lotte Go Vap', 'Nguyen Van Luong, HCM', 3);

INSERT INTO `Screens` (`screenName`, `cinemaId`)
VALUES
('Rạp A1', 1),
('Rạp B1', 2),
('Rạp C1', 3);

INSERT INTO `Seats` (`seatName`, `seatType`, `screenId`)
VALUES
('A01', 'Standard', 1),
('A02', 'Standard', 1),
('A03', 'Standard', 1),
('B01', 'Standard', 1),
('B02', 'Standard', 1),
('B03', 'Standard', 1),
('C01', 'Standard', 1),
('C02', 'Standard', 1),
('C03', 'Standard', 1),
('D01', 'Standard', 1),
('D02', 'Standard', 1),
('D03', 'Standard', 1),
('E01', 'Standard', 1),
('E02', 'Standard', 1),
('E03', 'Standard', 1),
('F01', 'VIP', 1),
('F02', 'VIP', 1),
('F03', 'VIP', 1),
('A01', 'Standard', 2),
('A02', 'Standard', 2),
('A03', 'Standard', 2),
('B01', 'Standard', 2),
('B02', 'Standard', 2),
('B03', 'Standard', 2),
('C01', 'Standard', 2),
('C02', 'Standard', 2),
('C03', 'Standard', 2),
('D01', 'Standard', 2),
('D02', 'Standard', 2),
('D03', 'Standard', 2),
('E01', 'Standard', 2),
('E02', 'Standard', 2),
('E03', 'Standard', 2),
('F01', 'Couple', 2),
('F02', 'Couple', 2),
('F03', 'Couple', 2),
('A01', 'Standard', 3),
('A02', 'Standard', 3),
('A03', 'Standard', 3),
('B01', 'Standard', 3),
('B02', 'Standard', 3),
('B03', 'Standard', 3),
('C01', 'Standard', 3),
('C02', 'Standard', 3),
('C03', 'Standard', 3),
('D01', 'Standard', 3),
('D02', 'Standard', 3),
('D03', 'Standard', 3),
('E01', 'Standard', 3),
('E02', 'Standard', 3),
('E03', 'Standard', 3),
('F01', 'Bed', 3),
('F02', 'Bed', 3),
('F03', 'Bed', 3);


INSERT INTO `Users` (`userFullname`, `userEmail`, `userPhone`, `userPassword`, `userType`)
VALUES
('Dat', 'd@gmail.com', '0909123456', 'qweasd', 'user'),
('Admin', 'admin@email.com', '0909988776', 'qweasd', 'admin');

INSERT INTO `Showtime` (`screenId`, `movieId`, `showTime`, `bookingPrice`)
VALUES
(1, 1, '2026-02-25 19:00:00', 100000),
(2, 2, '2026-02-26 20:00:00', 120000);

INSERT INTO `Booking` (`userId`)
VALUES
(1),
(2);

INSERT INTO `BookingDetail` (`bookingId`, `showId`, `seatId`)
VALUES
(1, 1, 1),
(2, 2, 3);