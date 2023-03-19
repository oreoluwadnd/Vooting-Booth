import { Router } from "express";
import {
  setAdmin,
  checkEmail,
  register,
  login,
} from "../controllers/authController";
import {
  deleteVoter,
  updateVoter,
  getAllVoters,
  getVoter,
} from "../controllers/voterController";
const router: Router = Router();

router.post("/register", setAdmin, checkEmail, register);
router.post("/login", login);

router.route("/getAllVoters").get(getAllVoters);
router.route("/getVoter/:id").get(getVoter);
router.route("/deleteVoter/:id").delete(deleteVoter);
router.route("/updateVoter/:id").patch(updateVoter);

export default router;
