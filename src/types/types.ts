import { Schema, model, PopulatedDoc, Types, Document, models } from "mongoose";

export interface IVoter extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
  role: string;
  dob: Date;
  created: Date;
}

export interface ICandidate extends Document {
  name: string;
  party: string;
  campaign: string;
  biography: boolean;
  image: string;
  status: boolean;
}

export interface IElection extends Document {
  name: string;
  type: string;
  status: boolean;
  start: Date;
  end: Date;
  created: Date;
  candidates: Types.ObjectId;
  voters: Array<Types.ObjectId>;
  totalVotes: number;
}

export interface IElectionType extends Document {
  name: string;
}
