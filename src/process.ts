import Logger from "./logger/logger";
import { errorHandler } from "./error/ErrorHandler";
import { exitHandler } from "./server/serverExit";

process.on("unhandledRejection", (error: Error | any) => {
  Logger.error(`Uncaught Exception: ${error.message}`);

  throw new Error(error.message || error);
});

process.on("uncaughtException", (error: Error | any) => {
  Logger.error(`Uncaught Exception: ${error.message}`);

  errorHandler.handleError(error);
});
process.on("SIGTERM", () => {
  console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  exitHandler.handleExit(0);
});

process.on("SIGINT", () => {
  console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  exitHandler.handleExit(0);
});
