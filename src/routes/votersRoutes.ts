import { Router } from "express";
import { setAdmin, checkEmail, register } from "../controllers/authController";

const router: Router = Router();

router.post("/register", setAdmin, checkEmail, register);

export default router;
