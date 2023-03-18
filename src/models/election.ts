import { Schema, model } from "mongoose";
import { IElection } from "../types/types";

const electionSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "An election must have a name"],
  },
  start: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "ElectionType",
    required: true,
  },
  end: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  voters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Voter",
    },
  ],
  totalVotes: {
    type: Number,
    default: 0,
  },
});

export default model<IElection>("Election", electionSchema);
