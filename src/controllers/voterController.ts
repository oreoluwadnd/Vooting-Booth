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
    const { id } = req.params;
    const voter = await Voter.findById(id);
    if (!voter) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: "No Voter With thaT Id found",
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: {
        voter,
      },
    });
  }
);

//delete voter
export const deleteVoter = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const voter = await Voter.findByIdAndDelete(id);
    if (!voter) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: "No Voter With that Id found",
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: voter,
    });
  }
);

//update voters
export const updateVoter = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedVoter = await Voter.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVoter) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: "No Voter With that Id found",
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: updatedVoter,
    });
  }
);
