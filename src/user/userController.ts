import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");

    return next(error);
  }

  // database call
  const user = await userModel.findOne({ email });

  // process & logic
  try {
    if (user) {
      const error = createHttpError(
        400,
        "user Already Exists with this email in DB"
      );

      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting User"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }
  try {
    //Token generate JWT
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    // response
    res.status(201).json({
      id: newUser._id,
      accesToken: token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while signing jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    const error = createHttpError(400, "All fields are required");

    return next(error);
  }

  // database call
  const user = await userModel.findOne({ email });

  // process & logic
  try {
    if (!user) {
      const error = createHttpError(
        404,
        "user not found with this email in DB"
      );

      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting User"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createHttpError(400, "username or password incorrect"));
  }

  try {
    //Token generate JWT
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    // response
    res.status(201).json({
      accesToken: token,
      message: "login Succesfull",
    });
  } catch (error) {
    return next(createHttpError(500, "Error while signing jwt token"));
  }
};
export { createUser, loginUser };
