import db from "../database/db";
export default async function isExixtentUserByEmail(email : string) {
  try {
    const { rowCount} = await db.query("SELECT id FROM users WHERE email = $1 LIMIT 1;", [email])
    return rowCount == 1
  } catch (error) {
    return false
  }
}

export  async function isExixtentUserById(id : number) {
  try {
    if( !id || Number.isNaN(id)){
      return false
    }
    const { rowCount} = await db.query("SELECT id FROM users WHERE id = $1 LIMIT 1;", [id])
    return rowCount == 1
  } catch (error) {
    return false
  }
}