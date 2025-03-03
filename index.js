import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//Greeting Route (static)
app.get("/greeting", (req, res) => {
  res.json("Hello World!");
});
//User greeting route (dynamic)
app.get("/user/:name", (req, res) => {
  res.json({ message: `Welcome, ${req.params.name}!` });
});

import photoRoutes from "./routes/photos.js";
import tagRoutes from "./routes/tags.js";

app.use("/photos", photoRoutes);
app.use("/tags", tagRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Press CTRL + C to stop server`);
});
