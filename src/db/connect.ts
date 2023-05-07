import { createConnection } from 'mysql2';
require('dotenv').config()
const db = createConnection({
    user: "root",
    host: "containers-us-west-72.railway.app",
    password: (process.env.mysqlPass),
    database: "railway",
    port:7384
  });

export default db