import UserController from "../controllers/UserController";
import { Router } from "express";
import isAllowedFile from "../middlewares/fileCheck";
import upload from "../middlewares/uplod";

const UserRouter = Router()
UserRouter.get("/users" , UserController.getAllUsers)
UserRouter.get("/user/:id", UserController.getuserById);
UserRouter.delete("/user/:id", UserController.deleteuserById);
UserRouter.post("/user", UserController.createUser);
UserRouter.patch("/user/profile/:id" ,upload.single("file"), isAllowedFile ,  UserController.updateProfile)
export default UserRouter