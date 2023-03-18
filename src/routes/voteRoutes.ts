import { Router } from "express";
import { verifyVote, vote, setVoted } from "../controllers/voteController";

const router: Router = Router();
router.post("/vote/:id", verifyVote, vote, setVoted);

export default router;
