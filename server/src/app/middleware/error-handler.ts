import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      errors: [err.message],
    });
    return;
  }

  console.log(err);
  res.status(500).json({
    success: false,
    errors: ["something went wrong! Please try again later"],
  });
  return;
};

export default errorHandler;
