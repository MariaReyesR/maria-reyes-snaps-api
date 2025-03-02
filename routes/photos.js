import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const photosPath =path.join(process.cwd(), "data/photos.json");

const getPhotos = () => JSON.parse(fs.readFileSync(photosPath));

router.get("/", (req, res) => {
  res.json(getPhotos());
}
);  

router.get("/:id", (req, res) => {
  const photos = getPhotos();
  const photo = photos.find((photo) => photo.id === parseInt(req.params.id));
  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
  } else {
    res.json(photo);
  }
}
);

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "Comment text is required" });
    }
    const photos = getPhotos();
    const photo = photos.findIndex((photo) => photo.id === parseInt(req.params.id));

    if (photoIndex === -1) return 
      res.status(404).json({ message: "Photo not found" });
    
      const newComment = {
        id: Date.now(),
        text,
        timestamp: new Date(). toISOString()};

        photos[]