import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWTCipher = String(process.env.JWT);
export function generateToken(id: number, userType: string) {
  const payload = {
    id,
    userType,
  };
  return Jwt.sign(payload, JWTCipher);
}
