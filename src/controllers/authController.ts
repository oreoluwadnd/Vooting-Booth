import { Request, Response, NextFunction } from "express";
import Voter from "../models/voterModel";
import { createToken, verifyToken } from "../utils/JWT";
import CatchAsync from "../error/CatchAsync";
import { AppError, HttpCode } from "../error/AppError";
import { IVoter } from "../types/types";
import Logger from "../logger/logger";

//check id email exists
export const checkEmail = CatchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;
    const user = await Voter.findOne({ email: req.body.email });
    if (user) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `User with this Email: ${email} already exist!`,
      });
    }
    next();
  }
);
//SET ADMIN
export const setAdmin = CatchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isFirstAccount = (await Voter.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "ADMIN" : "VOTER";
    req.body.status = isFirstAccount ? true : false;
    next();
  }
);

//register controller
const dob = new Date("1999-12-31");
export const register = CatchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password, phone, role, status } = req.body;
    const newVoter: IVoter = await Voter.create({
      name,
      email,
      password,
      phone,
      dob,
      role,
      status,
    });
    const result = await createToken(res, req, newVoter);
    res.status(HttpCode.CREATED).json({
      status: result.status,
      Voter: result.newVoter,
      token: result.token,
    });
  }
);

//Login
export const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `Pls provide email and password`,
      });
    }
    const voter = await Voter.findOne({ email }).select("+password");
    if (
      !voter ||
      !(await Voter.schema.methods.correctPassword(password, voter.password))
    ) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        message: `Incorrect email or password`,
      });
    }
    const result = await createToken(res, req, voter);
    res.status(HttpCode.CREATED).json({
      status: result.status,
      Voter: result.newVoter,
      token: result.token,
    });
  }
);
