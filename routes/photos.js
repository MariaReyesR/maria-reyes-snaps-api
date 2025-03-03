import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const router = express.Router();
router.use(express.json());
const photosPath = path.join(process.cwd(), "data/photos.json");

const getPhotos = () => {
  const photos = JSON.parse(fs.readFileSync(photosPath));
  return photos.map((photo) => ({
    ...photo,
    comments: photo.comments || [],
  }));
};

router.get("/", (req, res) => {
  res.json(getPhotos());
});

router.get("/:id", (req, res) => {
  const photos = getPhotos();
  const photoId = req.params.id;
  const photo = photos.find((p) => p.id === photoId);

  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
  } else {
    res.json(photo);
  }
});

router.get("/:id/comments", (req, res) => {
  const photos = getPhotos();
  const photoId = req.params.id;
  const photo = photos.find((p) => p.id === photoId);

  if (!photo) {
    res.status(404).json({ message: "Photo not found" });
  } else {
    res.json(photo.comments || []);
  }
});

router.post("/:id/comments", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Comment text is required" });
  }
  const photos = getPhotos();
  const photoIndex = photos.findIndex((p) => p.id === req.params.id);

  if (photoIndex === -1) {
    return res.status(404).json({ message: "Photo not found" });
  }

  const newComment = {
    id: crypto.randomUUID(),
    text,
    timestamp: new Date().toISOString(),
  };

  photos[photoIndex].comments = photos[photoIndex].comments || [];
  photos[photoIndex].comments.push(newComment);
  fs.writeFileSync(photosPath, JSON.stringify(photos, null, 2));
  res.status(201).json(newComment);
});

export default router;
