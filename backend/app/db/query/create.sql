CREATE TABLE "USER" ( `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `NAME` TEXT NOT NULL, `EMAIL` INTEGER UNIQUE, `PHONE` INTEGER UNIQUE, `MINER_COUNT` INTEGER, `LAST_UPDATE` TEXT DEFAULT CURRENT_TIMESTAMP );
CREATE TABLE "USER_EARNING" ( `USER_ID` INTEGER NOT NULL, `TOTAL_EARNING` REAL NOT NULL, `DATETIME` TEXT NOT NULL, `LAST_UPDATE` TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(`USER_ID`,`TOTAL_EARNING`,`DATETIME`) );
CREATE TABLE "WALLET" ( `ADDRESS` TEXT, `USER_ID` INTEGER NOT NULL, `TOTAL_EARNED` REAL NOT NULL, `LAST_UPDATE` TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(`ADDRESS`) );

-- historical btc daily price table
CREATE TABLE `BITCOIN_PRICE` (`DATE` TEXT, `PRICE_USD` REAL, `LAST_UPDATE` TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(`DATE`));