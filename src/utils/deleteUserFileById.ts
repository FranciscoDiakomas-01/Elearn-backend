import path from "node:path";
import fs from "node:fs";
import db from "../database/db";
import { isExixtentUserById } from "./isExistentUser";

export default async function deleteUserProfileById(id: number) {
  const exist = await isExixtentUserById(id);
  if (!exist) {
    return "Usuário não encotrado";
  } else {
    const query = "SELECT profileurl FROM users WHERE id = $1 LIMIT 1;";
    const { rows } = await db.query(query, [id]);
    const profileURL = rows[0]?.profileurl as string;
    const profileFileName = profileURL?.split("/")[3];
    if (!profileURL?.includes("default.png")) {
      fs.unlinkSync(path.join(process.cwd() + "/uploads/" + profileFileName));
      return true;
    } 
  }
}
