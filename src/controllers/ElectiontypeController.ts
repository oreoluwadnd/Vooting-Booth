import { Response, Request, NextFunction } from "express";
import CatchAsync from "../error/CatchAsync";
import { AppError, HttpCode } from "../error/AppError";
import ElectionType from "../models/ElectionType";
import { IElectionType } from "../types/types";

//@ create election type
export const createElectionType = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const electionType = await ElectionType.create({ name });
    res.status(HttpCode.CREATED).json({
      status: "success",
      data: electionType,
    });
  }
);
//@ delete election type
export const deleteElectionType = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const electionType = await ElectionType.findByIdAndDelete(id);
    if (!electionType) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `No election type found with that ID`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: electionType,
    });
  }
);
//@ get all election types
export const getAllElectionTypes = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const electionTypes = await ElectionType.find();
    res.status(HttpCode.OK).json({
      status: "success",
      data: {
        electionTypes,
      },
    });
  }
);

//@ get single election type
export const getSingleElectionType = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const electionType = await ElectionType.findById(id);
    if (!electionType) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `No election type found with that ID`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: electionType,
    });
  }
);

//@ update election type
export const updateElectionType = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    const electionType = await ElectionType.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!electionType) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `No election type found with that ID`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: electionType,
    });
  }
);
