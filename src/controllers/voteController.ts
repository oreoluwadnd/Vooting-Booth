import { Response, Request, NextFunction, json } from "express";
import CatchAsync from "../error/CatchAsync";
import Voter from "../models/voterModel";
import { AppError, HttpCode } from "../error/AppError";
import Election from "../models/election";
import { IElectionType } from "../types/types";
import Logger from "../logger/logger";
import { ObjectId } from "mongoose";

export const vote = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { voterId } = req.body;
    const { id } = req.params;
    console.log(id);
    const name = "testing";
    Logger.info(voterId);
    const Vote = await Election.findOneAndUpdate(
      { id },
      {
        $addToSet: { voters: voterId },
        $inc: { totalVotes: 1 },
      },
      { new: true }
    );
    if (!Vote) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Error Proccessing Vote Pls try Again`,
      });
    }
    req.body.vote = Vote;
    next();
  }
);

export const setVoted = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { voterId, electionTypeId, vote } = req.body;
    const voter = await Voter.findOneAndUpdate(
      {
        _id: voterId,
      },
      {
        $push: { voted: electionTypeId },
      },
      { new: true }
    );
    if (!voter) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Error Proccessing Vote Pls try Again`,
      });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "success",
      data: vote,
    });
  }
);

export const verifyVote = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, fingerPrint, electionTypeId } = req.body;
    const voter = await Voter.findOne({ email });
    if (
      !voter ||
      !(await Voter.schema.methods.verifyFingerPrint(
        fingerPrint,
        voter.fingerPrint
      ))
    ) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        message: `Invalid FingerPrint`,
      });
    }
    if (voter.voted.includes(electionTypeId)) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        message: `You have already voted for this election`,
      });
    }
    const voterProfile = JSON.parse(JSON.stringify(voter));
    req.body.voterId = voterProfile._id;
    next();
  }
);
