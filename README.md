# Node.js SQL Template
This repository contains sample code for setting up a Node.js server that uses Express.js to handle HTTP requests and gets data from a SQL backend (postgres in this example).

## Setup
### Setting up the Postgres Docker Container
If you want to manually install Postgres, go to "Manually Install Postgres".

Otherwise, look at the [easy-postgres-docker repository](https://github.com/build-umass/easy-postgres-docker)

### Setting up the Project
Clone the repository and install the project dependencies
  - You might want to delete package-lock.json before running npm install so your dependencies are up-to-date.
```
git clone github.com/build-umass/node-sql-template  
cd node-sql-template
npm install
```
Copy the .env.sample file to a .env file and fill in the missing values
  - When starting up, the server will read the database credentials/other info from the .env file.  

Setup the initial database state:
```
npm run knex seed:run
npm run knex migrate:latest
```
Start the server:
```
npm run start
```

# Managing the Database
This template uses [knex.js](http://knexjs.org/) for interacting with the database. knex abstracts over SQL, so instead of writing
```
select `title`, `author`, `year` from `books`
```
you write
```
knex.select('title', 'author', 'year').from('books')
```
knex will prevent issues such as SQL injection, and it will automatically convert query results into Javascript objects/allow you to use Javascript objects in your queries.

## Seeding/Migration
Read the source code/comments.  
knexfile.js is used in 2 ways:
- by "database.js" to connect to the database at runtime. "database.js" exports a "knex" object which is used by the source code to query the database at runtime.
- by the knex command line tool (CLI) to run migrations/seeds
  - the knex CLI is not accessible from your terminal
  - Run it by doing "npm run knex [your arguments]"
    - npm will find the location of the knex CLI in your node_modules folder
    - "npm run knex" is a script in "package.json"
      - It passes in the location of knexfile.js, if you change the location of "knexfile.js", update the script

knex has the concept of "seeds" and "migrations"
- "seeds" initialize the database/populate it with some starting data
- "migrations" allow you to update your database schema/revert database changes

# General Understanding
For each request, several factors must be considered:
- Validation of input
  - Do the relevant url query parameters exist?
  - Is the body correctly formatted?
    - Example: If the request handler parses the request body into JSON, the request body text must be JSON.
- Error handling
  - Each call to knex.js can result in 3 states:
    - success
    - An execution failure (invalid table name/column name)
    - A fatal failure (the database itself crashed/connection to the database was lost)

    Rather than handling the last result everytime you call knex.js, you can let the exception be thrown and have error handling code (middleware) deal with it.
## Links
- The "guide" tab on https://expressjs.com/

# Misc
## Manually Install Postgres
These are some helpful tutorials:
- https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
  - For Mac OS
  - For Linux (Ubuntu)
    - install from apt
    - Use pg_ctlcluster instead of brew services start postgresql
    - pg_lsclusters for listing postgres clusters
    - pg_ctlcluster \<version> \<cluster> <action: start|stop|restart|reload>
    - Might have to modify "pg_hba.conf":
      - Find file with `find / -name 'pg_hba.conf' 2>/dev/null`
      - Change the line below `# "local" is for Unix domain socket connections only` from `local all all peer` to `local all all trust`.
      - Change the line below `# Database adminstrative login by Unix domain socket` from `local all postgres peer` to `local all postgres trust`.
- https://github.com/malnvenshorn/OctoPrint-FilamentManager/wiki/Setup-PostgreSQL-on-Arch-Linux
  - For Linux (Arch)
    - Use `sudo systemctl [start|restart|stop|etc.] postgresql.service` to manage the DB.
      - This might also work on other Linux distros
