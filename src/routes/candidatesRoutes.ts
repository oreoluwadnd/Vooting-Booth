import { Router } from "express";
import {
  createCandidate,
  getAllCandidates,
  getCandidate,
  deleteCandidate,
  updateCandidate,
} from "../controllers/candidateController";

const router: Router = Router();

router.post("/createCandidate", createCandidate);
router.get("/getAllCandidates", getAllCandidates);
router.get("/getCandidate/:id", getCandidate);
router.get("/deleteCandidate", deleteCandidate);
router.get("/updateCandidate/:id", updateCandidate);

export default router;
