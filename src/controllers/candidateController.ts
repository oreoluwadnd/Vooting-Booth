import { Request, Response, NextFunction } from "express";
import Candidate from "../models/candidateModel";
import { createToken, verifyToken } from "../utils/JWT";
import CatchAsync from "../error/CatchAsync";
import { AppError, HttpCode } from "../error/AppError";
import { IVoter } from "../types/types";
import Logger from "../logger/logger";

// @desc    Create a new candidate
// @route   POST /api/v1/candidate
export const createCandidate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, party, campaign, biography, image, status } = req.body;
    if (!name || !party || !campaign || !biography || !image || !status) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `Please fill all fields`,
      });
    }
    const candidate = await Candidate.create({
      name,
      party,
      campaign,
      biography,
      image,
      status,
    });
    res.status(HttpCode.CREATED).json({
      status: "success",
      data: candidate,
    });
  }
);

// @desc    Get all candidates
// @route   GET /api/v1/candidate
export const getAllCandidates = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidates = await Candidate.find();
    res.status(HttpCode.OK).json({
      status: "success",
      data: candidates,
    });
  }
);

// @desc    Get a candidate
// @route   GET /api/v1/candidate/:id
export const getCandidate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Candidate not found`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: candidate,
    });
  }
);

//@desc     Delete a candidate
//@route    DELETE /api/v1/candidate/:id
export const deleteCandidate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Candidate not found`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: candidate,
    });
  }
);

//@desc     Update a candidate
//@route    PUT /api/v1/candidate/:id
export const updateCandidate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!candidate) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `Candidate not found`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: candidate,
    });
  }
);
