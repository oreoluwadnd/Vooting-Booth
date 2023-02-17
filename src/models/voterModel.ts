import { Schema, model } from "mongoose";
import { IVoter } from "../types/types";
import bcrypt from "bcryptjs";
import validator from "validator";

const voterSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "invalid email"],
  },
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
  phone: {
    type: String,
    required: [true, "A user must have a phone number"],
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  status: { type: Boolean, required: true, default: false },
  dob: { type: Date, required: true },
  created: { type: Date, required: true, default: Date.now },
});

voterSchema.pre("save", async function (this: IVoter, next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default model<IVoter>("Voter", voterSchema);
