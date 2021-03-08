const http = require('http')
const app = require('./app')
const { Client } = require('pg')

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`

const client = new Client({
  connectionString: connectionString,
})

const port = process.env.PORT || 5000

const server = http.createServer(app)
client.connect().then(
  server.listen(port, () => {
    console.log(`🌐 app listening at http://localhost:${port}`)
  })
).catch(err => {
    console.log(`🌐 error running cause : ${err.stack}`);
    client.end();
}
)

