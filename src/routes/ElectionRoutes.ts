import { Router } from "express";
import {
  createElection,
  deleteElectionById,
  updateElectionById,
  getAllElections,
  getElectionById,
} from "../controllers/ElectionController";
import {
  createElectionType,
  updateElectionType,
  deleteElectionType,
  getAllElectionTypes,
  getSingleElectionType,
} from "../controllers/ElectiontypeController";
const router: Router = Router();

//@ routes for election types
router.post("/createElectionType", createElectionType);
router.get("/getAllElectionType", getAllElectionTypes);
router.get("/getSingleElectionType/:id", getSingleElectionType);
router.delete("/deleteElectionType/:id", deleteElectionType);
router.patch("/updateElectionType/:id", updateElectionType);

//@ create election type
router.post("/createElection", createElection);
router.get("/getAllElections", getAllElections);
router.get("/getElectionById/:id", getElectionById);
router.delete("/deleteElectionById/:id", deleteElectionById);
router.patch("/updateElectionById/:id", updateElectionById);

export default router;
