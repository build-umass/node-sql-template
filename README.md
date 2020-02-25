# Node.js SQL Template
This repository contains sample code for setting up a Node.js server that uses Express.js to handle HTTP requests and gets data from a SQL backend (postgres in this example).

## Setup
Clone the repository and install the project dependencies
  - You might want to delete package-lock.json before running npm install, so your dependencies are up-to-date.
```
git clone github.com/build-umass/node-sql-template  
cd node-sql-template
npm install
```
For local development, install postgres on your machine.  
Copy the .env.sample file to a .env file and fill in the missing values
  - The .env file should not be checked into the repository, it contains production secrets!
  - When starting up, the server will read the database credentials/other info from the .env file.
