# Miner Guard
Cryptocurrency Miner Pool Status Checker

## About
This application simply checks earnings of the miners on ahashpool. Supports multiple users and periodically updates miner earnings via pool service API.

## API Usage

Get hourly earnings of user with id = 1 

`http://localhost:8080/api/earning/1/hourly`

Get daily earnings of user with id = 1 

`http://localhost:8080/api/earning/1/daily`
