# Node.js Sequelize Mysql Example

This repository contains a Node.js application that uses the Sequelize ORM to interact with a Mysql database. It includes examples of how to create, read records using Sequelize.

## Setup

Before running the project, you need to create a `.env` file in the root directory of the project. In this file, you should define the following environment variables:

PORT=8080
DB_NAME='DatabaseName'
DB_USERNAME='Your mysql username for example root'
PASSWORD='Mysql password'
HOST='localhost'

Replace the values of `DB_NAME`, `DB_USERNAME`, `PASSWORD`, and `HOST` with your own database credentials.

## Configuration

In the `./config/config.json` file, make sure to update the "development" settings to match your database settings.

## Usage

To add all tables to the database, run the following command:
```
npx sequelize-cli db:seed:all
```

To remove all created data, run the following command:

```
npx sequelize-cli db:seed:undo:all
```

To add data for a specific table, run the following command:

```
npx sequelize-cli db:seed --seed XXXXXXXX-filename.js
```

Replace `XXXXXXXX-filename.js` with the name of the seed file for the table you want to add data to.

To remove data for a specific table, run the following command:

```
npx sequelize-cli db:seed:undo --seed XXXXXXXX-filename.js
```

Replace `XXXXXXXX-filename.js` with the name of the seed file for the table you want to remove data from.

That's it! With these instructions, you should be able to set up and use this Node.js Sequelize PostgreSQL example project.
