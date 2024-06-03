import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();
app.use(express.json());

//Routes

app.get("/", (req, res, next) => {
  //   const error = createHttpError(400, "Something Went Wrong");
  //   throw error;
  res.json({
    message: "welcome to ebook",
  });
});

app.use("/api/users/", userRouter);

//global error handler
app.use(globalErrorHandler);
export default app;
