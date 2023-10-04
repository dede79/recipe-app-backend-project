# Backend app

This app was created with `@command-shift/create-backend-app`


How to run this app:

- Install and configure [Docker] (https://docs.docker.com/get-docker/).

- in your terminal, run the following command to install the postgreSQL image and setup a Docker container that will be the database:
`docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres`

- Make sure to press the "play" button in the "container" tab to run the postgresql container in your Docker Desktop.

- Install [PGAdmin 4] (https://www.pgadmin.org/download/)

- When you run pgAdmin, You should see a Add New Server button. Click it and use the following credentials to connect:
 `Hostname/address: localhost
 User: postgres
 Password: password`

- Create a .env file in the root of thisproject and add the details below:
  `PGUSER=postgres
  PGHOST=localhost
  PGPASSWORD=password
  PGDATABASE=recipes
  PGPORT=5432
  PORT=3001`

- Finally, run `npm install` then `npm start` command in the terminal and the tables (and any table migrations) will be created and the backend app should be listening on port 3001.
