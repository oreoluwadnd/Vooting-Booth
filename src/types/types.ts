import { Schema, model, PopulatedDoc, Types, Document, models } from "mongoose";

export interface IVoter extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
  role: string;
  dob: Date;
  voted: Array<Types.ObjectId>;
  fingerPrint: string;
  created: Date;
}

export interface ICandidate extends Document {
  name: string;
  party: string;
  campaign: string;
  biography: string;
  image: string;
  status: boolean;
}

export interface IElection extends Document {
  name: string;
  type: Types.ObjectId;
  start: Date;
  end: Date;
  created: Date;
  candidate: Types.ObjectId;
  voters: Array<Types.ObjectId>;
  totalVotes: number;
}

export interface IElectionType extends Document {
  name: string;
}
