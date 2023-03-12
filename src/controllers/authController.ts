import { Request, Response, NextFunction } from "express";
import Voter from "../models/voterModel";
import CatchAsync from "../error/CatchAsync";
import { IVoter } from "../types/types";

// @Desc Register user
// @Route /api/users/register
// @Method POST

const dob = new Date("1999-12-31");
const register = CatchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password, phone, status, role } = req.body;
    const voter: IVoter = await Voter.create({
      name,
      email,
      password,
      phone,
      dob,
    });
  }
);
