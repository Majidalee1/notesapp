// configre multer
import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";
import fs from "fs";
// import path from "path";

// confure multer disk storage

const __dirname = resolve();

const storage = multer.diskStorage({
  // check if the uploads directory exists
  destination: (req, file, cb) => {
    const dir = resolve(__dirname, "uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      crypto.randomBytes(16).toString("hex") + extname(file.originalname)
    );
  },
});

export default multer({
  storage,
  limits: {
    fileSize: 500_000,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});
