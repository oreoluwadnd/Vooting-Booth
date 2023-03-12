import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import config from "../config/config";

// @Desc sign JWT

const signJWT = (id: string): string | undefined => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

// @Desc Verify JWT
exports.verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

// @ Create and send token
exports.createToken = (res: Response, req: Request, voter: any) => {
  const token = signJWT(voter._id);
  const expires: unknown = config.JWT_EXPIRES_IN;
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + (expires as number) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  voter.password = undefined;
};
