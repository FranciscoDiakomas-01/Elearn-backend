import fs from 'node:fs'
import path from 'node:path'
import db from './db'


export async function MigrationRunner(){
  const fileContent = fs.readFileSync(path.join(process.cwd() , '/src/migrations/migration.sql')).toString()
  db.query(fileContent , (err) => {
    if(err){
      console.log(err)
      throw new Error(`Migartion Error ${err.message}`)
    }
    console.log("Migration Runned")
  })
}