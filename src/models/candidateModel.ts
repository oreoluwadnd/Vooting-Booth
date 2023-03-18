import { Schema, model } from "mongoose";
import { ICandidate } from "../types/types";

const candidateSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "A candidate must have a name"],
  },
  party: {
    type: String,
    required: [true, "A candidate must have a party"],
  },
  campaign: {
    type: String,
    required: [true, "A candidate must have a campaign"],
  },
  biography: {
    type: String,
    required: [true, "A candidate must have a biography"],
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default model<ICandidate>("Candidate", candidateSchema);
