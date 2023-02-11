import { Router } from "express";
import { IVoter } from "../types/types";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
