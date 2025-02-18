import server from "./app";
import dotenv from 'dotenv'
import { MigrationRunner } from "./database/migrationRunner";

dotenv.config()
const PORT = process.env.PORT
server.listen(PORT , async()=>{
  await MigrationRunner()
  console.log("Server running sucessly!")
})