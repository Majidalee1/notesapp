// const sqlite3 = require("sqlite3").verbose();
import sqlite3 from "sqlite3";
// seqlite verbose

const db = new sqlite3.Database(
  "db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, imgUrl TEXT)"
  );
});

// export the database object
export default db;
