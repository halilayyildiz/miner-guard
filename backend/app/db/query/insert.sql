-- add new user
INSERT INTO USER(NAME, EMAIL, PHONE, MINER_COUNT) VALUES('Gokhan', 'gkhncetin@gmail.com', '+905336292790', 1);
INSERT INTO WALLET(ADDRESS, USER_ID, TOTAL_EARNED) VALUES('3JXK2RJd65dfHEcX23F34hCRnYJgQy6ktk', 4, 0);

-- add new user
INSERT INTO USER(NAME, EMAIL, PHONE, MINER_COUNT) VALUES('Ercan', '', '', 1);
INSERT INTO WALLET(ADDRESS, USER_ID, TOTAL_EARNED) VALUES('1J3DCqBrxHtR7scfum1P2UYzvwLVn2cRFJ', 5, 0);

-- add new user
INSERT INTO USER(NAME, EMAIL, PHONE, MINER_COUNT) VALUES('Onur', null, null, 1);
INSERT INTO WALLET(ADDRESS, USER_ID, TOTAL_EARNED) VALUES('1LZKDhuvLwbBVqEXALKhXNeeT3LPdA6hBX', 6, 0);

-- add new wallet to user
INSERT INTO WALLET(ADDRESS, USER_ID, TOTAL_EARNED) VALUES('1Q2MMkSyiZf9cgaHtUP3gVqta8V1xNHRra', 1, 0);

