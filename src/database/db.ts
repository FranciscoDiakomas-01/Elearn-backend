import dotenv from 'dotenv'
import { Pool} from 'pg'

dotenv.config()

const db = new Pool({
  port: Number(process.env.DBPORT),
  database: String(process.env.DATABASE),
  host: String(process.env.DBHOST),
  user: String(process.env.DBUSER),
  password: String(process.env.DBPASSWORD),
});


export default db
