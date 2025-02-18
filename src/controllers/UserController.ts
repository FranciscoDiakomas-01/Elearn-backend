import type IUser from "../models/UserModel";
import UserService from "../services/userService";
import { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { generateToken } from "../middlewares/token";

dotenv.config();

const UserController = {
  getAllUsers: async function (req: Request, res: Response) {
    const page = Number(req.query?.page);
    const search = req.query.search;
    if (search != undefined) {
      const text = String(search);
      const data = await UserService.getAllUsersByText(page, text);
      res.status(200).json({ data, search: text });
      return;
    }
    const data = await UserService.getAllUsers(page);
    res.status(200).json(data);
    return;
  },

  getuserById: async function (req: Request, res: Response) {
    const userid = Number(req.params.id);
    const data = await UserService.getUserById(userid);
    if (data == "Usuário não encotrado") {
      res.status(200).json({ msg: data });
      return;
    }
    res.status(200).json({ data });
    return;
  },

  deleteuserById: async function (req: Request, res: Response) {
    const userid = Number(req.params.id);
    const data = await UserService.deleteUserById(userid);
    if (data == "Usuário deletado com sucesso!") {
      res.status(200).json({ data, msg: "Adeus" });
    } else {
      res.status(400).json({ data });
    }
    return;
  },

  createUser: async function (req: Request, res: Response) {
    const user: IUser = req.body;
    user.type = "stu";
    const response = (await UserService.createUser(user)) as {
      id: number;
      type: "stu";
    };
    if (response?.id) {
      const token = generateToken(response.id, response.type);
      res.status(201).json({
        token,
        msg: "Bem vindo",
      });
      return;
    }
    res.status(400).json({
      msg: response,
    });
    return;
  },

  updateProfile: async function (req: Request, res: Response) {
    const profileURL = `${process.env.APIURL}/${req.file?.filename}`;
    const userid = Number(req.params.id);
    const response = await UserService.updateUserProfile(profileURL, userid);
    if (response == "Perfil alterado") {
      res.status(201).json({
        msg: "Perfil alterado",
      });
    } else {
      res.status(400).json({
        msg: response,
      });
      fs.unlinkSync(path.join(process.cwd() + "/" + req.file?.path));
    }
    return;
  },
};

export default UserController;
