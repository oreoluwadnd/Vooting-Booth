import { Schema, model } from "mongoose";
import { IElectionType } from "../types/types";

const electionType: Schema = new Schema({
  name: {
    type: String,
    required: [true, "A electionType must have a name"],
  },
});

export default model<IElectionType>("electionType", electionType);
