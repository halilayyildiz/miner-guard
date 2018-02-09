# Miner Guard
Cryptocurrency Miner Pool Status Checker

## About
This application simply checks earnings of the miners on ahashpool. Supports multiple users and periodically updates miner earnings via pool service API.

## Demo
I am simply hosting this application on DigitalOcean Ubuntu droplet. You can access the demo app via the link below:

[Miner Guard](http://miner.halilayyildiz.com/)


## Technology Stack
Component         | Technology
---               | ---
Frontend          | [Angular 5](https://github.com/angular/angular), [PrimeNG](https://www.primefaces.org/primeng/)
Backend           | [NodeJS](https://nodejs.org), [Express](https://expressjs.com/)
Security          | Token Based ([JWT](https://github.com/auth0/java-jwt) ) 
Persistence       | [Sqlite](https://www.npmjs.com/package/sqlite3)
Client Build Tools| [angular-cli](https://github.com/angular/angular-cli), [npm](https://www.npmjs.com/)
Server Runtime    | [Nginx](https://www.nginx.com/), [PM2](http://pm2.keymetrics.io/)


## Project Structure
```bash
PROJECT_FOLDER
│  README.md
│  LICENCE           
└──[backend]  
│  │  package.json      
│  │  server.js               # entry point of the program 
│  └──[webui]                 # auto-generated frontend build code
│  └──[app]
│     │  MinerGuard.js 
│     └──[api]
│     │  └──[routes]          # route definitions
│     │  └──[controllers]     # controllers implementations for APIs
│     └──[conf]               # configuration files
│     └──[db]                 # database scripts, migration folder etc
│     └──[model]              # Data model objects
│     └──[service]            # Service definitons
│     └──[util]     
│
└──[frontend]
   │  package.json     
   │  angular-cli.json        # ng build configurations)
   └──[node_modules]
   └──[src]                   # frontend source files
   └──[dist]                  # frontend build files, auto-created after running angular build: ng -build
```

## Prerequisites
- NodeJS 9.4.0
- NPM 5.6.0
- Express 4.16.2  
- Sqllite 3.1.13
- Angular 5.2.0
- PrimeNG 5.2.0
- Angular-cli 1.6.3
- PM2 & Nginx

## How to build & run

Start with building the backend code. It is node.js application, so installing the dependencies is enough.

```bash
# Navigate to PROJECT_FOLDER/backend (should contain package.json)
npm install
# build the project (this will put the files under dist folder)
ng build --prod --aot=true
```

Then navigate to frontend folder and install dependencies. As a last step you need to build project to copy binaries under backend static resource folder.

```bash
# Navigate to PROJECT_FOLDER/frontend (should contain package.json)
npm install
# build the project (this will automtically copy the files into WEBUI folder under backend )
ng build --prod --aot=true
```

In order to start application, you need to run 'server.js' file with PM2 process manager.
```bash
# Navigate to PROJECT_FOLDER/backend (should contain sever.js)
pm2 start server.js
# In order to check application status, you need to run 'show' command
pm2 show server
```


## Application APIs

Daily Earnings

`http://miner.halilayyildiz.com/api/earning/1/daily/`

User Details

`http://miner.halilayyildiz.com/api/user/all/`
`http://miner.halilayyildiz.com/api/user/1/`

Currency Rates

`http://miner.halilayyildiz.com/api/currency/price/btcusd/`


## Screenshots

![UserEarnings](/screenshots/user-earnings.png?raw=true)


