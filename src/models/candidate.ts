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
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export default model<ICandidate>("Candidate", candidateSchema);
