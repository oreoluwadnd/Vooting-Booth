import app from "../app";
import mongoose from "mongoose";
import Logger from "../logger/logger";
import { errorHandler } from "../error/ErrorHandler";
import { createHttpTerminator } from "http-terminator";
import "dotenv/config";

const port: number | string = process.env.PORT || 3000;
const uri: string = process.env.DATABASE || "";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Voting-Booth",
};
mongoose.set("strictQuery", true);

mongoose
  .connect(uri, options)
  .then(() => Logger.info("🚀 Database connected successfully "))
  .catch((err) => {
    const errorMessage = err.toString();
    if (errorMessage.includes("ECONNREFUSED")) {
      Logger.error("\n\n\n\x1b[1m\x1b[31m%s\x1b[0m", err);
      Logger.error(
        "\n\n\x1b[1m\x1b[34m%s\x1b[0m",
        `- Connection to MongoDB failed: There are several potential causes for this issue, including:`
      );
      Logger.error("\x1b[1m\x1b[33m%s\x1b[0m", `- Unstable Network Connection`);
      Logger.error("\x1b[1m\x1b[33m%s\x1b[0m", `- Invalid Connection String`);
      Logger.error(
        "\x1b[1m\x1b[33m%s\x1b[0m",
        `- MongoDB Server may not be running`
      );
      Logger.error(
        "\x1b[1m\x1b[33m%s\x1b[0m",
        `- Firewall may not be configured to allow incoming connections on MongoDB port.`
      );
      Logger.error(
        "\x1b[1m\x1b[31m%s\x1b[0m",
        `- Please try again with the fixes!`
      );
    } else {
      Logger.error("Error while connecting to mongo database", err);
    }
    errorHandler.handleError(err);
  });

export const server = app.listen(port, () => {
  Logger.info(` Server is running on port ${port} 🔌`);
});
export const httpTerminator = createHttpTerminator({
  server,
});
process.on("uncaughtException", (error: Error) => {
  Logger.error(`Uncaught Exception: ${error.message}`);

  errorHandler.handleError(error);
});

process.on("unhandledRejection", (error: Error) => {
  Logger.error(`unhandled Rejection : ${error.message}`);

  errorHandler.handleError(error);
});
