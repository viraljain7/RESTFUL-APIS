import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");

    return next(error);
  }

  // database call
  const user = await userModel.findOne({ email });

  if (user) {
    const error = createHttpError(
      400,
      "user Already Exists with this email in DB"
    );

    return next(error);
  }
  // process & logic
  // response
  res.json({
    message: "user created succesfully",
  });
};

export { createUser };
