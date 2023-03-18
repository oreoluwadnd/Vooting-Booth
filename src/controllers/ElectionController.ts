import { Response, Request, NextFunction } from "express";
import CatchAsync from "../error/CatchAsync";
import { AppError, HttpCode } from "../error/AppError";
import Election from "../models/election";
import { IElection } from "../types/types";
import Logger from "../logger/logger";

//@ create election
export const createElection = CatchAsync(
  async (req: Request, res: Response) => {
    const { name, start, end, type, candidate } = req.body;
    const election = await Election.create({
      name,
      start,
      end,
      type,
      candidate,
    });
    res.status(HttpCode.CREATED).json({
      status: "success",
      data: election,
    });
  }
);

//@ get all elections
export const getAllElections = CatchAsync(
  async (req: Request, res: Response) => {
    const elections = await Election.find();
    res.status(HttpCode.OK).json({
      status: "success",
      data: elections,
    });
  }
);
//@ get election by id
export const getElectionById = CatchAsync(
  async (req: Request, res: Response) => {
    const election = await Election.findById(req.params.id)
      .populate("candidate")
      .populate("voters");
    if (!election) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `No election found with that ID`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: election,
    });
  }
);
//@ update election by id
export const updateElectionById = CatchAsync(
  async (req: Request, res: Response) => {
    const election = await Election.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!election) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `No election found with that ID`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: election,
    });
  }
);

//@ delete election by id
export const deleteElectionById = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const election = await Election.findByIdAndDelete(id);
    if (!election) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: `No election found with that ID`,
      });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      data: election,
    });
  }
);
