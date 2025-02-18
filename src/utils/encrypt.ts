import dotenv from 'dotenv'
import CryptoJS from 'crypto-js'

dotenv.config()
const Enc = String(process.env.ENC);

export function encPass(password : string){
  return CryptoJS.AES.encrypt(password ,Enc).toString()
}

export function decPass(password: string) {
  return CryptoJS.AES.decrypt(password, Enc).toString(CryptoJS.enc.Utf8)
}