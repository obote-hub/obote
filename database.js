const pg = require('pg')
const db = new pg.Client({
  user: "bdnohmjkaxgeia",
  host: "ec2-18-232-143-90.compute-1.amazonaws.com",
  database: "dcc8frntoebsto",
  password: "d9e4d95612bddfdf01fc2c27e1848137840b22771f08cf3bb2f4cacb2cb9d4a9",
  port: 5432
})


module.exports = db
