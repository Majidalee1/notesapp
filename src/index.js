// import and configure exress
import express, { Router } from "express";
// import { urlencoded, json } from "body-parser";
import notesRoutes from "./routes/notes.js";

import pkg from "body-parser";
const { urlencoded, json } = pkg;

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

// create a route for uploads

// import and configure body-parser
app.use(urlencoded({ extended: true }));
app.use(json());

// crate a new router
const router = Router();

// import the routes
router.use("/notes", notesRoutes);

// serve the uploads folder as static files
app.use(express.static("uploads"));

// user the router
app.use("/api", router);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
