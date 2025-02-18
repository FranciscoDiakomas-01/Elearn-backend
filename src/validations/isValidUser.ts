import validator from "validator";
import type IUser from "../models/UserModel";

export default function isValidUser(user: IUser) {
  try {
    if (!validator.isStrongPassword(user.password)) {
      return "Senha fraca";
    } else if (!validator.isEmail(user.email)) {
      return "Email Inválido";
    } else if (user?.lastName?.length < 3 || user?.firstName?.length < 3 || validator.isNumeric(user.lastName) || validator.isNumeric(user.firstName) ) {
      return "Nome inválido";
    }else {
      return "Perfil Válido";
    }
  } catch (error) {
    return "Dados incorretos";
  }
}
