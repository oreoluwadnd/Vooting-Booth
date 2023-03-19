import { Response, Request, NextFunction } from "express";
import CatchAsync from "../error/CatchAsync";
import { AppError, HttpCode } from "../error/AppError";
import Voter from "../models/voterModel";
import { IVoter } from "../types/types";

//GET ALL VOTERS
export const getAllVoters = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const voters = await Voter.find();
    res.status(HttpCode.OK).json({
      status: "success",
      results: voters.length,
      data: {
        voters,
      },
    });
  }
);
