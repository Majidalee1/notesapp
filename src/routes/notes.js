// import router from express
import express from "express";
const router = express.Router();

// import db
import db from "../configs/db.js";
import upload from "../configs/multer.js";

router.get("/", (req, res) => {
  const sql = "SELECT * FROM notes";
  //   promosify the db
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM notes WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      throw err;
    }
    res.json(row);
  });
});

// img upload

router.post("/", (req, res) => {
  const sql = "INSERT INTO notes (title, content, imgUrl) VALUES (?, ?, ?)";
  const payload = [req.body.title, req.body.content, req.body.imgUrl];

  db.run(sql, payload, (err) => {
    if (err) {
      throw err;
    }
    res.json({
      message: "Note created successfully",
    });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  //  update the note
  const payload = {
    title: req.body.title,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
  };
  console.log(payload);

  const filteredPayload = Object.keys(payload).reduce((acc, key) => {
    if (payload[key]) {
      acc[key] = payload[key];
    }
    return acc;
  }, {});

  //   const sql
  const sql = `UPDATE notes SET ${Object.keys(filteredPayload)
    .map((key) => `${key} = ?`)
    .join(",")} WHERE id = ${id}`;

  console.log(sql);
  const values = Object.values(filteredPayload);

  db.run(sql, values, (err) => {
    if (err) {
      throw err;
    }
    res.json({
      message: "Note updated successfully",
    });
  });
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM notes WHERE id = ?";
  db.run(sql, [req.params.id], (err) => {
    if (err) {
      throw err;
    }
    res.json({
      message: "Note deleted successfully",
    });
  });
});

router.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file;
  if (!image) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "No image found",
    });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;

  res.json({
    success: true,
    code: 200,
    fileUrl,
  });
});

// export the router as a module
export default router;
