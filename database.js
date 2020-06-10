const pg = require('pg')
const db = new pg.Client()

db.connect()

const res = db.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
db.end()
