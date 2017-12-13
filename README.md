# KBIts Application #

## Steps ##
 1. run `echo config/database.sample.json > config/database.json`

 2. provide the mongo connection url inside `database.json` file.

 3. run `npm install`

 4. run `npm start` 

 5. for test  start a server `export NODE_ENV=test && npm start` and then run `npm test`

 ## Documentation ##

 please check the route for documetation `http://localhost:3001/public/docs/index.html`