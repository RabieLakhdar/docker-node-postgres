// Update with your config settings.
require('dotenv').config()

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = process.env
module.exports = {

  development: {
    client: 'pg',
    connection: {
        database: DB_NAME,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
    },
    migrations: {
        directory: __dirname + '/database/migrations',
    },
    seeds: {
        directory: __dirname + '/database/seeds',
    },
},

};
