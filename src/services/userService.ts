import type IUser from "../models/UserModel";
import UserReposirory from "../repository/UserRepository";
import validator from 'validator'
import isValidUser from "../validations/isValidUser";
import isExixtentUserByEmail, { isExixtentUserById } from "../utils/isExistentUser";
import dotenv from 'dotenv'
import deleteUserProfileById from "../utils/deleteUserFileById";
import { encPass } from "../utils/encrypt";
dotenv.config()
class UserserviceEmp {

  public async createUser(user: IUser) {
    try {
      user.profileurl = String(process.env.APIURL + "/default.png");
      const isvalid = isValidUser(user);
      if (isvalid == "Perfil Válido") {
        const existentuser = await isExixtentUserByEmail(user.email);
        if (existentuser) {
          return "Email em uso";
        }
        user.password = encPass(user.password)
        const response = await UserReposirory.createUser(user);
        return response;
      } else {
        return isvalid;
      }
    } catch (error) {
      return "Id inválido";
    }
  }

  public async getUserById(id: number) {
    try {
      if (Number.isNaN(id)) {
        return "Id inválido";
      }
      const response = await UserReposirory.getUserById(id);
      return response;
    } catch (error) {
      return "Id inválido";
    }
  }

  public async updateUserProfile(profileURL : string , id: number) {
    try {
      const exists = await isExixtentUserById(id)
      if(!exists){
        return "Usuário não encotrado"
      }
      await deleteUserProfileById(id)
      if (Number.isNaN(id)) {
        return "Id inválido";
      }
      if(!profileURL){
        return "Imagem inválida"
      }
      const response = await UserReposirory.updateUserProfile(profileURL , id);
      return response;
    } catch (error) {
      return "Id inválido";
    }
  }


  public async getAllUsers(page: number) {
    try {
      let currentPage = Number.isNaN(page) ? 1 : page;
      const data = UserReposirory.getAllUsers(currentPage);
      return data;
    } catch (error) {
      return "Erro na busca de dados";
    }
  }

  public async getAllUsersByText(page: number, text: string) {
    try {
      if (validator.isNumeric(text) || text?.length < 0) {
        return "Pesquisa inválida";
      }
      let currentPage = Number.isNaN(page) ? 1 : page;
      const data = UserReposirory.getUsersByText(currentPage, text);
      return data;
    } catch (error) {
      return "Erro na busca de dados";
    }
  }

  public async deleteUserById(id: number) {
    try {
      if (Number.isNaN(id)) {
        return "Id inválido";
      }
      await deleteUserProfileById(id)
      const response = await UserReposirory.deleteUserById(id);
      return response;
    } catch (error) {
      console.log(error)
      return "Id inválido";
    }
  }
}

const UserService = new UserserviceEmp()

export default UserService