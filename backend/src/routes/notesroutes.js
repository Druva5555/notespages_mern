import express from "express";
import {
  createnotes,
  deletenotes,
  getnotes,
  updatenotes,
  getnotesbyid,
} from "../controllers/notescontroller.js";

const router = express.Router();

router.get("/", getnotes);

router.get("/:id", getnotesbyid);

router.post("/", createnotes);

router.put("/:id", updatenotes);

router.delete("/:id", deletenotes);

export default router;
