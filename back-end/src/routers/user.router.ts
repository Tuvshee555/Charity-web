import express from "express";
import { getAllUser } from "../controller/users/get-all-user";
import { getUser } from "../controller/users/get-user";
import { deleteUser } from "../controller/users/delete-user";
import { updateUser } from "../controller/users/update-user";
import { postUser } from "../controller/users/post-user";
import { userLogin } from "../controller/users/user-login";

export const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUser);
userRouter.post("/", postUser);
userRouter.post("/login", userLogin);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
