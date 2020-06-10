const pg = require('pg')
const db = new pg.Client()

await db.connect()

const res = await db.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await db.end()
