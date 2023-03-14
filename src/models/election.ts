import { Schema, model } from "mongoose";
import { IElection } from "../types/types";

const electionSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "An election must have a name"],
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  start: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    required: true,
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
      required: true,
    },
  ],
  totalVotes: {
    type: Number,
    required: true,
  },
});

export default model<IElection>("Election", electionSchema);
