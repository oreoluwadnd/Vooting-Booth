import { Model, Schema, model } from "mongoose";
import { IVoter } from "../types/types";
import bcrypt from "bcryptjs";
import validator from "validator";

interface IVoterMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean;
  verifyFingerPrint(fingerPrint: string, voterPrint: string): boolean;
  checkVoted(electionId: string, votedParticipated: string): boolean;
}

type voterModel = Model<IVoter, {}, IVoterMethods>;

const voterSchema: Schema = new Schema<IVoter, voterModel, IVoterMethods>({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: "ElectionType",
    },
  ],
  password: {
    type: String,
    minlength: 8,
    required: [true, "A user must have a password"],
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "VOTER"],
    default: "VOTER",
  },
  fingerPrint: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: [true, "A user must have a phone number"],
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  status: { type: Boolean, required: true, default: false },
  dob: { type: Date, required: true },
  created: { type: Date, default: Date.now },
});

voterSchema.pre("save", async function (this: IVoter, next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

voterSchema.method(
  "correctPassword",
  async function (this: any, candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);

voterSchema.method(
  "verifyFingerPrint",
  async function (this: any, fingerPrint: string, voterPrint: string) {
    if (fingerPrint === voterPrint) {
      return true;
    } else return false;
  }
);
// voterSchema.method(
//   "checkVoted",
//   async function (this: any, electionId: string, votedParticipated: string) {
//     if (electionId === votedParticipated) {
//       return true;
//     } else return false;
//   }
// );
export default model<IVoter, voterModel>("Voter", voterSchema);
