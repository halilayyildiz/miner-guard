-- historical btc daily price table
CREATE TABLE `BITCOIN_PRICE` (`DATE` TEXT, `PRICE_USD` REAL, `LAST_UPDATE` TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(`DATE`));