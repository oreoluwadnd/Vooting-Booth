import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import morganMiddleware from "./middleware/morgan";
import { errorHandler } from "./error/ErrorHandler";
import { AppError, HttpCode } from "./error/AppError";
import voteRoutes from "./routes/voteRoutes";
import votersRoutes from "./routes/votersRoutes";
import candidatesRoutes from "./routes/candidatesRoutes";
import electionRoutes from "./routes/ElectionRoutes";
import config from "./config/config";
// No type defintions available for package 'xss-clean'
// @ts-ignore
import xss from "xss-clean";
import cors from "cors";
import "dotenv/config";
import Logger from "./logger/logger";
const app: Express = express();
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morganMiddleware);
app.use(mongoSanitize());
app.use(xss());
const apiLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP,please try again in an hour!",
});
app.use("/api", apiLimiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "blob:"],

      fontSrc: ["'self'", "https:", "data:"],

      scriptSrc: ["'self'", "https://*.cloudflare.com"],

      scriptSrcElem: ["'self'", "https:", "https://*.cloudflare.com"],

      styleSrc: ["'self'", "https:", "unsafe-inline"],

      connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
    },
  })
);

const apiVersion = config.API_VERSION;
const apiPrefix = config.API_PREFIX;
const apiRoute = `${apiPrefix}/${apiVersion}`;
app.use(`${apiRoute}/voters`, votersRoutes);
app.use(`${apiRoute}/candidates`, candidatesRoutes);
app.use(`${apiRoute}/elections`, electionRoutes);
app.use(`${apiRoute}/vote`, voteRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  throw new AppError({
    httpCode: HttpCode.NOT_FOUND,
    message: `Cant find ${req.originalUrl} on this server !`,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});
export default app;
