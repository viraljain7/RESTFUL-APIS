import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { config } from "../config/config";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
};
export { createBook };
