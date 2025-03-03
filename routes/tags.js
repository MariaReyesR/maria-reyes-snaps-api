import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const tagsPath = path.join(process.cwd(), "data/tags.json");

const getTags = () => JSON.parse(fs.readFileSync(tagsPath));

router.get("/", (_req, res) => {
  res.json(getTags());
});

export default router;
