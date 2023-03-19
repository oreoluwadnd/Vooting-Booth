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

//GET VOTER BY ID
export const getVoter = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const voter = await Voter.findById(req.params.id);
    if (!voter) {
      return next(
        new AppError("No voter found with that ID", HttpCode.NOT_FOUND)
      );
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: {
        voter,
      },
    });
  }
);
