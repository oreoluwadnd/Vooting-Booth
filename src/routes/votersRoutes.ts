import { Router } from "express";
import {
  setAdmin,
  checkEmail,
  register,
  login,
} from "../controllers/authController";

const router: Router = Router();

router.post("/register", setAdmin, checkEmail, register);
router.post("/login", login);

export default router;
