import express from "express";
import { createUser, loginUser } from "./userController";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.get("/login", loginUser);

export default userRouter;
